import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'G Son\'s Technochem | Tile Adhesive & Epoxy Grout Manufacturer in Gujarat',
  description: 'Industry-grade tile adhesive, epoxy grout, cement grout, and waterproofing solutions. Faith of Generations.',
  keywords: 'tile adhesive, epoxy grout, cement grout, waterproofing, construction chemicals, Gujarat',
  openGraph: {
    title: 'G Son\'s Technochem | Tile Adhesive & Epoxy Grout Manufacturer',
    description: 'Industry-grade tile adhesive, epoxy grout, cement grout, and waterproofing solutions. Faith of Generations.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G Son\'s Technochem | Tile Adhesive & Epoxy Grout Manufacturer',
    description: 'Industry-grade tile adhesive, epoxy grout, cement grout, and waterproofing solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
