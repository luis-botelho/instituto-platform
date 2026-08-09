# Dados e Fluxos — Caminhos de Mambucaba

> **Status:** Provisório  
> **Fase:** MV0 — Descoberta, Requisitos e Alinhamento  
> **Documento:** `docs/discovery/05-DADOS-E-FLUXOS.md`  
> **Issue relacionada:** MV0-04 — Inventariar dados, fluxos e restrições de privacidade  
> **Base:** estado atual do repositório + requisitos e hipóteses registrados na MV0.

---

## 1. Objetivo

Este documento descreve os dados que existem hoje no Caminhos de Mambucaba, como eles circulam, quem os fornece, quem potencialmente os utiliza e quais riscos ou lacunas precisam ser considerados antes de qualquer redesenho de persistência, API ou arquitetura.

A finalidade desta etapa é responder:

- quais dados existem hoje;
- quais dados estão apenas em conteúdo estático ou demonstrativo;
- quais dados já são persistidos;
- quais dados pessoais são coletados;
- quais fluxos de leitura e escrita já existem;
- quais novos grupos de dados surgem dos requisitos da MV0;
- quais riscos de privacidade e governança precisam ser considerados;
- quais decisões ainda não possuem evidência suficiente.

Este documento **não define o schema futuro do banco**.

---

## 2. Regra metodológica

O levantamento diferencia quatro estados:

### EXISTENTE

Dado ou fluxo identificado no código atual ou na persistência existente.

### DEMONSTRATIVO

Dado utilizado para ilustrar a experiência, explicitamente marcado no código como não verificado.

### NECESSÁRIO / CANDIDATO

Dado que deriva de um requisito atual ou próximo, mas cuja modelagem ainda não foi definida.

### FUTURO / HIPÓTESE

Dado relacionado à visão de longo prazo, dependente de validação antes de ser implementado.

A sequência correta permanece:

```text
necessidade
    ↓
requisito
    ↓
dado necessário
    ↓
fluxo
    ↓
restrições
    ↓
alternativas de implementação
    ↓
schema / API / arquitetura
```

Não devemos inverter essa ordem.

---

# 3. Estado Atual Encontrado no Repositório

## 3.1 Conteúdo territorial demonstrativo

O arquivo atual:

`lib/data.ts`

declara explicitamente que seus dados são demonstrativos e não representam informações reais ou verificadas.

Hoje ele contém estruturas de conteúdo utilizadas pela experiência pública, incluindo pelo menos:

- caminhos públicos;
- categorias territoriais;
- pontos do mapa;
- experiências;
- interesses;
- duração;
- formato;
- público recomendado;
- localidades;
- coordenadas aproximadas;
- contatos demonstrativos;
- informações de acessibilidade;
- status de validação.

### Status atual

**DEMONSTRATIVO / ESTÁTICO**

### Armazenamento atual

Código-fonte.

### Exemplos de estruturas identificadas

#### Caminho

Campos identificados:

- `slug`;
- `titulo`;
- `chamada`;
- `descricao`;
- `acoes`;
- `cor`;
- `href`.

#### Ponto territorial

Campos identificados:

- `id`;
- `nome`;
- `categoria`;
- `localidade`;
- `descricao`;
- `lat`;
- `lng`;
- `telefone`;
- `whatsapp`;
- `instagram`;
- `site`;
- `horario`;
- `acessibilidade`;
- `status`.

#### Experiência

Campos identificados:

- `slug`;
- `nome`;
- `imagem`;
- `resumo`;
- `porque`;
- `duracao`;
- `formato`;
- `interesses`;
- `publico`;
- `localidades`;
- `sequencia`;
- `pontos`;
- `deslocamento`;
- `cuidados`;
- `acessibilidade`;
- `custo`;
- `iniciativas`;
- `status`.

### Observação importante

No estado atual, esses conteúdos podem ser usados para demonstrar navegação e interface, mas **não devem ser interpretados como catálogo territorial validado**.

Um dado demonstrativo não deve migrar automaticamente para uma futura base de produção como se fosse dado real.

---

## 3.2 Cadastro Único / Participação

Existe um fluxo público de participação através do componente:

`components/participar/participar-form.tsx`

Esse formulário permite diferentes tipos de contribuição.

Tipos identificados no estado atual:

- hospedagem;
- empreendimento;
- experiência;
- atrativo;
- mapeamento territorial;
- interesse no Selo Caminhos;
- formação;
- voluntariado;
- parceria institucional;
- apoio;
- sugestão.

### Dados comuns coletados

- nome;
- telefone;
- e-mail;
- localidade;
- vínculo com Mambucaba;
- observações;
- consentimento.

### Dados variáveis

Cada tipo possui um conjunto próprio de informações adicionais.

Essas informações são agrupadas no frontend em um objeto `details`.

Exemplos identificados:

#### Hospedagem

- nome;
- tipo;
- endereço ou referência;
- capacidade;
- quartos;
- faixa de diária;
- site/rede social;
- estrutura;
- acessibilidade;
- link para fotos.

#### Empreendimento

- nome;
- categoria;
- endereço;
- horário;
- link;
- descrição;
- fotos.

#### Experiência

- nome/ideia;
- lugares;
- duração;
- capacidade;
- preço/contribuição;
- público recomendado;
- descrição;
- cuidados;
- fotos.

#### Atrativo

- nome;
- tipo;
- localização;
- descrição;
- acesso;
- conservação;
- fonte/fotos.

#### Mapeamento

- categoria;
- nome da referência;
- localização;
- importância.

#### Formação

- temas de interesse;
- melhor período.

Os demais tipos possuem campos próprios conforme a finalidade da contribuição.

---

## 3.3 Persistência das contribuições

O fluxo atual é:

```text
Pessoa
    ↓
Formulário Participar
    ↓
POST /api/submissions
    ↓
Validação no servidor
    ↓
Geração de protocolo CAM
    ↓
Supabase REST
    ↓
tabela submissions
```

A rota atual é:

`app/api/submissions/route.ts`

O armazenamento é realizado por código server-side em:

`lib/supabase.ts`

### Tabela atual: `submissions`

Campos existentes:

- `id`;
- `protocol`;
- `type`;
- `name`;
- `email`;
- `phone`;
- `locality`;
- `relationship`;
- `details`;
- `notes`;
- `status`;
- `consented_at`;
- `created_at`;
- `updated_at`.

### Status permitidos atualmente

- `pending`;
- `reviewing`;
- `approved`;
- `rejected`;
- `archived`.

### Natureza do dado

**PRIVADO**

A própria migration descreve a tabela como:

> Contribuições privadas recebidas pelo Cadastro Único.

---

# 4. Demandas do Observatório

Existe outro fluxo persistente relacionado ao Observatório.

O componente atual é:

`components/observatorio/demand-form.tsx`

## 4.1 Dados coletados

- nome;
- e-mail;
- localidade;
- tipo de manifestação;
- tema;
- referência territorial;
- relato.

Tipos de manifestação atualmente apresentados:

- pedido de informação;
- reclamação;
- sugestão;
- denúncia;
- elogio.

Temas atualmente apresentados incluem:

- saúde;
- educação;
- mobilidade;
- saneamento;
- drenagem e rios;
- iluminação;
- obras;
- meio ambiente;
- outro.

---

## 4.2 Fluxo local antes do envio

Antes de qualquer envio ao Observatório, o sistema consegue estruturar a manifestação no navegador.

Fluxo:

```text
Pessoa
    ↓
Preenche relato
    ↓
Frontend organiza a informação
    ↓
Minuta gerada localmente
    ↓
Pessoa revisa
```

Nesse estágio, a interface informa que nada é enviado ao Observatório.

O formulário também mantém um rascunho em:

`localStorage`

Chave identificada:

`observatorio-demanda-rascunho`

### Dados do rascunho

- conteúdo do formulário;
- data de criação.

### Risco

Mesmo sem envio ao servidor, informações pessoais podem permanecer armazenadas no navegador/dispositivo utilizado pela pessoa.

Esse comportamento deverá ser considerado na política de privacidade e na futura revisão de retenção local.

---

## 4.3 Exportação local

O usuário pode atualmente gerar ou baixar:

- texto;
- JSON;
- impressão/PDF.

O JSON técnico produzido no navegador possui estrutura aproximada com:

- versão do schema;
- solicitante;
- território;
- manifestação;
- orientação.

Esses arquivos permanecem sob controle do usuário, salvo quando enviados posteriormente por outro meio.

---

## 4.4 Envio voluntário ao Observatório

Apenas após autorização explícita, a pessoa pode enviar uma cópia ao Observatório.

Fluxo:

```text
Pessoa
    ↓
Minuta
    ↓
Consentimento para armazenamento
    ↓
POST /api/demands
    ↓
Validação server-side
    ↓
Protocolo DEM
    ↓
Supabase REST
    ↓
tabela demands
```

### Tabela atual: `demands`

Campos existentes:

- `id`;
- `protocol`;
- `name`;
- `email`;
- `locality`;
- `manifestation_type`;
- `topic`;
- `territorial_reference`;
- `report`;
- `status`;
- `consented_at`;
- `created_at`;
- `updated_at`.

### Status permitidos atualmente

- `received`;
- `reviewing`;
- `forwarded`;
- `answered`;
- `archived`.

### Natureza do dado

**PRIVADO**

A migration descreve a tabela como:

> Demandas privadas enviadas voluntariamente ao Observatório.

---

# 5. Segurança Atual da Persistência

A migration atual:

`supabase/migrations/20260801000000_create_intake_tables.sql`

habilita Row Level Security para:

- `submissions`;
- `demands`.

Também remove acesso direto às duas tabelas pelos papéis:

- `anon`;
- `authenticated`.

O código atual de escrita utiliza:

`SUPABASE_SERVICE_ROLE_KEY`

somente no servidor.

O fluxo é:

```text
Browser
    ↓
Next.js API
    ↓
credencial privilegiada no servidor
    ↓
Supabase
```

O navegador não recebe a chave privilegiada.

### Situação observada

A escrita pública acontece indiretamente através das rotas da aplicação.

### Lacuna

Neste levantamento não foi identificado um fluxo administrativo completo e auditado para leitura, análise e atualização desses registros.

A existência de estados no banco indica intenção de tratamento operacional, mas **não deve ser assumido que todo o fluxo administrativo já esteja implementado**.

---

# 6. Inventário Atual Resumido

| Grupo de dado | Estado | Origem | Persistência atual | Pessoal? | Público? |
|---|---|---|---|---|---|
| caminhos editoriais | demonstrativo | equipe/código | `lib/data.ts` | não | sim |
| pontos territoriais | demonstrativo | equipe/código | `lib/data.ts` | pode conter contato | sim |
| experiências | demonstrativo | equipe/código | `lib/data.ts` | normalmente não | sim |
| contribuição ao Cadastro Único | existente | participante | Supabase `submissions` | sim | não |
| detalhes da contribuição | existente | participante | `submissions.details` JSONB | pode conter | não |
| demanda cidadã | existente | cidadão | Supabase `demands` | sim | não |
| rascunho de demanda | existente | cidadão | localStorage | sim | não |
| minuta estruturada | existente | cidadão | memória/arquivo local | sim | controlado pelo usuário |
| arquivos exportados | existente | cidadão | dispositivo do usuário | sim | controlado pelo usuário |
| analytics | parcialmente identificado | aplicação | serviço externo / a revisar | potencialmente | não aplicável |

---

# 7. Classificação Funcional dos Dados

Para evolução do produto, os dados podem ser agrupados por finalidade.

## D01 — Conteúdo territorial público

Exemplos:

- lugares;
- histórias;
- experiências;
- rotas;
- eventos;
- patrimônio;
- natureza;
- informações culturais.

Finalidade:

Permitir descoberta e compreensão do território.

---

## D02 — Atores econômicos e territoriais

Exemplos:

- negócios;
- hospedagens;
- guias;
- produtores;
- prestadores;
- organizações;
- iniciativas culturais.

Finalidade:

Representar os atores participantes do ecossistema e relacioná-los a serviços, experiências e conteúdos.

---

## D03 — Contato e identificação

Exemplos:

- nome;
- e-mail;
- telefone;
- vínculo;
- localidade.

Finalidade:

Contato, participação e operação.

Natureza:

**Dado pessoal quando associado a pessoa identificada ou identificável.**

---

## D04 — Participação comunitária

Exemplos:

- sugestões;
- mapeamentos;
- relatos;
- histórias;
- memória;
- conhecimento territorial;
- propostas.

Finalidade:

Permitir participação no ecossistema.

---

## D05 — Conteúdo editorial e governança

Exemplos:

- autor;
- fonte;
- revisão;
- responsável;
- estado de publicação;
- data de publicação;
- correções;
- justificativa de retirada.

Finalidade:

Preservar responsabilidade e rastreabilidade.

---

## D06 — Geodados

Exemplos:

- latitude;
- longitude;
- endereço;
- referência territorial;
- trilha/rota;
- proximidade.

Finalidade:

Representação territorial e futura experiência cartográfica.

---

## D07 — Dados de capacitação

Exemplos futuros:

- temas de interesse;
- inscrição;
- presença;
- conclusão;
- organização responsável;
- conteúdo;
- turma.

Finalidade:

Organizar e medir ações de formação quando necessário.

---

## D08 — Dados operacionais

Exemplos:

- protocolo;
- status;
- responsável;
- datas;
- eventos de moderação;
- histórico de tratamento.

Finalidade:

Permitir acompanhamento de processos internos.

---

## D09 — Dados de uso e métricas

Exemplos candidatos:

- visualização de conteúdo;
- busca;
- uso de filtros;
- cliques;
- envio de contribuição;
- jornada de navegação;
- origem de acesso.

Finalidade:

Entender uso e qualidade do produto.

Regra:

Não coletar dado simplesmente porque é possível coletá-lo.

---

## D10 — Dados comerciais futuros

Exemplos:

- produto;
- serviço;
- preço;
- estoque/disponibilidade;
- pedido;
- pagamento;
- reserva;
- comissão;
- entrega;
- cancelamento.

Status:

**FUTURO / HIPÓTESE**

Nenhum desses dados deve entrar no modelo atual apenas para “preparar o banco”.

---

## D11 — Localização do usuário

Exemplos futuros:

- posição atual;
- ponto de origem;
- proximidade;
- rota percorrida;
- última posição conhecida.

Status:

**FUTURO / ALTO RISCO**

A existência de um futuro aplicativo não justifica coleta antecipada de localização.

---

# 8. Fluxos de Dados Atuais

## F01 — Consulta de conteúdo territorial

```text
lib/data.ts
    ↓
Next.js
    ↓
Página pública
    ↓
Visitante
```

### Características

- leitura pública;
- conteúdo empacotado junto ao código;
- alterações exigem atualização/deploy;
- parte do conteúdo é explicitamente demonstrativa.

### Problema conhecido

Código e conteúdo estão parcialmente misturados.

Isso não significa que um CMS ou banco seja automaticamente a solução futura.

---

## F02 — Contribuição ao Cadastro Único

```text
Participante
    ↓
ParticiparForm
    ↓
POST /api/submissions
    ↓
validação
    ↓
protocolo CAM
    ↓
insert server-side
    ↓
Supabase submissions
```

### Dados pessoais

Sim.

### Consentimento

Exigido pelo fluxo atual antes do armazenamento.

### Destino

Análise interna.

---

## F03 — Criação de demanda sem compartilhamento

```text
Cidadão
    ↓
DemandForm
    ↓
processamento no navegador
    ↓
rascunho local
    ↓
texto / JSON / PDF
```

### Servidor

Não recebe a demanda nesta etapa.

### Risco

Persistência local no dispositivo.

---

## F04 — Envio da demanda ao Observatório

```text
Cidadão
    ↓
revisão da minuta
    ↓
consentimento
    ↓
POST /api/demands
    ↓
validação
    ↓
protocolo DEM
    ↓
Supabase demands
```

### Dados pessoais

Sim.

### Destino

Análise do Observatório.

---

# 9. Fluxos Necessários ou Candidatos

Os fluxos abaixo derivam dos requisitos da MV0, mas ainda não representam arquitetura aprovada.

---

## F05 — Conteúdo territorial validado

Fluxo conceitual:

```text
Fonte
    ↓
registro
    ↓
curadoria
    ↓
revisão
    ↓
publicação
    ↓
experiência pública
    ↓
correção / atualização quando necessário
```

### Fontes possíveis

- equipe;
- morador;
- parceiro;
- guia;
- comerciante;
- instituição;
- pesquisa documental.

### Necessidades

- fonte conhecida;
- estado editorial;
- responsável;
- data;
- possibilidade de correção.

---

## F06 — História comunitária

```text
Pessoa
    ↓
submete história / memória
    ↓
registro de autoria/origem
    ↓
consentimento quando aplicável
    ↓
curadoria
    ↓
eventual validação
    ↓
publicação
```

### Riscos

- publicação de dados de terceiros;
- direitos autorais;
- uso de imagem;
- memória contestada;
- atribuição incorreta;
- exposição de pessoas;
- conteúdo ofensivo ou ilegal;
- apagamento do contexto fornecido pela comunidade.

---

## F07 — Entrada de negócio ou prestador

```text
Ator local
    ↓
manifesta interesse
    ↓
fornece informações
    ↓
análise / validação
    ↓
participação aprovada ou recusada
    ↓
informação publicável
    ↓
atualização futura
```

### Questões abertas

- quem valida;
- quais evidências são necessárias;
- quais campos são públicos;
- quem pode alterar os dados;
- como ocorre saída do ecossistema.

---

## F08 — Rotas e experiências

```text
fontes territoriais
    ↓
pontos / atores / histórias
    ↓
composição de rota ou experiência
    ↓
revisão
    ↓
publicação
    ↓
visitante
```

### Dados relacionados

- pontos;
- coordenadas;
- sequência;
- duração;
- condições;
- acessibilidade;
- cuidados;
- atores relacionados.

### Regra

Informações de segurança ou acesso não devem ser tratadas como permanentes sem processo de revisão.

---

## F09 — Capacitação

```text
necessidade identificada
    ↓
oportunidade de formação
    ↓
divulgação
    ↓
interesse / inscrição
    ↓
participação
    ↓
eventual registro de conclusão
```

### Dados pessoais possíveis

- identidade;
- contato;
- presença;
- histórico de participação.

### Decisão pendente

Ainda não sabemos se esses dados precisam existir dentro do Caminhos ou em ferramenta externa.

---

# 10. Fluxos Futuros de Alto Impacto

## F10 — Aplicativo mobile contextual

Possível fluxo:

```text
dispositivo
    ↓
permissão do usuário
    ↓
localização
    ↓
processamento
    ↓
conteúdo contextual
    ↓
visitante
```

### Pergunta fundamental

A localização precisa sair do dispositivo?

Nem toda funcionalidade contextual exige armazenar posição no servidor.

### Diretriz inicial

Preferir o menor nível de coleta necessário para entregar a funcionalidade.

---

## F11 — Alertas contextuais

Possível fluxo:

```text
fonte confiável
    ↓
alerta
    ↓
validação
    ↓
regra de contexto
    ↓
visitante afetado
```

### Risco

Um alerta incorreto pode influenciar decisões de segurança e deslocamento.

Será necessário definir:

- origem;
- validade;
- expiração;
- responsabilidade;
- prioridade;
- alcance.

---

## F12 — Marketplace territorial

Possível fluxo futuro:

```text
ator local
    ↓
produto / serviço
    ↓
catálogo
    ↓
visitante
    ↓
pedido
    ↓
pagamento
    ↓
operação
    ↓
entrega / prestação
    ↓
pós-venda
```

### Impacto

Esse fluxo introduziria novas categorias de dados e responsabilidades:

- dados financeiros;
- endereço;
- pedido;
- preço;
- tributos;
- estorno;
- cancelamento;
- logística;
- fraude;
- suporte;
- relacionamento comercial.

### Status

**FORA DO MVP ATUAL.**

---

# 11. Matriz de Privacidade

| Dado | Pessoal? | Estado | Finalidade atual | Acesso esperado | Risco |
|---|---|---|---|---|---|
| nome de participante | sim | existente | contato/participação | operação | médio |
| telefone | sim | existente | contato | operação | médio |
| e-mail | sim | existente | contato | operação | médio |
| localidade declarada | pode ser | existente | contexto territorial | operação | baixo/médio |
| vínculo | pode ser | existente | contexto da participação | operação | baixo/médio |
| detalhes da contribuição | pode conter | existente | análise | operação | variável |
| relato de demanda | pode conter | existente | análise territorial | Observatório | alto |
| referência territorial | pode identificar terceiros | existente | contextualizar demanda | Observatório | variável |
| consentimento/data | sim, associado | existente | prova operacional | operação | baixo |
| história comunitária | pode conter | candidato | memória territorial | curadoria/público | variável |
| fotos | pode conter pessoas | candidato | conteúdo | curadoria/público | alto |
| localização do visitante | sim quando vinculável | futuro | experiência contextual | a definir | alto |
| histórico de percurso | sim quando vinculável | futuro | não definido | a definir | muito alto |
| dados de pedido | sim | futuro | transação | operação comercial | alto |
| dados de pagamento | sim | futuro | transação | provedor/operação | muito alto |

---

# 12. Princípios de Minimização

O projeto deverá aplicar, como regra de produto:

> Não coletar um dado sem conseguir explicar claramente para que ele será usado.

Antes de adicionar qualquer campo, responder:

1. Qual requisito exige este dado?
2. Qual finalidade concreta ele atende?
3. É possível cumprir a finalidade com menos informação?
4. Quem precisa acessá-lo?
5. Por quanto tempo ele precisa existir?
6. O dado será compartilhado?
7. A pessoa entende o uso?
8. Existe risco caso o dado vaze?
9. É realmente necessário persistir?
10. Pode permanecer apenas no dispositivo?

---

# 13. Pontos de Atenção LGPD e Privacidade

Este documento não substitui avaliação jurídica.

Pontos técnicos e de produto identificados:

## 13.1 Retenção

Hoje existem `created_at` e `updated_at`, mas o período de retenção das contribuições e demandas ainda precisa ser definido.

Perguntas:

- por quanto tempo uma contribuição recusada permanece?
- por quanto tempo uma demanda respondida permanece?
- quando arquivamento deve resultar em exclusão?
- existe finalidade histórica ou estatística?

---

## 13.2 Direitos do titular

Ainda é necessário definir como uma pessoa poderá:

- solicitar informação sobre seus dados;
- corrigir contato;
- pedir exclusão quando aplicável;
- retirar consentimento quando o tratamento depender dele.

---

## 13.3 Dados livres

Campos de texto livre apresentam risco maior porque usuários podem inserir:

- CPF;
- documentos;
- prontuários;
- dados de terceiros;
- acusações;
- informações sensíveis.

A interface de demanda já orienta o usuário a não informar documentos, prontuários ou dados pessoais de terceiros.

Essa prática deve ser preservada e ampliada quando necessário.

---

## 13.4 Fotografias

Fotos enviadas futuramente podem envolver:

- direito de imagem;
- menores;
- terceiros;
- localização residencial;
- metadados;
- autoria.

Nenhuma política de publicação de mídia deve ser inferida apenas do requisito de histórias.

---

## 13.5 Geolocalização

Localização deve ser tratada como dado de alto risco quando associada a um usuário.

Evitar por padrão:

- histórico contínuo sem necessidade;
- armazenamento permanente;
- compartilhamento desnecessário;
- coleta em segundo plano sem motivo claro.

---

# 14. Lacunas Atuais

## L01 — Fonte de verdade do catálogo

Hoje dados demonstrativos vivem no código.

Ainda não está decidido qual será a fonte de verdade dos conteúdos territoriais reais.

---

## L02 — Processo de validação

Existem status como:

- demonstrativo;
- em validação;
- validado;
- pending;
- reviewing;
- approved;
- rejected.

Mas esses estados pertencem a estruturas diferentes e ainda não formam um processo único de governança.

---

## L03 — Leitura operacional

As escritas no Supabase estão claras.

O fluxo completo de:

```text
registro
→ fila
→ responsável
→ análise
→ decisão
→ retorno
```

ainda precisa ser consolidado.

---

## L04 — Retenção

Não há nesta MV0 uma política consolidada de retenção para `submissions` e `demands`.

---

## L05 — Schema flexível de `details`

`submissions.details` utiliza JSONB para armazenar informações diferentes conforme o tipo de participação.

### Benefício atual

Permite variedade de formulários sem criar muitas tabelas.

### Risco futuro

Pode dificultar:

- validação consistente;
- consulta;
- relatórios;
- migração;
- rastreabilidade;
- evolução dos campos.

Não devemos concluir ainda que isso está certo ou errado.

É apenas uma característica atual a ser avaliada.

---

## L06 — Dados demonstrativos

Conteúdo fictício, aproximado ou demonstrativo pode ser confundido com informação territorial real caso a separação não seja mantida.

Antes de produção real, dados demonstrativos deverão:

- ser substituídos;
- ser claramente identificados;
- ou ser removidos.

---

## L07 — Dados do Observatório × Caminhos

O repositório possui funcionalidades ligadas tanto ao Caminhos quanto ao Observatório.

A documentação anterior defendia separações específicas entre esses produtos.

Na MV0 atual isso deve ser tratado como decisão anterior a reavaliar, especialmente quanto a:

- propriedade dos dados;
- finalidade;
- acesso;
- infraestrutura;
- compartilhamento.

---

# 15. Dados Necessários por Requisito

## Descoberta territorial

Relacionados principalmente a:

- RF-001;
- RF-002;
- RF-003;
- RF-004;
- RF-005.

Grupos de dados candidatos:

- conteúdo;
- localidade;
- ator;
- ponto territorial;
- rota;
- experiência;
- evento;
- horário;
- contato;
- acessibilidade;
- estado editorial.

---

## Histórias e memória

Relacionados principalmente a:

- RF-006;
- RF-007;
- RF-008;
- RF-009;
- RF-018.

Dados candidatos:

- história;
- autor;
- colaborador;
- fonte;
- data;
- localidade;
- mídia;
- direitos;
- estado editorial;
- responsável por revisão;
- histórico de alteração.

---

## Atores locais

Relacionados principalmente a:

- RF-010;
- RF-011;
- RF-012.

Dados candidatos:

- ator;
- tipo;
- contato;
- localidade;
- descrição;
- relação com conteúdos;
- situação de participação;
- responsável pela informação.

---

## Capacitação

Relacionados a:

- RF-013;
- RF-014;
- RF-015.

Dados candidatos futuros:

- atividade;
- tema;
- organizador;
- inscrição;
- participação;
- conclusão.

---

## Operação

Relacionados a:

- RF-016;
- RF-017;
- RF-018;
- RF-019.

Dados candidatos:

- identidade operacional;
- permissão;
- conteúdo;
- estado;
- revisão;
- responsável;
- evento de alteração;
- indicador.

---

## Mobile

Relacionados a:

- RF-021;
- RF-022;
- RF-023;
- RF-024;
- RF-025.

Dados candidatos futuros:

- ponto;
- coordenada;
- proximidade;
- preferência;
- dispositivo;
- permissão;
- alerta.

Persistência de localização do usuário não é requisito automático.

---

## Economia futura

Relacionados a:

- RF-026;
- RF-027;
- RF-028;
- RF-029;
- RF-030;
- RF-031.

Dados futuros possíveis:

- produto;
- serviço;
- preço;
- disponibilidade;
- pedido;
- pagamento;
- comissão;
- entrega;
- cancelamento.

A modelagem deve acontecer somente quando o modelo operacional e comercial estiver validado.

---

# 16. Decisões que NÃO serão tomadas nesta etapa

Este documento não decide:

- tabelas futuras;
- nomes de tabelas;
- ORM;
- SQL generator;
- linguagem de backend;
- framework de API;
- CMS;
- estrutura de serviços;
- separação física de bancos;
- autenticação;
- fornecedor de mapas;
- provedor de pagamentos;
- formato final de analytics;
- quantidade de aplicativos;
- armazenamento definitivo de mídia.

Essas decisões precisam usar este inventário como entrada.

---

# 17. Decisões que a arquitetura futura deverá responder

Quando chegarmos à avaliação arquitetural, comparar alternativas considerando pelo menos:

1. Onde ficará a fonte de verdade do conteúdo territorial?
2. Como conteúdo demonstrativo será separado do conteúdo validado?
3. Como contribuições viram conteúdo publicável?
4. Como histórias comunitárias serão moderadas?
5. Como atores locais poderão manter suas informações?
6. O Observatório e o Caminhos compartilham infraestrutura de dados?
7. Quais dados precisam de autenticação?
8. Quais ações exigem autorização?
9. Como mídias serão armazenadas?
10. Como rastrear alterações editoriais?
11. Como tratar exclusão e retenção?
12. Como gerar indicadores sem coletar PII desnecessária?
13. Como preparar o domínio para mobile sem construir mobile agora?
14. Como suportar geodados sem criar rastreamento desnecessário?
15. Como evitar que necessidades futuras de marketplace contaminem o MVP atual?

---

# 18. Fluxo Macro do Ecossistema

```text
                         ┌───────────────────┐
                         │     TERRITÓRIO    │
                         │ pessoas / lugares │
                         │ histórias / atores│
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   CONTRIBUIÇÕES   │
                         │ equipe/comunidade │
                         │ parceiros/fontes  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     CURADORIA     │
                         │ validar / corrigir│
                         │ atribuir / revisar│
                         └─────────┬─────────┘
                                   │
                     ┌─────────────┴─────────────┐
                     ▼                           ▼
           ┌──────────────────┐        ┌──────────────────┐
           │ CONTEÚDO PÚBLICO │        │ DADOS PRIVADOS   │
           │ rotas / histórias│        │ contato / demanda│
           │ atores / eventos │        │ participação     │
           └────────┬─────────┘        └────────┬─────────┘
                    │                           │
                    ▼                           ▼
           ┌──────────────────┐        ┌──────────────────┐
           │    VISITANTE     │        │    OPERAÇÃO      │
           │ descobre / usa   │        │ analisa / atende │
           └────────┬─────────┘        └────────┬─────────┘
                    │                           │
                    └─────────────┬─────────────┘
                                  ▼
                         ┌───────────────────┐
                         │ APRENDIZADO /     │
                         │ DADOS AGREGADOS   │
                         └───────────────────┘
```

---

# 19. Prioridade de Dados para Incrementos

A visão futura é ampla, mas os dados não precisam nascer todos juntos.

## Camada 1 — Essencial

- conteúdo territorial validado;
- atores;
- experiências;
- rotas;
- autoria/origem;
- status editorial;
- contribuições existentes;
- demandas existentes.

## Camada 2 — Participação estruturada

- histórias;
- memória;
- propostas;
- revisão;
- atualização por atores;
- eventos;
- capacitações.

## Camada 3 — Inteligência territorial

- eventos de uso minimizados;
- indicadores agregados;
- análises;
- relatórios.

## Camada 4 — Mobile contextual

- mapa avançado;
- geodados;
- permissões;
- informações contextuais;
- alertas.

## Camada 5 — Economia transacional

- produtos;
- serviços;
- pedidos;
- reservas;
- pagamentos;
- logística;
- monetização.

Essa ordem é conceitual e poderá mudar após Story Mapping e priorização.

---

# 20. Critérios de Conclusão da MV0-04

A primeira versão desta etapa pode ser considerada concluída quando:

- [x] fontes de dados atuais estiverem identificadas;
- [x] tabelas persistidas atuais estiverem registradas;
- [x] conteúdo estático/demonstrativo estiver identificado;
- [x] dados pessoais atuais estiverem identificados;
- [x] fluxos atuais de escrita estiverem documentados;
- [x] fluxos locais sem envio ao servidor estiverem documentados;
- [x] riscos principais de privacidade estiverem registrados;
- [x] dados futuros estiverem separados de dados atuais;
- [x] lacunas conhecidas estiverem registradas;
- [x] decisões de schema futuro não tiverem sido tomadas antecipadamente;
- [ ] inventário tiver revisão cruzada da equipe;
- [ ] política inicial de retenção tiver responsável definido;
- [ ] relação Caminhos × Observatório para dados tiver sido discutida.

---

# 21. Próximo Passo

Este documento deve alimentar principalmente:

`docs/discovery/06-CUSTOS-E-RECURSOS.md`

e:

`docs/discovery/07-ALTERNATIVAS-ARQUITETURAIS.md`

A arquitetura deverá ser escolhida depois de sabermos:

- o que precisa ser armazenado;
- o que precisa ser público;
- o que precisa ser privado;
- o que precisa ser moderado;
- o que precisa ser auditável;
- o que talvez nunca precise sair do dispositivo.

O princípio desta etapa é:

> **Primeiro entender o dado. Depois decidir onde ele mora.**
