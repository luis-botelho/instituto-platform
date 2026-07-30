'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type FieldType = 'text' | 'textarea' | 'select' | 'number' | 'url'
type DetailField = { name: string; label: string; type?: FieldType; required?: boolean; options?: string[]; hint?: string }
type ParticipationType = { value: string; label: string; title: string; description: string; fields: DetailField[] }

const LOCALIDADES = ['Parque Mambucaba', 'Perequê', 'Vila Histórica de Mambucaba', 'Vila Residencial', 'Vila Operária', 'Praia Brava', 'Praia Vermelha', 'Prainha', 'Barlavento', 'Tarituba', 'Usina', 'Outra localidade']
const VINCULOS = ['Morador(a)', 'Empreendedor(a) local', 'Trabalhador(a) no território', 'Representante de organização comunitária', 'Representante de instituição pública', 'Representante de empresa ou organização privada', 'Visitante ou interessado(a)', 'Outro vínculo']

const PARTICIPATION_TYPES: ParticipationType[] = [
  { value: 'hospedagem', label: 'Cadastrar uma hospedagem', title: 'Cadastro de hospedagem', description: 'Inclua uma hospedagem para a etapa de validação do mapa.', fields: [{ name: 'nome_hospedagem', label: 'Nome da hospedagem', required: true }, { name: 'tipo_hospedagem', label: 'Tipo de hospedagem', type: 'select', required: true, options: ['Pousada', 'Casa de temporada', 'Camping', 'Hospedagem familiar', 'Outro'] }, { name: 'endereco', label: 'Endereço ou referência', required: true }, { name: 'capacidade', label: 'Capacidade de hóspedes', type: 'number' }, { name: 'quartos', label: 'Quantidade de quartos', type: 'number' }, { name: 'diaria', label: 'Faixa de diária' }, { name: 'link', label: 'Site ou rede social', type: 'url' }, { name: 'estrutura', label: 'Estrutura, serviços e acessibilidade', type: 'textarea' }, { name: 'fotos', label: 'Link público para fotos', type: 'url' }] },
  { value: 'empreendimento', label: 'Cadastrar um empreendimento', title: 'Cadastro de empreendimento', description: 'Registre um negócio, serviço, produção ou iniciativa local.', fields: [{ name: 'nome_empreendimento', label: 'Nome da iniciativa', required: true }, { name: 'categoria', label: 'Categoria', type: 'select', required: true, options: ['Gastronomia', 'Artesanato', 'Guia ou condutor', 'Comércio', 'Produção local', 'Serviço', 'Outro'] }, { name: 'endereco', label: 'Endereço ou referência' }, { name: 'horario', label: 'Dias e horários' }, { name: 'link', label: 'Site ou rede social', type: 'url' }, { name: 'descricao', label: 'O que a iniciativa oferece?', type: 'textarea', required: true }, { name: 'fotos', label: 'Link público para fotos', type: 'url' }] },
  { value: 'experiencia', label: 'Propor uma experiência', title: 'Proposta de experiência', description: 'Combine lugares, saberes e vivências para criar um novo caminho.', fields: [{ name: 'nome_experiencia', label: 'Nome ou ideia da experiência', required: true }, { name: 'lugares', label: 'Lugares e localidades envolvidos', required: true }, { name: 'duracao', label: 'Duração aproximada' }, { name: 'capacidade', label: 'Capacidade de participantes', type: 'number' }, { name: 'preco', label: 'Preço ou contribuição' }, { name: 'publico', label: 'Público recomendado' }, { name: 'descricao', label: 'Como seria essa experiência?', type: 'textarea', required: true }, { name: 'cuidados', label: 'Cuidados, acessibilidade ou orientações', type: 'textarea' }, { name: 'fotos', label: 'Link público para fotos', type: 'url' }] },
  { value: 'atrativo', label: 'Indicar um atrativo', title: 'Indicação de atrativo', description: 'Ajude a reconhecer lugares naturais, culturais, históricos e comunitários.', fields: [{ name: 'nome_atrativo', label: 'Nome do atrativo', required: true }, { name: 'tipo', label: 'Tipo', type: 'select', required: true, options: ['Natural', 'Cultural', 'Histórico', 'Comunitário', 'Outro'] }, { name: 'localizacao', label: 'Localização ou referência', required: true }, { name: 'descricao', label: 'Por que este lugar importa?', type: 'textarea', required: true }, { name: 'acesso', label: 'Como chegar e condições de acesso' }, { name: 'conservacao', label: 'Estado de conservação', type: 'select', options: ['Bom','Regular','Precisa de cuidado','Não sei informar'] }, { name: 'link', label: 'Fonte ou fotos', type: 'url' }] },
  { value: 'mapeamento', label: 'Contribuir com o mapeamento territorial', title: 'Contribuição ao mapeamento', description: 'Registre uma referência que merece constar no inventário territorial.', fields: [{ name: 'categoria', label: 'Categoria', type: 'select', required: true, options: ['Lugar', 'Saber', 'Memória', 'Serviço', 'Risco ou cuidado', 'Outro'] }, { name: 'nome', label: 'Nome da referência', required: true }, { name: 'onde_fica', label: 'Onde fica?', required: true }, { name: 'importancia', label: 'Por que é importante?', type: 'textarea', required: true }] },
  { value: 'selo', label: 'Solicitar o Selo Caminhos de Mambucaba', title: 'Interesse no Selo Caminhos', description: 'Apresente sua iniciativa e o motivo do interesse no selo.', fields: [{ name: 'iniciativa', label: 'Nome da iniciativa', required: true }, { name: 'categoria', label: 'Categoria da iniciativa', required: true }, { name: 'tempo', label: 'Tempo de atuação' }, { name: 'registro', label: 'Possui registro formal?', type: 'select', options: ['Sim','Não','Em andamento'] }, { name: 'motivo', label: 'Por que deseja solicitar o selo?', type: 'textarea', required: true }] },
  { value: 'formacao', label: 'Participar de cursos e formações', title: 'Interesse em formação', description: 'Conte quais temas ajudariam no desenvolvimento da sua atuação.', fields: [{ name: 'temas', label: 'Temas de interesse', type: 'textarea', required: true, hint: 'Ex.: gestão, atendimento, comunicação, hospitalidade ou elaboração de projetos.' }, { name: 'periodo', label: 'Melhor período', type: 'select', options: ['Manhã', 'Tarde', 'Noite', 'Fim de semana', 'A combinar'] }] },
  { value: 'voluntario', label: 'Atuar como voluntário', title: 'Cadastro de voluntariado', description: 'Informe como gostaria de colaborar com o programa.', fields: [{ name: 'contribuicao', label: 'Como você pode contribuir?', type: 'textarea', required: true }, { name: 'habilidades', label: 'Habilidades ou experiências' }, { name: 'disponibilidade', label: 'Disponibilidade' }] },
  { value: 'parceiro', label: 'Tornar-se parceiro institucional', title: 'Proposta de parceria', description: 'Apresente a instituição e uma possibilidade de cooperação.', fields: [{ name: 'instituicao', label: 'Instituição ou organização', required: true }, { name: 'cargo', label: 'Cargo ou área de atuação' }, { name: 'tipo_parceria', label: 'Tipo de parceria', type: 'select', options: ['Técnica','Acadêmica','Institucional','Comunitária','Financeira','Outra'] }, { name: 'link', label: 'Site da instituição', type: 'url' }, { name: 'proposta', label: 'Como a parceria pode acontecer?', type: 'textarea', required: true }] },
  { value: 'apoio', label: 'Apoiar o programa', title: 'Apoio ao programa', description: 'Indique um recurso, serviço ou articulação que possa fortalecer o Caminhos.', fields: [{ name: 'tipo_apoio', label: 'Tipo de apoio', type: 'select', required: true, options: ['Recurso financeiro', 'Serviço técnico', 'Espaço', 'Divulgação', 'Articulação', 'Outro'] }, { name: 'descricao', label: 'Descreva a proposta de apoio', type: 'textarea', required: true }] },
  { value: 'sugestao', label: 'Enviar uma sugestão', title: 'Envio de sugestão', description: 'Compartilhe uma ideia, observação ou necessidade para o programa.', fields: [{ name: 'assunto', label: 'Assunto', required: true }, { name: 'sugestao', label: 'Sua sugestão', type: 'textarea', required: true }] },
]

const inputClass = 'rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20'

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return <label className="flex flex-col gap-1.5 text-sm"><span className="font-medium text-foreground">{label}</span>{children}{hint && <span className="text-xs text-muted-foreground">{hint}</span>}</label>
}

function SelectField({ name, options, required = false, placeholder = 'Selecione uma opção' }: { name: string; options: string[]; required?: boolean; placeholder?: string }) {
  return <select name={name} required={required} defaultValue="" className={inputClass}><option value="" disabled>{placeholder}</option>{options.map((option) => <option key={option}>{option}</option>)}</select>
}

export function ParticiparForm() {
  const [type, setType] = useState('')
  const [sent, setSent] = useState(false)
  const [protocol, setProtocol] = useState('')
  const selected = PARTICIPATION_TYPES.find((item) => item.value === type)

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const code = `CAM-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`
    const submission = {
      protocol: code,
      type,
      createdAt: new Date().toISOString(),
      data: Object.fromEntries(new FormData(form).entries()),
    }
    const stored = JSON.parse(localStorage.getItem('caminhos-cadastros') ?? '[]') as unknown[]
    localStorage.setItem('caminhos-cadastros', JSON.stringify([...stored, submission]))
    setProtocol(code)
    setSent(true)
  }

  return <div className="mx-auto max-w-3xl">
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      {sent ? <div className="flex flex-col items-center gap-4 py-8 text-center"><span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary"><CheckCircle2 className="size-7" /></span><h3 className="font-serif text-xl font-semibold text-foreground">Contribuição salva neste dispositivo</h3><p className="max-w-md text-sm leading-relaxed text-muted-foreground">Protocolo local: <strong className="text-foreground">{protocol}</strong>. Enquanto o backend não estiver conectado, este registro permanece somente neste navegador e ainda não foi recebido pela equipe.</p><Button variant="outline" className="rounded-full" onClick={() => setSent(false)}>Nova contribuição</Button></div> : <form onSubmit={submit} className="flex flex-col gap-6">
        <div><h2 className="font-serif text-2xl font-semibold text-foreground">Cadastro Único — Caminhos de Mambucaba</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Escolha como quer participar. O envio não representa aprovação automática ou ingresso imediato no programa.</p></div>
        <Field label="Como você deseja participar?"><select value={type} onChange={(event) => setType(event.target.value)} required className={inputClass}><option value="" disabled>Selecione uma opção</option>{PARTICIPATION_TYPES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></Field>
        <fieldset className="grid gap-5 border-t border-border pt-6 sm:grid-cols-2"><legend className="mb-5 font-serif text-lg font-semibold text-foreground">Identificação e contato</legend><Field label="Nome completo"><input name="nome" required autoComplete="name" className={inputClass} /></Field><Field label="WhatsApp ou telefone"><input name="telefone" required type="tel" autoComplete="tel" className={inputClass} /></Field><Field label="E-mail"><input name="email" required type="email" autoComplete="email" className={inputClass} /></Field><Field label="Localidade"><SelectField name="localidade" options={LOCALIDADES} required /></Field><div className="sm:col-span-2"><Field label="Qual é seu vínculo com Mambucaba?"><SelectField name="vinculo" options={VINCULOS} required /></Field></div></fieldset>
        {selected && <fieldset className="grid gap-5 border-t border-border pt-6 sm:grid-cols-2"><legend className="mb-1 font-serif text-lg font-semibold text-foreground">{selected.title}</legend><p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:col-span-2">{selected.description}</p>{selected.fields.map((field) => <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}><Field label={field.label} hint={field.hint}>{field.type === 'select' ? <SelectField name={field.name} options={field.options ?? []} required={field.required} /> : field.type === 'textarea' ? <textarea name={field.name} required={field.required} className={`${inputClass} min-h-28 resize-y`} /> : <input name={field.name} required={field.required} type={field.type ?? 'text'} className={inputClass} />}</Field></div>)}</fieldset>}
        <Field label="Informações adicionais"><textarea name="observacoes" className={`${inputClass} min-h-24 resize-y`} placeholder="Acrescente qualquer informação importante." /></Field>
        <label className="flex items-start gap-3 text-sm text-muted-foreground"><input name="consentimento" value="autorizado" type="checkbox" required className="mt-1 size-4 accent-primary" /><span>Autorizo o contato para retorno sobre esta contribuição e confirmo que as informações podem ser analisadas no processo de validação.</span></label>
        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-relaxed text-muted-foreground">Sem backend: o rascunho será salvo apenas neste navegador.</p><Button type="submit" className="rounded-full" disabled={!selected}>Salvar contribuição</Button></div>
      </form>}
    </div>
  </div>
}
