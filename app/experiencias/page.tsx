import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
// import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { ExperiencesExplorer } from '@/components/experiences/experiences-explorer'

export const metadata: Metadata = {
  title: 'Experiências | Caminhos de Mambucaba',
  description:
    'Caminhos que combinam natureza, história, cultura, memória e gastronomia — experiências territoriais em construção com quem vive Mambucaba.',
}

export default function ExperienciasPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <PageHero
          eyebrow="Experiências territoriais"
          title="Caminhos que revelam o território"
          description="Cada experiência combina lugares, iniciativas e narrativas em um percurso com sentido. Não são pacotes prontos: são convites para viver Mambucaba a partir de quem o constrói."
        />
        <ExperiencesExplorer />
      </main>
      {/* <SiteFooter /> */}
    </>
  )
}
