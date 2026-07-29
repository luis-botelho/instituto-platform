import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Caminho } from '@/lib/data'
import { cn } from '@/lib/utils'

const ACCENT: Record<Caminho['cor'], string> = {
  primary: 'before:bg-primary',
  river: 'before:bg-river',
  accent: 'before:bg-accent',
  sand: 'before:bg-sand',
}

export function CaminhoCard({ caminho }: { caminho: Caminho }) {
  return (
    <Link
      href={caminho.href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg',
        'before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:content-[""]',
        ACCENT[caminho.cor],
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {caminho.chamada}
      </p>
      <h3 className="mt-1.5 font-serif text-2xl font-semibold text-foreground">
        {caminho.titulo}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {caminho.descricao}
      </p>
      <ul className="mt-4 flex-1 space-y-1.5">
        {caminho.acoes.map((a) => (
          <li
            key={a}
            className="flex items-start gap-2 text-sm text-foreground/80"
          >
            <span
              className="mt-2 size-1 shrink-0 rounded-full bg-current opacity-50"
              aria-hidden="true"
            />
            {a}
          </li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
        Seguir este caminho <ArrowRight className="size-4" />
      </span>
    </Link>
  )
}
