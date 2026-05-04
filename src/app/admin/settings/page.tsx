'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Save, Settings, Phone, Mail, MapPin, MessageSquare, Globe } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface ContactSettings {
  id: string
  company_name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
  whatsapp_number: string
  whatsapp_message: string
  website_url: string
  social_facebook: string
  social_instagram: string
  social_linkedin: string
  social_youtube: string
  business_hours: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<ContactSettings>>({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data } = await supabase.from('contact_settings').select('*').single()
      if (data) setSettings(data)
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const existing = await supabase.from('contact_settings').select('id').single()
      
      if (existing.data) {
        await supabase.from('contact_settings').update(settings).eq('id', existing.data.id)
      } else {
        await supabase.from('contact_settings').insert(settings)
      }
      
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings. Please try again.')
    }
    setIsSaving(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Contact Settings</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <Settings className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-xl font-bold text-dark">Contact Information</h2>
        </div>

        <div className="space-y-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 pb-2 border-b">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Company Name</label>
                <input
                  type="text"
                  value={settings.company_name || ''}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="G Son's Technochem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Website URL</label>
                <input
                  type="url"
                  value={settings.website_url || ''}
                  onChange={(e) => setSettings({ ...settings, website_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://gsonstechnochem.com"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 pb-2 border-b">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="info@gsonstechnochem.com"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 pb-2 border-b">Address</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Street Address</label>
                <textarea
                  rows={2}
                  value={settings.address || ''}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="123 Industrial Area"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">City</label>
                  <input
                    type="text"
                    value={settings.city || ''}
                    onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ahmedabad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">State</label>
                  <input
                    type="text"
                    value={settings.state || ''}
                    onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Gujarat"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Pincode</label>
                  <input
                    type="text"
                    value={settings.pincode || ''}
                    onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="380001"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 pb-2 border-b">WhatsApp Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  value={settings.whatsapp_number || ''}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Default Message</label>
                <input
                  type="text"
                  value={settings.whatsapp_message || ''}
                  onChange={(e) => setSettings({ ...settings, whatsapp_message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Hi, I'm interested in your products"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 pb-2 border-b">Social Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Facebook URL</label>
                <input
                  type="url"
                  value={settings.social_facebook || ''}
                  onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://facebook.com/gsonstechnochem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={settings.social_instagram || ''}
                  onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://instagram.com/gsonstechnochem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={settings.social_linkedin || ''}
                  onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://linkedin.com/company/gsonstechnochem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">YouTube URL</label>
                <input
                  type="url"
                  value={settings.social_youtube || ''}
                  onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://youtube.com/gsonstechnochem"
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 pb-2 border-b">Business Hours</h3>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Operating Hours</label>
              <input
                type="text"
                value={settings.business_hours || ''}
                onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Mon - Sat: 9:00 AM - 6:00 PM"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
