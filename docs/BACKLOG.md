# Backlog — Primeiro MVP

## Convenções

- Epic: `CAM-E##`
- User story: `CAM-E##-US##`
- Task: `CAM-E##-T##`
- Prioridades: `P0` bloqueia MVP, `P1` necessária para lançamento, `P2` pode seguir logo depois.
- Uma task técnica existe para entregar uma story ou reduzir risco verificável; não é uma lista de camadas sem valor demonstrável.

## Roadmap

| Milestone | Resultado |
| --- | --- |
| M0 — Product Foundation | limites, stack, design system e API executável |
| M1 — Discovery & Planning | catálogo, mapa e Meu Caminho utilizáveis |
| M2 — Conversion & Partners | leads, parceiros, moderação e operação |
| M3 — Trust & Launch | avaliações, selo, métricas, qualidade e publicação |

---

## CAM-E01 — Fundação do produto e migração arquitetural

**Objetivo:** separar o Caminhos como produto, manter Next.js e introduzir Go sem interromper o site publicado. **Prioridade:** P0. **Milestone:** M0.

### CAM-E01-US01 — Preservar a jornada pública durante a migração

Como visitante, quero continuar acessando as páginas essenciais enquanto a arquitetura muda.

**Aceite:** rotas críticas inventariadas; smoke tests existentes; rollback definido; home provisória dos três cards preservada.

### CAM-E01-US02 — Navegar com identidade visual consistente

Como visitante, quero uma interface coerente, responsiva e legível.

**Aceite:** tokens aprovados; Sass Modules e BEM aplicados nos novos componentes; foco visível; contraste AA; Tailwind removido por fluxo migrado.

### Tasks

- `CAM-E01-T01` Documentar ADR Next.js + Go + Supabase.
- `CAM-E01-T02` Criar esqueleto do serviço Go com healthcheck e configuração tipada.
- `CAM-E01-T03` Definir OpenAPI v1 e padrão de erros.
- `CAM-E01-T04` Criar tokens Sass, reset e convenção BEM.
- `CAM-E01-T05` Configurar CI para web e API.
- `CAM-E01-T06` Criar ambiente de preview sem dados reais.

---

## CAM-E02 — Descoberta, catálogo e internacionalização

**Objetivo:** permitir descoberta indexável de ofertas e conteúdo territorial. **Prioridade:** P0. **Milestone:** M1.

### CAM-E02-US01 — Explorar categorias e destaques

Como visitante, quero descobrir lugares, hospedagens, gastronomia, experiências, eventos e pacotes.

**Aceite:** home conduz ao catálogo; cards distinguem tipos; itens não publicados nunca aparecem; estados vazio/erro funcionam.

### CAM-E02-US02 — Buscar e filtrar ofertas

Como visitante, quero filtrar por categoria, preço, acessibilidade, duração e localização.

**Aceite:** URL representa filtros; paginação é estável; filtros funcionam por teclado; ausência de preço é tratada.

### CAM-E02-US03 — Consumir conteúdo no meu idioma

Como visitante estrangeiro, quero navegar em português ou inglês.

**Aceite:** locale na URL; metadata localizada; fallback explícito; base preparada para espanhol e alemão.

### Tasks

- `CAM-E02-T01` Modelar catálogo, slugs, categorias, traduções e mídia.
- `CAM-E02-T02` Implementar migrations e seeds sem PII.
- `CAM-E02-T03` Implementar endpoints públicos cacheáveis.
- `CAM-E02-T04` Construir páginas de listagem e detalhe.
- `CAM-E02-T05` Implementar busca e filtros sincronizados com URL.
- `CAM-E02-T06` Configurar sitemap, JSON-LD, canonical e Open Graph.

---

## CAM-E03 — Mapa territorial interativo

**Objetivo:** transformar o catálogo em exploração espacial segura. **Prioridade:** P0. **Milestone:** M1.

### CAM-E03-US01 — Explorar ofertas pelo mapa

Como visitante, quero visualizar pontos e filtrar o mapa sem perder a lista.

**Aceite:** clusters e bounds; sincronização lista/mapa; preço e disponibilidade rotulados como indicativos; alternativa acessível em lista.

### CAM-E03-US02 — Entender adequação e curiosidades

Como visitante, quero ver dificuldade, acessibilidade, público recomendado e curiosidades.

**Aceite:** dados editoriais moderados; locais sensíveis podem ocultar coordenada; informações não prometem segurança absoluta.

### Tasks

- `CAM-E03-T01` Definir política para coordenadas e locais sensíveis.
- `CAM-E03-T02` Implementar endpoint geoespacial por bounding box.
- `CAM-E03-T03` Integrar Leaflet com carregamento progressivo.
- `CAM-E03-T04` Criar filtros e alternativa de navegação sem mapa.
- `CAM-E03-T05` Testar performance com volume-alvo do MVP.

---

## CAM-E04 — Meu Caminho anônimo

**Objetivo:** permitir combinar ofertas em uma jornada que possa virar atendimento. **Prioridade:** P0. **Milestone:** M1.

### CAM-E04-US01 — Criar e editar um caminho sem conta

Como visitante, quero salvar, remover e ordenar seleções sem criar login.

**Aceite:** token opaco em cookie; jornada recuperável; expiração documentada; nenhum contato exigido antes do envio.

### CAM-E04-US02 — Planejar datas, grupo e orçamento

Como visitante, quero informar contexto e visualizar uma estimativa transparente.

**Aceite:** duração de horas ou dias; estimativas identificadas; conflitos e indisponibilidades geram aviso; sugestões são explicáveis.

### Tasks

- `CAM-E04-T01` Modelar journeys e journey_items.
- `CAM-E04-T02` Implementar API idempotente e token seguro.
- `CAM-E04-T03` Criar drawer/página Meu Caminho.
- `CAM-E04-T04` Implementar ordenação com alternativa por botões.
- `CAM-E04-T05` Implementar estimativa inicial por regras.
- `CAM-E04-T06` Testar expiração, concorrência e recuperação.

---

## CAM-E05 — Conversão em atendimento e pacotes

**Objetivo:** converter intenção em lead operacional sem simular checkout. **Prioridade:** P0. **Milestone:** M2.

### CAM-E05-US01 — Solicitar planejamento do meu caminho

Como visitante, quero enviar meu caminho e receber contato da equipe.

**Aceite:** contato e consentimento validados; protocolo gerado; resumo preservado; confirmação não promete reserva.

### CAM-E05-US02 — Solicitar um pacote pronto

Como visitante, quero pedir atendimento a partir de uma oferta estruturada.

**Aceite:** inclusões, exclusões e unidade de preço visíveis; data e participantes coletados; capacidade é indicativa.

### CAM-E05-US03 — Operar o funil de atendimento

Como operador, quero atribuir, qualificar e atualizar leads.

**Aceite:** estados válidos; histórico imutável; motivo em encerramento; dados sensíveis protegidos por papel.

### Tasks

- `CAM-E05-T01` Modelar leads, snapshot do caminho e histórico.
- `CAM-E05-T02` Implementar POST /leads com antiabuso e idempotência.
- `CAM-E05-T03` Criar confirmação e handoff para WhatsApp/e-mail.
- `CAM-E05-T04` Criar fila e detalhe operacional de leads.
- `CAM-E05-T05` Implementar atribuição e máquina de estados.
- `CAM-E05-T06` Instrumentar conversão sem PII.

---

## CAM-E06 — Entrada e autosserviço de parceiros

**Objetivo:** permitir adesão e manutenção de perfis com identidade comprovada. **Prioridade:** P1. **Milestone:** M2.

### CAM-E06-US01 — Solicitar participação

Como parceiro local, quero cadastrar meu negócio ou atuação para análise.

**Aceite:** atende negócio formal, autônomo, associação e iniciativa; consentimento e documentos mínimos; protocolo; status rastreável.

### CAM-E06-US02 — Acessar sem senha

Como parceiro aprovado, quero receber magic link e administrar os perfis autorizados.

**Aceite:** link expira e é de uso único; sessão segura; um usuário pode administrar negócios autorizados; rate limit aplicado.

### CAM-E06-US03 — Propor alteração de perfil

Como parceiro, quero atualizar informações e imagens sem publicar conteúdo não revisado.

**Aceite:** edição cria revisão; versão publicada permanece ativa; operação aprova, rejeita ou pede correção; histórico mantido.

### Tasks

- `CAM-E06-T01` Modelar applications, accounts, memberships e revisions.
- `CAM-E06-T02` Implementar magic link e sessão em cookie HttpOnly.
- `CAM-E06-T03` Criar formulário de adesão e acompanhamento.
- `CAM-E06-T04` Criar portal do parceiro e upload seguro.
- `CAM-E06-T05` Implementar diff e workflow de revisão.
- `CAM-E06-T06` Criar métricas básicas por parceiro.

---

## CAM-E07 — Moderação, conteúdo e Selo Caminhos

**Objetivo:** garantir qualidade editorial e separar confiança de promoção comercial. **Prioridade:** P1. **Milestone:** M2/M3.

### CAM-E07-US01 — Moderar conteúdo e revisões

Como operador, quero analisar pendências antes de publicar.

**Aceite:** fila filtrável; preview; justificativa; publicação invalida cache; auditoria registra ator e versão.

### CAM-E07-US02 — Avaliar parceiro por critérios técnicos

Como avaliador autorizado, quero registrar critérios do Selo Caminhos.

**Aceite:** rubrica versionada; pontuação interna protegida; selo tem validade; suspensão e contestação registradas; promoção paga não interfere.

### CAM-E07-US03 — Publicar avaliações de visitantes

Como visitante, quero avaliar uma experiência de forma útil e responsável.

**Aceite:** antiabuso e moderação; direito de resposta; denúncia; avaliação pública não expõe contato nem vira automaticamente nota do selo.

### Tasks

- `CAM-E07-T01` Definir governança editorial, papéis e SLAs internos.
- `CAM-E07-T02` Criar fila universal de moderação.
- `CAM-E07-T03` Modelar rubrica, assessment, validade e contestação.
- `CAM-E07-T04` Implementar reviews, denúncias e direito de resposta.
- `CAM-E07-T05` Identificar conteúdo patrocinado sem alterar ranking orgânico.

---

## CAM-E08 — Personalização e inteligência territorial

**Objetivo:** recomendar conteúdo e medir demanda com consentimento e minimização. **Prioridade:** P1. **Milestone:** M3.

### CAM-E08-US01 — Controlar personalização

Como visitante, quero aceitar ou recusar recomendações personalizadas.

**Aceite:** consentimento granular; revogação simples; site funciona sem tracking opcional; política explica finalidade e retenção.

### CAM-E08-US02 — Receber sugestões relevantes

Como visitante consentido, quero sugestões baseadas em escolhas, idioma e contexto da jornada.

**Aceite:** regras determinísticas documentadas; patrocinado identificado; critérios sensíveis não usados; usuário pode limpar sinais.

### CAM-E08-US03 — Consultar indicadores agregados

Como gestor autorizado, quero entender demanda territorial sem identificar visitantes.

**Aceite:** limiar mínimo para agregação; exportação sem PII; dimensões e período documentados; acesso auditado.

### Tasks

- `CAM-E08-T01` Criar taxonomia de eventos e plano de medição.
- `CAM-E08-T02` Implementar consentimento e pseudônimo rotacionável.
- `CAM-E08-T03` Implementar motor de regras de recomendação.
- `CAM-E08-T04` Criar agregações e painel mínimo.
- `CAM-E08-T05` Definir retenção, exclusão e atendimento ao titular.

---

## CAM-E09 — Segurança, acessibilidade e prontidão de lançamento

**Objetivo:** colocar o MVP em produção com controles proporcionais ao risco. **Prioridade:** P0 transversal. **Milestone:** M0–M3.

### CAM-E09-US01 — Concluir jornadas com acessibilidade

Como pessoa com deficiência, quero navegar, usar mapa/lista, preencher formulários e organizar o caminho.

**Aceite:** WCAG 2.2 AA nas jornadas críticas; teclado; foco; zoom; leitor de tela; alternativa a drag-and-drop e mapa.

### CAM-E09-US02 — Operar sem expor dados

Como responsável pelo produto, quero autenticação, autorização, auditoria e recuperação verificáveis.

**Aceite:** menor privilégio; secrets fora do cliente; testes negativos; backup restaurado; runbook; logs minimizados.

### Tasks

- `CAM-E09-T01` Criar threat model das jornadas críticas.
- `CAM-E09-T02` Implementar RBAC no Go e políticas no banco.
- `CAM-E09-T03` Aplicar rate limiting, validação e proteção de upload.
- `CAM-E09-T04` Integrar testes de API, E2E e acessibilidade ao CI.
- `CAM-E09-T05` Implementar correlação, métricas e alertas.
- `CAM-E09-T06` Testar backup/restauração e publicar runbook.
- `CAM-E09-T07` Executar auditoria final de SEO, performance e privacidade.

## Ordem de execução

1. E01 e fundações transversais de E09.
2. E02 e E03 em paralelo depois do contrato de catálogo.
3. E04 sobre o catálogo publicado.
4. E05 para validar conversão — este é o primeiro corte realmente vendável.
5. E06 e E07 para escalar oferta e operação.
6. E08 e fechamento de E09 para lançamento orientado por dados.

## Corte mínimo demonstrável

O primeiro incremento vertical deve conter: um item real publicado em PT/EN → aparece no catálogo e mapa → visitante adiciona ao Meu Caminho → envia solicitação → operador atualiza o lead. Isso valida web, API Go, banco, UX e valor comercial de ponta a ponta.
