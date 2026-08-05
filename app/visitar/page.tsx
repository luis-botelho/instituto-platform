import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Utensils, BedDouble, Landmark, Route, Compass } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { MapExplorer } from '@/components/map/map-explorer'
import { ExperienceCard } from '@/components/experience-card'
import { EXPERIENCIAS, CATEGORIAS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Visitar',
  description:
    'Descubra o que fazer, onde comer, onde se hospedar e como viver Mambucaba de um jeito próprio.',
  alternates: { canonical: '/visitar' },
}

const CATEGORIA_ICONS = [
  { key: 'comer', icon: Utensils },
  { key: 'hospedar', icon: BedDouble },
  { key: 'conhecer', icon: Landmark },
  { key: 'fazer', icon: Route },
] as const

const INFO_UTEIS = [
  {
    titulo: 'Como chegar',
    texto:
      'O território se estende pelo eixo entre Angra dos Reis e Paraty. Informação demonstrativa — consulte transporte local.',
  },
  {
    titulo: 'Mobilidade',
    texto:
      'Algumas localidades são melhor acessadas de carro; outras contam com transporte comunitário. Planeje seus deslocamentos.',
  },
  {
    titulo: 'Respeito ao território',
    texto:
      'Você visita um lugar vivido. Valorize a comunidade, a natureza e o patrimônio. Leve seu lixo e siga orientações locais.',
  },
]

export default function VisitarPage() {
  return (
    <main>
      <PageHero
        eyebrow="Quem visita"
        title="Descubra o que fazer em Mambucaba"
        description="Comece pelo mapa, explore as categorias e monte uma experiência do seu jeito. Encontre onde comer, onde dormir, o que conhecer e o que fazer."
      >
        <Link
          href="/monte-seu-caminho"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Compass className="size-5" /> Monte seu Caminho
        </Link>
      </PageHero>

      {/* mapa no início */}
      <MapExplorer compact />

      {/* categorias */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Por onde começar
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIA_ICONS.map(({ key, icon: Icon }) => (
              <Link
                key={key}
                href="/mapa"
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <span
                  className="flex size-12 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: CATEGORIAS[key].cor }}
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  {CATEGORIAS[key].label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {CATEGORIAS[key].descricao}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                  Ver no mapa <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* experiências */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Experiências para viver
          </h2>
          <Link
            href="/monte-seu-caminho"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
          >
            Montar um caminho <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCIAS.slice(0, 3).map((exp) => (
            <ExperienceCard key={exp.slug} exp={exp} />
          ))}
        </div>
      </section>

      {/* informações úteis */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Informações úteis
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {INFO_UTEIS.map((info) => (
              <div
                key={info.titulo}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {info.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {info.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
