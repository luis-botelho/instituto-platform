import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Regras gerais de utilização do portal, das ferramentas digitais e dos conteúdos disponibilizados pelo Observatório Mambucaba.',
}

const SECTIONS = [
  {
    n: '1',
    title: 'Aceitação dos Termos',
    content: (
      <>
        <p>
          Ao acessar ou utilizar qualquer funcionalidade do portal, o usuário declara estar ciente
          destes Termos de Uso, da Política de Privacidade, da Política de Cookies e da Política de
          Uso da Inteligência Artificial.
        </p>
        <p>
          Caso não concorde com estes termos, recomenda-se não utilizar as funcionalidades que
          envolvam envio de informações pessoais ou manifestações.
        </p>
      </>
    ),
  },
  {
    n: '2',
    title: 'Natureza do Observatório',
    content: (
      <>
        <p>
          O Observatório Mambucaba é uma iniciativa vinculada ao Instituto Cidadania e Políticas
          Territoriais – ICPT. Sua finalidade é promover participação cidadã, controle social,
          transparência pública, produção de conhecimento territorial, monitoramento de políticas
          públicas, formação cidadã e acesso à informação.
        </p>
        <div className="mt-4 rounded-xl border-l-4 border-accent bg-secondary/50 p-4 text-sm">
          <strong className="text-foreground">Importante:</strong>
          <p className="mt-1 text-muted-foreground">
            O Observatório não é órgão público e não substitui Prefeitura, Ouvidoria, Câmara
            Municipal, Ministério Público, Defensoria Pública ou qualquer instituição
            governamental.
          </p>
        </div>
      </>
    ),
  },
  {
    n: '3',
    title: 'Registro de Demandas',
    content: (
      <>
        <p>
          A ferramenta de Registro de Demandas tem caráter educativo, participativo e orientativo.
          Ela foi desenvolvida para auxiliar cidadãos na organização de informações, identificação
          de temas, estruturação de relatos e orientação sobre possíveis canais de encaminhamento.
        </p>
        <p>
          O protocolo oficial de solicitações, denúncias ou requerimentos deve ser realizado pelo
          próprio cidadão nos órgãos competentes.
        </p>
      </>
    ),
  },
  {
    n: '4',
    title: 'Uso da Inteligência Artificial',
    content: (
      <>
        <p>
          O portal pode utilizar inteligência artificial para auxiliar na redação, classificação,
          organização e interpretação inicial de informações. As respostas geradas possuem caráter
          orientativo e não devem ser consideradas parecer jurídico, decisão administrativa, laudo
          técnico ou manifestação oficial de qualquer órgão público.
        </p>
        <div className="mt-4 rounded-xl border-l-4 border-primary bg-secondary/50 p-4 text-sm">
          <strong className="text-foreground">A IA pode:</strong>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Auxiliar na redação de textos;</li>
            <li>Converter linguagem popular em linguagem técnica;</li>
            <li>Classificar demandas;</li>
            <li>Sugerir temas e órgãos competentes;</li>
            <li>Apoiar a sistematização de informações.</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    n: '5',
    title: 'Responsabilidade do Usuário',
    content: (
      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>Fornecer informações verdadeiras;</li>
        <li>Utilizar linguagem respeitosa;</li>
        <li>Não inserir conteúdo ofensivo ou discriminatório;</li>
        <li>Não utilizar o sistema para fins ilícitos;</li>
        <li>Não divulgar informações falsas de forma intencional;</li>
        <li>Respeitar a legislação vigente.</li>
      </ul>
    ),
  },
  {
    n: '6',
    title: 'Conteúdos e Publicações',
    content: (
      <p>
        Relatórios, análises, mapas, painéis e demais conteúdos publicados possuem finalidade
        informativa, educativa e de interesse público. Embora o Observatório busque utilizar fontes
        confiáveis e metodologias transparentes, erros podem ocorrer e informações podem ser
        atualizadas ao longo do tempo.
      </p>
    ),
  },
  {
    n: '7',
    title: 'Limitação de Responsabilidade',
    content: (
      <>
        <p>O Observatório não garante:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Resposta de órgãos públicos;</li>
          <li>Prazo de atendimento;</li>
          <li>Solução de problemas relatados;</li>
          <li>Execução de obras ou serviços públicos;</li>
          <li>Resultado administrativo ou judicial.</li>
        </ul>
        <p className="mt-3">
          A atuação do Observatório consiste em apoiar a produção e organização de informações para
          fortalecimento do controle social.
        </p>
      </>
    ),
  },
  {
    n: '8',
    title: 'Condutas Proibidas',
    content: (
      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>Uso do portal para fins eleitorais ou partidários;</li>
        <li>Publicação de conteúdo ofensivo;</li>
        <li>Difamação ou exposição indevida de terceiros;</li>
        <li>Tentativas de invasão ou comprometimento do sistema;</li>
        <li>Uso automatizado indevido das ferramentas;</li>
        <li>Envio massivo de spam.</li>
      </ul>
    ),
  },
  {
    n: '9',
    title: 'Propriedade Intelectual',
    content: (
      <p>
        Os conteúdos produzidos pelo Observatório poderão ser utilizados para fins educativos,
        acadêmicos e de interesse público, desde que respeitada a autoria e citada a fonte quando
        aplicável.
      </p>
    ),
  },
  {
    n: '10',
    title: 'Alterações nos Termos',
    content: (
      <p>
        Estes Termos de Uso poderão ser atualizados periodicamente para refletir mudanças
        institucionais, legais ou tecnológicas. A versão mais recente estará sempre disponível no
        portal.
      </p>
    ),
  },
]

export default function TermosUsoPage() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="Regras de uso"
        title="Termos de Uso"
        description="Regras gerais de utilização do portal, das ferramentas digitais e dos conteúdos disponibilizados pelo Observatório Mambucaba."
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
              <Link href="/politica-cookies" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Política de Cookies
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
