'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from './CartProvider'

export default function FloatingCart() {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  return (
    <Link
      href="/cart"
      className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-40 bg-primary text-white p-3.5 md:p-4 rounded-full shadow-lg hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 active:scale-95 group"
      aria-label="View cart"
    >
      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-md">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
      {/* Desktop Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden lg:block">
        View Cart
      </span>
    </Link>
  )
}
