'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ShoppingBag, MessageCircle, Home, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      const storedOrder = localStorage.getItem(`order_${orderId}`)
      if (storedOrder) {
        setOrder(JSON.parse(storedOrder))
      }
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-dark mb-4">Order Not Found</h1>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const whatsappMessage = `Hello G Son's Technochem, I have placed an order with ID: ${orderId}. Please provide an update on my order status.`
  const whatsappLink = `https://wa.me/918485998487?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Message */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for choosing G Son&apos;s Technochem. We appreciate your business and look forward to serving you again.
              </p>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 inline-block">
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="text-2xl font-bold text-primary">{orderId}</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-bold text-dark mb-6">Order Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Name</span>
                  <span className="font-medium text-dark">{order.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium text-dark">{order.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-dark">{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-dark">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-dark mb-4">Items Ordered</h3>
              <div className="space-y-3 mb-6">
                {order.items.map((item: any) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between font-bold text-dark text-lg">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-bold text-dark mb-6">Shipping Address</h2>
              <div className="text-gray-600 leading-relaxed">
                <p className="font-medium text-dark">{order.name}</p>
                <p>{order.address}</p>
                <p>{order.city}, {order.state} - {order.pincode}</p>
                <p className="mt-2">Phone: {order.phone}</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-dark mb-6">What&apos;s Next?</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-7 h-7 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-0.5">1</span>
                  <span className="leading-relaxed">You will receive a confirmation call shortly to verify your order.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-7 h-7 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-0.5">2</span>
                  <span className="leading-relaxed">Your order will be processed and shipped within 1-2 business days.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-7 h-7 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-0.5">3</span>
                  <span className="leading-relaxed">Estimated delivery: 3-5 business days depending on your location.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all hover:shadow-lg hover:shadow-green-500/30"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Track on WhatsApp
              </a>
              <Link
                href="/"
                className="flex items-center justify-center bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/30"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/products"
                className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}
