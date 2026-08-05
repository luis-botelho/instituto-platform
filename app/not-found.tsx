import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-accent">Erro 404</p>
      <h1 className="mt-3 text-balance font-serif text-4xl font-semibold">Este caminho não foi encontrado</h1>
      <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
        O endereço pode ter mudado. Volte ao início ou explore as experiências e iniciativas de Mambucaba.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Voltar ao início</Link>
        <Link href="/caminhos" className="rounded-full border border-border bg-background px-5 py-3 font-semibold">Conhecer os Caminhos</Link>
      </div>
    </main>
  )
}
