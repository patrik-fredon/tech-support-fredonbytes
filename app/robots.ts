import { MetadataRoute } from 'next';

/**
 * Dynamic robots.txt configuration
 * Optimized for Czech Republic search engines (Google.cz, Seznam.cz)
 * and international search engines
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tech.fredonbytes.eu';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Protect API routes
          '/api/*',
          '/_next/',         // Next.js internals
          '/admin/',         // Admin routes if any
          '/private/',       // Private routes
        ],
      },
      // Specific rules for Google
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/api/*'],
        crawlDelay: 0,
      },
      // Specific rules for Google Images
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/api/'],
      },
      // Specific rules for Seznam.cz (Czech search engine)
      {
        userAgent: 'SeznamBot',
        allow: '/',
        disallow: ['/api/', '/api/*'],
        crawlDelay: 1,
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
