#!/usr/bin/env bash
set -Eeuo pipefail

REPO="${REPO:-luis-botelho/instituto-platform}"
BACKLOG_DOC="${BACKLOG_DOC:-docs/backend-mvp/07-BACKLOG.md}"
MODE="dry-run"

if [[ "${1:-}" == "--apply" ]]; then
  MODE="apply"
elif [[ -n "${1:-}" ]]; then
  echo "Uso: $0 [--apply]"
  exit 2
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Erro: GitHub CLI (gh) não encontrado."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Erro: autentique o GitHub CLI com: gh auth login"
  exit 1
fi

if [[ ! -f "$BACKLOG_DOC" ]]; then
  echo "Erro: $BACKLOG_DOC não encontrado. Copie docs/backend-mvp para o repositório antes de executar."
  exit 1
fi

OWNER="${REPO%%/*}"
NAME="${REPO##*/}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

declare -A EPIC_NUMBERS

print_action() {
  printf '[%s] %s\n' "$MODE" "$1"
}

find_issue_by_exact_title() {
  local title="$1"
  gh issue list \
    --repo "$REPO" \
    --state all \
    --limit 200 \
    --json number,title \
    --template '{{range .}}{{.number}}{{"\t"}}{{.title}}{{"\n"}}{{end}}' |
    awk -F '\t' -v expected="$title" '$2 == expected { print $1; exit }'
}

create_or_reuse_epic() {
  local key="$1"
  local title="$2"
  local body_file="$3"
  local number

  number="$(find_issue_by_exact_title "$title")"
  if [[ -n "$number" ]]; then
    print_action "Reutilizar épico #$number — $title"
    if [[ "$MODE" == "apply" ]]; then
      gh issue edit "$number" --repo "$REPO" --body-file "$body_file" >/dev/null
    fi
  else
    print_action "Criar épico — $title"
    if [[ "$MODE" == "apply" ]]; then
      issue_url="$(gh issue create --repo "$REPO" --title "$title" --body-file "$body_file")"
      number="${issue_url##*/}"
    else
      number="DRY-$key"
    fi
  fi

  EPIC_NUMBERS["$key"]="$number"
}

issue_node_id() {
  local number="$1"
  gh api graphql \
    -f query='query($owner:String!, $name:String!, $number:Int!) { repository(owner:$owner, name:$name) { issue(number:$number) { id } } }' \
    -f owner="$OWNER" \
    -f name="$NAME" \
    -F number="$number" \
    --jq '.data.repository.issue.id'
}

issue_parent_id() {
  local number="$1"
  gh api graphql \
    -f query='query($owner:String!, $name:String!, $number:Int!) { repository(owner:$owner, name:$name) { issue(number:$number) { parent { id } } } }' \
    -f owner="$OWNER" \
    -f name="$NAME" \
    -F number="$number" \
    --jq '.data.repository.issue.parent.id // ""'
}

attach_subissue() {
  local parent_number="$1"
  local child_number="$2"

  print_action "Vincular #$child_number como subissue de #$parent_number"
  if [[ "$MODE" != "apply" ]]; then
    return
  fi

  local parent_id child_id current_parent_id
  parent_id="$(issue_node_id "$parent_number")"
  child_id="$(issue_node_id "$child_number")"
  current_parent_id="$(issue_parent_id "$child_number")"

  if [[ "$current_parent_id" == "$parent_id" ]]; then
    return
  fi

  gh api graphql \
    -f query='mutation($parent:ID!, $child:ID!) { addSubIssue(input:{issueId:$parent, subIssueId:$child, replaceParent:true}) { issue { number } subIssue { number } } }' \
    -f parent="$parent_id" \
    -f child="$child_id" >/dev/null
}

extract_story() {
  local story_id="$1"
  awk -v story="$story_id" '
    $0 ~ "^### " story " —" { printing=1; print; next }
    printing && ($0 ~ "^### BE-[0-9][0-9] —" || $0 == "---") { exit }
    printing { print }
  ' "$BACKLOG_DOC"
}

if [[ "$MODE" == "apply" ]]; then
  for required_issue in {45..55}; do
    if ! gh api "repos/$REPO/issues/$required_issue" --jq '.number' >/dev/null; then
      echo "Erro: não foi possível acessar a issue #$required_issue em $REPO."
      echo "O GitHub CLI exibiu o erro real acima. Nenhuma alteração foi iniciada."
      exit 1
    fi
  done
fi

cat >"$TMP_DIR/e0.md" <<'EOF'
## Objetivo

Criar a fundação obrigatória do serviço Go antes das regras de produto.

## Decisões técnicas

- Go 1.26;
- `net/http` + `chi/v5`;
- OpenAPI 3.1;
- `log/slog`;
- serviço em `services/api`, sem mover o Next.js;
- sem framework alternativo, ORM ou microsserviço sem decisão aprovada.

## Critério de saída

- API local/Docker executável;
- healthchecks, erros e graceful shutdown testados;
- contrato base validado;
- nenhum domínio implementado fora das stories.

## Stories

- BE-01 — runtime HTTP, configuração, healthchecks e Docker;
- BE-02 — OpenAPI, envelopes, erros e contrato.
EOF

cat >"$TMP_DIR/e1.md" <<'EOF'
## Objetivo

Retirar o conteúdo de `lib/data.ts` e transformá-lo em domínio consultável sem publicar demonstrações como fatos.

## Regras centrais

- separar lugar, negócio/hospedagem e experiência;
- separar publicação de verificação;
- preservar PT-BR e fallback explícito;
- manter demo somente em local/teste;
- não inventar preço, disponibilidade ou reserva.

## Critério de saída

- migrations incrementais sem editar a migration aplicada;
- importador idempotente com dry-run;
- duplicidade da Pousada Serra & Mar resolvida;
- endpoints cobrem experiências, hospedagens e mapa atuais.

## Stories

- BE-03 — schema, sqlc e importador;
- BE-04 — lugares, negócios e metadados;
- BE-05 — experiências e mapa.
EOF

cat >"$TMP_DIR/e2.md" <<'EOF'
## Objetivo

Migrar para Go regras e escritas que já existem no Next.js sem alterar comportamento nem perder dados.

## Capacidades preservadas

- `lib/recommend.ts::recomendar`;
- `POST /api/submissions`;
- `POST /api/demands`;
- protocolos CAM/DEM;
- tabelas existentes `submissions` e `demands`.

## Critério de saída

- Go reproduz os resultados do TypeScript;
- 11 tipos do Cadastro Único são validados;
- adaptadores Next preservam a UX atual;
- retry não duplica protocolo;
- PII não aparece em logs.

## Stories

- BE-06 — recomendação `rules-v1`;
- BE-07 — Cadastro Único e demandas.
EOF

cat >"$TMP_DIR/e3.md" <<'EOF'
## Objetivo

Transformar uma seleção anônima em solicitação de planejamento, sem fingir reserva ou pagamento.

## Decisão de produto

O rascunho fica no navegador neste MVP. A API recebe IDs, valida itens publicados, cria snapshot imutável e devolve protocolo PLAN.

## Critério de saída

- protocolo único/idempotente;
- referências inexistentes, duplicadas ou despublicadas são rejeitadas;
- snapshot usa dados do banco;
- contato, canal, período e grupo são validados;
- resposta informa que valores e disponibilidade dependem de atendimento.

## Story

- BE-08 — planning request, snapshot e consentimento.
EOF

cat >"$TMP_DIR/e4.md" <<'EOF'
## Objetivo

Tornar a API verificável, operável e consumível sem explicação oral do autor.

## Critério de saída

- Gate A demonstrado: catálogo, recomendação e entradas existentes;
- Gate B demonstrado: seleção, planning request e protocolo;
- migrations testadas em banco vazio e upgrade;
- OpenAPI corresponde ao comportamento;
- outro desenvolvedor sobe a API seguindo somente o README;
- integração e rollback do Next.js documentados.

## Stories

- BE-09 — pipeline e matriz de testes;
- BE-10 — documentação, integração e rollback.
EOF

create_or_reuse_epic "E0" "[EPIC][BACKEND MVP][E0] Fundação e contrato da API Go" "$TMP_DIR/e0.md"
create_or_reuse_epic "E1" "[EPIC][BACKEND MVP][E1] Domínio e catálogo territorial" "$TMP_DIR/e1.md"
create_or_reuse_epic "E2" "[EPIC][BACKEND MVP][E2] Paridade das regras e entradas existentes" "$TMP_DIR/e2.md"
create_or_reuse_epic "E3" "[EPIC][BACKEND MVP][E3] Meu Caminho como solicitação de planejamento" "$TMP_DIR/e3.md"
create_or_reuse_epic "E4" "[EPIC][BACKEND MVP][E4] Qualidade, integração e handoff" "$TMP_DIR/e4.md"

if [[ "$MODE" == "apply" ]]; then
  cat >"$TMP_DIR/program.md" <<EOF
## Objetivo

Entregar a primeira API Go do Caminhos com paridade segura do produto atual e o primeiro fluxo de solicitação de planejamento.

## Gate A — paridade segura

- catálogo territorial publicado;
- recomendação determinística compatível;
- Cadastro Único e demandas preservados;
- migração gradual do Next.js sem downtime.

## Gate B — valor comercial honesto

- seleção anônima de lugares, negócios e experiências;
- planning request com snapshot e protocolo;
- sem checkout, reserva, preço ou disponibilidade inventados.

## Épicos

- [ ] #${EPIC_NUMBERS[E0]} — Fundação e contrato
- [ ] #${EPIC_NUMBERS[E1]} — Domínio e catálogo
- [ ] #${EPIC_NUMBERS[E2]} — Paridade das regras e entradas
- [ ] #${EPIC_NUMBERS[E3]} — Meu Caminho/planejamento
- [ ] #${EPIC_NUMBERS[E4]} — Qualidade e handoff

## Fonte de verdade

`docs/backend-mvp/README.md` e documentos relacionados.

## Fora do Backend MVP

Pagamento, reserva automática, disponibilidade, autenticação de parceiro, admin/CMS, upload, avaliações, Selo Caminhos, IA, mobile e backend completo do ICPT.
EOF

  gh issue edit 45 \
    --repo "$REPO" \
    --title "[PROGRAM][BACKEND MVP] API Go consumível pelo Next.js" \
    --body-file "$TMP_DIR/program.md" >/dev/null
else
  print_action "Atualizar issue #45 como programa-pai"
fi

declare -a STORY_ROWS=(
  "46|BE-01|E0|[STORY][BE-01] Inicializar serviço Go e runtime HTTP"
  "48|BE-02|E0|[STORY][BE-02] Definir OpenAPI, envelopes e erros"
  "47|BE-03|E1|[STORY][BE-03] Criar schema incremental e importador legado"
  "49|BE-04|E1|[STORY][BE-04] Entregar catálogo de lugares, negócios e metadados"
  "50|BE-05|E1|[STORY][BE-05] Entregar experiências e mapa"
  "51|BE-06|E2|[STORY][BE-06] Portar recomendação como rules-v1"
  "52|BE-07|E2|[STORY][BE-07] Migrar Cadastro Único e demandas para Go"
  "53|BE-08|E3|[STORY][BE-08] Criar solicitação de planejamento do Meu Caminho"
  "54|BE-09|E4|[STORY][BE-09] Cobrir fluxo crítico e pipeline de qualidade"
  "55|BE-10|E4|[STORY][BE-10] Entregar documentação, integração e rollback"
)

for row in "${STORY_ROWS[@]}"; do
  IFS='|' read -r issue_number story_id epic_key title <<<"$row"
  story_file="$TMP_DIR/$story_id.md"

  if [[ "$MODE" == "apply" ]]; then
    {
      printf 'Parent: #%s\n\n' "${EPIC_NUMBERS[$epic_key]}"
      printf '> Especificação completa: `docs/backend-mvp/07-BACKLOG.md` e documentos relacionados.\n\n'
      extract_story "$story_id"
    } >"$story_file"

    gh issue edit "$issue_number" \
      --repo "$REPO" \
      --title "$title" \
      --body-file "$story_file" >/dev/null
  else
    print_action "Atualizar #$issue_number com $story_id — $title"
  fi
done

attach_subissue 45 "${EPIC_NUMBERS[E0]}"
attach_subissue 45 "${EPIC_NUMBERS[E1]}"
attach_subissue 45 "${EPIC_NUMBERS[E2]}"
attach_subissue 45 "${EPIC_NUMBERS[E3]}"
attach_subissue 45 "${EPIC_NUMBERS[E4]}"

for row in "${STORY_ROWS[@]}"; do
  IFS='|' read -r issue_number _ epic_key _ <<<"$row"
  attach_subissue "${EPIC_NUMBERS[$epic_key]}" "$issue_number"
done

if [[ "$MODE" == "dry-run" ]]; then
  echo
  echo "Simulação concluída. Nenhuma alteração foi feita."
  echo "Execute novamente com --apply para escrever no GitHub."
else
  echo
  echo "Backlog reconstruído com programa, épicos e subissues reais."
  echo "Nenhum Project, responsável ou metadado opcional foi alterado."
  echo "Programa: https://github.com/$REPO/issues/45"
fi
