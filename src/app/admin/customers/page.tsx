'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Users, Search, Phone, Mail, Calendar, ShoppingCart, Eye, MapPin } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  total_orders: number
  total_spent: number
  last_order_date: string
  created_at: string
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)
    try {
      // Fetch customers from orders table (grouped by customer)
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Group by customer email to get unique customers
      const customerMap = new Map<string, Customer>()

      orders.forEach((order: any) => {
        const email = order.customer_email
        if (!customerMap.has(email)) {
          customerMap.set(email, {
            id: order.id,
            name: order.customer_name,
            email: order.customer_email,
            phone: order.customer_phone,
            address: order.shipping_address,
            total_orders: 0,
            total_spent: 0,
            last_order_date: order.created_at,
            created_at: order.created_at
          })
        }

        const customer = customerMap.get(email)!
        customer.total_orders += 1
        customer.total_spent += order.total_amount || 0
        if (new Date(order.created_at) > new Date(customer.last_order_date)) {
          customer.last_order_date = order.created_at
        }
      })

      setCustomers(Array.from(customerMap.values()))
    } catch (error) {
      console.error('Error loading customers:', error)
    }
    setLoading(false)
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    
    return matchesSearch
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Customers</h1>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Customers</p>
              <p className="text-3xl font-bold text-dark">{customers.length}</p>
            </div>
            <Users className="w-12 h-12 text-primary/20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-dark">{customers.reduce((sum, c) => sum + c.total_orders, 0)}</p>
            </div>
            <ShoppingCart className="w-12 h-12 text-accent/20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-dark">₹{customers.reduce((sum, c) => sum + c.total_spent, 0).toLocaleString()}</p>
            </div>
            <Users className="w-12 h-12 text-green-500/20" />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading customers...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p>No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Orders</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Total Spent</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Last Order</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-dark">{customer.name}</p>
                          <p className="text-sm text-gray-500">Customer since {new Date(customer.created_at).toLocaleDateString('en-IN')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-600">{customer.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-600">{customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <ShoppingCart className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium text-dark">{customer.total_orders}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-dark">₹{customer.total_spent.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        {new Date(customer.last_order_date).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
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

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-dark">{selectedCustomer.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-semibold text-dark">{selectedCustomer.email}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-semibold text-dark">{selectedCustomer.phone}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <div className="flex items-center">
                    <ShoppingCart className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-semibold text-dark">{selectedCustomer.total_orders}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <span className="font-semibold text-dark">₹{selectedCustomer.total_spent.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-dark">{selectedCustomer.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Customer Since</p>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-dark">{new Date(selectedCustomer.created_at).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Order</p>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-dark">{new Date(selectedCustomer.last_order_date).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
