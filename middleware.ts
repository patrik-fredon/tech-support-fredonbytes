import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware executing for path:', pathname);
  
  // Detekce jazyka z cookies nebo výchozí hodnota
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const locale = localeCookie || 'cs';
  console.log('Using locale from cookie:', locale);

  // Mapování zkrácených URL na plné URL
  if (pathname === '/terms') {
    console.log(`Redirecting /terms to /fixed-terms`);
    return NextResponse.redirect(new URL(`/fixed-terms`, request.url));
  }
  
  if (pathname === '/privacy') {
    console.log(`Redirecting /privacy to /fixed-privacy`);
    return NextResponse.redirect(new URL(`/fixed-privacy`, request.url));
  }

  return NextResponse.next();
}

// Konfigurujeme middleware tak, aby běžel pouze na cestách /terms a /privacy
export const config = {
  matcher: ['/terms', '/privacy'],
};
