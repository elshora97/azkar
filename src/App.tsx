import { CloudOff, Loader2, Moon, RotateCcw, Settings2, Sun, Wifi, WifiOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LanguageMenu } from './components/LanguageMenu'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { NAV, Navigation } from './components/Navigation'
import { IosInstallBanner } from './components/IosInstall'
import { Misbaha } from './components/Misbaha'
import { PrayerTimes } from './components/PrayerTimes'
import { PwaToast } from './components/PwaToast'
import { ZikrCard } from './components/ZikrCard'
import type { CategoryId } from './data/api'
import { useAzkar } from './hooks/useAzkar'
import { ARABIC_ONLY } from './i18n'
import { useOnline } from './pwa/hooks'
import { useAudio } from './state/audio'
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
  const { track, stop } = useAudio()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { items, source } = useAzkar(prefs.category)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const online = useOnline()

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

  // The player lives inside the card, so leaving a card stops its recitation.
  useEffect(() => {
    if (track && track.key !== zikr?.key) stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zikr?.key])

  const goTo = (next: number) => {
    if (next < 0 || next >= items.length || next === index) return
    if (track) stop()
    setPage({ category: prefs.category, index: next, dir: next > index ? 1 : -1 })
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
  const iconBtn = 'grid size-10 place-items-center rounded-xl transition-colors hover:bg-emerald-900/5 active:scale-95 dark:hover:bg-gold-200/10'

  // Layout: a full-height column. Header, summary and card share the space above the
  // fixed tab bar, and long azkar scroll inside the card, so nothing overlaps on phones.
  return (
    <div className="flex h-dvh flex-col overflow-hidden text-emerald-950 dark:text-gold-50">
      <div className="backdrop" />

      <header className="relative z-30 shrink-0 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] lg:ps-32">
        <div className="glass mx-auto flex max-w-3xl items-center gap-2 rounded-2xl px-3 py-2 sm:gap-3">
          <img src="/pwa-192x192.png" alt="" width="44" height="44" className="size-11 shrink-0 drop-shadow-sm" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="font-display text-lg font-semibold">{t.appName}</p>
            <p className="flex items-center gap-1.5 truncate text-xs">
              <span className="opacity-60">{hijriDate(prefs.lang)}</span>
              {!online && (
                <span className="flex items-center gap-1 rounded-full bg-gold-400/20 px-1.5 py-0.5 text-[0.65rem] font-semibold text-gold-700 dark:text-gold-300">
                  <WifiOff className="size-3" /> {t.youAreOffline}
                </span>
              )}
            </p>
          </div>
          <button type="button" onClick={() => setPref('theme', prefs.theme === 'dark' ? 'light' : 'dark')} aria-label={t.theme} className={iconBtn}>
            {prefs.theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          {!ARABIC_ONLY && <LanguageMenu />}
          <button type="button" onClick={() => setSettingsOpen(true)} aria-label={t.settings} aria-haspopup="dialog" className={iconBtn}>
            <Settings2 className="size-5" />
          </button>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-3 pt-3 pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:pt-5 lg:ps-32 lg:pb-5">
        <PwaToast />
        <IosInstallBanner />

        {prefs.view === 'times' ? (
          <PrayerTimes />
        ) : prefs.view === 'misbaha' ? (
          <Misbaha />
        ) : (
          <>
        {/* Category summary */}
        <section key={prefs.category} className="mb-3 shrink-0 animate-rise px-1 sm:mb-5 sm:px-2">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-0.5 flex items-center gap-1.5 text-xs font-semibold text-gold-600 [@media(max-height:700px)]:hidden dark:text-gold-400">
                <CategoryIcon className="size-3.5 shrink-0" />
                <span className="truncate">{t.subtitles[prefs.category]}</span>
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t.categories[prefs.category]}</h1>
            </div>
            <div className="shrink-0 text-end">
              <p className="font-display text-2xl font-semibold tabular-nums sm:text-3xl">
                {completed}
                <span className="text-base opacity-50">/{items.length}</span>
              </p>
              <p className="text-xs opacity-60">{t.completed}</p>
            </div>
          </div>

          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-emerald-900/10 dark:bg-gold-200/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-gold-400 transition-[width] duration-500"
              style={{ width: `${items.length ? (completed / items.length) * 100 : 0}%` }}
            />
          </div>

          <div className="mt-1.5 flex min-h-8 items-center justify-between text-xs [@media(max-height:700px)]:mt-0.5">
            <span className="flex items-center gap-1.5 opacity-60 [@media(max-height:700px)]:invisible">
              <SourceIcon className={`size-3.5 ${source === 'loading' ? 'animate-spin' : ''}`} /> {sourceLabel}
            </span>
            {items.some((z) => counts[z.key]) && (
              <button
                type="button"
                onClick={() => resetMany(items.map((z) => z.key))}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 opacity-70 transition hover:bg-emerald-900/5 hover:opacity-100 dark:hover:bg-gold-200/10"
              >
                <RotateCcw className="size-3.5" /> {t.resetAll}
              </button>
            )}
          </div>

          {allDone && <p className="glass glass-done mt-2 animate-pop rounded-2xl px-4 py-2.5 text-center font-display text-sm">{t.allDone}</p>}
        </section>

        {/* The current zikr fills the remaining height */}
        {zikr && (
          <div
            key={zikr.key}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={`min-h-0 flex-1 ${page.dir * (rtl ? -1 : 1) > 0 ? 'animate-slide-next' : 'animate-slide-prev'}`}
          >
            <ZikrCard zikr={zikr} items={items} index={index} onComplete={() => advanceFrom(index)} onNavigate={goTo} />
          </div>
        )}
          </>
        )}
      </main>

      <Navigation />
      <LanguageSwitcher open={settingsOpen} onClose={() => setSettingsOpen(false)} audioUrls={items.flatMap((z) => (z.audio ? [z.audio] : []))} />
    </div>
  )
}
