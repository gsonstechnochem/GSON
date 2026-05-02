import React from 'react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Bulk Orders?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Get special pricing for large orders. Contact us for competitive bulk rates and customized solutions for your construction projects.
          </p>
          <Link
            href="/bulk-order"
            className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition-colors"
          >
            Request Bulk Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
