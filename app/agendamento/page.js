'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scissors, ChevronLeft, Check, Calendar, Clock, User, Phone } from 'lucide-react'

const services = [
  { id: 'corte', name: 'Corte Clássico', price: 60, time: '45min' },
  { id: 'barba', name: 'Barba Completa', price: 45, time: '30min' },
  { id: 'combo', name: 'Combo Premium', price: 95, time: '1h 15min' },
  { id: 'pigmentacao', name: 'Pigmentação', price: 70, time: '40min' },
]

const hours = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00','19:00']

export default function Agendamento() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ service: '', date: '', time: '', name: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const submit = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao agendar')
      setSuccess(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const canNext = (step === 1 && form.service) || (step === 2 && form.date && form.time) || (step === 3 && form.name && form.phone)

  if (success) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg">
          <div className="mx-auto mb-8 w-24 h-24 border-2 border-white rounded-full flex items-center justify-center">
            <Check className="h-12 w-12" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl mb-4">Confirmado.</h1>
          <p className="text-white/70 mb-2">Seu horário foi reservado com sucesso.</p>
          <div className="my-8 border border-white/20 p-6 text-left">
            <p className="font-bebas tracking-widest text-white/50 text-sm mb-3">DETALHES</p>
            <p className="font-display text-2xl mb-1">{services.find(s => s.id === form.service)?.name}</p>
            <p className="text-white/70">{new Date(form.date + 'T00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })} às {form.time}</p>
            <p className="text-white/50 text-sm mt-2">Em nome de {form.name}</p>
          </div>
          <Link href="/" className="inline-block bg-white text-black px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-transparent hover:text-white border-2 border-white transition-all">
            Voltar ao início
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </Link>
          <Link href="/" className="flex items-center gap-2 font-bebas text-xl tracking-widest">
            <Scissors className="h-4 w-4" /> BLADE &amp; CO.
          </Link>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="font-bebas tracking-[0.4em] text-white/50 mb-4">AGENDAMENTO</p>
          <h1 className="font-display text-5xl md:text-6xl">Reserve seu <span className="italic">horário</span></h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[1,2,3].map(n => (
            <div key={n} className="flex items-center gap-4">
              <div className={`w-10 h-10 border-2 flex items-center justify-center font-bebas text-lg transition-all ${step >= n ? 'bg-white text-black border-white' : 'border-white/30 text-white/30'}`}>{n}</div>
              {n < 3 && <div className={`w-16 h-px ${step > n ? 'bg-white' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Service */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="font-display text-3xl mb-8 flex items-center gap-3"><Scissors className="h-6 w-6" /> Escolha o serviço</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map(s => (
                <button key={s.id} onClick={() => setForm({...form, service: s.id})} className={`text-left p-6 border-2 transition-all ${form.service === s.id ? 'border-white bg-white/5' : 'border-white/20 hover:border-white/50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-display text-2xl mb-1">{s.name}</p>
                      <p className="text-xs uppercase tracking-widest text-white/50">{s.time}</p>
                    </div>
                    <span className="font-bebas text-2xl">R$ {s.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Date/Time */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="font-display text-3xl mb-8 flex items-center gap-3"><Calendar className="h-6 w-6" /> Data e horário</h2>
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-3">Data</label>
              <input type="date" min={today} value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-transparent border-2 border-white/20 focus:border-white outline-none px-4 py-4 text-lg" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-3">Horário</label>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {hours.map(h => (
                  <button key={h} onClick={() => setForm({...form, time: h})} className={`py-3 border-2 transition-all font-bebas text-lg tracking-widest ${form.time === h ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white/50'}`}>{h}</button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Info */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="font-display text-3xl mb-8 flex items-center gap-3"><User className="h-6 w-6" /> Seus dados</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-3">Nome completo</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="João Silva" className="w-full bg-transparent border-2 border-white/20 focus:border-white outline-none px-4 py-4 text-lg placeholder:text-white/30" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-3">Telefone / WhatsApp</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(11) 99999-9999" className="w-full bg-transparent border-2 border-white/20 focus:border-white outline-none px-4 py-4 text-lg placeholder:text-white/30" />
              </div>
              <div className="border border-white/20 p-6 mt-8">
                <p className="font-bebas tracking-widest text-white/50 text-sm mb-4">RESUMO</p>
                <div className="space-y-2">
                  <p className="flex justify-between"><span className="text-white/60">Serviço</span><span>{services.find(s => s.id === form.service)?.name}</span></p>
                  <p className="flex justify-between"><span className="text-white/60">Data</span><span>{form.date && new Date(form.date + 'T00:00').toLocaleDateString('pt-BR')}</span></p>
                  <p className="flex justify-between"><span className="text-white/60">Horário</span><span>{form.time}</span></p>
                  <p className="flex justify-between pt-2 border-t border-white/10 mt-3"><span className="text-white/60">Total</span><span className="font-bebas text-2xl">R$ {services.find(s => s.id === form.service)?.price}</span></p>
                </div>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-12">
          <button onClick={() => setStep(step - 1)} disabled={step === 1} className="text-sm uppercase tracking-widest text-white/50 hover:text-white disabled:opacity-0 transition-all flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} disabled={!canNext} className="bg-white text-black px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-transparent hover:text-white border-2 border-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black">
              Continuar
            </button>
          ) : (
            <button onClick={submit} disabled={!canNext || loading} className="bg-white text-black px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-transparent hover:text-white border-2 border-white transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? 'Enviando...' : 'Confirmar Agendamento'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
