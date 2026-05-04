import React from 'react'
import { fetchProductsWithFallback } from '@/lib/fetchData'
import ProductCard from '@/components/ProductCard'
import Header from '@/components/Header'

export default async function ProductsPage() {
  const products = await fetchProductsWithFallback()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
              Our Products
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore our complete range of tile adhesives, epoxy grouts, cement grouts, and waterproofing solutions designed for professional results and lasting durability.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
