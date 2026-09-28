import { BookHeart, Moon, Sparkles, Sunrise, Sunset, type LucideIcon } from 'lucide-react'
import type { CategoryId } from '../data/api'
import { usePrefs } from '../state/prefs'

export const NAV: { id: CategoryId; icon: LucideIcon }[] = [
  { id: 'morning', icon: Sunrise },
  { id: 'evening', icon: Sunset },
  { id: 'prayer', icon: Sparkles },
  { id: 'sleep', icon: Moon },
  { id: 'duas', icon: BookHeart },
]

/** Bottom tab bar on phones and tablets; a vertical rail on large screens. */
export function Navigation() {
  const { prefs, setPref, t } = usePrefs()

  return (
    <nav
      aria-label="Categories"
      className="glass fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-lg rounded-3xl px-1.5 py-1.5
        lg:inset-x-auto lg:start-4 lg:top-1/2 lg:bottom-auto lg:w-24 lg:-translate-y-1/2 lg:py-3"
    >
      <ul className="flex justify-between lg:flex-col lg:gap-1">
        {NAV.map(({ id, icon: Icon }) => {
          const active = prefs.category === id
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => {
                  setPref('category', id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                aria-current={active ? 'page' : undefined}
                className={`relative flex w-full touch-manipulation flex-col items-center gap-1 rounded-2xl px-1 py-2 transition-colors active:scale-95 ${
                  active
                    ? 'text-emerald-950 dark:text-gold-200'
                    : 'text-emerald-900/55 hover:text-emerald-900 dark:text-gold-100/45 dark:hover:text-gold-100/80'
                }`}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 animate-pop rounded-2xl bg-gradient-to-b from-gold-300/70 to-gold-400/40 dark:from-gold-400/20 dark:to-emerald-500/10" />
                )}
                <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                <span className="line-clamp-1 text-[0.68rem] font-medium tracking-wide">{t.categories[id]}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
