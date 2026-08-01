import {
  Activity,
  BookOpen,
  FileSearch,
  FileText,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  MessageSquareText,
  Radar,
  type LucideIcon,
} from 'lucide-react'

export type ObservatoryTool = {
  title: string
  description: string
  href: string
  label: string
  icon: LucideIcon
  tone: 'primary' | 'river' | 'accent'
}

export const OBSERVATORY_TOOLS: ObservatoryTool[] = [
  { title: 'Registro de demandas', description: 'Transforme um relato em um pedido claro, pronto para revisar e encaminhar.', href: '/demandas', label: 'Registrar demanda', icon: MessageSquareText, tone: 'accent' },
  { title: 'Radar Mambucaba', description: 'Pesquise assuntos do território diretamente em fontes públicas oficiais.', href: '/radar', label: 'Abrir o radar', icon: Radar, tone: 'river' },
  { title: 'Saúde em Mambucaba', description: 'Conheça os resultados da escuta territorial sobre acesso à saúde.', href: '/saude', label: 'Ver pesquisa', icon: HeartPulse, tone: 'primary' },
  { title: 'Orçamento territorial', description: 'Entenda valores, ações públicas, conceitos e perguntas prioritárias.', href: '/relatorio-orcamentario', label: 'Ler relatório', icon: Landmark, tone: 'accent' },
  { title: 'Painel orçamentário', description: 'Filtre e compare as ações nominalmente localizadas na LOA 2026.', href: '/painel-interativo', label: 'Explorar painel', icon: LayoutDashboard, tone: 'primary' },
  { title: 'Controle social FEAM', description: 'Explore riscos, instrumentos, evidências e oferta declarada de leitos SUS.', href: '/controle-social', label: 'Ver análise', icon: FileSearch, tone: 'river' },
  { title: 'Biblioteca territorial', description: 'Navegue por relatórios, pesquisas, metodologias e documentos de referência.', href: '/publicacoes', label: 'Abrir biblioteca', icon: BookOpen, tone: 'primary' },
]

export const OFFICIAL_SOURCES = [
  { name: 'Prefeitura de Angra dos Reis', domain: 'angra.rj.gov.br', description: 'Notícias, secretarias, serviços e atos municipais.' },
  { name: 'Portal da Transparência', domain: 'transparencia.angra.rj.gov.br', description: 'Despesas, receitas, contratos e prestação de contas.' },
  { name: 'Câmara Municipal', domain: 'angradosreis.rj.leg.br', description: 'Leis, projetos, sessões e atividade parlamentar.' },
  { name: 'Boletim Oficial', domain: 'angra.rj.gov.br', suffix: '"boletim oficial"', description: 'Publicações oficiais, nomeações, contratos e decisões.' },
  { name: 'Ministério Público do RJ', domain: 'mprj.mp.br', description: 'Notícias, procedimentos e canais de atendimento.' },
] as const

export const HEALTH_CHALLENGES = [
  { title: 'Tempo de espera', value: 72, text: 'Demora para consultas, exames ou atendimento foi a questão mais recorrente.' },
  { title: 'Dificuldade de marcação', value: 64, text: 'Moradores relataram barreiras para agendar consultas e obter informações.' },
  { title: 'Falta de medicamentos', value: 51, text: 'Indisponibilidade ou descontinuidade foi mencionada por parte dos participantes.' },
] as const

export const BUDGET_AREAS = [
  { name: 'Saúde', value: 36, color: 'bg-primary' },
  { name: 'Educação', value: 27, color: 'bg-river' },
  { name: 'Infraestrutura', value: 18, color: 'bg-accent' },
  { name: 'Assistência social', value: 11, color: 'bg-amber-500' },
  { name: 'Outras áreas', value: 8, color: 'bg-slate-500' },
] as const

export const FEAM_FINDINGS = [
  { level: 'Crítico', title: 'Fragilidade de controle interno', category: 'Governança', instrument: 'Contrato de gestão', evidence: 'Ausência de documentação consolidada que permita acompanhar metas, execução e correções de forma contínua.', question: 'Quais relatórios de controle interno foram produzidos e quem os aprovou?' },
  { level: 'Alto', title: 'Dependência de aportes voluntários', category: 'Financeiro', instrument: 'Aditivos financeiros', evidence: 'A continuidade operacional aparece associada a aportes e condicionantes fiscais que exigem acompanhamento público.', question: 'Qual plano assegura a continuidade do serviço sem aportes extraordinários?' },
  { level: 'Alto', title: 'Divergência no extrato legal', category: 'Transparência', instrument: 'Extratos e aditivos', evidence: 'Valores publicados em instrumentos distintos precisam de conciliação documental e explicação objetiva.', question: 'Qual documento apresenta a memória de cálculo e a conciliação dos valores?' },
  { level: 'Crítico', title: 'Oferta minoritária de leitos SUS', category: 'Assistência', instrument: 'CNES', evidence: 'O cadastro consultado na análise anterior indicava que parte da capacidade instalada não estava disponibilizada ao SUS.', question: 'Quantos leitos estão efetivamente regulados pelo SUS em cada competência?' },
] as const

export const PUBLICATIONS = [
  { type: 'Pesquisa', year: '2026', title: 'Saúde em Mambucaba: a voz dos moradores', description: 'Síntese da escuta territorial sobre acesso, espera, marcação e medicamentos.', href: '/saude', icon: Activity },
  { type: 'Relatório', year: '2026', title: 'Relatório Orçamentário Territorial', description: 'Leitura cidadã do orçamento, ações localizadas e limites metodológicos.', href: '/relatorio-orcamentario', icon: FileText },
  { type: 'Metodologia', year: '2026', title: 'Metodologia do Registro de Demandas', description: 'Como relatos populares são organizados sem substituir órgãos públicos.', href: '/metodologia', icon: BookOpen },
  { type: 'Nota técnica', year: '2026', title: 'Controle social do Hospital de Praia Brava / FEAM', description: 'Matriz navegável de riscos, evidências e perguntas de fiscalização.', href: '/controle-social', icon: FileSearch },
] as const
