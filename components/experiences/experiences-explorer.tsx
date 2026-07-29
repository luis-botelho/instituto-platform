'use client'

import { useMemo, useState } from 'react'
import {
  EXPERIENCIAS,
  INTERESSES,
  DURACAO_LABEL,
  type Interesse,
  type Duracao,
  type Formato,
} from '@/lib/data'
import { ExperienceCard } from '@/components/experience-card'
import { cn } from '@/lib/utils'

const DURACOES = Object.keys(DURACAO_LABEL) as Duracao[]
const INTERESSE_KEYS = Object.keys(INTERESSES) as Interesse[]

export function ExperiencesExplorer() {
  const [interesse, setInteresse] = useState<Interesse | null>(null)
  const [duracao, setDuracao] = useState<Duracao | null>(null)
  const [formato, setFormato] = useState<Formato | null>(null)

  const filtradas = useMemo(() => {
    return EXPERIENCIAS.filter((e) => {
      if (interesse && !e.interesses.includes(interesse)) return false
      if (duracao && e.duracao !== duracao) return false
      if (formato && e.formato !== formato) return false
      return true
    })
  }, [interesse, duracao, formato])

  const limpar = () => {
    setInteresse(null)
    setDuracao(null)
    setFormato(null)
  }

  const temFiltro = interesse || duracao || formato

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="flex flex-col gap-5">
          <FilterRow label="Interesse">
            {INTERESSE_KEYS.map((i) => (
              <Chip
                key={i}
                ativo={interesse === i}
                onClick={() => setInteresse(interesse === i ? null : i)}
              >
                {INTERESSES[i]}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Duração">
            {DURACOES.map((d) => (
              <Chip
                key={d}
                ativo={duracao === d}
                onClick={() => setDuracao(duracao === d ? null : d)}
              >
                {DURACAO_LABEL[d]}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Formato">
            {(['livre', 'acompanhada'] as Formato[]).map((f) => (
              <Chip
                key={f}
                ativo={formato === f}
                onClick={() => setFormato(formato === f ? null : f)}
              >
                {f === 'livre' ? 'Livre' : 'Acompanhada'}
              </Chip>
            ))}
          </FilterRow>
        </div>

        {temFiltro && (
          <button
            type="button"
            onClick={limpar}
            className="mt-4 text-sm font-semibold text-primary underline-offset-2 hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <p className="mt-6 text-sm font-medium text-muted-foreground">
        {filtradas.length}{' '}
        {filtradas.length === 1 ? 'experiência' : 'experiências'}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtradas.map((exp) => (
          <ExperienceCard key={exp.slug} exp={exp} />
        ))}
      </div>

      {filtradas.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-serif text-lg text-foreground">
            Nenhuma experiência com esses filtros
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Novas experiências estão em construção. Tente outra combinação.
          </p>
        </div>
      )}
    </div>
  )
}

function FilterRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
        ativo
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-foreground hover:bg-secondary',
      )}
    >
      {children}
    </button>
  )
}
