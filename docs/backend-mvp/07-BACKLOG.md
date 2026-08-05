# Backlog executável do Backend MVP

## 1. Hierarquia

```text
Programa: Backend MVP Caminhos
├── E0 Fundação e contrato
├── E1 Domínio e catálogo territorial
├── E2 Paridade das regras e entradas existentes
├── E3 Meu Caminho como solicitação de planejamento
└── E4 Qualidade, integração e handoff
```

Não usar labels, milestones ou assignees como dependência de criação. A hierarquia é mantida por links/checklists entre issues.

## 2. Critério de prioridade

1. prevenir quebra do produto em produção;
2. criar fonte de verdade para contrato/schema;
3. remover conteúdo/regra do frontend;
4. preservar fluxos que já coletam dados;
5. criar o primeiro fluxo comercial sem promessa falsa;
6. provar qualidade e operação.

---

# E0 — Fundação e contrato da API Go

## Problema

Não existe serviço Go, contrato HTTP, padrão de erro ou integração reproduzível. Criar features antes disso produziria implementações incompatíveis.

## Resultado

Serviço executável, observável e com contrato versionado, pronto para receber módulos sem trocar de framework no meio do trabalho.

## Fora do épico

Catálogo, regras de negócio, autenticação, deploy definitivo.

## Saída do épico

API sobe localmente/Docker, healthchecks e OpenAPI base passam no CI.

### BE-01 — Inicializar serviço Go e runtime HTTP

**História:** Como equipe de desenvolvimento, quero um serviço Go reproduzível e observável para implementar capacidades sem depender do Next.js.

**Contexto:** o repositório é um Next.js único. O Go entra em `services/api` sem mover o frontend.

**Tasks:**

- [ ] criar módulo Go com versão 1.26;
- [ ] adicionar `net/http` + `chi/v5`;
- [ ] implementar configuração validada no startup;
- [ ] implementar `GET /health/live`;
- [ ] configurar `log/slog` em JSON;
- [ ] adicionar request ID, recoverer, timeout e body limit;
- [ ] implementar graceful shutdown;
- [ ] criar `.env.example`, Makefile e Dockerfile multi-stage;
- [ ] criar testes com `httptest`;
- [ ] documentar como executar.

**Aceite:**

- `make run` inicia em `:8080` com config local;
- `/health/live` retorna 200 sem banco;
- ausência de variável obrigatória encerra startup com erro sem segredo;
- SIGTERM para de aceitar requisições e encerra dentro do timeout;
- panic vira 500 padronizado e log estruturado;
- corpo acima do limite retorna 413;
- imagem Docker executa como usuário não-root quando possível;
- `go test ./...` e `go vet ./...` passam.

**Não fazer:** adicionar Gin/Fiber/Echo, banco, ORM ou domínio de produto.

### BE-02 — Definir OpenAPI, envelopes e erros

**História:** Como frontend, quero um contrato HTTP estável para integrar sem ler a implementação Go.

**Tasks:**

- [ ] criar `services/api/docs/openapi.yaml` em OpenAPI 3.1;
- [ ] documentar healthchecks e estruturas base;
- [ ] definir DTO `data/meta` e `error`;
- [ ] criar mapper central de erros;
- [ ] definir request ID em header/body de erro;
- [ ] definir suporte a locale/fallback;
- [ ] adicionar validação do OpenAPI no CI;
- [ ] criar arquivo `.http` inicial;
- [ ] registrar política de breaking changes.

**Aceite:**

- exemplos do OpenAPI são JSON válidos;
- erro de validação aponta campos sem ecoar conteúdo sensível;
- erro interno não expõe SQL/stack trace;
- todas as operações futuras são adicionadas ao OpenAPI antes ou no mesmo PR;
- um consumidor consegue entender headers, status e envelopes sem outra documentação.

---

# E1 — Domínio e catálogo territorial

## Problema

Conteúdo estático mistura lugar, negócio e experiência; contém dados demonstrativos e duplicados; não pode ser compartilhado com mobile ou operação.

## Resultado

Schema explícito, importação auditável e API pública que substitui `lib/data.ts` de forma gradual.

## Saída do épico

Páginas de hospedagem, experiências e mapa conseguem usar a API em preview com conteúdo de teste e regras de publicação.

### BE-03 — Criar schema incremental e importador legado

**História:** Como equipe de produto, quero transformar o dataset demonstrativo em entidades corretas sem publicar conteúdo fictício.

**Tasks:**

- [ ] configurar pgxpool e readiness;
- [ ] configurar sqlc/pgx v5;
- [ ] criar migrations de localidades, categorias, lugares, negócios, experiências e traduções;
- [ ] criar relações de categoria, lugar, negócio, interesses, públicos e etapas;
- [ ] criar status separados de publicação/verificação;
- [ ] adicionar hardening incremental em `submissions`/`demands` sem editar migration antiga;
- [ ] criar `contact_requests`;
- [ ] criar comando de importação dry-run/apply;
- [ ] mapear enums PT → códigos API;
- [ ] resolver duplicidade da Pousada Serra & Mar;
- [ ] separar seed local/test/production;
- [ ] gerar relatório de importação;
- [ ] testar banco vazio e upgrade do schema atual.

**Aceite:**

- migration original permanece byte a byte inalterada;
- migrations sobem em banco vazio;
- migrations sobem sobre banco com tabelas atuais;
- `sqlc generate` é determinístico;
- importador default não escreve;
- segunda execução com `--apply` não duplica conteúdo;
- demo vira `draft/unverified`;
- nenhum telefone/link fictício é inserido em production;
- relações das quatro experiências atuais permanecem consistentes;
- relatório aponta itens importados, atualizados, ignorados e conflitantes.

### BE-04 — Entregar catálogo público de lugares, negócios e metadados

**História:** Como visitante, quero consultar lugares, hospedagens e iniciativas por categoria/localidade para descobrir o território.

**Tasks:**

- [ ] implementar `GET /v1/catalog/metadata`;
- [ ] implementar coleção/detalhe de lugares;
- [ ] implementar coleção/detalhe de negócios;
- [ ] suportar `kind=lodging`;
- [ ] implementar cursor e limite;
- [ ] implementar filtros e busca textual simples;
- [ ] implementar locale/fallback;
- [ ] filtrar somente publicados;
- [ ] expor apenas contatos públicos;
- [ ] adicionar queries e testes de integração;
- [ ] atualizar OpenAPI e `.http`.

**Aceite:**

- `/hospedar` consegue obter hospedagens pela API;
- coleção vazia retorna 200;
- draft é invisível em coleção e detalhe;
- slug desconhecido retorna 404;
- locale sem tradução retorna PT-BR com meta de fallback;
- paginação não duplica nem pula registros em ordem estável;
- query inválida retorna 400;
- resposta não expõe campo interno ou PII.

### BE-05 — Entregar experiências e mapa

**História:** Como visitante, quero filtrar experiências e visualizar pontos no mapa para decidir o que conhecer e fazer.

**Tasks:**

- [ ] implementar coleção/detalhe de experiências;
- [ ] suportar interesse, duração, formato, público e localidade;
- [ ] retornar etapas e relações ordenadas;
- [ ] implementar `GET /v1/map-points` agregando lugares/negócios;
- [ ] suportar category, locality, q e bbox;
- [ ] proteger/generalizar coordenadas sensíveis;
- [ ] garantir mesma semântica entre mapa e lista;
- [ ] criar testes de filtros, ordenação e coordenadas;
- [ ] atualizar OpenAPI e `.http`.

**Aceite:**

- filtros atuais de `ExperiencesExplorer` têm equivalentes no contrato;
- detalhe contém campos usados pela página `[slug]`;
- etapas e relações mantêm posição;
- negócio sem coordenada não entra no mapa, mas permanece no catálogo;
- coordenada protegida nunca sai exata;
- bbox inválido retorna 400;
- somente published aparece;
- status de verificação é retornado ao frontend.

---

# E2 — Paridade das regras e entradas existentes

## Problema

O quiz e os formulários críticos estão acoplados ao Next.js. Trocar o backend sem testes de caracterização pode alterar recomendações e perder/duplicar dados.

## Resultado

API Go reproduz recomendação e recebe os payloads reais do site com segurança e idempotência.

## Saída do épico

Gate A demonstrado ponta a ponta com o Next usando adaptadores.

### BE-06 — Portar motor de recomendação como `rules-v1`

**História:** Como visitante, quero receber sugestões compatíveis com minhas respostas para encontrar experiências relevantes.

**Tasks:**

- [ ] criar fixtures de caracterização a partir de `lib/recommend.ts`;
- [ ] implementar DTO dos sete passos do quiz;
- [ ] portar pesos atuais sem alteração silenciosa;
- [ ] adicionar desempate estável por slug;
- [ ] devolver motivos traduzíveis/estáveis;
- [ ] informar `algorithmVersion=rules-v1`;
- [ ] documentar respostas ainda ignoradas no score;
- [ ] criar testes table-driven;
- [ ] atualizar OpenAPI e `.http`.

**Aceite:**

- fixtures Go e TypeScript produzem mesma ordem/score;
- apenas published participa;
- score `<=0` não retorna;
- input inválido retorna campos específicos;
- repetição do mesmo input/dataset é determinística;
- `profile`, `hasCar` e `spendProfile` não mudam score em `rules-v1`;
- nenhuma chamada a IA/LLM existe.

### BE-07 — Migrar Cadastro Único e demandas para Go

**História:** Como pessoa que envia uma contribuição/demanda, quero receber protocolo sem perda ou duplicação mesmo durante a refatoração.

**Tasks:**

- [ ] implementar `POST /v1/submissions`;
- [ ] validar 11 tipos e respectivos `details`;
- [ ] implementar protocolo CAM;
- [ ] implementar `POST /v1/demands`;
- [ ] preservar regras atuais de relato/protocolo DEM;
- [ ] implementar idempotência transacional;
- [ ] implementar rate limit e body/field limits;
- [ ] redigir PII em logs;
- [ ] criar testes com payloads reais dos componentes;
- [ ] criar adaptadores nas Route Handlers do Next;
- [ ] preservar formato `{ protocol }` para o componente durante transição;
- [ ] documentar rollback.

**Aceite:**

- todos os tipos válidos geram CAM único;
- campo específico ausente retorna 400 e não grava;
- consentimento ausente não grava;
- demand com relato curto não grava;
- retry da mesma operação retorna protocolo original;
- conflito de idempotência retorna 409;
- banco indisponível retorna 503/requestId e não falso sucesso;
- nenhum corpo/PII aparece em logs;
- componentes atuais funcionam sem alteração de UX no primeiro corte;
- protocolo DEM continua acompanhado do aviso de canal oficial.

---

# E3 — Meu Caminho como solicitação de planejamento

## Problema

O quiz atual só recomenda. Salvar/compartilhar não produz uma operação comercial. Ao mesmo tempo, ainda não existem preço, disponibilidade e reserva automáticos.

## Resultado

Uma seleção anônima feita no frontend vira solicitação válida, rastreável e honesta para atendimento.

## Saída do épico

Gate B demonstrado com protocolo e snapshot imutável.

### BE-08 — Criar planning request a partir da seleção

**História:** Como visitante, quero enviar os itens do meu caminho para receber planejamento personalizado da operação.

**Tasks:**

- [ ] implementar `POST /v1/planning-requests`;
- [ ] validar contato, canal, consentimento e preferências;
- [ ] validar 1–30 referências de lugar/negócio/experiência;
- [ ] rejeitar item inexistente, duplicado ou não publicado;
- [ ] montar snapshot com dados do banco;
- [ ] gerar protocolo PLAN e status `received`;
- [ ] implementar idempotência transacional;
- [ ] associar hash de visitor cookie quando presente;
- [ ] limitar/rate-limit payload;
- [ ] testar imutabilidade do snapshot;
- [ ] documentar semântica de “solicitação, não reserva”;
- [ ] atualizar OpenAPI e `.http`.

**Aceite:**

- combinação válida gera um único protocolo;
- snapshot ignora nome/preço enviado pelo cliente;
- item despublicado bloqueia envio com identificação do índice;
- alteração posterior no catálogo não muda snapshot;
- canal preferido sem contato correspondente é rejeitado;
- período e party size são validados;
- resposta nunca usa “confirmado”, “reservado” ou preço final;
- PII não aparece em logs/respostas públicas;
- retry é seguro.

---

# E4 — Qualidade, integração e handoff

## Problema

Uma API sem CI, teste real de banco, documentação e integração reproduzível apenas transfere o acoplamento para outro serviço.

## Resultado

Backend verificável, operável e consumível pelo frontend sem depender do autor.

## Saída do épico

DoD global atendida e demonstrações Gate A/B aprovadas.

### BE-09 — Cobrir fluxo crítico e pipeline de qualidade

**História:** Como Tech Lead, quero evidência automatizada de comportamento para aceitar a API com risco controlado.

**Tasks:**

- [ ] configurar CI de Go;
- [ ] rodar gofmt/check, vet e testes;
- [ ] rodar testes de integração com PostgreSQL;
- [ ] validar migrations em banco vazio e upgrade;
- [ ] validar OpenAPI;
- [ ] compilar Dockerfile;
- [ ] executar `go test -race` nos módulos aplicáveis;
- [ ] cobrir matriz Gate A/Gate B do runbook;
- [ ] verificar logs sem PII;
- [ ] provar que código gerado está atualizado.

**Aceite:**

- pipeline roda em PR;
- falha de teste/migration/contrato bloqueia merge;
- testes não usam banco de produção;
- fixtures são determinísticas;
- relatório mostra quais cenários Gate A/B foram cobertos;
- build Docker produz imagem inicializável.

### BE-10 — Entregar documentação, integração e rollback

**História:** Como desenvolvedor frontend/operação, quero executar e consumir a API sem depender de conhecimento não documentado.

**Tasks:**

- [ ] finalizar `services/api/README.md`;
- [ ] finalizar OpenAPI e `.http`;
- [ ] documentar variáveis e ambientes;
- [ ] documentar conexão Supabase e prepared statements;
- [ ] documentar migrations/seed/importador;
- [ ] criar matriz frontend → endpoint;
- [ ] registrar feature flags e ordem de migração;
- [ ] escrever deploy e rollback agnósticos de provedor;
- [ ] listar decisões, limitações e riscos;
- [ ] demonstrar Gate A e Gate B;
- [ ] anexar resultados de CI/importação.

**Aceite:**

- novo desenvolvedor sobe API e DB seguindo somente README;
- frontend executa todos os exemplos documentados;
- nenhum comando depende de segredo versionado;
- rollback de leitura e escrita está descrito;
- limitações de rate limit em memória/pooler/locale estão claras;
- handoff contém links para PRs e evidências.

---

## 3. Ordem obrigatória

```text
BE-01
  → BE-02
  → BE-03
  → BE-04 e BE-05
  → BE-06
  → BE-07
  → BE-08
  → BE-09
  → BE-10
```

BE-04 e BE-05 podem avançar em paralelo depois do schema aprovado. BE-09 começa cedo e cresce com cada PR; não deve ser deixada integralmente para o fim.

## 4. O que não vira task escondida

Se surgir trabalho de autenticação, admin, upload, reserva, preço, disponibilidade, WhatsApp automático, tradução automática ou Selo Caminhos, parar e abrir decisão/backlog separado. Não aumentar silenciosamente uma story existente.
