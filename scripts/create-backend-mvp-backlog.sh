#!/usr/bin/env bash
set -euo pipefail

REPO="luis-botelho/instituto-platform"
OWNER="luis-botelho"
PROJECT_NUMBER="3"
APPLY="false"

if [[ "${1:-}" == "--apply" ]]; then
  APPLY="true"
fi

command -v gh >/dev/null 2>&1 || { echo "Erro: GitHub CLI (gh) não encontrado."; exit 1; }
gh auth status >/dev/null

create_issue() {
  local title="$1" body="$2"
  if [[ "$APPLY" != "true" ]]; then
    echo "[DRY-RUN] $title"
    return
  fi

  local existing_url url
  existing_url="$(gh issue list --repo "$REPO" --state all --limit 200 --json title,url --jq ".[] | select(.title == \"$title\") | .url" | head -n 1)"
  if [[ -n "$existing_url" ]]; then
    echo "Já existe: $existing_url"
    return
  fi

  url="$(gh issue create --repo "$REPO" --title "$title" --body "$body")"
  gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" --url "$url" >/dev/null
  echo "Criada: $url"
}

if [[ "$APPLY" != "true" ]]; then
  echo "Modo simulação. Revise a lista; execute com --apply para criar as issues."
fi

create_issue "[EPIC][API] Entregar primeiro corte vertical do backend" "$(cat <<'EOF'
## Objetivo
Entregar catálogo → mapa → Meu Caminho → lead em uma API Go consumível pelo frontend.

## Referência
`docs/backend/BACKEND_MVP_HANDOFF.md`

## Aceite
- fluxo completo demonstrado;
- OpenAPI, migrations e testes versionados;
- nenhum item fora do escopo implementado.
EOF
)"

create_issue "[STORY][API] Inicializar serviço Go e healthcheck" "Bootstrap, configuração validada, conexão PostgreSQL, request ID, graceful shutdown, Dockerfile e \`GET /health\`."
create_issue "[STORY][DB] Criar migrations e seed do domínio mínimo" "Criar catálogo/traduções/categorias, jornadas/itens e leads/snapshots com UUID, índices e seed fictício PT/EN."
create_issue "[STORY][API] Definir OpenAPI e padrão de erros" "Versionar \`docs/openapi.yaml\`, envelope de sucesso/erro, validação e exemplos reproduzíveis."
create_issue "[STORY][API] Entregar catálogo público e filtros" "Listagem/detalhe publicados, paginação estável, filtros, locale e fallback PT-BR."
create_issue "[STORY][API] Entregar itens públicos do mapa" "Consulta por bounding box, somente publicados e proteção de coordenadas sensíveis."
create_issue "[STORY][API] Criar Meu Caminho anônimo" "Token opaco hasheado, expiração, criação e recuperação segura da jornada."
create_issue "[STORY][API] Gerenciar itens do Meu Caminho" "Adicionar, remover e reordenar sem duplicidade ou corrupção concorrente."
create_issue "[STORY][API] Converter jornada em lead idempotente" "Validar contato/consentimento, snapshot imutável, protocolo público, rate limit e idempotência."
create_issue "[STORY][QA] Cobrir fluxo crítico com testes de integração" "Cobrir os dez cenários obrigatórios do handoff e executar contra PostgreSQL de teste."
create_issue "[STORY][DOCS] Documentar execução e handoff da API" "README, \`.env.example\`, arquivo \`.http\`, comandos, limitações e evidências de teste."

if [[ "$APPLY" != "true" ]]; then
  echo
  echo "Nenhuma alteração foi feita. Para criar: bash scripts/create-backend-mvp-backlog.sh --apply"
fi
