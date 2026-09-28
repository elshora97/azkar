import { Check } from 'lucide-react'

interface Props {
  count: number
  target: number
  onTap: () => void
  label: string
}

const R = 26
const C = 2 * Math.PI * R

/** Radial tasbeeh counter: the gold ring fills as the count approaches the target. */
export function Counter({ count, target, onTap, label }: Props) {
  const done = count >= target
  const pct = Math.min(1, count / target)

  return (
    <button
      type="button"
      onClick={onTap}
      disabled={done}
      aria-label={`${label}: ${count} / ${target}`}
      className="group relative grid size-[68px] shrink-0 touch-manipulation place-items-center rounded-full transition-transform duration-150 select-none active:scale-90 disabled:active:scale-100"
    >
      <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={R} fill="none" strokeWidth="5" className="stroke-emerald-900/10 dark:stroke-gold-200/10" />
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct)}
          className="stroke-gold-500 transition-[stroke-dashoffset] duration-300 ease-out dark:stroke-gold-400"
        />
      </svg>
      <span
        className={`relative grid size-[46px] place-items-center rounded-full font-display text-lg font-semibold tabular-nums transition-colors ${
          done
            ? 'bg-gradient-to-br from-gold-300 to-gold-500 text-ink-900 shadow-[0_0_18px_rgba(217,180,95,0.6)]'
            : 'bg-emerald-800 text-gold-200 shadow-inner group-hover:bg-emerald-700 dark:bg-emerald-950/80 dark:ring-1 dark:ring-gold-400/30'
        }`}
      >
        {done ? <Check key="done" className="size-6 animate-pop" strokeWidth={3} /> : count}
      </span>
    </button>
  )
}
