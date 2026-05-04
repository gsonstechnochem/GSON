import React from 'react'
import Link from 'next/link'
import { Award, Target, Users, Shield, ArrowRight } from 'lucide-react'
import { fetchSiteContent } from '@/lib/fetchData'
import Header from '@/components/Header'

export default async function AboutPage() {
  const aboutContent = await fetchSiteContent('about_page', {
    title: 'About G Son\'s Technochem',
    subtitle: 'India\'s trusted manufacturer of premium tile adhesives, epoxy grouts, and waterproofing solutions since 2015.',
    content: 'Founded in 2015, G Son\'s Technochem has grown from a small manufacturing unit to one of India\'s most trusted names in construction chemicals. Based in Kadi, Gujarat, we specialize in producing high-quality tile adhesives, epoxy grouts, cement grouts, and waterproofing solutions.\n\nOur journey began with a simple mission: to provide Indian contractors, architects, and homeowners with world-class construction materials at competitive prices. Over the years, we have invested heavily in research and development, ensuring our products meet international quality standards.\n\nToday, our products are used in thousands of construction projects across India, from residential homes to commercial complexes. Our commitment to quality, innovation, and customer satisfaction has made us a preferred choice for construction professionals nationwide.',
    image_url: ''
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
              {aboutContent.title || 'About G Son\'s Technochem'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {aboutContent.subtitle || 'India\'s trusted manufacturer of premium tile adhesives, epoxy grouts, and waterproofing solutions since 2015.'}
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
            <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {aboutContent.content ? (
                aboutContent.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                ))
              ) : (
                <>
                  <p className="mb-4">
                    Founded in 2015, G Son&apos;s Technochem has grown from a small manufacturing unit to one of India&apos;s most trusted names in construction chemicals. Based in Kadi, Gujarat, we specialize in producing high-quality tile adhesives, epoxy grouts, cement grouts, and waterproofing solutions.
                  </p>
                  <p className="mb-4">
                    Our journey began with a simple mission: to provide Indian contractors, architects, and homeowners with world-class construction materials at competitive prices. Over the years, we have invested heavily in research and development, ensuring our products meet international quality standards.
                  </p>
                  <p>
                    Today, our products are used in thousands of construction projects across India, from residential homes to commercial complexes. Our commitment to quality, innovation, and customer satisfaction has made us a preferred choice for construction professionals nationwide.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Our Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2">Quality First</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We never compromise on quality. Every product undergoes rigorous testing before reaching our customers.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2">Innovation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Continuous research and development to bring you the latest in construction chemical technology.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <span className="font-semibold text-dark mb-2">Customer Focus</span>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our customers are at the heart of everything we do. We&apos;re committed to your success.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-dark mb-2">Reliability</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Consistent quality and dependable supply to keep your projects on schedule.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-br from-primary via-primary-dark to-dark text-white rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold mb-8">Why Choose G Son&apos;s Technochem?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <span className="font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Premium Quality Products</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Our products are manufactured using the finest raw materials and advanced production techniques.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <span className="font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Competitive Pricing</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    We offer the best value for money without compromising on quality.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <span className="font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Technical Support</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Our team of experts is always available to provide guidance and support for your projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <span className="font-bold text-lg">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Pan-India Delivery</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    We deliver our products to every corner of India with reliable shipping partners.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Products */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
            <h2 className="text-3xl font-bold text-dark mb-8">Our Product Range</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-dark mb-2">Tile Adhesives</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  High-strength adhesives for all types of tiles - ceramic, porcelain, vitrified, and natural stone.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-dark mb-2">Epoxy Grouts</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Premium epoxy grouts for stain-resistant, durable, and beautiful tile joints.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-dark mb-2">Cement Grouts</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Cost-effective cement-based grouts for general tiling applications.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-dark mb-2">Waterproofing</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Comprehensive waterproofing solutions for roofs, bathrooms, and foundations.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-dark mb-2">Tile Cleaners</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Specialized cleaners for maintaining the beauty of your tiled surfaces.
                </p>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-dark mb-2">Construction Chemicals</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A range of specialized chemicals for various construction needs.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Ready to Work With Us?</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Contact us today to discuss your project requirements or request a bulk quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/30"
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/bulk-order"
                className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-dark transition-all hover:shadow-lg hover:shadow-accent/30"
              >
                Request Bulk Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
