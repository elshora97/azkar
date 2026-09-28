// Cache names shared by the service worker and the page.
export const API_CACHE = 'azkar-api'
export const AUDIO_CACHE = 'azkar-audio'

/** Stores every recitation in `urls` for offline playback, reporting how many are saved. */
export async function saveAudio(urls: string[], onProgress: (saved: number) => void, signal?: AbortSignal) {
  const cache = await caches.open(AUDIO_CACHE)
  let saved = 0
  for (const url of urls) {
    if (signal?.aborted) break
    if (!(await cache.match(url))) {
      const res = await fetch(url, { mode: 'cors', credentials: 'omit', signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await cache.put(url, res)
    }
    onProgress(++saved)
  }
}

/** How many of `urls` are already cached. */
export async function countSavedAudio(urls: string[]) {
  if (typeof caches === 'undefined') return 0
  const cache = await caches.open(AUDIO_CACHE)
  const hits = await Promise.all(urls.map((u) => cache.match(u)))
  return hits.filter(Boolean).length
}
