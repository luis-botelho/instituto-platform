# Requisitos do Ecossistema — Caminhos de Mambucaba

> **Status:** Provisório  
> **Fase:** MV0 — Descoberta, Requisitos e Alinhamento  
> **Documento:** `docs/discovery/04-REQUISITOS.md`  
> **Origem principal:** stakeholders, personas, visão atual do produto e limitações conhecidas da MV0.

---

## 1. Objetivo

Este documento registra os requisitos funcionais e não funcionais conhecidos do ecossistema Caminhos de Mambucaba.

O objetivo desta etapa é transformar necessidades identificadas durante a discovery em requisitos verificáveis, sem antecipar decisões de arquitetura, linguagem, framework, banco de dados ou fornecedor.

O produto deverá nascer em incrementos menores, mas preservar uma visão de longo prazo suficientemente ampla para evitar decisões que impeçam sua evolução futura.

A existência de uma visão futura não significa que todos os recursos descritos neste documento façam parte do MVP atual.

---

## 2. Limitação metodológica da MV0

Nesta etapa não será realizada pesquisa de campo estruturada suficiente para validar todas as personas, necessidades e hipóteses levantadas.

Por isso:

- stakeholders e personas permanecem provisórios;
- necessidades sem evidência suficiente permanecem explicitamente tratadas como hipóteses;
- requisitos poderão ser revisados conforme novas informações forem obtidas;
- recursos futuros não devem ser tratados automaticamente como requisitos do MVP;
- dados reais de uso, entrevistas, observação e relacionamento com atores locais deverão alimentar revisões futuras.

A decisão é entregar uma primeira versão territorial suficientemente genérica para começar a gerar uso, informação e aprendizado, sem fingir que todas as necessidades do território já foram validadas.

---

## 3. Visão de longo prazo do ecossistema

O Caminhos de Mambucaba não é pensado apenas como um site institucional.

A visão de longo prazo é construir um ecossistema territorial capaz de conectar:

- visitantes;
- moradores;
- guias e condutores;
- comerciantes;
- hospedagens;
- produtores;
- iniciativas culturais;
- histórias e memória local;
- experiências;
- capacitação;
- operação turística;
- dados territoriais;
- instituições e parceiros.

Essa visão poderá futuramente incluir diferentes interfaces ou aplicações para públicos distintos.

### 3.1 Possível experiência mobile para visitantes

No futuro poderá existir uma aplicação mobile voltada principalmente ao visitante, funcionando como um companheiro territorial durante a visita.

Hipóteses de capacidades futuras:

- mapa territorial dinâmico;
- orientação baseada em localização;
- localização em tempo real quando apropriado;
- avisos contextuais;
- informações de rotas;
- pontos de interesse;
- eventos próximos;
- experiências;
- serviços;
- informações de segurança;
- informações históricas e culturais associadas ao local;
- recursos que auxiliem o visitante antes, durante e depois da viagem.

Esses elementos representam visão de produto e hipóteses futuras, não compromisso do MVP atual.

### 3.2 Possível experiência para atores locais

Também poderá existir uma experiência específica para:

- guias;
- condutores;
- comerciantes;
- hospedagens;
- produtores;
- prestadores;
- organizadores de experiências.

Essa experiência poderá possuir necessidades diferentes da aplicação voltada ao visitante.

A decisão entre uma única aplicação com perfis distintos ou aplicações separadas deverá ser tomada futuramente com base em requisitos, experiência de uso, custo e manutenção.

### 3.3 Capacitação

O ecossistema deverá considerar a capacitação de atores locais como parte relevante de sua missão.

Áreas possíveis incluem:

- hospitalidade;
- turismo;
- atendimento;
- inclusão;
- segurança;
- presença digital;
- comercialização;
- boas práticas ambientais;
- valorização cultural;
- uso das ferramentas do ecossistema.

A forma tecnológica dessa capacitação ainda não está definida.

### 3.4 Histórias, memória e participação

O produto deverá considerar a participação da comunidade na preservação e publicação de histórias relacionadas ao território.

A visão inclui permitir que pessoas contribuam com:

- relatos;
- memórias;
- histórias;
- fotografias;
- informações culturais;
- conhecimento territorial.

Conteúdo comunitário deverá possuir mecanismos adequados de autoria, consentimento, curadoria e moderação.

### 3.5 Economia local e monetização futura

No longo prazo, o ecossistema poderá permitir maior participação econômica dos atores locais.

Hipóteses futuras incluem:

- publicação de produtos;
- publicação de serviços;
- comercialização;
- reservas;
- pacotes;
- experiências;
- intermediação;
- assinaturas;
- destaque pago;
- comissões;
- marketplace local;
- pedidos de alimentação ou produtos;
- logística ou retirada local.

Uma experiência semelhante a um marketplace ou serviço local de pedidos pode ser avaliada futuramente.

Nenhum desses modelos é considerado aprovado nesta MV0.

---

## 4. Convenções

### 4.1 Identificadores

Requisitos funcionais:

`RF-001`, `RF-002`, `RF-003`...

Requisitos não funcionais:

`RNF-001`, `RNF-002`, `RNF-003`...

Hipóteses de produto:

`HP-001`, `HP-002`, `HP-003`...

### 4.2 Prioridade

Será utilizada uma adaptação de MoSCoW.

**MUST**  
Necessário para que o incremento considerado cumpra seu objetivo.

**SHOULD**  
Importante, mas pode ser adiado sem inviabilizar o incremento.

**COULD**  
Desejável, mas não necessário no momento.

**OUT**  
Explicitamente fora do escopo atual.

### 4.3 Horizonte

Os requisitos também podem receber um horizonte.

**ATUAL**  
Relaciona-se à experiência que já existe ou precisa ser preservada.

**PRÓXIMO**  
Candidato a incrementos próximos após a MV0.

**FUTURO**  
Parte da visão estratégica, ainda dependente de validação.

### 4.4 Regra fundamental

Um requisito descreve uma capacidade ou restrição necessária.

Ele não deve prescrever implementação sem uma justificativa previamente aprovada.

Exemplo inadequado:

> O sistema deve criar um endpoint Go usando Chi para retornar experiências.

Exemplo adequado:

> O sistema deve permitir consultar experiências publicadas.

A implementação será decidida posteriormente.

---

# 5. Requisitos Funcionais

## 5.1 Conteúdo e descoberta territorial

### RF-001 — Consultar informações públicas do território

**Prioridade:** MUST  
**Horizonte:** ATUAL

O visitante deve conseguir consultar informações públicas sobre o território sem precisar criar uma conta.

As informações podem incluir:

- localidades;
- natureza;
- cultura;
- histórias;
- pontos de interesse;
- iniciativas;
- serviços;
- experiências.

**Origem:** P01, P05, S05, S09.

**Critérios de aceitação:**

- conteúdo publicado pode ser acessado publicamente;
- conteúdo não publicado não aparece na experiência pública;
- a origem ou responsabilidade pelo conteúdo pode ser identificada quando necessário.

---

### RF-002 — Consultar experiências e atividades

**Prioridade:** MUST  
**Horizonte:** ATUAL

O visitante deve conseguir consultar experiências e atividades disponíveis no território.

As informações relevantes poderão incluir, quando disponíveis:

- descrição;
- localização;
- duração;
- condições de acesso;
- público indicado;
- cuidados;
- prestador responsável;
- informações de contato.

**Origem:** P01, P02, P03, S06, S09.

---

### RF-003 — Consultar rotas territoriais

**Prioridade:** MUST  
**Horizonte:** ATUAL

O sistema deve permitir apresentar rotas ou percursos territoriais com informações suficientes para que o visitante compreenda sua proposta.

Uma rota poderá relacionar diferentes elementos do ecossistema, como:

- locais;
- experiências;
- histórias;
- serviços;
- natureza;
- cultura;
- negócios.

**Origem:** visão atual do Caminhos, P01, S09.

---

### RF-004 — Consultar negócios e serviços locais

**Prioridade:** MUST  
**Horizonte:** ATUAL

O visitante deve conseguir descobrir negócios, serviços e iniciativas locais participantes do ecossistema.

**Origem:** P01, P04, S07, S08, S09.

**Critérios de aceitação:**

- informações públicas essenciais podem ser consultadas;
- informações identificam corretamente o ator responsável;
- registros desativados não devem aparecer como disponíveis.

---

### RF-005 — Consultar eventos e agenda territorial

**Prioridade:** SHOULD  
**Horizonte:** PRÓXIMO

O visitante e o morador devem poder consultar eventos e atividades territoriais divulgados pelo ecossistema.

**Origem:** visão do produto, P01, P05.

---

## 5.2 Histórias, memória e conteúdo comunitário

### RF-006 — Publicar histórias territoriais

**Prioridade:** SHOULD  
**Horizonte:** PRÓXIMO

O ecossistema deve permitir a publicação de histórias relacionadas ao território.

Essas histórias poderão representar:

- memória oral;
- acontecimentos;
- personagens;
- cultura;
- patrimônio;
- relatos comunitários;
- registros históricos.

**Origem:** P05, S05, visão do produto.

---

### RF-007 — Receber contribuições de histórias e memória

**Prioridade:** SHOULD  
**Horizonte:** PRÓXIMO

Pessoas da comunidade devem poder submeter contribuições relacionadas a histórias, memória ou conhecimento territorial.

A submissão não implica publicação automática.

**Origem:** P05, H05.

**Critérios de aceitação:**

- a contribuição pode ser recebida;
- autoria ou origem pode ser registrada;
- conteúdo possui estado de análise antes da publicação;
- o responsável pelo conteúdo pode ser identificado quando aplicável.

---

### RF-008 — Revisar conteúdo antes da publicação

**Prioridade:** MUST  
**Horizonte:** PRÓXIMO

Usuários autorizados devem poder revisar conteúdos submetidos antes de torná-los públicos.

**Origem:** necessidade de governança, S01, S02, P06.

---

### RF-009 — Atualizar ou retirar conteúdo publicado

**Prioridade:** MUST  
**Horizonte:** PRÓXIMO

Usuários autorizados devem conseguir corrigir, atualizar ou retirar conteúdos que não devam permanecer publicados.

**Origem:** governança e manutenção da informação.

---

## 5.3 Participação de atores locais

### RF-010 — Receber interesse de participação de negócios e prestadores

**Prioridade:** SHOULD  
**Horizonte:** PRÓXIMO

Negócios, guias, prestadores e outras iniciativas locais devem possuir uma forma de demonstrar interesse em participar do ecossistema.

**Origem:** P02, P03, P04, S06, S07.

---

### RF-011 — Manter informações de atores participantes

**Prioridade:** SHOULD  
**Horizonte:** PRÓXIMO

O ecossistema deve conseguir registrar e manter informações necessárias sobre atores participantes.

A definição de quem poderá editar cada informação será tratada em requisitos posteriores.

**Origem:** P02, P03, P04, P06.

---

### RF-012 — Relacionar atores a experiências e conteúdos

**Prioridade:** SHOULD  
**Horizonte:** PRÓXIMO

O sistema deve permitir relacionar atores territoriais a experiências, rotas, histórias, serviços ou outros conteúdos quando essa relação existir.

**Origem:** natureza de ecossistema do produto.

---

## 5.4 Capacitação

### RF-013 — Disponibilizar oportunidades de capacitação

**Prioridade:** SHOULD  
**Horizonte:** FUTURO

O ecossistema deve poder divulgar oportunidades de capacitação relevantes aos atores locais.

**Origem:** visão estratégica do produto.

---

### RF-014 — Organizar conteúdos de capacitação

**Prioridade:** COULD  
**Horizonte:** FUTURO

O produto poderá disponibilizar conteúdos ou jornadas educacionais para apoiar capacitação dos participantes.

A forma de entrega ainda não está definida.

**Origem:** visão estratégica do produto.

---

### RF-015 — Registrar participação em capacitações

**Prioridade:** COULD  
**Horizonte:** FUTURO

O ecossistema poderá registrar participação ou conclusão de determinadas capacitações quando isso gerar valor operacional ou institucional.

**Origem:** visão estratégica do produto.

---

## 5.5 Operação institucional e territorial

### RF-016 — Criar e manter conteúdos por usuários autorizados

**Prioridade:** MUST  
**Horizonte:** PRÓXIMO

Usuários autorizados devem conseguir criar e manter informações utilizadas na experiência pública.

**Origem:** P06, S01, S02.

---

### RF-017 — Controlar estados de publicação

**Prioridade:** MUST  
**Horizonte:** PRÓXIMO

Conteúdos que dependam de revisão devem possuir estados suficientes para diferenciar informações em preparação, análise, publicação ou retirada.

A implementação desses estados não está definida nesta etapa.

---

### RF-018 — Identificar origem e responsabilidade por informações relevantes

**Prioridade:** MUST  
**Horizonte:** PRÓXIMO

Quando necessário para governança, o sistema deve permitir identificar origem, autoria ou responsável por determinada informação.

**Origem:** P05, P06, S01, S02.

---

### RF-019 — Apoiar geração de informação territorial

**Prioridade:** SHOULD  
**Horizonte:** FUTURO

O sistema deve poder fornecer dados adequados para análises relacionadas ao funcionamento do ecossistema.

A coleta de dados deverá respeitar finalidade, necessidade e privacidade.

**Origem:** P06, S01, S02.

---

## 5.6 Aplicação mobile e experiência contextual

### RF-020 — Oferecer experiência adequada em dispositivos móveis

**Prioridade:** MUST  
**Horizonte:** ATUAL

As principais informações públicas devem ser utilizáveis em dispositivos móveis.

Esse requisito não implica a existência imediata de aplicativo nativo.

---

### RF-021 — Disponibilizar mapa territorial interativo

**Prioridade:** COULD  
**Horizonte:** FUTURO

O ecossistema poderá oferecer uma experiência cartográfica interativa que permita explorar conteúdos e pontos de interesse do território.

**Origem:** visão futura do produto.

---

### RF-022 — Utilizar localização do visitante mediante autorização

**Prioridade:** COULD  
**Horizonte:** FUTURO

Uma futura experiência mobile poderá utilizar a localização do dispositivo para oferecer funcionalidades contextuais, desde que exista autorização apropriada do usuário.

**Origem:** visão futura do produto.

---

### RF-023 — Exibir informações contextuais relacionadas à localização

**Prioridade:** COULD  
**Horizonte:** FUTURO

Quando houver consentimento e justificativa de produto, o sistema poderá apresentar informações relacionadas à posição ou proximidade do visitante.

Exemplos de contexto a investigar:

- pontos próximos;
- rotas;
- eventos;
- alertas;
- patrimônio;
- histórias;
- serviços.

---

### RF-024 — Emitir avisos relevantes ao visitante

**Prioridade:** COULD  
**Horizonte:** FUTURO

Uma futura aplicação poderá emitir avisos relacionados à experiência territorial.

Tipos, origem, frequência e criticidade dos avisos ainda precisam ser definidos e validados.

---

### RF-025 — Suportar experiências distintas para visitantes e atores locais

**Prioridade:** COULD  
**Horizonte:** FUTURO

O ecossistema poderá oferecer experiências de uso diferentes para visitantes e participantes profissionais ou comerciais.

Esse requisito não determina se existirão:

- dois aplicativos;
- um aplicativo com perfis;
- aplicação web e aplicação mobile;
- outras combinações.

A decisão deverá ser tomada posteriormente.

---

## 5.7 Economia local, produtos e monetização

### RF-026 — Permitir divulgação de produtos locais

**Prioridade:** COULD  
**Horizonte:** FUTURO

Atores participantes poderão futuramente divulgar produtos associados aos seus negócios ou produção local.

**Origem:** visão estratégica do produto.

---

### RF-027 — Permitir divulgação de serviços comercializáveis

**Prioridade:** COULD  
**Horizonte:** FUTURO

Prestadores poderão futuramente apresentar serviços que possam gerar oportunidades comerciais através do ecossistema.

---

### RF-028 — Permitir comercialização através do ecossistema

**Prioridade:** OUT  
**Horizonte:** FUTURO

O ecossistema poderá futuramente oferecer mecanismos de comercialização de produtos, serviços, experiências ou pacotes.

Esse requisito está explicitamente fora do MVP inicial e depende de:

- validação de demanda;
- modelo jurídico;
- operação;
- pagamentos;
- responsabilidades;
- atendimento;
- cancelamento;
- tributação;
- segurança;
- suporte.

---

### RF-029 — Suportar marketplace territorial

**Prioridade:** OUT  
**Horizonte:** FUTURO

O produto poderá futuramente evoluir para um marketplace territorial que conecte demanda e oferta local.

A hipótese deverá ser validada antes de qualquer implementação.

---

### RF-030 — Suportar pedidos locais

**Prioridade:** OUT  
**Horizonte:** FUTURO

Poderá ser avaliada futuramente uma experiência de pedidos de produtos, alimentação ou outros itens fornecidos por atores locais.

A visão pode possuir características semelhantes a plataformas de pedidos, mas o modelo operacional ainda não está definido.

---

### RF-031 — Suportar modelos de monetização

**Prioridade:** OUT  
**Horizonte:** FUTURO

O ecossistema poderá utilizar modelos de monetização compatíveis com sua missão e governança.

Possibilidades a investigar:

- assinatura;
- comissão;
- destaque;
- intermediação;
- serviços;
- pacotes;
- publicidade compatível;
- outras fontes.

Nenhum modelo é considerado aprovado nesta MV0.

---

# 6. Requisitos Não Funcionais

## RNF-001 — Acessibilidade

**Prioridade:** MUST

A experiência pública deve buscar conformidade com boas práticas de acessibilidade web.

Devem ser considerados, entre outros:

- navegação por teclado;
- semântica HTML;
- textos alternativos;
- labels;
- hierarquia de títulos;
- contraste;
- foco visível;
- mensagens compreensíveis.

---

## RNF-002 — Responsividade

**Prioridade:** MUST

A experiência pública deve funcionar adequadamente em diferentes tamanhos de tela, com atenção especial ao uso em smartphones.

---

## RNF-003 — SEO e descoberta pública

**Prioridade:** MUST

Conteúdos públicos relevantes devem ser estruturados de modo a permitir indexação adequada por mecanismos de busca quando apropriado.

---

## RNF-004 — Desempenho

**Prioridade:** MUST

A aplicação pública deve evitar carregamento excessivo e manter experiência aceitável em dispositivos e conexões limitadas.

Critérios quantitativos deverão ser definidos posteriormente.

---

## RNF-005 — Segurança

**Prioridade:** MUST

O produto deverá aplicar controles de segurança proporcionais aos riscos envolvidos.

Isso inclui proteger:

- áreas restritas;
- credenciais;
- informações privadas;
- operações administrativas;
- integrações;
- dados submetidos por usuários.

---

## RNF-006 — Privacidade e LGPD

**Prioridade:** MUST

Dados pessoais somente deverão ser tratados quando existir finalidade legítima e necessidade identificada.

O produto deverá evitar coleta excessiva de dados.

Funcionalidades de localização deverão possuir atenção especial a:

- consentimento;
- finalidade;
- retenção;
- compartilhamento;
- transparência.

---

## RNF-007 — Rastreabilidade

**Prioridade:** SHOULD

Informações que dependam de responsabilidade editorial ou institucional deverão possuir rastreabilidade suficiente para identificar origem e alterações relevantes.

---

## RNF-008 — Manutenibilidade

**Prioridade:** MUST

O sistema deverá ser desenvolvido de forma que a equipe consiga compreender, testar, modificar e evoluir seus componentes sem dependência desnecessária de indivíduos específicos.

Esse requisito não determina arquitetura.

---

## RNF-009 — Portabilidade e redução de lock-in

**Prioridade:** SHOULD

Decisões técnicas relevantes deverão considerar o custo de migração e dependência de fornecedores.

Lock-in poderá ser aceito quando seus benefícios justificarem claramente o custo.

---

## RNF-010 — Custo operacional

**Prioridade:** MUST

A arquitetura deverá considerar a capacidade financeira real do projeto.

Soluções deverão ser avaliadas levando em conta:

- custo inicial;
- custo recorrente;
- limites de planos;
- crescimento;
- manutenção;
- recursos humanos necessários.

---

## RNF-011 — Observabilidade

**Prioridade:** SHOULD

O sistema deverá possuir meios suficientes para identificar falhas relevantes e compreender o funcionamento da aplicação em produção.

A solução específica será definida posteriormente.

---

## RNF-012 — Disponibilidade

**Prioridade:** SHOULD

A experiência pública deverá possuir disponibilidade compatível com sua importância para visitantes e operação.

Metas formais ainda não foram definidas.

---

## RNF-013 — Evolução incremental

**Prioridade:** MUST

A arquitetura e o processo de desenvolvimento devem permitir que o ecossistema cresça através de incrementos menores sem exigir que toda a visão futura seja implementada antecipadamente.

---

## RNF-014 — Separação entre requisito e implementação

**Prioridade:** MUST

Decisões de tecnologia deverão ser rastreáveis às necessidades e restrições que buscam atender.

Preferência pessoal, tendência de mercado ou sugestão de IA não constituem justificativa suficiente isoladamente.

---

## RNF-015 — Governança de conteúdo

**Prioridade:** MUST

Conteúdos públicos que representem pessoas, comunidade, território ou instituição devem possuir processos adequados de responsabilidade, revisão e correção.

---

## RNF-016 — Segurança relacionada à localização

**Prioridade:** MUST quando localização for implementada  
**Horizonte:** FUTURO

Caso recursos de localização sejam implementados, o produto deverá minimizar riscos associados ao acompanhamento desnecessário de pessoas.

Localização em tempo real não deverá ser coletada ou armazenada sem necessidade clara, consentimento e controles adequados.

---

# 7. Hipóteses de Produto Registradas

## HP-001 — Aplicativo do visitante

Uma aplicação mobile dedicada poderá gerar valor suficiente para justificar uma experiência além da web responsiva.

**Status:** não validada.

---

## HP-002 — Aplicativo de atores locais

Guias, comerciantes e outros participantes poderão possuir necessidades suficientemente distintas para justificar uma aplicação própria.

**Status:** não validada.

---

## HP-003 — Mapa como interface central

Uma interface cartográfica poderá se tornar um dos principais meios de interação com o território.

**Status:** não validada.

---

## HP-004 — Informações contextuais por localização

A utilização de localização poderá tornar a visita mais segura, informativa ou interessante.

**Status:** não validada.

---

## HP-005 — Capacitação integrada

Capacitação poderá aumentar a qualidade e sustentabilidade do ecossistema.

**Status:** hipótese estratégica.

---

## HP-006 — Conteúdo comunitário

Moradores poderão contribuir ativamente para histórias e conhecimento territorial.

**Status:** hipótese a validar.

---

## HP-007 — Marketplace territorial

A concentração de oferta local poderá evoluir para transações comerciais dentro do ecossistema.

**Status:** visão futura, não validada.

---

## HP-008 — Rede local de pedidos

Poderá existir valor em uma experiência integrada de pedidos e descoberta de produtos ou alimentação local.

**Status:** visão futura, não validada.

---

## HP-009 — Monetização através dos participantes

A sustentabilidade financeira poderá ser parcialmente apoiada por serviços oferecidos aos atores econômicos do ecossistema.

**Status:** hipótese de modelo de negócio.

---

# 8. Fora do Escopo do MVP Inicial

Mesmo fazendo parte da visão, os seguintes elementos não deverão entrar automaticamente no primeiro MVP:

- aplicação mobile nativa;
- rastreamento ou localização contínua;
- notificações push;
- marketplace completo;
- pagamentos;
- pedidos de alimentação;
- logística;
- sistema completo de avaliações;
- programa completo de capacitação online;
- motor de recomendações;
- fidelidade;
- assinatura comercial;
- comissão automática;
- reservas complexas;
- dashboards avançados;
- automação de políticas públicas.

A inclusão futura deverá ocorrer através de novas histórias, requisitos e decisões.

---

# 9. Rastreabilidade Inicial

| Origem | Necessidades relacionadas | Requisitos principais |
|---|---|---|
| P01 — Visitante Independente | descoberta, confiança, planejamento | RF-001, RF-002, RF-003, RF-004, RF-020 |
| P02 — Guia para Mulheres | descoberta, confiança, rede | RF-002, RF-010, RF-011, RF-012 |
| P03 — Prestador Inclusivo | posicionamento, confiança, descoberta | RF-002, RF-010, RF-011, RF-012 |
| P04 — Empreendedor Local | visibilidade, autonomia, participação | RF-004, RF-010, RF-011, RF-026 |
| P05 — Morador Participante | participação, memória, representação | RF-006, RF-007, RF-018 |
| P06 — Operador Institucional | governança, informação, análise | RF-008, RF-009, RF-016, RF-017, RF-018, RF-019 |
| Visão futura mobile | experiência contextual | RF-021, RF-022, RF-023, RF-024, RF-025 |
| Visão de capacitação | fortalecimento de atores locais | RF-013, RF-014, RF-015 |
| Visão econômica futura | sustentabilidade e economia local | RF-026, RF-027, RF-028, RF-029, RF-030, RF-031 |

---

# 10. Questões em Aberto

## Produto

- Qual é o menor conjunto de capacidades que gera valor suficiente na próxima versão?
- Quais funcionalidades atuais devem ser preservadas?
- Quais jornadas devem ser priorizadas primeiro?
- Quais hipóteses merecem validação antes de implementação?

## Conteúdo

- Quem pode publicar diretamente?
- Quem precisa passar por curadoria?
- Como autoria comunitária será atribuída?
- Como corrigir conteúdo histórico contestado?
- Como lidar com direitos de imagens e materiais enviados?

## Participação econômica

- Quem pode participar?
- Existe processo de validação?
- Haverá cobrança?
- Em qual momento um diretório se transforma em marketplace?
- Quem responde por uma transação?
- Como evitar favorecimento indevido?

## Mobile

- A web responsiva será suficiente por quanto tempo?
- Quando um aplicativo nativo passa a gerar valor real?
- Existe necessidade de funcionamento offline?
- Quais recursos realmente exigem capacidades nativas?
- Existe justificativa para duas aplicações?
- Qual é o custo de manutenção dessas experiências?

## Localização

- Quais problemas concretos exigem localização?
- Precisamos de localização contínua ou apenas consulta pontual?
- Quais alertas possuem valor real?
- Quem cria e valida alertas?
- Quais riscos de segurança e privacidade surgem?

## Capacitação

- Quem produz os conteúdos?
- A capacitação será presencial, digital ou híbrida?
- Existe necessidade de certificação?
- Quem valida os conteúdos?
- Quais temas devem vir primeiro?

---

# 11. Critérios de Conclusão da MV0-03

A primeira versão desta etapa será considerada suficientemente concluída quando:

- [x] requisitos funcionais iniciais estiverem identificados;
- [x] requisitos não funcionais iniciais estiverem identificados;
- [x] requisitos possuírem identificadores;
- [x] requisitos estiverem descritos sem prescrever arquitetura;
- [x] prioridades iniciais estiverem registradas;
- [x] visão futura estiver separada do MVP;
- [x] hipóteses estiverem separadas de requisitos obrigatórios;
- [x] requisitos principais possuírem rastreabilidade inicial;
- [ ] requisitos tiverem revisão cruzada da equipe;
- [ ] prioridades do próximo incremento tiverem aprovação conjunta;
- [ ] requisitos conflitantes ou redundantes tiverem sido revisados.

---

# 12. Próximo Passo

Este documento não define o backlog da implementação por si só.

A sequência da MV0 permanece:

Stakeholders  
→ Personas  
→ Requisitos  
→ Dados e fluxos  
→ Custos e recursos  
→ Alternativas arquiteturais  
→ Story Map  
→ Definição da MV1

A visão de longo prazo deve orientar decisões sem obrigar o projeto a construir antecipadamente aquilo que ainda não precisa.

O princípio é:

> Construir pequeno sem pensar pequeno.
