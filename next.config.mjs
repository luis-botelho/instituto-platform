/** @type {import('next').NextConfig} */
const isGitHubPages =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github-pages'

const nextConfig = {
  async redirects() {
    if (isGitHubPages) return []
    return [
      { source: '/cadastro', destination: '/participar', permanent: true },
      { source: '/observatorio-mambucaba', destination: '/observatorio', permanent: true },
      { source: '/conhecer-o-programa', destination: '/conhecer', permanent: true },
      { source: '/controle-social-hospital-de-praia-brava-feam', destination: '/controle-social', permanent: true },
      { source: '/saude-em-mambucaba-a-voz-dos-moradores', destination: '/saude', permanent: true },
      { source: '/metodologia-do-registro-de-demandas', destination: '/metodologia', permanent: true },
      { source: '/sobre-o-observatorio-3', destination: '/sobre', permanent: true },
      { source: '/politica-de-privacidade', destination: '/politica-privacidade', permanent: true },
      { source: '/politica-de-cookies', destination: '/politica-cookies', permanent: true },
      { source: '/politica-de-uso-da-inteligencia-artificial', destination: '/politica-ia', permanent: true },
      { source: '/termos-de-uso', destination: '/termos-uso', permanent: true },
      { source: '/594-2', destination: '/radar', permanent: true },
    ]
  },
  output: isGitHubPages ? 'export' : undefined,
  trailingSlash: isGitHubPages,
  basePath: isGitHubPages ? '/instituto-platform' : '',
  assetPrefix: isGitHubPages ? '/instituto-platform/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? '/instituto-platform' : '',
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
