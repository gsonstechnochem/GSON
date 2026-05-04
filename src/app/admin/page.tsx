'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      if (!isSupabaseConfigured()) {
        router.push('/admin/login')
        return
      }

      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/admin/dashboard')
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setLoading(false)
      router.push('/admin/login')
    }, 3000)

    checkAuth()

    return () => clearTimeout(timeoutId)
  }, [router])

  if (!loading) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
