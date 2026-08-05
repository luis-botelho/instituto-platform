import type { Metadata } from 'next'
import { HomeHero } from '@/components/home/hero'
import {
  DiferencaSection,
  QuatroCaminhosSection,
  VisaoTerritorioSection,
  ExperienciasDestaqueSection,
  MapaConviteSection,
  ParticiparObservatorioSection,
} from '@/components/home/sections'

export const metadata: Metadata = {
  title: 'Caminhos de Mambucaba',
  description:
    'Descubra o território de Mambucaba por suas experiências, histórias, iniciativas e paisagens.',
  alternates: { canonical: '/caminhos' },
}

export default function CaminhosPage() {
  return (
    <main>
      <HomeHero />
      <DiferencaSection />
      <QuatroCaminhosSection />
      <VisaoTerritorioSection />
      <ExperienciasDestaqueSection />
      <MapaConviteSection />
      <ParticiparObservatorioSection />
    </main>
  )
}
