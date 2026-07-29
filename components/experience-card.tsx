import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, ArrowRight } from 'lucide-react'
import {
  DURACAO_LABEL,
  INTERESSES,
  type Experiencia,
} from '@/lib/data'
import { StatusBadge } from '@/components/status-badge'

export function ExperienceCard({ exp }: { exp: Experiencia }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/experiencias/${exp.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={exp.imagem || '/placeholder.svg'}
          alt={`Imagem da experiência ${exp.nome}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={exp.status} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {DURACAO_LABEL[exp.duracao]}
          </span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">
            {exp.formato === 'livre' ? 'Livre' : 'Acompanhada'}
          </span>
        </div>

        <h3 className="font-serif text-xl font-semibold leading-snug text-foreground">
          <Link href={`/experiencias/${exp.slug}`} className="hover:text-primary">
            {exp.nome}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {exp.resumo}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.interesses.slice(0, 3).map((i) => (
            <span
              key={i}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {INTERESSES[i]}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Users className="size-3.5" />
            {exp.localidades[0]}
          </span>
          <Link
            href={`/experiencias/${exp.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all"
          >
            Ver caminho <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
