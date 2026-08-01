# Documentação do MVP — Caminhos de Mambucaba

Última atualização: 1º de agosto de 2026.

## Objetivo

O Caminhos de Mambucaba reúne descoberta territorial, experiências, participação cidadã e as ferramentas públicas do Observatório Mambucaba. O MVP substitui formulários externos por uma camada própria de API e persistência no Supabase.

## O que funciona hoje

### Descoberta territorial

- página inicial e apresentação do programa;
- catálogo e páginas individuais de experiências;
- mapa interativo com pontos territoriais e acesso ao Google My Maps;
- hospedagem, visitação e montagem de roteiro por perfil;
- layout responsivo e navegação por teclado.

### Participação e dados

- Cadastro Único com validação no cliente e no servidor;
- gravação na tabela `submissions`;
- protocolo único retornado após o envio;
- consentimento explícito para tratamento das informações;
- mensagens de sucesso e erro sem perder silenciosamente o envio.

### Observatório

- registro de demandas com gravação na tabela `demands`;
- geração de minuta técnica e protocolo;
- cópia e exportação em texto e JSON;
- impressão ou salvamento em PDF pelo diálogo nativo do navegador;
- painel orçamentário interativo;
- biblioteca territorial e relatório orçamentário;
- pesquisa de saúde com aviso metodológico e formulário externo;
- matriz de controle social FEAM;
- Radar com atalhos para pesquisa em fontes oficiais;
- contato, Instagram, Ouvidoria e Defesa Civil.

### Plataforma e SEO

- produção na Vercel integrada à branch `main`;
- banco PostgreSQL no Supabase;
- rotas de API privadas para escrita;
- Vercel Analytics em produção;
- favicon alinhado à marca territorial;
- títulos, descrições, palavras-chave e Open Graph;
- imagem social em 1200 × 630;
- dados estruturados `WebSite` em JSON-LD;
- `sitemap.xml`, `robots.txt` e manifesto web;
- redirecionamentos permanentes das URLs mais importantes do WordPress.

## Fluxos de dados

### Cadastro Único

`/participar` → `POST /api/submissions` → validação → Supabase `submissions` → protocolo.

### Registro de demanda

`/demandas` → `POST /api/demands` → validação → Supabase `demands` → protocolo e documentos locais.

As credenciais administrativas do Supabase nunca são enviadas ao navegador. As tabelas têm RLS ativada e não liberam leitura ou escrita direta para usuários anônimos.

## Conteúdo que exige validação editorial

Alguns dados territoriais, percentuais de saúde, referências FEAM, experiências e valores orçamentários foram migrados ou adaptados de materiais anteriores. Eles estão sinalizados quando necessário e devem ser confirmados com fontes oficiais antes de uso institucional.

O MVP não oferece ainda:

- painel administrativo para moderação;
- consulta pública do andamento por protocolo;
- autenticação e papéis de equipe;
- notificações automáticas por e-mail;
- importação automática de dados oficiais;
- busca interna completa no Radar;
- gestão de conteúdo por CMS;
- geração programática de PDF sem o diálogo de impressão.

## Operação

### Publicação

1. Desenvolver e verificar localmente com `npm run lint` e `npm run build`.
2. Enviar mudanças aprovadas para `main`.
3. Aguardar o deploy de produção na Vercel.
4. Testar páginas principais, formulários, APIs, `sitemap.xml` e `robots.txt`.
5. Conferir logs de erro da Vercel.

### Banco

A estrutura versionada está em `supabase/migrations/`. Mudanças futuras devem ser feitas em novas migrations, nunca editando retroativamente uma migration já aplicada em produção.

### Ambiente

Manter na Vercel, para produção:

- `SUPABASE_URL`;
- `SUPABASE_SERVICE_ROLE_KEY`;
- `NEXT_PUBLIC_SITE_URL` com a URL canônica definitiva.

Ao migrar para domínio próprio, atualizar `NEXT_PUBLIC_SITE_URL`, fazer novo deploy e enviar o novo sitemap ao Google Search Console e ao Bing Webmaster Tools.

## Próximas etapas

### Prioridade alta

1. Criar painel administrativo com autenticação, perfis e trilha de auditoria.
2. Permitir triagem, status e resposta de cadastros e demandas.
3. Implementar consulta segura por protocolo.
4. Revisar conteúdo e dados com responsáveis territoriais.
5. Configurar domínio oficial, Search Console e monitoramento de erros.

### Prioridade média

1. Enviar confirmações e atualizações por e-mail.
2. Migrar conteúdos editáveis para Supabase ou CMS.
3. Adicionar proteção anti-spam e rate limiting aos formulários.
4. Adotar testes automatizados dos fluxos críticos.
5. Criar rotina de backup, retenção e descarte de dados pessoais.

### Evolução de produto

1. Busca interna e indexação de documentos públicos.
2. Sincronização de indicadores com fontes oficiais.
3. Painéis públicos de acompanhamento com dados anonimizados.
4. Gestão colaborativa de experiências e pontos do mapa.

## Critério de encerramento do MVP

O MVP é considerado concluído porque os fluxos públicos essenciais estão online, os dois formulários críticos persistem dados, as ferramentas equivalentes do site anterior estão acessíveis, o projeto possui SEO técnico básico e sua operação está documentada. Os itens acima são evolução, governança e escala — não bloqueiam o uso inicial acompanhado.
