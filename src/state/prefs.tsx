import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CategoryId } from '../data/api'
import { ARABIC_ONLY, LANGS, STRINGS, type Lang } from '../i18n'

export interface Prefs {
  theme: 'light' | 'dark'
  lang: Lang
  showArabic: boolean
  showTransliteration: boolean
  showTranslation: boolean
  category: CategoryId
}

const PREFS_KEY = 'azkar:prefs'
const PROGRESS_KEY = 'azkar:progress'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode or quota: preferences simply won't persist.
  }
}

/** Category requested by a home-screen shortcut, e.g. /?c=evening. */
function requestedCategory(): CategoryId | null {
  const c = new URLSearchParams(location.search).get('c')
  return c && ['morning', 'evening', 'prayer', 'sleep', 'duas'].includes(c) ? (c as CategoryId) : null
}

function defaultCategory(): CategoryId {
  const h = new Date().getHours()
  return h >= 4 && h < 12 ? 'morning' : h >= 15 && h < 21 ? 'evening' : h >= 21 || h < 4 ? 'sleep' : 'duas'
}

const today = () => new Date().toLocaleDateString('en-CA')

interface Progress {
  date: string
  counts: Record<string, number>
}

interface Ctx {
  prefs: Prefs
  setPref: <K extends keyof Prefs>(key: K, value: Prefs[K]) => void
  t: (typeof STRINGS)[Lang]
  rtl: boolean
  counts: Record<string, number>
  increment: (key: string, target: number) => void
  resetOne: (key: string) => void
  resetMany: (keys: string[]) => void
}

const PrefsContext = createContext<Ctx | null>(null)

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(() => {
    const saved = load<Prefs>(PREFS_KEY, {
      theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      lang: 'ar',
      showArabic: true,
      showTransliteration: true,
      showTranslation: true,
      category: defaultCategory(),
    })
    const requested = requestedCategory()
    if (requested) history.replaceState(null, '', location.pathname)
    const prefs = requested ? { ...saved, category: requested } : saved
    return ARABIC_ONLY ? { ...prefs, lang: 'ar', showArabic: true, showTransliteration: false, showTranslation: false } : prefs
  })

  // Progress is scoped to a calendar day: a new day starts with fresh counters.
  const [progress, setProgress] = useState<Progress>(() => {
    const p = load<Progress>(PROGRESS_KEY, { date: today(), counts: {} })
    return p.date === today() ? p : { date: today(), counts: {} }
  })

  useEffect(() => save(PREFS_KEY, prefs), [prefs])
  useEffect(() => save(PROGRESS_KEY, progress), [progress])

  const rtl = LANGS.find((l) => l.id === prefs.lang)!.rtl

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', prefs.theme === 'dark')
    root.lang = prefs.lang
    root.dir = rtl ? 'rtl' : 'ltr'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', prefs.theme === 'dark' ? '#04201b' : '#f4ecd9')
  }, [prefs.theme, prefs.lang, rtl])

  const setPref = useCallback<Ctx['setPref']>((key, value) => setPrefs((p) => ({ ...p, [key]: value })), [])

  const increment = useCallback((key: string, target: number) => {
    setProgress((p) => {
      const base = p.date === today() ? p : { date: today(), counts: {} }
      const next = Math.min(target, (base.counts[key] ?? 0) + 1)
      return { ...base, counts: { ...base.counts, [key]: next } }
    })
  }, [])

  const resetMany = useCallback((keys: string[]) => {
    setProgress((p) => {
      const counts = { ...p.counts }
      keys.forEach((k) => delete counts[k])
      return { ...p, counts }
    })
  }, [])
  const resetOne = useCallback((key: string) => resetMany([key]), [resetMany])

  const value = useMemo<Ctx>(
    () => ({ prefs, setPref, t: STRINGS[prefs.lang], rtl, counts: progress.counts, increment, resetOne, resetMany }),
    [prefs, setPref, rtl, progress.counts, increment, resetOne, resetMany],
  )

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePrefs() {
  const ctx = useContext(PrefsContext)
  if (!ctx) throw new Error('usePrefs must be used inside <PrefsProvider>')
  return ctx
}
