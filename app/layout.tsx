import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import type { Metadata } from 'next';
import Footer from "./components/Footer";
import { JsonLd } from "./components/JsonLd";
import { ThemeProvider } from './context/ThemeContext';
import { TranslationProvider } from './context/TranslationContext';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Enhanced metadata optimized for Czech Republic SEO and Google Search
export const metadata: Metadata = {
  metadataBase: new URL('https://tech.fredonbytes.eu'),
  title: {
    default: 'FredonBytes Tech Support - Technická podpora pro IT služby v ČR',
    template: '%s | FredonBytes Tech Support',
  },
  description: 'Profesionální technická podpora FredonBytes. Rychlá pomoc s IT službami, cloud řešení, hosting a technické problémy. Podpora v češtině 24/7. Česká republika.',
  keywords: [
    // Czech keywords - primary
    'technická podpora',
    'IT podpora',
    'FredonBytes',
    'technická pomoc',
    'IT služby Česká republika',
    'cloud podpora ČR',
    'hosting podpora',
    'serverová podpora',
    'IT support Praha',
    'technická podpora online',
    'helpdesk ČR',
    'IT řešení',

    // English keywords - secondary
    'tech support',
    'IT support',
    'technical support',
    'cloud services',
    'hosting support',
    'Czech Republic IT',
    'FredonBytes support',
    'tech help',
    'IT solutions',
  ],
  authors: [{ name: 'FredonBytes', url: 'https://fredonbytes.eu' }],
  creator: 'FredonBytes',
  publisher: 'FredonBytes',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: 'technology',

  // OpenGraph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    alternateLocale: ['en_US'],
    url: 'https://tech.fredonbytes.eu',
    siteName: 'FredonBytes Tech Support',
    title: 'FredonBytes Tech Support - Profesionální IT podpora v ČR',
    description: 'Rychlá a spolehlivá technická podpora pro FredonBytes služby. Pomoc s cloudem, hostingem a IT problémy. Dostupné v češtině 24/7.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FredonBytes Tech Support - IT podpora',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'FredonBytes Tech Support - IT podpora v ČR',
    description: 'Profesionální technická podpora FredonBytes. Rychlá pomoc s IT službami v češtině 24/7.',
    creator: '@fredonbytes',
    images: ['/twitter-image.png'],
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons and manifest
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  manifest: '/manifest.webmanifest',

  // Verification for search engines
  verification: {
    google: 'your-google-verification-code', // TODO: Replace with actual Google Search Console verification code
    // yandex: 'your-yandex-verification-code',
    // other: 'your-other-verification-code',
  },

  // Alternate languages
  alternates: {
    canonical: 'https://tech.fredonbytes.eu',
    languages: {
      'cs-CZ': 'https://tech.fredonbytes.eu?lang=cs',
      'en-US': 'https://tech.fredonbytes.eu?lang=en',
    },
  },

  // Other metadata
  other: {
    'google-site-verification': 'your-google-verification-code', // TODO: Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <JsonLd />

        {/* Plausible Analytics - Privacy-friendly analytics */}
        <Script
          defer
          data-domain="tech.fredonbytes.eu"
          src="https://plausible.homelab-fredon.space/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script
          id="plausible-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function() {
                (window.plausible.q = window.plausible.q || []).push(arguments)
              }
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <TranslationProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
              <header className="border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        FredonBytes Support
                      </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <LanguageSwitcher />
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
