# Caminhos de Mambucaba + Observatório Mambucaba

Duas single-page applications (React) com backend unificado, migradas de um site WordPress.

---

## Arquitetura

```
odd/
├── caminhos-app/          → SPA de turismo de base comunitária (público geral)
├── observatorio-app/      → SPA de inteligência territorial (controle social, dados)
├── backend/               → API REST unificada para as duas SPAs
└── packages/shared/       → Types e utilitários compartilhados
```

As duas SPAs são independentes (domínios separados), mas compartilham o mesmo backend e pacotes de tipos.

---

## Setup rápido

```bash
# 1. Instalar dependências de cada app
cd caminhos-app && npm install
cd ../observatorio-app && npm install
cd ../backend && npm install

# 2. Configurar variáveis de ambiente
cp backend/.env.example backend/.env

# 3. Rodar migrations do banco
cd backend && npx prisma migrate dev

# 4. Iniciar em dev
# Terminal 1:
cd backend && npm run dev
# Terminal 2:
cd caminhos-app && npm run dev
# Terminal 3:
cd observatorio-app && npm run dev
```

---

## Estrutura de cada SPA

```
src/
├── app/                     App.tsx, rotas (react-router-dom), providers
├── features/                Cada feature contém tudo que ela precisa
│   ├── home/                Página inicial
│   ├── visitar/             Mapa, pontos, experiências, hospedagens
│   ├── participar/          Cadastro único (11 tipos)
│   │   ├── components/      Componentes exclusivos da feature
│   │   ├── hooks/           Hooks exclusivos
│   │   ├── services/        Chamadas de API da feature
│   │   └── schemas/         Validação (zod/yup)
│   └── ...
├── shared/                  Código reutilizável entre features
│   ├── components/          Button, Card, Header, Footer, Map, Form...
│   ├── layouts/             MainLayout (header + footer + outlet)
│   ├── hooks/               useApi, useDebounce, useForm...
│   ├── services/            api.ts (axios/fetch instance), ai.ts
│   ├── types/               Interfaces globais (Ponto, Experiencia...)
│   └── utils/               formatadores, constantes
└── assets/                  Imagens, ícones
```

---

## Mapeamento HTML original → Features

### caminhos-app

| Arquivo HTML | Feature | Descrição |
|---|---|---|
| `home.html` | `home` | Hero, 4 caminhos, mapa Leaflet, experiências, hospedagens, indicadores, formulário |
| `old-home.html` | `home` | Versão anterior da home (mais institucional) |
| `conhecer.html` | `conhecer` | O programa: definição, missão/visão/valores, 6 eixos, objetivos, como funciona |
| `visitar-mambucaba.html` | `visitar` | Mapa vivo, pontos de interesse, experiências, hospedagens |
| `cadastro.html` | `participar` | Cadastro único com 11 tipos dinâmicos (hospedagem, empreendimento, experiência, atrativo, mapeamento, selo, formação, voluntário, parceiro, apoio, sugestão) |

### observatorio-app

| Arquivo HTML | Feature | Descrição |
|---|---|---|
| `observatorio-mambucaba.html` | `home` | Hub central: monitor, ferramentas, radar, demandas, publicações, mapa, indicadores |
| `radar-mambucaba.html` | `radar` | Busca Google CSE em portais municipais |
| `motodologia-registro-demandas.html` | `demandas` | Metodologia do registro de demandas com IA |
| `controle-social-feam.html` | `controle-social` | Auditoria documental FEAM/Hospital Praia Brava (5 abas) |
| `relatorio-orçamentario.html` | `relatorio-orcamentario` | Dashboard de dados orçamentários |
| `saude.html` | `saude` | Pesquisa de saúde territorial |
| `sobre.html` | `sobre` | Institucional |
| — | `publicacoes` | Biblioteca digital (bloco dentro do observatorio.html) |

### Páginas estáticas (podem ser componentes simples ou markdown)

| Arquivo | Rota sugerida |
|---|---|
| `politica-ia.html` | `/politica-ia` |
| `politica-privacidade.html` | `/privacidade` |
| `politica-cookies.html` | `/cookies` |
| `termosuso.html` | `/termos` |

---

## Rotas sugeridas

### caminhos-app
```
/                  → home
/conhecer          → conhecer
/visitar           → visitar
/visitar/:id       → ponto específico
/participar        → participar
/mapa              → mapa interativo
/politica-ia       → política IA
/privacidade       → privacidade
/termos            → termos de uso
```

### observatorio-app
```
/                  → home (hub)
/radar             → radar mambucaba
/demandas          → registro de demandas
/demandas/metodologia → metodologia
/controle-social   → auditoria FEAM
/relatorio-orcamentario → relatório
/saude             → pesquisa saúde
/sobre             → sobre
/publicacoes       → biblioteca
```

---

## Modelos de dados (Prisma)

```prisma
model Ponto {
  id          String   @id @default(cuid())
  nome        String
  categoria   String   // comer | hospedar | conhecer | fazer | servicos
  localidade  String
  latitude    Float
  longitude   Float
  descricao   String
  status      String   // validado | em-validacao | demonstrativo
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Experiencia {
  id         String   @id @default(cuid())
  nome       String
  resumo     String
  interesses String[] // ["memória","natureza","cultura"...]
  duracao    String
  status     String
  createdAt  DateTime @default(now())
}

model Hospedagem {
  id          String   @id @default(cuid())
  nome        String
  localidade  String
  tipo        String
  faixa       String   // $ | $$ | $$$
  descricao   String
  createdAt   DateTime @default(now())
}

model Indicador {
  id     String @id @default(cuid())
  valor  String
  rotulo String
}

// Cadastro único (caminhos-app)
model Cadastro {
  id            String   @id @default(cuid())
  tipo          String   // hospedagem | empreendimento | experiencia | atrativo | mapeamento | selo | formacao | voluntario | parceiro | apoio | sugestao
  nome          String
  contato       String
  localidade    String
  vinculo       String
  dados         Json     // campos específicos de cada tipo
  createdAt     DateTime @default(now())
}

// Demanda (observatorio-app)
model Demanda {
  id              String   @id @default(cuid())
  nome            String
  email           String
  localidade      String
  tipoManifestacao String
  tema            String
  referencia      String?
  relato          String
  conversaoTecnica String?
  oficioGerado    String?
  createdAt       DateTime @default(now())
}
```

---

## API Endpoints

### caminhos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/pontos` | Listar pontos (query: `?categoria=comer`) |
| GET | `/api/pontos/:id` | Detalhe do ponto |
| POST | `/api/pontos` | Criar ponto |
| GET | `/api/experiencias` | Listar experiências (query: `?interesse=natureza`) |
| GET | `/api/hospedagens` | Listar hospedagens |
| GET | `/api/indicadores` | Listar indicadores |
| POST | `/api/cadastros` | Enviar cadastro único |

### observatorio

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/demandas` | Criar demanda (com conversão IA) |
| GET | `/api/demandas` | Listar demandas (admin) |
| GET | `/api/publicacoes` | Listar publicações |
| GET | `/api/indicadores-obs` | Indicadores do observatório |
| GET | `/api/controle-social/aditivos` | Dados da auditoria FEAM |

---

## Lógicas de negócio para implementar

### 1. Cadastro único dinâmico (participar)
O formulário em `cadastro.html` tem um `<select>` que, ao mudar, exibe/oculta seções específicas com `display:none`/`display:block` e habilita/desabilita campos. Cada tipo de cadastro tem campos diferentes.

Implementar como:
- Um hook `useTipoCadastro` que controla o estado
- Componentes dinâmicos registrados num map: `tipo → Componente`
- Validação condicional com zod (`.or()` / `discriminatedUnion`)

### 2. Conversão de demanda com IA (observatorio)
O formulário em `observatorio-mambucaba.html` gera:
- Resumo técnico (template string)
- Análise/orientação técnica
- Ofício formatado
- JSON completo

Implementar como:
- Serviço `src/features/demandas/services/demandaService.ts`
- Pode ser feito no frontend (template strings) ou no backend com IA
- Gerar PDF com jsPDF (já incluso no HTML original)
- Botão "Copiar" via clipboard API

### 3. Controle Social FEAM (controle-social)
Implementar como:
- 5 abas usando estado `activeTab`
- Dados mockados em `data/aditivos.ts` (já existe o JSON inline)
- Timeline clicável com painel de inspeção
- Matriz de auditabilidade com filtro de busca

### 4. Mapa interativo (caminhos-app)
O HTML usa Leaflet com:
- Marcadores por categoria (cores diferentes)
- Legenda com filtro
- Lista lateral de pontos
- Popup com informações

Componente `Map` em `shared/components/Map` reutilizável, recebendo `pontos[]` e `categorias`.

---

## Observações para o desenvolvedor

1. **Formspree**: Os formulários originais usavam Formspree como backend de email. A API do backend deve substituir esses endpoints.
2. **Leaflet**: O mapa usa Leaflet via CDN. Instalar `leaflet` e `@types/leaflet` no caminhos-app.
3. **jsPDF**: O observatorio-app usa jsPDF para gerar PDF do ofício. Instalar `jspdf`.
4. **Google CSE**: O Radar usa Google Custom Search Engine (`cx=627514aa9402e4f3b`). Pode ser mantido como iframe/widget ou substituído por busca própria.
5. **Tailwind**: `controle-social-feam.html` e `relatorio-orçamentario.html` usam Tailwind via CDN. Decidir se as SPAs usarão Tailwind ou CSS modules.
6. **Imagens**: Muitas imagens vêm de URL externas (Wikimedia Commons) ou base64 inline. Decidir estratégia de assets.
7. **Tema visual**: Cada HTML tem seu próprio design system (variáveis CSS). Unificar ou manter identidades visuais diferentes para cada SPA.
