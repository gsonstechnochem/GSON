'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, MessageSquare, Star, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  message: string
  rating: number
  image_url?: string
  active: boolean
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    message: '',
    rating: 5,
    image_url: '',
    active: true
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    setLoading(true)
    setError(null)

    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Data fetch timeout')), 8000)
      )

      const result = await Promise.race([
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        timeoutPromise,
      ])

      const { data, error } = result as { data: Testimonial[] | null; error: any }
      if (error) throw error
      setTestimonials(data || [])
    } catch (err) {
      console.error('Error loading testimonials:', err)
      setError('Unable to load testimonials. Check Supabase connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || '',
      message: testimonial.message,
      rating: testimonial.rating,
      image_url: testimonial.image_url || '',
      active: testimonial.active
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await supabase.from('testimonials').delete().eq('id', id)
        loadTestimonials()
      } catch (error) {
        console.error('Error deleting testimonial:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingTestimonial) {
        await supabase.from('testimonials').update(formData).eq('id', editingTestimonial.id)
      } else {
        await supabase.from('testimonials').insert(formData)
      }

      setIsEditing(false)
      setEditingTestimonial(null)
      setFormData({
        name: '',
        role: '',
        company: '',
        message: '',
        rating: 5,
        image_url: '',
        active: true
      })
      loadTestimonials()
    } catch (error) {
      console.error('Error saving testimonial:', error)
      alert('Error saving testimonial. Please try again.')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingTestimonial(null)
    setFormData({
      name: '',
      role: '',
      company: '',
      message: '',
      rating: 5,
      image_url: '',
      active: true
    })
  }

  if (!isEditing) {
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-dark mb-2">Unable to Load Testimonials</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadTestimonials}
              className="flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors mx-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-dark">Testimonials</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </button>
        </div>

        {testimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No testimonials yet</p>
            <p className="text-sm text-gray-500 mt-2">Click &quot;Sync Website Data&quot; from Dashboard to import existing data</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-dark">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      testimonial.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {testimonial.active ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">&ldquo;{testimonial.message}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-dark">
          {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h1>
        <button
          onClick={handleCancel}
          className="flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <X className="w-5 h-5 mr-2" />
          Cancel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Civil Contractor"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Patel Construction"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Profile Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Message *</label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Customer testimonial message"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-2"
                >
                  <Star className={`w-6 h-6 ${star <= formData.rating ? 'fill-accent text-accent' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm">Active</span>
          </label>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center bg-gray-200 text-dark px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
