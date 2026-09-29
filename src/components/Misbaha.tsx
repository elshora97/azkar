import { RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'

// Arabic-only for now (see ARABIC_ONLY in i18n.ts), so labels live here.
const PHRASES = ['سُبْحَانَ اللَّهِ', 'الْحَمْدُ لِلَّهِ', 'اللَّهُ أَكْبَرُ', 'لَا إِلَهَ إِلَّا اللَّهُ', 'أَسْتَغْفِرُ اللَّهَ', 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ']
const TARGETS = [33, 99, 100, 0] as const // 0 = open count
const BEADS = 33
const KEY = 'azkar:misbaha'

interface State {
  phrase: number
  target: (typeof TARGETS)[number]
  count: number
  rounds: number
  /** Taps today across all phrases; resets with the date. */
  today: { date: string; total: number }
}

const todayStr = () => new Date().toLocaleDateString('en-CA')
const ar = (n: number) => n.toLocaleString('ar-EG')

function load(): State {
  const fresh: State = { phrase: 0, target: 33, count: 0, rounds: 0, today: { date: todayStr(), total: 0 } }
  try {
    const s = { ...fresh, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') } as State
    return s.today.date === todayStr() ? s : { ...s, today: fresh.today }
  } catch {
    return fresh
  }
}

const vibrate = (p: number | number[]) => 'vibrate' in navigator && navigator.vibrate(p)

// Bead ring geometry (SVG units). One slot at the bottom is left for the imam bead.
const CX = 150
const CY = 142
const R = 112
const beadPos = (i: number) => {
  const a = ((90 + ((i + 1) * 360) / (BEADS + 1)) * Math.PI) / 180
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
}

/** Electronic misbaha: a string of 33 beads that light up in turn as you tap. */
export function Misbaha() {
  const [s, setS] = useState<State>(load)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s))
    } catch {
      // Storage blocked: the count just won't survive a reload.
    }
  }, [s])

  const tap = () => {
    setS((p) => {
      const today = p.today.date === todayStr() ? p.today : { date: todayStr(), total: 0 }
      const count = p.target && p.count >= p.target ? 1 : p.count + 1
      const done = p.target > 0 && count === p.target
      vibrate(done ? [40, 60, 40] : count % BEADS === 0 ? 25 : 10)
      return { ...p, count, rounds: done ? p.rounds + 1 : p.rounds, today: { ...today, total: today.total + 1 } }
    })
    setPulse((n) => n + 1)
  }

  const set = (patch: Partial<State>) => setS((p) => ({ ...p, ...patch, count: 0 }))
  const done = s.target > 0 && s.count >= s.target
  // Beads show progress within the current loop of 33.
  const lit = done ? BEADS : s.count % BEADS === 0 && s.count > 0 ? BEADS : s.count % BEADS
  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-3 py-1.5 text-sm transition active:scale-95 ${
      active ? 'bg-emerald-800 text-gold-200 dark:bg-gold-400 dark:text-ink-900' : 'bg-emerald-900/5 dark:bg-gold-200/10'
    }`

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      {/* Dhikr phrase */}
      <div className="no-scrollbar -mx-3 flex shrink-0 gap-2 overflow-x-auto px-3">
        {PHRASES.map((p, i) => (
          <button key={p} type="button" onClick={() => set({ phrase: i, rounds: 0 })} className={`${chip(s.phrase === i)} arabic leading-normal`}>
            {p}
          </button>
        ))}
      </div>

      <section className={`glass flex min-h-0 flex-1 flex-col items-center rounded-[1.75rem] p-3 ${done ? 'glass-done' : ''}`}>
        <p className="arabic shrink-0 text-center text-2xl text-emerald-950 dark:text-gold-50">{PHRASES[s.phrase]}</p>

        {/* The beads — tap anywhere on them to count */}
        <button
          type="button"
          onClick={tap}
          aria-label={`عدّ: ${s.count}`}
          className="relative min-h-0 w-full flex-1 touch-manipulation select-none active:scale-[0.99]"
        >
          <svg viewBox="0 0 300 330" className="size-full" aria-hidden>
            <defs>
              <radialGradient id="bead-lit" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#fdf3d0" />
                <stop offset="45%" stopColor="#d9b45f" />
                <stop offset="100%" stopColor="#8a6420" />
              </radialGradient>
              <radialGradient id="bead-dim" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#5fbf9f" />
                <stop offset="50%" stopColor="#0d5c4a" />
                <stop offset="100%" stopColor="#032a22" />
              </radialGradient>
            </defs>

            {/* String */}
            <circle cx={CX} cy={CY} r={R} fill="none" strokeWidth="1.5" className="stroke-gold-600/50" />

            {/* Tassel under the imam bead */}
            <g className="stroke-gold-500" strokeWidth="1.6" strokeLinecap="round">
              {[-10, -5, 0, 5, 10].map((dx) => (
                <path key={dx} d={`M150 ${CY + R + 30} Q${150 + dx * 0.4} ${CY + R + 55} ${150 + dx} ${CY + R + 78}`} fill="none" />
              ))}
            </g>
            <rect x="143" y={CY + R + 24} width="14" height="10" rx="3" fill="url(#bead-lit)" />
            {/* Imam bead */}
            <ellipse cx="150" cy={CY + R + 8} rx="11" ry="16" fill="url(#bead-lit)" />

            {Array.from({ length: BEADS }, (_, i) => {
              const { x, y } = beadPos(i)
              const on = i < lit
              const current = i === lit - 1
              return (
                <circle
                  key={current ? `c-${pulse}` : i}
                  cx={x}
                  cy={y}
                  r={current ? 10.5 : 9.5}
                  fill={on ? 'url(#bead-lit)' : 'url(#bead-dim)'}
                  className={current ? 'animate-pop' : ''}
                  style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}
                />
              )
            })}

            {/* Count in the middle */}
            <text x={CX} y={CY + 6} textAnchor="middle" className="fill-current font-display text-[56px] font-semibold">
              {ar(s.count)}
            </text>
            <text x={CX} y={CY + 36} textAnchor="middle" className="fill-current text-[14px] opacity-60">
              {s.target ? `من ${ar(s.target)}` : 'عدّ مفتوح'}
            </text>
          </svg>
        </button>

        <p className="shrink-0 text-sm opacity-70">{done ? 'أتممت العدد — اضغط للبدء من جديد' : 'اضغط على المسبحة للتسبيح'}</p>
      </section>

      {/* Target, stats, reset */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
          {TARGETS.map((t) => (
            <button key={t} type="button" onClick={() => set({ target: t, rounds: 0 })} className={chip(s.target === t)}>
              {t ? ar(t) : '∞'}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => set({ rounds: 0 })}
          aria-label="إعادة العدّ"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-900/5 active:scale-95 dark:bg-gold-200/10"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>
      <p className="shrink-0 text-center text-xs opacity-60">
        الدورات: {ar(s.rounds)} · مجموع اليوم: {ar(s.today.total)}
      </p>
    </div>
  )
}
