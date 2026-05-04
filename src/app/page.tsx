import HeroSection from '@/components/HeroSection'
import USPStrip from '@/components/USPStrip'
import FeaturedProducts from '@/components/FeaturedProducts'
import CTASection from '@/components/CTASection'
import TestimonialSection from '@/components/TestimonialSection'
import FAQSection from '@/components/FAQSection'
import Header from '@/components/Header'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Package, Settings, Truck, Shield, Droplets, Phone, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <USPStrip />
      
      {/* Why Choose G Son's Technochem */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Why Choose G Son&apos;s Technochem?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Premium construction chemical solutions trusted by builders and contractors across India
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2 text-sm md:text-lg">High Bonding Strength</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Superior adhesive strength for long-lasting tile installations
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2 text-sm md:text-lg">Crack Resistant</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced formula prevents cracks and ensures durability
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2 text-sm md:text-lg">Water Resistant</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete protection against water damage and chemical exposure
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2 text-sm md:text-lg">Bulk Supply</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Reliable bulk supply with competitive pricing for large projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Our Product Categories
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of construction chemicals for all your tiling needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100 hover:border-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-2 group-hover:text-primary transition-colors">Tile Adhesive</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  High-strength adhesives for ceramic, porcelain, and vitrified tiles
                </p>
              </div>
            </Link>
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100 hover:border-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-2 group-hover:text-primary transition-colors">Epoxy Grout</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Premium epoxy grout for stain-resistant, durable tile joints
                </p>
              </div>
            </Link>
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100 hover:border-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-2 group-hover:text-primary transition-colors">Cement Grout</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Cost-effective cement-based grouts for general tiling applications
                </p>
              </div>
            </Link>
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100 hover:border-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-2 group-hover:text-primary transition-colors">Waterproofing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comprehensive waterproofing for roofs, bathrooms, and foundations
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      
      {/* Animated Testimonials */}
      <TestimonialSection />
      
      {/* Animated FAQs */}
      <FAQSection />
      
      <CTASection />

      {/* Contact CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary-dark to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us today for product inquiries, technical support, or bulk orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent hover:shadow-lg hover:shadow-accent/30 min-h-[48px]"
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/918485998487?text=Hello%20G%20Son%E2%80%99s%20Technochem%2C%20I%20want%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg min-h-[48px]"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
