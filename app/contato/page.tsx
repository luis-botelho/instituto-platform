import type { Metadata } from 'next'
import { AtSign, ExternalLink, Landmark, MessageSquareText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = { title: 'Contato e canais oficiais' }

const channels = [
  { title: 'Falar com o Observatório', description: 'Acompanhe o trabalho e envie uma mensagem pelo Instagram.', href: 'https://www.instagram.com/observatoriomambucaba', icon: AtSign },
  { title: 'Registrar uma demanda', description: 'Organize um relato e envie uma cópia ao Observatório.', href: '/demandas', icon: MessageSquareText },
  { title: 'Ouvidoria Municipal / SIC', description: 'Protocole manifestações que precisam produzir efeito administrativo.', href: 'https://transparencia.angra.rj.gov.br/ouvidoria', icon: Landmark },
  { title: 'Defesa Civil de Angra', description: 'Use o canal oficial para prevenção, risco e ocorrências de defesa civil.', href: 'https://angra.rj.gov.br/secretarias/secretaria-de-protecao-e-defesa-civil/fale-conosco', icon: Landmark },
]

export default function ContatoPage() {
  return <main><PageHero eyebrow="Contato" title="Observatório e canais institucionais" description="Escolha o canal adequado. O Observatório organiza informação e participação, mas não substitui órgãos públicos ou serviços de emergência." /><section className="mx-auto grid max-w-5xl gap-5 px-4 py-12 sm:grid-cols-2">{channels.map(({ title, description, href, icon: Icon }) => <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="group rounded-2xl border bg-card p-6 transition hover:border-primary"><Icon className="size-6 text-primary" /><h2 className="mt-4 font-serif text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Abrir canal <ExternalLink className="size-4" /></span></a>)}</section></main>
}
