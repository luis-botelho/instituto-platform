import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Source_Sans_3, Fraunces } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Caminhos de Mambucaba | Plataforma Territorial',
    template: '%s · Caminhos de Mambucaba',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ['Mambucaba', 'Angra dos Reis', 'turismo de base comunitária', 'território', 'Observatório Mambucaba', 'participação cidadã', 'cultura caiçara'],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'community',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website', locale: siteConfig.locale, url: siteConfig.url,
    siteName: siteConfig.name, title: 'Caminhos de Mambucaba | Plataforma Territorial',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image', title: 'Caminhos de Mambucaba | Plataforma Territorial',
    description: siteConfig.description,
  },
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#3f6b4a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.name,
    alternateName: siteConfig.shortName, url: siteConfig.url,
    description: siteConfig.description, inLanguage: 'pt-BR', sameAs: [siteConfig.instagram],
  }

  return (
    <html lang="pt-BR" className={`light ${sourceSans.variable} ${fraunces.variable} bg-background`}>
      <body className="min-h-screen font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' &&
          process.env.NEXT_PUBLIC_DEPLOY_TARGET !== 'github-pages' && (
            <Analytics />
          )}
      </body>
    </html>
  )
}
