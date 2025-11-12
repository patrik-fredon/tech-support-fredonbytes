/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance optimization
  swcMinify: true,
  poweredByHeader: false,

  // Docker deployment - standalone output
  output: 'standalone',

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tech.fredonbytes.eu',
      },
      {
        protocol: 'https',
        hostname: 'fredonbytes.eu',
      },
    ],
  },

  // Compression
  compress: true,

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects from alternative domains (backup for middleware)
  async redirects() {
    return [
      // Canonical URL redirects
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.tech.fredonbytes.eu',
          },
        ],
        destination: 'https://tech.fredonbytes.eu/:path*',
        permanent: true,
      },
    ];
  },

  // Webpack configuration
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/components', '@/app'],
  },
};

module.exports = nextConfig;
