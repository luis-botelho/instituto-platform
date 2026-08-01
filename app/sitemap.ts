import type { MetadataRoute } from 'next'
import { EXPERIENCIAS } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'

const routes = ['', '/conhecer', '/visitar', '/experiencias', '/mapa', '/hospedar', '/monte-seu-caminho', '/participar', '/observatorio', '/demandas', '/painel-interativo', '/controle-social', '/controle-social/experiencias', '/saude', '/radar', '/publicacoes', '/relatorio-orcamentario', '/metodologia', '/sobre', '/contato', '/politica-privacidade', '/politica-cookies', '/politica-ia', '/termos-uso']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const staticPages = routes.map((route) => ({
    url: `${siteConfig.url}${route}`, lastModified,
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : route === '/observatorio' ? 0.9 : 0.7,
  }))
  const experiences = EXPERIENCIAS.map(({ slug }) => ({
    url: `${siteConfig.url}/experiencias/${slug}`, lastModified,
    changeFrequency: 'monthly' as const, priority: 0.7,
  }))
  return [...staticPages, ...experiences]
}
