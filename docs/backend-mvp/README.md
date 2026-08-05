# Backend MVP — Caminhos de Mambucaba

**Status:** especificação pronta para implementação
**Última revisão:** 5 de agosto de 2026
**Repositório:** `luis-botelho/instituto-platform`
**Responsável pela implementação:** desenvolvedor backend
**Responsável por decisões de produto/contrato:** Tech Lead/PO

## 1. Missão

Entregar uma API REST em Go que permita retirar dados e regras de negócio do Next.js sem quebrar o produto publicado. O Backend MVP não é uma reescrita abstrata nem o backend final de todo o ICPT. É a primeira fronteira estável entre os clientes web/mobile futuros e o domínio do Caminhos.

O resultado esperado é este:

```text
Next.js atual
  ├── deixa de importar catálogo territorial de lib/data.ts
  ├── deixa de executar recomendação de negócio em lib/recommend.ts
  ├── deixa de gravar diretamente no Supabase pelas Route Handlers
  └── passa a consumir contratos HTTP versionados da API Go
```

## 2. Por que a especificação anterior foi descartada

O planejamento anterior começava por um catálogo genérico, pacote comercial, disponibilidade e jornada persistida. Isso não correspondia ao repositório atual:

- o conteúdo público está em `lib/data.ts` e contém caminhos, categorias, pontos, experiências e hospedagens;
- a recomendação atual é determinística e está em `lib/recommend.ts`;
- as únicas escritas reais são `POST /api/submissions` e `POST /api/demands`;
- o banco de produção possui apenas `submissions` e `demands` na migration existente;
- preços são textos demonstrativos, não valores vendáveis;
- disponibilidade, reserva e pagamento ainda não existem;
- os botões de salvar/compartilhar do quiz não persistem um roteiro.

Esta versão usa esses fatos como ponto de partida. Capacidades futuras entram somente quando existe contrato, regra e critério de aceite.

## 3. Dois gates obrigatórios

### Gate A — paridade segura

A API precisa substituir as dependências atuais sem regressão:

1. servir categorias, lugares/pontos, negócios/hospedagens e experiências;
2. reproduzir o resultado do motor de recomendação existente;
3. receber o Cadastro Único preservando o contrato atual;
4. receber demandas preservando o contrato atual enquanto a página ainda existir;
5. usar as tabelas existentes sem editar migrations já aplicadas;
6. permitir migração gradual do Next.js por feature flag ou adaptador.

### Gate B — primeiro valor comercial honesto

Depois da paridade, a API deve permitir que o frontend envie a seleção feita em “Meu Caminho” como solicitação de planejamento:

1. o visitante seleciona experiências, lugares e negócios no navegador;
2. o frontend envia referências válidas e dados mínimos de contato;
3. a API valida os itens e salva um snapshot imutável;
4. a API devolve protocolo;
5. a resposta deixa claro que não existe reserva, disponibilidade ou pagamento confirmado.

O rascunho do caminho permanece no cliente neste MVP. Persistência entre aparelhos, conta do visitante e edição colaborativa são evoluções posteriores.

## 4. Escopo incluído

- serviço Go dentro do repositório atual;
- conexão direta e segura com PostgreSQL/Supabase;
- migrations incrementais e seed apenas para local/teste;
- contrato OpenAPI versionado;
- endpoints públicos de leitura do catálogo territorial;
- endpoint de recomendação compatível com o quiz atual;
- endpoints de Cadastro Único e demandas;
- endpoint de solicitação de planejamento baseado em uma seleção;
- validação, idempotência, rate limit básico e proteção de payload;
- logs estruturados sem dados pessoais;
- testes unitários, de integração e de contrato;
- Dockerfile, execução local, CI e documentação de handoff;
- estratégia de migração gradual do Next.js para a API.

## 5. Fora do escopo

- pagamentos, checkout e confirmação automática de reserva;
- preço numérico ou disponibilidade em tempo real;
- autenticação de parceiro, magic link e edição de perfil;
- painel administrativo/CMS;
- upload e processamento de imagens;
- avaliações públicas, ranking e Selo Caminhos;
- personalização por IA;
- aplicativo mobile;
- ERP, CRM ou backend completo do ICPT;
- migração do Observatório para o mesmo backend;
- microsserviços, filas, Kafka, Redis e Kubernetes;
- tradução automática de conteúdo;
- escolha definitiva do provedor de hospedagem da API.

Itens fora do escopo não podem ser implementados “aproveitando o embalo”. Devem virar decisão e backlog próprios.

## 6. Regras de produto que o backend deve proteger

1. Conteúdo demonstrativo nunca pode ser publicado como validado.
2. `publication_status` controla visibilidade; `verification_status` comunica confiança. São conceitos diferentes.
3. Dados PT-BR são a fonte inicial. Um locale ausente usa fallback explícito, sem inventar tradução.
4. “Meu Caminho” no MVP é uma seleção que pode virar solicitação de planejamento, não uma reserva.
5. Valores textuais atuais (`$`, `$$`, “sob consulta”) não podem ser convertidos em preço numérico.
6. O Cadastro Único continua aceitando todos os tipos existentes no formulário.
7. O protocolo do Observatório não substitui protocolo de Ouvidoria.
8. Cookies identificam uma sessão anônima; não autenticam parceiro ou administrador.
9. E-mail, telefone, relato e detalhes privados nunca aparecem em endpoints públicos ou logs.
10. A API Go é a dona das regras; Supabase é PostgreSQL/Storage, não uma segunda camada de negócio no frontend.

## 7. Ordem de leitura e execução

1. [`01-ARCHITECTURE.md`](./01-ARCHITECTURE.md) — stack obrigatória e limites arquiteturais.
2. [`02-DOMAIN-DATABASE.md`](./02-DOMAIN-DATABASE.md) — entidades, estados, relações e migração de dados.
3. [`03-API-CONTRACT.md`](./03-API-CONTRACT.md) — endpoints, payloads, respostas e erros.
4. [`04-USER-FLOWS.md`](./04-USER-FLOWS.md) — fluxos do frontend, API, banco e operação.
5. [`05-IMPLEMENTATION-PLAN.md`](./05-IMPLEMENTATION-PLAN.md) — sequência de entrega e migração sem downtime.
6. [`06-QUALITY-RUNBOOK.md`](./06-QUALITY-RUNBOOK.md) — testes, segurança, execução e evidências.
7. [`07-BACKLOG.md`](./07-BACKLOG.md) — épicos, stories, tasks e critérios de aceite.

## 8. Estrutura da entrega no repositório

O Next.js permanece na raiz nesta fase. Não mover tudo para `apps/web` antes de a API existir.

```text
instituto-platform/
├── app/                         # Next.js atual
├── components/                  # frontend atual
├── lib/                         # código legado a ser desacoplado gradualmente
├── services/
│   └── api/
│       ├── cmd/api/main.go
│       ├── internal/
│       ├── db/query/
│       ├── db/generated/
│       ├── docs/openapi.yaml
│       ├── Dockerfile
│       ├── Makefile
│       ├── go.mod
│       ├── go.sum
│       ├── sqlc.yaml
│       └── README.md
├── supabase/migrations/         # única fonte de verdade do schema
└── docs/backend-mvp/            # esta especificação
```

## 9. Definition of Ready

Uma story só começa quando:

- o endpoint ou alteração de banco está identificado;
- as regras e dados de entrada estão documentados;
- critérios de aceitação são testáveis;
- dependências anteriores estão concluídas;
- dúvida de produto que muda contrato foi resolvida;
- nenhum segredo ou dado real é necessário para desenvolver.

## 10. Definition of Done global

O Backend MVP só está entregue quando:

- `go test ./...` passa;
- `go test -race ./...` passa nos módulos concorrentes;
- `go vet ./...` passa;
- `sqlc generate` não gera diff inesperado;
- todas as migrations sobem em banco vazio e em cópia compatível do schema atual;
- nenhuma migration aplicada foi editada;
- OpenAPI representa o comportamento real;
- testes de contrato cobrem respostas usadas pelo Next.js;
- o fluxo Gate A funciona ponta a ponta;
- o fluxo Gate B funciona ponta a ponta;
- logs não expõem PII, token, segredo ou SQL interno;
- o README da API permite a outro desenvolvedor subir o serviço sem ajuda oral;
- existe procedimento de rollback do frontend para a implementação antiga durante a transição;
- a entrega contém limitações conhecidas e decisões pendentes.

## 11. Regra para o desenvolvedor

Se discordar de uma tecnologia ou contrato, não substitua silenciosamente. Abra uma decisão técnica curta contendo:

```text
Contexto
Problema observado
Opção prevista nesta especificação
Alternativa proposta
Impacto no contrato, prazo, operação e manutenção
Recomendação
```

Preferência pessoal não é motivo suficiente para trocar a stack. Mudança precisa resolver um problema demonstrável.
