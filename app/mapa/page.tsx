import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { MapExplorer } from '@/components/map/map-explorer'

export const metadata: Metadata = {
  title: 'Mapa Territorial',
  description:
    'O catálogo público do território: onde comer, se hospedar, o que conhecer e fazer, e serviços de apoio.',
}

export default function MapaPage() {
  return (
    <main>
      <PageHero
        eyebrow="Mapa territorial"
        title="O território, ponto a ponto"
        description="O mapa é o catálogo público de Mambucaba. Filtre por categoria, busque por localidade e conecte cada ponto às experiências. Uma rota conecta lugares — o Caminhos conecta a rota ao território."
      />
      <MapExplorer />
    </main>
  )
}
