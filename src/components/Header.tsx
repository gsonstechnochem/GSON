'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from './CartProvider'
import { Menu, ShoppingCart, Phone } from 'lucide-react'
import SidebarDrawer from './SidebarDrawer'

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/bulk-order', label: 'Bulk Order' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">

            {/* Logo */}
            <Link href="/" className="flex items-center active:scale-95 transition-transform">
              <div className="relative h-10 sm:h-11 md:h-12 lg:h-14 w-40 sm:w-44 md:w-52 lg:w-60">
                <Image
                  src="/logo.png"
                  alt="G Sons Technochem"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="(max-width: 768px) 176px, 240px"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative ${
                    pathname === link.href
                      ? 'text-primary font-semibold'
                      : 'text-dark hover:text-primary'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-2 md:space-x-4">

              {/* Phone CTA */}
              <a
                href="tel:8485998487"
                className="hidden md:flex items-center px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              >
                <Phone className="w-4 h-4 mr-2" />
                8485998487
              </a>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 hover:bg-gray-100 rounded-full transition-all duration-300 active:scale-95 group"
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-dark group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2.5 hover:bg-gray-100 rounded-full transition-all duration-300 active:scale-95"
              >
                <Menu className="w-6 h-6 text-dark" />
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <SidebarDrawer 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  )
}