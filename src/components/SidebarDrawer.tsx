'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from './CartProvider'
import { X, Phone, Mail, MessageCircle, ShoppingCart, Home, Package, FileText, Users } from 'lucide-react'

interface SidebarDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLinkClick = () => {
    onClose()
  }

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: FileText },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/bulk-order', label: 'Bulk Order', icon: FileText },
    { href: '/contact', label: 'Contact', icon: Users },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-[85%] md:w-[400px]`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-primary to-primary-dark">
            <Link href="/" onClick={handleLinkClick} className="flex items-center active:scale-95 transition-transform">
              <div className="relative h-10 md:h-12 w-40 md:w-48 brightness-0 invert">
                <Image
                  src="/logo.png"
                  alt="G Sons Technochem"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="(max-width: 768px) 160px, 192px"
                />
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center px-4 py-3.5 text-dark hover:bg-gray-50 hover:text-primary rounded-xl transition-all group"
                  >
                    <link.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/cart"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-4 py-3.5 text-dark hover:bg-gray-50 hover:text-primary rounded-xl transition-all group bg-gradient-to-r from-accent/5 to-transparent"
                >
                  <div className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-3 text-accent" />
                    <span className="font-medium">Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-accent text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="px-4 py-6 space-y-4 mt-4">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5">
                <h4 className="font-semibold text-dark mb-4">Get in Touch</h4>
                <div className="space-y-3">
                  <a
                    href="tel:8485998487"
                    className="flex items-center text-dark hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">8485998487</span>
                  </a>
                  <a
                    href="mailto:gsonstechnochem@gmail.com"
                    className="flex items-center text-dark hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">gsonstechnochem@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 space-y-3 pb-6">
              <a
                href="https://wa.me/918485998487?text=Hello%20G%20Son%E2%80%99s%20Technochem%2C%20I%20want%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-green-500 text-white py-3.5 rounded-xl font-semibold hover:bg-green-600 transition-all hover:shadow-lg hover:shadow-green-500/30"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Chat
              </a>
              <Link
                href="/bulk-order"
                onClick={handleLinkClick}
                className="flex items-center justify-center w-full bg-accent text-white py-3.5 rounded-xl font-semibold hover:bg-accent-dark transition-all hover:shadow-lg hover:shadow-accent/30"
              >
                Request Bulk Pricing
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
