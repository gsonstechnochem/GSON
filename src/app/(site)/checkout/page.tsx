'use client'

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/CartProvider'
import { formatPrice, generateOrderId } from '@/lib/utils'
import { ArrowLeft, CreditCard, Truck } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getCartTotal, clearCart } = useCart()
  const cartTotal = getCartTotal()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
    paymentMethod: 'cod'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return
    setIsSubmitting(true)
    setSubmitError(null)

    const orderNumber = generateOrderId()

    // Build order payload (snake_case to match Supabase schema)
    const orderRow = {
      order_number: orderNumber,
      customer_name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      notes: formData.notes,
      total_amount: cartTotal,
      payment_status: 'pending',
      order_status: 'pending',
    }

    // Persist a local copy first so the success page can render instantly
    // even if Supabase is slow / unreachable.
    const localOrder = {
      id: orderNumber,
      order_number: orderNumber,
      ...formData,
      items: cart,
      total: cartTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem(`order_${orderNumber}`, JSON.stringify(localOrder))
    } catch {}

    // Save to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const { data: inserted, error: orderErr } = await supabase
          .from('orders')
          .insert(orderRow)
          .select('id')
          .single()

        if (orderErr) throw orderErr

        const orderId = inserted?.id
        if (orderId && cart.length > 0) {
          const items = cart.map((item) => ({
            order_id: orderId,
            product_id: typeof item.product.id === 'string' && item.product.id.length > 20 ? item.product.id : null,
            product_name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            subtotal: item.product.price * item.quantity,
          }))
          const { error: itemsErr } = await supabase.from('order_items').insert(items)
          if (itemsErr) console.error('order_items insert failed:', itemsErr)
        }
      } catch (err: any) {
        console.error('Order save failed:', err)
        setSubmitError(err?.message || 'Could not save order. Please try again or contact us via WhatsApp.')
        setIsSubmitting(false)
        return
      }
    }

    clearCart()
    router.push(`/order-success?orderId=${orderNumber}`)
  }

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart')
    }
  }, [cart.length, router])

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-primary hover:text-primary-dark mb-8 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-dark mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-semibold text-dark mb-2">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-dark mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-dark mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-semibold text-dark mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Pincode"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="notes" className="block text-sm font-semibold text-dark mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Any special instructions for your order"
                  />
                </div>

                <h2 className="text-xl font-bold text-dark mb-6">Payment Method</h2>
                
                <div className="space-y-3 mb-8">
                  <label className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all hover:bg-primary/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary flex-shrink-0"
                    />
                    <span className="ml-3 font-medium text-dark text-sm sm:text-base">Cash on Delivery (COD)</span>
                  </label>
                  <label className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-all hover:bg-primary/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary flex-shrink-0"
                    />
                    <span className="ml-3 font-medium text-dark text-sm sm:text-base flex-1">Online Payment (Razorpay)</span>
                    <CreditCard className="w-5 h-5 ml-2 text-gray-400 flex-shrink-0" />
                  </label>
                </div>

                {submitError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 min-h-[48px]"
                >
                  {isSubmitting ? 'Placing your order...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-dark mb-6">Order Summary</h2>
                
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start text-sm gap-2">
                      <span className="text-gray-600 flex-1 break-words">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-medium flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-dark text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 mb-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark text-sm">Free Shipping</p>
                      <p className="text-xs text-gray-600 mt-1">Estimated delivery: 3-5 business days</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our Terms and Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
