import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, MapPin, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { HOSPEDAGENS } from '@/lib/data'
import { withBasePath } from '@/lib/paths'

export const metadata: Metadata = {
  title: 'Onde se hospedar | Caminhos de Mambucaba',
  description:
    'Pousadas, casas de temporada e hospedagens de base local no território de Mambucaba, no eixo Angra dos Reis – Paraty.',
}

export default function HospedarPage() {
  return (
    <>
      <main id="conteudo">
        <PageHero
          eyebrow="Onde dormir"
          title="Hospedagens que sustentam o território"
          description="Dormir no território é parte da experiência. Priorizamos hospedagens de base local, que mantêm a renda circulando entre quem vive e cuida de Mambucaba."
        />

        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="overflow-hidden rounded-2xl border border-border bg-background md:grid md:grid-cols-2">
              <div className="relative min-h-64 md:min-h-full">
                <Image
                  src={withBasePath('/images/hospedar.png')}
                  alt="Varanda de pousada com rede, cercada pela mata, com vista para o mar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground text-balance md:text-3xl">
                  Hospedagem como parte do caminho
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  Ao escolher uma hospedagem local, o visitante fortalece a economia do território e
                  vive Mambucaba de dentro. Este catálogo está em construção junto às iniciativas.
                </p>
                <div>
                  <Link
                    href="/participar"
                    className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                  >
                    Cadastrar minha hospedagem
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-river/15 text-river">
                <BedDouble className="size-5" />
              </span>
              <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                Hospedagens do território
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HOSPEDAGENS.map((h) => (
                <article
                  key={h.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-foreground text-balance">
                        {h.nome}
                      </h3>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {h.localidade}
                      </p>
                    </div>
                    <span
                      aria-label={`Faixa de preço ${h.faixa}`}
                      className="rounded-full bg-secondary px-2.5 py-1 text-sm font-medium text-secondary-foreground"
                    >
                      {h.faixa}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">{h.descricao}</p>

                  <div className="mt-auto flex flex-col gap-3 pt-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {h.tipo}
                    </span>
                    <div className="flex items-center justify-between gap-3">
                      <StatusBadge status={h.status} />
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full border-river/40 text-river hover:bg-river/10 hover:text-river"
                      >
                        <a href={h.contato} target="_blank" rel="noopener noreferrer">
                          Contato
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              As hospedagens listadas são demonstrativas e servem para ilustrar o funcionamento da
              plataforma. Contatos e disponibilidade serão validados junto às iniciativas locais.
            </p>
          </div>
        </section>
      </main>
      
    </>
  )
}
