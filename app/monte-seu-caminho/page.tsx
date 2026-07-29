import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { MonteCaminho } from '@/components/quiz/monte-caminho'

export const metadata: Metadata = {
  title: 'Monte seu Caminho',
  description:
    'Responda algumas perguntas rápidas e receba sugestões de experiências para viver Mambucaba do seu jeito.',
}

export default function MonteSeuCaminhoPage() {
  return (
    <main>
      <PageHero
        eyebrow="Viva Mambucaba do seu jeito"
        title="Monte seu Caminho"
        description="Responda perguntas rápidas sobre quem você é, quanto tempo tem e o que procura. A partir das suas respostas, sugerimos caminhos e experiências no território."
      />
      <MonteCaminho />
    </main>
  )
}
