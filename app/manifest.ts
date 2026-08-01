import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Caminhos de Mambucaba', short_name: 'Caminhos',
    description: 'Plataforma territorial para descobrir, participar e acompanhar Mambucaba.',
    start_url: '/', display: 'standalone', background_color: '#fffaf0',
    theme_color: '#3f6b4a', lang: 'pt-BR',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
