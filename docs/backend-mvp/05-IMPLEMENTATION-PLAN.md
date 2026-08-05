# Plano de implementação e migração

## 1. Estratégia

Entregar por cortes verticais pequenos. Cada PR deve deixar o repositório compilável e testável. Não abrir um único PR com bootstrap, schema, todos os endpoints e deploy.

## 2. Sequência de PRs

### PR 1 — serviço executável e contrato base

Criar:

```text
services/api/go.mod
services/api/cmd/api/main.go
services/api/internal/platform/config/
services/api/internal/platform/httpx/
services/api/internal/platform/logging/
services/api/docs/openapi.yaml
services/api/Dockerfile
services/api/Makefile
services/api/.env.example
services/api/README.md
```

Entregar:

- servidor `net/http` + `chi`;
- `GET /health/live`;
- middleware de request ID, recovery, timeout, body limit e log;
- carregamento/validação de configuração;
- graceful shutdown;
- envelope e mapper de erros;
- teste HTTP dos healthchecks e erros base.

Não conectar banco antes de a configuração/servidor estarem testados.

### PR 2 — PostgreSQL, migrations incrementais e sqlc

Criar:

```text
services/api/internal/platform/postgres/
services/api/db/query/
services/api/db/generated/
services/api/sqlc.yaml
supabase/migrations/<timestamp>_create_caminhos_catalog.sql
supabase/migrations/<timestamp>_create_planning_requests.sql
supabase/migrations/<timestamp>_harden_intake_tables.sql
```

Entregar:

- pool pgx configurável;
- `GET /health/ready` consultando banco com timeout;
- schema novo;
- nenhuma edição na migration de 1º de agosto;
- geração `sqlc` reproduzível;
- teste de migrations em banco vazio;
- teste de upgrade sobre schema contendo `submissions` e `demands` atuais.

### PR 3 — importador e fixtures

Criar um comando separado:

```text
services/api/cmd/import-legacy-data/main.go
services/api/testdata/
```

Entregar:

- leitura controlada do dataset convertido;
- dry-run default;
- `--apply` explícito;
- importação idempotente por slug/código;
- relatório de duplicidades;
- tratamento explícito da “Pousada Serra & Mar” duplicada;
- demo somente local/teste;
- nenhum contato fictício em produção.

Não fazer o comando importar TypeScript em runtime. Converter o dataset para fixture JSON/SQL revisada e versionada.

### PR 4 — catálogo público

Implementar:

```text
GET /v1/catalog/metadata
GET /v1/places
GET /v1/places/{slug}
GET /v1/businesses
GET /v1/businesses/{slug}
GET /v1/experiences
GET /v1/experiences/{slug}
GET /v1/map-points
```

Entregar paginação estável, filtros, locale/fallback, status e proteção de coordenadas.

### PR 5 — recomendação `rules-v1`

Implementar `POST /v1/recommendations/experiences`.

Antes de refatorar o algoritmo, criar testes de caracterização usando as respostas atuais. O resultado do código Go precisa coincidir com `lib/recommend.ts` para os casos aprovados.

Correção permitida: desempate estável por slug. Qualquer alteração de pesos exige nova versão do algoritmo.

### PR 6 — Cadastro Único e demandas

Implementar:

```text
POST /v1/submissions
POST /v1/demands
```

Entregar:

- todos os tipos do formulário atual;
- validação condicional de `details`;
- consentimento;
- protocolo compatível;
- idempotência;
- rate limit;
- redaction de PII;
- testes de compatibilidade com payloads atuais.

### PR 7 — solicitação de “Meu Caminho”

Implementar `POST /v1/planning-requests`.

Entregar:

- validação de referências publicadas;
- snapshot criado pelo servidor;
- validação de contato/preferências;
- protocolo PLAN;
- idempotência;
- resposta sem semântica de reserva.

### PR 8 — integração gradual com Next.js

No frontend, criar:

```text
lib/api/caminhos-client.ts
lib/api/contracts.ts ou cliente gerado
lib/api/legacy-adapters.ts
```

Alterar primeiro as Route Handlers:

```text
app/api/submissions/route.ts
app/api/demands/route.ts
```

Depois migrar uma superfície por PR:

1. hospedagens;
2. experiências e detalhes;
3. mapa;
4. quiz/recomendação;
5. Meu Caminho/solicitação.

Não misturar essa migração funcional com a substituição de Tailwind por Sass Modules. São riscos diferentes e precisam de PRs separados.

### PR 9 — CI, segurança e handoff

Entregar:

- workflow de Go com format, vet, testes e geração limpa;
- teste de migrations;
- build do Docker;
- exemplos `.http`;
- matriz frontend/endpoint;
- runbook de deploy/rollback;
- demonstração Gate A e Gate B.

## 3. Plano de transição por capacidade

| Capacidade | Hoje | Durante migração | Depois |
|---|---|---|---|
| categorias/pontos | import direto de `lib/data.ts` | feature flag escolhe fonte | API Go |
| experiências | array TypeScript | API em preview com fallback | API Go |
| hospedagens | array TypeScript | endpoint de negócios `kind=lodging` | API Go |
| quiz | função no cliente | comparação Go x TS | API Go `rules-v1` |
| Cadastro Único | Next → Supabase REST | Next → Go → PostgreSQL | frontend/Next → Go |
| demandas | Next → Supabase REST | Next → Go → PostgreSQL | decisão futura do Observatório |
| Meu Caminho | recomendação sem persistência | seleção local + request Go | evolução posterior |

## 4. Feature flags mínimas no frontend

```text
CAMINHOS_API_URL
CAMINHOS_USE_API_CATALOG=false
CAMINHOS_USE_API_RECOMMENDATION=false
CAMINHOS_USE_API_INTAKE=false
```

Flags são temporárias. Definir data/critério de remoção após estabilização. Não deixá-las como arquitetura permanente.

## 5. Compatibilidade de enums

O frontend usa português; a API usa códigos estáveis. O adaptador central faz a tradução.

| Legado | API |
|---|---|
| `comer` | `eat` |
| `hospedar` | `stay` |
| `conhecer` | `visit` |
| `fazer` | `do` |
| `servicos` | `services` |
| `curta` | `short` |
| `meio-periodo` | `half_day` |
| `dia-inteiro` | `full_day` |
| `livre` | `self_guided` |
| `acompanhada` | `guided` |
| `sozinho` | `solo` |
| `casal` | `couple` |
| `familia` | `family` |
| `grupo` | `group` |

Não espalhar conversões pelos componentes. Um único adapter/cliente mantém a compatibilidade até o frontend adotar os códigos da API.

## 6. Estratégia de deploy

O provedor ainda não está decidido. A aplicação precisa ser portável:

- binário/Docker;
- porta por variável;
- filesystem efêmero;
- nenhuma sessão em memória necessária para corretude;
- migrations executadas como etapa separada;
- healthchecks independentes;
- shutdown em SIGTERM/SIGINT;
- logs em stdout JSON.

Ambientes mínimos:

```text
local       API + PostgreSQL local/isolado
staging     API + banco de homologação
production  API + banco de produção
```

Preview por PR é desejável, mas não pode usar banco de produção.

## 7. Rollback

### Leitura

Desabilitar feature flag e voltar para `lib/data.ts` enquanto o fallback existir.

### Escrita

Manter Route Handler adaptador com chave de configuração. Se a API estiver indisponível antes do corte definitivo, voltar temporariamente ao fluxo antigo apenas se a migration/contrato permanecer compatível. Nunca escrever nos dois backends simultaneamente sem idempotência e reconciliação.

### Banco

Aplicar expand/contract. Uma release antiga deve continuar funcionando após migrations aditivas. Remoções de coluna só acontecem depois que nenhum código lê/escreve nelas.

## 8. Critérios para encerrar a fase legada

Pode remover `lib/supabase.ts` e as regras duplicadas do Next quando:

- API está estável em produção;
- formulários geram protocolos corretamente;
- métricas/logs mostram taxa de erro aceitável;
- não existe fallback ativo há uma janela definida pelo time;
- backup/restore do banco foi validado;
- documentação do novo fluxo foi aceita;
- o frontend não importa mais dados do domínio de `lib/data.ts`;
- testes do Next usam o contrato da API.

## 9. Decisões que bloqueiam somente produção, não desenvolvimento

- host final da API;
- credencial PostgreSQL de menor privilégio;
- conteúdo real aprovado;
- domínios permitidos no CORS;
- política de retenção de `contact_requests`;
- responsável operacional que receberá os pedidos;
- canal de alerta de falhas.

O desenvolvedor pode implementar com valores de local/teste, mas não deve inventar os valores de produção.
