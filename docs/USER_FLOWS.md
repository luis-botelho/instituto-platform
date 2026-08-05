# User flows do MVP

## UF-01 — Descobrir o território

```mermaid
flowchart TD
    A["Acessa a home"] --> B["Escolhe idioma ou interesse"]
    B --> C["Busca ou abre o mapa"]
    C --> D["Filtra resultados"]
    D --> E["Abre uma página pública"]
    E --> F{"Próxima ação"}
    F -->|Salvar| G["Adiciona ao Meu Caminho"]
    F -->|Contato| H["Solicita atendimento"]
    F -->|Continuar| C
```

Exceções: nenhum resultado oferece filtros alternativos; conteúdo sem tradução usa fallback identificado; preço ou disponibilidade ausente não bloqueia publicação.

## UF-02 — Montar Meu Caminho

```mermaid
flowchart TD
    A["Seleciona lugar ou experiência"] --> B["Cria jornada anônima"]
    B --> C["Salva token seguro em cookie"]
    C --> D["Adiciona e ordena itens"]
    D --> E["Informa datas, grupo e faixa de orçamento"]
    E --> F["Visualiza mapa e estimativa"]
    F --> G{"Deseja atendimento?"}
    G -->|Não| H["Mantém caminho salvo"]
    G -->|Sim| I["Informa contato e consentimento"]
    I --> J["Lead criado"]
```

O preço é estimado e a disponibilidade é confirmada pela equipe. A jornada não exige conta; contato só é obrigatório quando ela vira lead.

## UF-03 — Solicitar pacote pronto

```mermaid
flowchart TD
    A["Abre pacote"] --> B["Consulta inclusões e preço indicativo"]
    B --> C["Escolhe data e participantes"]
    C --> D["Envia solicitação"]
    D --> E["Operação valida parceiros"]
    E --> F["Envia orçamento fora do checkout"]
```

## UF-04 — Cadastrar parceiro

```mermaid
flowchart TD
    A["Preenche solicitação"] --> B["Aceita termos e envia dados"]
    B --> C["Cadastro pendente"]
    C --> D{"Moderação"}
    D -->|Aprovar| E["Perfil publicado"]
    D -->|Corrigir| F["Solicita ajustes"]
    D -->|Reprovar| G["Registra motivo"]
```

## UF-05 — Parceiro atualizar perfil

```mermaid
flowchart TD
    A["Solicita acesso por e-mail"] --> B["Recebe magic link"]
    B --> C["Sessão segura"]
    C --> D["Edita dados e imagens"]
    D --> E["Cria revisão"]
    E --> F{"Operação analisa"}
    F -->|Aprovar| G["Nova versão publicada"]
    F -->|Corrigir| H["Parceiro recebe pendência"]
```

## UF-06 — Operar lead

```mermaid
flowchart TD
    A["Lead recebido"] --> B["Triagem e responsável"]
    B --> C["Valida preço e disponibilidade"]
    C --> D["Monta proposta"]
    D --> E["Registra retorno"]
    E --> F{"Resultado"}
    F -->|Aceito| G["Confirmado externamente"]
    F -->|Ajustar| C
    F -->|Encerrar| H["Perdido ou cancelado"]
```

Estados: `new`, `qualified`, `planning`, `proposal_sent`, `accepted`, `completed`, `lost`, `cancelled`. Mudanças críticas guardam ator, data e motivo.

## UF-07 — Avaliar e conceder selo

```mermaid
flowchart TD
    A["Visitante envia avaliação"] --> B["Moderação antiabuso"]
    B --> C["Avaliação pública"]
    C --> D["Indicadores internos"]
    D --> E["Comissão avalia critérios do selo"]
    E --> F["Concede, renova ou suspende"]
```

Avaliação pública, ranking interno, promoção paga e Selo Caminhos são quatro mecanismos independentes.

## UF-08 — Consentimento e personalização

```mermaid
flowchart TD
    A["Primeiro acesso"] --> B{"Aceita personalização?"}
    B -->|Não| C["Catálogo sem perfilamento"]
    B -->|Sim| D["Eventos pseudonimizados"]
    D --> E["Regras sugerem conteúdo"]
    E --> F["Usuário pode revogar"]
    F --> C
```
