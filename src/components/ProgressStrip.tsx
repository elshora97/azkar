import { useEffect, useRef } from 'react'
import type { Zikr } from '../data/api'
import { usePrefs } from '../state/prefs'

/** One segment per zikr: gold when done, highlighted when current. Tap a segment to jump to it. */
export function ProgressStrip({ items, index, onChange }: { items: Zikr[]; index: number; onChange: (i: number) => void }) {
  const { counts } = usePrefs()
  const ref = useRef<HTMLDivElement>(null)

  // Keep the current segment visible when the strip overflows.
  useEffect(() => {
    ref.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index])

  return (
    <div ref={ref} className="no-scrollbar mt-2.5 flex gap-1 overflow-x-auto px-1 py-1">
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
  )
}
