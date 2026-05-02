import React from 'react'
import { Check, Shield, Zap, Droplets } from 'lucide-react'

export default function USPStrip() {
  const usps = [
    {
      icon: Zap,
      title: 'Easy Application',
      description: 'Simple mixing and application process',
    },
    {
      icon: Shield,
      title: 'Non-Cracking',
      description: 'Durable and crack-resistant formula',
    },
    {
      icon: Check,
      title: 'High Bonding Strength',
      description: 'Superior adhesion for lasting results',
    },
    {
      icon: Droplets,
      title: 'Water Resistance',
      description: 'Excellent waterproofing properties',
    },
  ]

  return (
    <section className="bg-white py-12 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {usps.map((usp, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <usp.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-dark mb-2">{usp.title}</h3>
              <p className="text-sm text-gray-600">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
