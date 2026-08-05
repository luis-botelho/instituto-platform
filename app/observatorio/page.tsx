import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Database, Map, ShieldCheck } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { ObservatoryToolCard } from '@/components/observatorio/tool-card'
import { OBSERVATORY_TOOLS } from '@/lib/observatorio-data'

export const metadata: Metadata = { title: 'Observatório Mambucaba', description: 'Dados, documentos, pesquisas e participação cidadã a serviço do território de Mambucaba.', alternates: { canonical: '/observatorio' } }

export default function ObservatorioPage() {
  return <main>
    <PageHero eyebrow="Inteligência territorial cidadã" title="Observar para compreender. Compreender para transformar." description="Dados, documentos, mapas, pesquisas e participação cidadã reunidos em uma central pública para conhecer e acompanhar Mambucaba.">
      <div className="flex flex-wrap gap-3"><Link href="/demandas" className="rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground">Registrar uma demanda</Link><Link href="/radar" className="rounded-full border border-border bg-background px-5 py-3 font-semibold">Pesquisar no Radar</Link></div>
    </PageHero>
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16"><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Ferramentas</p><div className="mt-3 flex flex-wrap items-end justify-between gap-4"><h2 className="max-w-2xl font-serif text-3xl font-semibold">Conhecer, acompanhar e participar</h2><Link href="/sobre" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Como funciona o Observatório <ArrowRight className="size-4" /></Link></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{OBSERVATORY_TOOLS.map((tool) => <ObservatoryToolCard key={tool.href} tool={tool} />)}</div></section>
    <section className="border-y bg-primary text-primary-foreground"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">{[[Database,'Evidência','Diferenciamos dados confirmados, referências históricas e conteúdo demonstrativo.'],[ShieldCheck,'Responsabilidade','Ferramentas apoiam o cidadão, mas não substituem fontes, órgãos ou revisão humana.'],[Map,'Território','A leitura parte das localidades, relações e efeitos concretos das políticas públicas.']].map(([Icon,title,text]) => { const C=Icon as typeof Database; return <article key={title as string}><C className="size-6 opacity-70" /><h2 className="mt-4 font-serif text-xl font-semibold">{title as string}</h2><p className="mt-2 text-sm leading-relaxed opacity-80">{text as string}</p></article>})}</div></section>
    <section className="mx-auto max-w-6xl px-4 py-12 text-center"><p className="text-sm font-semibold uppercase tracking-widest text-primary">Transparência e responsabilidade</p><h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold">Uma ferramenta só é pública quando seus limites também são visíveis.</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Cadastros e demandas autorizadas são armazenados de forma privada para análise da equipe. A publicação, o encaminhamento a órgãos públicos e qualquer decisão institucional continuam dependendo de revisão humana.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/contato" className="rounded-full border px-5 py-3 font-semibold">Ver canais de contato</Link><a href="https://forms.gle/UpjrLZyTAWgFK9KZA" target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Responder pesquisa de saúde</a></div></section>
  </main>
}
