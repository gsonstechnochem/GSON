import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'

export default function ContactPage() {
  const whatsappLink = 'https://wa.me/918485998487?text=Hello%20G%20Son%E2%80%99s%20Technochem%2C%20I%20want%20to%20inquire%20about%20your%20products.'

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about our products or need technical support? We&apos;re here to help. Reach out to G Son&apos;s Technochem today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-6">Send us a Message</h2>
              <form className="space-y-6">
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
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-dark mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter the subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-dark mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg hover:shadow-primary/30 min-h-[48px]"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-dark mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">Address</h3>
                      <p className="text-gray-600 leading-relaxed">
                        5 Golden Estate, Near Maruti Suzuki Showroom,<br />
                        Chhatral Kadi Highway, Kadi – 384440
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">Phone</h3>
                      <p className="text-gray-600 leading-relaxed">
                        <a href="tel:8485998487" className="hover:text-primary transition-colors">
                          8485998487
                        </a>
                        <br />
                        <a href="tel:7016717742" className="hover:text-primary transition-colors">
                          7016717742
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">Email</h3>
                      <p className="text-gray-600 leading-relaxed">
                        <a href="mailto:gsonstechnochem@gmail.com" className="hover:text-primary transition-colors">
                          gsonstechnochem@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">Business Hours</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-lg hover:shadow-green-500/30 min-h-[48px]"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-16">
            <h2 className="text-2xl font-bold text-dark mb-6">Find Us on Map</h2>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-64 md:h-96 flex items-center justify-center">
              <p className="text-gray-600 font-medium">Map will be integrated here</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8">Quick Links</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary font-medium min-h-[48px]"
              >
                Browse Products
              </Link>
              <Link
                href="/bulk-order"
                className="px-8 py-4 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary font-medium min-h-[48px]"
              >
                Bulk Orders
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary font-medium min-h-[48px]"
              >
                About Us
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary font-medium min-h-[48px]"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
