import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search, Compass } from 'lucide-react'
import { CAMINHOS, EXPERIENCIAS } from '@/lib/data'
import { CaminhoCard } from '@/components/caminho-card'
import { ExperienceCard } from '@/components/experience-card'

/** Diferença em relação ao Google */
export function DiferencaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-7">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Search className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              No Google
            </span>
          </div>
          <p className="mt-4 font-serif text-2xl leading-snug text-foreground">
            Você pesquisa um restaurante, uma pousada, uma praia ou um endereço.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Pontos isolados no mapa. Informação útil, mas desconectada do
            território e de quem o vive.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary p-7 text-primary-foreground">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Compass className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              No Caminhos
            </span>
          </div>
          <p className="mt-4 font-serif text-2xl leading-snug">
            Você descobre uma forma de viver Mambucaba de acordo com quem você é.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">
            Conectamos lugar, pessoa, história, serviço, tempo, deslocamento e
            experiência. Uma rota conecta lugares — o Caminhos conecta a rota ao
            território.
          </p>
        </div>
      </div>
    </section>
  )
}

/** Quatro caminhos */
export function QuatroCaminhosSection() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Os quatro caminhos
          </p>
          <h2 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Quatro públicos, um mesmo território
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            A plataforma foi construída para quem vive, quem visita, quem
            empreende e quem pesquisa. Cada caminho tem seu lugar aqui.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAMINHOS.map((c) => (
            <CaminhoCard key={c.slug} caminho={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Visão de território vivido */
export function VisaoTerritorioSection() {
  const relacoes = [
    'Pertencimento',
    'Trabalho',
    'Comércio',
    'Serviços',
    'Mobilidade',
    'Cultura',
    'Memória',
    'Vínculos familiares',
    'Circulação econômica',
    'Vida cotidiana',
  ]
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Território vivido
        </p>
        <h2 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
          Um território é feito de relações, não só de fronteiras
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          O recorte inicial percorre o eixo entre a Praia do Laboratório e as
          relações entre localidades de Angra dos Reis e Paraty. Esse recorte
          não cria novas fronteiras nem apaga identidades locais.
        </p>
        <p className="mt-4 font-serif text-lg italic text-foreground">
          &ldquo;As fronteiras administrativas organizam a gestão. As relações
          humanas ajudam a revelar o território.&rdquo;
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {relacoes.map((r) => (
            <li
              key={r}
              className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground/80"
            >
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
        <Image
          src="/images/observatorio.png"
          alt="Mapa territorial desenhado à mão com curvas de nível e marcações"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}

/** Experiências em destaque */
export function ExperienciasDestaqueSection() {
  const destaque = EXPERIENCIAS.slice(0, 3)
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Experiências
            </p>
            <h2 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Não existe apenas um caminho para viver Mambucaba
            </h2>
          </div>
          <Link
            href="/experiencias"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
          >
            Ver todas <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaque.map((exp) => (
            <ExperienceCard key={exp.slug} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Convite para o mapa */
export function MapaConviteSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="overflow-hidden rounded-3xl border border-border bg-river text-river-foreground">
        <div className="grid items-center gap-8 p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-river-foreground/80">
              Mapa territorial
            </p>
            <h2 className="mt-2 text-balance font-serif text-3xl font-semibold md:text-4xl">
              O catálogo público do território, vivo e em construção
            </h2>
            <p className="mt-4 leading-relaxed text-river-foreground/90">
              Onde comer, onde se hospedar, o que conhecer, o que fazer e onde
              encontrar apoio. Cada ponto se conecta às experiências recomendadas.
            </p>
            <Link
              href="/mapa"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-background/90"
            >
              Abrir o mapa <ArrowRight className="size-5" />
            </Link>
          </div>
          <ul className="grid gap-3 text-sm font-medium">
            {[
              'Onde comer',
              'Onde se hospedar',
              'O que conhecer',
              'O que fazer',
              'Serviços e apoio',
            ].map((c) => (
              <li
                key={c}
                className="rounded-xl bg-background/15 px-4 py-3 ring-1 ring-inset ring-background/20"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** Participar + Observatório */
export function ParticiparObservatorioSection() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-4 sm:px-6 md:grid-cols-2">
      <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Participe da construção
        </h2>
        <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
          Cadastre sua iniciativa, indique um lugar, proponha uma experiência ou
          contribua com o mapeamento. O cadastro e a presença básica no mapa são
          gratuitos.
        </p>
        <Link
          href="/participar"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Quero participar <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Observatório Mambucaba
        </h2>
        <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
          A Central de Inteligência Territorial que produz pesquisas, escutas,
          indicadores e diagnósticos. O Observatório transforma conhecimento em
          capacidade de ação.
        </p>
        <Link
          href="/observatorio"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Conhecer o Observatório <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
