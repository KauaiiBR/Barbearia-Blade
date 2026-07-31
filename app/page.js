'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scissors, Clock, MapPin, Instagram, Phone, Star, ChevronRight } from 'lucide-react'

const HERO_IMG = 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc4NTM3NTE1NXww&ixlib=rb-4.1.0&q=85'
const TOOLS_IMG = 'https://images.unsplash.com/photo-1549271568-e87e07c5406b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxiYXJiZXJzaG9wfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc4NTM3NTE1NXww&ixlib=rb-4.1.0&q=85'
const HAIRCUT_IMG = 'https://images.unsplash.com/photo-1578390432942-d323db577792?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHw0fHxiYXJiZXJzaG9wfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc4NTM3NTE1NXww&ixlib=rb-4.1.0&q=85'
const SHAVE_IMG = 'https://images.unsplash.com/photo-1532710093739-9470acff878f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwzfHxiYXJiZXJzaG9wfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc4NTM3NTE1NXww&ixlib=rb-4.1.0&q=85'

const services = [
  { name: 'Corte Clássico', price: 'R$ 60', desc: 'Corte tradicional com acabamento perfeito.', time: '45min' },
  { name: 'Barba Completa', price: 'R$ 45', desc: 'Toalha quente, navalha e óleos essenciais.', time: '30min' },
  { name: 'Combo Premium', price: 'R$ 95', desc: 'Corte + barba + tratamento capilar.', time: '1h 15min' },
  { name: 'Pigmentação', price: 'R$ 70', desc: 'Disfarce de brancos e realce natural.', time: '40min' },
]

const Nav = () => (
  <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center gap-2 font-bebas text-2xl tracking-widest">
        <Scissors className="h-5 w-5" /> BLADE &amp; CO.
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
        <a href="#servicos" className="link-hover">Serviços</a>
        <a href="#sobre" className="link-hover">Sobre</a>
        <a href="#contato" className="link-hover">Contato</a>
        <Link href="/admin" className="link-hover text-white/50">Admin</Link>
      </nav>
      <Link href="/agendamento" className="group inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white border border-white transition-all">
        Agendar <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </header>
)

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center grain overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Barbershop" className="w-full h-full object-cover grayscale opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />
        </div>

        {/* Barber pole side accents */}
        <div className="hidden md:block absolute left-8 top-1/4 bottom-1/4 w-2 barber-pole opacity-70" />
        <div className="hidden md:block absolute right-8 top-1/4 bottom-1/4 w-2 barber-pole opacity-70" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-bebas text-sm md:text-base tracking-[0.5em] text-white/70 mb-6">
            EST. 2015 — TRADIÇÃO &amp; ESTILO
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight">
            A arte da<br/>
            <span className="italic font-light">barbearia</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="mt-8 text-white/70 max-w-xl mx-auto text-lg">
            Cortes precisos, barbas impecáveis e uma experiência que vai muito além do espelho.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/agendamento" className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-transparent hover:text-white border-2 border-white transition-all">
              Agendar Horário <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#servicos" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:border-white transition-all">
              Ver Serviços
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest">
          Role para baixo
        </motion.div>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/10 bg-white text-black py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12 font-bebas text-3xl tracking-widest">
              <span>CORTE</span><span>◆</span><span>BARBA</span><span>◆</span><span>NAVALHA</span><span>◆</span><span>PIGMENTAÇÃO</span><span>◆</span><span>ESTILO</span><span>◆</span><span>TRADIÇÃO</span><span>◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="font-bebas tracking-[0.4em] text-white/50 mb-4">SOBRE NÓS</p>
            <h2 className="font-display text-5xl md:text-6xl leading-none mb-8">Onde a <span className="italic">navalha</span> encontra a arte.</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Há mais de uma década, refinamos a arte da barbearia clássica combinada com técnicas modernas. Cada corte é uma assinatura, cada barba um ritual.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Nosso ambiente foi pensado para você desacelerar. Café, boa música e mãos experientes.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[['10+', 'Anos'], ['15k', 'Clientes'], ['4.9★', 'Avaliação']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-4xl">{n}</div>
                  <div className="text-xs uppercase tracking-widest text-white/50 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative aspect-[4/5]">
            <img src={TOOLS_IMG} alt="Ferramentas" className="w-full h-full object-cover grayscale" />
            <div className="absolute -bottom-6 -right-6 bg-white text-black p-6 max-w-[220px]">
              <Scissors className="h-6 w-6 mb-2" />
              <p className="font-display text-lg leading-tight">Ferramentas afiadas, mãos precisas.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-32 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-bebas tracking-[0.4em] text-black/50 mb-4">O QUE FAZEMOS</p>
            <h2 className="font-display text-5xl md:text-7xl leading-none">Nossos <span className="italic">serviços</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-black">
            {services.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group bg-white p-10 hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-display text-3xl mb-2">{s.name}</h3>
                    <p className="text-sm uppercase tracking-widest opacity-60 flex items-center gap-2"><Clock className="h-3 w-3" /> {s.time}</p>
                  </div>
                  <span className="font-bebas text-3xl">{s.price}</span>
                </div>
                <p className="opacity-70 mb-6">{s.desc}</p>
                <Link href="/agendamento" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold link-hover">
                  Agendar <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA / CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HAIRCUT_IMG} alt="" className="w-full h-full object-cover grayscale opacity-30" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="font-display text-5xl md:text-7xl leading-none mb-8">
            Pronto para uma<br/><span className="italic">nova versão</span> de você?
          </motion.h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">Reserve seu horário em segundos. Vagas limitadas, cuidado ilimitado.</p>
          <Link href="/agendamento" className="inline-flex items-center gap-2 bg-white text-black px-10 py-5 uppercase tracking-widest text-sm font-semibold hover:bg-transparent hover:text-white border-2 border-white transition-all">
            Agendar Agora <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-bebas tracking-[0.4em] text-white/50 mb-4">DEPOIMENTOS</p>
            <h2 className="font-display text-5xl md:text-6xl">Palavras de <span className="italic">clientes</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Lucas M.', text: 'Melhor barbearia que já frequentei. Atendimento impecável.' },
              { name: 'Rafael T.', text: 'Ambiente único, corte perfeito. Voltarei sempre.' },
              { name: 'André S.', text: 'Profissionalismo do início ao fim. Recomendo demais.' },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="border border-white/10 p-8 hover:border-white/40 transition-colors">
                <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-white" />)}</div>
                <p className="text-white/80 italic mb-6">"{t.text}"</p>
                <p className="font-bebas tracking-widest text-sm">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <footer id="contato" className="border-t border-white/10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 font-bebas text-2xl tracking-widest mb-4"><Scissors className="h-5 w-5" /> BLADE &amp; CO.</div>
            <p className="text-white/60 text-sm">A arte da barbearia clássica, desde 2015.</p>
          </div>
          <div>
            <h4 className="font-bebas tracking-widest mb-4">ENDEREÇO</h4>
            <p className="text-white/70 text-sm flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /> Rua da Barbearia, 123<br/>Centro — Sua Cidade</p>
          </div>
          <div>
            <h4 className="font-bebas tracking-widest mb-4">HORÁRIO</h4>
            <p className="text-white/70 text-sm">Ter – Sáb: 9h às 20h<br/>Dom – Seg: Fechado</p>
          </div>
          <div>
            <h4 className="font-bebas tracking-widest mb-4">CONTATO</h4>
            <p className="text-white/70 text-sm flex items-center gap-2 mb-2"><Phone className="h-4 w-4" /> (11) 99999-9999</p>
            <p className="text-white/70 text-sm flex items-center gap-2"><Instagram className="h-4 w-4" /> @bladeandco</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex justify-between text-xs text-white/40 uppercase tracking-widest">
          <p>© 2025 Blade &amp; Co.</p>
          <p>Feito com precisão.</p>
        </div>
      </footer>
    </main>
  )
}
