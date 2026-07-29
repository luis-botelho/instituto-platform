import type { ReactNode } from 'react'

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}
