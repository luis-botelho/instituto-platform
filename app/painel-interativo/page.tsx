import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { BudgetDashboard } from '@/components/observatorio/budget-dashboard'

export const metadata: Metadata = { title: 'Painel Interativo Orçamentário 2026' }

export default function PainelInterativoPage() {
  return <main>
    <PageHero eyebrow="LOA 2026 em linguagem cidadã" title="Para onde vai o dinheiro público?" description="Explore as ações nominalmente associadas ao Parque Mambucaba e à Vila Histórica. Previsão no orçamento não é gasto realizado." />
    <section className="mx-auto max-w-6xl px-4 py-12"><BudgetDashboard /><div className="mt-10 flex flex-wrap gap-3"><Link href="/relatorio-orcamentario" className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Ler relatório completo</Link><Link href="/demandas" className="rounded-full border px-5 py-3 font-semibold">Registrar pergunta orçamentária</Link></div></section>
  </main>
}
