import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Saiba como o Observatório Mambucaba trata dados pessoais, informações enviadas por usuários e registros de participação cidadã.',
  alternates: { canonical: '/politica-privacidade' },
}

const SECTIONS = [
  {
    n: '1',
    title: 'Objetivo desta Política',
    content: (
      <>
        <p>
          A Política de Privacidade do Observatório Mambucaba tem como objetivo informar, de forma
          clara e acessível, como os dados pessoais podem ser coletados, utilizados, armazenados,
          protegidos e eventualmente compartilhados no âmbito das ferramentas digitais do
          Observatório.
        </p>
        <p>
          O Observatório busca atuar em conformidade com os princípios da Lei Geral de Proteção de
          Dados Pessoais — LGPD, especialmente transparência, finalidade, necessidade, segurança,
          prevenção e respeito aos direitos dos titulares.
        </p>
      </>
    ),
  },
  {
    n: '2',
    title: 'Quem somos',
    content: (
      <>
        <p>
          O Observatório de Políticas Públicas — Um Olhar sobre Mambucaba é uma iniciativa vinculada
          ao Instituto Cidadania e Políticas Territoriais — ICPT, voltada à produção de conhecimento
          territorial, transparência pública, participação cidadã e controle social no Parque
          Mambucaba e no 4º Distrito de Angra dos Reis.
        </p>
        <p>
          O Observatório não é órgão público e não substitui canais oficiais como Prefeitura,
          Ouvidoria, Ministério Público, Defensoria Pública ou Câmara Municipal.
        </p>
      </>
    ),
  },
  {
    n: '3',
    title: 'Quais dados podem ser coletados',
    content: (
      <>
        <p>
          O Observatório poderá coletar dados fornecidos voluntariamente pelos usuários,
          especialmente quando utilizarem formulários, Registro de Demandas, canais de contato ou
          ferramentas de participação.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Nome;</li>
          <li>E-mail;</li>
          <li>Telefone, quando informado;</li>
          <li>Bairro, rua, localidade ou referência territorial;</li>
          <li>Tipo de manifestação enviada;</li>
          <li>
            Relato, sugestão, reclamação, denúncia, elogio ou observação territorial;
          </li>
          <li>Informações técnicas de navegação, como cookies e dados estatísticos.</li>
        </ul>
        <div className="mt-4 rounded-xl border-l-4 border-accent bg-secondary/50 p-4 text-sm">
          <strong className="text-foreground">Atenção:</strong>
          <p className="mt-1 text-muted-foreground">
            O usuário deve evitar inserir informações pessoais excessivas, dados de terceiros,
            documentos sensíveis ou acusações sem base. Em casos urgentes, de violência, risco
            imediato ou emergência, procure diretamente os órgãos oficiais competentes.
          </p>
        </div>
      </>
    ),
  },
  {
    n: '4',
    title: 'Para que os dados são utilizados',
    content: (
      <>
        <p>Os dados poderão ser utilizados para:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Receber e organizar manifestações enviadas pelos cidadãos;</li>
          <li>Classificar demandas por tema, território e tipo de manifestação;</li>
          <li>
            Apoiar a conversão técnica de relatos populares com auxílio de inteligência artificial;
          </li>
          <li>Produzir diagnósticos, mapas, indicadores, relatórios e análises territoriais;</li>
          <li>Entrar em contato com o usuário quando necessário;</li>
          <li>Aprimorar as ferramentas digitais do Observatório;</li>
          <li>Fortalecer a participação cidadã e o controle social.</li>
        </ul>
      </>
    ),
  },
  {
    n: '5',
    title: 'Uso de inteligência artificial',
    content: (
      <>
        <p>
          Algumas ferramentas do Observatório podem utilizar inteligência artificial para apoiar a
          organização, classificação e redação técnica de relatos enviados pelos usuários.
        </p>
        <p>
          A inteligência artificial não substitui análise humana, não comprova fatos, não protocola
          automaticamente demandas e não garante resposta dos órgãos públicos.
        </p>
        <p>Textos gerados com apoio de IA devem ser revisados pelo usuário antes de qualquer utilização em canais oficiais.</p>
      </>
    ),
  },
  {
    n: '6',
    title: 'Compartilhamento de informações',
    content: (
      <>
        <p>
          O Observatório poderá utilizar informações de forma agregada, estatística ou anonimizada
          em relatórios, mapas, painéis, pesquisas e publicações institucionais.
        </p>
        <p>
          Informações individualizadas não devem ser publicadas de forma a expor indevidamente
          pessoas, salvo autorização, obrigação legal ou necessidade institucional devidamente
          justificada.
        </p>
      </>
    ),
  },
  {
    n: '7',
    title: 'Dados sensíveis',
    content: (
      <p>
        Algumas manifestações podem conter dados sensíveis, como informações sobre saúde,
        vulnerabilidade social, crianças, violência, denúncias ou situações pessoais. Nesses casos,
        o Observatório deverá adotar cuidado adicional no tratamento, análise e eventual uso das
        informações, priorizando proteção, segurança e não exposição indevida.
      </p>
    ),
  },
  {
    n: '8',
    title: 'Segurança das informações',
    content: (
      <p>
        O Observatório deve adotar medidas razoáveis de segurança para proteger as informações
        recebidas contra acesso não autorizado, perda, uso indevido, alteração ou divulgação
        inadequada. Apesar dos cuidados adotados, nenhum sistema digital é totalmente livre de
        riscos.
      </p>
    ),
  },
  {
    n: '9',
    title: 'Retenção dos dados',
    content: (
      <p>
        As informações poderão ser mantidas pelo tempo necessário para cumprir as finalidades
        institucionais, metodológicas, estatísticas, documentais e de controle social do
        Observatório. Quando possível, dados pessoais poderão ser anonimizados para fins de
        pesquisa, relatório, monitoramento e produção de conhecimento territorial.
      </p>
    ),
  },
  {
    n: '10',
    title: 'Direitos do usuário',
    content: (
      <>
        <p>O usuário poderá solicitar:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Confirmação sobre a existência de tratamento de dados;</li>
          <li>Acesso aos dados pessoais fornecidos;</li>
          <li>Correção de dados incompletos ou desatualizados;</li>
          <li>Exclusão de dados, quando cabível;</li>
          <li>Informações sobre uso e finalidade dos dados;</li>
          <li>Revogação de consentimento, quando aplicável.</li>
        </ul>
        <p className="mt-3">As solicitações deverão ser feitas pelos canais oficiais de contato do Observatório ou do ICPT.</p>
      </>
    ),
  },
  {
    n: '11',
    title: 'Cookies e ferramentas externas',
    content: (
      <p>
        O site usa medição de audiência sem cookies por meio do Vercel Web Analytics e oferece links
        para serviços externos, como mapas, formulários e redes sociais. O cenário atual e qualquer
        alteração futura estão detalhados na{' '}
        <Link href="/politica-cookies" className="font-medium text-primary underline underline-offset-4">
          Política de Cookies
        </Link>.
      </p>
    ),
  },
  {
    n: '12',
    title: 'Alterações nesta Política',
    content: (
      <p>
        Esta Política de Privacidade poderá ser atualizada periodicamente para refletir mudanças nas
        ferramentas, práticas institucionais, exigências legais ou orientações de proteção de dados.
        A versão mais recente ficará disponível no site do Observatório Mambucaba.
      </p>
    ),
  },
]

export default function PoliticaPrivacidadePage() {
  return (
    <main id="conteudo">
      <PageHero
        eyebrow="Proteção de dados"
        title="Política de Privacidade"
        description="Como o Observatório Mambucaba trata dados pessoais, informações enviadas por usuários e registros relacionados à participação cidadã."
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
              <Link href="/politica-cookies" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Política de Cookies
              </Link>
              <Link href="/termos-uso" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Termos de Uso
              </Link>
              <Link href="/politica-ia" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Política de IA
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
