import {
  EXPERIENCIAS,
  type Experiencia,
  type Interesse,
  type Formato,
  type Duracao,
  type Publico,
} from '@/lib/data'

export type Respostas = {
  perfil?: 'vive' | 'visita'
  tempo?: Duracao
  companhia?: Publico
  interesses: Interesse[]
  carro?: 'sim' | 'nao'
  acessibilidade?: 'sim' | 'nao'
  formato?: Formato | 'tanto-faz'
  gasto?: 'gratuito' | 'baixo' | 'medio' | 'flexivel'
}

export type Recomendacao = {
  exp: Experiencia
  score: number
  motivos: string[]
}

/**
 * Motor de recomendação por regras (MVP).
 * Arquitetura preparada para futuramente receber um motor inteligente.
 */
export function recomendar(r: Respostas): Recomendacao[] {
  const resultados: Recomendacao[] = EXPERIENCIAS.map((exp) => {
    let score = 0
    const motivos: string[] = []

    // interesses (peso maior)
    const overlap = exp.interesses.filter((i) => r.interesses.includes(i))
    if (overlap.length > 0) {
      score += overlap.length * 3
      motivos.push(
        `Combina com seus interesses em ${overlap
          .map((i) => i)
          .slice(0, 3)
          .join(', ')}`,
      )
    }

    // tempo disponível
    if (r.tempo && exp.duracao === r.tempo) {
      score += 3
      motivos.push('Cabe no tempo que você tem')
    } else if (r.tempo) {
      const ordem: Duracao[] = ['curta', 'meio-periodo', 'dia-inteiro']
      if (ordem.indexOf(exp.duracao) <= ordem.indexOf(r.tempo)) {
        score += 1
      }
    }

    // companhia
    if (r.companhia && exp.publico.includes(r.companhia)) {
      score += 2
      motivos.push('Indicada para o seu grupo')
    }

    // formato
    if (r.formato && r.formato !== 'tanto-faz') {
      if (exp.formato === r.formato) {
        score += 2
        motivos.push(
          r.formato === 'livre'
            ? 'É uma experiência livre'
            : 'É uma experiência acompanhada',
        )
      }
    }

    // acessibilidade
    if (r.acessibilidade === 'sim') {
      const acessivel = /acess[íi]vel/i.test(exp.acessibilidade) &&
        !/baixa/i.test(exp.acessibilidade)
      if (acessivel) {
        score += 2
        motivos.push('Tem melhores condições de acessibilidade')
      } else {
        score -= 1
      }
    }

    return { exp, score, motivos }
  })

  return resultados
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
}

export const TOTAL_ETAPAS = 7
