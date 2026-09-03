import { NextResponse } from 'next/server';

/**
 * Next.js Edge Middleware
 * File: middleware.js (root level)
 * Runs globally on the Edge runtime before route handlers or pages render.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('session_token')?.value || request.headers.get('authorization');

  // Protect all /dashboard and /admin routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!token) {
      // Redirect unauthenticated requests to login page
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Add custom response header for tracking
  const response = NextResponse.next();
  response.headers.set('X-Edge-Processed', 'true');
  response.headers.set('X-Edge-Timestamp', new Date().toISOString());
  return response;
}

// Middleware matcher config
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/:path*'],
};
