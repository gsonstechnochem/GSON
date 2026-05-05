'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Package,
  ShoppingCart,
  MessageSquare,
  HelpCircle,
  Settings,
  Home,
  Plus,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Loader2,
  Users,
  Inbox,
  IndianRupee,
  Clock,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { syncWebsiteData } from '@/lib/supabaseHelpers'
import { useToast } from '@/components/ToastProvider'

interface Stats {
  totalProducts: number
  activeProducts: number
  testimonials: number
  totalOrders: number
  pendingOrders: number
  customers: number
  leads: number
  revenue: number
}

const ZERO: Stats = {
  totalProducts: 0,
  activeProducts: 0,
  testimonials: 0,
  totalOrders: 0,
  pendingOrders: 0,
  customers: 0,
  leads: 0,
  revenue: 0,
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>(ZERO)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [recentLeads, setRecentLeads] = useState<any[]>([])
  const [syncing, setSyncing] = useState(false)
  const [autoSeeding, setAutoSeeding] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const { showToast } = useToast()

  const loadStats = useCallback(async () => {
    const [productsRes, testimonialsRes, ordersRes, leadsRes] = await Promise.all([
      supabase.from('products').select('id, active'),
      supabase.from('testimonials').select('id'),
      supabase.from('orders').select('id, order_status, total_amount, customer_name, phone, email').order('created_at', { ascending: false }),
      supabase.from('leads').select('id'),
    ])

    const products = productsRes.data || []
    const orders = ordersRes.data || []

    // Distinct customers from orders by phone (or email if no phone)
    const customerKeys = new Set<string>()
    let revenue = 0
    orders.forEach((o: any) => {
      const k = o.phone || o.email || o.id
      customerKeys.add(k)
      revenue += Number(o.total_amount) || 0
    })

    setStats({
      totalProducts: products.length,
      activeProducts: products.filter((p: any) => p.active).length,
      testimonials: testimonialsRes.data?.length || 0,
      totalOrders: orders.length,
      pendingOrders: orders.filter((o: any) => o.order_status === 'pending').length,
      customers: customerKeys.size,
      leads: leadsRes.data?.length || 0,
      revenue,
    })

    return { productsCount: products.length }
  }, [])

  const loadRecent = useCallback(async () => {
    const [oRes, lRes] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
    ])
    setRecentOrders(oRes.data || [])
    setRecentLeads(lRes.data || [])
  }, [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setConnected(!!session)

      const { productsCount } = await loadStats()
      await loadRecent()

      // AUTO-SEED: if products table is empty, run sync silently so the admin
      // panel shows real data immediately without a manual button click.
      if (productsCount === 0 && !autoSeeding) {
        setAutoSeeding(true)
        try {
          const result = await syncWebsiteData()
          if (result.success) {
            showToast('success', 'Initial data seeded into Supabase')
            await loadStats()
            await loadRecent()
          }
        } catch (e) {
          // non-fatal — user can click sync manually
          console.error('Auto-seed failed:', e)
        } finally {
          setAutoSeeding(false)
        }
      }
    } catch (err: any) {
      console.error(err)
      setError(err?.message || 'Unable to load dashboard data. Check your Supabase connection.')
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }, [autoSeeding, loadRecent, loadStats, showToast])

  useEffect(() => { loadAll() }, [loadAll])

  const handleSync = async () => {
    setSyncing(true)
    try {
      const result = await syncWebsiteData()
      if (result.success) {
        showToast('success', 'Website data synced')
        await loadStats()
        await loadRecent()
      } else {
        showToast('error', result.message || 'Sync failed')
      }
    } catch (err: any) {
      showToast('error', err?.message || 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  const cards: { label: string; value: string | number; icon: any; color: string; href?: string }[] = [
    { label: 'Total Products',  value: stats.totalProducts,  icon: Package,        color: 'bg-primary/10 text-primary',     href: '/admin/products' },
    { label: 'Active Products', value: stats.activeProducts, icon: CheckCircle,    color: 'bg-green-100 text-green-600',    href: '/admin/products' },
    { label: 'Testimonials',    value: stats.testimonials,   icon: MessageSquare,  color: 'bg-purple-100 text-purple-600',  href: '/admin/testimonials' },
    { label: 'Total Orders',    value: stats.totalOrders,    icon: ShoppingCart,   color: 'bg-blue-100 text-blue-600',      href: '/admin/orders' },
    { label: 'Pending Orders',  value: stats.pendingOrders,  icon: Clock,          color: 'bg-orange-100 text-orange-600',  href: '/admin/orders' },
    { label: 'Customers',       value: stats.customers,      icon: Users,          color: 'bg-teal-100 text-teal-600',      href: '/admin/customers' },
    { label: 'Leads',           value: stats.leads,          icon: Inbox,          color: 'bg-pink-100 text-pink-600',      href: '/admin/leads' },
    { label: 'Revenue',         value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'bg-yellow-100 text-yellow-700', href: '/admin/orders' },
  ]

  const quickActions = [
    { icon: Package,       label: 'Manage Products',     href: '/admin/products',     color: 'bg-blue-500' },
    { icon: Home,          label: 'Edit Home Content',   href: '/admin/content',      color: 'bg-green-500' },
    { icon: MessageSquare, label: 'Manage Testimonials', href: '/admin/testimonials', color: 'bg-orange-500' },
    { icon: HelpCircle,    label: 'Manage FAQs',         href: '/admin/faqs',         color: 'bg-pink-500' },
    { icon: Inbox,         label: 'View Leads',          href: '/admin/leads',        color: 'bg-purple-500' },
    { icon: Settings,      label: 'Contact Settings',    href: '/admin/settings',     color: 'bg-gray-500' },
  ]

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">{autoSeeding ? 'Seeding initial data...' : 'Loading dashboard...'}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-dark mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadAll}
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
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
          <div className="flex items-center gap-3 mt-2">
            <div className={`flex items-center text-sm ${connected ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${connected ? 'bg-green-600' : 'bg-red-600'}`}></div>
              {connected ? 'Connected to Supabase' : 'Disconnected'}
            </div>
          </div>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Re-Sync Website Data'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href || '#'}
            className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-4 ${c.color}`}>
              <c.icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-dark">{c.value}</p>
            <p className="text-xs md:text-sm text-gray-600 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
            >
              <div className={`w-10 h-10 ${a.color} rounded-lg flex items-center justify-center mr-3`}>
                <a.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-sm">{a.label}</span>
              <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark">Recent Orders</h2>
            <Link href="/admin/orders" className="text-primary hover:text-primary-dark text-sm font-medium">View all →</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">No orders yet</div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-dark">{o.customer_name}</p>
                    <p className="text-xs text-gray-500">#{o.order_number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-dark">₹{Number(o.total_amount).toLocaleString('en-IN')}</p>
                    <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      o.order_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      o.order_status === 'delivered' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {o.order_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark">Recent Leads</h2>
            <Link href="/admin/leads" className="text-primary hover:text-primary-dark text-sm font-medium">View all →</Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">No leads yet — submit the contact form on your website to test</div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((l) => (
                <div key={l.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-dark truncate">{l.name}</p>
                      <p className="text-xs text-gray-500 truncate">{l.email || l.phone || 'No contact'}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 ml-2 flex-shrink-0">
                      {new Date(l.created_at).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-1">{l.subject || l.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
