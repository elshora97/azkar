import { CloudOff, Settings2, WifiOff, Loader2, Moon, RotateCcw, Sun, Wifi } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NowPlaying } from './components/AudioPlayer'
import { LanguageMenu } from './components/LanguageMenu'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { Logo } from './components/Logo'
import { NAV, Navigation } from './components/Navigation'
import { Pager } from './components/Pager'
import { PwaToast } from './components/PwaToast'
import { useOnline } from './pwa/hooks'
import { ZikrCard } from './components/ZikrCard'
import type { CategoryId } from './data/api'
import { useAzkar } from './hooks/useAzkar'
import { usePrefs } from './state/prefs'

function hijriDate(lang: string) {
  try {
    return new Intl.DateTimeFormat(`${lang}-u-ca-islamic-umalqura`, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  } catch {
    return ''
  }
}

export default function App() {
  const { prefs, setPref, t, rtl, counts, resetMany } = usePrefs()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { items, source } = useAzkar(prefs.category)
  const cardRef = useRef<HTMLElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const online = useOnline()

  const isDone = (i: number) => (counts[items[i]?.key] ?? 0) >= (items[i]?.target ?? 1)
  const completed = items.filter((z) => (counts[z.key] ?? 0) >= z.target).length
  const allDone = items.length > 0 && completed === items.length
  const CategoryIcon = NAV.find((n) => n.id === prefs.category)!.icon

  // One card at a time. Opening a category lands on its first unfinished item.
  const firstOpen = () => Math.max(0, items.findIndex((z) => (counts[z.key] ?? 0) < z.target))
  const [page, setPage] = useState<{ category: CategoryId; index: number; dir: 1 | -1 }>(() => ({
    category: prefs.category,
    index: firstOpen(),
    dir: 1,
  }))
  if (page.category !== prefs.category) setPage({ category: prefs.category, index: firstOpen(), dir: 1 })
  const index = Math.min(page.index, Math.max(0, items.length - 1))
  const zikr = items[index]

  const goTo = (next: number) => {
    if (next < 0 || next >= items.length || next === index) return
    setPage({ category: prefs.category, index: next, dir: next > index ? 1 : -1 })
    const top = cardRef.current?.getBoundingClientRect().top ?? 0
    if (top < 80) window.scrollTo({ top: window.scrollY + top - 96, behavior: 'smooth' })
  }

  const advanceFrom = (i: number) => {
    const next = items.findIndex((z, j) => j > i && (counts[z.key] ?? 0) < z.target)
    if (next !== -1) setTimeout(() => goTo(next), 650)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (settingsOpen || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return
      const forward = (e.key === 'ArrowRight') !== rtl
      goTo(index + (forward ? 1 : -1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const dx = e.changedTouches[0].clientX - start.x
    const dy = e.changedTouches[0].clientY - start.y
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return
    const forward = dx < 0 !== rtl
    goTo(index + (forward ? 1 : -1))
  }

  const SourceIcon = source === 'loading' ? Loader2 : source === 'live' ? Wifi : CloudOff
  const sourceLabel = source === 'loading' ? '…' : source === 'live' ? t.live : source === 'cache' ? t.cached : t.offlineCopy

  return (
    <div className="min-h-dvh text-emerald-950 dark:text-gold-50">
      <div className="backdrop" />

      {/* Top bar */}
      <header className="sticky top-0 z-30 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] lg:ps-32">
        <div className="glass mx-auto flex max-w-3xl items-center gap-2 rounded-2xl px-3 py-2 sm:gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-900 text-gold-300 shadow-inner dark:bg-gold-400/15">
            <Logo className="size-8" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold">{t.appName}</span>
              {prefs.lang !== 'ar' && (
                <span dir="rtl" className="arabic text-lg leading-none text-gold-600 dark:text-gold-400">
                  أذكار
                </span>
              )}
            </p>
            <p className="flex items-center gap-1.5 truncate text-xs">
              <span className="opacity-60">{hijriDate(prefs.lang)}</span>
              {!online && (
                <span className="flex items-center gap-1 rounded-full bg-gold-400/20 px-1.5 py-0.5 text-[0.65rem] font-semibold text-gold-700 dark:text-gold-300">
                  <WifiOff className="size-3" /> {t.youAreOffline}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPref('theme', prefs.theme === 'dark' ? 'light' : 'dark')}
            aria-label={t.theme}
            className="grid size-10 place-items-center rounded-xl transition-colors hover:bg-emerald-900/5 active:scale-95 dark:hover:bg-gold-200/10"
          >
            {prefs.theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <LanguageMenu />
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label={t.settings}
            aria-haspopup="dialog"
            className="grid size-10 place-items-center rounded-xl transition-colors hover:bg-emerald-900/5 active:scale-95 dark:hover:bg-gold-200/10"
          >
            <Settings2 className="size-5" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-3 pt-6 pb-40 lg:ps-32 lg:pb-16 xl:max-w-4xl">
        {/* Category hero */}
        <section key={prefs.category} className="mb-6 animate-rise px-1 sm:px-2">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-1 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase dark:text-gold-400">
                <CategoryIcon className="size-4" /> {t.subtitles[prefs.category]}
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t.categories[prefs.category]}</h1>
            </div>
            <div className="text-end">
              <p className="font-display text-3xl font-semibold tabular-nums">
                {completed}
                <span className="text-lg opacity-50">/{items.length}</span>
              </p>
              <p className="text-xs opacity-60">{t.completed}</p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-900/10 dark:bg-gold-200/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-gold-400 transition-[width] duration-500"
              style={{ width: `${items.length ? (completed / items.length) * 100 : 0}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 opacity-60">
              <SourceIcon className={`size-3.5 ${source === 'loading' ? 'animate-spin' : ''}`} /> {sourceLabel}
            </span>
            {completed > 0 || items.some((z) => counts[z.key]) ? (
              <button
                type="button"
                onClick={() => resetMany(items.map((z) => z.key))}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 opacity-70 transition hover:bg-emerald-900/5 hover:opacity-100 dark:hover:bg-gold-200/10"
              >
                <RotateCcw className="size-3.5" /> {t.resetAll}
              </button>
            ) : null}
          </div>

          {allDone && (
            <p className="glass glass-done mt-4 animate-pop rounded-2xl px-4 py-3 text-center font-display text-base">{t.allDone}</p>
          )}
        </section>

        {/* Single-card view: swipe, arrow keys or the pager move between azkar */}
        {zikr && (
          <div className="space-y-3" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div
              key={zikr.key}
              className={page.dir * (rtl ? -1 : 1) > 0 ? 'animate-slide-next' : 'animate-slide-prev'}
            >
              <ZikrCard ref={cardRef} zikr={zikr} index={index} onComplete={() => advanceFrom(index)} />
            </div>
            <div className="sticky bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-20 lg:bottom-4">
              <Pager items={items} index={index} onChange={goTo} />
            </div>
            {isDone(index) && index < items.length - 1 && (
              <p className="text-center text-xs opacity-50">{t.swipeHint}</p>
            )}
          </div>
        )}

        <p className="mt-10 text-center text-xs opacity-50">
          Source: Hisn al-Muslim (hisnmuslim.com) · {t.resetsDaily}
        </p>
      </main>

      <NowPlaying />
      <Navigation />
      <LanguageSwitcher
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        audioUrls={items.flatMap((z) => (z.audio ? [z.audio] : []))}
      />
      <PwaToast />
    </div>
  )
}
