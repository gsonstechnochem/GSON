import React from 'react'
import { fetchProductBySlug } from '@/lib/fetchData'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, MessageCircle, ArrowLeft, Check, Package, Settings, Info } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await fetchProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const whatsappMessage = `Hello G Son's Technochem, I want to inquire about ${product.name}.`
  const whatsappLink = `https://wa.me/918485998487?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image */}
            <div className="relative h-96 lg:h-[550px] bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block text-sm font-semibold text-primary bg-primary/5 px-4 py-2 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-gray-500 ml-2 text-lg">/ {product.packSize}</span>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                  Stock: {product.stock} units
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/cart"
                  className="flex items-center justify-center bg-primary text-white py-4 px-8 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg hover:shadow-primary/30 min-h-[48px]"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Link>
                <Link
                  href="/checkout"
                  className="flex items-center justify-center bg-accent text-white py-4 px-8 rounded-xl font-semibold hover:bg-accent-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent hover:shadow-lg hover:shadow-accent/30 min-h-[48px]"
                >
                  Buy Now
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-500 text-white py-4 px-8 rounded-xl font-semibold hover:bg-green-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-lg hover:shadow-green-500/30 min-h-[48px]"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>

              {/* Advantages */}
              <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                  <Check className="w-5 h-5 mr-2 text-primary" />
                  Advantages
                </h2>
                <ul className="space-y-3">
                  {product.advantages.map((advantage: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended For */}
              <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary" />
                  Recommended For
                </h2>
                <ul className="space-y-3">
                  {product.recommendedFor.map((item: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Guidelines */}
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-primary" />
                  Application Guidelines
                </h2>
                <ol className="space-y-3">
                  {product.applicationGuidelines.map((guideline: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{guideline}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-dark mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-primary" />
              Product Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-dark mb-2">Category</h3>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-dark mb-2">Pack Size</h3>
                <p className="text-gray-600">{product.packSize}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-dark mb-2">Price</h3>
                <p className="text-gray-600">{formatPrice(product.price)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-dark mb-2">Availability</h3>
                <p className="text-gray-600">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
