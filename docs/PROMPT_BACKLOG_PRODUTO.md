# Prompt para construção do backlog do produto

Última consolidação do contexto: 3 de agosto de 2026.

Este documento é um prompt reutilizável. Ele consolida o estado observado no repositório, o `README.md`, a documentação do MVP e o Plano Mestre da Plataforma ICPT. Copie a seção entre **INÍCIO DO PROMPT** e **FIM DO PROMPT** para a ferramenta que apoiará a definição do backlog.

> Importante: este retrato descreve o repositório atual do **Caminhos de Mambucaba**, que também incorpora as páginas públicas do Observatório Mambucaba. O Plano Mestre apresenta uma visão futura mais ampla da Plataforma ICPT; essa visão não deve ser confundida com funcionalidade já entregue nem convertida integralmente em backlog sem priorização de produto.

---

## INÍCIO DO PROMPT

Você atuará como Product Manager sênior, com experiência em produtos cívicos, plataformas territoriais, serviços públicos digitais, LGPD e acessibilidade. Sua missão é transformar o contexto abaixo em uma proposta de backlog de produto priorizada, formada por épicos e histórias/tarefas executáveis.

Não comece inventando funcionalidades. Primeiro interprete o estado atual, separe fatos de hipóteses e aponte as decisões que faltam. Preserve o que já funciona e trate conteúdo, governança, segurança, operação e validação territorial como trabalho de produto, não apenas como trabalho técnico.

### 1. Contexto do produto

O **Caminhos de Mambucaba** é uma plataforma territorial que reúne:

- descoberta de lugares, experiências, hospedagens e iniciativas locais;
- turismo de base comunitária e valorização de memória, cultura e produção local;
- participação comunitária no mapeamento do território;
- um roteiro personalizado chamado “Monte seu Caminho”;
- ferramentas públicas do **Observatório Mambucaba**, voltadas a dados, pesquisas, demandas cidadãs, orçamento, saúde e controle social.

Os públicos representados na experiência atual são:

1. moradores e comunidades (“quem vive”);
2. visitantes e viajantes (“quem visita”);
3. empreendedores e iniciativas locais (“quem empreende”);
4. pesquisadores, instituições e poder público (“quem pesquisa”).

O princípio central é que o território começa por quem o vive. Dados territoriais e públicos precisam ter fonte, data e status de validação; automações não substituem revisão humana; dados pessoais devem ser mínimos e protegidos; acessibilidade e bom funcionamento no celular são requisitos essenciais.

### 2. Estado atual comprovado no repositório

#### Produto público e navegação

A aplicação é um site responsivo em português, com navegação desktop e mobile. Existem páginas para:

- início e apresentação do programa;
- visitação e orientações ao visitante;
- catálogo filtrável de experiências e quatro páginas individuais de experiência;
- mapa territorial interativo, com filtros por categoria e link para um Google My Maps;
- catálogo de hospedagens;
- quiz “Monte seu Caminho”, com sete etapas e recomendação por regras;
- participação/Cadastro Único;
- central do Observatório;
- registro de demandas;
- Radar de pesquisa em fontes oficiais;
- pesquisa de saúde;
- relatório e painel orçamentário de 2026;
- controle social do Hospital de Praia Brava/FEAM e página de experiências de controle social;
- biblioteca territorial, metodologia, apresentação do Observatório e contato;
- Política de Privacidade, Política de Cookies, Política de IA e Termos de Uso.

Também há SEO técnico básico: metadados, Open Graph, JSON-LD, sitemap, robots, manifesto, ícones e redirecionamentos de URLs legadas do WordPress.

#### Conteúdo territorial e recomendação

O conteúdo do catálogo está hoje definido diretamente no código. A base demonstrativa contém:

- quatro perfis/caminhos de público;
- cinco categorias territoriais;
- oito pontos no mapa;
- quatro experiências;
- três hospedagens;
- indicadores e publicações de demonstração;
- recomendação determinística por interesses, tempo, companhia, formato e acessibilidade.

Não existe IA no motor de recomendação atual. Ele é um algoritmo simples de pontuação por regras executado na aplicação.

#### Cadastro Único e participação

Em `/participar`, uma pessoa escolhe um tipo de contribuição, preenche identificação, contato, localidade, vínculo e campos específicos. Os tipos atuais incluem cadastro de hospedagem, iniciativa, lugar/ponto do território, experiência e contribuição para o Observatório.

O envio passa por validação no cliente e no servidor, exige consentimento e segue este fluxo:

`/participar` → `POST /api/submissions` → validação → tabela privada `submissions` no Supabase → protocolo `CAM-ANO-CÓDIGO`.

A tabela já prevê os estados `pending`, `reviewing`, `approved`, `rejected` e `archived`, mas não existe interface administrativa para operá-los.

#### Registro de demandas

Em `/demandas`, uma pessoa informa nome, e-mail, localidade, tipo de manifestação, tema, referência territorial e relato. A aplicação:

- estrutura localmente uma minuta de manifestação cidadã;
- mantém um rascunho no `localStorage`;
- permite copiar, baixar texto, visualizar/baixar JSON e imprimir/salvar como PDF;
- direciona para a Ouvidoria oficial;
- mediante consentimento, envia uma cópia privada ao Observatório e devolve protocolo.

Fluxo persistido:

`/demandas` → `POST /api/demands` → validação → tabela privada `demands` no Supabase → protocolo `DEM-ANO-CÓDIGO`.

A tabela prevê os estados `received`, `reviewing`, `forwarded`, `answered` e `archived`, mas eles ainda não são gerenciados por uma equipe dentro da aplicação. O protocolo do Observatório não substitui o protocolo da Ouvidoria ou de outro órgão público.

#### Observatório

O Observatório oferece hoje uma central de acesso às ferramentas, mas grande parte dos dados estáticos vive no código:

- Radar monta buscas externas em cinco fontes públicas; não há indexação nem busca interna;
- saúde apresenta três percentuais de uma escuta territorial e encaminha a formulário externo;
- orçamento apresenta quatro ações estáticas e valores da LOA 2026;
- controle social FEAM apresenta quatro achados/riscos estáticos;
- biblioteca organiza quatro publicações que, na prática, apontam para páginas da própria aplicação.

Essas ferramentas comunicam limites metodológicos e revisão humana, mas os dados e referências precisam de validação editorial e documental antes de serem tratados como informação institucional definitiva.

#### Arquitetura e operação

Estado técnico atual:

- um único aplicativo Next.js 16, React 19 e TypeScript;
- Tailwind CSS, Base UI/shadcn e Lucide;
- Leaflet/React Leaflet para mapas;
- Supabase/PostgreSQL para os dois fluxos persistidos;
- APIs de escrita implementadas como rotas do Next.js;
- Vercel para produção e Analytics;
- tabelas com UUID, índices, RLS habilitada e acesso público revogado;
- escrita com `SUPABASE_SERVICE_ROLE_KEY` somente no servidor;
- deploy de produção associado à branch `main`;
- scripts disponíveis: desenvolvimento, lint, build e start.

O projeto ainda não é o monorepo descrito no Plano Mestre. Não há backend central independente, pacotes compartilhados, ambientes formalmente separados no código, filas, armazenamento de arquivos ou serviço transacional de e-mail.

### 3. O que ainda não existe ou está incompleto

Considere como lacunas comprovadas:

- autenticação, MFA, usuários, membros, equipes, papéis e permissões;
- painel administrativo;
- fila de triagem/moderação de cadastros e demandas;
- alteração de status, atribuição, comentários, resposta e trilha de auditoria;
- consulta segura do andamento por protocolo;
- notificações e confirmações por e-mail;
- CMS ou edição de conteúdo sem mudança de código;
- workflow editorial com rascunho, revisão, aprovação e publicação;
- anexos e armazenamento de arquivos;
- importação ou sincronização automática de fontes oficiais;
- busca interna e indexação documental no Radar;
- geração programática de PDF;
- proteção anti-spam, rate limiting e controles explícitos contra abuso;
- suíte de testes unitários, integração, componentes, E2E e acessibilidade;
- pipeline de CI completo e observabilidade/alertas estruturados;
- rotina documentada de backup, restauração, retenção e descarte;
- processo operacional para direitos do titular e incidentes LGPD;
- portal institucional completo do ICPT, ERP, CRM, projetos e financeiro;
- aplicativo mobile nativo.

### 4. Débitos, riscos e inconsistências que precisam entrar na análise

1. **Conteúdo demonstrativo:** o arquivo central de dados afirma que todo o conteúdo territorial é demonstrativo. Pontos, experiências e hospedagens estão marcados como `demonstrativo` ou `em-validacao`; não há item territorial marcado como validado.
2. **Contatos fictícios:** há números zerados de WhatsApp/telefone, links genéricos de Instagram e `exemplo.com` nos dados de demonstração.
3. **Indicadores a validar:** percentuais de saúde, referências FEAM, valores orçamentários, contagens territoriais e demais materiais migrados precisam de fonte, competência/data, licença e responsável pela validação.
4. **Mensagem de maturidade inconsistente:** README e documento do MVP declaram “MVP funcional e publicado”, enquanto o rodapé público ainda informa “conteúdo demonstrativo — protótipo em construção”. É necessário definir e comunicar corretamente o estágio do produto.
5. **Governança indefinida:** razão social, CNPJ, endereço, contatos oficiais, responsável editorial, controlador/canal LGPD e responsáveis institucionais/técnicos ainda precisam ser confirmados.
6. **Políticas precisam de validação:** os textos legais existentes não substituem revisão jurídica e operacional. Retenção, cookies, analytics, canal do titular, fornecedores e uso real de IA precisam refletir a operação efetiva.
7. **Acessibilidade:** há boas práticas iniciais de semântica, teclado, foco e responsividade, porém não existe evidência de auditoria WCAG 2.2 AA, testes com leitor de tela ou alternativa completa para mapas/gráficos.
8. **Segurança e abuso:** há validação de entrada e isolamento da chave privilegiada, mas faltam rate limiting, anti-spam, cabeçalhos/políticas de segurança documentados, auditoria, testes de restauração e monitoramento de incidentes.
9. **Banco sem operação interna:** os status existem no schema, porém hoje só ocorre inserção. Não existe leitura operacional, moderação nem histórico de mudanças.
10. **Dependência de serviços externos:** mapa completo, pesquisa de saúde, Ouvidoria e pesquisas do Radar levam a serviços externos; é preciso decidir conscientemente o que deve permanecer externo e o que deve virar capacidade própria.

### 5. Visão futura disponível, mas ainda não aprovada como escopo integral

O Plano Mestre propõe que o produto atual possa evoluir para um ecossistema ICPT com:

- Portal ICPT;
- Caminhos de Mambucaba;
- Observatório Mambucaba;
- painel administrativo;
- backend central;
- identidade e acesso;
- CMS, mídia e fluxo editorial;
- organização, membros e documentos internos;
- programas, projetos, tarefas e processos;
- CRM e relacionamento;
- dados territoriais e moderação comunitária;
- pesquisas, indicadores, datasets e fontes;
- gestão completa de demandas e formulários;
- financeiro administrativo e auditoria;
- IA responsável com versionamento, avaliação e revisão humana.

A arquitetura sugerida nessa visão é um monorepo, monólito modular e ambientes local/preview/staging/production. Microserviços, aplicativo mobile nativo, contabilidade completa, marketplace com pagamentos, decisões autônomas por IA, blockchain e data lake foram explicitamente considerados fora do escopo inicial.

Use essa visão como direção estratégica e fonte de opções. Não presuma que todos os módulos devem ser construídos agora. Antes, identifique quais resultados de negócio e quais capacidades fundamentais justificam cada módulo.

### 6. Objetivo deste planejamento

Construir um backlog que leve o produto do MVP público atual a uma operação territorial confiável, validável e sustentável. O backlog deve equilibrar:

- valor para moradores, visitantes, iniciativas e equipe do Observatório;
- validação e publicação de conteúdo real;
- capacidade operacional da equipe;
- segurança, privacidade, acessibilidade e confiabilidade;
- aprendizado rápido e redução de riscos;
- evolução arquitetural proporcional à necessidade;
- custos e capacidade real de manutenção.

### 7. Como conduzir a resposta

Antes de propor o backlog:

1. resuma sua leitura do produto em até dez pontos;
2. separe claramente **entregue**, **parcial**, **não iniciado** e **dependência/decisão externa**;
3. identifique contradições, riscos e hipóteses;
4. faça uma lista curta das perguntas de produto que realmente alteram prioridade ou escopo;
5. quando faltar uma resposta, registre uma hipótese explícita em vez de apresentá-la como fato.

Depois, proponha o backlog em três horizontes:

- **Horizonte 1 — tornar o MVP operável e confiável:** conteúdo real, governança mínima, segurança, acessibilidade, operação de cadastros/demandas e métricas básicas;
- **Horizonte 2 — consolidar a plataforma territorial:** CMS, workflows, consulta por protocolo, comunicações, dados e ferramentas do Observatório;
- **Horizonte 3 — expandir o ecossistema ICPT:** somente capacidades institucionais justificadas por objetivos e evidências.

Não organize os horizontes apenas por arquitetura. Cada horizonte deve entregar resultado observável a usuários ou à operação.

### 8. Formato obrigatório do backlog

Para cada épico, informe:

- ID e nome;
- problema/oportunidade;
- público beneficiado;
- resultado esperado;
- hipótese de valor;
- escopo incluído;
- fora de escopo;
- dependências e decisões necessárias;
- riscos de produto, LGPD, segurança, conteúdo e operação;
- métricas de sucesso e evento de instrumentação sugerido;
- critério de saída do épico;
- prioridade sugerida (P0, P1, P2 ou P3);
- horizonte e ordem recomendada;
- estimativa relativa (P, M, G ou GG), sem converter em horas;
- histórias de usuário ou tarefas habilitadoras.

Para cada história/tarefa, use:

- ID vinculado ao épico;
- título orientado a resultado;
- história de usuário no formato “Como [público], quero [capacidade], para [benefício]”, quando aplicável;
- contexto e regras de negócio;
- critérios de aceitação objetivos e testáveis em Given/When/Then ou lista verificável;
- requisitos não funcionais relevantes;
- dependências;
- observações de conteúdo/dados;
- estimativa relativa;
- indicação de discovery, entrega, conteúdo, dados, design, engenharia, jurídico/governança ou operação.

Não crie uma história genérica chamada apenas “fazer backend”, “criar frontend” ou “configurar banco”. Relacione trabalho técnico a uma capacidade ou risco concreto. Separe discovery de implementação quando houver incerteza relevante.

### 9. Priorização

Use uma combinação explícita de valor, risco, urgência, dependências e esforço. Dê preferência inicial a itens que:

- impedem a exposição de informação fictícia como oficial;
- permitem à equipe operar com segurança os dados já coletados;
- fecham o ciclo para quem envia cadastro ou demanda;
- reduzem risco jurídico, de privacidade, acessibilidade ou segurança;
- produzem aprendizado mensurável antes de grandes mudanças arquiteturais;
- desbloqueiam várias capacidades posteriores.

Questione iniciativas grandes como monorepo, ERP ou IA quando ainda não houver problema, capacidade operacional ou evidência que as justifique. Se forem necessárias, apresente o gatilho e a decisão que sustentam a prioridade.

### 10. Definition of Ready e Definition of Done

Proponha uma Definition of Ready mínima. Na Definition of Done, considere, conforme aplicável:

- requisito e critério de aceitação aprovados;
- design e conteúdo revisados;
- fonte, data, licença e status de validação dos dados;
- permissões e minimização de acesso;
- avaliação LGPD e retenção;
- validação no servidor;
- estados de carregamento, vazio, sucesso e erro;
- responsividade e WCAG 2.2 AA;
- testes proporcionais ao risco;
- logs e métricas sem dados pessoais indevidos;
- documentação operacional;
- homologação e plano de rollback;
- responsável por operar e manter a capacidade.

### 11. Entregáveis finais da sua resposta

Entregue, nesta ordem:

1. resumo executivo;
2. mapa de estado atual: entregue/parcial/não iniciado/decisão externa;
3. perguntas e hipóteses críticas;
4. princípios de priorização usados;
5. tabela de épicos por horizonte;
6. detalhamento completo dos épicos;
7. histórias e tarefas do primeiro horizonte com critérios de aceitação;
8. dependências entre épicos;
9. riscos e plano de mitigação;
10. métricas de produto, operação e qualidade;
11. Definition of Ready e Definition of Done;
12. sugestão dos primeiros três ciclos, sem assumir duração fixa de sprint;
13. itens deliberadamente adiados e condição que justificaria retomá-los.

Ao final, faça uma verificação de consistência: nenhum item já entregue deve aparecer como se estivesse começando do zero; nenhum item apenas planejado deve aparecer como funcionalidade atual; nenhuma informação demonstrativa deve ser tratada como validada; e nenhuma iniciativa grande deve existir sem resultado, dependência e critério de saída claros.

## FIM DO PROMPT

---

## Fontes internas usadas nesta consolidação

- `README.md` — resumo operacional e estado declarado do MVP;
- `docs/MVP.md` — inventário funcional, limitações e próximas etapas;
- `docs/PLANO_MESTRE_PLATAFORMA_ICPT.md` — visão estratégica e arquitetura futura;
- `app/` — páginas públicas, APIs, SEO e fluxos existentes;
- `components/` — formulários, mapa, quiz, filtros e painéis interativos;
- `lib/data.ts` e `lib/observatorio-data.ts` — conteúdo estático e status de validação;
- `lib/recommend.ts` — motor de recomendação por regras;
- `lib/api-validation.ts`, `lib/supabase.ts` — validação e persistência no servidor;
- `supabase/migrations/20260801000000_create_intake_tables.sql` — modelo atual de submissões e demandas;
- `package.json` e `next.config.mjs` — stack, scripts, deploy e redirecionamentos.

## Manutenção deste documento

Atualize este prompt quando ocorrer qualquer um destes eventos:

- mudança relevante no escopo ou posicionamento do produto;
- entrada de conteúdo territorial validado;
- criação do painel administrativo ou autenticação;
- mudança nos fluxos de cadastro/demanda;
- nova integração, fonte oficial ou política de dados;
- decisão sobre a arquitetura ICPT;
- conclusão de um horizonte do backlog.
