import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'O Programa',
  description:
    'Conheça o Caminhos de Mambucaba, programa de desenvolvimento territorial por meio do turismo de base comunitária.',
}

const EIXOS = [
  ['01', 'Território e identidade', 'Mapeamento, memória, patrimônio, cultura, paisagem e reconhecimento das identidades locais.'],
  ['02', 'Experiências e roteiros', 'Desenvolvimento de percursos, vivências, atividades e produtos turísticos comunitários.'],
  ['03', 'Empreendedorismo local', 'Fortalecimento de hospedagens, gastronomia, comércio, artesanato, serviços e produção local.'],
  ['04', 'Formação e qualificação', 'Capacitações para atendimento, gestão, comunicação, hospitalidade e desenvolvimento de experiências.'],
  ['05', 'Promoção e comunicação', 'Divulgação do território, das iniciativas, das experiências e das oportunidades existentes.'],
  ['06', 'Inteligência territorial', 'Pesquisas, indicadores, mapas e informações produzidas pelo Observatório Mambucaba.'],
] as const

const ETAPAS = [
  ['01', 'Mapear', 'Identificar atrativos, empreendimentos, pessoas, iniciativas, saberes e necessidades do território.'],
  ['02', 'Conectar', 'Formar uma rede entre moradores, empreendedores, organizações, visitantes e parceiros.'],
  ['03', 'Qualificar', 'Promover formação, apoio técnico e desenvolvimento de experiências, produtos e serviços.'],
  ['04', 'Promover', 'Divulgar o território, estimular visitações responsáveis e acompanhar os resultados.'],
] as const

export default function ConhecerPage() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="O programa"
        title="Desenvolvimento territorial com identidade, participação e pertencimento"
        description="Caminhos de Mambucaba organiza, conecta e fortalece ações que geram desenvolvimento a partir das potencialidades do próprio território."
      />

      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground">O que é o Caminhos de Mambucaba?</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">O programa nasce para organizar, conectar e fortalecer ações capazes de gerar desenvolvimento a partir das potencialidades do próprio território.</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">Seu recorte inicial considera o território entre a Praia do Laboratório e a Praia Secreta, em Angra dos Reis, e Tarituba, em Paraty — olhando para lugares, saberes, memórias e iniciativas da base comunitária.</p>
            </div>
            <blockquote className="rounded-2xl border-l-4 border-accent bg-secondary/60 p-6 font-serif text-xl leading-relaxed text-foreground">
              “Um conjunto de ações integradas que promove desenvolvimento territorial por meio do turismo de base comunitária.”
              <footer className="mt-4 font-sans text-sm text-muted-foreground">Definição do programa</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-primary-foreground/70">Propósito</p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold">Turismo como ferramenta, não como finalidade isolada.</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-primary-foreground/80">O programa fortalece a economia local, valoriza modos de vida, preserva patrimônio e natureza e amplia o protagonismo de quem vive e constrói o território.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ['Missão', 'Conectar', 'Pessoas, saberes, iniciativas e oportunidades por meio do turismo de base comunitária.'],
              ['Visão', 'Transformar', 'Fazer de Mambucaba uma referência em desenvolvimento territorial participativo e sustentável.'],
              ['Valores', 'Pertencer', 'Participação, valorização local, diversidade, sustentabilidade, cooperação e transparência.'],
            ].map(([kicker, title, text]) => <article key={title} className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6"><p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/65">{kicker}</p><h3 className="mt-2 font-serif text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-primary">Eixos estratégicos</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground">As frentes que organizam o programa.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {EIXOS.map(([number, title, text]) => <article key={number} className="rounded-2xl border border-border bg-card p-6"><p className="text-sm font-semibold text-accent">EIXO {number}</p><h3 className="mt-3 font-serif text-xl font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-primary">Como funciona</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground">Um programa construído progressivamente e em rede.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">{ETAPAS.map(([number, title, text]) => <article key={number} className="rounded-2xl border border-border bg-background p-6"><span className="font-serif text-3xl font-semibold text-primary">{number}</span><h3 className="mt-3 font-serif text-xl font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 text-center md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-primary">Faça parte</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground">O desenvolvimento do território começa com quem o vive.</h2>
        <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/participar" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Quero fazer parte <ArrowRight className="size-4" /></Link><Link href="/visitar" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-semibold text-foreground">Conhecer o território</Link></div>
      </section>
    </main>
  )
}
