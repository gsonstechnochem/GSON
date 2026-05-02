'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: products.length,
    pendingOrders: 0
  })

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('admin_session')
    if (!session) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)

    // Load orders from localStorage
    const loadedOrders: any[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('order_')) {
        const order = JSON.parse(localStorage.getItem(key) || '{}')
        loadedOrders.push(order)
      }
    }
    setOrders(loadedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))

    // Calculate stats
    const totalRevenue = loadedOrders.reduce((sum, order) => sum + order.total, 0)
    const pendingOrders = loadedOrders.filter(order => order.status === 'pending').length
    setStats({
      totalOrders: loadedOrders.length,
      totalRevenue,
      totalProducts: products.length,
      pendingOrders
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/admin/login')
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const orderKey = `order_${orderId}`
    const order = JSON.parse(localStorage.getItem(orderKey) || '{}')
    order.status = newStatus
    localStorage.setItem(orderKey, JSON.stringify(order))
    
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    setStats(prev => ({
      ...prev,
      pendingOrders: orders.filter(o => o.status === 'pending').length
    }))
  }

  const deleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      localStorage.removeItem(`order_${orderId}`)
      setOrders(orders.filter(o => o.id !== orderId))
      setStats(prev => ({
        ...prev,
        totalOrders: prev.totalOrders - 1
      }))
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-dark">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'products' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Orders
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  View Website
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm text-gray-500">Total</span>
                    </div>
                    <p className="text-3xl font-bold text-dark">{stats.totalOrders}</p>
                    <p className="text-sm text-gray-600">Orders</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-500">Revenue</span>
                    </div>
                    <p className="text-3xl font-bold text-dark">{formatPrice(stats.totalRevenue)}</p>
                    <p className="text-sm text-gray-600">Total Sales</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-500">Products</span>
                    </div>
                    <p className="text-3xl font-bold text-dark">{stats.totalProducts}</p>
                    <p className="text-sm text-gray-600">Active</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-yellow-600" />
                      </div>
                      <span className="text-sm text-gray-500">Pending</span>
                    </div>
                    <p className="text-3xl font-bold text-dark">{stats.pendingOrders}</p>
                    <p className="text-sm text-gray-600">Orders</p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-dark mb-4">Recent Orders</h2>
                  {orders.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No orders yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Order ID</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Customer</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Total</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order.id} className="border-b border-gray-100">
                              <td className="py-3 px-4 text-sm">{order.id}</td>
                              <td className="py-3 px-4 text-sm">{order.name}</td>
                              <td className="py-3 px-4 text-sm font-medium">{formatPrice(order.total)}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                  order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-dark">Products</h2>
                  <button className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Price</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Stock</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg mr-3 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-sm font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                          <td className="py-3 px-4 text-sm font-medium">{formatPrice(product.price)}</td>
                          <td className="py-3 px-4 text-sm">{product.stock}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-dark mb-6">Orders</h2>
                {orders.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-dark">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.name} - {order.phone}</p>
                          </div>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Items:</p>
                          <div className="space-y-1">
                            {order.items.map((item: any) => (
                              <p key={item.product.id} className="text-sm">
                                {item.product.name} x {item.quantity}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-dark">Total: {formatPrice(order.total)}</p>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteOrder(order.id)}
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
