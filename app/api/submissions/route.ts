import { NextResponse } from 'next/server'
import { apiError } from '@/lib/api-response'
import {
  assertConsent,
  email,
  optionalString,
  plainObject,
  protocol,
  requiredString,
} from '@/lib/api-validation'
import { insertIntoSupabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = plainObject(await request.json(), 'Dados')
    assertConsent(body.consent)
    const details = plainObject(body.details, 'Detalhes')
    const code = protocol('CAM')

    await insertIntoSupabase({
      table: 'submissions',
      record: {
        protocol: code,
        type: requiredString(body.type, 'Tipo', { max: 50 }),
        name: requiredString(body.name, 'Nome', { max: 160 }),
        email: email(body.email),
        phone: requiredString(body.phone, 'Telefone', { max: 40 }),
        locality: requiredString(body.locality, 'Localidade', { max: 120 }),
        relationship: requiredString(body.relationship, 'Vínculo', { max: 160 }),
        details,
        notes: optionalString(body.notes, 'Observações'),
        consented_at: new Date().toISOString(),
      },
    })

    return NextResponse.json({ protocol: code }, { status: 201 })
  } catch (error) {
    return apiError(error)
  }
}
