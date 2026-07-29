import type { Metadata } from 'next'
import { BarChart3, FileText, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { INDICADORES, PUBLICACOES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Observatório | Caminhos de Mambucaba',
  description:
    'Central de Inteligência Territorial de Mambucaba: dados, escutas, indicadores e pesquisas para apoiar decisões de quem planeja e atua no território.',
}

const PUBLICOS = [
  {
    titulo: 'Universidades e pesquisa',
    texto:
      'Acesso a diagnósticos, escutas e dados territoriais para pesquisa aplicada e extensão.',
  },
  {
    titulo: 'Poder público',
    texto:
      'Indicadores e leituras do território para apoiar políticas de turismo, cultura e economia local.',
  },
  {
    titulo: 'Organizações e financiadores',
    texto:
      'Evidências sobre o impacto do turismo de base comunitária e a circulação econômica local.',
  },
]

export default function ObservatorioPage() {
  return (
    <main id="conteudo">
        <PageHero
          eyebrow="Central de Inteligência Territorial"
          title="O território que se conhece, se transforma"
          description="O Observatório organiza dados, escutas e pesquisas sobre Mambucaba. É a camada de inteligência que conecta comunidade, iniciativas e instituições em torno de decisões mais justas para o território."
        />

        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <BarChart3 className="size-5" />
              </span>
              <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                Panorama do território
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {INDICADORES.map((ind) => (
                <div
                  key={ind.rotulo}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <p className="font-serif text-4xl font-semibold text-primary">{ind.valor}</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">{ind.rotulo}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {ind.descricao}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Números demonstrativos, apresentados para ilustrar o painel de indicadores. Serão
              substituídos por dados reais à medida que as escutas e cadastros avançarem.
            </p>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-river/15 text-river">
                <FileText className="size-5" />
              </span>
              <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                Publicações e pesquisas
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {PUBLICACOES.map((pub) => (
                <article
                  key={pub.titulo}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
                >
                  <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {pub.tipo}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-foreground text-balance">
                    {pub.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pub.resumo}</p>
                  <div className="mt-auto pt-2">
                    <StatusBadge status={pub.status} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Para quem constrói o território
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
              O Observatório é um espaço de cooperação. Se você pesquisa, gere políticas ou apoia
              iniciativas no território, há caminhos para atuar em conjunto.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {PUBLICOS.map((p) => (
                <div key={p.titulo} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{p.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild className="rounded-full">
                <a href="/participar">
                  Propor uma cooperação
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
  )
}
