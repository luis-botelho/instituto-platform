import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Política de Cookies · Caminhos de Mambucaba',
  description:
    'Saiba como o Observatório Mambucaba utiliza cookies e tecnologias semelhantes no portal.',
}

const SECTIONS = [
  {
    n: '1',
    title: 'O que são cookies?',
    content: (
      <p>
        Cookies são pequenos arquivos armazenados no navegador do usuário quando ele visita um
        site. Eles servem para lembrar preferências, melhorar a navegação, proteger o sistema
        contra abusos, gerar estatísticas e permitir o funcionamento adequado de determinadas
        funcionalidades.
      </p>
    ),
  },
  {
    n: '2',
    title: 'Por que usamos cookies?',
    content: (
      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>Garantir o funcionamento correto do portal;</li>
        <li>Lembrar preferências do usuário;</li>
        <li>Melhorar a experiência de navegação;</li>
        <li>Identificar falhas e problemas técnicos;</li>
        <li>Gerar estatísticas de acesso;</li>
        <li>Proteger formulários contra spam e ataques automatizados;</li>
        <li>Integrar ferramentas externas utilizadas pelo Observatório.</li>
      </ul>
    ),
  },
  {
    n: '3',
    title: 'Tipos de cookies utilizados',
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground">Cookies necessários</h3>
          <p className="text-sm text-muted-foreground">
            Essenciais para o funcionamento do site. Sem eles, determinadas páginas ou
            funcionalidades podem não funcionar corretamente.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Cookies de preferência</h3>
          <p className="text-sm text-muted-foreground">
            Permitem lembrar escolhas realizadas pelo usuário, como aceitação de cookies ou
            preferências de navegação.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Cookies estatísticos</h3>
          <p className="text-sm text-muted-foreground">
            Utilizados para compreender como os visitantes utilizam o portal. Essas informações
            ajudam a melhorar conteúdos, páginas e ferramentas.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Cookies de segurança</h3>
          <p className="text-sm text-muted-foreground">
            Utilizados para proteger o portal contra ataques, tentativas de invasão e uso abusivo
            dos formulários.
          </p>
        </div>
      </div>
    ),
  },
  {
    n: '4',
    title: 'Ferramentas que podem utilizar cookies',
    content: (
      <>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>WordPress;</li>
          <li>Google Maps;</li>
          <li>Plugins de formulários;</li>
          <li>Plugins de segurança;</li>
          <li>Ferramentas estatísticas;</li>
          <li>Serviços incorporados de terceiros.</li>
        </ul>
        <div className="mt-4 rounded-xl border-l-4 border-accent bg-secondary/50 p-4 text-sm">
          <strong className="text-foreground">Atenção:</strong>
          <p className="mt-1 text-muted-foreground">
            Quando o usuário acessar conteúdos incorporados de terceiros, como mapas ou serviços
            externos, esses serviços poderão utilizar seus próprios cookies conforme suas
            respectivas políticas.
          </p>
        </div>
      </>
    ),
  },
  {
    n: '5',
    title: 'Consentimento',
    content: (
      <>
        <p>
          Sempre que aplicável, o usuário poderá aceitar, rejeitar ou configurar os cookies
          utilizados pelo portal. A recusa de determinados cookies pode limitar algumas
          funcionalidades, mas não deve impedir o acesso ao conteúdo principal do Observatório.
        </p>
        <div className="mt-4 rounded-xl border-l-4 border-primary bg-secondary/50 p-4 text-sm">
          <strong className="text-foreground">Boas práticas adotadas pelo Observatório:</strong>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Transparência sobre uso de cookies;</li>
            <li>Respeito à privacidade dos usuários;</li>
            <li>Uso mínimo necessário;</li>
            <li>Finalidade legítima e institucional.</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    n: '6',
    title: 'Como gerenciar cookies?',
    content: (
      <>
        <p>O usuário pode controlar cookies diretamente pelo navegador utilizado. A maioria dos navegadores permite:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Visualizar cookies armazenados;</li>
          <li>Excluir cookies existentes;</li>
          <li>Bloquear cookies futuros;</li>
          <li>Receber avisos antes da criação de cookies.</li>
        </ul>
      </>
    ),
  },
  {
    n: '7',
    title: 'Alterações nesta Política',
    content: (
      <p>
        Esta Política de Cookies poderá ser atualizada periodicamente para refletir mudanças
        tecnológicas, legais ou institucionais. A versão mais recente estará sempre disponível no
        portal do Observatório Mambucaba.
      </p>
    ),
  },
]

export default function PoliticaCookiesPage() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="Transparência"
        title="Política de Cookies"
        description="Como o Observatório Mambucaba utiliza cookies e tecnologias semelhantes para melhorar a experiência dos usuários e garantir o funcionamento do portal."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <div className="space-y-8">
            {SECTIONS.map((s) => (
              <article
                key={s.n}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="font-serif text-3xl font-semibold text-primary">
                  {s.n.padStart(2, '0')}
                </span>
                <h2 className="mt-2 font-serif text-xl font-semibold text-foreground">
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.content}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-secondary/50 p-6 text-center">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Páginas relacionadas
            </h3>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/politica-privacidade" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Termos de Uso
              </Link>
              <Link href="/politica-ia" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Política de IA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
