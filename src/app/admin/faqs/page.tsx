'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, HelpCircle, ChevronUp, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  active: boolean
  order: number
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    active: true,
    order: 0
  })

  useEffect(() => {
    loadFAQs()
  }, [])

  const loadFAQs = async () => {
    try {
      const { data, error } = await supabase.from('faqs').select('*').order('order', { ascending: true })
      if (data) setFaqs(data)
    } catch (error) {
      console.error('Error loading FAQs:', error)
    }
  }

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      active: faq.active,
      order: faq.order
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await supabase.from('faqs').delete().eq('id', id)
        loadFAQs()
      } catch (error) {
        console.error('Error deleting FAQ:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingFAQ) {
        await supabase.from('faqs').update(formData).eq('id', editingFAQ.id)
      } else {
        const maxOrder = faqs.length > 0 ? Math.max(...faqs.map(f => f.order)) : 0
        await supabase.from('faqs').insert({ ...formData, order: maxOrder + 1 })
      }

      setIsEditing(false)
      setEditingFAQ(null)
      setFormData({
        question: '',
        answer: '',
        category: 'General',
        active: true,
        order: 0
      })
      loadFAQs()
    } catch (error) {
      console.error('Error saving FAQ:', error)
      alert('Error saving FAQ. Please try again.')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingFAQ(null)
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      active: true,
      order: 0
    })
  }

  const moveFAQ = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = faqs.findIndex(f => f.id === id)
    if (currentIndex === -1) return
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= faqs.length) return
    
    const updatedFaqs = [...faqs]
    const tempOrder = updatedFaqs[currentIndex].order
    updatedFaqs[currentIndex].order = updatedFaqs[newIndex].order
    updatedFaqs[newIndex].order = tempOrder
    
    try {
      await supabase.from('faqs').update({ order: updatedFaqs[currentIndex].order }).eq('id', id)
      await supabase.from('faqs').update({ order: updatedFaqs[newIndex].order }).eq('id', updatedFaqs[newIndex].id)
      loadFAQs()
    } catch (error) {
      console.error('Error reordering FAQ:', error)
    }
  }

  if (!isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-dark">FAQs</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </button>
        </div>

        {faqs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No FAQs yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{faq.category}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        faq.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {faq.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-dark">{faq.question}</h3>
                    <p className="text-gray-700 text-sm mt-2">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => moveFAQ(faq.id, 'up')}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:text-primary transition-colors disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveFAQ(faq.id, 'down')}
                      disabled={index === faqs.length - 1}
                      className="p-2 text-gray-600 hover:text-primary transition-colors disabled:opacity-30"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 text-gray-600 hover:text-primary transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
          {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
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
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Question *</label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="What is the shelf life of GS 100?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Answer *</label>
            <textarea
              required
              rows={4}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="The shelf life of GS 100 is 12 months from date of manufacture..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="General">General</option>
              <option value="Products">Products</option>
              <option value="Orders">Orders</option>
              <option value="Shipping">Shipping</option>
              <option value="Technical">Technical</option>
            </select>
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
              {editingFAQ ? 'Update FAQ' : 'Add FAQ'}
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
