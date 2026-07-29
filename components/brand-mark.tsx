import { cn } from '@/lib/utils'

/**
 * Marca territorial do Caminhos de Mambucaba.
 * Traço que sugere serra, rio/caminho e mar — origem e pertencimento.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label="Caminhos de Mambucaba"
      className={cn('h-9 w-9', className)}
    >
      <circle cx="20" cy="20" r="19" className="fill-primary" />
      {/* serra */}
      <path
        d="M6 25l6-9 4 5 5-8 5 7 3-4 5 6"
        fill="none"
        stroke="var(--color-sand)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {/* caminho / rio */}
      <path
        d="M8 32c5 0 5-4 10-4s5 4 10 4 5-4 8-4"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="15" r="2.4" className="fill-background" />
    </svg>
  )
}
