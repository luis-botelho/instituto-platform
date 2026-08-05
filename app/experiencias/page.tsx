import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ExperiencesExplorer } from '@/components/experiences/experiences-explorer'

export const metadata: Metadata = { title: 'Experiências em Mambucaba', description: 'Explore cultura, natureza, memória e gastronomia em experiências territoriais construídas com a comunidade de Mambucaba.', alternates: { canonical: '/experiencias' } }

export default function ExperienciasPage() {
  return <main><PageHero eyebrow="Experiências territoriais" title="Caminhos que revelam o território" description="Filtre por interesse, duração e formato para encontrar uma experiência que combine com você." /><ExperiencesExplorer /></main>
}
