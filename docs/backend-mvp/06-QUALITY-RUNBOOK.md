# Qualidade, segurança e runbook do desenvolvedor

## 1. Comandos que a entrega deve fornecer

Os nomes podem ser implementados via `Makefile`, mas o resultado precisa ser equivalente:

```bash
make setup          # instala/valida ferramentas sem segredos
make db-up          # sobe PostgreSQL local
make migrate        # aplica migrations locais
make seed           # carrega fixtures locais
make generate       # executa sqlc e demais gerações
make run            # inicia API
make test           # testes unitários
make test-integration
make test-race
make lint           # gofmt/go vet e linter aprovado
make openapi-check  # valida contrato
make docker-build
```

`services/api/README.md` deve documentar os comandos reais e pré-requisitos. Nenhum passo pode depender de uma explicação oral do autor.

## 2. Arquivo `.env.example`

Deve conter nomes e valores seguros de exemplo:

```dotenv
APP_ENV=local
HTTP_ADDR=:8080
DATABASE_URL=postgres://caminhos:caminhos@localhost:5432/caminhos?sslmode=disable
WEB_ALLOWED_ORIGINS=http://localhost:3000
REQUEST_TIMEOUT=10s
SHUTDOWN_TIMEOUT=10s
MAX_REQUEST_BODY_BYTES=1048576
RATE_LIMIT_PER_MINUTE=30
DEFAULT_LOCALE=pt-BR
```

Nunca versionar `.env`, senha Supabase, chave service role ou dados pessoais reais.

## 3. Pirâmide de testes

### Unitários

Cobrir funções puras e regras:

- validação de locale/enums;
- protocolo;
- idempotency hash;
- redaction de PII;
- conversão de enums legados;
- cálculo `rules-v1`;
- proteção/generalização de coordenada;
- validação condicional de `details`;
- validação de período/canal/contato.

### HTTP/handler

Usar `httptest` para:

- status HTTP;
- headers;
- envelope de sucesso/erro;
- body limit;
- campos desconhecidos;
- request ID;
- CORS allowlist;
- nenhuma exposição de erro interno.

### Integração PostgreSQL

Rodar contra PostgreSQL descartável:

- migrations em banco vazio;
- upgrade a partir das tabelas atuais;
- queries sqlc;
- transações;
- unicidade de protocolo/idempotência;
- filtros e paginação;
- snapshot de planning request;
- isolamento de conteúdos não publicados.

Mock de repositório não substitui esses testes.

### Contrato

- validar `openapi.yaml`;
- testar exemplos da documentação;
- confirmar que respostas reais correspondem ao schema;
- gerar/compilar cliente TypeScript de prova, se adotado pelo frontend;
- detectar mudança incompatível no CI.

## 4. Casos obrigatórios Gate A

1. `live` retorna 200 sem banco.
2. `ready` retorna 503 sem banco e 200 com banco.
3. categoria/localidade inválida retorna 400.
4. coleção vazia retorna 200.
5. item draft não aparece em coleção, detalhe ou mapa.
6. locale ausente usa fallback PT-BR e informa isso.
7. coordenada protegida não sai exata.
8. filtros de experiência reproduzem o componente atual.
9. `rules-v1` reproduz fixtures do TypeScript.
10. empate na recomendação é determinístico.
11. todos os 11 tipos de submission aceitam payload válido.
12. cada tipo rejeita seu campo específico obrigatório ausente.
13. submission sem consentimento é rejeitada.
14. demand com relato menor que 30 caracteres é rejeitada.
15. retry com mesma idempotency key não duplica protocolo.
16. mesma chave com payload diferente retorna 409.
17. logs de escrita não contêm nome, e-mail, telefone ou relato.

## 5. Casos obrigatórios Gate B

1. planning request aceita combinação válida de lugar, negócio e experiência.
2. item inexistente retorna erro associado ao item.
3. item draft/despublicado não entra no snapshot.
4. item duplicado é rejeitado de forma previsível.
5. contato exige e-mail ou telefone.
6. `preferredChannel=whatsapp` exige telefone.
7. data final anterior à inicial é rejeitada.
8. party size fora da faixa é rejeitado.
9. snapshot usa nome/status/preço textual do banco, não do cliente.
10. mudança posterior no catálogo não altera snapshot enviado.
11. retry não cria segunda solicitação.
12. mensagem de sucesso não declara reserva ou disponibilidade.

## 6. Segurança e abuso

### Entradas

- limite global de 1 MiB, com limites menores por campo;
- rejeitar múltiplos JSON concatenados;
- validar URL apenas em protocolos `http/https` quando pública;
- normalizar e-mail para lowercase;
- telefone em formato normalizado quando possível, mantendo valor apresentado somente se necessário;
- não renderizar HTML enviado;
- não confiar em IP de header sem proxy confiável configurado.

### Rate limit

Aplicar mais restrição em:

```text
POST /v1/submissions
POST /v1/demands
POST /v1/planning-requests
```

Implementação em memória é aceitável apenas com uma instância e deve ser declarada como limitação. Em múltiplas instâncias, o limite precisa de armazenamento compartilhado ou proteção no gateway.

### Idempotência

1. cliente gera chave aleatória por tentativa lógica;
2. API calcula hash da chave;
3. API calcula hash canônico do payload relevante;
4. transaction insere/recupera resultado;
5. mesma chave + mesmo hash retorna resultado original;
6. mesma chave + outro hash retorna `409`.

Não armazenar chave bruta.

### LGPD mínima

- coletar somente dados necessários para contato/triagem;
- consentimento com timestamp;
- finalidade descrita na interface;
- PII fora de logs e respostas públicas;
- retenção de submissions/demands/planning requests precisa ser definida antes da produção;
- direito do titular e exclusão são processo operacional pendente, não promessa automática;
- dados agregados para Observatório/ICPT não podem reidentificar pessoas.

## 7. Revisão manual de banco

Antes de aplicar migration:

- revisar DDL e locks;
- confirmar que migration antiga não mudou;
- criar backup/snapshot compatível com o ambiente;
- executar em staging;
- medir tempo;
- testar aplicação anterior e nova sobre schema expandido;
- registrar procedimento corretivo.

## 8. Checklist de PR

- [ ] Escopo corresponde a uma story.
- [ ] Não mistura refatoração visual do Next.js.
- [ ] OpenAPI foi atualizado quando o contrato mudou.
- [ ] Migration é nova e incremental.
- [ ] SQL gerado/queries estão versionados.
- [ ] Testes positivos e negativos existem.
- [ ] Erros não vazam detalhes internos.
- [ ] Logs não contêm PII.
- [ ] README/exemplos foram atualizados.
- [ ] `gofmt`, `go vet` e testes passam.
- [ ] Não há segredo ou fixture com dado real.
- [ ] Limitações e decisões pendentes estão no PR.

## 9. Definition of Done por endpoint

Um endpoint não está pronto apenas porque retorna 200. Ele precisa de:

- operação no OpenAPI;
- DTO de request/response;
- validação;
- regra de autorização pública explícita;
- query parametrizada;
- erro mapeado;
- request ID;
- teste de sucesso;
- teste de validação;
- teste de recurso inexistente, quando aplicável;
- teste de banco, quando escreve/lê;
- exemplo executável `.http`;
- documentação da página/componente consumidor.

## 10. Handoff obrigatório

O desenvolvedor entrega:

1. PRs pequenos e revisáveis;
2. `services/api/README.md` completo;
3. OpenAPI;
4. arquivo `services/api/docs/requests.http` ou collection equivalente;
5. migrations e seed;
6. resultado do CI;
7. matriz de compatibilidade do frontend;
8. relatório do importador;
9. demonstração Gate A;
10. demonstração Gate B;
11. decisões técnicas tomadas;
12. limitações conhecidas;
13. runbook de deploy e rollback;
14. nenhum passo escondido em mensagem privada.

## 11. Perguntas que exigem decisão do Tech Lead/PO

Parar antes de implementar quando a resposta mudar contrato ou operação:

- novo tipo de entidade pública;
- novo dado pessoal;
- novo estado operacional;
- preço, reserva ou disponibilidade;
- autenticação/permissão;
- serviço pago;
- tradução automática;
- mudança de weights do algoritmo;
- compartilhamento de PII com parceiro/Observatório;
- troca das tecnologias obrigatórias;
- migration destrutiva.

## 12. O que o desenvolvedor decide sozinho

Não precisa pedir autorização para decisões locais que não alteram contrato:

- nome de função privada;
- organização interna de arquivo dentro do módulo;
- helper de teste;
- otimização comprovada de query sem mudar resultado;
- mensagem de log não sensível;
- refatoração interna coberta por teste.

Autonomia técnica existe dentro da fronteira acordada.
