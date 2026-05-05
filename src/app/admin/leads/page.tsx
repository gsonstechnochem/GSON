'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Inbox, Mail, Phone, Calendar, Search, Loader2, AlertCircle, RefreshCw, Trash2, Eye, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from '@/components/ToastProvider'

interface Lead {
  id: string
  name: string
  email: string | null
  phone: string | null
  subject: string | null
  message: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
  notes: string | null
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  converted: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700',
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const { showToast } = useToast()

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setLeads(data || [])
    } catch (err: any) {
      console.error(err)
      setError(err?.message || 'Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: Lead['status']) => {
    try {
      const { error } = await supabase.from('leads').update({ status }).eq('id', id)
      if (error) throw error
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
      if (selected?.id === id) setSelected({ ...selected, status })
      showToast('success', 'Lead status updated')
    } catch (err: any) {
      showToast('error', err?.message || 'Failed to update')
    }
  }

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id)
      if (error) throw error
      setLeads(prev => prev.filter(l => l.id !== id))
      if (selected?.id === id) setSelected(null)
      setConfirmDelete(null)
      showToast('success', 'Lead deleted')
    } catch (err: any) {
      showToast('error', err?.message || 'Failed to delete')
    }
  }

  const filtered = leads.filter(l => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      l.name.toLowerCase().includes(q) ||
      (l.email || '').toLowerCase().includes(q) ||
      (l.phone || '').includes(search) ||
      (l.subject || '').toLowerCase().includes(q) ||
      l.message.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || l.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-dark">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">Inquiries from the website contact form</p>
        </div>
        <button
          onClick={load}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, message..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* States */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-gray-600">Loading leads...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-700 font-medium mb-2">Unable to load leads</p>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button onClick={load} className="px-4 py-2 bg-primary text-white rounded-lg">Retry</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-700 font-medium mb-1">No leads yet</p>
          <p className="text-sm text-gray-500">When visitors submit the contact form, their messages will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase text-gray-600">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase text-gray-600">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase text-gray-600">Subject</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase text-gray-600">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-dark">{lead.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {lead.email && (
                        <div className="flex items-center text-gray-600 mb-1">
                          <Mail className="w-3 h-3 mr-1" />{lead.email}
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />{lead.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      {lead.subject || lead.message.slice(0, 60) + (lead.message.length > 60 ? '...' : '')}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value as Lead['status'])}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${STATUS_COLORS[lead.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" />
                        {new Date(lead.created_at).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelected(lead)} className="p-2 text-gray-500 hover:text-primary" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => setConfirmDelete(lead.id)} className="p-2 text-gray-500 hover:text-red-500" title="Delete">
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

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-dark">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {selected.email && (
                <div><p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a></div>
              )}
              {selected.phone && (
                <div><p className="text-xs text-gray-500 uppercase mb-1">Phone</p>
                  <a href={`tel:${selected.phone}`} className="text-primary hover:underline">{selected.phone}</a></div>
              )}
              {selected.subject && (
                <div><p className="text-xs text-gray-500 uppercase mb-1">Subject</p>
                  <p className="text-dark font-medium">{selected.subject}</p></div>
              )}
              <div><p className="text-xs text-gray-500 uppercase mb-1">Message</p>
                <p className="text-gray-700 whitespace-pre-wrap">{selected.message}</p></div>
              <div><p className="text-xs text-gray-500 uppercase mb-1">Received</p>
                <p className="text-gray-700">{new Date(selected.created_at).toLocaleString('en-IN')}</p></div>
              <div><p className="text-xs text-gray-500 uppercase mb-1">Status</p>
                <select
                  value={selected.status}
                  onChange={e => updateStatus(selected.id, e.target.value as Lead['status'])}
                  className={`text-sm font-medium px-3 py-1.5 rounded-full ${STATUS_COLORS[selected.status]}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-dark mb-2">Delete this lead?</h3>
            <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={() => deleteLead(confirmDelete)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
