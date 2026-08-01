import { NextResponse } from 'next/server'
import { ValidationError } from '@/lib/api-validation'
import { StorageConfigurationError } from '@/lib/supabase'

export function apiError(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  if (error instanceof StorageConfigurationError) {
    console.error(error.message)
    return NextResponse.json(
      { error: 'O armazenamento ainda não foi configurado no servidor.' },
      { status: 503 },
    )
  }
  console.error(error)
  return NextResponse.json(
    { error: 'Não foi possível salvar agora. Tente novamente em alguns instantes.' },
    { status: 500 },
  )
}
