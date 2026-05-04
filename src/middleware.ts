import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Temporarily disable middleware to debug login issues
  // Middleware will be re-enabled after login is confirmed working
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
