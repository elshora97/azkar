import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Zikr } from '../data/api'
import { usePrefs } from '../state/prefs'

interface Props {
  items: Zikr[]
  index: number
  onChange: (index: number) => void
}

/** Prev/next controls plus a strip of segments, one per zikr, marking done and current items. */
export function Pager({ items, index, onChange }: Props) {
  const { t, rtl, counts } = usePrefs()
  const stripRef = useRef<HTMLDivElement>(null)
  const Prev = rtl ? ChevronRight : ChevronLeft
  const Next = rtl ? ChevronLeft : ChevronRight

  // Keep the current segment visible when the strip overflows.
  useEffect(() => {
    stripRef.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index])

  const btn =
    'grid size-12 shrink-0 place-items-center rounded-2xl transition active:scale-90 disabled:opacity-30 disabled:active:scale-100 ' +
    'bg-emerald-900/5 hover:bg-emerald-900/10 dark:bg-gold-200/10 dark:hover:bg-gold-200/15'

  return (
    <div className="glass flex items-center gap-2 rounded-3xl p-2">
      <button type="button" className={btn} disabled={index === 0} onClick={() => onChange(index - 1)} aria-label={t.previous}>
        <Prev className="size-5" />
      </button>

      <div className="min-w-0 flex-1 text-center">
        <p className="font-display text-sm font-semibold tabular-nums">
          {index + 1} <span className="opacity-50">/ {items.length}</span>
        </p>
        <div ref={stripRef} className="no-scrollbar mt-1.5 flex gap-1 overflow-x-auto px-1 py-1">
          {items.map((z, i) => {
            const done = (counts[z.key] ?? 0) >= z.target
            return (
              <button
                key={z.key}
                type="button"
                onClick={() => onChange(i)}
                aria-label={`${i + 1}`}
                aria-current={i === index ? 'step' : undefined}
                className={`h-1.5 min-w-3 flex-1 rounded-full transition-all ${
                  i === index
                    ? 'min-w-6 bg-emerald-700 ring-2 ring-gold-400/60 dark:bg-gold-300'
                    : done
                      ? 'bg-gold-400 dark:bg-gold-500/80'
                      : 'bg-emerald-900/15 dark:bg-gold-200/15'
                }`}
              />
            )
          })}
        </div>
      </div>

      <button
        type="button"
        className={`${btn} ${index < items.length - 1 ? '!bg-emerald-800 !text-gold-200 dark:!bg-gold-400 dark:!text-ink-900' : ''}`}
        disabled={index >= items.length - 1}
        onClick={() => onChange(index + 1)}
        aria-label={t.next}
      >
        <Next className="size-5" />
      </button>
    </div>
  )
}
