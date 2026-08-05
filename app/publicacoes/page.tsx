import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { PUBLICATIONS } from '@/lib/observatorio-data'

export const metadata: Metadata = { title: 'Biblioteca Territorial', description: 'Pesquisas, relatórios, metodologias e notas técnicas sobre Mambucaba organizados para consulta pública.', alternates: { canonical: '/publicacoes' } }
export default function PublicacoesPage() {
  return <main><PageHero eyebrow="Conhecimento aberto" title="Biblioteca Territorial" description="Pesquisas, relatórios, metodologias e notas técnicas organizadas para leitura pública." /><section className="mx-auto max-w-6xl px-4 py-12"><div className="grid gap-5 md:grid-cols-2">{PUBLICATIONS.map((pub) => { const Icon=pub.icon; return <article key={pub.title} className="group flex gap-5 rounded-2xl border bg-card p-6"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span><div><div className="flex gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"><span>{pub.type}</span><span>·</span><span>{pub.year}</span></div><h2 className="mt-2 font-serif text-xl font-semibold">{pub.title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pub.description}</p><Link href={pub.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ler publicação <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link></div></article> })}</div></section></main>
}
