'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart,
  MessageSquare,
  HelpCircle,
  Settings,
  Home,
  FileText,
  Plus,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { syncWebsiteData } from '@/lib/supabaseHelpers'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    featuredProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    testimonials: 0,
    faqs: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<{ success: boolean; message: string; results?: any } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [supabaseConnected, setSupabaseConnected] = useState(false)
  const [lastSynced, setLastSynced] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Check Supabase connection
      const { data: { session } } = await supabase.auth.getSession()
      setSupabaseConnected(!!session)

      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Data fetch timeout')), 5000)
      )

      await Promise.race([
        Promise.all([
          loadStats(),
          loadRecentOrders()
        ]),
        timeoutPromise
      ])
    } catch (err) {
      console.error('Error loading dashboard data:', err)
      setError('Unable to load admin data. Check Supabase connection.')
      setSupabaseConnected(false)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const [productsRes, testimonialsRes, faqsRes, ordersRes] = await Promise.all([
        supabase.from('products').select('id, active, featured'),
        supabase.from('testimonials').select('id'),
        supabase.from('faqs').select('id'),
        supabase.from('orders').select('id, order_status').order('created_at', { ascending: false })
      ])

      const products = productsRes.data || []
      const orders = ordersRes.data || []

      setStats({
        totalProducts: products.length,
        activeProducts: products.filter(p => p.active).length,
        featuredProducts: products.filter(p => p.featured).length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.order_status === 'pending').length,
        completedOrders: orders.filter(o => o.order_status === 'delivered').length,
        testimonials: testimonialsRes.data?.length || 0,
        faqs: faqsRes.data?.length || 0
      })
    } catch (error) {
      console.error('Error loading stats:', error)
      // Don't throw error, just show zeros
    }
  }

  const loadRecentOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (data) setRecentOrders(data)
    } catch (error) {
      console.error('Error loading recent orders:', error)
      // Don't throw error, just show empty orders
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    setSyncStatus(null)

    const result = await syncWebsiteData()

    setSyncStatus(result)

    if (result.success) {
      // Update last synced time
      setLastSynced(new Date().toLocaleString())
      // Reload stats after successful sync
      await loadStats()
    }

    setSyncing(false)

    // Clear status message after 5 seconds
    setTimeout(() => setSyncStatus(null), 5000)
  }

  const quickActions = [
    { icon: Package, label: 'Add Product', href: '/admin/products', color: 'bg-blue-500' },
    { icon: Home, label: 'Edit Home Content', href: '/admin/content', color: 'bg-green-500' },
    { icon: MessageSquare, label: 'Add Testimonial', href: '/admin/testimonials', color: 'bg-orange-500' },
    { icon: HelpCircle, label: 'Add FAQ', href: '/admin/faqs', color: 'bg-pink-500' },
    { icon: Settings, label: 'Contact Settings', href: '/admin/settings', color: 'bg-gray-500' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-dark mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadData}
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className={`flex items-center text-sm ${supabaseConnected ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${supabaseConnected ? 'bg-green-600' : 'bg-red-600'}`}></div>
              {supabaseConnected ? 'Connected' : 'Disconnected'}
            </div>
            {lastSynced && (
              <div className="text-sm text-gray-500">
                Last synced: {lastSynced}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Website Data'}
        </button>
      </div>

      {/* Sync Status Message */}
      {syncStatus && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          syncStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {syncStatus.success ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
          )}
          <div>
            <p className={`font-medium ${syncStatus.success ? 'text-green-800' : 'text-red-800'}`}>
              {syncStatus.message}
            </p>
            {syncStatus.results && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Products: {syncStatus.results.products.inserted} inserted, {syncStatus.results.products.skipped} skipped</p>
                <p>Testimonials: {syncStatus.results.testimonials.inserted} inserted, {syncStatus.results.testimonials.skipped} skipped</p>
                <p>FAQs: {syncStatus.results.faqs.inserted} inserted, {syncStatus.results.faqs.skipped} skipped</p>
                <p>Site Content: {syncStatus.results.siteContent.inserted} inserted, {syncStatus.results.siteContent.skipped} skipped</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-dark">{stats.totalProducts}</p>
          <p className="text-sm text-gray-600">Products</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Active</span>
          </div>
          <p className="text-3xl font-bold text-dark">{stats.activeProducts}</p>
          <p className="text-sm text-gray-600">Products</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-dark">{stats.totalOrders}</p>
          <p className="text-sm text-gray-600">Orders</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>
          <p className="text-3xl font-bold text-dark">{stats.pendingOrders}</p>
          <p className="text-sm text-gray-600">Orders</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-dark">{stats.testimonials}</p>
          <p className="text-sm text-gray-600">Testimonials</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-pink-600" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-dark">{stats.faqs}</p>
          <p className="text-sm text-gray-600">FAQs</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">Featured</span>
          </div>
          <p className="text-3xl font-bold text-dark">{stats.featuredProducts}</p>
          <p className="text-sm text-gray-600">Products</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          <p className="text-3xl font-bold text-dark">{stats.completedOrders}</p>
          <p className="text-sm text-gray-600">Orders</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">{action.label}</span>
              <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-dark">Recent Orders</h2>
            <Link href="/admin/orders" className="text-primary hover:text-primary-dark text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order #</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm">{order.order_number}</td>
                    <td className="py-3 px-4 text-sm">{order.customer_name}</td>
                    <td className="py-3 px-4 text-sm">₹{order.total_amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.order_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.order_status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                        order.order_status === 'delivered' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
