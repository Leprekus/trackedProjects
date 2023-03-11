// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const requireAuth: string[] = ['/']
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if(requireAuth.some(path => pathname.startsWith(path))) {
    const token = await getToken({
      
    }) 
  }
  return NextResponse.redirect(new URL('/about-2', request.url))

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/auth/:path*',
}
