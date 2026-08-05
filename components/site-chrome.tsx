'use client'

import { usePathname } from 'next/navigation'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isGateway = pathname === '/'

  return (
    <>
      {!isGateway && <SiteHeader />}
      <div id="conteudo-principal">{children}</div>
      {!isGateway && <SiteFooter />}
    </>
  )
}
