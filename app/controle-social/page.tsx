import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { FeamExplorer } from '@/components/observatorio/feam-explorer'

export const metadata: Metadata = { title: 'Controle Social FEAM' }
export default function ControleSocialPage() {
  return <main><PageHero eyebrow="Auditoria documental cidadã" title="Hospital de Praia Brava / FEAM" description="Uma matriz para navegar por riscos, instrumentos, evidências e perguntas — sem substituir auditoria oficial ou afirmar irregularidades sem apuração." /><section className="mx-auto max-w-6xl px-4 py-12"><div className="mb-8 grid gap-4 md:grid-cols-3">{[['5','eixos de análise'],['4','achados prioritários'],['37,5%','referência histórica de leitos SUS*']].map(([v,l]) => <div key={l} className="rounded-2xl border bg-card p-6"><p className="font-serif text-3xl font-semibold text-primary">{v}</p><p className="mt-1 text-sm text-muted-foreground">{l}</p></div>)}</div><FeamExplorer /><div className="mt-8 rounded-2xl border-l-4 border-accent bg-secondary/50 p-6"><h2 className="font-serif text-xl font-semibold">Nota metodológica</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">* O percentual reproduz a referência registrada no material anterior e precisa ser reconfirmado por competência no CNES. Um achado indica necessidade de verificação; não equivale, sozinho, a conclusão de ilegalidade.</p><a href="https://cnes.datasus.gov.br/" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">Consultar CNES oficial <ExternalLink className="size-4" /></a></div></section></main>
}
