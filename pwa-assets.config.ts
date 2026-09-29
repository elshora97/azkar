import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// Icons are generated from the transparent logo. Maskable and Apple icons need an
// opaque background; parchment keeps the green logo readable (it vanishes on dark green).
export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, padding: 0.32, resizeOptions: { background: '#f7f1e3' } },
    apple: { ...minimal2023Preset.apple, padding: 0.12, resizeOptions: { background: '#f7f1e3' } },
  },
  images: ['public/logo.png'],
})
