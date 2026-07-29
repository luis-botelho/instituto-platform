import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ParticiparForm } from '@/components/participar/participar-form'

export const metadata: Metadata = {
  title: 'Participar | Caminhos de Mambucaba',
  description:
    'Cadastre sua iniciativa, indique lugares e histórias ou proponha experiências. O território de Mambucaba é construído por quem o vive.',
}

const PASSOS = [
  {
    numero: '01',
    titulo: 'Você contribui',
    texto: 'Cadastra uma iniciativa, indica um lugar ou propõe uma experiência.',
  },
  {
    numero: '02',
    titulo: 'A comunidade valida',
    texto: 'As contribuições passam por escuta e validação junto ao território.',
  },
  {
    numero: '03',
    titulo: 'Entra no mapa',
    texto: 'O que é validado passa a compor o mapa, as experiências e o Observatório.',
  },
]

export default function ParticiparPage() {
  return (
    <main id="conteudo">
        <PageHero
          eyebrow="Construir junto"
          title="O território é feito por quem o vive"
          description="Aqui, quem mora, empreende ou pesquisa passa de espectador a coautor. Sua contribuição alimenta o mapa vivo, as experiências e a inteligência territorial de Mambucaba."
        />

        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="grid gap-6 md:grid-cols-3">
              {PASSOS.map((p) => (
                <div
                  key={p.numero}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6"
                >
                  <span className="font-serif text-3xl font-semibold text-primary">{p.numero}</span>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{p.titulo}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <ParticiparForm />
          </div>
        </section>
      </main>
  )
}
