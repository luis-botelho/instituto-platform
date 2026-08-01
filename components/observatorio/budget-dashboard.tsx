'use client'

import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const actions = [
  { category: 'Saneamento', title: 'Sistema de esgotamento sanitário', place: 'Parque Mambucaba', value: 2_005_000, detail: 'Acompanhar licitação, contrato, empenho, liquidação, pagamento e entrega efetiva.' },
  { category: 'Cultura', title: 'Implantação de polo cultural', place: 'Vila Histórica de Mambucaba', value: 1_250_000, detail: 'Verificar projeto, órgão executor, contrato, cronograma e participação comunitária.' },
  { category: 'Infraestrutura', title: 'Pavimentação da Rua da Praia', place: 'Vila Histórica de Mambucaba', value: 694_000, detail: 'Acompanhar edital, contrato, medições, acessibilidade e pagamento.' },
  { category: 'Drenagem', title: 'Drenagem pluvial e pavimentação', place: 'Parque Mambucaba', value: 180_000, detail: 'Identificar ruas contempladas e confrontar o valor com o histórico de enchentes e alagamentos.' },
] as const

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function BudgetDashboard() {
  const [category, setCategory] = useState('Todas')
  const [open, setOpen] = useState<string | null>(actions[0].title)
  const categories = ['Todas', ...new Set(actions.map((action) => action.category))]
  const filtered = useMemo(() => category === 'Todas' ? actions : actions.filter((action) => action.category === category), [category])
  const max = Math.max(...actions.map((action) => action.value))
  const localized = actions.reduce((total, action) => total + action.value, 0)

  return <div>
    <div className="grid gap-4 md:grid-cols-3">
      <article className="rounded-2xl border bg-card p-6"><p className="text-sm text-muted-foreground">LOA municipal 2026</p><p className="mt-2 font-serif text-3xl font-semibold">R$ 2,65 bi</p></article>
      <article className="rounded-2xl border bg-card p-6"><p className="text-sm text-muted-foreground">Ações nominalmente localizadas</p><p className="mt-2 font-serif text-3xl font-semibold text-primary">{money.format(localized)}</p></article>
      <article className="rounded-2xl border bg-card p-6"><p className="text-sm text-muted-foreground">Participação no orçamento total</p><p className="mt-2 font-serif text-3xl font-semibold">0,16%</p></article>
    </div>
    <div className="mt-8 flex flex-wrap gap-2" aria-label="Filtrar ações por tema">
      {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>{item}</button>)}
    </div>
    <div className="mt-6 space-y-4">
      {filtered.map((action) => <article key={action.title} className="rounded-2xl border bg-card p-5">
        <button className="w-full text-left" onClick={() => setOpen(open === action.title ? null : action.title)} aria-expanded={open === action.title}>
          <span className="flex items-start justify-between gap-4"><span><span className="text-xs font-bold uppercase tracking-wide text-primary">{action.category} · {action.place}</span><strong className="mt-1 block font-serif text-xl">{action.title}</strong></span><span className="flex shrink-0 items-center gap-2 font-semibold">{money.format(action.value)}<ChevronDown className={`size-4 transition ${open === action.title ? 'rotate-180' : ''}`} /></span></span>
          <span className="mt-4 block h-3 overflow-hidden rounded-full bg-secondary"><span className="block h-full rounded-full bg-accent" style={{ width: `${(action.value / max) * 100}%` }} /></span>
        </button>
        {open === action.title && <div className="mt-4 border-t pt-4 text-sm leading-relaxed text-muted-foreground"><p>{action.detail}</p><p className="mt-2 font-semibold text-foreground">Previsão orçamentária não significa gasto realizado.</p></div>}
      </article>)}
    </div>
  </div>
}
