# SEO Setup Documentation - FredonBytes Tech Support

## 📋 Overview

This document describes the comprehensive SEO implementation for `tech.fredonbytes.eu`, optimized for Czech Republic market and Google Search Console indexing.

## ✅ Implemented Features

### 1. **Domain Redirects (301 Permanent)**
- **File**: `middleware.ts`
- **Purpose**: Redirect all alternative domains to canonical `.eu` domain
- **Redirected domains**:
  - `fredonbytes.com` → `tech.fredonbytes.eu`
  - `fredonbytes.cz` → `tech.fredonbytes.eu`
  - `fredonbytes.tech` → `tech.fredonbytes.eu`
  - `fredonbytes.cloud` → `tech.fredonbytes.eu`
  - All `www.` variants
- **Benefits**: Consolidates SEO authority, prevents duplicate content penalties

### 2. **Dynamic Robots.txt**
- **File**: `app/robots.ts`
- **Features**:
  - Allows all major search engines (Google, Seznam.cz, Bing)
  - Protects API routes from indexing
  - Optimized crawl delays for Czech search engines
  - Links to sitemap.xml
- **Accessible at**: `https://tech.fredonbytes.eu/robots.txt`

### 3. **Dynamic Sitemap**
- **File**: `app/sitemap.ts`
- **Features**:
  - Auto-generates XML sitemap
  - Includes all static pages with proper priorities
  - Bilingual support (Czech/English)
  - Backlinks to main FredonBytes website
  - Change frequencies optimized for SEO
- **Accessible at**: `https://tech.fredonbytes.eu/sitemap.xml`

### 4. **Web App Manifest (PWA)**
- **File**: `app/manifest.ts`
- **Features**:
  - Progressive Web App support
  - Czech localization (`cs-CZ`)
  - Icon definitions for mobile devices
  - Installable as standalone app
- **Accessible at**: `https://tech.fredonbytes.eu/manifest.webmanifest`

### 5. **Enhanced Metadata**
- **File**: `app/layout.tsx`
- **Optimizations**:
  - **Title**: SEO-optimized with template support
  - **Description**: Czech-focused with key services mentioned
  - **Keywords**: 20+ Czech and English keywords
    - Primary: `technická podpora`, `IT podpora`, `FredonBytes`
    - Location: `Česká republika`, `Praha`, `ČR`
    - Services: `cloud`, `hosting`, `serverová podpora`
  - **OpenGraph**: Full social media preview support
  - **Twitter Card**: Large image card for better engagement
  - **Canonical URLs**: Prevents duplicate content issues
  - **Language alternates**: Czech and English versions
  - **Robots meta**: Optimized for Google crawling

### 6. **JSON-LD Structured Data**
- **File**: `app/components/JsonLd.tsx`
- **Schemas implemented**:
  1. **Organization** - Company information
  2. **LocalBusiness** - Czech business details
  3. **WebSite** - Site search functionality
  4. **BreadcrumbList** - Navigation hierarchy
- **Benefits**: Rich snippets in Google Search results

### 7. **Plausible Analytics**
- **Integration**: Privacy-friendly, GDPR-compliant analytics
- **Features**:
  - File downloads tracking
  - Outbound links tracking
  - Custom event tracking
  - Revenue tracking
  - Page view properties
- **Helper library**: `app/lib/analytics.ts` for easy event tracking
- **No cookies**: No GDPR consent banner needed

### 8. **Next.js Configuration**
- **File**: `next.config.js`
- **Optimizations**:
  - Security headers (HSTS, CSP, X-Frame-Options)
  - Image optimization (AVIF, WebP)
  - Compression enabled
  - Performance tuning
  - Additional domain redirects

## 🎯 Czech Republic SEO Optimization

### Keywords Strategy
- **Primary focus**: Local Czech market
- **Language**: Czech (cs-CZ) as primary, English (en-US) as secondary
- **Location targets**: Prague, Czech Republic
- **Search intent**: Technical support, IT services

### Geo-targeting
- Schema.org `LocalBusiness` with Prague coordinates
- `areaServed`: Czech Republic
- Contact information in Czech
- Business hours: 24/7 support

### Search Engines
1. **Google.cz** - Primary target
2. **Seznam.cz** - Czech search engine (specific bot rules)
3. **Bing** - International fallback

## 🔧 Setup Checklist

### Required Actions

#### 1. Google Search Console
- [ ] Add property: `https://tech.fredonbytes.eu`
- [ ] Verify ownership using meta tag (see TODO in `app/layout.tsx` line 121)
- [ ] Submit sitemap: `https://tech.fredonbytes.eu/sitemap.xml`
- [ ] Set target country: Czech Republic
- [ ] Enable international targeting

#### 2. Image Assets
Create and add the following images to `/public`:
- [ ] `/icon-192.png` - PWA icon (192x192)
- [ ] `/icon-512.png` - PWA icon (512x512)
- [ ] `/apple-icon.png` - Apple touch icon
- [ ] `/og-image.png` - OpenGraph image (1200x630)
- [ ] `/twitter-image.png` - Twitter card image (1200x630)
- [ ] `/screenshot-wide.png` - PWA screenshot (1280x720)
- [ ] `/screenshot-narrow.png` - PWA screenshot (750x1334)

#### 3. Update Contact Information
Edit `app/components/JsonLd.tsx`:
- [ ] Line 26: Add real phone number
- [ ] Line 35: Update email if different
- [ ] Lines 37-42: Update actual business address
- [ ] Lines 44-48: Update coordinates if not Prague

#### 4. Plausible Analytics
- [ ] Verify script is loading: Check Network tab in DevTools
- [ ] Test event tracking: Use `analytics.supportForm.submitted('test')`
- [ ] Configure goals in Plausible dashboard

#### 5. Domain DNS Configuration
Ensure all domains point to the same hosting:
```
tech.fredonbytes.eu    → Your hosting
tech.fredonbytes.com   → Your hosting (will 301 redirect)
tech.fredonbytes.cz    → Your hosting (will 301 redirect)
tech.fredonbytes.tech  → Your hosting (will 301 redirect)
tech.fredonbytes.cloud → Your hosting (will 301 redirect)
```

## 📊 Monitoring & Analytics

### Plausible Dashboard
Access your analytics at: `https://plausible.homelab-fredon.space/tech.fredonbytes.eu`

**Available metrics**:
- Real-time visitors
- Page views
- Bounce rate
- Visit duration
- Traffic sources
- Goal conversions
- File downloads
- Outbound link clicks

### Google Search Console
Monitor:
- Index coverage
- Performance (clicks, impressions, CTR)
- Mobile usability
- Core Web Vitals
- Manual actions
- Security issues

### Recommended Dashboards
1. **Google Analytics 4** (optional) - For advanced funnel analysis
2. **Google PageSpeed Insights** - Monitor performance
3. **Schema.org Validator** - Test structured data

## 🚀 Testing

### SEO Testing Tools
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Test URL: `https://tech.fredonbytes.eu`

2. **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

3. **Schema Markup Validator**: https://validator.schema.org

4. **Lighthouse** (Chrome DevTools):
   ```bash
   npm run build
   npm run start
   # Then run Lighthouse in Chrome DevTools
   ```

### Expected Lighthouse Scores
- **Performance**: 90+
- **SEO**: 95+
- **Best Practices**: 90+
- **Accessibility**: 90+

### Manual Checks
```bash
# Test robots.txt
curl https://tech.fredonbytes.eu/robots.txt

# Test sitemap.xml
curl https://tech.fredonbytes.eu/sitemap.xml

# Test manifest
curl https://tech.fredonbytes.eu/manifest.webmanifest

# Test 301 redirects
curl -I https://tech.fredonbytes.com
curl -I https://tech.fredonbytes.cz
```

## 🎓 Best Practices

### Content Optimization
1. **Title length**: Keep under 60 characters
2. **Meta description**: 150-160 characters
3. **Headers**: Use H1-H6 hierarchy properly
4. **Alt text**: Add to all images
5. **Internal linking**: Link to related pages
6. **Keywords**: Natural placement, avoid stuffing

### Technical SEO
1. **Page speed**: Optimize images, minimize JS/CSS
2. **Mobile-first**: Responsive design is critical
3. **HTTPS**: Always use secure connections
4. **Canonical URLs**: Prevent duplicate content
5. **Structured data**: Keep JSON-LD updated

### Local SEO (Czech Republic)
1. **Google My Business**: Claim and optimize listing
2. **NAP consistency**: Name, Address, Phone across web
3. **Local backlinks**: Get links from Czech websites
4. **Czech content**: Create content in Czech language
5. **Local keywords**: Use Czech location modifiers

## 📝 Maintenance

### Monthly Tasks
- [ ] Check Google Search Console for errors
- [ ] Review Plausible analytics data
- [ ] Update sitemap if new pages added
- [ ] Check for broken links
- [ ] Monitor Core Web Vitals

### Quarterly Tasks
- [ ] Review and update keywords
- [ ] Analyze competitor SEO
- [ ] Update content freshness
- [ ] Check backlink profile
- [ ] Review structured data markup

## 🔗 Useful Resources

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/docs/documents.html)
- [Plausible Analytics Docs](https://plausible.io/docs)
- [Seznam.cz Webmaster](https://napoveda.seznam.cz/en/homepage/)

## 📧 Support

For questions about this SEO setup:
- Technical issues: `support@fredonbytes.eu`
- SEO consulting: Contact FredonBytes team

---

**Last Updated**: 2025-11-12
**Version**: 1.0.0
**Maintained by**: FredonBytes Team
