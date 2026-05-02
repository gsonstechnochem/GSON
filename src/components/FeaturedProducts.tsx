import React from 'react'
import Link from 'next/link'
import { products } from '@/data/products'
import ProductCard from './ProductCard'
import { ArrowRight } from 'lucide-react'

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular tile adhesives, epoxy grouts, and waterproofing solutions trusted by professionals across India.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
