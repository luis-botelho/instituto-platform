'use client'

import { useMemo, useRef, useState } from 'react'
import { Check, Copy, Download, Printer, RotateCcw } from 'lucide-react'

type Demand = { nome: string; email: string; localidade: string; tipo: string; tema: string; referencia: string; relato: string }
const initial: Demand = { nome: '', email: '', localidade: '', tipo: '', tema: '', referencia: '', relato: '' }
const input = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'

function buildDocument(data: Demand) {
  const subject = `${data.tipo}: ${data.tema} — ${data.localidade}`
  return `PEDIDO DE INFORMAÇÃO / MANIFESTAÇÃO CIDADÃ

Assunto: ${subject}
Localidade: ${data.localidade}
Referência territorial: ${data.referencia || 'Não informada'}

Relato apresentado pelo cidadão:
${data.relato.trim()}

Solicitação estruturada:
Solicita-se ao órgão competente que informe as providências existentes ou previstas relacionadas ao tema “${data.tema}” na localidade ${data.localidade}, especialmente quanto à situação relatada acima. Solicita-se, quando aplicável, a indicação do setor responsável, prazo estimado, número de processo, contrato, ordem de serviço ou outro documento público que permita acompanhar o atendimento.

Esta minuta foi organizada automaticamente a partir do relato do usuário. Ela deve ser revisada antes do envio e não comprova os fatos narrados, não oferece assessoria jurídica e não substitui o protocolo em canal oficial.

Solicitante: ${data.nome}
Contato: ${data.email}`
}

export function DemandForm() {
  const [data, setData] = useState(initial)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const documentRef = useRef<HTMLDivElement>(null)
  const document = useMemo(() => buildDocument(data), [data])
  const update = (key: keyof Demand, value: string) => setData((current) => ({ ...current, [key]: value }))

  function submit(event: React.FormEvent) {
    event.preventDefault()
    setGenerated(true)
    localStorage.setItem('observatorio-demanda-rascunho', JSON.stringify({ ...data, createdAt: new Date().toISOString() }))
    requestAnimationFrame(() => documentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  async function copy() {
    await navigator.clipboard.writeText(document)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  function download() {
    const blob = new Blob([document], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = window.document.createElement('a')
    anchor.href = url
    anchor.download = `demanda-${data.tema.toLowerCase().replaceAll(' ', '-')}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 className="font-serif text-2xl font-semibold">Conte o que está acontecendo</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Preencha apenas dados necessários. Não informe documentos, prontuários ou dados pessoais de terceiros.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Nome<input required value={data.nome} onChange={(e) => update('nome', e.target.value)} className={`${input} mt-1.5`} /></label>
          <label className="text-sm font-medium">E-mail<input required type="email" value={data.email} onChange={(e) => update('email', e.target.value)} className={`${input} mt-1.5`} /></label>
          <label className="text-sm font-medium">Localidade<select required value={data.localidade} onChange={(e) => update('localidade', e.target.value)} className={`${input} mt-1.5`}><option value="">Selecione</option>{['Parque Mambucaba','Perequê','Vila Histórica','Praia Brava','Praia Vermelha','Tarituba','Outra'].map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="text-sm font-medium">Manifestação<select required value={data.tipo} onChange={(e) => update('tipo', e.target.value)} className={`${input} mt-1.5`}><option value="">Selecione</option>{['Pedido de informação','Reclamação','Sugestão','Denúncia','Elogio'].map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="text-sm font-medium">Tema<select required value={data.tema} onChange={(e) => update('tema', e.target.value)} className={`${input} mt-1.5`}><option value="">Selecione</option>{['Saúde','Educação','Mobilidade','Saneamento','Drenagem e rios','Iluminação','Obras','Meio ambiente','Outro'].map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="text-sm font-medium">Rua ou referência<input value={data.referencia} onChange={(e) => update('referencia', e.target.value)} className={`${input} mt-1.5`} /></label>
          <label className="text-sm font-medium sm:col-span-2">Relato<textarea required minLength={30} value={data.relato} onChange={(e) => update('relato', e.target.value)} className={`${input} mt-1.5 min-h-36 resize-y`} placeholder="Descreva o problema, quando acontece e como afeta a comunidade." /></label>
        </div>
        <button className="mt-6 w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Organizar meu relato</button>
      </form>

      <div ref={documentRef} className="scroll-mt-24">
        {generated ? (
          <div className="rounded-2xl border border-primary/30 bg-card p-6 md:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"><Check className="size-3.5" /> Minuta pronta para revisão</span>
            <h2 className="mt-4 font-serif text-2xl font-semibold">Pedido estruturado</h2>
            <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-xl bg-secondary/40 p-4 font-sans text-sm leading-relaxed">{document}</pre>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold">{copied ? <Check className="size-4" /> : <Copy className="size-4" />}{copied ? 'Copiado' : 'Copiar'}</button>
              <button onClick={download} className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold"><Download className="size-4" />Baixar</button>
              <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold"><Printer className="size-4" />Imprimir</button>
              <button onClick={() => { setData(initial); setGenerated(false) }} className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold"><RotateCcw className="size-4" />Recomeçar</button>
            </div>
            <a href="https://transparencia.angra.rj.gov.br/ouvidoria" target="_blank" rel="noreferrer" className="mt-5 block rounded-xl bg-accent p-4 text-center text-sm font-semibold text-accent-foreground">Revisar e abrir a Ouvidoria oficial</a>
          </div>
        ) : <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-8"><h2 className="font-serif text-2xl font-semibold">Sua minuta aparecerá aqui</h2><p className="mt-3 leading-relaxed text-muted-foreground">O texto será estruturado no seu navegador. Nada é enviado ao Observatório nesta etapa.</p></div>}
      </div>
    </div>
  )
}
