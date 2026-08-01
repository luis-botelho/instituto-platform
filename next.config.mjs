/** @type {import('next').NextConfig} */
const isGitHubPages =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github-pages'

const nextConfig = {
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
