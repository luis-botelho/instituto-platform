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
    const code = protocol('DEM')

    await insertIntoSupabase({
      table: 'demands',
      record: {
        protocol: code,
        name: requiredString(body.name, 'Nome', { max: 160 }),
        email: email(body.email),
        locality: requiredString(body.locality, 'Localidade', { max: 120 }),
        manifestation_type: requiredString(body.manifestationType, 'Manifestação', { max: 80 }),
        topic: requiredString(body.topic, 'Tema', { max: 80 }),
        territorial_reference: optionalString(body.territorialReference, 'Referência', 300),
        report: requiredString(body.report, 'Relato', { min: 30, max: 10000 }),
        consented_at: new Date().toISOString(),
      },
    })

    return NextResponse.json({ protocol: code }, { status: 201 })
  } catch (error) {
    return apiError(error)
  }
}
