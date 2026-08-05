import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Building2, Compass, Eye, MapPin } from 'lucide-react'

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
      'Pesquisas, demandas cidadãs, orçamento público e ferramentas de controle social para compreender o território.',
    href: '/observatorio',
    image: '/images/observatorio.png',
    icon: Eye,
    tone: 'from-[#153f35]/95 via-[#1d5547]/85 to-[#0d2520]/55',
    accent: 'bg-[#d8a15d] text-[#1f3028]',
  },
  {
    name: 'Caminhos de Mambucaba',
    eyebrow: 'Território e experiências',
    description:
      'Descubra lugares, histórias, hospedagens e experiências construídas por quem vive Mambucaba.',
    href: '/caminhos',
    image: '/images/hero-mambucaba.png',
    icon: Compass,
    tone: 'from-[#183a2b]/90 via-[#315e40]/70 to-[#14291d]/50',
    accent: 'bg-[#f0cf93] text-[#27372c]',
  },
  {
    name: 'Instituto ICPT',
    eyebrow: 'Instituição e impacto',
    description:
      'Conheça o Instituto, sua visão de futuro e a articulação entre cidadania, políticas públicas e desenvolvimento territorial.',
    href: '/instituto',
    image: '/images/exp-memoria.png',
    icon: Building2,
    tone: 'from-[#502d1f]/90 via-[#814a2f]/70 to-[#281a15]/50',
    accent: 'bg-[#f4d7ae] text-[#442a1f]',
  },
] as const

export default function HomePage() {
  return (
    <main className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#f3efe5] text-[#203128]">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_8%,rgba(193,98,47,.13),transparent_28%),radial-gradient(circle_at_88%_4%,rgba(63,107,74,.18),transparent_30%),linear-gradient(180deg,#f7f3e9_0%,#eee8da_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(42,69,53,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(42,69,53,.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      <section className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10 sm:px-6 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#315a46]/20 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[.22em] text-[#315a46] shadow-sm backdrop-blur">
            <MapPin className="size-3.5" /> Mambucaba · Angra dos Reis
          </span>
          <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.04] tracking-[-.035em] sm:text-5xl md:text-7xl">
            Um território.
            <span className="block italic text-[#a3532d]">Três formas de transformar.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#53645a] sm:text-lg">
            Escolha por onde deseja começar e conheça o ecossistema que conecta pessoas,
            experiências, conhecimento e participação cidadã.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {destinations.map((destination, index) => {
            const Icon = destination.icon
            return (
              <Link
                key={destination.href}
                href={destination.href}
                className="group relative min-h-[25rem] overflow-hidden rounded-[2rem] border border-white/60 bg-[#264836] text-white shadow-[0_25px_70px_-35px_rgba(25,52,37,.75)] outline-none transition duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_-30px_rgba(25,52,37,.9)] focus-visible:ring-4 focus-visible:ring-[#c66f3d]/40 md:min-h-[31rem]"
              >
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
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/10 backdrop-blur transition group-hover:rotate-12 group-hover:bg-white group-hover:text-[#27372c]">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-white/70">
                    {destination.eyebrow}
                  </p>
                  <h2 className="mt-3 text-balance font-serif text-3xl font-semibold leading-tight">
                    {destination.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {destination.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                    Entrar agora <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#6b786f]">
          Instituto Cidadania e Políticas Territoriais
        </p>
      </section>
    </main>
  )
}
