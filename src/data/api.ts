import { CHAPTERS } from './chapters.js'
import fallback from './fallback.json'
import { EVENING } from './evening'
import { TRANSLATIONS, type ExtraLang } from './translations'

export type CategoryId = keyof typeof CHAPTERS

export interface Zikr {
  /** Unique per category, used for progress keys, e.g. `evening:78`. */
  key: string
  id: number
  chapter: string
  arabic: string
  transliteration: string
  translation: string
  extra: Partial<Record<ExtraLang, string>>
  target: number
  audio: string | null
}

export type Source = 'live' | 'cache' | 'offline'

interface RawItem {
  ID: number
  ARABIC_TEXT: string
  LANGUAGE_ARABIC_TRANSLATED_TEXT: string
  TRANSLATED_TEXT: string
  REPEAT: number
  AUDIO: string
}
interface RawChapter {
  title: string
  items: RawItem[]
}

const API = 'https://www.hisnmuslim.com/api/en'
const CACHE_PREFIX = 'azkar:cache:'
const TIMEOUT_MS = 7000

/** Strips the `((…))` quote markers and a single wrapping pair of parentheses. */
function tidy(text: string): string {
  let s = text.replace(/\(\(|\)\)/g, '').replace(/\s+/g, ' ').trim()
  if (s.startsWith('(') && s.endsWith(')')) {
    const inner = s.slice(1, -1)
    const opens = (inner.match(/\(/g) ?? []).length
    const closes = (inner.match(/\)/g) ?? []).length
    if (opens === closes) s = inner.trim()
  }
  // The API drops the ﷺ glyph after "Prophet", leaving a double space.
  return s.replace(/^\.\s*/, '').replace(/Prophet(?=\s{2})/g, 'Prophet ﷺ').replace(/\s{2,}/g, ' ')
}

async function fetchChapter(id: number, signal: AbortSignal): Promise<RawChapter> {
  const res = await fetch(`${API}/${id}.json`, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = JSON.parse((await res.text()).replace(/^﻿/, '')) as Record<string, RawItem[]>
  const [title] = Object.keys(json)
  if (!title || !Array.isArray(json[title])) throw new Error('Unexpected response shape')
  return { title, items: json[title] }
}

function readCache(id: number): RawChapter | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + id)
    return raw ? (JSON.parse(raw) as RawChapter) : null
  } catch {
    return null
  }
}

function writeCache(id: number, chapter: RawChapter) {
  try {
    localStorage.setItem(CACHE_PREFIX + id, JSON.stringify(chapter))
  } catch {
    // Storage full or blocked: the bundled snapshot still covers us.
  }
}

function normalize(category: CategoryId, chapter: RawChapter): Zikr[] {
  return chapter.items.map((item) => {
    const evening = category === 'evening' ? EVENING[item.ID] : undefined
    const extra = (evening && TRANSLATIONS[`${item.ID}:evening`]) || TRANSLATIONS[item.ID] || {}
    return {
      key: `${category}:${item.ID}`,
      id: item.ID,
      chapter: chapter.title,
      arabic: evening?.arabic ?? tidy(item.ARABIC_TEXT),
      transliteration: evening?.transliteration ?? tidy(item.LANGUAGE_ARABIC_TRANSLATED_TEXT),
      translation: evening?.translation ?? tidy(item.TRANSLATED_TEXT),
      extra: evening && !TRANSLATIONS[`${item.ID}:evening`] ? {} : extra,
      target: Math.max(1, Number(item.REPEAT) || 1),
      // Recordings are named by item ID; the API mislinks a few (e.g. item 72 → 73.mp3).
      audio: evening || !item.AUDIO ? null : `https://www.hisnmuslim.com/audio/ar/${item.ID}.mp3`,
    }
  })
}

/**
 * Loads a category from the Hisn Muslim API, falling back to the last cached
 * response and then to the bundled snapshot so the app always has content.
 */
export async function loadCategory(category: CategoryId, signal?: AbortSignal): Promise<{ items: Zikr[]; source: Source }> {
  const ids = CHAPTERS[category]
  const timeout = AbortSignal.timeout(TIMEOUT_MS)
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout

  let source: Source = 'live'
  const chapters = await Promise.all(
    ids.map(async (id) => {
      try {
        const chapter = await fetchChapter(id, combined)
        writeCache(id, chapter)
        return chapter
      } catch (err) {
        if (signal?.aborted) throw err
        const cached = readCache(id)
        if (cached) {
          if (source === 'live') source = 'cache'
          return cached
        }
        source = 'offline'
        return (fallback as Record<string, RawChapter>)[id]
      }
    }),
  )

  return { items: chapters.flatMap((c) => normalize(category, c)), source }
}

/** Synchronous snapshot data used for the very first render, before the network responds. */
export function snapshotCategory(category: CategoryId): Zikr[] {
  return CHAPTERS[category].flatMap((id) => normalize(category, (fallback as Record<string, RawChapter>)[id]))
}
