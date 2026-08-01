import Link from 'next/link'
import Image from 'next/image'
import { Compass, MapPin } from 'lucide-react'
import { withBasePath } from '@/lib/paths'

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={withBasePath('/images/hero-mambucaba.png')}
        alt="Vista aérea da costa de Mambucaba, entre a Serra do Mar, o rio e o mar"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/40" />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-20 sm:px-6 md:py-28 lg:py-36">
        <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground ring-1 ring-inset ring-background/25">
          Plataforma Territorial
        </p>
        <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
          Descubra. Viva. Construa o território de Mambucaba.
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/90">
          No Google, você encontra um lugar. No Caminhos, encontra uma forma de
          viver o território — conectando pessoas, histórias, iniciativas e
          experiências.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/monte-seu-caminho"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
          >
            <Compass className="size-5" /> Monte seu Caminho
          </Link>
          <Link
            href="/mapa"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-background/95 px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-background"
          >
            <MapPin className="size-5" /> Explorar o mapa
          </Link>
        </div>

        <p className="mt-8 max-w-xl font-serif text-base italic text-primary-foreground/85">
          &ldquo;Quatro caminhos. Um território. Muitas formas de viver
          Mambucaba.&rdquo;
        </p>
      </div>
    </section>
  )
}
