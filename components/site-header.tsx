'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/data'
import { BrandMark } from '@/components/brand-mark'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-base font-semibold tracking-tight text-foreground">
              Caminhos
            </span>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              de Mambucaba
            </span>
          </span>
        </Link>

        {/* nav desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground',
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground',
                  )}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/monte-seu-caminho"
          className="hidden shrink-0 items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 lg:inline-flex"
        >
          Monte seu Caminho
        </Link>

        {/* botão mobile */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground hover:bg-secondary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* nav mobile */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navegação principal"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-secondary',
                    isActive(link.href) ? 'text-primary' : 'text-foreground',
                  )}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/monte-seu-caminho"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent px-4 py-3 text-center text-base font-semibold text-accent-foreground"
              >
                Monte seu Caminho
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
