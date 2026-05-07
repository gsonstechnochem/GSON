-- ============================================================================
-- G SON'S TECHNOCHEM — COMPLETE SUPABASE SETUP
-- ============================================================================
-- Run this ENTIRE file ONCE in: Supabase Dashboard → SQL Editor → New Query
-- It is fully idempotent (IF NOT EXISTS / ON CONFLICT) — safe to run again.
--
-- After running this, the app will auto-seed products/testimonials/FAQs/content
-- on first admin dashboard load (no button click needed).
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PRODUCTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  short_description TEXT,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  pack_size TEXT,
  image_url TEXT,
  advantages JSONB DEFAULT '[]'::jsonb,
  recommended_for JSONB DEFAULT '[]'::jsonb,
  application_guidelines JSONB DEFAULT '[]'::jsonb,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- ============================================================================
-- 2. SITE_CONTENT (homepage hero, about, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  button_text TEXT,
  button_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section_key);

-- ============================================================================
-- 3. TESTIMONIALS
-- ============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS image_url TEXT;
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active);

-- ============================================================================
-- 4. FAQS
-- ============================================================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(active);

-- ============================================================================
-- 5. CONTACT_SETTINGS
-- ============================================================================
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. ORDERS
-- ============================================================================
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
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed','refunded')),
  order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending','confirmed','packed','shipped','delivered','cancelled')),
  tracking_id TEXT,
  courier_partner TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);

-- ============================================================================
-- 7. ORDER_ITEMS
-- ============================================================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ============================================================================
-- 8. LEADS (contact form submissions / inquiries)
-- ============================================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'contact_form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','converted','closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content      ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials      ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs              ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders            ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads             ENABLE ROW LEVEL SECURITY;

-- Drop legacy duplicate policies if they exist (safe re-run)
DO $$ BEGIN
  -- products
  DROP POLICY IF EXISTS "Public can view active products"        ON products;
  DROP POLICY IF EXISTS "Authenticated full access products"     ON products;
  -- site_content
  DROP POLICY IF EXISTS "Public can view site content"           ON site_content;
  DROP POLICY IF EXISTS "Authenticated full access site_content" ON site_content;
  -- testimonials
  DROP POLICY IF EXISTS "Public can view active testimonials"    ON testimonials;
  DROP POLICY IF EXISTS "Authenticated full access testimonials" ON testimonials;
  -- faqs
  DROP POLICY IF EXISTS "Public can view active faqs"            ON faqs;
  DROP POLICY IF EXISTS "Authenticated full access faqs"         ON faqs;
  -- contact_settings
  DROP POLICY IF EXISTS "Public can view contact_settings"       ON contact_settings;
  DROP POLICY IF EXISTS "Authenticated full access contact_set"  ON contact_settings;
  -- orders
  DROP POLICY IF EXISTS "Public can insert orders"               ON orders;
  DROP POLICY IF EXISTS "Authenticated full access orders"       ON orders;
  -- order_items
  DROP POLICY IF EXISTS "Public can insert order_items"          ON order_items;
  DROP POLICY IF EXISTS "Authenticated full access order_items"  ON order_items;
  -- leads
  DROP POLICY IF EXISTS "Public can insert leads"                ON leads;
  DROP POLICY IF EXISTS "Authenticated full access leads"        ON leads;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- products
CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (active = true);
CREATE POLICY "Authenticated full access products" ON products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- site_content
CREATE POLICY "Public can view site content" ON site_content
  FOR SELECT USING (true);
CREATE POLICY "Authenticated full access site_content" ON site_content
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- testimonials
CREATE POLICY "Public can view active testimonials" ON testimonials
  FOR SELECT USING (active = true);
CREATE POLICY "Authenticated full access testimonials" ON testimonials
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- faqs
CREATE POLICY "Public can view active faqs" ON faqs
  FOR SELECT USING (active = true);
CREATE POLICY "Authenticated full access faqs" ON faqs
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- contact_settings
CREATE POLICY "Public can view contact_settings" ON contact_settings
  FOR SELECT USING (true);
CREATE POLICY "Authenticated full access contact_set" ON contact_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- orders: public can INSERT (checkout), only authenticated can read/update
CREATE POLICY "Public can insert orders" ON orders
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated full access orders" ON orders
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- order_items: same pattern
CREATE POLICY "Public can insert order_items" ON order_items
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated full access order_items" ON order_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- leads: public CAN insert (contact form), only authenticated can read
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated full access leads" ON leads
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================================
-- STORAGE BUCKET FOR PRODUCT IMAGES
-- ============================================================================
-- This creates the "gsons-images" bucket used by admin product image uploads.
-- If this errors out (older Supabase) create it manually in Storage UI:
--   Bucket name: gsons-images   |   Public: ON
INSERT INTO storage.buckets (id, name, public)
VALUES ('gsons-images', 'gsons-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public read access to images
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read gsons-images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated upload gsons-images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated update gsons-images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated delete gsons-images" ON storage.objects;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

CREATE POLICY "Public read gsons-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gsons-images');
CREATE POLICY "Authenticated upload gsons-images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gsons-images');
CREATE POLICY "Authenticated update gsons-images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'gsons-images') WITH CHECK (bucket_id = 'gsons-images');
CREATE POLICY "Authenticated delete gsons-images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'gsons-images');

-- ============================================================================
-- DONE
-- ============================================================================
-- Next steps:
-- 1. In Supabase Auth → Users, create an admin user with email + password
-- 2. Visit /admin/login on your live site, log in
-- 3. Dashboard will auto-seed products / testimonials / FAQs / content on first load
-- 4. All edits in the admin panel sync live to the public website
-- ============================================================================
