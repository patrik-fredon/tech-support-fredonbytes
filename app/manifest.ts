import { MetadataRoute } from 'next';

/**
 * Web App Manifest for PWA support
 * Optimized for Czech users with proper localization
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FredonBytes Tech Support - Technická podpora',
    short_name: 'FredonBytes',
    description: 'Profesionální technická podpora pro FredonBytes služby v České republice',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1f2937',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'cs-CZ',
    dir: 'ltr',
    categories: [
      'business',
      'productivity',
      'utilities',
    ],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
