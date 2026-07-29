'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, RotateCcw, Share2, Bookmark, MapPin } from 'lucide-react'
import {
  INTERESSES,
  DURACAO_LABEL,
  type Interesse,
} from '@/lib/data'
import { recomendar, TOTAL_ETAPAS, type Respostas } from '@/lib/recommend'
import { ExperienceCard } from '@/components/experience-card'
import { cn } from '@/lib/utils'

type OptionGroup = {
  key: keyof Omit<Respostas, 'interesses'>
  titulo: string
  ajuda?: string
  opcoes: { valor: string; label: string }[]
}

const ETAPAS_SIMPLES: OptionGroup[] = [
  {
    key: 'perfil',
    titulo: 'Você vive no território ou está visitando?',
    opcoes: [
      { valor: 'vive', label: 'Vivo aqui' },
      { valor: 'visita', label: 'Estou visitando' },
    ],
  },
  {
    key: 'tempo',
    titulo: 'Quanto tempo você tem?',
    opcoes: [
      { valor: 'curta', label: DURACAO_LABEL.curta },
      { valor: 'meio-periodo', label: DURACAO_LABEL['meio-periodo'] },
      { valor: 'dia-inteiro', label: DURACAO_LABEL['dia-inteiro'] },
    ],
  },
  {
    key: 'companhia',
    titulo: 'Com quem você está?',
    opcoes: [
      { valor: 'sozinho', label: 'Sozinho(a)' },
      { valor: 'casal', label: 'Em casal' },
      { valor: 'familia', label: 'Em família' },
      { valor: 'grupo', label: 'Em grupo' },
    ],
  },
  // etapa de interesses entra no meio (índice 3)
  {
    key: 'carro',
    titulo: 'Você está de carro?',
    opcoes: [
      { valor: 'sim', label: 'Sim, tenho carro' },
      { valor: 'nao', label: 'Não, dependo de transporte local' },
    ],
  },
  {
    key: 'acessibilidade',
    titulo: 'Você precisa de acessibilidade?',
    ajuda: 'Priorizamos experiências com melhores condições de acesso.',
    opcoes: [
      { valor: 'sim', label: 'Sim, é importante' },
      { valor: 'nao', label: 'Não é necessário' },
    ],
  },
  {
    key: 'formato',
    titulo: 'Prefere uma experiência livre ou acompanhada?',
    opcoes: [
      { valor: 'livre', label: 'Livre' },
      { valor: 'acompanhada', label: 'Acompanhada' },
      { valor: 'tanto-faz', label: 'Tanto faz' },
    ],
  },
  {
    key: 'gasto',
    titulo: 'Qual faixa de gasto pretende utilizar?',
    ajuda: 'Valores demonstrativos — usados apenas para orientar a sugestão.',
    opcoes: [
      { valor: 'gratuito', label: 'Prefiro o gratuito' },
      { valor: 'baixo', label: 'Faixa baixa' },
      { valor: 'medio', label: 'Faixa média' },
      { valor: 'flexivel', label: 'Sou flexível' },
    ],
  },
]

const INTERESSE_STEP_INDEX = 3

export function MonteCaminho() {
  const [step, setStep] = useState(0)
  const [respostas, setRespostas] = useState<Respostas>({ interesses: [] })
  const [finalizado, setFinalizado] = useState(false)

  const recomendacoes = useMemo(
    () => (finalizado ? recomendar(respostas) : []),
    [finalizado, respostas],
  )

  const totalPassos = TOTAL_ETAPAS + 1 // +1 pela etapa de interesses
  const progresso = Math.round(((step + (finalizado ? 1 : 0)) / totalPassos) * 100)

  const isInteresseStep = step === INTERESSE_STEP_INDEX
  const grupoAtual = isInteresseStep
    ? null
    : ETAPAS_SIMPLES[step > INTERESSE_STEP_INDEX ? step - 1 : step]

  function escolher(key: keyof Omit<Respostas, 'interesses'>, valor: string) {
    setRespostas((r) => ({ ...r, [key]: valor }))
  }

  function toggleInteresse(i: Interesse) {
    setRespostas((r) => ({
      ...r,
      interesses: r.interesses.includes(i)
        ? r.interesses.filter((x) => x !== i)
        : [...r.interesses, i],
    }))
  }

  const podeAvancar = isInteresseStep
    ? respostas.interesses.length > 0
    : grupoAtual
      ? Boolean(respostas[grupoAtual.key])
      : false

  function avancar() {
    if (step >= totalPassos - 1) {
      setFinalizado(true)
    } else {
      setStep((s) => s + 1)
    }
  }

  function voltar() {
    setStep((s) => Math.max(0, s - 1))
  }

  function reiniciar() {
    setRespostas({ interesses: [] })
    setStep(0)
    setFinalizado(false)
  }

  if (finalizado) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-border bg-secondary/50 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Seu caminho
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground">
            {recomendacoes.length > 0
              ? 'Encontramos caminhos para o seu jeito de viver Mambucaba'
              : 'Ainda estamos desenhando um caminho para este perfil'}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {recomendacoes.length > 0
              ? 'Sugestões geradas a partir das suas respostas. Todo o conteúdo é demonstrativo e está em construção.'
              : 'Tente selecionar outros interesses ou ampliar o tempo disponível. Novas experiências estão sendo cadastradas.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reiniciar}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              <RotateCcw className="size-4" /> Refazer
            </button>
            <Link
              href="/mapa"
              className="inline-flex items-center gap-2 rounded-full bg-river px-5 py-2.5 text-sm font-semibold text-river-foreground hover:bg-river/90"
            >
              <MapPin className="size-4" /> Ver no mapa
            </Link>
          </div>
        </div>

        {recomendacoes.length > 0 && (
          <div className="mt-8 space-y-8">
            {recomendacoes.map(({ exp, motivos }, idx) => (
              <div
                key={exp.slug}
                className="grid gap-6 rounded-2xl border border-border bg-card p-4 md:grid-cols-[1fr_1.4fr] md:p-6"
              >
                <div className="overflow-hidden rounded-xl">
                  <ExperienceCard exp={exp} />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Sugestão {idx + 1}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                    Por que este caminho?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {exp.porque}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {motivos.map((m) => (
                      <li
                        key={m}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-sand"
                    >
                      <Bookmark className="size-4" /> Salvar
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-sand"
                    >
                      <Share2 className="size-4" /> Compartilhar
                    </button>
                    <Link
                      href={`/experiencias/${exp.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Ver detalhes <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      {/* progresso */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>
            Etapa {step + 1} de {totalPassos}
          </span>
          <span>{progresso}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        {isInteresseStep ? (
          <fieldset>
            <legend className="font-serif text-2xl font-semibold text-foreground">
              Quais são seus interesses?
            </legend>
            <p className="mt-2 text-sm text-muted-foreground">
              Selecione quantos quiser.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {(Object.keys(INTERESSES) as Interesse[]).map((i) => {
                const ativo = respostas.interesses.includes(i)
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => toggleInteresse(i)}
                    className={cn(
                      'rounded-full border px-4 py-2.5 text-sm font-medium transition-colors',
                      ativo
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-foreground hover:bg-secondary',
                    )}
                  >
                    {INTERESSES[i]}
                  </button>
                )
              })}
            </div>
          </fieldset>
        ) : grupoAtual ? (
          <fieldset>
            <legend className="font-serif text-2xl font-semibold text-foreground">
              {grupoAtual.titulo}
            </legend>
            {grupoAtual.ajuda && (
              <p className="mt-2 text-sm text-muted-foreground">
                {grupoAtual.ajuda}
              </p>
            )}
            <div className="mt-6 grid gap-3">
              {grupoAtual.opcoes.map((op) => {
                const ativo = respostas[grupoAtual.key] === op.valor
                return (
                  <button
                    key={op.valor}
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => escolher(grupoAtual.key, op.valor)}
                    className={cn(
                      'flex items-center justify-between rounded-xl border px-5 py-4 text-left text-base font-medium transition-colors',
                      ativo
                        ? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary'
                        : 'border-border bg-background text-foreground hover:bg-secondary',
                    )}
                  >
                    {op.label}
                    <span
                      className={cn(
                        'ml-3 size-5 shrink-0 rounded-full border-2',
                        ativo
                          ? 'border-primary bg-primary'
                          : 'border-border',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>
          </fieldset>
        ) : null}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={voltar}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Voltar
          </button>
          <button
            type="button"
            onClick={avancar}
            disabled={!podeAvancar}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:pointer-events-none disabled:opacity-40"
          >
            {step >= totalPassos - 1 ? 'Ver meu caminho' : 'Avançar'}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
