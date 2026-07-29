'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Search, Phone, Globe, Clock, Accessibility, ArrowRight } from 'lucide-react'
import {
  PONTOS,
  CATEGORIAS,
  type Categoria,
} from '@/lib/data'
import { StatusBadge } from '@/components/status-badge'
import { cn } from '@/lib/utils'

const TerritoryMap = dynamic(() => import('@/components/map/territory-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary/60 text-sm text-muted-foreground">
      Carregando mapa…
    </div>
  ),
})

const CATEGORIA_KEYS = Object.keys(CATEGORIAS) as Categoria[]

export function MapExplorer({ compact = false }: { compact?: boolean }) {
  const [ativas, setAtivas] = useState<Categoria[]>([])
  const [busca, setBusca] = useState('')

  const filtrados = useMemo(() => {
    return PONTOS.filter((p) => {
      const passaCategoria = ativas.length === 0 || ativas.includes(p.categoria)
      const q = busca.trim().toLowerCase()
      const passaBusca =
        q === '' ||
        p.nome.toLowerCase().includes(q) ||
        p.localidade.toLowerCase().includes(q) ||
        p.descricao.toLowerCase().includes(q)
      return passaCategoria && passaBusca
    })
  }, [ativas, busca])

  function toggle(cat: Categoria) {
    setAtivas((a) =>
      a.includes(cat) ? a.filter((x) => x !== cat) : [...a, cat],
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* filtros */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAtivas([])}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              ativas.length === 0
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:bg-secondary',
            )}
          >
            Todos
          </button>
          {CATEGORIA_KEYS.map((cat) => {
            const ativo = ativas.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={ativo}
                onClick={() => toggle(cat)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  ativo
                    ? 'border-transparent text-white'
                    : 'border-border bg-background text-foreground hover:bg-secondary',
                )}
                style={ativo ? { backgroundColor: CATEGORIAS[cat].cor } : undefined}
              >
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: ativo ? '#fff' : CATEGORIAS[cat].cor }}
                  aria-hidden="true"
                />
                {CATEGORIAS[cat].label}
              </button>
            )
          })}
        </div>

        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar lugar ou localidade"
            aria-label="Buscar no território"
            className="w-full rounded-full border border-border bg-background py-2.5 pl-9 pr-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* mapa */}
        <div
          className={cn(
            'overflow-hidden rounded-2xl border border-border',
            compact ? 'h-[380px]' : 'h-[420px] lg:h-[600px]',
          )}
        >
          <TerritoryMap pontos={filtrados} />
        </div>

        {/* lista */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              {filtrados.length}{' '}
              {filtrados.length === 1 ? 'ponto encontrado' : 'pontos encontrados'}
            </p>
            <Link
              href="/participar"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              Indicar um lugar <ArrowRight className="size-4" />
            </Link>
          </div>

          <ul className="flex max-h-[540px] flex-col gap-3 overflow-y-auto pr-1">
            {filtrados.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="text-[0.65rem] font-semibold uppercase tracking-wide"
                      style={{ color: CATEGORIAS[p.categoria].cor }}
                    >
                      {CATEGORIAS[p.categoria].label}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {p.nome}
                    </h3>
                    <p className="text-xs text-muted-foreground">{p.localidade}</p>
                  </div>
                  <span
                    className="mt-1 size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: CATEGORIAS[p.categoria].cor }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.descricao}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  {p.horario && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" /> {p.horario}
                    </span>
                  )}
                  {p.acessibilidade && (
                    <span className="inline-flex items-center gap-1">
                      <Accessibility className="size-3.5" /> {p.acessibilidade}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {p.whatsapp && (
                    <a
                      href={p.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
                    >
                      <Phone className="size-3.5" /> WhatsApp
                    </a>
                  )}
                  {p.site && (
                    <a
                      href={p.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
                    >
                      <Globe className="size-3.5" /> Site
                    </a>
                  )}
                  <StatusBadge status={p.status} className="ml-auto" />
                </div>
              </li>
            ))}
            {filtrados.length === 0 && (
              <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Nenhum ponto encontrado com esses filtros.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
