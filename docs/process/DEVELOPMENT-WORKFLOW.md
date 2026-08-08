# Guia de Trabalho — Caminhos de Mambucaba

> **Status:** versão inicial para alinhamento da equipe
> **Aplicação inicial:** MV0 — Descoberta, Requisitos e Alinhamento
> **Ciclo de trabalho:** 1 semana

---

## 1. Por que este processo existe

Este documento define como vamos trabalhar juntos na evolução do Caminhos de Mambucaba.

Ele não existe para impor Scrum, Agile, uma arquitetura específica ou uma ferramenta.

O objetivo é criar um processo mínimo que permita:

* dividir responsabilidades;
* reduzir retrabalho;
* discutir decisões técnicas com contexto;
* saber o que está sendo feito e por quê;
* preservar autonomia de desenvolvimento;
* registrar decisões importantes;
* evoluir o produto existente sem recomeçar cegamente.

O processo deve ajudar o desenvolvimento.

Se alguma prática gerar mais burocracia do que valor, ela poderá ser revista pela equipe.

---

# 2. Princípio central

> **Problema antes da solução. Requisito antes da implementação. Evidência antes da decisão.**

O projeto já possui código, banco, infraestrutura, documentação e decisões anteriores.

Tudo isso será tratado como **estado atual do sistema**, e não automaticamente como arquitetura definitiva.

Nenhuma tecnologia será considerada obrigatória apenas porque:

* já está no código;
* foi documentada anteriormente;
* foi sugerida por uma IA;
* um integrante da equipe prefere utilizá-la.

Da mesma forma, nenhuma alternativa será descartada automaticamente por sua origem.

O critério será:

> **Essa solução atende bem aos requisitos, restrições e contexto do produto?**

---

# 3. O projeto não está começando do zero

O Caminhos já possui uma aplicação em produção.

Por isso, a MV0 não representa um novo projeto.

Ela representa uma nova fase de engenharia.

Nosso trabalho inicial será compreender:

```text
O que existe
      ↓
Por que existe
      ↓
O que precisa permanecer
      ↓
O que precisa mudar
      ↓
O que ainda não sabemos
      ↓
Quais alternativas temos
      ↓
O que vamos construir
```

Código existente é uma fonte importante de informação.

Mas:

> **código existente descreve o sistema atual, não necessariamente o sistema ideal.**

---

# 4. Como serão tomadas decisões técnicas

Decisões técnicas relevantes serão tomadas pela equipe com base em critérios explícitos.

Antes de escolher uma solução, buscamos responder:

1. Qual problema estamos tentando resolver?
2. Qual necessidade de usuário ou negócio está relacionada?
3. Quais requisitos precisam ser atendidos?
4. Quais restrições existem?
5. Quais alternativas são viáveis?
6. Quais são os benefícios de cada alternativa?
7. Quais são seus custos e limitações?
8. Qual é o impacto de implementação e manutenção?
9. Quais riscos estamos aceitando?
10. A decisão é facilmente reversível?

Exemplos de decisões que merecem discussão:

* linguagem de backend;
* framework;
* arquitetura;
* banco de dados;
* estratégia de persistência;
* autenticação;
* serviços externos;
* contratos entre aplicações;
* mudanças importantes no modelo de dados;
* infraestrutura;
* dependências que aumentem custo ou lock-in.

---

# 5. ADR — Architecture Decision Record

Decisões arquiteturais importantes serão registradas.

Os documentos ficarão preferencialmente em:

```text
docs/adr/
```

Um ADR deve responder de forma curta:

```text
Contexto
Problema
Alternativas consideradas
Critérios utilizados
Decisão
Consequências
Responsáveis
Data
```

Enquanto uma decisão estiver sendo discutida:

```text
Status: Proposed
```

Depois de acordada:

```text
Status: Accepted
```

Também podemos utilizar:

```text
Status: Rejected
Status: Superseded
Status: Deprecated
```

Isso permite mudar de opinião no futuro sem apagar a história do projeto.

---

# 6. Papel da Inteligência Artificial

IA é uma ferramenta de engenharia.

Ela não é membro da direção técnica e não possui poder de decisão.

Pode ser utilizada para:

* pesquisa;
* consulta de documentação;
* comparação de tecnologias;
* brainstorming;
* revisão de código;
* levantamento de riscos;
* debugging;
* geração de testes;
* provas de conceito;
* rascunhos de documentação;
* análise inicial de custos;
* identificação de alternativas;
* automação de trabalho repetitivo.

Uma resposta de IA pode iniciar uma investigação.

Ela não encerra uma decisão.

A regra será:

> **IA propõe. Evidências sustentam. A equipe decide.**

O mesmo princípio vale para opiniões humanas.

> “Eu gosto mais dessa tecnologia”

também não é evidência suficiente para uma decisão arquitetural.

---

# 7. Nosso modelo de trabalho

Não adotaremos Scrum de maneira rígida.

Usaremos um **ciclo semanal de desenvolvimento** com algumas práticas de métodos ágeis apenas quando elas ajudarem.

Cada ciclo terá duração de:

> **1 semana**

A estrutura básica será:

```text
Milestone
└── Epic da semana
    ├── User Story
    ├── Task
    ├── Task
    ├── Research
    └── Decision / ADR
```

---

# 8. Milestone

A Milestone representa uma etapa ou objetivo temporal do projeto.

Exemplo:

```text
MV0 — Descoberta, Requisitos e Alinhamento
```

Ela responde:

> **Qual resultado queremos alcançar nesta etapa?**

Não precisa significar necessariamente entrega de código.

Uma Milestone pode existir para:

* pesquisa;
* discovery;
* arquitetura;
* implementação;
* validação;
* estabilização.

---

# 9. Epic

A Epic representa o grande objetivo da semana.

Exemplo:

```text
[EPIC][MV0]
Descoberta, requisitos e alinhamento técnico
```

Ela organiza trabalhos menores necessários para alcançar um resultado comum.

Não queremos dezenas de Epics abertas simultaneamente.

Inicialmente:

> **uma Epic principal por semana.**

---

# 10. User Story

Uma User Story representa uma necessidade real de usuário ou stakeholder.

Formato preferencial:

> Como **[perfil]**, quero **[capacidade]**, para **[resultado]**.

Exemplo:

> Como visitante, quero encontrar experiências disponíveis no território para decidir o que conhecer durante minha viagem.

Uma User Story não deve ser usada para esconder uma decisão técnica.

Evitar:

> Como desenvolvedor, quero utilizar Go com Chi para desenvolver uma API.

Isso descreve implementação, não necessidade de usuário.

A escolha entre Go, Node, Next.js ou outra abordagem acontece posteriormente.

---

# 11. Task

Task representa trabalho necessário.

Pode ser:

* implementação;
* pesquisa;
* documentação;
* análise;
* teste;
* infraestrutura;
* levantamento;
* refatoração;
* prova de conceito.

Nem toda Task precisa gerar código.

Durante a MV0, boa parte das Tasks produzirá conhecimento necessário para que o código seguinte seja melhor.

---

# 12. Ciclo semanal

## Início da semana

Fazemos um planejamento curto.

Definimos:

* objetivo da semana;
* Epic;
* entregas;
* responsáveis;
* dependências;
* dúvidas importantes;
* critérios de aceite.

Não tentamos prever cada linha de código.

Queremos responder:

> **O que precisa estar diferente no final desta semana?**

---

## Durante a semana

Cada integrante trabalha nas issues assumidas.

Não haverá reunião diária obrigatória.

Quando necessário, podemos utilizar atualização assíncrona:

```text
Feito:
- ...

Próximo:
- ...

Bloqueio:
- nenhum
```

ou:

```text
Bloqueio:
- precisamos decidir X antes de continuar.
```

O objetivo é comunicação, não prestação de contas burocrática.

---

# 13. Mudanças durante a semana

Descoberta faz parte do trabalho.

Se durante a implementação descobrirmos que:

* o requisito estava incorreto;
* existe uma restrição desconhecida;
* uma alternativa é inviável;
* uma estimativa mudou;
* outra solução é claramente melhor;

o backlog pode ser ajustado.

Planejamento não é contrato imutável.

É uma hipótese operacional.

---

# 14. Pull Requests

Mudanças relevantes de código devem preferencialmente passar por Pull Request.

O PR deve permitir que outra pessoa entenda:

* o que mudou;
* por que mudou;
* qual problema resolve;
* qual issue está relacionada;
* como validar;
* quais riscos existem.

Não precisamos transformar uma alteração pequena em uma cerimônia.

Mas mudanças relacionadas a:

* comportamento;
* banco;
* arquitetura;
* segurança;
* APIs;
* infraestrutura;
* regras de negócio;

devem ser revisáveis.

---

# 15. Revisão de código

Revisão não existe para provar quem programa melhor.

Ela existe para encontrar:

* erros;
* riscos;
* inconsistências;
* complexidade desnecessária;
* problemas de segurança;
* divergência com requisitos;
* oportunidades de simplificação.

O autor continua responsável por entender o código que está entregando, independentemente de ter utilizado IA ou outra ferramenta para auxiliá-lo.

---

# 16. Review semanal

No final da semana verificamos o que realmente aconteceu.

Perguntas:

* O objetivo foi atingido?
* O que conseguimos demonstrar?
* O que documentamos?
* O que ficou incompleto?
* O que aprendemos?
* Alguma hipótese caiu?
* Alguma decisão mudou?
* O que pode avançar para a próxima semana?

A Review avalia:

> **resultado**

e não:

> quantidade de commits.

---

# 17. Retrospectiva

A retrospectiva será curta.

Respondemos apenas:

### Manter

O que funcionou e deve continuar?

### Parar

O que gerou desperdício ou atrapalhou?

### Experimentar

O que vale testar na próxima semana?

Se uma prática não funcionar, mudamos.

O processo também está sujeito a melhoria contínua.

---

# 18. Definition of Ready

Uma tarefa de implementação está pronta quando existe informação suficiente para começar sem inventar regras importantes.

Idealmente conhecemos:

* problema;
* resultado esperado;
* critérios de aceite;
* dependências relevantes;
* restrições conhecidas;
* dúvidas bloqueadoras.

Isso não significa que a issue precisa prever tudo.

Significa apenas que:

> não devemos começar a implementar enquanto ainda estamos tentando descobrir o que deveria ser construído.

---

# 19. Definition of Done

Uma entrega não termina apenas quando o código compila.

Quando aplicável, esperamos:

* critérios de aceite atendidos;
* implementação funcionando;
* testes proporcionais ao risco;
* revisão;
* documentação relevante atualizada;
* ausência de regressão conhecida;
* ADR quando uma decisão importante foi tomada;
* resultado demonstrável.

O DoD depende da natureza da Task.

Uma pesquisa não precisa de testes automatizados.

Mas precisa produzir uma conclusão ou evidência verificável.

---

# 20. A primeira etapa: MV0

Nossa primeira semana será:

> **MV0 — Descoberta, Requisitos e Alinhamento**

O objetivo não é construir imediatamente um novo backend.

O objetivo é descobrir informação suficiente para decidir corretamente o que construiremos depois.

---

# 21. O que será levantado na MV0

Vamos trabalhar em pelo menos oito frentes.

## Estado atual

Entender:

* estrutura da aplicação;
* funcionalidades;
* rotas;
* banco;
* integrações;
* deploy;
* infraestrutura;
* fluxos existentes;
* dívida técnica conhecida.

---

## Stakeholders e personas

Identificar quem interage ou será impactado pelo sistema.

Possíveis grupos:

* turistas;
* moradores;
* comerciantes;
* hospedagens;
* guias;
* iniciativas locais;
* ICPT;
* Observatório;
* operação turística;
* parceiros;
* administração.

Personas inicialmente poderão ser hipóteses.

Quando forem hipóteses, devem ser identificadas como tal.

---

## Jornadas

Entender o caminho dos usuários.

Por exemplo:

```text
Descobrir território
      ↓
Explorar opções
      ↓
Comparar
      ↓
Demonstrar interesse
      ↓
Planejar
      ↓
Receber atendimento
```

A jornada vem antes da tela ou endpoint.

---

## Requisitos funcionais

Descrever **o que o sistema precisa fazer**.

Exemplo:

```text
RF-001

O sistema deve permitir consultar experiências
publicadas por categoria.
```

Não:

```text
RF-001

Criar endpoint GET em Go usando Chi.
```

O segundo texto já determina implementação.

---

## Requisitos não funcionais

Avaliaremos questões como:

* segurança;
* privacidade;
* LGPD;
* acessibilidade;
* desempenho;
* disponibilidade;
* SEO;
* observabilidade;
* manutenção;
* escalabilidade;
* portabilidade;
* custo operacional.

---

## Dados

Precisamos entender:

* quais dados existem;
* onde estão;
* de onde vêm;
* quem acessa;
* quem altera;
* finalidade;
* dados pessoais;
* retenção;
* integrações;
* riscos.

Só depois faz sentido discutir seriamente um novo schema.

---

## Custos e recursos

Também fazem parte da arquitetura.

Vamos levantar:

* hospedagem;
* banco;
* armazenamento;
* domínio;
* e-mail;
* observabilidade;
* mapas;
* APIs externas;
* CI/CD;
* backups;
* ambientes;
* recursos humanos.

Para cada alternativa importante analisaremos:

* custo inicial;
* custo mensal;
* limites;
* plano gratuito;
* escalabilidade;
* lock-in.

---

## Alternativas arquiteturais

Depois de conhecer requisitos e restrições poderemos comparar opções.

Exemplo:

```text
Alternativa A
Next.js full-stack

Alternativa B
Next.js + backend separado

Alternativa C
Arquitetura híbrida incremental
```

Se backend separado fizer sentido, então discutimos:

```text
Go
Node.js
outra alternativa relevante
```

Cada opção deve apresentar:

* vantagens;
* desvantagens;
* custo;
* complexidade;
* experiência da equipe;
* risco;
* manutenção;
* impacto de migração.

Nenhuma começa como vencedora.

---

# 22. Divisão de responsabilidades

Produto e tecnologia possuem responsabilidades diferentes.

## Produto / negócio

Responsável principalmente por:

* problema;
* usuários;
* stakeholders;
* objetivos;
* prioridade;
* regras de negócio;
* critérios de valor;
* restrições financeiras;
* contexto institucional.

---

## Tecnologia

Responsável principalmente por:

* alternativas técnicas;
* riscos;
* arquitetura;
* qualidade;
* segurança;
* manutenção;
* desempenho;
* dependências;
* estimativas técnicas.

---

## Decisões compartilhadas

Algumas decisões pertencem à interseção:

```text
custo × complexidade
prazo × qualidade
risco × velocidade
build × buy
dívida técnica × entrega
```

Nesses casos a decisão é conjunta.

---

# 23. Como resolver divergências

Discordâncias são normais.

O problema não é discordar.

O problema é não possuir um mecanismo para chegar a uma conclusão.

Usaremos:

```text
Problema
   ↓
Alternativas
   ↓
Critérios
   ↓
Evidências
   ↓
Trade-offs
   ↓
Decisão
```

Se ainda não houver evidência suficiente, temos duas opções:

### Pesquisar

Buscar documentação, benchmarks, custos ou experiências relevantes.

### Experimentar

Criar uma pequena prova de conceito.

Uma PoC deve responder uma pergunta.

Não deve virar produção escondida.

---

# 24. Também podemos não decidir

Existe uma conclusão perfeitamente válida:

> **Ainda não temos evidência suficiente para decidir.**

Nem toda decisão precisa acontecer imediatamente.

Principalmente quando é:

* difícil de avaliar;
* cara de reverter;
* dependente de requisitos ainda desconhecidos.

---

# 25. O que queremos evitar

Este processo existe principalmente para evitar:

* começar implementação sem entender requisito;
* tecnologia virar requisito;
* arquitetura definida por preferência;
* IA tratada como autoridade;
* opinião humana tratada como autoridade;
* documentação que ninguém consulta;
* reuniões sem objetivo;
* backlog tentando prever meses de trabalho;
* decisões importantes perdidas em conversa;
* reescrita apenas porque outra tecnologia parece mais interessante;
* continuar algo apenas porque já investimos tempo;
* excesso de processo impedindo desenvolvimento.

---

# 26. O que esperamos ao final da MV0

Ao final da primeira semana queremos conseguir responder:

1. Quem utiliza ou utilizará o Caminhos?
2. Quais problemas estamos resolvendo?
3. Quais jornadas são prioritárias?
4. Quais funcionalidades são realmente necessárias?
5. Quais requisitos de qualidade existem?
6. Quais dados o produto necessita?
7. Quais restrições existem?
8. Quais recursos serão necessários?
9. Quanto custa operar as principais alternativas?
10. Quais opções arquiteturais são viáveis?
11. Quais decisões já podem ser tomadas?
12. Quais decisões ainda precisam de pesquisa?
13. Qual será o menor incremento de valor da MV1?

Só então transformaremos as conclusões em backlog executável de implementação.

---

# 27. Regra final

Este documento também não é definitivo.

Ele é nossa primeira versão de um acordo de trabalho.

Pode ser alterado conforme aprendermos a colaborar melhor.

O que deve permanecer é o princípio:

> **Construir software com clareza de problema, autonomia técnica, responsabilidade compartilhada, decisões justificáveis e entregas verificáveis.**
