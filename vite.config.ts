import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'prompt',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // Only precache font subsets the app's five languages actually use.
        globIgnores: ['**/*-{cyrillic,cyrillic-ext,greek,vietnamese}-*.woff2', '**/logo.png'],
      },
      manifest: {
        name: 'Azkar · أذكار',
        short_name: 'Azkar',
        description: 'Daily azkar and duas with a tasbeeh counter, audio recitation and translations.',
        lang: 'ar',
        dir: 'rtl',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#04201b',
        theme_color: '#04201b',
        categories: ['lifestyle', 'books', 'education'],
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Morning azkar', url: '/?c=morning', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Evening azkar', url: '/?c=evening', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Sleep azkar', url: '/?c=sleep', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
        ],
      },
    }),
  ],
  server: { port: 3002, strictPort: true },
  preview: { port: 3002, strictPort: true },
})
