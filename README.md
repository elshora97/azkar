# Azkar · أذكار

A mobile-first azkar and dua app built with React 19, Vite and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3002
npm run build
```

## Features

- **Categories:** morning, evening, after prayer, sleep, and daily duas, with a bottom tab bar on phones and a side rail on desktop.
- **Tasbeeh counter:** a radial ring and a progress bar per card. Tapping the card also counts. Phones that support it vibrate on each tap and give a stronger pattern when the target is reached. The page then scrolls to the next unfinished item. Counters reset each calendar day.
- **Audio:** recitations from hisnmuslim.com play through a single shared player, with a "now playing" bar and visualizer.
- **Languages:** English, Arabic, French, Bahasa Indonesia and Urdu. Arabic and Urdu switch the layout to right-to-left. You can show or hide the Arabic text, transliteration and translation.
- **Themes:** light and dark, using glass cards over an eight-point-star pattern.

## Offline / PWA

The app is an installable PWA with a Workbox service worker ([src/sw.ts](src/sw.ts), built by `vite-plugin-pwa` in `injectManifest` mode). Service workers only run in the production build, so test offline behaviour with:

```bash
npm run build && npm run preview   # http://localhost:3002
```

What gets cached:

| What | How |
| --- | --- |
| App shell, bundled data snapshot, icons | Saved when the app installs, so every screen opens offline |
| Fonts (Amiri, Fraunces, Instrument Sans, Noto Nastaliq Urdu) | Self-hosted with `@fontsource` and saved at install; only the Latin and Arabic subsets |
| Hisn al-Muslim API | Tries the network first; after 5 s it uses the cached copy (the page also keeps its own copy in `localStorage`) |
| Recitations | Saved when played or via **Settings → Offline → Download**. The service worker stores the full MP3 and serves the byte ranges the audio player asks for from that copy |

Also included: an update prompt when a new version is deployed, a "Ready to work offline" notice, an offline badge in the header, an install button (on browsers that support it), and home-screen shortcuts to Morning, Evening and Sleep (`/?c=<category>`).

Icons are generated from `public/favicon.svg` with `npx pwa-assets-generator` (see `pwa-assets.config.ts`).

## Data

Content comes from the [Hisn al-Muslim API](https://www.hisnmuslim.com/api/en/husn_en.json), which provides Arabic, transliteration, English and MP3 audio.

- `src/data/chapters.js` maps each category to its API chapter IDs.
- `src/data/api.ts` fetches the data (7 s timeout) and caches each chapter in `localStorage`. If the network fails, it uses the bundled snapshot `src/data/fallback.json`, so the app also works offline.
- `src/data/evening.ts` holds the evening wording. The API combines morning and evening into one chapter written in the morning wording, so the evening list needs its own text. The morning recordings don't match this wording, so these items have no audio.
- `src/data/translations.ts` holds French, Indonesian and Urdu meanings for the most-recited items. The API has no translations in these languages, so every other item falls back to English with a note.

To refresh the snapshot, run `node scripts/snapshot.mjs`.

## Structure

```
src/
  components/  Counter, ZikrCard, AudioPlayer (button + NowPlaying), LanguageSwitcher (settings sheet), Navigation
  state/       prefs.tsx (theme, language, toggles, daily progress → localStorage), audio.tsx (shared player)
  hooks/       useAzkar (snapshot first, then live data)
  data/        API client, snapshot, evening overrides, translations
  i18n.ts      UI strings for all five languages
```
