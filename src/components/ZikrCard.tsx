import { RotateCcw, Sparkles } from 'lucide-react'
import { forwardRef } from 'react'
import type { Zikr } from '../data/api'
import { usePrefs } from '../state/prefs'
import { AudioButton } from './AudioPlayer'
import { Counter } from './Counter'

interface Props {
  zikr: Zikr
  index: number
  onComplete: () => void
}

const vibrate = (pattern: number | number[]) => {
  if ('vibrate' in navigator) navigator.vibrate(pattern)
}

export const ZikrCard = forwardRef<HTMLElement, Props>(function ZikrCard({ zikr, index, onComplete }, ref) {
  const { prefs, t, counts, increment, resetOne } = usePrefs()
  const count = counts[zikr.key] ?? 0
  const done = count >= zikr.target

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

  return (
    <article
      ref={ref}
      className={`glass relative overflow-hidden rounded-[1.75rem] transition-[border-color,box-shadow] duration-500 ${done ? 'glass-done' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 sm:px-6 sm:pt-5">
        <span className="relative grid size-9 shrink-0 place-items-center font-display text-sm font-semibold text-emerald-900 dark:text-gold-300">
          <svg viewBox="0 0 40 40" className="absolute inset-0" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.55">
              <rect x="9" y="9" width="22" height="22" />
              <rect x="9" y="9" width="22" height="22" transform="rotate(45 20 20)" />
            </g>
          </svg>
          <span className="relative">{index + 1}</span>
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

      {/* Body — tapping anywhere here also counts, like a tasbeeh. */}
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
        className={`cursor-pointer space-y-4 px-4 py-4 outline-none select-none focus-visible:bg-gold-400/5 sm:px-6 ${done ? 'opacity-80' : ''}`}
      >
        {prefs.showArabic && (
          <p dir="rtl" lang="ar" className="arabic text-[1.45rem] text-emerald-950 sm:text-[1.7rem] dark:text-gold-50">
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
            <p
              className={`text-[0.95rem] leading-relaxed text-emerald-950/85 dark:text-emerald-50/80 ${translationRtl ? 'urdu text-base' : ''}`}
            >
              {translation}
            </p>
            {usingFallback && <p className="mt-1 text-xs text-gold-600 dark:text-gold-400/80">{t.englishFallback}</p>}
          </div>
        )}
      </div>

      {/* Footer: linear progress, reset, radial counter */}
      <div className="flex items-center gap-3 border-t border-emerald-900/10 px-4 py-3 sm:px-6 dark:border-gold-200/10">
        <div className="flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-emerald-900/10 dark:bg-gold-200/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-gold-400 transition-[width] duration-300 ease-out"
              style={{ width: `${(count / zikr.target) * 100}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs text-emerald-900/60 tabular-nums dark:text-gold-200/60">
            <span>
              {count} / {zikr.target}
            </span>
            {count > 0 && (
              <button
                type="button"
                onClick={() => resetOne(zikr.key)}
                className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-emerald-900/5 hover:text-emerald-900 dark:hover:bg-gold-200/10 dark:hover:text-gold-200"
              >
                <RotateCcw className="size-3" /> {t.reset}
              </button>
            )}
          </div>
        </div>
        <Counter count={count} target={zikr.target} onTap={tap} label={t.tapToCount} />
      </div>
    </article>
  )
})
