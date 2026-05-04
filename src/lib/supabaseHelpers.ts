import { supabase, isSupabaseConfigured } from './supabaseClient'
import { products as staticProducts } from '@/data/products'
import { testimonials as staticTestimonials } from '@/data/testimonials'
import { faqs as staticFaqs } from '@/data/faqs'

// Product helpers
export async function getProducts() {
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
    return data || staticProducts
  } catch (error) {
    console.error('Error fetching products from Supabase, using fallback:', error)
    return staticProducts
  }
}

export async function getFeaturedProducts() {
  if (!isSupabaseConfigured()) {
    return staticProducts.filter(p => p.featured).slice(0, 4)
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(4)

    if (error) throw error
    return data || staticProducts.filter(p => p.featured).slice(0, 4)
  } catch (error) {
    console.error('Error fetching featured products from Supabase, using fallback:', error)
    return staticProducts.filter(p => p.featured).slice(0, 4)
  }
}

export async function getProductBySlug(slug: string) {
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
    return data || staticProducts.find(p => p.slug === slug) || null
  } catch (error) {
    console.error('Error fetching product by slug from Supabase, using fallback:', error)
    return staticProducts.find(p => p.slug === slug) || null
  }
}

// Site content helpers
export async function getSiteContent(sectionKey: string, fallback: any = {}) {
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

// Testimonials helpers
export async function getTestimonials() {
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
    return data || staticTestimonials
  } catch (error) {
    console.error('Error fetching testimonials from Supabase, using fallback:', error)
    return staticTestimonials
  }
}

// FAQ helpers
export async function getFaqs() {
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

// Contact settings helpers
export async function getContactSettings(fallback: any = {}) {
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

// Image upload helper
export async function uploadImage(file: File, folder: string = 'products'): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    console.error('Supabase not configured, cannot upload image')
    return null
  }

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error: uploadError } = await supabase.storage
      .from('gsons-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('gsons-images')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image to Supabase:', error)
    return null
  }
}

// Orders helpers (for admin)
export async function getOrders() {
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching orders from Supabase:', error)
    return []
  }
}

export async function getOrdersByStatus(status: string) {
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching orders by status from Supabase:', error)
    return []
  }
}

// Customers helpers (derived from orders)
export async function getCustomers() {
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Derive customers from orders
    const customersMap = new Map()
    
    orders?.forEach((order: any) => {
      const email = order.email || order.customer_email
      const phone = order.phone || order.customer_phone
      
      if (email || phone) {
        const key = email || phone
        if (!customersMap.has(key)) {
          customersMap.set(key, {
            name: order.customer_name || '',
            email: email || '',
            phone: phone || '',
            city: order.city || '',
            total_orders: 0,
            last_order_date: order.created_at,
            orders: []
          })
        }
        const customer = customersMap.get(key)
        customer.total_orders += 1
        customer.orders.push(order)
      }
    })

    return Array.from(customersMap.values())
  } catch (error) {
    console.error('Error fetching customers from Supabase:', error)
    return []
  }
}

// Sync website data to Supabase
export async function syncWebsiteData() {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: 'Supabase not configured',
      results: {}
    }
  }

  const results: any = {
    products: { inserted: 0, skipped: 0, errors: 0 },
    testimonials: { inserted: 0, skipped: 0, errors: 0 },
    faqs: { inserted: 0, skipped: 0, errors: 0 },
    siteContent: { inserted: 0, skipped: 0, errors: 0 }
  }

  try {
    // Sync Products
    for (const product of staticProducts) {
      try {
        // Check if product already exists by slug
        const { data: existing } = await supabase
          .from('products')
          .select('id')
          .eq('slug', product.slug)
          .single()

        if (existing) {
          results.products.skipped++
        } else {
          const { error } = await supabase
            .from('products')
            .insert({
              id: product.id,
              slug: product.slug,
              name: product.name,
              category: product.category,
              short_description: product.shortDescription,
              description: product.description,
              price: product.price,
              pack_size: product.packSize,
              image: product.image,
              advantages: product.advantages,
              recommended_for: product.recommendedFor,
              application_guidelines: product.applicationGuidelines,
              stock: product.stock,
              featured: product.featured,
              active: true
            })

          if (error) {
            results.products.errors++
            console.error('Error inserting product:', error)
          } else {
            results.products.inserted++
          }
        }
      } catch (error) {
        results.products.errors++
        console.error('Error syncing product:', error)
      }
    }

    // Sync Testimonials
    for (const testimonial of staticTestimonials) {
      try {
        // Check if testimonial already exists by name and company
        const { data: existing } = await supabase
          .from('testimonials')
          .select('id')
          .eq('name', testimonial.name)
          .eq('role', testimonial.role)
          .single()

        if (existing) {
          results.testimonials.skipped++
        } else {
          const { error } = await supabase
            .from('testimonials')
            .insert({
              id: testimonial.id,
              name: testimonial.name,
              role: testimonial.role,
              message: testimonial.content, // Map content to message
              rating: testimonial.rating,
              image: testimonial.image,
              active: true
            })

          if (error) {
            results.testimonials.errors++
            console.error('Error inserting testimonial:', error)
          } else {
            results.testimonials.inserted++
          }
        }
      } catch (error) {
        results.testimonials.errors++
        console.error('Error syncing testimonial:', error)
      }
    }

    // Sync FAQs
    for (const faq of staticFaqs) {
      try {
        // Check if FAQ already exists by question
        const { data: existing } = await supabase
          .from('faqs')
          .select('id')
          .eq('question', faq.question)
          .single()

        if (existing) {
          results.faqs.skipped++
        } else {
          const { error } = await supabase
            .from('faqs')
            .insert({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
              category: faq.category,
              order: parseInt(faq.id),
              active: true
            })

          if (error) {
            results.faqs.errors++
            console.error('Error inserting FAQ:', error)
          } else {
            results.faqs.inserted++
          }
        }
      } catch (error) {
        results.faqs.errors++
        console.error('Error syncing FAQ:', error)
      }
    }

    // Sync Site Content (Home Hero section)
    const heroContent = {
      title: "India's Trusted Tile Adhesive Manufacturer",
      subtitle: "Stronger Bonds. Flawless Finishes.",
      content: "High-performance tile adhesive, epoxy grout, cement grout, and waterproofing solutions for builders, contractors, and construction professionals.",
      image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
      button_text: "Explore Products",
      button_link: "/products"
    }

    try {
      const { data: existing } = await supabase
        .from('site_content')
        .select('id')
        .eq('section_key', 'home_hero')
        .single()

      if (existing) {
        results.siteContent.skipped++
      } else {
        const { error } = await supabase
          .from('site_content')
          .insert({
            section_key: 'home_hero',
            title: heroContent.title,
            subtitle: heroContent.subtitle,
            content: heroContent.content,
            image_url: heroContent.image_url,
            button_text: heroContent.button_text,
            button_link: heroContent.button_link
          })

        if (error) {
          results.siteContent.errors++
          console.error('Error inserting site content:', error)
        } else {
          results.siteContent.inserted++
        }
      }
    } catch (error) {
      results.siteContent.errors++
      console.error('Error syncing site content:', error)
    }

    // Sync Site Content (About page)
    const aboutContent = {
      title: 'About G Son\'s Technochem',
      subtitle: 'Faith of Generations',
      content: 'G Son\'s Technochem is a leading manufacturer of tile adhesives, epoxy grouts, and construction chemicals. With over 10 years of experience, we have built a reputation for quality, reliability, and innovation in the construction industry.',
      image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
    }

    try {
      const { data: existing } = await supabase
        .from('site_content')
        .select('id')
        .eq('section_key', 'about_page')
        .single()

      if (existing) {
        results.siteContent.skipped++
      } else {
        const { error } = await supabase
          .from('site_content')
          .insert({
            section_key: 'about_page',
            title: aboutContent.title,
            subtitle: aboutContent.subtitle,
            content: aboutContent.content,
            image_url: aboutContent.image_url
          })

        if (error) {
          results.siteContent.errors++
          console.error('Error inserting about content:', error)
        } else {
          results.siteContent.inserted++
        }
      }
    } catch (error) {
      results.siteContent.errors++
      console.error('Error syncing about content:', error)
    }

    return {
      success: true,
      message: 'Sync completed successfully',
      results
    }
  } catch (error) {
    console.error('Error syncing data to Supabase:', error)
    return {
      success: false,
      message: String(error),
      results
    }
  }
}
