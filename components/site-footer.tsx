import Link from 'next/link'
import { NAV_LINKS } from '@/lib/data'
import { BrandMark } from '@/components/brand-mark'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-10 w-10" />
            <span className="font-serif text-lg font-semibold">
              Caminhos de Mambucaba
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/80">
            Uma plataforma territorial de descoberta, conexão e construção de
            experiências. Um programa do Observatório Mambucaba, primeiro núcleo
            do ICPT — Instituto Cidadania e Políticas Territoriais.
          </p>
          <p className="mt-6 font-serif text-base italic text-primary-foreground/90">
            &ldquo;O território começa por quem o vive.&rdquo;
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
            Navegação
          </h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-primary-foreground/85 underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
            Participe
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/85">
            <li>
              <Link href="/participar" className="underline-offset-4 hover:underline">
                Cadastrar iniciativa
              </Link>
            </li>
            <li>
              <Link href="/participar" className="underline-offset-4 hover:underline">
                Indicar um lugar
              </Link>
            </li>
            <li>
              <Link href="/participar" className="underline-offset-4 hover:underline">
                Propor experiência
              </Link>
            </li>
            <li>
              <Link href="/observatorio" className="underline-offset-4 hover:underline">
                Falar com o Observatório
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Caminhos de Mambucaba · Observatório Mambucaba / ICPT</p>
          <p>Conteúdo demonstrativo — protótipo em construção.</p>
        </div>
      </div>
    </footer>
  )
}
