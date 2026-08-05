import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Saiba quais tecnologias de medição e serviços externos são usados no Caminhos de Mambucaba.',
  alternates: { canonical: '/politica-cookies' },
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
    title: 'O que este site usa atualmente?',
    content: (
      <div className="space-y-3">
        <p>
          O portal usa o Vercel Web Analytics para medir visualizações de páginas em produção. A
          ferramenta é de primeira parte e foi projetada para funcionar sem cookies de rastreamento
          e sem acompanhar uma pessoa entre sites diferentes.
        </p>
        <p>
          O código atual não grava cookies próprios de publicidade, personalização ou autenticação.
          Por isso, não exibimos uma faixa de consentimento sem finalidade real. Esta página será
          atualizada antes da ativação de qualquer nova tecnologia que altere esse cenário.
        </p>
      </div>
    ),
  },
  {
    n: '3',
    title: 'Categorias e finalidades',
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground">Funcionamento e segurança</h3>
          <p className="text-sm text-muted-foreground">
            A hospedagem e os formulários podem processar dados técnicos necessários para entregar
            páginas, receber envios autorizados e proteger a infraestrutura. Isso não equivale ao
            uso de cookies publicitários.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Medição de audiência sem cookies</h3>
          <p className="text-sm text-muted-foreground">
            O Vercel Web Analytics registra dados agregados de acesso para ajudar a entender quais
            páginas são visitadas e identificar melhorias, sem criar perfis publicitários.
          </p>
        </div>
      </div>
    ),
  },
  {
    n: '4',
    title: 'Links e serviços de terceiros',
    content: (
      <>
        <p>
          O portal contém links para serviços externos, como Instagram, Google Maps, Google Forms
          e canais públicos. Esses serviços são abertos somente quando o usuário escolhe acessar o
          link e possuem políticas próprias.
        </p>
        <div className="mt-4 rounded-xl border-l-4 border-accent bg-secondary/50 p-4 text-sm">
          <strong className="text-foreground">Atenção:</strong>
          <p className="mt-1 text-muted-foreground">
            Ao sair deste domínio, o serviço de destino poderá usar cookies ou outras tecnologias
            conforme a política dele. O Caminhos de Mambucaba não controla esse tratamento externo.
          </p>
        </div>
      </>
    ),
  },
  {
    n: '5',
    title: 'Quando pediremos consentimento?',
    content: (
      <>
        <p>
          Se o portal passar a usar cookies não essenciais ou incorporar uma ferramenta que dependa
          de consentimento, ela deverá permanecer desativada até que a pessoa possa aceitar ou
          rejeitar a categoria correspondente. A navegação principal não dependerá dessa escolha.
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
    title: 'Como controlar dados no navegador?',
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
        description="Quais tecnologias de medição o portal usa hoje, quando o consentimento seria necessário e como serviços externos tratam seus próprios dados."
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
