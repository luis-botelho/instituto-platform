import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Política de IA',
  description:
    'Saiba como o Observatório Mambucaba utiliza inteligência artificial de forma responsável, transparente e orientada ao fortalecimento da participação cidadã.',
}

const USOS = [
  { icone: '📢', titulo: 'Registro de Demandas', texto: 'A IA auxilia na conversão de relatos populares em textos mais organizados, objetivos e adequados ao diálogo com órgãos públicos.' },
  { icone: '📄', titulo: 'Redação técnica', texto: 'A IA pode apoiar a elaboração de minutas, pedidos de informação, resumos, orientações, relatórios preliminares e textos explicativos.' },
  { icone: '🔎', titulo: 'Pesquisa e organização', texto: 'A IA pode ajudar a organizar informações públicas, identificar temas, sugerir categorias e estruturar dados encontrados em fontes oficiais.' },
  { icone: '📊', titulo: 'Apoio a análises', texto: 'A IA pode apoiar análises preliminares sobre orçamento, políticas públicas, saúde, educação, infraestrutura e outros temas.' },
  { icone: '📚', titulo: 'Linguagem acessível', texto: 'A IA pode ajudar a traduzir termos técnicos para uma linguagem mais compreensível para moradores e lideranças comunitárias.' },
  { icone: '🗺️', titulo: 'Inteligência territorial', texto: 'A IA pode auxiliar na organização de demandas por tema, localidade, serviço público, equipamento e recorrência territorial.' },
]

const PRINCIPIOS = [
  { titulo: 'Transparência', texto: 'O usuário deve saber quando uma ferramenta usa IA como apoio à organização, redação ou análise de informações.' },
  { titulo: 'Responsabilidade', texto: 'A IA não deve ser usada para afirmar fatos sem fonte, acusar pessoas, produzir conclusões definitivas ou substituir verificação.' },
  { titulo: 'Revisão humana', texto: 'Conteúdos sensíveis, institucionais, jurídicos ou de maior impacto devem passar por avaliação humana antes de divulgação ou encaminhamento.' },
  { titulo: 'Proteção de dados', texto: 'Informações pessoais devem ser tratadas com cuidado, finalidade definida e respeito à privacidade dos usuários.' },
  { titulo: 'Fontes oficiais', texto: 'Quando a IA apoiar pesquisas sobre políticas públicas, as informações devem ser confrontadas com documentos e fontes oficiais sempre que possível.' },
  { titulo: 'Não discriminação', texto: 'A IA deve ser usada de modo a evitar linguagem discriminatória, preconceituosa, ofensiva ou que exponha indevidamente pessoas e grupos.' },
]

const NAO_FAZ = [
  { titulo: 'Não substitui órgãos públicos', texto: 'A IA não substitui Prefeitura, secretarias, Ouvidoria, Ministério Público, Defensoria ou qualquer órgão oficial.' },
  { titulo: 'Não presta assessoria jurídica', texto: 'A IA não substitui advogado, Defensoria Pública ou orientação jurídica especializada.' },
  { titulo: 'Não garante solução', texto: 'O uso da IA não garante resposta, protocolo, prazo, decisão administrativa ou solução de problemas públicos.' },
  { titulo: 'Não comprova fatos', texto: 'Relatos e informações devem ser verificados. A IA não comprova, sozinha, que um fato ocorreu.' },
  { titulo: 'Não toma decisões institucionais', texto: 'A IA pode apoiar a organização das informações, mas decisões dependem de análise humana.' },
  { titulo: 'Não protocola automaticamente', texto: 'O protocolo oficial deve ser realizado pelo cidadão nos canais públicos competentes.' },
]

export default function PoliticaIaPage() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="Governança"
        title="Política de Uso da Inteligência Artificial"
        description="Como o Observatório Mambucaba utiliza inteligência artificial de forma responsável, transparente e orientada ao fortalecimento da participação cidadã e do controle social."
      />

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
              IA como ferramenta de apoio
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A inteligência artificial não substitui pessoas, instituições públicas, análise humana
              ou canais oficiais. Ela funciona como apoio para organizar informações, melhorar
              textos e facilitar a compreensão cidadã.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Como o Observatório usa IA?
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {USOS.map((u) => (
              <div key={u.titulo} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-2xl">{u.icone}</span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-foreground">
                  {u.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            Princípios do uso responsável
          </h2>
          <p className="mt-2 max-w-2xl text-primary-foreground/80">
            A inteligência artificial deve fortalecer a cidadania, não substituir a responsabilidade
            humana.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PRINCIPIOS.map((p) => (
              <div
                key={p.titulo}
                className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  {p.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            O que a IA NÃO faz
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {NAO_FAZ.map((n) => (
              <div key={n.titulo} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground">{n.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.texto}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border-l-4 border-accent bg-secondary/50 p-4 text-sm">
            <strong className="text-foreground">Aviso ao usuário:</strong>
            <p className="mt-1 text-muted-foreground">
              Textos gerados com apoio de inteligência artificial devem ser conferidos antes de uso.
              O usuário é responsável por revisar as informações, corrigir dados incorretos e
              protocolar oficialmente sua manifestação nos canais competentes quando desejar.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Páginas relacionadas
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/metodologia" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Metodologia das Demandas
              </Link>
              <Link href="/politica-privacidade" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Termos de Uso
              </Link>
              <Link href="/sobre" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Sobre o Observatório
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
