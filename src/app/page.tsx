import HeroSection from '@/components/HeroSection'
import USPStrip from '@/components/USPStrip'
import FeaturedProducts from '@/components/FeaturedProducts'
import CTASection from '@/components/CTASection'
import TestimonialSection from '@/components/TestimonialSection'
import FAQSection from '@/components/FAQSection'
import Link from 'next/link'
import { MessageCircle, ArrowRight, CheckCircle, Package, Settings, Truck, Building, Home as HomeIcon, Hammer, Wrench, Phone, MessageCircle as WhatsApp, Shield, Droplets, Building2 } from 'lucide-react'

export default function Home() {
  return (
    <>
      <HeroSection />
      <USPStrip />
      
      {/* Why Choose G Son's Technochem */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
              Why Choose G Son&apos;s Technochem?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Premium construction chemical solutions trusted by builders and contractors across India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">High Bonding Strength</h3>
              <p className="text-gray-600 leading-relaxed">
                Superior adhesive strength for long-lasting tile installations
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Crack Resistant Formula</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced formula prevents cracks and ensures durability
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Water & Chemical Resistance</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete protection against water damage and chemical exposure
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Bulk Supply for Contractors</h3>
              <p className="text-gray-600 leading-relaxed">
                Reliable bulk supply with competitive pricing for large projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
              Our Product Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive range of construction chemicals for all your tiling needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100 hover:border-primary">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-3 text-lg group-hover:text-primary transition-colors">Tile Adhesive</h3>
                <p className="text-gray-600 leading-relaxed">
                  High-strength adhesives for ceramic, porcelain, and vitrified tiles
                </p>
              </div>
            </Link>
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100 hover:border-primary">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-3 text-lg group-hover:text-primary transition-colors">3 Part Epoxy Grout</h3>
                <p className="text-gray-600 leading-relaxed">
                  Premium epoxy grout for stain-resistant, durable tile joints
                </p>
              </div>
            </Link>
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100 hover:border-primary">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-3 text-lg group-hover:text-primary transition-colors">Cement Grout</h3>
                <p className="text-gray-600 leading-relaxed">
                  Cost-effective cement-based grouts for general tiling applications
                </p>
              </div>
            </Link>
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100 hover:border-primary">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Droplets className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-3 text-lg group-hover:text-primary transition-colors">Waterproofing Solutions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive waterproofing for roofs, bathrooms, and foundations
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
              Application Areas
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our products are suitable for a wide range of construction projects
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <HomeIcon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Residential Projects</h3>
              <p className="text-gray-600 leading-relaxed">
                Ideal for homes, apartments, and residential complexes
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Building className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Commercial Buildings</h3>
              <p className="text-gray-600 leading-relaxed">
                Perfect for offices, malls, and commercial establishments
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Bathroom & Kitchen Tiling</h3>
              <p className="text-gray-600 leading-relaxed">
                Waterproof solutions for wet areas and kitchens
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Hammer className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Flooring & Wall Tiles</h3>
              <p className="text-gray-600 leading-relaxed">
                Superior bonding for all types of flooring and wall applications
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Large Construction Sites</h3>
              <p className="text-gray-600 leading-relaxed">
                Bulk supply capabilities for large-scale construction projects
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-3 text-lg">Renovation Projects</h3>
              <p className="text-gray-600 leading-relaxed">
                Perfect for renovation and remodeling applications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Order CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Need Bulk Supply for Your Project?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Get reliable construction chemical solutions with consistent quality, competitive pricing, and timely supply for your large-scale projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bulk-order"
                className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent hover:shadow-lg hover:shadow-accent/30 min-h-[48px]"
              >
                Request Bulk Pricing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:8485998487"
                className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg min-h-[48px]"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <CTASection />
      
      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Trusted by builders, contractors, and construction professionals across India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">RV</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Rakesh Verma</h4>
                  <p className="text-sm text-gray-600">Contractor</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;Epoxy grout quality is excellent. The finish is smooth and durable.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">JP</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Jignesh Patel</h4>
                  <p className="text-sm text-gray-600">Builder</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;Best adhesive in this price range. Good bonding strength and easy application.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">SS</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Sanjay Singh</h4>
                  <p className="text-sm text-gray-600">Tile Installer</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;The product is easy to use and gives a clean finish.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">MP</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Mahesh Prajapati</h4>
                  <p className="text-sm text-gray-600">Contractor</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;Reliable material for bulk construction work. Timely support and quality supply.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">AS</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Amit Shah</h4>
                  <p className="text-sm text-gray-600">Developer</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;We used G Son&apos;s products for multiple sites and the performance was consistent.&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">RS</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Rohit Sharma</h4>
                  <p className="text-sm text-gray-600">Interior Contractor</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;Good waterproofing and grout solutions for premium tiling work.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-dark mb-3 text-lg">What is epoxy grout used for?</h3>
              <p className="text-gray-700 leading-relaxed">
                Epoxy grout is used for filling tile joints with high strength, durability, and water resistance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-dark mb-3 text-lg">How long does epoxy grout take to cure?</h3>
              <p className="text-gray-700 leading-relaxed">
                It usually takes around 24 hours for proper curing.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-dark mb-3 text-lg">Do you provide bulk supply?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, G Son&apos;s Technochem provides bulk supply for builders, contractors, and construction professionals.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-dark mb-3 text-lg">Which products do you manufacture?</h3>
              <p className="text-gray-700 leading-relaxed">
                We manufacture tile adhesive, 3 part epoxy grout, cement grout, and waterproofing materials.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-dark mb-3 text-lg">Is the product suitable for commercial projects?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, our products are suitable for residential and commercial construction projects.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-dark mb-3 text-lg">How can I request pricing?</h3>
              <p className="text-gray-700 leading-relaxed">
                You can request pricing through the bulk order form or WhatsApp inquiry button.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Contact us today for product inquiries, technical support, or bulk orders. Our team is ready to help you find the perfect solution.
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
                <WhatsApp className="mr-2 w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
