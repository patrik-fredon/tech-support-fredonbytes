/**
 * JSON-LD Structured Data Component
 * Provides rich schema.org markup for better Google Search results
 */
export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FredonBytes',
    url: 'https://fredonbytes.eu',
    logo: 'https://tech.fredonbytes.eu/icon-512.png',
    sameAs: [
      'https://tech.fredonbytes.eu',
      // Add social media profiles here when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      availableLanguage: ['Czech', 'English'],
      areaServed: 'CZ',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://tech.fredonbytes.eu',
    name: 'FredonBytes Tech Support',
    description: 'Profesionální technická podpora pro IT služby, cloud řešení a hosting v České republice',
    url: 'https://tech.fredonbytes.eu',
    telephone: '+420-XXX-XXX-XXX', // TODO: Add real phone number
    email: 'support@fredonbytes.eu',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CZ',
      addressLocality: 'Prague', // TODO: Update with actual location
      addressRegion: 'Prague',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.0755', // Prague coordinates - update if needed
      longitude: '14.4378',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Czech Republic',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://tech.fredonbytes.eu',
    name: 'FredonBytes Tech Support',
    description: 'Technická podpora pro FredonBytes služby',
    inLanguage: ['cs-CZ', 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tech.fredonbytes.eu/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://fredonbytes.eu',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tech Support',
        item: 'https://tech.fredonbytes.eu',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
