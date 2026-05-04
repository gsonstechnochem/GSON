# Supabase Admin Panel Integration Guide

This guide explains how to set up and use the Supabase admin panel for the G Son's Technochem website.

## Table of Contents
1. [Supabase Database Setup](#supabase-database-setup)
2. [Environment Variables](#environment-variables)
3. [Netlify Deployment](#netlify-deployment)
4. [Admin Panel Usage](#admin-panel-usage)
5. [Custom Domain Configuration](#custom-domain-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Supabase Database Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose organization (or create new one)
5. Enter project name: `gsons-website`
6. Choose database password (save it securely)
7. Select region closest to your users
8. Click "Create new project"

### Step 2: Run SQL Setup
1. Open your Supabase project dashboard
2. Go to SQL Editor (left sidebar)
3. Open the `SUPABASE_SETUP.sql` file from this repository
4. Copy and paste the entire SQL content
5. Click "Run" to execute the SQL
6. Verify all tables are created in Table Editor

### Step 3: Set Up Storage
1. Go to Storage (left sidebar)
2. Click "Create a new bucket"
3. Name it: `gsons-images`
4. Make it **Public**
5. Click "Create bucket"

### Step 4: Create Admin User
1. Go to Authentication (left sidebar)
2. Click "Users" tab
3. Click "Add user"
4. Enter email: `admin@yourdomain.com` (use your actual email)
5. Enter a strong password
6. Click "Save"
7. Note: Disable "Confirm email" for easier testing (optional)

---

## Environment Variables

### Local Development (.env.local)

The `.env.local` file should contain:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**To get these values:**
1. In Supabase dashboard, go to Settings → API
2. Copy the Project URL
3. Copy the anon/public key
4. Paste into `.env.local`

**Important:** Never commit `.env.local` to Git. It's already in `.gitignore`.

### Vercel Environment Variables

#### Step 1: Connect GitHub to Vercel
1. Log in to [Vercel](https://vercel.com)
2. Go to "Add New" → "Project"
3. Select your repository: `thegujaratidesigner/gsons-website`
4. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
5. Click "Deploy"

#### Step 2: Add Environment Variables
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key | Production, Preview, Development |

4. Click "Save"
5. Redeploy your project (Deployments → Redeploy)

---

## Admin Panel Usage

### Accessing the Admin Panel

1. Navigate to: `https://your-domain.com/admin/login`
2. Enter the email and password of your Supabase admin user
3. Click "Sign In"

### Admin Dashboard Features

#### Overview Tab
- View statistics: Total products, active products, testimonials, FAQs
- Quick action buttons to navigate to other sections

#### Products Management (`/admin/products`)
- **View Products**: See all products in a table
- **Add Product**: Click "Add Product" to create new product
- **Edit Product**: Click edit icon to modify product details
- **Delete Product**: Click trash icon to remove product
- **Product Fields**:
  - Name, Slug (auto-generated)
  - Category (Tile Adhesive, Epoxy Grout, Cement Grout, Waterproofing)
  - Price, Pack Size, Stock
  - Short Description, Full Description
  - Image URL (from Supabase Storage or external)
  - Advantages, Recommended For, Application Guidelines (comma-separated)
  - Featured checkbox (shows in featured section)
  - Active checkbox (visible on public site)

#### Content Management (`/admin/content`)
- **Hero Section**: Edit home page hero content
  - Title, Subtitle, Description
  - Image URL, Button Text, Button Link
- **About Page**: Edit about page content
  - Title, Subtitle, Full Description
  - Image URL

#### Testimonials Management (`/admin/testimonials`)
- **View Testimonials**: See all testimonials
- **Add Testimonial**: Create new customer testimonial
- **Edit Testimonial**: Modify existing testimonial
- **Delete Testimonial**: Remove testimonial
- **Testimonial Fields**:
  - Customer Name, Role
  - Message/Testimonial text
  - Rating (1-5 stars)
  - Active checkbox

#### FAQs Management (`/admin/faqs`)
- **View FAQs**: See all FAQs in order
- **Add FAQ**: Create new FAQ
- **Edit FAQ**: Modify existing FAQ
- **Delete FAQ**: Remove FAQ
- **Reorder FAQs**: Use up/down arrows to change order
- **FAQ Fields**:
  - Question, Answer
  - Category (General, Products, Orders, Shipping, Technical)
  - Active checkbox
  - Order (for display sequence)

#### Settings Management (`/admin/settings`)
- **Company Information**: Company name, website URL
- **Contact Details**: Phone, email
- **Address**: Street address, city, state, pincode
- **WhatsApp Settings**: WhatsApp number, default message
- **Social Media**: Facebook, Instagram, LinkedIn, YouTube URLs
- **Business Hours**: Operating hours

### Security Notes

- The admin panel uses Supabase Auth for authentication
- Only users created in Supabase Authentication can access the admin panel
- Row Level Security (RLS) policies protect your data
- Use strong passwords for admin accounts
- Never share your anon key or service role key

---

## Custom Domain Configuration

### When You Connect a Custom Domain

If you connect a custom domain to Vercel (e.g., `www.gsonstechnochem.com`), you may need to update Supabase settings:

#### Update Supabase Auth URL

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Update "Site URL" to your custom domain: `https://www.gsonstechnochem.com`
3. Add "Redirect URLs":
   - `https://www.gsonstechnochem.com/**`
   - `https://gsonstechnochem.com/**`
   - `https://your-vercel-url.vercel.app/**` (keep as backup)
4. Click "Save"

#### Update .env.local (Local Development)

If you want to test with the custom domain locally:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Note:** The Supabase URL doesn't change - only the Auth redirect URLs need updating.

#### Update Vercel Environment Variables

No changes needed to Vercel environment variables. The `NEXT_PUBLIC_SUPABASE_URL` stays the same.

#### Configure Custom Domain in Vercel

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions
5. Wait for SSL certificate to be issued

### WhatsApp Button Update

If you change your domain, the WhatsApp button automatically uses the contact settings from Supabase. No code changes needed.

---

## Troubleshooting

### Issue: "Supabase is not configured" error

**Solution:**
- Check that `.env.local` exists and has correct values
- Verify environment variables are set in Netlify
- Restart development server after adding `.env.local`

### Issue: Admin login fails

**Solution:**
- Verify admin user exists in Supabase Authentication
- Check email and password are correct
- Ensure email confirmation is disabled (for testing)
- Check Auth redirect URLs in Supabase settings

### Issue: Public pages show no data

**Solution:**
- Check Supabase tables exist (run SQL setup)
- Verify data is inserted in tables
- Check RLS policies allow public read access
- Check browser console for errors

### Issue: Images not loading

**Solution:**
- Verify Storage bucket `gsons-images` exists
- Check bucket is public
- Verify image URLs are correct
- Check RLS policies for Storage

### Issue: Build errors about Supabase

**Solution:**
- This is expected if Supabase tables don't exist yet
- The fallback to static data will work
- Complete Supabase setup to resolve errors

### Issue: Vercel deployment fails

**Solution:**
- Check environment variables are set in Vercel
- Verify build command is `npm run build`
- Check Vercel build logs for errors
- Ensure GitHub repository is connected
- Verify no static export in next.config.js

---

## Data Migration (Optional)

If you have existing static data you want to migrate to Supabase:

### Products Migration
```sql
INSERT INTO products (name, slug, category, price, pack_size, short_description, description, image_url, stock, featured, active)
VALUES 
  ('GS 100 Tile Adhesive', 'gs-100-tile-adhesive', 'Tile Adhesive', 350.00, '50 kg', 'High-strength tile adhesive for ceramic and vitrified tiles', '...', '...', 100, true, true);
```

### Testimonials Migration
```sql
INSERT INTO testimonials (name, role, message, rating, active)
VALUES 
  ('John Doe', 'Contractor', 'Excellent product quality!', 5, true);
```

### FAQs Migration
```sql
INSERT INTO faqs (question, answer, category, active, order)
VALUES 
  ('What is epoxy grout?', 'Epoxy grout is a high-strength grout...', 'General', true, 1);
```

---

## Support

For issues or questions:
1. Check this guide first
2. Review Supabase documentation: https://supabase.com/docs
3. Check Vercel documentation: https://vercel.com/docs
4. Review code comments in admin panel files

---

## Security Best Practices

1. **Never commit** `.env.local` or any secrets to Git
2. **Use strong passwords** for Supabase and admin accounts
3. **Enable 2FA** on Supabase account if available
4. **Regularly update** dependencies
5. **Monitor** Supabase logs for suspicious activity
6. **Backup** your Supabase database regularly
7. **Use RLS policies** to control data access
8. **Never expose** service role keys in client code

---

## Summary

The Supabase admin panel provides a complete CMS for managing:
- Products (CRUD operations)
- Site content (hero, about page)
- Testimonials
- FAQs
- Contact settings

All data is stored in Supabase and fetched with fallback to static data, ensuring the site works even if Supabase is temporarily unavailable.

The admin panel is secured with Supabase Auth and RLS policies, ensuring only authorized users can modify content.
