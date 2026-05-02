import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Shield, Droplets, Truck, Phone } from 'lucide-react'

export default function HeroSection() {
  const badges = [
    { icon: CheckCircle2, label: 'High Strength' },
    { icon: Shield, label: 'Crack Resistant' },
    { icon: Droplets, label: 'Waterproof' },
    { icon: Truck, label: 'Bulk Supply' },
  ]

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-dark text-white py-12 md:py-20 lg:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0di0yaC0ydjJIMzZ6bS0yIDJ2MmgtMnYtMmgyem0yLTJ2MmgydjJoLTJ6bS0yIDJ2MmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs md:text-sm font-medium">Faith of Generations</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                India&apos;s Trusted <span className="text-accent">Tile Adhesive</span> & Epoxy Grout Manufacturer
              </h1>
              <p className="text-lg md:text-xl font-semibold text-accent">
                Stronger Bonds. Flawless Finishes.
              </p>
              <p className="text-base md:text-lg text-gray-200 max-w-xl leading-relaxed">
                High-performance tile adhesive, epoxy grout, cement grout, and waterproofing solutions for builders, contractors, and construction professionals.
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2.5 hover:bg-white/20 transition-all duration-300"
                >
                  <badge.icon className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-accent text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
              >
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 active:scale-95"
              >
                <Phone className="mr-2 w-5 h-5" />
                Contact Us
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 md:pt-6 border-t border-white/10">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-accent">10+</p>
                <p className="text-xs text-gray-300">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-accent">5000+</p>
                <p className="text-xs text-gray-300">Projects</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-accent">100%</p>
                <p className="text-xs text-gray-300">Quality</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-[4/5] max-w-md md:max-w-lg mx-auto">
              {/* Main Image */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="Construction chemicals application"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating Badge - Top */}
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-white rounded-2xl p-3 md:p-4 shadow-2xl hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Certified</p>
                    <p className="text-sm md:text-base font-bold text-dark">ISO Quality</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Bottom */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl p-3 md:p-4 shadow-2xl hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Trusted by</p>
                    <p className="text-sm md:text-base font-bold text-dark">5000+ Pros</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
