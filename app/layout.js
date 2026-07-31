import { Inter, Playfair_Display, Bebas_Neue } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' })

export const metadata = {
  title: 'BLADE & CO. — Barbearia Premium',
  description: 'A arte da barbearia clássica. Agende seu horário.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${bebas.variable}`}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
