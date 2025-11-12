import { MetadataRoute } from 'next';

/**
 * Dynamic sitemap generation
 * Optimized for Czech Republic SEO with backlinks to fredonbytes.eu
 * Includes all static and dynamic routes
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tech.fredonbytes.eu';
  const currentDate = new Date();

  // Legal document slugs (from /app/legal/[slug]/page.tsx)
  const legalPages = [
    'privacy-policy',
    'terms-of-service',
    'cookie-policy',
    'gdpr',
  ];

  return [
    // Home page - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          'cs': `${baseUrl}?lang=cs`,
          'en': `${baseUrl}?lang=en`,
        },
      },
    },
    // Thank you page
    {
      url: `${baseUrl}/thank-you`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    // Legal pages - important for compliance and SEO
    ...legalPages.map((slug) => ({
      url: `${baseUrl}/legal/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // Backlink to main FredonBytes website
    {
      url: 'https://fredonbytes.eu',
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Additional backlinks to FredonBytes services
    {
      url: 'https://fredonbytes.eu/services',
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://fredonbytes.eu/about',
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://fredonbytes.eu/contact',
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
}
