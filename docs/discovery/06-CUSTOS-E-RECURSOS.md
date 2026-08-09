# Custos e Recursos — Caminhos de Mambucaba

> **Status:** Provisório  
> **Fase:** MV0 — Descoberta, Requisitos e Alinhamento  
> **Documento:** `docs/discovery/06-CUSTOS-E-RECURSOS.md`  
> **Issue relacionada:** MV0-05 — Levantar recursos, infraestrutura e custos  
> **Data de referência:** 08/08/2026  
> **Regra:** preços, cotas e políticas de fornecedores devem ser revalidados antes de qualquer decisão de contratação.

---

## 1. Objetivo

Este documento identifica os recursos necessários para desenvolver, operar e evoluir o ecossistema Caminhos de Mambucaba, separando:

- recursos já utilizados;
- custos atuais conhecidos;
- custos ainda não confirmados;
- limites de planos gratuitos;
- riscos de crescimento;
- dependências de fornecedores;
- recursos humanos necessários;
- recursos futuros que não devem ser contratados ou implementados antecipadamente.

O objetivo não é escolher uma arquitetura.

O objetivo é fornecer dados de custo, capacidade e operação para que a etapa de alternativas arquiteturais possa comparar opções de forma racional.

---

## 2. Princípios de custo

O projeto adotará inicialmente os seguintes princípios:

1. **Não contratar infraestrutura antes de existir necessidade real.**
2. **Não tratar plano gratuito como infraestrutura infinita.**
3. **Não otimizar prematuramente para escala hipotética.**
4. **Considerar custo humano junto com custo financeiro.**
5. **Considerar custo de migração e lock-in.**
6. **Revalidar preços e políticas antes de contratar.**
7. **Separar custo de protótipo, custo de produção e custo de crescimento.**
8. **Evitar dependências pagas apenas para “preparar o futuro”.**
9. **Manter uma rota de saída razoável para serviços críticos.**
10. **Uma solução barata financeiramente pode ser cara operacionalmente.**

---

# 3. Inventário Atual

| Recurso | Uso atual | Finalidade | Custo atual conhecido | Criticidade |
|---|---|---|---|---|
| GitHub | Sim | código, versionamento e colaboração | R$ 0 identificado para o repositório público | Alta |
| Vercel | Sim | deploy do Next.js, CDN e runtime | Plano atual exato a confirmar no painel | Alta |
| Supabase PostgreSQL | Sim | persistência de `submissions` e `demands` | Plano atual exato a confirmar no painel | Alta |
| Domínio `caminhosdemambucaba.live` | Sim | endereço público | custo já contratado; valor de renovação a confirmar | Alta |
| DNS | Sim | resolução do domínio | vinculado ao serviço atual; custo adicional não identificado | Alta |
| Leaflet | Sim | biblioteca de mapa | sem custo de licença identificado | Média |
| OpenStreetMap Standard Tiles | Sim | tiles do mapa atual | sem cobrança direta, mas com política de uso e sem SLA | Média/Alta |
| Vercel Web Analytics | Dependência instalada | métricas web | depende do plano e uso | Média |
| Arquivos estáticos em `public/` | Sim | imagens e assets | incluído no deploy atual | Média |
| Supabase Storage | Não confirmado como fluxo ativo atual | mídia futura | não considerar como custo ativo até confirmação | Futuro |
| Backend Go separado | Não implementado como infraestrutura atual | hipótese arquitetural anterior | R$ 0 atual | Futuro/Decisão |
| Aplicativo mobile | Não existe | visão futura | R$ 0 atual | Futuro |
| E-mail transacional | Não identificado como ativo | comunicações futuras | R$ 0 atual | Futuro |

---

# 4. Vercel

## 4.1 Estado atual

O repositório utiliza Next.js e está configurado para deploy na Vercel.

A documentação atual do projeto registra que pushes na branch `main` geram deploy de produção através da integração GitHub–Vercel.

### O que precisamos confirmar no painel

- plano atual;
- proprietário do projeto;
- uso dos últimos 30 dias;
- Edge Requests;
- Fast Data Transfer;
- Fast Origin Transfer;
- invocações de Functions;
- CPU;
- memória provisionada;
- Web Analytics;
- Image Optimization;
- número de membros com necessidade real de deploy.

---

## 4.2 Vercel Hobby

### Preço de referência

**US$ 0/mês**

### Alguns limites oficiais de referência

Na data deste documento, a documentação oficial indica para Hobby:

- 1 milhão de Edge Requests/mês;
- 100 GB/mês de Fast Data Transfer;
- 10 GB/mês de Fast Origin Transfer;
- 1 milhão de invocações de Functions;
- 4 horas de Active CPU;
- 360 GB-horas de memória provisionada;
- 50 mil eventos/mês de Web Analytics;
- 1 desenvolvedor;
- até 100 deployments criados por dia.

### Restrição crítica

O plano Hobby é destinado a **uso pessoal e não comercial**.

A política oficial da Vercel considera comercial o uso de deployments voltados a ganho financeiro, incluindo exemplos como:

- venda de produtos ou serviços;
- processamento ou solicitação de pagamentos;
- trabalho pago de desenvolvimento ou hospedagem;
- publicidade;
- outros usos com finalidade de ganho financeiro.

### Consequência para o Caminhos

Enquanto o projeto operar apenas como iniciativa não comercial, o Hobby pode ser suficiente tecnicamente dentro dos limites.

Quando o Caminhos passar a:

- vender serviços;
- vender experiências;
- operar comercialmente;
- publicar ofertas com finalidade comercial própria;
- ou funcionar como infraestrutura de atividade econômica do operador,

o uso do Hobby deverá ser reavaliado imediatamente.

**Não devemos planejar a operação comercial permanente sobre o Hobby.**

---

## 4.3 Vercel Pro

### Preço de referência

**US$ 20/mês**

A página oficial informa:

- US$ 20/mês;
- US$ 20 de crédito de uso incluído;
- colaboração de equipe;
- viewers gratuitos;
- recursos adicionais de build, observabilidade e controle de gastos.

### Quando considerar

- início de uso comercial;
- colaboração de múltiplos desenvolvedores no deploy;
- necessidade de maior capacidade;
- necessidade de controles de custo;
- necessidade de recursos profissionais da plataforma.

### Risco

A Vercel possui cobrança baseada em uso em diferentes recursos.

O custo não deve ser interpretado como “US$ 20 e nunca mais”.

Monitorar principalmente:

- transferência;
- funções;
- imagens;
- analytics;
- builds;
- observabilidade;
- armazenamento, caso utilizado.

---

# 5. Supabase

## 5.1 Estado atual

O projeto possui persistência real de:

- `submissions`;
- `demands`.

A escrita utiliza a API REST do Supabase através de código server-side.

A migration atual habilita RLS e remove acesso direto das tabelas para papéis públicos.

---

## 5.2 Supabase Free

### Preço

**US$ 0/mês**

### Limites oficiais de referência

Na data deste documento, o plano Free informa:

- 500 MB de banco por projeto;
- 1 GB de armazenamento de arquivos;
- 5 GB de egress;
- 5 GB de cached egress;
- 50 mil usuários ativos mensais;
- até 2 projetos ativos;
- API requests ilimitados;
- pausa de projeto após 1 semana de inatividade.

### Backups

O plano Free não inclui backups automáticos equivalentes aos disponíveis no Pro.

### Risco para produção

O limite de espaço provavelmente não será o primeiro problema do Caminhos.

Os riscos mais relevantes são:

- pausa por inatividade;
- ausência de backup automático;
- crescimento de mídia;
- crescimento de egress;
- dependência operacional de um único projeto;
- necessidade futura de recuperação de dados.

---

## 5.3 Supabase Pro

### Preço de referência

**A partir de US$ 25/mês**

### Recursos oficiais de referência

Na data deste documento, o Pro inclui aproximadamente:

- 8 GB de disk size por projeto antes de excedentes;
- 100 GB de file storage;
- 250 GB de egress;
- 250 GB de cached egress;
- 100 mil MAU incluídos;
- backups diários armazenados por 7 dias;
- projeto sem pausa por inatividade.

Excedentes podem gerar cobranças adicionais.

### Quando considerar

- produção com dados que não podem depender de um projeto gratuito pausável;
- necessidade real de backup;
- crescimento relevante de banco;
- uso de mídia;
- aumento de tráfego;
- maior exigência operacional.

---

# 6. GitHub

## 6.1 Estado atual

O repositório é público.

### Custo atual de referência

**R$ 0 identificado para hospedagem do código e uso padrão do repositório público.**

### GitHub Actions

A documentação oficial informa que runners padrão hospedados pelo GitHub são gratuitos para repositórios públicos.

### Consequência

CI simples com:

- lint;
- testes;
- build;
- verificações de PR,

pode ser adotado sem assumir custo mensal direto de minutos de Actions enquanto o repositório permanecer público e utilizar runners padrão.

### Riscos futuros

- tornar o repositório privado;
- usar runners maiores;
- armazenar muitos artifacts;
- utilizar serviços adicionais pagos.

---

# 7. Domínio e DNS

## 7.1 Domínio atual

`caminhosdemambucaba.live`

### Estado

Ativo.

### Custo

O valor pago e o valor de renovação devem ser confirmados no painel ou recibo do registrador.

Não vamos usar preço promocional de aquisição como estimativa de renovação.

### Registrar no controle financeiro

- registrador;
- data de contratação;
- data de renovação;
- valor pago;
- valor previsto de renovação;
- método de pagamento;
- responsável;
- acesso de recuperação da conta.

### Risco

Domínio é um recurso pequeno financeiramente, mas crítico operacionalmente.

Perder acesso ou esquecer renovação pode derrubar todo o ecossistema público.

---

# 8. Mapas

## 8.1 Biblioteca

O projeto utiliza:

- Leaflet;
- React Leaflet.

A biblioteca em si não representa atualmente custo de infraestrutura identificado.

---

## 8.2 Tiles atuais

O componente de mapa usa diretamente o servidor padrão de tiles do OpenStreetMap.

### Situação

O OpenStreetMap disponibiliza os dados de forma aberta, mas seus servidores públicos de tiles possuem capacidade limitada.

A política oficial deixa claro que:

- não existe SLA;
- o acesso pode ser bloqueado em caso de uso inadequado ou pesado;
- bulk download é proibido;
- prefetch de grandes áreas é proibido;
- offline usando o servidor padrão é proibido;
- atribuição é obrigatória;
- cache deve respeitar as regras da política.

### Consequência para o Caminhos

O uso atual pode servir para uma experiência web inicial modesta.

Ele **não deve ser considerado infraestrutura garantida para escala, operação comercial crítica ou mapas offline do futuro aplicativo mobile**.

### Futuro

Antes de:

- crescer significativamente o tráfego;
- lançar mobile;
- oferecer uso offline;
- pré-carregar mapas;
- depender do mapa para segurança ou navegação,

deverá ser avaliado:

1. provedor de tiles;
2. serviço de mapas comercial;
3. tiles vetoriais;
4. infraestrutura própria;
5. cache permitido pelo fornecedor.

### Custo

**A definir quando houver necessidade.**

Não selecionar fornecedor apenas pelo preço por mil requisições sem avaliar:

- licença;
- cobertura;
- offline;
- geocoding;
- limite de uso;
- SLA;
- privacidade;
- lock-in.

---

# 9. Analytics e Observabilidade

## 9.1 Analytics

O projeto possui dependência do Vercel Analytics.

No Hobby, a referência atual da Vercel inclui 50 mil eventos mensais de Web Analytics.

### Necessidade

Antes de adicionar outra ferramenta, verificar se as métricas necessárias para a próxima fase podem ser atendidas pela solução já instalada.

### Princípio

Não instalar múltiplas ferramentas de analytics para medir as mesmas coisas.

---

## 9.2 Logs

Logs são necessários para:

- erros;
- falhas em formulários;
- falhas de integração;
- debugging;
- segurança.

### Cuidado

Não registrar em logs:

- telefone completo;
- e-mail completo;
- relato integral de demanda;
- localização precisa de usuário;
- tokens;
- chaves;
- credenciais.

---

## 9.3 Observabilidade futura

A necessidade de ferramenta externa deve surgir de um problema concreto.

Possíveis necessidades futuras:

- error tracking;
- tracing;
- métricas;
- uptime;
- alertas.

### Custo

**Não definido.**

Não contratar durante a MV0.

---

# 10. Storage e Mídia

## 10.1 Estado atual

O projeto utiliza arquivos estáticos no repositório para parte das imagens da experiência atual.

Não foi confirmado neste levantamento um fluxo completo de upload público de mídia persistido no Supabase Storage.

---

## 10.2 Demanda futura

Histórias, negócios, experiências e conteúdos comunitários podem exigir:

- fotografias;
- documentos;
- thumbnails;
- imagens de capa;
- eventualmente áudio ou vídeo.

### Possível recurso atual

Supabase Free inclui referência de:

**1 GB de file storage**

Supabase Pro:

**100 GB incluídos**, com cobrança posterior por excedente.

### Regra

Antes de liberar upload:

- definir tamanho máximo;
- formato permitido;
- compressão;
- política de mídia;
- retenção;
- direito de uso;
- moderação;
- necessidade de metadados.

Vídeo não deve ser armazenado diretamente na infraestrutura principal sem estudo específico de custo.

---

# 11. E-mail e Comunicação

## 11.1 Estado atual

Não foi identificado um serviço de e-mail transacional como dependência central do fluxo atual.

### Necessidades futuras possíveis

- confirmação de cadastro;
- retorno ao participante;
- notificação de análise;
- convite;
- recuperação de acesso;
- comunicação com parceiros.

### Decisão

Fornecedor ainda não deve ser escolhido.

### Avaliar posteriormente

- volume;
- entregabilidade;
- domínio;
- SPF/DKIM/DMARC;
- templates;
- logs;
- privacidade;
- preço;
- limites gratuitos;
- integração.

---

# 12. Backups

## 12.1 Situação atual

O banco possui dados reais de participação e demandas.

### Problema

O plano gratuito do Supabase não inclui a mesma política de backups automáticos do plano Pro.

### Necessidade

Antes de considerar os dados críticos para operação, definir:

- política de backup;
- frequência;
- responsabilidade;
- restauração;
- teste de restauração;
- retenção;
- proteção do arquivo de backup.

### Importante

“Tem backup” não é suficiente.

É necessário saber:

> conseguimos restaurar?

---

# 13. Recursos Humanos

Infraestrutura não é o único custo.

O Caminhos exige trabalho humano contínuo.

## 13.1 Produto

Responsabilidades:

- priorização;
- requisitos;
- validação;
- relacionamento com stakeholders;
- acompanhamento de resultados.

---

## 13.2 Desenvolvimento

Responsabilidades:

- frontend;
- backend;
- banco;
- testes;
- deploy;
- manutenção;
- segurança;
- observabilidade.

---

## 13.3 Conteúdo e curadoria

Responsabilidades:

- verificar informações;
- revisar histórias;
- atualizar rotas;
- corrigir dados;
- validar fontes;
- preparar conteúdo editorial.

### Risco

Conforme a plataforma crescer, **curadoria pode custar mais horas do que desenvolvimento**.

---

## 13.4 Operação

Responsabilidades futuras possíveis:

- responder cadastros;
- aprovar participantes;
- atualizar status;
- atender visitantes;
- organizar solicitações;
- lidar com incidentes.

---

## 13.5 Capacitação

Se o ecossistema oferecer formação, serão necessários:

- instrutores ou parceiros;
- organização;
- agenda;
- materiais;
- acompanhamento;
- eventualmente certificação.

---

## 13.6 Suporte

Comercialização futura introduz:

- suporte ao cliente;
- suporte ao comerciante;
- cancelamentos;
- problemas de pedido;
- pagamentos;
- disputas.

Esse custo humano deve entrar no cálculo antes de criar marketplace ou pedidos.

---

# 14. Recursos Futuros por Horizonte

## Horizonte A — Web territorial

Recursos principais:

- GitHub;
- Vercel;
- Supabase;
- domínio;
- mapas;
- conteúdo;
- curadoria;
- analytics básico.

Objetivo:

Operar a experiência pública inicial com custo baixo.

---

## Horizonte B — Participação estruturada

Possíveis recursos adicionais:

- storage de mídia;
- e-mail;
- painel operacional;
- autenticação;
- moderação;
- backup mais robusto;
- monitoramento.

---

## Horizonte C — Mobile

Possíveis novos custos:

- desenvolvimento mobile;
- publicação em lojas;
- manutenção por sistema operacional;
- mapas adequados a mobile;
- notificações;
- distribuição;
- testes em dispositivos;
- suporte;
- eventual geolocalização em background.

### Regra

Custos de mobile só devem ser detalhados quando a hipótese de aplicativo dedicado for priorizada.

---

## Horizonte D — Marketplace / Pedidos

Possíveis recursos:

- pagamento;
- conciliação;
- antifraude;
- catálogo transacional;
- pedidos;
- notificações;
- suporte;
- estorno;
- logística;
- emissão fiscal quando aplicável;
- atendimento.

### Regra

Não preparar infraestrutura transacional agora.

---

# 15. Cenários de Custo

Os cenários abaixo são referências para discussão, não orçamento final.

## Cenário 0 — Discovery / protótipo não comercial

Possível composição:

- GitHub público;
- Vercel Hobby;
- Supabase Free;
- OSM Standard Tiles em uso moderado;
- domínio já contratado;
- conteúdo estático;
- sem storage pesado;
- sem serviço adicional de e-mail.

### Infraestrutura mensal

Pode permanecer próxima de:

**US$ 0/mês + custo periódico do domínio**

desde que:

- o uso permaneça dentro das cotas;
- o projeto permaneça compatível com as políticas de uso;
- a operação ainda não seja comercial;
- riscos de backup/pausa do Supabase Free sejam aceitos.

---

## Cenário 1 — Produção comercial mínima

Quando houver uso comercial real, o Vercel Hobby deixa de ser apropriado segundo a política atual da Vercel.

Uma composição possível:

- Vercel Pro: US$ 20/mês;
- Supabase Free enquanto tecnicamente suficiente;
- domínio;
- mapas ainda sob revisão;
- sem serviços extras.

### Observação

Esse cenário reduz o problema de licenciamento comercial da Vercel, mas ainda mantém limitações operacionais do Supabase Free.

---

## Cenário 2 — Produção com banco mais robusto

Uma composição possível:

- Vercel Pro: US$ 20/mês;
- Supabase Pro: a partir de US$ 25/mês;
- domínio;
- demais serviços somente quando necessários.

### Base de referência

**aproximadamente US$ 45/mês antes de excedentes e serviços adicionais.**

Esse valor não inclui:

- conversão cambial;
- impostos;
- domínio;
- e-mail;
- provedor de mapas;
- backend separado;
- observabilidade externa;
- mobile;
- marketplace.

---

## Cenário 3 — Backend separado

Caso a arquitetura futura escolha um serviço backend separado:

```text
Web
+
Backend
+
Banco
```

haverá um novo custo potencial de:

- compute;
- deploy;
- logs;
- rede;
- observabilidade;
- operação.

### Valor

**Não definido nesta etapa.**

Primeiro comparar se o backend separado resolve problemas suficientes para justificar seu custo técnico e financeiro.

---

## Cenário 4 — Ecossistema mobile e transacional

Esse cenário poderá adicionar:

- infraestrutura mobile;
- mapas profissionais;
- notificações;
- storage;
- mídia;
- transações;
- pagamentos;
- suporte;
- monitoramento;
- maior observabilidade.

### Valor

**Não estimar agora.**

A incerteza é grande demais para que um número atual seja útil.

---

# 16. Gatilhos de Upgrade

## Vercel Hobby → Pro

Reavaliar quando ocorrer qualquer um:

- uso comercial;
- necessidade de colaboração de deploy;
- proximidade dos limites;
- maior necessidade de observabilidade;
- maior criticidade de produção.

---

## Supabase Free → Pro

Reavaliar quando ocorrer:

- dados críticos que exigem backup automático;
- risco inaceitável de pausa;
- proximidade dos limites;
- maior uso de storage;
- crescimento de egress;
- operação dependente de disponibilidade contínua.

---

## Tiles públicos → provedor adequado

Reavaliar quando ocorrer:

- aumento relevante de tráfego;
- uso comercial crítico;
- necessidade de SLA;
- offline;
- prefetch;
- mobile intensivo;
- necessidade de estilos/cartografia avançada;
- dependência do mapa para segurança.

---

# 17. Riscos Financeiros e Operacionais

## R01 — Crescimento invisível

Serviços por uso podem crescer sem que a equipe perceba.

### Mitigação

- alertas;
- dashboards;
- revisão mensal;
- limites de gasto quando disponíveis.

---

## R02 — Plano gratuito tratado como contrato permanente

Planos gratuitos podem:

- mudar;
- reduzir cotas;
- alterar políticas;
- pausar serviços.

### Mitigação

Projetar para poder migrar quando necessário.

---

## R03 — Custo humano ignorado

Um painel barato pode gerar dezenas de horas mensais de curadoria.

### Mitigação

Estimar operação junto com desenvolvimento.

---

## R04 — Mapa sem SLA

O mapa atual depende de tiles públicos sem garantia de disponibilidade.

### Mitigação

Não tornar o serviço público de tiles uma dependência crítica permanente.

---

## R05 — Dados reais sem estratégia de backup

O custo de perder dados pode ser maior que o custo da infraestrutura.

### Mitigação

Definir criticidade e política de backup antes de aumentar dependência operacional.

---

## R06 — Arquitetura antecipada

Criar backend, mobile, microserviços ou infraestrutura “para o futuro” aumenta custo presente sem valor garantido.

### Mitigação

Adicionar recursos apenas quando requisitos justificarem.

---

## R07 — Lock-in

Dependência forte de recursos específicos de um fornecedor pode aumentar custo de saída.

### Mitigação

Avaliar:

- portabilidade dos dados;
- formatos abertos;
- abstrações somente quando úteis;
- documentação;
- custo real de migração.

---

# 18. Matriz de Recursos

| Recurso | Agora | Próximo | Futuro | Custo/risco principal |
|---|---:|---:|---:|---|
| GitHub | ✅ | ✅ | ✅ | baixo |
| Vercel | ✅ | ✅ | provável | comercialização exige revisão de plano |
| Supabase DB | ✅ | ✅ | provável | backup, egress e lock-in |
| Domínio | ✅ | ✅ | ✅ | renovação e acesso |
| Leaflet | ✅ | ✅ | possível | baixo |
| OSM Standard Tiles | ✅ | possível | inadequado para alguns cenários | sem SLA/offline |
| Storage de mídia | limitado | provável | ✅ | espaço e egress |
| E-mail transacional | ❌ | possível | provável | volume/entregabilidade |
| Backend separado | ❌ | decisão | possível | compute + operação |
| Mobile | ❌ | ❌ | possível | desenvolvimento/manutenção |
| Localização | ❌ | ❌ | possível | privacidade + mapa |
| Notificações | ❌ | ❌ | possível | infraestrutura + UX |
| Marketplace | ❌ | ❌ | possível | operação + pagamento |
| Pagamentos | ❌ | ❌ | possível | taxas + compliance |
| Observabilidade externa | ❌ | possível | provável | custo por evento/log |
| Backup avançado | limitado | provável | ✅ | retenção |

---

# 19. Informações que Ainda Precisamos Confirmar

## Vercel

- [ ] plano atual;
- [ ] uso dos últimos 30 dias;
- [ ] quantidade de membros;
- [ ] analytics realmente ativo;
- [ ] uso de Functions;
- [ ] transferência;
- [ ] otimização de imagens.

## Supabase

- [ ] plano atual;
- [ ] tamanho atual do banco;
- [ ] egress;
- [ ] quantidade de projetos ativos;
- [ ] política atual de backup;
- [ ] storage utilizado;
- [ ] região.

## Domínio

- [ ] valor de renovação;
- [ ] data de renovação;
- [ ] responsável pelo acesso;
- [ ] recuperação de conta configurada.

## Operação

- [ ] quem revisará contribuições;
- [ ] quem manterá conteúdo;
- [ ] quem responderá incidentes;
- [ ] horas semanais disponíveis;
- [ ] necessidade real de atendimento.

---

# 20. Recomendações para a MV0

Nesta etapa, a recomendação não é contratar nada novo.

A equipe deve:

1. manter a infraestrutura atual enquanto ela atender a discovery e a experiência existente;
2. confirmar os planos e consumos reais nos dashboards;
3. registrar o custo real do domínio;
4. não criar backend pago separado antes da análise arquitetural;
5. não contratar provedor de mapas antes de definir necessidades reais;
6. não contratar storage adicional antes de existir fluxo de mídia;
7. não investir em mobile antes de a hipótese entrar em um incremento próprio;
8. tratar a futura comercialização como gatilho para rever imediatamente o plano da Vercel;
9. definir uma política mínima de backup para dados reais;
10. usar este documento como entrada da comparação arquitetural.

---

# 21. Critérios de Conclusão da MV0-05

A primeira versão desta etapa pode ser considerada concluída quando:

- [x] infraestrutura atual estiver identificada;
- [x] recursos gratuitos principais estiverem documentados;
- [x] custos conhecidos estiverem registrados;
- [x] custos desconhecidos estiverem explicitamente marcados;
- [x] limites relevantes estiverem registrados;
- [x] riscos de crescimento estiverem documentados;
- [x] recursos humanos estiverem incluídos;
- [x] recursos futuros estiverem separados dos recursos atuais;
- [x] gatilhos de upgrade estiverem definidos;
- [x] custo entrar como critério arquitetural;
- [ ] planos atuais tiverem sido confirmados nos dashboards;
- [ ] custos do domínio tiverem sido confirmados;
- [ ] documento tiver revisão cruzada da equipe.

---

# 22. Fontes Consultadas

Valores e políticas deste documento foram levantados em fontes oficiais e devem ser revalidados quando houver decisão financeira.

Fontes consultadas em 08/08/2026:

- Vercel Pricing;
- Vercel Hobby Plan;
- Vercel Fair Use Guidelines;
- Vercel Limits;
- Supabase Pricing;
- Supabase Storage Pricing;
- Supabase Egress Usage;
- GitHub Actions Billing;
- OpenStreetMap Foundation Tile Usage Policy;
- repositório atual `luis-botelho/instituto-platform`.

---

# 23. Próximo Passo

Com:

- requisitos;
- dados;
- fluxos;
- recursos;
- custos;
- limites;
- riscos,

já existe base suficiente para iniciar:

`docs/discovery/07-ALTERNATIVAS-ARQUITETURAIS.md`

A próxima etapa deverá comparar opções sem vencedor pré-definido.

O princípio é:

> **A arquitetura precisa caber no produto, na equipe e no bolso.**
