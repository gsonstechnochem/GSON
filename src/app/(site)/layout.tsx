import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CartProvider from '@/components/CartProvider'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  )
}
