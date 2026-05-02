import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CartProvider from '@/components/CartProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'G Son\'s Technochem | Tile Adhesive & Epoxy Grout Manufacturer in Gujarat',
  description: 'Industry-grade tile adhesive, epoxy grout, cement grout, and waterproofing solutions. Faith of Generations.',
  keywords: 'tile adhesive, epoxy grout, cement grout, waterproofing, construction chemicals, Gujarat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
