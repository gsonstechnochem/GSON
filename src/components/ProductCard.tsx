'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/data/products'
import { useCart } from './CartProvider'
import { useToast } from './ToastProvider'
import { ShoppingCart, MessageCircle, Eye, ArrowRight, Check } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    showToast('success', 'Product added to cart')
    setTimeout(() => setAdded(false), 2000)
  }

  const whatsappMessage = `Hello G Son's Technochem, I want to inquire about ${product.name}.`
  const whatsappLink = `https://wa.me/918485998487?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-56 md:h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <span className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              Featured
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full mb-2">
            {product.category}
          </span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-dark text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ {product.packSize}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center bg-gray-100 text-dark py-4 rounded-xl hover:bg-gray-200 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium group min-h-[44px]"
          >
            <Eye className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">View</span>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className="flex items-center justify-center bg-primary text-white py-4 rounded-xl hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg hover:shadow-primary/30 text-sm font-semibold min-h-[44px] disabled:bg-green-500 disabled:cursor-default"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 text-white py-4 rounded-xl hover:bg-green-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-lg hover:shadow-green-500/30 text-sm font-semibold min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Chat</span>
          </a>
        </div>
      </div>
    </div>
  )
}
