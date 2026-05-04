import { createBrowserClient } from '@supabase/ssr'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Use the SSR-aware browser client so Supabase auth state is mirrored to cookies.
// This allows Next.js middleware (running at the edge) to detect a logged-in
// session via cookie presence and protect /admin/* routes server-side.
// Falls back to the basic client if env vars are missing so the build still works.
let client: SupabaseClient

if (supabaseUrl && supabaseAnonKey) {
  client = createBrowserClient(supabaseUrl, supabaseAnonKey)
} else {
  client = createClient(supabaseUrl || 'http://localhost', supabaseAnonKey || 'placeholder')
}

export const supabase = client

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl) && Boolean(supabaseAnonKey)
}
