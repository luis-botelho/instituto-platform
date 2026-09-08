import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Caminhos de Mambucaba', short_name: 'Caminhos',
    description: 'Território, comunidade e experiências em Mambucaba.',
    start_url: '/', display: 'standalone', background_color: '#f6f0e4',
    theme_color: '#0e4a30', lang: 'pt-BR',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
