'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { FEAM_FINDINGS } from '@/lib/observatorio-data'

export function FeamExplorer() {
  const [filter, setFilter] = useState('Todos')
  const [query, setQuery] = useState('')
  const categories = ['Todos', ...new Set(FEAM_FINDINGS.map((item) => item.category))]
  const items = useMemo(() => FEAM_FINDINGS.filter((item) => (filter === 'Todos' || item.category === filter) && `${item.title} ${item.evidence} ${item.instrument}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  return <div>
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between"><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === item ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>{item}</button>)}</div><label className="relative"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="rounded-full border bg-background py-2 pl-9 pr-3 text-sm" placeholder="Buscar evidência" /></label></div>
    <div className="mt-5 grid gap-4">{items.map((item) => <article key={item.title} className="rounded-2xl border bg-card p-6"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.level === 'Crítico' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{item.level}</span><span className="rounded-full bg-secondary px-3 py-1 text-xs">{item.category}</span><span className="text-xs text-muted-foreground">{item.instrument}</span></div><h3 className="mt-4 font-serif text-xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.evidence}</p><div className="mt-4 rounded-xl border-l-4 border-accent bg-secondary/40 p-4"><strong className="text-sm">Pergunta de controle social</strong><p className="mt-1 text-sm">{item.question}</p></div></article>)}</div>
  </div>
}
