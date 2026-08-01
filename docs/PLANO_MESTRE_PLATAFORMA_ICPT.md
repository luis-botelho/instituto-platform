# Plano Mestre da Plataforma ICPT

> Documento vivo para orientar a transformação do protótipo atual em uma plataforma institucional, territorial e administrativa oficial.

**Status:** planejamento inicial  
**Última atualização:** 30 de julho de 2026  
**Responsável institucional:** a definir  
**Responsável técnico:** a definir

---

## 1. Visão

A Plataforma ICPT será o ecossistema digital do Instituto Cidadania e Políticas Territoriais. Ela reunirá presença institucional, programas públicos, inteligência territorial, participação cidadã e administração interna.

O objetivo não é criar sites isolados. Todos os aplicativos deverão compartilhar identidade, dados, permissões, componentes, segurança, processos e infraestrutura.

### Aplicativos previstos

| Aplicativo | Público | Finalidade |
|---|---|---|
| Portal ICPT | Público geral | Apresentar o Instituto, sua governança, programas, parceiros e transparência |
| Caminhos de Mambucaba | Moradores, visitantes e iniciativas | Turismo de base comunitária, mapa, experiências, hospedagens e participação |
| Observatório Mambucaba | Cidadãos, pesquisadores e poder público | Pesquisas, publicações, demandas, orçamento, saúde e controle social |
| Painel Administrativo | Membros e equipes | Administrar conteúdo, pessoas, programas, processos, documentos e dados |
| Backend central | Todos os aplicativos | Autenticação, regras de negócio, banco, arquivos, auditoria e integrações |

### Domínios sugeridos

```text
icpt.org.br
caminhos.icpt.org.br
observatorio.icpt.org.br
admin.icpt.org.br
api.icpt.org.br
```

---

## 2. Princípios do produto

1. **O território começa por quem o vive.**
2. Dados públicos precisam apresentar fonte, data e status de validação.
3. Conteúdo demonstrativo nunca deve parecer informação oficial.
4. Nenhuma automação substitui revisão e responsabilidade humana.
5. Dados pessoais devem ser mínimos, protegidos e utilizados com finalidade clara.
6. Acessibilidade é requisito de produto, não acabamento.
7. Toda ação administrativa sensível deve ser auditável.
8. Conteúdo público precisa passar por rascunho, revisão e aprovação.
9. A arquitetura deve começar simples e permitir crescimento.
10. O sistema deve funcionar bem em celular e conexões limitadas.

---

## 3. Arquitetura recomendada

### 3.1 Monorepo

```text
apps/
├── institucional/       # Portal ICPT
├── caminhos/            # Caminhos de Mambucaba
├── observatorio/        # Observatório Mambucaba
├── admin/               # ERP, CMS e área dos membros
└── api/                 # Backend central

packages/
├── ui/                  # Design system compartilhado
├── auth/                # Sessão, autenticação e autorização
├── database/            # Schema, migrations e acesso ao banco
├── contracts/           # Tipos e contratos de API
├── validation/          # Schemas de validação
├── permissions/         # Papéis e políticas de acesso
├── observability/       # Logs, métricas e rastreamento
├── configuration/       # Configurações compartilhadas
└── testing/             # Utilitários de teste
```

Tecnologias sugeridas:

- PNPM Workspaces e Turborepo;
- Next.js nos aplicativos web;
- backend Node.js modular;
- PostgreSQL;
- Prisma ou Drizzle;
- armazenamento S3 compatível;
- fila para tarefas assíncronas;
- serviço transacional de e-mail;
- Vercel para frontends;
- provedor separado para API, banco e jobs, quando necessário.

### 3.2 Estratégia de backend

Começar com um **monólito modular**. Não iniciar com microserviços.

Cada domínio terá seus próprios serviços, regras e permissões, mas será implantado inicialmente como uma única aplicação. Um módulo só deverá ser separado quando existir necessidade operacional comprovada.

### 3.3 Ambientes

```text
local         # desenvolvimento
preview       # cada pull request
staging       # homologação integrada
production    # ambiente oficial
```

Banco, arquivos, segredos e integrações devem ser separados por ambiente.

---

## 4. Domínios do sistema

### 4.1 Identidade e acesso

- usuários;
- membros do Instituto;
- convites;
- login e recuperação de acesso;
- MFA;
- sessões;
- equipes;
- cargos;
- papéis;
- permissões por ação;
- bloqueio e desligamento;
- trilha de auditoria.

Papéis iniciais:

```text
superadmin
diretoria
coordenacao
equipe
comunicacao
pesquisador
moderador
financeiro
parceiro
colaborador
leitura
```

Permissões devem ser granulares:

```text
publicacao.criar
publicacao.revisar
publicacao.aprovar
demanda.visualizar
demanda.visualizar_sensivel
demanda.encaminhar
membro.convidar
membro.editar
mapa.publicar
financeiro.visualizar
configuracao.alterar
```

### 4.2 CMS institucional

- páginas;
- notícias;
- menus;
- banners;
- mídia;
- autores;
- categorias e tags;
- SEO;
- revisões;
- agendamento;
- rascunho;
- fluxo de aprovação;
- histórico de publicação;
- conteúdo por aplicativo.

### 4.3 Organização e membros

- cadastro institucional;
- membros;
- departamentos;
- núcleos;
- equipes;
- competências;
- disponibilidade;
- documentos internos;
- atas;
- políticas;
- agenda;
- comunicados.

### 4.4 Programas e projetos

- programas;
- projetos;
- objetivos;
- atividades;
- responsáveis;
- cronogramas;
- indicadores;
- entregas;
- orçamento planejado;
- parceiros;
- financiadores;
- documentos;
- relatórios.

### 4.5 Tarefas e processos

- tarefas;
- listas;
- responsáveis;
- prazos;
- comentários;
- anexos;
- dependências;
- checklists;
- notificações;
- modelos de processo;
- aprovações.

### 4.6 CRM e relacionamento

- pessoas;
- organizações;
- contatos;
- parceiros;
- apoiadores;
- histórico de relacionamento;
- reuniões;
- oportunidades;
- termos de parceria;
- consentimentos;
- segmentação.

### 4.7 Caminhos de Mambucaba

- pontos do território;
- localidades;
- categorias;
- empreendimentos;
- hospedagens;
- atrativos;
- experiências;
- roteiros;
- pessoas e iniciativas;
- horários e contatos;
- acessibilidade;
- fotos;
- fontes;
- status de validação;
- moderação comunitária;
- quiz e recomendações.

### 4.8 Observatório Mambucaba

- indicadores;
- fontes;
- datasets;
- pesquisas;
- questionários;
- publicações;
- documentos;
- notas técnicas;
- radar de fontes oficiais;
- relatórios orçamentários;
- controle social;
- biblioteca territorial;
- histórico de revisão.

### 4.9 Demandas cidadãs

- relato original;
- classificação;
- tema;
- localidade;
- dados mínimos de contato;
- conversão técnica;
- revisão humana;
- anexos;
- encaminhamento;
- protocolo externo;
- acompanhamento;
- resposta;
- anonimização;
- agregação territorial;
- acesso especial para dados sensíveis.

### 4.10 Formulários e submissões

- construtor de formulários;
- tipos de campo;
- versões;
- validação;
- consentimento;
- anexos;
- protocolos;
- filas de análise;
- atribuição;
- exportação;
- integração com módulos internos.

### 4.11 Documentos e biblioteca

- arquivos;
- pastas;
- metadados;
- versão;
- licença;
- autoria;
- fonte;
- visibilidade;
- indexação;
- busca;
- download;
- retenção.

### 4.12 Financeiro administrativo

Escopo inicial, sem tentar substituir um sistema contábil:

- centros de custo;
- projetos;
- previsões;
- receitas;
- despesas;
- comprovantes;
- reembolsos;
- aprovações;
- contratos;
- relatórios;
- exportação para contabilidade.

### 4.13 Auditoria e governança

- quem realizou a ação;
- quando;
- endereço IP, quando necessário e juridicamente justificado;
- objeto alterado;
- valores anteriores e posteriores;
- motivo;
- origem;
- resultado;
- retenção;
- exportação para investigação.

---

## 5. Modelo conceitual inicial

Entidades principais:

```text
Organization
User
Member
Team
Role
Permission
UserRole
Program
Project
Task
Contact
Partner
Content
ContentRevision
Media
Publication
Document
Territory
Locality
Place
Initiative
Accommodation
Experience
Route
Survey
SurveyResponse
Demand
DemandRevision
DemandReferral
Form
FormVersion
Submission
Indicator
Dataset
Source
Consent
PrivacyRequest
Notification
AuditLog
```

Regras:

- IDs não devem expor sequência interna;
- registros importantes devem usar exclusão lógica;
- conteúdo publicado deve manter versão;
- dados territoriais devem ter fonte e status;
- dados pessoais devem registrar finalidade e retenção;
- operações sensíveis devem gerar auditoria.

---

## 6. Preparação para site oficial

### 6.1 Identificação institucional

- [ ] Confirmar razão social;
- [ ] confirmar CNPJ;
- [ ] definir endereço institucional;
- [ ] criar e-mails no domínio;
- [ ] definir telefone/canal oficial;
- [ ] identificar diretoria;
- [ ] definir responsável editorial;
- [ ] definir controlador dos dados;
- [ ] definir encarregado LGPD ou canal equivalente;
- [ ] criar página de contato;
- [ ] criar página de transparência.

### 6.2 Documentos institucionais

- [ ] Estatuto;
- [ ] missão, visão e valores;
- [ ] diretoria e conselhos;
- [ ] política de conflitos de interesse;
- [ ] código de conduta;
- [ ] política de integridade;
- [ ] política de segurança;
- [ ] política de retenção;
- [ ] política de publicação e correção;
- [ ] política de uso de IA;
- [ ] política de privacidade;
- [ ] política de cookies;
- [ ] termos de uso;
- [ ] licenças de conteúdo;
- [ ] relatórios anuais;
- [ ] prestações de contas aplicáveis.

### 6.3 LGPD

- [ ] Inventariar tratamentos de dados;
- [ ] mapear finalidades;
- [ ] definir bases legais;
- [ ] classificar dados pessoais e sensíveis;
- [ ] minimizar campos;
- [ ] definir prazos de retenção;
- [ ] mapear operadores;
- [ ] documentar transferências internacionais;
- [ ] criar canal do titular;
- [ ] criar processo de confirmação, acesso, correção e exclusão;
- [ ] criar registro de consentimentos;
- [ ] permitir revogação;
- [ ] definir tratamento de crianças e adolescentes;
- [ ] realizar avaliação de riscos;
- [ ] elaborar RIPD quando necessário;
- [ ] criar plano de incidentes;
- [ ] treinar membros;
- [ ] registrar decisões automatizadas;
- [ ] impedir dados sensíveis em analytics e logs.

### 6.4 Cookies e analytics

- [ ] Inventariar cookies, scripts e armazenamento local;
- [ ] classificar itens necessários, preferenciais e analíticos;
- [ ] decidir se haverá cookies não essenciais;
- [ ] usar banner somente quando necessário;
- [ ] oferecer aceitar, rejeitar e configurar;
- [ ] bloquear scripts não essenciais antes da escolha;
- [ ] permitir alteração posterior;
- [ ] documentar Vercel Analytics;
- [ ] filtrar parâmetros sensíveis;
- [ ] proibir e-mail, telefone, nome ou token em eventos.

### 6.5 Conteúdo oficial

- [ ] Remover telefones fictícios;
- [ ] remover links `exemplo.com`;
- [ ] revisar hospedagens demonstrativas;
- [ ] revisar indicadores;
- [ ] conferir percentuais;
- [ ] registrar fontes;
- [ ] registrar data de atualização;
- [ ] documentar licença das imagens;
- [ ] marcar conteúdo comunitário;
- [ ] criar política de correção;
- [ ] criar contato para contestação.

---

## 7. Segurança

### 7.1 Aplicação

- [ ] Remover `ignoreBuildErrors`;
- [ ] validar toda entrada no servidor;
- [ ] escapar toda saída;
- [ ] configurar CSP;
- [ ] configurar HSTS;
- [ ] configurar `X-Content-Type-Options`;
- [ ] configurar `Referrer-Policy`;
- [ ] configurar `Permissions-Policy`;
- [ ] impedir clickjacking;
- [ ] proteger contra CSRF;
- [ ] limitar requisições;
- [ ] proteger formulários contra bots;
- [ ] evitar enumeração de usuários;
- [ ] revisar upload de arquivos;
- [ ] verificar dependências;
- [ ] automatizar atualizações de segurança.

### 7.2 Autenticação

- [ ] Hash seguro de senhas, se houver senha local;
- [ ] MFA obrigatório para administradores;
- [ ] sessão curta para áreas sensíveis;
- [ ] rotação de sessão;
- [ ] revogação de dispositivos;
- [ ] proteção contra força bruta;
- [ ] convites com validade;
- [ ] encerramento imediato no desligamento;
- [ ] recuperação segura;
- [ ] revisão periódica de acessos.

### 7.3 Infraestrutura

- [ ] Segredos fora do repositório;
- [ ] ambientes separados;
- [ ] criptografia em trânsito;
- [ ] criptografia em repouso;
- [ ] backups automáticos;
- [ ] testes de restauração;
- [ ] logs centralizados;
- [ ] alertas;
- [ ] monitoramento de disponibilidade;
- [ ] monitoramento de erros;
- [ ] plano de recuperação;
- [ ] inventário de fornecedores;
- [ ] contratos e DPAs.

### 7.4 Incidentes

- [ ] Canal interno de comunicação;
- [ ] responsáveis;
- [ ] classificação de severidade;
- [ ] contenção;
- [ ] preservação de evidências;
- [ ] análise de impacto;
- [ ] comunicação à ANPD e titulares quando aplicável;
- [ ] prazo operacional compatível com três dias úteis;
- [ ] registro do incidente por pelo menos cinco anos;
- [ ] revisão pós-incidente.

---

## 8. Acessibilidade

Meta: **WCAG 2.2 nível AA**.

- [ ] Link “Pular para o conteúdo”;
- [ ] navegação completa por teclado;
- [ ] ordem de foco coerente;
- [ ] foco sempre visível;
- [ ] contraste aprovado;
- [ ] zoom de 200% e 400%;
- [ ] responsividade sem perda;
- [ ] títulos hierárquicos;
- [ ] landmarks HTML;
- [ ] labels em campos;
- [ ] erros anunciados;
- [ ] instruções que não dependam apenas de cor;
- [ ] alternativas textuais para mapas;
- [ ] tabelas para gráficos;
- [ ] textos alternativos;
- [ ] legendas e transcrições;
- [ ] suporte a redução de movimento;
- [ ] testes com leitor de tela;
- [ ] testes manuais com usuários.

---

## 9. SEO, domínio e comunicação

- [ ] Escolher domínio oficial;
- [ ] configurar DNS;
- [ ] configurar HTTPS;
- [ ] configurar e-mails;
- [ ] SPF;
- [ ] DKIM;
- [ ] DMARC;
- [ ] metadata por aplicativo;
- [ ] canonical;
- [ ] Open Graph;
- [ ] cards sociais;
- [ ] sitemap;
- [ ] robots;
- [ ] manifest;
- [ ] ícones;
- [ ] página 404;
- [ ] página de indisponibilidade;
- [ ] dados estruturados;
- [ ] Search Console;
- [ ] analytics;
- [ ] monitoramento de links quebrados.

---

## 10. Qualidade e testes

### Pirâmide de testes

- testes unitários de regras;
- testes de integração da API;
- testes de componentes;
- testes ponta a ponta;
- testes de acessibilidade;
- testes de segurança;
- testes de carga;
- testes de backup e recuperação.

### Pipeline mínimo

```text
format
lint
typecheck
unit
integration
build
e2e
accessibility
dependency-audit
deploy-preview
```

Nenhum deploy de produção deve ignorar falhas.

### Definition of Done

Uma funcionalidade só está concluída quando:

- [ ] Requisitos foram definidos;
- [ ] design foi revisado;
- [ ] permissões foram avaliadas;
- [ ] LGPD foi avaliada;
- [ ] validação de servidor existe;
- [ ] estados de erro e carregamento existem;
- [ ] mobile foi testado;
- [ ] acessibilidade foi testada;
- [ ] testes foram adicionados;
- [ ] logs foram definidos;
- [ ] documentação foi atualizada;
- [ ] revisão de código foi aprovada;
- [ ] homologação foi concluída.

---

## 11. Fluxos editoriais e administrativos

### Publicação

```text
Rascunho
→ Em revisão
→ Ajustes solicitados
→ Aprovado
→ Agendado
→ Publicado
→ Arquivado
```

### Cadastro territorial

```text
Recebido
→ Triagem
→ Contato
→ Validação documental
→ Validação territorial
→ Aprovado
→ Publicado
→ Revisão periódica
```

### Demanda cidadã

```text
Rascunho local
→ Consentimento
→ Recebida
→ Triagem
→ Classificada
→ Revisada
→ Encaminhada
→ Aguardando resposta
→ Respondida
→ Encerrada
→ Anonimizada ou eliminada
```

### Projeto interno

```text
Proposta
→ Análise
→ Aprovação
→ Planejamento
→ Execução
→ Monitoramento
→ Prestação de contas
→ Encerramento
```

---

## 12. Roadmap

### Fase 0 — preparar lançamento institucional

Objetivo: retirar o caráter de protótipo e publicar com segurança.

- identidade jurídica;
- portal institucional mínimo;
- contato oficial;
- revisão das políticas;
- inventário de dados;
- remoção de conteúdo fictício;
- segurança HTTP;
- SEO básico;
- acessibilidade;
- domínio e e-mail;
- homologação.

**Critério de saída:** portal público confiável, sem coleta real não documentada e sem conteúdo demonstrativo apresentado como oficial.

### Fase 1 — fundação técnica

- monorepo;
- design system;
- banco;
- autenticação;
- membros;
- papéis e permissões;
- auditoria;
- armazenamento;
- e-mail;
- ambientes;
- CI/CD;
- observabilidade.

**Critério de saída:** membro acessa o admin com MFA e permissões verificadas.

### Fase 2 — CMS central

- páginas;
- publicações;
- mídia;
- menus;
- revisões;
- aprovação;
- SEO;
- publicação nos três portais.

**Critério de saída:** equipe atualiza conteúdo sem alterar código.

### Fase 3 — Caminhos

- catálogo real;
- mapa;
- experiências;
- hospedagens;
- iniciativas;
- submissões;
- moderação;
- fontes;
- status;
- recomendações.

**Critério de saída:** cadastro percorre análise e publicação completas.

### Fase 4 — Observatório

- demandas;
- metodologia;
- publicações;
- pesquisas;
- formulários;
- indicadores;
- datasets;
- fontes;
- orçamento;
- saúde;
- controle social.

**Critério de saída:** conteúdo possui fonte, versão, revisão e permissão.

### Fase 5 — ERP institucional

- projetos;
- tarefas;
- equipes;
- agenda;
- CRM;
- parceiros;
- documentos;
- aprovações;
- financeiro administrativo;
- relatórios.

**Critério de saída:** operação cotidiana do Instituto acontece dentro do painel.

### Fase 6 — IA responsável

- provedores e modelos;
- versionamento de prompts;
- busca documental;
- triagem assistida;
- resumo;
- geração de minuta;
- revisão humana;
- avaliações;
- custos;
- logs seguros;
- anonimização;
- explicabilidade.

**Critério de saída:** nenhuma saída sensível é publicada ou encaminhada sem revisão humana.

---

## 13. Backlog imediato

Ordem recomendada para os próximos ciclos:

1. Criar página institucional mínima do ICPT;
2. obter dados jurídicos e contatos oficiais;
3. corrigir Política de Privacidade;
4. corrigir Política de Cookies;
5. versionar Termos de Uso e Política de IA;
6. remover conteúdo fictício;
7. remover `ignoreBuildErrors`;
8. implementar headers de segurança;
9. adicionar sitemap, robots e metadata;
10. implementar página de contato;
11. criar canal LGPD;
12. executar auditoria WCAG;
13. definir monorepo;
14. escolher provedor de autenticação;
15. modelar usuários, membros, papéis e auditoria;
16. criar banco e migrations;
17. criar primeiro login do admin;
18. implementar CMS;
19. conectar Caminhos;
20. conectar Observatório.

---

## 14. Decisões pendentes

| Decisão | Opções | Responsável | Prazo |
|---|---|---|---|
| Domínio oficial | `icpt.org.br` ou alternativa | A definir | A definir |
| Razão social e CNPJ exibidos | Dados oficiais | A definir | A definir |
| Encarregado/canal LGPD | Pessoa, empresa ou canal equivalente | A definir | A definir |
| Provedor de autenticação | Auth.js, Clerk, Supabase Auth ou outro | Técnico | A definir |
| Backend | NestJS, Fastify ou Next modular | Técnico | A definir |
| ORM | Prisma ou Drizzle | Técnico | A definir |
| Banco | PostgreSQL gerenciado | Técnico | A definir |
| Armazenamento | S3, R2 ou equivalente | Técnico | A definir |
| E-mail | Resend, SES ou equivalente | Técnico | A definir |
| Hospedagem da API | A definir | Técnico | A definir |
| Editor de conteúdo | CMS próprio ou headless | Produto/Técnico | A definir |
| Política de dados abertos | Escopo e licenças | Diretoria | A definir |

---

## 15. Fora de escopo inicial

Para evitar complexidade prematura:

- microserviços;
- aplicativo mobile nativo;
- contabilidade completa;
- folha de pagamento;
- rede social interna;
- marketplace com pagamentos;
- decisões autônomas por IA;
- blockchain;
- data lake;
- múltiplas organizações independentes.

Esses itens podem ser reavaliados quando houver necessidade comprovada.

---

## 16. Indicadores de sucesso

- percentual de conteúdo com fonte e data;
- tempo médio de publicação;
- tempo médio de triagem;
- demandas acompanhadas;
- cadastros territoriais validados;
- membros ativos;
- tarefas concluídas no prazo;
- acessibilidade WCAG;
- disponibilidade;
- tempo de resposta;
- erros em produção;
- incidentes;
- solicitações LGPD atendidas no prazo;
- satisfação de usuários e membros.

---

## 17. Governança deste documento

Este plano deve ser revisado:

- no início de cada fase;
- após mudanças jurídicas relevantes;
- após incidentes;
- quando um novo aplicativo for incluído;
- quando arquitetura ou fornecedores mudarem;
- no mínimo a cada três meses durante a construção.

Toda decisão relevante deve gerar um registro contendo:

- contexto;
- alternativas;
- decisão;
- justificativa;
- consequências;
- responsáveis;
- data.

Esses registros poderão ser mantidos em `docs/decisions/` no formato ADR.

