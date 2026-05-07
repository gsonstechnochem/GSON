'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Package, Calendar, User, Phone, Mail, MapPin, IndianRupee, Search, Filter, Download, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from '@/components/ToastProvider'

interface Order {
  id: string
  order_number: string
  customer_name: string
  email: string
  phone: string
  total_amount: number
  order_status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  address: string
  city: string
  state: string
  pincode: string
  notes: string
  created_at: string
}

export default function AdminOrdersPage() {
  const { showToast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
    }
    setLoading(false)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.phone || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || order.order_status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'confirmed':
        return 'bg-blue-100 text-blue-700'
      case 'packed':
        return 'bg-indigo-100 text-indigo-700'
      case 'shipped':
        return 'bg-purple-100 text-purple-700'
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: newStatus })
        .eq('id', orderId)

      if (error) throw error
      showToast('success', `Order marked as ${newStatus}`)
      loadOrders()
    } catch (err: any) {
      console.error('Error updating order status:', err)
      showToast('error', err?.message || 'Could not update order status')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Orders</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="packed">Packed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Order ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-dark">{order.order_number}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-dark">{order.customer_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-600">{order.phone}</span>
                        </div>
                        {order.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-gray-600">{order.email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <IndianRupee className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="font-medium text-dark">{order.total_amount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.order_status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.order_status)} appearance-none cursor-pointer`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="packed">Packed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        {new Date(order.created_at).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-primary hover:text-primary-dark transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-dark">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Number</p>
                  <p className="font-semibold text-dark">{selectedOrder.order_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedOrder.order_status)}`}>
                    {selectedOrder.order_status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Customer Name</p>
                  <p className="font-semibold text-dark">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="font-semibold text-dark">₹{selectedOrder.total_amount.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Contact Information</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-dark">{selectedOrder.phone}</span>
                  </div>
                  {selectedOrder.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-dark">{selectedOrder.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                <div className="flex items-start text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-dark">
                    {[selectedOrder.address, selectedOrder.city, selectedOrder.state, selectedOrder.pincode].filter(Boolean).join(', ')}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-dark">{new Date(selectedOrder.created_at).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
