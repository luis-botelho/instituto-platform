import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ObservatoryTool } from '@/lib/observatorio-data'

const tones = {
  primary: 'bg-primary/10 text-primary',
  river: 'bg-river/10 text-river',
  accent: 'bg-accent/10 text-accent',
}

export function ObservatoryToolCard({ tool }: { tool: ObservatoryTool }) {
  const Icon = tool.icon
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
      <span className={`flex size-11 items-center justify-center rounded-xl ${tones[tool.tone]}`}><Icon className="size-5" /></span>
      <h3 className="mt-5 font-serif text-xl font-semibold">{tool.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
      <Link href={tool.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">{tool.label}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
    </article>
  )
}
