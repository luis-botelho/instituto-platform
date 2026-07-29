import { HomeHero } from '@/components/home/hero'
import {
  DiferencaSection,
  QuatroCaminhosSection,
  VisaoTerritorioSection,
  ExperienciasDestaqueSection,
  MapaConviteSection,
  ParticiparObservatorioSection,
} from '@/components/home/sections'

export default function HomePage() {
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
