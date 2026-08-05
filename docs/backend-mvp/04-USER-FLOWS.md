# User flows e fluxos de dados

## 1. Visitante explora experiências

**Ator:** visitante
**Resultado:** encontra conteúdo publicado e abre detalhe indexável no Next.js.

```mermaid
flowchart TD
    A["Abre /experiencias"] --> B["Next consulta GET /v1/experiences"]
    B --> C["API filtra published e resolve locale"]
    C --> D["Visitante aplica interesse, duração ou formato"]
    D --> E["Next consulta coleção filtrada"]
    E --> F["Visitante abre /experiencias/slug"]
    F --> G["Next consulta detalhe por slug"]
```

Exceções:

- catálogo vazio deve retornar `200` + `data: []`, não `404`;
- slug inexistente ou não publicado retorna `404`;
- tradução ausente retorna PT-BR com fallback declarado;
- conteúdo `draft` nunca aparece mesmo que o ID/slug seja conhecido.

## 2. Visitante explora o mapa

**Ator:** visitante
**Resultado:** visualiza lugares e negócios publicáveis sem expor coordenadas sensíveis.

```mermaid
flowchart TD
    A["Abre /mapa"] --> B["Frontend envia bbox e filtros"]
    B --> C["API consulta lugares e negócios"]
    C --> D{"Coordenada permitida?"}
    D -->|Exata/aproximada| E["Retorna pin"]
    D -->|Protegida| F["Generaliza ou omite"]
    E --> G["Mapa e lista exibem mesmos itens"]
    F --> G
```

Regras:

- lista e mapa vêm do mesmo endpoint para não divergir;
- negócio sem coordenada pode aparecer no catálogo, mas não no mapa;
- contato só aparece quando público e validado para publicação;
- filtro de texto continua cobrindo nome, localidade e resumo.

## 3. Visitante recebe recomendação pelo quiz

**Ator:** visitante
**Resultado:** recebe experiências ordenadas por regras transparentes.

```mermaid
flowchart TD
    A["Responde 7 etapas"] --> B["Next envia respostas"]
    B --> C["API valida enums"]
    C --> D["Motor rules-v1 calcula score"]
    D --> E["API filtra score menor/igual a zero"]
    E --> F["Retorna experiências e motivos"]
    F --> G["Frontend mostra sugestões"]
```

O motor não é IA. `profile`, `hasCar` e `spendProfile` ainda não alteram score. Isso deve permanecer visível na documentação e nos testes até o PO aprovar outra regra.

## 4. Pessoa envia Cadastro Único

**Ator:** morador, empreendedor, organização, visitante ou colaborador
**Resultado:** contribuição privada armazenada com protocolo.

```mermaid
flowchart TD
    A["Seleciona tipo em /participar"] --> B["Preenche campos comuns e específicos"]
    B --> C["Next envia ao adaptador /api/submissions"]
    C --> D["Adaptador chama POST /v1/submissions"]
    D --> E{"Validação e consentimento válidos?"}
    E -->|Não| F["Erro por campo; formulário preserva dados"]
    E -->|Sim| G["API grava submissions"]
    G --> H["Retorna protocolo CAM"]
```

Regras:

- o frontend não define o protocolo;
- `details` é validado conforme o tipo;
- repetição por timeout com a mesma chave não duplica registro;
- protocolo não permite consulta pública de PII neste MVP;
- sucesso não significa aprovação/publicação.

## 5. Pessoa registra demanda enquanto o fluxo existir

**Ator:** cidadão
**Resultado:** cópia privada registrada no Observatório com protocolo próprio.

```mermaid
flowchart TD
    A["Preenche /demandas"] --> B["Gera minuta local"]
    B --> C["Autoriza envio da cópia"]
    C --> D["Next chama POST /v1/demands"]
    D --> E["API valida relato e consentimento"]
    E --> F["Grava demands e devolve DEM"]
    F --> G["Interface reforça canal oficial da Ouvidoria"]
```

Este fluxo é compatibilidade do produto publicado. Ele não autoriza trazer todo o domínio do Observatório para o Backend MVP do Caminhos.

## 6. Visitante monta “Meu Caminho” e solicita planejamento

**Ator:** visitante anônimo
**Resultado:** seleção local vira solicitação de atendimento, sem falsa reserva.

```mermaid
flowchart TD
    A["Salva itens no navegador"] --> B["Organiza seleção e preferências"]
    B --> C["Informa contato e consente"]
    C --> D["POST /v1/planning-requests com IDs"]
    D --> E["API valida itens publicados"]
    E --> F["API cria snapshot e protocolo PLAN"]
    F --> G["Operação recebe solicitação"]
```

Exceções:

- item removido ou despublicado antes do envio: retornar erro por item para o usuário ajustar;
- contato ausente: `400`;
- canal preferido sem dado correspondente: `422`;
- mesma chave/payload: retornar protocolo anterior;
- mesma chave/payload diferente: `409`;
- nenhuma resposta pode usar “reserva confirmada”.

## 7. Migração de leitura sem interromper o site

**Ator:** equipe técnica
**Resultado:** página muda da fonte estática para a API com rollback controlado.

```mermaid
flowchart TD
    A["API e conteúdo homologados"] --> B["Cliente Next implementado"]
    B --> C["Feature flag habilita página em preview"]
    C --> D{"Contrato e conteúdo corretos?"}
    D -->|Não| E["Flag volta para fonte legada"]
    D -->|Sim| F["Habilita produção gradualmente"]
    F --> G["Remove fallback após janela estável"]
```

Critérios antes de remover fallback:

- mesmas capacidades visíveis ou decisão explícita de mudança;
- nenhum conteúdo fictício promovido;
- logs sem aumento anormal de `4xx/5xx`;
- SEO e renderização do Next continuam funcionando;
- rotas públicas críticas testadas em produção.

## 8. Migração das escritas do Next para Go

```mermaid
sequenceDiagram
    participant U as Usuário
    participant N as Next.js
    participant G as API Go
    participant P as PostgreSQL
    U->>N: Envia formulário
    N->>G: Payload normalizado + Idempotency-Key
    G->>G: Valida contrato e regra
    G->>P: INSERT transacional
    P-->>G: Registro + protocolo
    G-->>N: Envelope v1
    N-->>U: Protocolo no formato atual
```

Enquanto o adaptador existir, o navegador continua chamando `/api/submissions` e `/api/demands`. Isso evita CORS, permite rollback e reduz o tamanho da primeira alteração do frontend.

## 9. Falha de dependência

```mermaid
flowchart TD
    A["API recebe escrita"] --> B{"Banco disponível?"}
    B -->|Sim| C["Executa transação"]
    B -->|Não| D["503 + requestId"]
    C --> E{"Commit confirmado?"}
    E -->|Sim| F["201 + protocolo"]
    E -->|Indeterminado| G["Cliente repete com mesma chave"]
    G --> H["API devolve resultado original"]
```

Esse é o motivo de idempotência ser requisito e não acabamento.

## 10. Handoff para o frontend

O backend entrega ao frontend:

- URL de ambiente;
- OpenAPI atualizado;
- exemplos `.http`/collection;
- matriz endpoint → página/componente atual;
- enum legado → enum API;
- tratamento esperado de vazio/erro/fallback;
- instruções para `Idempotency-Key`;
- dados de seed local sem PII;
- lista de limitações.

Mapeamento mínimo:

| Frontend atual | Contrato Go |
|---|---|
| `lib/data.ts::CATEGORIAS` | `GET /v1/catalog/metadata` |
| `lib/data.ts::PONTOS` | `GET /v1/map-points` + detalhes de lugar/negócio |
| `lib/data.ts::EXPERIENCIAS` | `GET /v1/experiences` e `/{slug}` |
| `lib/data.ts::HOSPEDAGENS` | `GET /v1/businesses?kind=lodging` |
| `lib/recommend.ts::recomendar` | `POST /v1/recommendations/experiences` |
| `/api/submissions` | adaptador para `POST /v1/submissions` |
| `/api/demands` | adaptador para `POST /v1/demands` |
| botão futuro de solicitar plano | `POST /v1/planning-requests` |
