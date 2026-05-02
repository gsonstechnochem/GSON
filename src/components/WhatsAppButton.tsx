import React from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const whatsappLink = 'https://wa.me/918485998487?text=Hello%20G%20Son%E2%80%99s%20Technochem%2C%20I%20want%20to%20inquire%20about%20your%20products.'

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 bg-green-500 text-white p-3.5 md:p-4 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 active:scale-95 whatsapp-pulse group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      {/* Desktop Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden lg:block">
        Chat with us
      </span>
    </a>
  )
}
