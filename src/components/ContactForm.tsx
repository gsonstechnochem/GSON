'use client'

import React, { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      if (!isSupabaseConfigured()) {
        // Graceful fallback when Supabase isn't configured: open WhatsApp instead
        const wa = `https://wa.me/918485998487?text=${encodeURIComponent(
          `Hello G Son's Technochem,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\n${form.message}`
        )}`
        window.open(wa, '_blank')
        setSuccess(true)
        return
      }

      const { error: dbError } = await supabase.from('leads').insert({
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        subject: form.subject.trim() || null,
        message: form.message.trim(),
        source: 'contact_form',
        status: 'new',
      })
      if (dbError) throw dbError

      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err: any) {
      console.error('Contact form error:', err)
      setError(err?.message || 'Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Message Received!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-dark mb-6">Send us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">Full Name *</label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">Email Address *</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter your email address"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-2">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-dark mb-2">Subject *</label>
          <input
            id="subject"
            type="text"
            required
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter the subject"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-dark mb-2">Message *</label>
          <textarea
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Enter your message"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-lg hover:shadow-primary/30 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
