'use client'

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, Package, Search, Filter, Upload, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { uploadImage } from '@/lib/supabaseHelpers'

interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  pack_size: string
  short_description: string
  description: string
  image_url: string
  stock: number
  featured: boolean
  active: boolean
  advantages: string[]
  recommended_for: string[]
  application_guidelines: string[]
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    price: '',
    pack_size: '',
    short_description: '',
    description: '',
    image_url: '',
    stock: '0',
    featured: false,
    active: true,
    advantages: '',
    recommended_for: '',
    application_guidelines: ''
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Data fetch timeout')), 5000)
      )

      await Promise.race([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        timeoutPromise
      ])

      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (data) setProducts(data)
      if (error) throw error
    } catch (err) {
      console.error('Error loading products:', err)
      setError('Unable to load products. Check Supabase connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price.toString(),
      pack_size: product.pack_size,
      short_description: product.short_description,
      description: product.description,
      image_url: product.image_url || '',
      stock: product.stock.toString(),
      featured: product.featured,
      active: product.active,
      advantages: product.advantages.join(', '),
      recommended_for: product.recommended_for.join(', '),
      application_guidelines: product.application_guidelines.join(', ')
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await supabase.from('products').delete().eq('id', id)
        loadProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const imageUrl = await uploadImage(file, 'products')
    if (imageUrl) {
      setFormData({ ...formData, image_url: imageUrl })
    }
    setIsUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const productData = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        category: formData.category,
        price: parseFloat(formData.price),
        pack_size: formData.pack_size,
        short_description: formData.short_description,
        description: formData.description,
        image_url: formData.image_url,
        stock: parseInt(formData.stock),
        featured: formData.featured,
        active: formData.active,
        advantages: formData.advantages.split(',').map(s => s.trim()).filter(s => s),
        recommended_for: formData.recommended_for.split(',').map(s => s.trim()).filter(s => s),
        application_guidelines: formData.application_guidelines.split(',').map(s => s.trim()).filter(s => s)
      }

      if (editingProduct) {
        await supabase.from('products').update(productData).eq('id', editingProduct.id)
      } else {
        await supabase.from('products').insert(productData)
      }

      setIsEditing(false)
      setEditingProduct(null)
      setFormData({
        name: '',
        slug: '',
        category: '',
        price: '',
        pack_size: '',
        short_description: '',
        description: '',
        image_url: '',
        stock: '0',
        featured: false,
        active: true,
        advantages: '',
        recommended_for: '',
        application_guidelines: ''
      })
      loadProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product. Please try again.')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      slug: '',
      category: '',
      price: '',
      pack_size: '',
      short_description: '',
      description: '',
      image_url: '',
      stock: '0',
      featured: false,
      active: true,
      advantages: '',
      recommended_for: '',
      application_guidelines: ''
    })
  }

  const categories = ['Tile Adhesive', 'Epoxy Grout', 'Cement Grout', 'Waterproofing']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  if (!isEditing) {
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-dark mb-2">Unable to Load Products</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadProducts}
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
          <h1 className="text-3xl font-bold text-dark">Products</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No products found</p>
              <p className="text-sm text-gray-500">Click &quot;Sync Website Data&quot; from Dashboard to import existing data</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-t border-gray-100">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {product.image_url && (
                            <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                          )}
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.slug}</div>
                          </div>
                        </div>
                      </td>
                    <td className="px-6 py-4 text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-sm">₹{product.price}</td>
                    <td className="px-6 py-4 text-sm">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {product.active && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                        )}
                        {product.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-gray-600 hover:text-primary transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-dark">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
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
              <label className="block text-sm font-medium text-dark mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="GS 100 Tile Adhesive"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="gs-100-tile-adhesive"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Price (₹) *</label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="350.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Pack Size *</label>
              <input
                type="text"
                required
                value={formData.pack_size}
                onChange={(e) => setFormData({ ...formData, pack_size: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="50 kg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Short Description *</label>
            <input
              type="text"
              required
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="High-strength tile adhesive for ceramic and vitrified tiles"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Full Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Detailed product description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Image</label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-primary cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {isUploading && <span className="text-sm text-gray-600">Uploading...</span>}
              </div>
              
              {formData.image_url && (
                <div className="relative">
                  <img src={formData.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: '' })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Or enter Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Advantages (comma-separated)</label>
            <textarea
              rows={2}
              value={formData.advantages}
              onChange={(e) => setFormData({ ...formData, advantages: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="High bonding strength, Crack resistant, Water resistant"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Recommended For (comma-separated)</label>
            <textarea
              rows={2}
              value={formData.recommended_for}
              onChange={(e) => setFormData({ ...formData, recommended_for: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ceramic tiles, Vitrified tiles, Natural stone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Application Guidelines (comma-separated)</label>
            <textarea
              rows={2}
              value={formData.application_guidelines}
              onChange={(e) => setFormData({ ...formData, application_guidelines: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Mix with water, Apply with notched trowel, Allow 24h curing"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm">Featured Product</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm">Active</span>
            </label>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingProduct ? 'Update Product' : 'Add Product'}
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
