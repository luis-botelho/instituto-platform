import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Sobre o Observatório',
  description:
    'Conheça o Observatório Mambucaba, sua missão, visão, valores e ferramentas de inteligência territorial cidadã.',
}

const FERRAMENTAS = [
  { icone: '🔎', titulo: 'Radar Mambucaba', texto: 'Ferramenta de busca e monitoramento de informações públicas em fontes oficiais, incluindo documentos, contratos, licitações e orçamento público.' },
  { icone: '📢', titulo: 'Registrar uma Demanda', texto: 'Canal de participação cidadã que permite ao morador relatar problemas, sugestões, denúncias e observações territoriais.' },
  { icone: '📊', titulo: 'Painel Interativo', texto: 'Ambiente visual para acompanhar dados, orçamento público, indicadores territoriais e análises sobre políticas públicas.' },
  { icone: '📄', titulo: 'Relatórios e pesquisas', texto: 'Produção de relatórios, diagnósticos e análises sobre saúde, orçamento, enchentes, equipamentos públicos e obras.' },
  { icone: '🗺️', titulo: 'Mapa Territorial', texto: 'Mapa colaborativo com equipamentos públicos, áreas de enchente, obras, demandas, serviços e referências territoriais.' },
  { icone: '📚', titulo: 'Biblioteca Digital', texto: 'Organização de documentos públicos, leis, relatórios, artigos, diagnósticos e fontes úteis para pesquisa e controle social.' },
]

const VALORES = [
  { titulo: 'Transparência', texto: 'Defendemos o acesso público às informações e a clareza sobre orçamento, serviços, obras, programas e decisões governamentais.' },
  { titulo: 'Participação', texto: 'Valorizamos a escuta dos moradores, lideranças, trabalhadores, estudantes, pesquisadores e coletivos do território.' },
  { titulo: 'Evidência', texto: 'Buscamos trabalhar com dados, documentos, registros, relatos organizados e fontes verificáveis.' },
  { titulo: 'Ética', texto: 'Tratamos informações com responsabilidade, cuidado, respeito às pessoas e atenção à proteção de dados.' },
  { titulo: 'Independência', texto: 'O Observatório não atua como partido, governo ou grupo eleitoral. Sua referência é o interesse público e o direito à cidade.' },
  { titulo: 'Inovação', texto: 'Usamos tecnologia, inteligência artificial, mapas, painéis e metodologias digitais para ampliar o controle social.' },
]

export default function SobrePage() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="Quem somos"
        title="Sobre o Observatório Mambucaba"
        description="O Observatório de Políticas Públicas — Um Olhar sobre Mambucaba é uma iniciativa do ICPT, criada para produzir conhecimento territorial, fortalecer a participação cidadã e acompanhar políticas públicas no 4º Distrito de Angra dos Reis."
      />

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <article className="rounded-2xl border border-border bg-background p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              O que é o Observatório Mambucaba?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              O Observatório Mambucaba é uma plataforma de inteligência territorial cidadã voltada
              ao acompanhamento das políticas públicas, dos serviços públicos, das informações
              oficiais, das demandas populares e das transformações sociais do Parque Mambucaba e do
              4º Distrito de Angra dos Reis.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Ele atua como espaço de pesquisa, organização de dados, educação cidadã, transparência
              pública, monitoramento territorial e apoio ao controle social.
            </p>
            <div className="mt-4 rounded-xl border-l-4 border-accent bg-secondary/50 p-4 text-sm">
              <strong className="text-foreground">Importante:</strong>
              <p className="mt-1 text-muted-foreground">
                O Observatório não é órgão público, não substitui a Prefeitura, a Ouvidoria, o
                Ministério Público, a Defensoria ou qualquer canal oficial. Seu papel é orientar,
                organizar informações, produzir análises e fortalecer a participação cidadã.
              </p>
            </div>
          </article>

          <article className="mt-6 rounded-2xl border border-border bg-background p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              O que é o ICPT?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              O Instituto Cidadania e Políticas Territoriais (ICPT) é a organização responsável pela
              estruturação institucional do Observatório. O ICPT nasce com o objetivo de promover
              cidadania, participação social, formação popular, pesquisa aplicada, inteligência
              territorial e acompanhamento das políticas públicas.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Nossas ferramentas
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {FERRAMENTAS.map((f) => (
              <div key={f.titulo} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-2xl">{f.icone}</span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-foreground">
                  {f.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            Missão, visão e valores
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6">
              <h3 className="font-serif text-lg font-semibold text-primary-foreground">Missão</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                Produzir conhecimento territorial, facilitar o acesso a informações públicas,
                fortalecer a participação cidadã e contribuir para o aperfeiçoamento das políticas
                públicas no Parque Mambucaba e no 4º Distrito de Angra dos Reis.
              </p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6">
              <h3 className="font-serif text-lg font-semibold text-primary-foreground">Visão</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                Ser uma referência em inteligência territorial cidadã, transparência pública,
                controle social, pesquisa em fontes oficiais e inovação comunitária aplicada às
                políticas públicas.
              </p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6">
              <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                Compromisso
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                Atuar de forma ética, técnica, independente e colaborativa, sempre buscando
                transformar dados, documentos, relatos e experiências populares em informação
                pública qualificada.
              </p>
            </div>
          </div>

          <h3 className="mt-12 font-serif text-xl font-semibold text-primary-foreground">
            Nossos valores
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {VALORES.map((v) => (
              <div
                key={v.titulo}
                className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-5"
              >
                <h4 className="font-semibold text-primary-foreground">{v.titulo}</h4>
                <p className="mt-1 text-sm leading-relaxed text-primary-foreground/80">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Participe do Observatório
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-sm text-muted-foreground">
              A construção de um território mais justo, transparente e participativo depende da
              colaboração de moradores, lideranças, pesquisadores, estudantes, trabalhadores e
              instituições.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/participar" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">
                Registrar uma demanda
              </Link>
              <Link href="/observatorio" className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground">
                Central do Observatório
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
