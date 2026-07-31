'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Scissors, ChevronLeft, Calendar, Clock, User, Phone, Trash2, RefreshCw, Filter } from 'lucide-react'

const SERVICE_LABELS = {
  corte: 'Corte Clássico',
  barba: 'Barba Completa',
  combo: 'Combo Premium',
  pigmentacao: 'Pigmentação',
}
const SERVICE_PRICE = { corte: 60, barba: 45, combo: 95, pigmentacao: 70 }

export default function Admin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/appointments')
      const data = await res.json()
      setItems(data.appointments || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const remove = async (id) => {
    if (!confirm('Cancelar este agendamento?')) return
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' })
    load()
  }

  const today = new Date().toISOString().split('T')[0]
  const filtered = items.filter(it => {
    if (filter === 'today') return it.date === today
    if (filter === 'upcoming') return it.date >= today
    return true
  }).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

  const totalRevenue = filtered.reduce((s, i) => s + (SERVICE_PRICE[i.service] || 0), 0)

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4 sticky top-0 bg-black/80 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest">
            <ChevronLeft className="h-4 w-4" /> Site
          </Link>
          <Link href="/" className="flex items-center gap-2 font-bebas text-xl tracking-widest">
            <Scissors className="h-4 w-4" /> BLADE &amp; CO. — ADMIN
          </Link>
          <button onClick={load} className="text-sm uppercase tracking-widest text-white/70 hover:text-white flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="font-bebas tracking-[0.4em] text-white/50 mb-4">PAINEL DO DONO</p>
          <h1 className="font-display text-5xl md:text-6xl">Agendamentos</h1>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-px bg-white/10 mb-10">
          {[
            { l: 'Total', v: items.length },
            { l: 'Hoje', v: items.filter(i => i.date === today).length },
            { l: 'Futuros', v: items.filter(i => i.date >= today).length },
            { l: 'Receita filtrada', v: `R$ ${totalRevenue}` },
          ].map(s => (
            <div key={s.l} className="bg-black p-6">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">{s.l}</p>
              <p className="font-display text-4xl">{s.v}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-8">
          <Filter className="h-4 w-4 text-white/50" />
          {[['all','Todos'],['today','Hoje'],['upcoming','Futuros']].map(([k,l]) => (
            <button key={k} onClick={() => setFilter(k)} className={`px-4 py-2 text-xs uppercase tracking-widest border-2 transition-all ${filter === k ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white/50'}`}>{l}</button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <p className="text-white/50 text-center py-20">Carregando...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-white/10">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-white/30" />
            <p className="text-white/50">Nenhum agendamento encontrado.</p>
          </div>
        ) : (
          <div className="border border-white/10 divide-y divide-white/10">
            {filtered.map((it, i) => (
              <motion.div key={it.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="grid grid-cols-12 gap-4 p-6 hover:bg-white/5 transition-colors items-center">
                <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-bebas text-xl">
                    {new Date(it.date + 'T00:00').getDate()}
                  </div>
                  <div>
                    <p className="font-display text-lg leading-tight">{new Date(it.date + 'T00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}</p>
                    <p className="text-white/50 text-sm flex items-center gap-1"><Clock className="h-3 w-3" /> {it.time}</p>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <p className="text-xs uppercase tracking-widest text-white/50">Serviço</p>
                  <p className="font-display text-lg">{SERVICE_LABELS[it.service] || it.service}</p>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <p className="text-xs uppercase tracking-widest text-white/50">Cliente</p>
                  <p className="flex items-center gap-2"><User className="h-3 w-3" /> {it.name}</p>
                </div>
                <div className="col-span-8 md:col-span-2">
                  <p className="text-xs uppercase tracking-widest text-white/50">Contato</p>
                  <a href={`tel:${it.phone}`} className="flex items-center gap-2 hover:underline"><Phone className="h-3 w-3" /> {it.phone}</a>
                </div>
                <div className="col-span-4 md:col-span-1 flex justify-end">
                  <button onClick={() => remove(it.id)} className="p-2 text-white/50 hover:text-red-400 transition-colors" title="Cancelar">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
