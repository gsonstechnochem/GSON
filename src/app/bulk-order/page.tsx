import React from 'react'
import Link from 'next/link'
import { Package, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'

export default function BulkOrderPage() {
  const whatsappLink = 'https://wa.me/918485998487?text=Hello%20G%20Son%E2%80%99s%20Technochem%2C%20I%20want%20to%20inquire%20about%20bulk%20orders.'

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
              Bulk Orders
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Planning a large project? Get special pricing and priority service for bulk orders. Contact us for custom quotes.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2">Special Pricing</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Get exclusive discounts on bulk orders. The more you order, the more you save.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2">Priority Delivery</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Fast-track production and shipping for your urgent project needs.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2">Dedicated Support</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Personal account manager to assist with your bulk order requirements.
              </p>
            </div>
          </div>

          {/* Bulk Order Form */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
            <h2 className="text-2xl font-bold text-dark mb-6">Request a Bulk Quote</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-dark mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="products" className="block text-sm font-semibold text-dark mb-2">
                  Products Required *
                </label>
                <textarea
                  id="products"
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="List the products you need (e.g., Tile Adhesive - 50 bags, Epoxy Grout - 20 kg)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-dark mb-2">
                    Estimated Quantity *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., 500 kg, 100 bags"
                  />
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold text-dark mb-2">
                    Required Timeline *
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Within 2 weeks, By end of month"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-dark mb-2">
                  Delivery Location *
                </label>
                <input
                  type="text"
                  id="location"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter delivery city and state"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-dark mb-2">
                  Additional Requirements
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Any specific requirements, delivery instructions, or questions"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg hover:shadow-primary/30 min-h-[48px]"
              >
                Submit Bulk Order Request
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </form>
          </div>

          {/* Contact Options */}
          <div className="bg-gradient-to-br from-primary via-primary-dark to-dark text-white rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl font-bold mb-6">Contact Us Directly</h2>
            <p className="text-gray-200 mb-8 leading-relaxed">
              For immediate assistance with bulk orders, reach out to us directly through any of these channels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white/20 py-4 rounded-xl hover:bg-white/30 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white min-h-[48px]"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp
              </a>
              <a
                href="tel:8485998487"
                className="flex items-center justify-center bg-white/20 py-4 rounded-xl hover:bg-white/30 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white min-h-[48px]"
              >
                <Phone className="w-6 h-6 mr-2" />
                8485998487
              </a>
              <a
                href="mailto:gsonstechnochem@gmail.com"
                className="flex items-center justify-center bg-white/20 py-4 rounded-xl hover:bg-white/30 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white min-h-[48px]"
              >
                <Mail className="w-6 h-6 mr-2" />
                Email Us
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
            <h2 className="text-2xl font-bold text-dark mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-dark mb-2">What is the minimum order quantity for bulk pricing?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bulk pricing typically applies to orders of 100 kg or more. However, we offer flexible pricing based on your specific requirements. Contact us for a custom quote.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-2">How long does it take to process bulk orders?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Standard bulk orders are processed within 3-5 business days. For urgent requirements, we offer expedited production at no additional cost for qualifying orders.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-2">Do you offer credit terms for bulk orders?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we offer flexible payment terms for established business customers. Contact our sales team to discuss credit options and set up an account.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-2">Can you ship to locations outside Gujarat?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Absolutely! We deliver across India. Shipping costs and delivery times vary by location. We work with reliable logistics partners to ensure timely delivery.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent hover:shadow-lg hover:shadow-accent/30 min-h-[48px]"
            >
              Browse Our Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
