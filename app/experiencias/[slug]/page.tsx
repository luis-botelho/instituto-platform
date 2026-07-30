import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Clock,
  MapPin,
  Route,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { StatusBadge } from '@/components/status-badge'
import {
  DURACAO_LABEL,
  EXPERIENCIAS,
  INTERESSES,
} from '@/lib/data'
import { withBasePath } from '@/lib/paths'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return EXPERIENCIAS.map((experience) => ({ slug: experience.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const experience = EXPERIENCIAS.find((item) => item.slug === slug)

  if (!experience) return {}

  return {
    title: experience.nome,
    description: experience.resumo,
  }
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const experience = EXPERIENCIAS.find((item) => item.slug === slug)

  if (!experience) notFound()

  return (
    <main>
      <PageHero
        eyebrow="Experiência territorial"
        title={experience.nome}
        description={experience.resumo}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={experience.status} />
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" />
            {DURACAO_LABEL[experience.duracao]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm capitalize text-muted-foreground">
            <Users className="size-4" />
            {experience.formato}
          </span>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
            <Image
              src={withBasePath(experience.imagem)}
              alt={`Imagem da experiência ${experience.nome}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          <article className="mt-6 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-2xl font-semibold">
              Por que viver este caminho?
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {experience.porque}
            </p>
          </article>
        </div>

        <div className="space-y-5">
          <article className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Route className="size-5 text-primary" />
              <h2 className="font-serif text-xl font-semibold">Sequência sugerida</h2>
            </div>
            <ol className="mt-5 space-y-3">
              {experience.sequencia.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Informações práticas</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Localidades</dt>
                <dd className="mt-1 flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  {experience.localidades.join(' · ')}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Deslocamento</dt>
                <dd className="mt-1 text-muted-foreground">
                  {experience.deslocamento}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Custo</dt>
                <dd className="mt-1 text-muted-foreground">{experience.custo}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl border-l-4 border-accent bg-secondary/50 p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-accent" />
              <h2 className="font-serif text-xl font-semibold">Cuidados</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {experience.cuidados}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Acessibilidade:</strong>{' '}
              {experience.acessibilidade}
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-wrap gap-2">
          {experience.interesses.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-secondary px-3 py-1 text-sm font-medium"
            >
              {INTERESSES[interest]}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/experiencias"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-semibold"
          >
            <ArrowLeft className="size-4" />
            Todas as experiências
          </Link>
          <Link
            href="/mapa"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            Abrir o mapa
          </Link>
        </div>
      </section>
    </main>
  )
}
