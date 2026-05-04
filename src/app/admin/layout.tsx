'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Home,
  FileEdit
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { ToastProvider } from '@/components/ToastProvider'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const checkAuth = async () => {
      // Add timeout to prevent infinite loading
      timeoutId = setTimeout(() => {
        console.error('Auth check timeout - redirecting to login')
        router.push('/admin/login')
      }, 5000)

      try {
        const { data: { session } } = await supabase.auth.getSession()
        clearTimeout(timeoutId)
        
        if (!session) {
          router.push('/admin/login')
          return
        }
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Auth error:', error)
        clearTimeout(timeoutId)
        router.push('/admin/login')
      }
    }
    
    checkAuth()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: Home, label: 'Home Content', href: '/admin/content' },
    { icon: MessageSquare, label: 'Testimonials', href: '/admin/testimonials' },
    { icon: HelpCircle, label: 'FAQs', href: '/admin/faqs' },
    { icon: Settings, label: 'Contact Settings', href: '/admin/settings' },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Menu Button */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-primary"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-dark">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-500"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300`}>
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-gray-200">
                <Link href="/admin/dashboard" className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="G Son's Technochem"
                    width={150}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 lg:ml-0 min-h-screen">
            {/* Desktop Header */}
            <div className="hidden lg:flex bg-white border-b border-gray-200 px-6 py-4 items-center justify-end">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>

            {/* Page Content */}
            <div className="p-6 overflow-x-hidden">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
