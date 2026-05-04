-- ============================================
-- Supabase Database Setup for G Son's Technochem
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: products
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  pack_size TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  advantages TEXT[] DEFAULT '{}',
  recommended_for TEXT[] DEFAULT '{}',
  application_guidelines TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- ============================================
-- TABLE: site_content
-- ============================================
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  button_text TEXT,
  button_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on section_key
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section_key);

-- ============================================
-- TABLE: testimonials
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on active status
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active);

-- ============================================
-- TABLE: faqs
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  active BOOLEAN DEFAULT true,
  order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on active and order
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(active);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs(order);

-- ============================================
-- TABLE: contact_settings
-- ============================================
CREATE TABLE IF NOT EXISTS contact_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  whatsapp_number TEXT,
  whatsapp_message TEXT,
  website_url TEXT,
  social_facebook TEXT,
  social_instagram TEXT,
  social_linkedin TEXT,
  social_youtube TEXT,
  business_hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: orders
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled')),
  tracking_id TEXT,
  courier_partner TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on order_number and status
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);

-- ============================================
-- TABLE: order_items
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on order_id
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products table policies
-- Allow public read access for active products
CREATE POLICY "Public can view active products"
ON products FOR SELECT
USING (active = true);

-- Allow authenticated users to read all products (for admin)
CREATE POLICY "Authenticated can view all products"
ON products FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert products
CREATE POLICY "Authenticated can insert products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update products
CREATE POLICY "Authenticated can update products"
ON products FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete products
CREATE POLICY "Authenticated can delete products"
ON products FOR DELETE
TO authenticated
USING (true);

-- Site content table policies
-- Allow public read access
CREATE POLICY "Public can view site content"
ON site_content FOR SELECT
USING (true);

-- Allow authenticated users to modify site content
CREATE POLICY "Authenticated can modify site content"
ON site_content FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Testimonials table policies
-- Allow public read access for active testimonials
CREATE POLICY "Public can view active testimonials"
ON testimonials FOR SELECT
USING (active = true);

-- Allow authenticated users to read all testimonials
CREATE POLICY "Authenticated can view all testimonials"
ON testimonials FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to modify testimonials
CREATE POLICY "Authenticated can modify testimonials"
ON testimonials FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- FAQs table policies
-- Allow public read access for active FAQs
CREATE POLICY "Public can view active FAQs"
ON faqs FOR SELECT
USING (active = true);

-- Allow authenticated users to read all FAQs
CREATE POLICY "Authenticated can view all FAQs"
ON faqs FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to modify FAQs
CREATE POLICY "Authenticated can modify FAQs"
ON faqs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Contact settings table policies
-- Allow public read access
CREATE POLICY "Public can view contact settings"
ON contact_settings FOR SELECT
USING (true);

-- Allow authenticated users to modify contact settings
CREATE POLICY "Authenticated can modify contact settings"
ON contact_settings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Orders table policies
-- Allow authenticated users to read orders
CREATE POLICY "Authenticated can view orders"
ON orders FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert orders
CREATE POLICY "Authenticated can insert orders"
ON orders FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update orders
CREATE POLICY "Authenticated can update orders"
ON orders FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete orders
CREATE POLICY "Authenticated can delete orders"
ON orders FOR DELETE
TO authenticated
USING (true);

-- Order items table policies
-- Allow authenticated users to read order items
CREATE POLICY "Authenticated can view order items"
ON order_items FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert order items
CREATE POLICY "Authenticated can insert order items"
ON order_items FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update order items
CREATE POLICY "Authenticated can update order items"
ON order_items FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete order items
CREATE POLICY "Authenticated can delete order items"
ON order_items FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- INITIAL DATA SEEDING (OPTIONAL)
-- ============================================

-- Insert initial site content for home hero
INSERT INTO site_content (section_key, title, subtitle, content, image_url, button_text, button_link)
VALUES ('home_hero', 
  'India''s Trusted Tile Adhesive Manufacturer',
  'Stronger Bonds. Flawless Finishes.',
  'High-performance tile adhesive, epoxy grout, cement grout, and waterproofing solutions designed for professional results and lasting durability.',
  '',
  'Explore Products',
  '/products')
ON CONFLICT (section_key) DO NOTHING;

-- Insert initial site content for about page
INSERT INTO site_content (section_key, title, subtitle, content, image_url)
VALUES ('about_page',
  'About G Son''s Technochem',
  'Faith of Generations',
  'Founded in 2015, G Son''s Technochem has grown from a small manufacturing unit to one of India''s most trusted names in construction chemicals. Based in Kadi, Gujarat, we specialize in producing high-quality tile adhesives, epoxy grouts, cement grouts, and waterproofing solutions.

Our journey began with a simple mission: to provide Indian contractors, architects, and homeowners with world-class construction materials at competitive prices. Over the years, we have invested heavily in research and development, ensuring our products meet international quality standards.

Today, our products are used in thousands of construction projects across India, from residential homes to commercial complexes. Our commitment to quality, innovation, and customer satisfaction has made us a preferred choice for construction professionals nationwide.',
  '')
ON CONFLICT (section_key) DO NOTHING;

-- Insert initial contact settings
INSERT INTO contact_settings (
  company_name, phone, email, address, city, state, pincode,
  whatsapp_number, whatsapp_message, website_url,
  social_facebook, social_instagram, social_linkedin, social_youtube,
  business_hours
)
VALUES (
  'G Son''s Technochem',
  '+91 8485998487',
  'info@gsonstechnochem.com',
  'Kadi, Gujarat',
  'Kadi',
  'Gujarat',
  '382715',
  '+91 8485998487',
  'Hi, I''m interested in your products',
  'https://gsonstechnochem.com',
  '',
  '',
  '',
  '',
  'Mon - Sat: 9:00 AM - 6:00 PM'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- STORAGE BUCKET SETUP (Run in Supabase Storage)
-- ============================================
-- Instructions:
-- 1. Go to Storage in Supabase dashboard
-- 2. Create a new bucket named "gsons-images"
-- 3. Make it public
-- 4. Add RLS policy for public read access
-- ============================================

-- Storage bucket policies (run in SQL Editor after creating bucket)
-- Note: These will only work after you create the bucket in the Storage UI

-- CREATE POLICY "Public can view images"
-- ON storage.objects FOR SELECT
-- TO public
-- USING (bucket_id = 'gsons-images');

-- CREATE POLICY "Authenticated can upload images"
-- ON storage.objects FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'gsons-images');

-- CREATE POLICY "Authenticated can delete images"
-- ON storage.objects FOR DELETE
-- TO authenticated
-- USING (bucket_id = 'gsons-images');

-- ============================================
-- AUTH SETUP
-- ============================================
-- Instructions:
-- 1. Go to Authentication in Supabase dashboard
-- 2. Enable Email/Password provider
-- 3. Disable email confirmation (optional, for easier testing)
-- 4. Create an admin user:
--    - Email: admin@yourdomain.com
--    - Password: (set a strong password)
-- ============================================

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Next Steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Create Storage bucket "gsons-images" in Storage UI
-- 3. Create admin user in Authentication
-- 4. Update .env.local with your Supabase credentials
-- 5. Set up Netlify environment variables
-- 6. Test admin panel at /admin/login
-- ============================================
