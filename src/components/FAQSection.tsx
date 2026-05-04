'use client'

import React, { useState, useEffect } from 'react'
import { fetchFAQsWithFallback } from '@/lib/fetchData'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [faqs, setFaqs] = useState<any[]>([])

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const data = await fetchFAQsWithFallback()
        setFaqs(data)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }
    fetchFAQs()
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products and services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.slice(0, 6).map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-semibold text-dark pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
