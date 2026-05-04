import { supabase, isSupabaseConfigured } from './supabaseClient'
import { products as staticProducts } from '@/data/products'
import { testimonials as staticTestimonials } from '@/data/testimonials'
import { faqs as staticFaqs } from '@/data/faqs'

// Normalize a Supabase products row (snake_case) into the camelCase shape
// the public site components (ProductCard, product detail, cart) expect.
// This is the single source of truth so DB schema changes don't ripple across UI.
function normalizeTestimonial(row: any) {
  if (!row) return row
  return {
    id: row.id,
    name: row.name,
    role: row.role ?? '',
    company: row.company ?? '',
    content: row.message ?? row.content ?? '',
    rating: row.rating ?? 5,
    image: row.image_url ?? row.image ?? '',
  }
}

function normalizeProduct(row: any) {
  if (!row) return row
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: typeof row.price === 'string' ? parseFloat(row.price) : row.price,
    packSize: row.pack_size ?? row.packSize ?? '',
    shortDescription: row.short_description ?? row.shortDescription ?? '',
    description: row.description ?? '',
    image: row.image_url ?? row.image ?? '',
    advantages: row.advantages ?? [],
    recommendedFor: row.recommended_for ?? row.recommendedFor ?? [],
    applicationGuidelines: row.application_guidelines ?? row.applicationGuidelines ?? [],
    stock: row.stock ?? 0,
    featured: row.featured ?? false,
  }
}

export async function fetchProductBySlug(slug: string) {
  if (!isSupabaseConfigured()) {
    return staticProducts.find(p => p.slug === slug) || null
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()

    if (error) throw error
    return data ? normalizeProduct(data) : (staticProducts.find(p => p.slug === slug) || null)
  } catch (error) {
    console.error(`Error fetching product ${slug} from Supabase, using fallback:`, error)
    return staticProducts.find(p => p.slug === slug) || null
  }
}

export async function fetchProductsWithFallback() {
  if (!isSupabaseConfigured()) {
    return staticProducts
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data && data.length > 0 ? data.map(normalizeProduct) : staticProducts
  } catch (error) {
    console.error('Error fetching products from Supabase, using fallback:', error)
    return staticProducts
  }
}

export async function fetchTestimonialsWithFallback() {
  if (!isSupabaseConfigured()) {
    return staticTestimonials
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data && data.length > 0 ? data.map(normalizeTestimonial) : staticTestimonials
  } catch (error) {
    console.error('Error fetching testimonials from Supabase, using fallback:', error)
    return staticTestimonials
  }
}

export async function fetchFAQsWithFallback() {
  if (!isSupabaseConfigured()) {
    return staticFaqs
  }

  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('active', true)
      .order('order', { ascending: true })

    if (error) throw error
    return data || staticFaqs
  } catch (error) {
    console.error('Error fetching FAQs from Supabase, using fallback:', error)
    return staticFaqs
  }
}

export async function fetchSiteContent(sectionKey: string, fallback: any = {}) {
  if (!isSupabaseConfigured()) {
    return fallback
  }

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('section_key', sectionKey)
      .single()

    if (error) throw error
    return data || fallback
  } catch (error) {
    console.error(`Error fetching site content for ${sectionKey} from Supabase, using fallback:`, error)
    return fallback
  }
}

export async function fetchContactSettings(fallback: any = {}) {
  if (!isSupabaseConfigured()) {
    return fallback
  }

  try {
    const { data, error } = await supabase
      .from('contact_settings')
      .select('*')
      .single()

    if (error) throw error
    return data || fallback
  } catch (error) {
    console.error('Error fetching contact settings from Supabase, using fallback:', error)
    return fallback
  }
}
