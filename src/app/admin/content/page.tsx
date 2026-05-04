'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Save, FileText, Upload, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { uploadImage } from '@/lib/supabaseHelpers'

interface SiteContent {
  id: string
  section_key: string
  title: string
  subtitle: string
  content: string
  image_url: string
  button_text: string
  button_link: string
}

export default function AdminContentPage() {
  const [activeSection, setActiveSection] = useState<'hero' | 'about'>('hero')
  const [heroContent, setHeroContent] = useState<Partial<SiteContent>>({})
  const [aboutContent, setAboutContent] = useState<Partial<SiteContent>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingHero, setIsUploadingHero] = useState(false)
  const [isUploadingAbout, setIsUploadingAbout] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const { data } = await supabase.from('site_content').select('*')
      if (data) {
        const hero = data.find(c => c.section_key === 'home_hero')
        const about = data.find(c => c.section_key === 'about_page')
        if (hero) setHeroContent(hero)
        if (about) setAboutContent(about)
      }
    } catch (error) {
      console.error('Error loading content:', error)
    }
  }

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingHero(true)
    const imageUrl = await uploadImage(file, 'content')
    if (imageUrl) {
      setHeroContent({ ...heroContent, image_url: imageUrl })
    }
    setIsUploadingHero(false)
  }

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingAbout(true)
    const imageUrl = await uploadImage(file, 'content')
    if (imageUrl) {
      setAboutContent({ ...aboutContent, image_url: imageUrl })
    }
    setIsUploadingAbout(false)
  }

  const handleSave = async (section: 'hero' | 'about') => {
    setIsSaving(true)
    try {
      const content = section === 'hero' ? heroContent : aboutContent
      const sectionKey = section === 'hero' ? 'home_hero' : 'about_page'

      const existing = await supabase.from('site_content').select('id').eq('section_key', sectionKey).single()
      
      if (existing.data) {
        await supabase.from('site_content').update(content).eq('id', existing.data.id)
      } else {
        await supabase.from('site_content').insert({ ...content, section_key: sectionKey })
      }
      
      alert('Content saved successfully!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content. Please try again.')
    }
    setIsSaving(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Content Management</h1>

      {/* Section Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveSection('hero')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeSection === 'hero' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeSection === 'about' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            About Page
          </button>
        </div>
      </div>

      {/* Hero Section */}
      {activeSection === 'hero' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-xl font-bold text-dark">Home Hero Section</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Title</label>
              <input
                type="text"
                value={heroContent.title || ''}
                onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="India's Trusted Tile Adhesive Manufacturer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Subtitle</label>
              <input
                type="text"
                value={heroContent.subtitle || ''}
                onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Stronger Bonds. Flawless Finishes."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Description</label>
              <textarea
                rows={4}
                value={heroContent.content || ''}
                onChange={(e) => setHeroContent({ ...heroContent, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="High-performance tile adhesive, epoxy grout..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Image</label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-primary cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleHeroImageUpload}
                      className="hidden"
                    />
                  </label>
                  {isUploadingHero && <span className="text-sm text-gray-600">Uploading...</span>}
                </div>
                
                {heroContent.image_url && (
                  <div className="relative">
                    <img src={heroContent.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setHeroContent({ ...heroContent, image_url: '' })}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Or enter Image URL</label>
                  <input
                    type="url"
                    value={heroContent.image_url || ''}
                    onChange={(e) => setHeroContent({ ...heroContent, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com/hero-image.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Button Text</label>
                <input
                  type="text"
                  value={heroContent.button_text || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, button_text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Explore Products"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Button Link</label>
                <input
                  type="text"
                  value={heroContent.button_link || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, button_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="/products"
                />
              </div>
            </div>

            <button
              onClick={() => handleSave('hero')}
              disabled={isSaving}
              className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Hero Section'}
            </button>
          </div>
        </div>
      )}

      {/* About Page */}
      {activeSection === 'about' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-xl font-bold text-dark">About Page</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Title</label>
              <input
                type="text"
                value={aboutContent.title || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="About G Son's Technochem"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Subtitle</label>
              <input
                type="text"
                value={aboutContent.subtitle || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Faith of Generations"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Content</label>
              <textarea
                rows={6}
                value={aboutContent.content || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Company description, mission, vision..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Image</label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-primary cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleAboutImageUpload}
                      className="hidden"
                    />
                  </label>
                  {isUploadingAbout && <span className="text-sm text-gray-600">Uploading...</span>}
                </div>
                
                {aboutContent.image_url && (
                  <div className="relative">
                    <img src={aboutContent.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setAboutContent({ ...aboutContent, image_url: '' })}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">Or enter Image URL</label>
                  <input
                    type="url"
                    value={aboutContent.image_url || ''}
                    onChange={(e) => setAboutContent({ ...aboutContent, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com/about-image.jpg"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSave('about')}
              disabled={isSaving}
              className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save About Page'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
