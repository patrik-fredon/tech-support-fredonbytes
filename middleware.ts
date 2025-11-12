import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for handling 301 redirects from alternative domains to .eu
 * Redirects: .com, .cz, .tech, .cloud → .eu
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // List of domains to redirect FROM
  const redirectDomains = [
    'fredonbytes.com',
    'tech.fredonbytes.com',
    'www.fredonbytes.com',
    'fredonbytes.cz',
    'tech.fredonbytes.cz',
    'www.fredonbytes.cz',
    'fredonbytes.tech',
    'tech.fredonbytes.tech',
    'www.fredonbytes.tech',
    'fredonbytes.cloud',
    'tech.fredonbytes.cloud',
    'www.fredonbytes.cloud',
  ];

  // Target domain
  const targetDomain = 'tech.fredonbytes.eu';

  // Check if current hostname should be redirected
  if (redirectDomains.some(domain => hostname.includes(domain))) {
    // Build the new URL with the target domain
    url.host = targetDomain;
    url.protocol = 'https:';

    // Return 301 Permanent Redirect
    return NextResponse.redirect(url, {
      status: 301,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  // Continue with the request if no redirect needed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
