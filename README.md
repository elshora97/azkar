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
