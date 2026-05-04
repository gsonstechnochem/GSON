import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Lightweight cookie-based middleware. Detailed auth verification is handled
// client-side in the admin layout; this just shortcuts unauthenticated users
// away from protected admin pages without round-tripping to Supabase.
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // The login page must always be reachable
  if (path === '/admin/login' || path === '/admin') {
    return NextResponse.next()
  }

  if (path.startsWith('/admin')) {
    // Supabase JS stores its session in a cookie that begins with `sb-` and ends
    // with `-auth-token`. If none exists, the user is definitely not signed in.
    const cookies = req.cookies.getAll()
    const hasSupabaseSession = cookies.some(
      (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    )

    if (!hasSupabaseSession) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
