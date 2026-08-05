# Contrato HTTP do Backend MVP

Este documento define comportamento. A implementação executável correspondente deve existir em `services/api/docs/openapi.yaml`.

## 1. Convenções

### Base URL

```text
local:      http://localhost:8080
staging:    a definir
production: a definir
```

### Headers

| Header | Uso |
|---|---|
| `Accept: application/json` | obrigatório nos clientes |
| `Content-Type: application/json` | obrigatório em POST/PATCH |
| `Accept-Language` | locale desejado; query `locale` tem precedência |
| `X-Request-ID` | opcional na entrada, sempre retornado |
| `Idempotency-Key` | obrigatório nas escritas que criam protocolo |

### Locale

Locales aceitos: `pt-BR`, `en`, `es`, `de`. Default: `pt-BR`.

Toda resposta de conteúdo informa:

```json
{
  "meta": {
    "requestedLocale": "en",
    "resolvedLocale": "pt-BR",
    "usedFallback": true
  }
}
```

### Datas

- timestamps: RFC 3339 em UTC;
- datas sem horário: `YYYY-MM-DD`;
- a operação local usa `America/Sao_Paulo`, mas armazenamento permanece em UTC.

## 2. Envelope de resposta

### Sucesso unitário

```json
{
  "data": {},
  "meta": {
    "requestId": "01J..."
  }
}
```

### Sucesso em coleção

```json
{
  "data": [],
  "meta": {
    "requestId": "01J...",
    "nextCursor": null,
    "count": 0
  }
}
```

### Erro

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Verifique os campos enviados.",
    "fields": {
      "email": "invalid_format"
    },
    "requestId": "01J..."
  }
}
```

Códigos mínimos:

| HTTP | `code` | Quando usar |
|---:|---|---|
| 400 | `INVALID_JSON` | JSON inválido, campos desconhecidos ou query malformada |
| 400 | `VALIDATION_ERROR` | formato/tamanho/enum inválido |
| 404 | `NOT_FOUND` | recurso inexistente ou não publicado |
| 409 | `IDEMPOTENCY_CONFLICT` | mesma chave usada com payload diferente |
| 413 | `PAYLOAD_TOO_LARGE` | corpo acima do limite |
| 422 | `BUSINESS_RULE_VIOLATION` | JSON válido que viola regra de domínio |
| 429 | `RATE_LIMITED` | limite de abuso atingido |
| 500 | `INTERNAL_ERROR` | falha não prevista, sem detalhes internos |
| 503 | `DEPENDENCY_UNAVAILABLE` | banco indisponível/readiness falhou |

## 3. Saúde

### `GET /health/live`

Confirma que o processo está vivo. Não consulta banco.

```json
{"status":"ok"}
```

### `GET /health/ready`

Confirma configuração carregada e conexão com PostgreSQL. Retorna `503` quando não está pronto.

## 4. Metadados públicos

### `GET /v1/catalog/metadata?locale=pt-BR`

Entrega enums que o frontend usa para filtros e quiz: categorias, interesses, durações, formatos, públicos e localidades ativas.

Não inclui tipos internos, status privados ou informações pessoais.

## 5. Lugares

### `GET /v1/places`

Query:

| Parâmetro | Regra |
|---|---|
| `locale` | opcional |
| `category` | código de categoria |
| `locality` | slug da localidade |
| `q` | 2–80 caracteres; busca simples em nome/resumo |
| `limit` | 1–50, default 20 |
| `cursor` | cursor opaco devolvido pela API |

Retorna somente `publication_status=published`.

### `GET /v1/places/{slug}`

Retorna detalhes, categorias, localidade, coordenadas permitidas, acessibilidade, acesso, cuidados e status de verificação.

Não retornar fonte interna, notas privadas ou coordenada protegida exata.

## 6. Negócios e hospedagens

### `GET /v1/businesses`

Filtros: `kind`, `category`, `locality`, `q`, `locale`, `limit`, `cursor`.

Para a página `/hospedar`, o frontend usa:

```http
GET /v1/businesses?kind=lodging&locale=pt-BR
```

### `GET /v1/businesses/{slug}`

Retorna somente contatos marcados como públicos e conteúdo publicado.

## 7. Experiências

### `GET /v1/experiences`

Filtros compatíveis com `components/experiences/experiences-explorer.tsx`:

| Parâmetro | Valores |
|---|---|
| `interest` | código de interesse |
| `duration` | `short`, `half_day`, `full_day` |
| `format` | `self_guided`, `guided` |
| `audience` | `solo`, `couple`, `family`, `group` |
| `locality` | slug |
| `locale` | locale suportado |

### `GET /v1/experiences/{slug}`

Resposta inclui:

- nome, resumo e justificativa;
- imagem de capa;
- duração e formato;
- interesses e públicos;
- sequência ordenada;
- lugares/negócios relacionados;
- deslocamento, cuidados e acessibilidade;
- `priceNote` textual;
- status de verificação.

## 8. Mapa

### `GET /v1/map-points`

O endpoint agrega lugares e negócios publicáveis que possuem coordenadas.

Query:

```text
category=eat
locality=parque-mambucaba
q=cozinha
bbox=minLng,minLat,maxLng,maxLat
locale=pt-BR
limit=200
```

Resposta por item:

```json
{
  "id": "uuid",
  "kind": "business",
  "slug": "cozinha-comunitaria-do-pereque",
  "name": "Cozinha Comunitária do Perequê",
  "category": {"code":"eat","label":"Onde comer","color":"#c1622f"},
  "locality": {"slug":"pereque","name":"Perequê"},
  "coordinates": {"lat":-23.0088,"lng":-44.2846,"precision":"approximate"},
  "summary": "...",
  "verificationStatus": "in_review"
}
```

Se `coordinate_precision=protected`, devolver centro aproximado autorizado ou omitir coordenadas; nunca transmitir a coordenada protegida.

## 9. Recomendação determinística

### `POST /v1/recommendations/experiences`

Entrada compatível com o quiz atual:

```json
{
  "profile": "visitor",
  "availableTime": "half_day",
  "company": "couple",
  "interests": ["history", "gastronomy"],
  "hasCar": true,
  "needsAccessibility": false,
  "format": "guided",
  "spendProfile": "medium"
}
```

Resposta:

```json
{
  "data": [
    {
      "experience": {},
      "score": 13,
      "reasons": [
        "Combina com seus interesses",
        "Cabe no tempo que você tem",
        "Indicada para o seu grupo"
      ]
    }
  ],
  "meta": {
    "algorithmVersion": "rules-v1",
    "requestId": "01J..."
  }
}
```

Regras de `rules-v1`, copiadas do comportamento atual:

- +3 por interesse coincidente;
- +3 por duração igual;
- +1 quando a experiência cabe em tempo maior informado;
- +2 para público compatível;
- +2 para formato compatível;
- +2 quando acessibilidade solicitada e conteúdo indica condição adequada;
- -1 quando acessibilidade solicitada e condição não é adequada;
- excluir score `<= 0`;
- ordenar score decrescente e, em empate, usar slug crescente para estabilidade.

`profile`, `hasCar` e `spendProfile` existem no quiz, mas o algoritmo atual não os usa. A versão `rules-v1` deve registrar isso em teste. Qualquer novo peso exige `algorithmVersion` nova e decisão de produto.

## 10. Cadastro Único

### `POST /v1/submissions`

Contrato aceito pelo frontend atual:

```json
{
  "type": "hospedagem",
  "name": "Nome da pessoa",
  "phone": "+5524999999999",
  "email": "pessoa@example.com",
  "locality": "Parque Mambucaba",
  "relationship": "Empreendedor(a) local",
  "notes": "Opcional",
  "consent": true,
  "details": {
    "nome_hospedagem": "Pousada Exemplo",
    "tipo_hospedagem": "Pousada",
    "endereco": "Referência territorial"
  }
}
```

Regras:

- `Idempotency-Key` obrigatório;
- consentimento `true`; o adaptador Next temporário também aceita `autorizado` e converte para boolean;
- todos os campos comuns validados no servidor;
- `details` validado conforme matriz de `02-DOMAIN-DATABASE.md`;
- protocolo `CAM-AAAA-XXXXXXXX`, aleatório e único;
- status inicial `pending`;
- não retornar o registro privado.

Resposta `201`:

```json
{
  "data": {
    "protocol": "CAM-2026-A1B2C3D4",
    "status": "pending"
  },
  "meta": {"requestId":"01J..."}
}
```

Repetição com mesma chave e mesmo payload devolve a mesma resposta. Mesma chave com payload diferente retorna `409`.

## 11. Demandas: compatibilidade temporária

### `POST /v1/demands`

```json
{
  "name": "Nome",
  "email": "pessoa@example.com",
  "locality": "Parque Mambucaba",
  "manifestationType": "Solicitação",
  "topic": "Mobilidade",
  "territorialReference": "Referência opcional",
  "report": "Relato com no mínimo 30 caracteres...",
  "consent": true
}
```

Regras e resposta preservam a implementação atual. Protocolo `DEM-AAAA-XXXXXXXX`, status inicial `received`. O texto da resposta e a documentação devem afirmar que esse protocolo não é protocolo da Ouvidoria.

## 12. Solicitação de planejamento de “Meu Caminho”

### `POST /v1/planning-requests`

Entrada:

```json
{
  "name": "Visitante",
  "email": "visitante@example.com",
  "phone": "+5524999999999",
  "preferredChannel": "whatsapp",
  "locale": "pt-BR",
  "consent": true,
  "selection": [
    {"kind":"experience","id":"uuid"},
    {"kind":"business","id":"uuid"},
    {"kind":"place","id":"uuid"}
  ],
  "preferences": {
    "startDate": "2026-09-10",
    "endDate": "2026-09-12",
    "partySize": 2,
    "budgetProfile": "medium",
    "notes": "Preferência por atividades leves"
  }
}
```

Regras:

- `Idempotency-Key` obrigatório;
- 1–30 itens;
- cada referência precisa existir e estar publicada;
- IDs repetidos são rejeitados ou normalizados de forma documentada; recomendação: rejeitar com campo específico;
- ao menos e-mail ou telefone válido;
- `preferredChannel` precisa apontar para um contato presente;
- consentimento obrigatório;
- `startDate <= endDate`;
- `partySize` entre 1 e 50;
- snapshot montado pelo backend a partir do banco;
- resposta não contém disponibilidade ou preço final.

Resposta `201`:

```json
{
  "data": {
    "protocol": "PLAN-2026-A1B2C3D4",
    "status": "received",
    "message": "Solicitação recebida. Valores e disponibilidade serão confirmados no atendimento."
  },
  "meta": {"requestId":"01J..."}
}
```

## 13. Compatibilidade com as rotas Next.js existentes

Durante a migração:

```text
POST /api/submissions (Next)
  → normaliza payload legado
  → POST /v1/submissions (Go)
  → converte envelope para { protocol } enquanto necessário

POST /api/demands (Next)
  → normaliza payload legado
  → POST /v1/demands (Go)
  → converte envelope para { protocol }
```

Isso permite implantar a API sem editar imediatamente os componentes dos formulários e oferece rollback rápido.

## 14. Contratos que não devem existir neste MVP

Não criar:

```text
POST /payments
POST /checkout
POST /reservations
GET  /availability
POST /partners/login
PATCH /partners/profile
POST /reviews
POST /seal/scores
```

Essas rotas exigem regras jurídicas, comerciais, de identidade e operação ainda não definidas.
