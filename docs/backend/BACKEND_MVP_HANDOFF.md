# Handoff — MVP da API Caminhos de Mambucaba

## 1. Missão da entrega

Entregar uma API REST em Go que permita ao frontend Next.js executar o primeiro fluxo comercial completo:

```text
consultar catálogo publicado
→ consultar itens no mapa
→ criar Meu Caminho anônimo
→ adicionar/remover/reordenar itens
→ enviar solicitação de atendimento
→ receber protocolo
```

O objetivo não é construir toda a plataforma. O objetivo é entregar um backend pequeno, documentado, testável e consumível pelo frontend.

## 2. Stack obrigatória

- Go 1.24 ou versão estável definida no `go.mod`;
- API REST com JSON;
- PostgreSQL hospedado no Supabase;
- migrations SQL versionadas no repositório;
- `net/http` com `chi`, ou framework já aprovado pelo Tech Lead;
- validação explícita de entrada;
- OpenAPI em `services/api/docs/openapi.yaml`;
- Dockerfile para execução da API;
- testes com o pacote `testing` do Go.

Não usar Supabase como regra de negócio no frontend. O frontend conversa com a API; a API conversa com o banco.

## 3. Estrutura esperada

```text
services/api/
├── cmd/api/main.go
├── internal/
│   ├── catalog/
│   ├── journeys/
│   ├── leads/
│   ├── platform/httpx/
│   └── platform/postgres/
├── migrations/
├── docs/openapi.yaml
├── .env.example
├── Dockerfile
├── go.mod
└── README.md
```

Cada módulo pode conter `handler`, `service`, `repository` e modelos próprios. Não criar microsserviços, Kafka, filas ou abstrações genéricas sem uso real.

## 4. Escopo funcional P0

### 4.1 Saúde da aplicação

```http
GET /health
```

Resposta `200`:

```json
{"status":"ok"}
```

### 4.2 Catálogo público

```http
GET /v1/catalog?type=place&locale=pt-BR&page=1&pageSize=20
GET /v1/catalog/{type}/{slug}?locale=pt-BR
GET /v1/map/items?minLat=-23.1&minLng=-44.8&maxLat=-22.9&maxLng=-44.5
```

Tipos aceitos no MVP: `place`, `business`, `experience`, `event` e `package`.

Regras:

- retornar apenas registros com `status=published`;
- paginação deve ser determinística;
- filtros inválidos retornam `400`;
- slug inexistente retorna `404`;
- tradução solicitada usa fallback para `pt-BR` e informa `resolvedLocale`;
- coordenadas protegidas nunca saem com precisão real;
- preço e disponibilidade devem indicar quando são estimativas.

### 4.3 Meu Caminho anônimo

```http
POST   /v1/journeys
GET    /v1/journeys/{token}
POST   /v1/journeys/{token}/items
PATCH  /v1/journeys/{token}/items/{itemId}
DELETE /v1/journeys/{token}/items/{itemId}
```

Exemplo de criação:

```json
{
  "locale": "pt-BR",
  "startDate": "2026-09-10",
  "endDate": "2026-09-12",
  "partySize": 2,
  "budgetProfile": "intermediate"
}
```

Regras:

- a API gera token opaco e imprevisível; não expor ID sequencial;
- token identifica somente a jornada, não autentica parceiro ou administrador;
- a mesma oferta não pode ser duplicada na jornada;
- `position` deve permanecer consistente após inclusão, remoção e reordenação;
- alterações concorrentes não podem corromper a ordem;
- jornada expira após período configurável;
- preço salvo na jornada é estimativa, nunca confirmação de reserva.

### 4.4 Lead de atendimento

```http
POST /v1/leads
```

Entrada mínima:

```json
{
  "journeyToken": "token-opaco",
  "name": "Visitante",
  "email": "visitante@example.com",
  "whatsapp": "+5524999999999",
  "preferredChannel": "whatsapp",
  "consent": true
}
```

Regras:

- exigir ao menos e-mail ou WhatsApp válido;
- consentimento é obrigatório;
- salvar snapshot imutável dos itens e estimativas da jornada;
- gerar protocolo público não sequencial;
- repetir a mesma requisição com a mesma chave de idempotência não cria outro lead;
- resposta confirma solicitação, não reserva ou pagamento;
- aplicar proteção simples contra abuso e limitar payload.

Resposta `201`:

```json
{
  "data": {
    "protocol": "CAM-7K9Q2M",
    "status": "submitted",
    "message": "Solicitação recebida. A disponibilidade será confirmada no atendimento."
  }
}
```

## 5. Modelo mínimo de dados

Criar migrations para:

- `catalog_items` — identidade comum, tipo, slug, status, preço indicativo e coordenadas;
- `catalog_translations` — título, resumo e descrição por locale;
- `categories` e `catalog_item_categories`;
- `journeys` — token hasheado, contexto, expiração e timestamps;
- `journey_items` — referência ao catálogo, posição e snapshot de preço;
- `leads` — protocolo, contato, consentimento e status;
- `lead_journey_snapshots` — cópia imutável do caminho enviado.

Use UUID nas chaves internas. Salve hash do token da jornada, não o token puro. Índices mínimos: slug/tipo, status, coordenadas, hash do token, expiração e protocolo.

## 6. Padrão de resposta

Sucesso:

```json
{"data": {}, "meta": {}}
```

Erro:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Verifique os campos enviados.",
    "fields": {"email": "invalid"},
    "requestId": "req_..."
  }
}
```

Nunca retornar erro SQL, stack trace, secret, token ou detalhes internos. Status mínimos: `400`, `404`, `409`, `422`, `429` e `500`.

## 7. Requisitos não funcionais

- variáveis validadas no startup e documentadas em `.env.example`;
- CORS restrito aos hosts configurados;
- timeout de servidor e banco;
- limite de corpo da requisição;
- logs estruturados com `request_id`, sem telefone/e-mail completos;
- queries parametrizadas;
- graceful shutdown;
- seed com dados fictícios PT/EN;
- nenhuma credencial versionada;
- tratamento de datas e horários com timezone explícito.

## 8. Testes obrigatórios

No mínimo:

1. catálogo não retorna rascunho;
2. fallback de tradução funciona;
3. item inexistente retorna `404` padronizado;
4. jornada é criada e recuperada pelo token;
5. item duplicado retorna `409`;
6. reordenação mantém posições consistentes;
7. token inválido/expirado não recupera jornada;
8. lead sem consentimento é rejeitado;
9. idempotência impede lead duplicado;
10. snapshot do lead não muda quando o catálogo muda.

Testes de repositório devem rodar contra PostgreSQL de teste ou container, não contra produção.

## 9. Fora do escopo desta entrega

- login/magic link de parceiros;
- painel administrativo completo;
- upload de imagens;
- avaliações e Selo Caminhos;
- recomendação personalizada;
- pagamento, checkout ou reserva automática;
- integração direta com WhatsApp;
- aplicativo mobile;
- Observatório e Portal ICPT.

Se algo desta lista parecer necessário, registrar a dúvida; não implementar silenciosamente.

## 10. Ordem de trabalho sugerida

1. bootstrap, configuração, conexão, healthcheck e CI;
2. migrations e seed;
3. contrato OpenAPI e padrão de erros;
4. catálogo e mapa;
5. jornadas e itens;
6. leads, snapshot e idempotência;
7. testes de integração, Dockerfile e documentação.

Antes de codificar cada módulo, confirmar contrato e critérios de aceite. Abrir PR pequeno por story; não entregar tudo em um único PR gigante.

## 11. Definition of Done

A entrega só está pronta quando:

- `go test ./...` passa;
- `go vet ./...` passa;
- migrations sobem em banco vazio;
- seed cria conteúdo demonstrável;
- OpenAPI corresponde ao comportamento real;
- frontend consegue consumir o fluxo completo;
- README explica execução local e variáveis;
- PR não contém secrets nem dados pessoais reais;
- cada endpoint possui exemplo de request/response;
- erros e casos negativos foram demonstrados.

## 12. Evidência esperada no handoff

O estagiário deve entregar:

- link do PR;
- lista de decisões e dúvidas;
- comando para subir API e banco;
- collection HTTP ou arquivo `.http` reproduzível;
- resultado dos testes;
- vídeo curto ou demonstração ao vivo do fluxo completo;
- limitações conhecidas e próximos passos.

## 13. Regra de escalonamento

Parar e pedir decisão ao Tech Lead quando houver mudança de contrato, nova dependência de infraestrutura, dado pessoal adicional, custo externo ou ampliação do escopo. Dúvidas técnicas comuns devem vir acompanhadas de: contexto, alternativas consideradas e recomendação do estagiário.