'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, AlertCircle, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { isSupabaseConfigured } from '@/lib/supabaseClient'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const checkAuth = async () => {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        setError('Supabase environment variables missing. Please check your configuration.')
        return
      }

      // Add timeout to prevent infinite loading
      timeoutId = setTimeout(() => {
        console.error('Login auth check timeout - staying on login page')
        setIsLoading(false)
      }, 3000)

      try {
        const { data: { session } } = await supabase.auth.getSession()
        clearTimeout(timeoutId)
        
        if (session) {
          router.replace('/admin/dashboard')
        }
      } catch (error) {
        console.error('Auth check error on login page:', error)
        clearTimeout(timeoutId)
      }
    }
    
    checkAuth()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setError('Supabase environment variables missing. Please check your configuration.')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      })

      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }

      if (data.session) {
        router.replace('/admin/dashboard')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-dark mb-2">Admin Panel</h1>
            <p className="text-gray-600">Sign in to manage your website</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors text-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
