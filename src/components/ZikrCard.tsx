import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react'
import { forwardRef } from 'react'
import type { Zikr } from '../data/api'
import { useAudio } from '../state/audio'
import { usePrefs } from '../state/prefs'
import { AudioButton } from './AudioPlayer'
import { Counter } from './Counter'
import { ProgressStrip } from './ProgressStrip'

interface Props {
  zikr: Zikr
  items: Zikr[]
  index: number
  onComplete: () => void
  onNavigate: (index: number) => void
}

const vibrate = (pattern: number | number[]) => {
  if ('vibrate' in navigator) navigator.vibrate(pattern)
}

export const ZikrCard = forwardRef<HTMLElement, Props>(function ZikrCard({ zikr, items, index, onComplete, onNavigate }, ref) {
  const { prefs, t, rtl, counts, increment, resetOne } = usePrefs()
  const audio = useAudio()
  const count = counts[zikr.key] ?? 0
  const done = count >= zikr.target
  const playing = audio.track?.key === zikr.key
  const hasPrev = index > 0
  const hasNext = index < items.length - 1
  const Prev = rtl ? ChevronRight : ChevronLeft
  const Next = rtl ? ChevronLeft : ChevronRight

  const tap = () => {
    if (done) return
    if (count + 1 >= zikr.target) {
      vibrate([30, 60, 30])
      onComplete()
    } else {
      vibrate(12)
    }
    increment(zikr.key, zikr.target)
  }

  const translation =
    prefs.lang === 'en' || prefs.lang === 'ar' ? zikr.translation : (zikr.extra[prefs.lang] ?? zikr.translation)
  const usingFallback = prefs.lang !== 'en' && prefs.lang !== 'ar' && !zikr.extra[prefs.lang]
  const translationRtl = prefs.lang === 'ur' && !usingFallback

  const navBtn =
    'grid size-12 shrink-0 place-items-center rounded-2xl transition active:scale-90 disabled:pointer-events-none disabled:opacity-25 ' +
    'bg-emerald-900/5 text-emerald-900 hover:bg-emerald-900/10 dark:bg-gold-200/10 dark:text-gold-100 dark:hover:bg-gold-200/15'

  return (
    <article
      ref={ref}
      className={`glass relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.75rem] transition-[border-color,box-shadow] duration-500 ${done ? 'glass-done' : ''}`}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 px-4 pt-3.5 sm:px-6 sm:pt-5">
        <span className="rounded-full bg-emerald-900/5 px-2.5 py-1 font-display text-xs font-semibold tabular-nums text-emerald-900/80 dark:bg-gold-200/10 dark:text-gold-200/80">
          {index + 1} {t.of} {items.length}
        </span>
        <span className="rounded-full bg-emerald-900/5 px-2.5 py-1 text-xs font-medium tabular-nums text-emerald-900/80 dark:bg-gold-200/10 dark:text-gold-200/80">
          {t.times}
          {zikr.target}
        </span>
        {done && (
          <span className="flex animate-pop items-center gap-1 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-2.5 py-1 text-xs font-semibold text-ink-900">
            <Sparkles className="size-3" /> {t.done}
          </span>
        )}
        <div className="ms-auto">
          <AudioButton trackKey={zikr.key} src={zikr.audio} title={zikr.arabic.slice(0, 60)} />
        </div>
      </div>

      {/* Recitation progress, only while this card's audio is loaded */}
      <div className={`mx-4 mt-3 h-0.5 shrink-0 overflow-hidden rounded-full sm:mx-6 ${playing ? 'bg-gold-400/20' : ''}`}>
        {playing && <div className="h-full bg-gold-500 transition-[width] duration-200" style={{ width: `${audio.progress * 100}%` }} />}
      </div>

      {/* Body — scrolls inside the card for long azkar; tapping it also counts, like a tasbeeh. */}
      <div
        role="button"
        tabIndex={0}
        aria-label={t.tapToCount}
        onClick={tap}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            tap()
          }
        }}
        className={`fade-bottom flex min-h-0 flex-1 cursor-pointer flex-col overflow-y-auto overscroll-contain px-4 pt-3 pb-6 outline-none select-none focus-visible:bg-gold-400/5 sm:px-6 ${done ? 'opacity-80' : ''}`}
      >
        <div className="my-auto space-y-4">
          {prefs.showArabic && (
            <p dir="rtl" lang="ar" className="arabic text-center text-[1.45rem] text-emerald-950 sm:text-[1.75rem] dark:text-gold-50">
              {zikr.arabic}
            </p>
          )}
          {prefs.showTransliteration && zikr.transliteration && (
            <p dir="ltr" className="text-left font-display text-[0.95rem] leading-relaxed text-emerald-900/75 italic dark:text-emerald-100/70">
              {zikr.transliteration}
            </p>
          )}
          {prefs.showTranslation && prefs.lang !== 'ar' && (
            <div dir={translationRtl ? 'rtl' : 'ltr'} className={translationRtl ? 'text-right' : 'text-left'}>
              <p className={`text-[0.95rem] leading-relaxed text-emerald-950/85 dark:text-emerald-50/80 ${translationRtl ? 'urdu text-base' : ''}`}>
                {translation}
              </p>
              {usingFallback && <p className="mt-1 text-xs text-gold-600 dark:text-gold-400/80">{t.englishFallback}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Footer: previous · counter · next, then the position strip */}
      <div className="shrink-0 border-t border-emerald-900/10 px-3 pt-3 pb-2.5 sm:px-5 dark:border-gold-200/10">
        <div className="flex items-center justify-between gap-2">
          <button type="button" className={navBtn} disabled={!hasPrev} onClick={() => onNavigate(index - 1)} aria-label={t.previous}>
            <Prev className="size-5" />
          </button>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
            <div className="w-12 text-end text-xs tabular-nums opacity-60">
              {count}/{zikr.target}
            </div>
            <Counter count={count} target={zikr.target} onTap={tap} label={t.tapToCount} />
            <div className="w-12">
              {count > 0 && (
                <button
                  type="button"
                  onClick={() => resetOne(zikr.key)}
                  aria-label={t.reset}
                  className="grid size-9 place-items-center rounded-full opacity-60 transition hover:bg-emerald-900/5 hover:opacity-100 dark:hover:bg-gold-200/10"
                >
                  <RotateCcw className="size-4" />
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            className={`${navBtn} ${hasNext ? '!bg-emerald-800 !text-gold-200 dark:!bg-gold-400 dark:!text-ink-900' : ''}`}
            disabled={!hasNext}
            onClick={() => onNavigate(index + 1)}
            aria-label={t.next}
          >
            <Next className="size-5" />
          </button>
        </div>
        <ProgressStrip items={items} index={index} onChange={onNavigate} />
      </div>
    </article>
  )
})
