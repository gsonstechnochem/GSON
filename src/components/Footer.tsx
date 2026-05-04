'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import { fetchContactSettings } from '@/lib/fetchData'

export default function Footer() {
  const [contactSettings, setContactSettings] = useState<any>({})

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await fetchContactSettings()
        setContactSettings(data)
      } catch (error) {
        console.error('Error fetching contact settings:', error)
      }
    }
    fetchSettings()
  }, [])

  return (
    <footer className="bg-gradient-to-br from-primary via-primary-dark to-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="relative h-12 md:h-14 w-48 md:w-56 brightness-0 invert">
                <Image
                  src="/logo.png"
                  alt="G Sons Technochem"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 192px, 224px"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {contactSettings.company_name || "G Son's Technochem"} - Faith of Generations. Industry-grade tile adhesive, epoxy grout, cement grout, and waterproofing solutions.
            </p>
            <div className="flex space-x-4">
              {contactSettings.social_facebook && (
                <a href={contactSettings.social_facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {contactSettings.social_instagram && (
                <a href={contactSettings.social_instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {contactSettings.social_linkedin && (
                <a href={contactSettings.social_linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/bulk-order" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Bulk Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Tile Adhesive
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Epoxy Grout
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Cement Grout
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Waterproofing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactSettings.address && (
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    {contactSettings.address}{contactSettings.city && `, ${contactSettings.city}`}{contactSettings.state && `, ${contactSettings.state}`}{contactSettings.pincode && ` - ${contactSettings.pincode}`}
                  </span>
                </li>
              )}
              {contactSettings.phone && (
                <li className="flex items-center">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <a href={`tel:${contactSettings.phone}`} className="text-gray-300 text-sm hover:text-white transition-colors">
                    {contactSettings.phone}
                  </a>
                </li>
              )}
              {contactSettings.whatsapp_number && (
                <li className="flex items-center">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <a href={`tel:${contactSettings.whatsapp_number}`} className="text-gray-300 text-sm hover:text-white transition-colors">
                    {contactSettings.whatsapp_number}
                  </a>
                </li>
              )}
              {contactSettings.email && (
                <li className="flex items-center">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <a href={`mailto:${contactSettings.email}`} className="text-gray-300 text-sm hover:text-white transition-colors">
                    {contactSettings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {contactSettings.company_name || "G Son's Technochem"}. All rights reserved.
            </p>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                Developed by{' '}
                <a
                  href="https://www.thegujaratidesigner.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-light transition-colors font-semibold"
                >
                  The Gujarati Designer
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
