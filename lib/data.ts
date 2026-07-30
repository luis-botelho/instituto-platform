// ============================================================================
// Caminhos de Mambucaba — dados demonstrativos (MVP)
// Todo o conteúdo abaixo é DEMONSTRATIVO e serve apenas para ilustrar o produto.
// Não representa informações reais ou verificadas.
// ============================================================================

export const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/conhecer', label: 'O Programa' },
  { href: '/visitar', label: 'Visitar' },
  { href: '/mapa', label: 'Mapa' },
  { href: '/hospedar', label: 'Hospedar' },
  { href: '/participar', label: 'Participar' },
  { href: '/observatorio', label: 'Observatório' },
] as const

// ----------------------------------------------------------------------------
// Os quatro caminhos (públicos)
// ----------------------------------------------------------------------------

export type Caminho = {
  slug: string
  titulo: string
  chamada: string
  descricao: string
  acoes: string[]
  cor: 'primary' | 'river' | 'accent' | 'sand'
  href: string
}

export const CAMINHOS: Caminho[] = [
  {
    slug: 'quem-vive',
    titulo: 'Quem vive',
    chamada: 'Moradores e comunidades',
    descricao:
      'Quem possui memória, conhecimento e pertencimento. O território começa por quem o vive.',
    acoes: [
      'Descobrir o próprio território',
      'Indicar lugares e histórias',
      'Participar do mapeamento',
      'Propor experiências',
    ],
    cor: 'primary',
    href: '/participar',
  },
  {
    slug: 'quem-visita',
    titulo: 'Quem visita',
    chamada: 'Visitantes e viajantes',
    descricao:
      'Quem chega para conhecer, comer, se hospedar e viver o território de um jeito próprio.',
    acoes: [
      'Descobrir o que fazer',
      'Encontrar onde comer e dormir',
      'Montar uma experiência',
      'Acessar mapa e contatos',
    ],
    cor: 'river',
    href: '/visitar',
  },
  {
    slug: 'quem-empreende',
    titulo: 'Quem empreende',
    chamada: 'Iniciativas locais',
    descricao:
      'Restaurantes, pousadas, produtores, artesãos, guias e comerciantes que constroem o território.',
    acoes: [
      'Cadastrar sua iniciativa',
      'Aparecer no mapa',
      'Propor experiências',
      'Encontrar parceiros',
    ],
    cor: 'accent',
    href: '/participar',
  },
  {
    slug: 'quem-pesquisa',
    titulo: 'Quem pesquisa',
    chamada: 'Instituições e poder público',
    descricao:
      'Universidades, pesquisadores, organizações e gestores que planejam e atuam no território.',
    acoes: [
      'Conhecer dados e pesquisas',
      'Acompanhar indicadores',
      'Propor cooperações',
      'Dialogar com o Observatório',
    ],
    cor: 'sand',
    href: '/observatorio',
  },
]

// ----------------------------------------------------------------------------
// Categorias do mapa / território
// ----------------------------------------------------------------------------

export type Categoria =
  | 'comer'
  | 'hospedar'
  | 'conhecer'
  | 'fazer'
  | 'servicos'

export const CATEGORIAS: Record<
  Categoria,
  { label: string; descricao: string; cor: string }
> = {
  comer: { label: 'Onde comer', descricao: 'Gastronomia e sabores locais', cor: '#c1622f' },
  hospedar: { label: 'Onde se hospedar', descricao: 'Pousadas e hospedagens', cor: '#4477aa' },
  conhecer: { label: 'O que conhecer', descricao: 'Patrimônio, história e paisagens', cor: '#3f6b4a' },
  fazer: { label: 'O que fazer', descricao: 'Atividades e experiências', cor: '#8a6d2b' },
  servicos: { label: 'Serviços e apoio', descricao: 'Apoio ao visitante e ao morador', cor: '#5b5b62' },
}

// ----------------------------------------------------------------------------
// Pontos do território (mapa)
// ----------------------------------------------------------------------------

export type StatusInfo = 'validado' | 'em-validacao' | 'demonstrativo'

export type Ponto = {
  id: string
  nome: string
  categoria: Categoria
  localidade: string
  descricao: string
  lat: number
  lng: number
  telefone?: string
  whatsapp?: string
  instagram?: string
  site?: string
  horario?: string
  acessibilidade?: string
  status: StatusInfo
}

// Coordenadas aproximadas no eixo Angra dos Reis – Paraty (litoral sul do RJ).
export const PONTOS: Ponto[] = [
  {
    id: 'p1',
    nome: 'Cozinha Comunitária do Perequê',
    categoria: 'comer',
    localidade: 'Perequê',
    descricao:
      'Cozinha de base comunitária com pratos de peixe fresco e receitas caiçaras. Experiência em construção.',
    lat: -23.0088,
    lng: -44.2846,
    whatsapp: 'https://wa.me/5500000000000',
    instagram: 'https://instagram.com/',
    horario: 'Ter a Dom, 11h–17h',
    acessibilidade: 'Acesso térreo, sem degraus',
    status: 'demonstrativo',
  },
  {
    id: 'p2',
    nome: 'Ruínas Históricas de Mambucaba',
    categoria: 'conhecer',
    localidade: 'Vila Histórica de Mambucaba',
    descricao:
      'Conjunto histórico à beira-rio, testemunho do ciclo do café e da ocupação do território. Informação demonstrativa.',
    lat: -23.0261,
    lng: -44.5238,
    horario: 'Visitação livre',
    status: 'demonstrativo',
  },
  {
    id: 'p3',
    nome: 'Pousada Serra & Mar',
    categoria: 'hospedar',
    localidade: 'Praia do Laboratório',
    descricao:
      'Hospedagem familiar entre a mata e o mar, com varanda e rede. Cadastro em validação.',
    lat: -23.0155,
    lng: -44.3421,
    whatsapp: 'https://wa.me/5500000000000',
    site: 'https://exemplo.com',
    status: 'em-validacao',
  },
  {
    id: 'p4',
    nome: 'Trilha do Rio Mambucaba',
    categoria: 'fazer',
    localidade: 'Baixada de Mambucaba',
    descricao:
      'Caminhada leve acompanhando o curso do rio, com paradas de banho e mirantes. Experiência em construção.',
    lat: -23.0312,
    lng: -44.4987,
    horario: 'Melhor no período da manhã',
    acessibilidade: 'Percurso natural, terreno irregular',
    status: 'demonstrativo',
  },
  {
    id: 'p5',
    nome: 'Ateliê de Artesãs do Frade',
    categoria: 'fazer',
    localidade: 'Frade',
    descricao:
      'Grupo de artesãs que trabalham fibras e materiais locais. Roda de conversa e venda direta. Cadastro em validação.',
    lat: -23.0018,
    lng: -44.4123,
    instagram: 'https://instagram.com/',
    status: 'em-validacao',
  },
  {
    id: 'p6',
    nome: 'Peixaria da Vila',
    categoria: 'comer',
    localidade: 'Tarituba',
    descricao:
      'Peixe do dia e produção local, na beira da vila de pescadores. Informação demonstrativa.',
    lat: -23.0389,
    lng: -44.5602,
    telefone: 'tel:+5500000000000',
    horario: 'Qua a Seg, 12h–20h',
    status: 'demonstrativo',
  },
  {
    id: 'p7',
    nome: 'Ponto de Apoio ao Visitante',
    categoria: 'servicos',
    localidade: 'Perequê',
    descricao:
      'Orientações, mapas impressos e informações sobre transporte e mobilidade. Informação demonstrativa.',
    lat: -23.0102,
    lng: -44.29,
    horario: 'Todos os dias, 9h–18h',
    acessibilidade: 'Espaço acessível',
    status: 'demonstrativo',
  },
  {
    id: 'p8',
    nome: 'Casa de Farinha do Sertão',
    categoria: 'conhecer',
    localidade: 'Sertão de Mambucaba',
    descricao:
      'Memória viva da produção de farinha e dos saberes tradicionais do território. Experiência em construção.',
    lat: -23.0455,
    lng: -44.472,
    status: 'demonstrativo',
  },
]

// ----------------------------------------------------------------------------
// Experiências territoriais
// ----------------------------------------------------------------------------

export type Interesse =
  | 'natureza'
  | 'historia'
  | 'gastronomia'
  | 'cultura'
  | 'memoria'
  | 'praias'
  | 'comunidades'
  | 'producao'
  | 'descanso'
  | 'educativa'

export const INTERESSES: Record<Interesse, string> = {
  natureza: 'Natureza',
  historia: 'História',
  gastronomia: 'Gastronomia',
  cultura: 'Cultura',
  memoria: 'Memória',
  praias: 'Praias',
  comunidades: 'Comunidades',
  producao: 'Produção local',
  descanso: 'Descanso',
  educativa: 'Experiência educativa',
}

export type Formato = 'livre' | 'acompanhada'
export type Duracao = 'curta' | 'meio-periodo' | 'dia-inteiro'
export type Publico = 'sozinho' | 'casal' | 'familia' | 'grupo'

export const DURACAO_LABEL: Record<Duracao, string> = {
  curta: 'Curta duração',
  'meio-periodo': 'Meio período',
  'dia-inteiro': 'Dia inteiro',
}

export type Experiencia = {
  slug: string
  nome: string
  imagem: string
  resumo: string
  porque: string
  duracao: Duracao
  formato: Formato
  interesses: Interesse[]
  publico: Publico[]
  localidades: string[]
  sequencia: string[]
  pontos: string[] // ids de PONTOS
  deslocamento: string
  cuidados: string
  acessibilidade: string
  custo: string
  iniciativas: string[]
  status: StatusInfo
}

export const EXPERIENCIAS: Experiencia[] = [
  {
    slug: 'memoria-e-sabores',
    nome: 'Memória e Sabores de Mambucaba',
    imagem: '/images/exp-sabores.png',
    resumo:
      'Um caminho que combina história, narrativa territorial e gastronomia comunitária.',
    porque:
      'Porque conecta o patrimônio do território ao sabor de quem vive nele — memória que se prova.',
    duracao: 'meio-periodo',
    formato: 'acompanhada',
    interesses: ['memoria', 'historia', 'gastronomia', 'comunidades'],
    publico: ['casal', 'familia', 'grupo'],
    localidades: ['Vila Histórica de Mambucaba', 'Perequê'],
    sequencia: [
      'Conhecer um lugar histórico',
      'Acessar uma narrativa sobre o território',
      'Visitar uma iniciativa local',
      'Realizar uma experiência gastronômica',
      'Finalizar em uma paisagem cultural',
    ],
    pontos: ['p2', 'p8', 'p1'],
    deslocamento: 'Recomendado carro entre localidades; trechos a pé.',
    cuidados: 'Levar água, protetor solar e calçado confortável.',
    acessibilidade: 'Parcialmente acessível — trechos históricos irregulares.',
    custo: 'Custo aproximado sob consulta (demonstrativo).',
    iniciativas: ['Cozinha Comunitária do Perequê', 'Casa de Farinha do Sertão'],
    status: 'demonstrativo',
  },
  {
    slug: 'rio-mata-mar',
    nome: 'Do Rio à Mata, do Mar ao Território',
    imagem: '/images/exp-natureza.png',
    resumo:
      'Experiência de natureza acompanhando o rio Mambucaba, com banho, mirante e mar.',
    porque:
      'Porque revela como o território se organiza entre a Serra do Mar, os rios e o litoral.',
    duracao: 'dia-inteiro',
    formato: 'livre',
    interesses: ['natureza', 'praias', 'descanso'],
    publico: ['sozinho', 'casal', 'grupo'],
    localidades: ['Baixada de Mambucaba', 'Praia do Laboratório'],
    sequencia: [
      'Iniciar pela trilha do rio',
      'Parada de banho e mirante',
      'Almoço com produção local',
      'Fim de tarde na praia',
    ],
    pontos: ['p4', 'p6'],
    deslocamento: 'Carro até o início da trilha; percurso a pé.',
    cuidados: 'Trilha em terreno natural; evitar dias de chuva forte.',
    acessibilidade: 'Baixa acessibilidade — terreno irregular.',
    custo: 'Experiência majoritariamente gratuita (demonstrativo).',
    iniciativas: ['Peixaria da Vila'],
    status: 'demonstrativo',
  },
  {
    slug: 'saberes-e-maos',
    nome: 'Saberes e Mãos do Território',
    imagem: '/images/exp-comunidade.png',
    resumo:
      'Encontro com artesãs e grupos culturais, com roda de conversa e produção local.',
    porque:
      'Porque coloca o visitante em relação direta com quem produz cultura e memória.',
    duracao: 'curta',
    formato: 'acompanhada',
    interesses: ['cultura', 'comunidades', 'producao', 'educativa'],
    publico: ['familia', 'grupo'],
    localidades: ['Frade'],
    sequencia: [
      'Roda de conversa com o grupo',
      'Oficina demonstrativa',
      'Visita ao ateliê e venda direta',
    ],
    pontos: ['p5'],
    deslocamento: 'Acesso por carro ou transporte local.',
    cuidados: 'Combinar horário previamente com a iniciativa.',
    acessibilidade: 'Espaço acessível.',
    custo: 'Contribuição sugerida à iniciativa (demonstrativo).',
    iniciativas: ['Ateliê de Artesãs do Frade'],
    status: 'em-validacao',
  },
  {
    slug: 'caminho-historico',
    nome: 'Caminho Histórico da Vila',
    imagem: '/images/exp-memoria.png',
    resumo:
      'Percurso guiado pelas ruínas e pela história do ciclo do café à beira-rio.',
    porque:
      'Porque compreende o território a partir das camadas de sua ocupação e memória.',
    duracao: 'meio-periodo',
    formato: 'acompanhada',
    interesses: ['historia', 'memoria', 'cultura'],
    publico: ['sozinho', 'casal', 'familia', 'grupo'],
    localidades: ['Vila Histórica de Mambucaba'],
    sequencia: [
      'Contextualização histórica',
      'Percurso pelas ruínas',
      'Narrativa sobre o território',
    ],
    pontos: ['p2'],
    deslocamento: 'Deslocamento a pé dentro da vila.',
    cuidados: 'Piso irregular em alguns trechos.',
    acessibilidade: 'Parcialmente acessível.',
    custo: 'Sob consulta (demonstrativo).',
    iniciativas: ['Ponto de Apoio ao Visitante'],
    status: 'demonstrativo',
  },
]

// ----------------------------------------------------------------------------
// Hospedagens
// ----------------------------------------------------------------------------

export type Hospedagem = {
  id: string
  nome: string
  localidade: string
  tipo: string
  descricao: string
  faixa: string
  contato: string
  status: StatusInfo
}

export const HOSPEDAGENS: Hospedagem[] = [
  {
    id: 'h1',
    nome: 'Pousada Serra & Mar',
    localidade: 'Praia do Laboratório',
    tipo: 'Pousada familiar',
    descricao: 'Entre a mata e o mar, com varanda, rede e café da manhã com produção local.',
    faixa: '$$',
    contato: 'https://wa.me/5500000000000',
    status: 'em-validacao',
  },
  {
    id: 'h2',
    nome: 'Casa da Vila',
    localidade: 'Vila Histórica de Mambucaba',
    tipo: 'Casa de temporada',
    descricao: 'Casa simples e acolhedora a poucos passos do centro histórico e do rio.',
    faixa: '$',
    contato: 'https://wa.me/5500000000000',
    status: 'demonstrativo',
  },
  {
    id: 'h3',
    nome: 'Recanto do Frade',
    localidade: 'Frade',
    tipo: 'Chalés',
    descricao: 'Chalés integrados à natureza, próximos a trilhas e à comunidade de artesãs.',
    faixa: '$$',
    contato: 'https://wa.me/5500000000000',
    status: 'demonstrativo',
  },
]

// ----------------------------------------------------------------------------
// Observatório — Central de Inteligência Territorial
// ----------------------------------------------------------------------------

export type Indicador = {
  rotulo: string
  valor: string
  descricao: string
}

export const INDICADORES: Indicador[] = [
  { rotulo: 'Localidades mapeadas', valor: '12', descricao: 'no recorte territorial inicial' },
  { rotulo: 'Iniciativas em cadastro', valor: '38', descricao: 'em validação comunitária' },
  { rotulo: 'Escutas realizadas', valor: '150+', descricao: 'moradores e lideranças ouvidos' },
  { rotulo: 'Experiências em desenho', valor: '9', descricao: 'caminhos em construção' },
]

export type Publicacao = {
  titulo: string
  tipo: string
  resumo: string
  status: StatusInfo
}

export const PUBLICACOES: Publicacao[] = [
  {
    titulo: 'Diagnóstico Territorial de Mambucaba',
    tipo: 'Pesquisa',
    resumo:
      'Leitura das relações de trabalho, comércio, mobilidade e cultura no eixo Angra–Paraty.',
    status: 'demonstrativo',
  },
  {
    titulo: 'Escutas Comunitárias — Primeiro Ciclo',
    tipo: 'Escuta',
    resumo:
      'Sistematização das falas de moradores sobre pertencimento, demandas e potencialidades.',
    status: 'demonstrativo',
  },
  {
    titulo: 'Painel de Indicadores Territoriais',
    tipo: 'Indicadores',
    resumo:
      'Organização de dados sobre turismo de base comunitária e circulação econômica local.',
    status: 'em-validacao',
  },
]

export const STATUS_LABEL: Record<StatusInfo, string> = {
  validado: 'Informação validada',
  'em-validacao': 'Cadastro em validação',
  demonstrativo: 'Informação demonstrativa',
}
