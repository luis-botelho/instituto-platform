import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Building2, Compass, ExternalLink, Eye, MapPin } from 'lucide-react'
import { OBSERVATORIO_INSTAGRAM_URL, OBSERVATORIO_SITE_URL } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Escolha seu caminho',
  description:
    'Acesse o Instituto Cidadania e Políticas Territoriais, o Caminhos de Mambucaba ou o Observatório Mambucaba.',
  alternates: { canonical: '/' },
}

const destinations = [
  {
    name: 'Observatório Mambucaba',
    eyebrow: 'Dados e participação',
    description:
      'Dados públicos, pesquisas, mapas, escuta cidadã e inteligência territorial para acompanhar as políticas públicas e compreender Mambucaba.',
    href: OBSERVATORIO_SITE_URL,
    image: '/images/observatorio.png',
    icon: Eye,
    tone: 'from-serra/95 via-territorio/85 to-mata/70',
    accent: 'bg-river text-river-foreground',
    external: true,
  },
  {
    name: 'Caminhos de Mambucaba',
    eyebrow: 'Território e experiências',
    description:
      'Descubra lugares, histórias, hospedagens e experiências construídas por quem vive Mambucaba.',
    href: '/caminhos',
    image: '/images/hero-mambucaba.png',
    icon: Compass,
    tone: 'from-territorio/95 via-agua/80 to-territorio/60',
    accent: 'bg-accent-brand text-primary-foreground',
    external: false,
  },
  {
    name: 'Instituto ICPT',
    eyebrow: 'Instituição e impacto',
    description:
      'Conheça o Instituto, sua visão de futuro e a articulação entre cidadania, políticas públicas e desenvolvimento territorial.',
    href: '/instituto',
    image: '/images/exp-memoria.png',
    icon: Building2,
    tone: 'from-mata/95 via-accent-brand/75 to-mata/60',
    accent: 'bg-accent text-accent-foreground',
    external: false,
  },
] as const

export default function HomePage() {
  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_8%,color-mix(in_srgb,var(--color-accent)_13%,transparent),transparent_28%),radial-gradient(circle_at_88%_4%,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_30%),linear-gradient(180deg,#f7f3e9_0%,#eee8da_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(color-mix(in_srgb,var(--color-mata)_8%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-mata)_8%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      <section className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10 sm:px-6 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-river/20 bg-card/60 px-4 py-2 text-xs font-bold uppercase tracking-[.22em] text-river shadow-sm backdrop-blur">
            <MapPin className="size-3.5" /> Mambucaba · Angra dos Reis
          </span>
          <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.04] tracking-[-.035em] sm:text-5xl md:text-7xl">
            Um território.
            <span className="block italic text-accent">Três formas de transformar.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Escolha por onde deseja começar e conheça o ecossistema que conecta pessoas,
            experiências, conhecimento e participação cidadã.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {destinations.map((destination, index) => {
            const Icon = destination.icon
            const content = (
              <>
                <Image
                  src={destination.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${destination.tone}`} />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className={`flex size-11 items-center justify-center rounded-full ${destination.accent}`}>
                    <Icon className="size-5" />
                  </span>
                  <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border border-card/30 bg-black/10 backdrop-blur transition group-hover:rotate-12 group-hover:bg-card group-hover:text-foreground">
                    {destination.external ? (
                      <ExternalLink className="size-5" />
                    ) : (
                      <ArrowUpRight className="size-5" />
                    )}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-foreground/70">
                    {destination.eyebrow}
                  </p>
                  <h2 className="mt-3 text-balance font-serif text-3xl font-semibold leading-tight">
                    {destination.name}
                  </h2>
                  {destination.external && (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-card/30 bg-black/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[.14em] text-primary-foreground/85">
                      <ExternalLink className="size-3" /> Site externo
                    </span>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
                    {destination.description}
                  </p>
                  {destination.external ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={OBSERVATORIO_SITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Acessar o Observatório Mambucaba (abre em nova aba)"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Acessar o Observatório <ExternalLink className="size-4" />
                      </a>
                      <a
                        href={OBSERVATORIO_INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram do Observatório Mambucaba (abre em nova aba)"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-card/40 bg-card/10 px-5 py-2.5 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-card/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Instagram do Observatório <ExternalLink className="size-4" />
                      </a>
                    </div>
                  ) : (
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                      Entrar agora <ArrowUpRight className="size-4" />
                    </span>
                  )}
                </div>
              </>
            )
            return destination.external ? (
              <article
                key={destination.href}
                className="group relative min-h-[25rem] overflow-hidden rounded-[var(--radius-feature)] border border-card/60 bg-primary text-primary-foreground shadow-card md:min-h-[31rem]"
              >
                {content}
              </article>
            ) : (
              <Link
                key={destination.href}
                href={destination.href}
                className="group relative min-h-[25rem] overflow-hidden rounded-[var(--radius-feature)] border border-card/60 bg-primary text-primary-foreground shadow-card outline-none transition duration-500 hover:-translate-y-2 hover:shadow-soft focus-visible:ring-4 focus-visible:ring-ring/40 md:min-h-[31rem]"
              >
                {content}
              </Link>
            )
          })}
        </div>

        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">
          Instituto Cidadania e Políticas Territoriais
        </p>
      </section>
    </main>
  )
}