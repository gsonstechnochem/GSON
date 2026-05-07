import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import FloatingCart from '@/components/FloatingCart'
import CartProvider from '@/components/CartProvider'
import { ToastProvider } from '@/components/ToastProvider'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastProvider>
      <CartProvider>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingCart />
        <WhatsAppButton />
      </CartProvider>
    </ToastProvider>
  )
}
