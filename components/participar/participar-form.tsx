'use client'

import { useState } from 'react'
import { CheckCircle2, HandHeart, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Aba = 'iniciativa' | 'lugar' | 'experiencia'

const ABAS: { id: Aba; label: string; icon: typeof HandHeart; descricao: string }[] = [
  {
    id: 'iniciativa',
    label: 'Cadastrar iniciativa',
    icon: HandHeart,
    descricao: 'Restaurantes, pousadas, produtores, artesãos, guias e comércios locais.',
  },
  {
    id: 'lugar',
    label: 'Indicar um lugar',
    icon: MapPin,
    descricao: 'Sugira lugares, histórias e pontos que fazem parte do território.',
  },
  {
    id: 'experiencia',
    label: 'Propor experiência',
    icon: Sparkles,
    descricao: 'Proponha um caminho que combine lugares, saberes e vivências.',
  },
]

function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

const inputClass =
  'rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20'

export function ParticiparForm() {
  const [aba, setAba] = useState<Aba>('iniciativa')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Protótipo: nenhum dado é enviado ou armazenado.
    setEnviado(true)
  }

  const abaAtual = ABAS.find((a) => a.id === aba)!

  return (
    <div className="mx-auto max-w-3xl">
      <div
        role="tablist"
        aria-label="Formas de participar"
        className="grid gap-2 sm:grid-cols-3"
      >
        {ABAS.map((a) => {
          const Icon = a.icon
          const active = a.id === aba
          return (
            <button
              key={a.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => {
                setAba(a.id)
                setEnviado(false)
              }}
              className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${
                active
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <span
                className={`flex size-9 items-center justify-center rounded-full ${
                  active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
                }`}
              >
                <Icon className="size-4" />
              </span>
              <span className="text-sm font-semibold text-foreground">{a.label}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{abaAtual.descricao}</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {enviado ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="size-7" />
            </span>
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Recebemos sua contribuição
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Este é um protótipo demonstrativo, então nenhum dado foi realmente enviado. Numa versão
              publicada, sua contribuição entraria no fluxo de validação comunitária do território.
            </p>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setEnviado(false)}
            >
              Enviar outra contribuição
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Seu nome">
                <input className={inputClass} placeholder="Como podemos te chamar" required />
              </Field>
              <Field label="Contato (WhatsApp ou e-mail)">
                <input className={inputClass} placeholder="Para retornarmos" required />
              </Field>
            </div>

            {aba === 'iniciativa' && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nome da iniciativa">
                    <input className={inputClass} placeholder="Ex.: Pousada Serra & Mar" required />
                  </Field>
                  <Field label="Tipo">
                    <select className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Selecione
                      </option>
                      <option>Onde comer</option>
                      <option>Onde se hospedar</option>
                      <option>O que fazer</option>
                      <option>Serviços e apoio</option>
                      <option>Produção local</option>
                    </select>
                  </Field>
                </div>
                <Field label="Localidade">
                  <input className={inputClass} placeholder="Ex.: Perequê, Frade, Tarituba..." />
                </Field>
              </>
            )}

            {aba === 'lugar' && (
              <>
                <Field label="Nome do lugar ou história">
                  <input
                    className={inputClass}
                    placeholder="Ex.: Casa de Farinha do Sertão"
                    required
                  />
                </Field>
                <Field label="Localidade">
                  <input className={inputClass} placeholder="Onde fica no território" />
                </Field>
              </>
            )}

            {aba === 'experiencia' && (
              <Field
                label="Ideia da experiência"
                hint="Que lugares, saberes e vivências poderiam compor esse caminho?"
              >
                <input className={inputClass} placeholder="Dê um nome ou uma ideia inicial" required />
              </Field>
            )}

            <Field
              label={aba === 'lugar' ? 'Por que este lugar importa?' : 'Conte um pouco mais'}
              hint="Este campo ajuda a equipe a entender o contexto territorial."
            >
              <textarea
                className={`${inputClass} min-h-28 resize-y`}
                placeholder="Escreva livremente..."
              />
            </Field>

            <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Protótipo demonstrativo — nenhuma informação é enviada ou armazenada.
              </p>
              <Button type="submit" className="rounded-full">
                Enviar contribuição
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
