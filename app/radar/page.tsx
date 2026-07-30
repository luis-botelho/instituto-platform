import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { RadarSearch } from '@/components/observatorio/radar-search'

export const metadata: Metadata = { title: 'Radar Mambucaba', description: 'Pesquisa guiada em fontes públicas oficiais.' }
export default function RadarPage() {
  return <main><PageHero eyebrow="Transparência assistida" title="Radar Mambucaba" description="Pesquise contratos, obras, serviços, orçamento e decisões públicas sem se perder entre dezenas de portais." /><section className="mx-auto max-w-5xl px-4 py-12"><RadarSearch /><div className="mt-8 grid gap-4 md:grid-cols-3">{[['1','Pesquise','Use assunto, local e órgão responsável.'],['2','Confira','Abra o resultado no domínio oficial.'],['3','Registre','Guarde data, link e documento encontrado.']].map(([n,t,d]) => <article key={n} className="rounded-2xl border bg-card p-5"><span className="font-serif text-3xl text-primary">{n}</span><h2 className="mt-2 font-serif text-xl font-semibold">{t}</h2><p className="mt-1 text-sm text-muted-foreground">{d}</p></article>)}</div></section></main>
}
