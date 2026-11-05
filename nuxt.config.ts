import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4110/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://linesight.io',
      adminUrl: process.env.NUXT_PUBLIC_ADMIN_URL || 'http://localhost:3210',
    },
  },
  app: {
    head: {
      title: 'LineSight — pipeline integrity, without the black hole',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#07100e' },
        { name: 'description', content: 'LineSight unifies pipeline inspection, pigging, utility diagnostics, marketplace procurement and contractor workflows in one platform.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preload', href: '/fonts/clash-display-600.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/satoshi-400.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  routeRules: {
    '/app/**': { ssr: false },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'LineSight — Pipeline Intelligence',
      short_name: 'LineSight',
      description: 'Pipeline diagnostics, integrity reports and utility workflows.',
      theme_color: '#07100e',
      background_color: '#f1ede2',
      display: 'standalone',
      start_url: '/',
      icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }],
    },
    workbox: { navigateFallback: '/', globPatterns: ['**/*.{js,css,html,svg,png,woff2}'], runtimeCaching: [{ urlPattern: /\/images\/.*/, handler: 'CacheFirst', options: { cacheName: 'linesight-images', expiration: { maxEntries: 80, maxAgeSeconds: 2592000 } } }] },
    devOptions: { enabled: false },
  },
  nitro: { compressPublicAssets: true },
  typescript: { strict: true, typeCheck: false },
})
