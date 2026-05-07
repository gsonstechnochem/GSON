'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/CartProvider'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()
  const cartTotal = getCartTotal()
  const cartCount = getCartCount()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-dark mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8 text-lg">
                Looks like you haven&apos;t added any products to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg hover:shadow-primary/30 min-h-[48px]"
              >
                Browse Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-bold text-dark hover:text-primary transition-colors text-base sm:text-lg mb-1 block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{item.product.category}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">{item.product.packSize}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 sm:w-10 text-center font-semibold text-base sm:text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <div className="text-right">
                            <p className="font-bold text-primary text-base sm:text-xl">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {formatPrice(item.product.price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-dark mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-sm">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-dark text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="flex items-center justify-center w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg hover:shadow-primary/30 mb-4 min-h-[48px]"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/products"
                  className="flex items-center justify-center w-full bg-gray-100 text-dark py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300 min-h-[48px]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
