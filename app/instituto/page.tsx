import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Eye, Handshake, Map, Target } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Instituto ICPT',
  description:
    'Instituto Cidadania e Políticas Territoriais: conhecimento, participação e desenvolvimento a serviço dos territórios.',
  alternates: { canonical: '/instituto' },
}

const pillars = [
  {
    icon: Map,
    title: 'Território vivo',
    text: 'Partimos das pessoas, saberes, memórias e relações que dão forma a cada território.',
  },
  {
    icon: Eye,
    title: 'Cidadania informada',
    text: 'Transformamos dados e documentos públicos em informação acessível para participação e controle social.',
  },
  {
    icon: Handshake,
    title: 'Articulação',
    text: 'Conectamos comunidades, iniciativas, pesquisadores e poder público em torno de soluções concretas.',
  },
] as const

export default function InstitutoPage() {
  return (
    <main>
      <PageHero
        eyebrow="Instituto Cidadania e Políticas Territoriais"
        title="Conhecimento que nasce no território e volta para transformá-lo."
        description="O ICPT articula cidadania, políticas públicas e desenvolvimento territorial para fortalecer pessoas, comunidades e instituições."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/caminhos" className="rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground">
            Conhecer o Caminhos
          </Link>
          <Link href="/observatorio" className="rounded-full border border-border bg-background px-5 py-3 font-semibold">
            Abrir o Observatório
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 className="size-6" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-accent">Nossa direção</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
              Construir capacidade local para decisões melhores.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            O Instituto nasce para apoiar a leitura dos territórios, organizar conhecimento,
            ampliar a participação cidadã e aproximar políticas públicas da vida real. Caminhos e
            Observatório são as primeiras expressões desse ecossistema.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border bg-card p-7 shadow-sm">
              <Icon className="size-6 text-primary" />
              <h3 className="mt-5 font-serif text-2xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Target className="size-7 opacity-70" />
            <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold">
              Um instituto, duas plataformas e uma missão compartilhada.
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed opacity-80">
              Valorizar o território, produzir inteligência pública e transformar participação em capacidade de ação.
            </p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-primary">
            Voltar ao portal <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
