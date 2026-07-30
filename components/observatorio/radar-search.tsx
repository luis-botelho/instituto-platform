'use client'

import { useMemo, useState } from 'react'
import { ExternalLink, Search } from 'lucide-react'
import { OFFICIAL_SOURCES } from '@/lib/observatorio-data'

export function RadarSearch() {
  const [query, setQuery] = useState('')
  const links = useMemo(() => OFFICIAL_SOURCES.map((source) => ({
    ...source,
    url: `https://www.google.com/search?q=${encodeURIComponent(`site:${source.domain} ${'suffix' in source ? source.suffix : ''} ${query} Mambucaba`)}`,
  })), [query])
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <label className="text-sm font-semibold">O que você quer investigar?</label>
      <div className="mt-2 flex gap-2"><div className="relative flex-1"><Search className="absolute left-3 top-3 size-5 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border bg-background py-2.5 pl-10 pr-3 outline-none focus:border-primary" placeholder="Ex.: drenagem, contrato hospital, transporte escolar" /></div></div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">O Radar cria pesquisas restritas a domínios oficiais. Os resultados abrem em nova aba e devem ser conferidos no documento original.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {links.map((source) => <a key={source.name} href={query.trim() ? source.url : undefined} target="_blank" rel="noreferrer" aria-disabled={!query.trim()} className={`rounded-xl border p-4 transition ${query.trim() ? 'hover:border-primary hover:bg-primary/5' : 'pointer-events-none opacity-45'}`}><span className="flex items-center justify-between gap-3 font-semibold">{source.name}<ExternalLink className="size-4" /></span><span className="mt-1 block text-xs text-muted-foreground">{source.description}</span></a>)}
      </div>
    </div>
  )
}
