'use client'

import React, { useState, useEffect, useRef } from 'react'
import { fetchTestimonialsWithFallback } from '@/lib/fetchData'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Fetch testimonials from Supabase on mount
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await fetchTestimonialsWithFallback()
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      }
    }
    fetchTestimonials()
  }, [])

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3)
      else if (window.innerWidth >= 768) setItemsPerView(2)
      else setItemsPerView(1)
    }
    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const totalSlides = testimonials.length
  const maxIndex = Math.max(0, totalSlides - itemsPerView)

  // Auto slide
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [isPaused, maxIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) handleNext()
    if (touchStartX.current - touchEndX.current < -50) handlePrev()
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block text-xs md:text-sm font-semibold text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Trusted by contractors, architects, and homeowners across India for quality and reliability.
          </p>
        </div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <Quote className="w-8 h-8 text-accent/30 mb-3" />
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 flex-1 italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center pt-4 border-t border-gray-100">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 ring-2 ring-primary/10">
                        <Image
                          src={testimonial.image || '/placeholder-avatar.png'}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark text-sm">{testimonial.name}</h3>
                        <p className="text-xs text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 text-dark"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 text-dark"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
