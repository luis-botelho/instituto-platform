import 'server-only'

type SupabaseInsertOptions = {
  table: 'submissions' | 'demands'
  record: Record<string, unknown>
}

export class StorageConfigurationError extends Error {}

export async function insertIntoSupabase({ table, record }: SupabaseInsertOptions) {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new StorageConfigurationError(
      'Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente do servidor.',
    )
  }

  const baseUrl = url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
  const response = await fetch(`${baseUrl}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(record),
    cache: 'no-store',
  })

  if (!response.ok) {
    const detail = await response.text()
    console.error(`Supabase insert failed (${table}):`, response.status, detail)
    throw new Error('Não foi possível armazenar o registro.')
  }

  const rows = (await response.json()) as Array<Record<string, unknown>>
  return rows[0]
}
