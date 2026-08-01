# Caminhos de Mambucaba

Plataforma territorial para descoberta de experiências, participação comunitária e acesso organizado às iniciativas do Observatório Mambucaba.

**Produção:** [instituto-platform.vercel.app](https://instituto-platform.vercel.app)

## Funcionalidades do MVP

- experiências, mapa territorial, hospedagem e roteiro personalizado;
- Cadastro Único de iniciativas e contribuições;
- registro de demandas com protocolo, texto técnico e exportação em texto, JSON e PDF;
- Observatório com biblioteca, Radar, saúde, controle social FEAM e painel orçamentário;
- persistência privada dos cadastros e demandas no Supabase;
- páginas institucionais, contato, termos e políticas;
- SEO técnico com metadados, Open Graph, JSON-LD, sitemap, robots, manifesto e favicon;
- redirecionamentos das principais URLs legadas do WordPress.

Consulte [docs/MVP.md](docs/MVP.md) para o inventário completo, limitações e próximos passos.

## Tecnologias

- Next.js 16, React 19 e TypeScript;
- Tailwind CSS e componentes Base UI;
- Leaflet para mapas;
- Supabase/PostgreSQL para persistência;
- Vercel para build, deploy e Analytics.

## Desenvolvimento local

Requisitos: Node.js 20 ou superior e um projeto Supabase.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`. Nunca exponha a chave `SUPABASE_SERVICE_ROLE_KEY` em variáveis com prefixo `NEXT_PUBLIC_`.

## Variáveis de ambiente

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `SUPABASE_URL` | Sim | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim | Escrita segura executada somente no servidor |
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URL canônica do SEO; em produção use o domínio público |

O banco é preparado pela migration [supabase/migrations/20260801000000_create_intake_tables.sql](supabase/migrations/20260801000000_create_intake_tables.sql).

## Verificação

Antes de publicar:

```bash
npm run lint
npm run build
```

Pushes na branch `main` geram deploy de produção pela integração GitHub–Vercel.

## Estrutura principal

```text
app/          rotas, páginas, APIs e arquivos técnicos de SEO
components/   componentes de interface e formulários
lib/          dados, validações, cliente Supabase e configurações
supabase/     migrations do banco
docs/         documentação funcional e operacional
public/       imagens e arquivos estáticos
```

## Privacidade

Os formulários coletam dados pessoais com consentimento. As tabelas possuem RLS habilitada e não concedem acesso direto aos papéis públicos do Supabase. A chave privilegiada existe somente no servidor.

## Estado do projeto

MVP funcional e publicado. Os itens posteriores ao MVP estão documentados em [docs/MVP.md](docs/MVP.md#próximas-etapas).
