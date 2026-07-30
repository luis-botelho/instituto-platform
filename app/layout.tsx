import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Source_Sans_3, Fraunces } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
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
  title: {
    default: 'Caminhos de Mambucaba — Plataforma Territorial',
    template: '%s · Caminhos de Mambucaba',
  },
  description:
    'Uma plataforma territorial de descoberta, conexão e construção de experiências. No Google você encontra um lugar. No Caminhos, encontra uma forma de viver o território.',
  generator: 'v0.app',
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
  return (
    <html lang="pt-BR" className={`light ${sourceSans.variable} ${fraunces.variable} bg-background`}>
      <body className="min-h-screen font-sans antialiased">
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
