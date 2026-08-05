import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { DemandForm } from '@/components/observatorio/demand-form'

export const metadata: Metadata = { title: 'Registro de Demandas', description: 'Organize um relato popular em uma minuta clara para encaminhamento e participação cidadã em Mambucaba.', alternates: { canonical: '/demandas' } }
export default function DemandasPage() {
  return <main><PageHero eyebrow="Participação cidadã" title="Do relato popular ao pedido técnico" description="Uma ferramenta de apoio para organizar sua manifestação. Você mantém o controle: revise, copie e encaminhe pelo canal oficial." /><section className="mx-auto max-w-6xl px-4 py-12"><DemandForm /><p className="mt-8 text-center text-sm text-muted-foreground">Entenda limites, critérios e revisão humana na <Link href="/metodologia" className="font-semibold text-primary underline">metodologia completa</Link>.</p></section></main>
}
