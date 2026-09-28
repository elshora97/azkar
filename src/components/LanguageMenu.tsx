import { Check, Languages } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LANGS } from '../i18n'
import { usePrefs } from '../state/prefs'

/** Header language picker: choosing an option switches the language immediately. */
export function LanguageMenu() {
  const { prefs, setPref, t } = usePrefs()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !rootRef.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t.language}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-xl bg-emerald-900/5 px-3 text-sm font-medium transition-colors hover:bg-emerald-900/10 active:scale-95 dark:bg-gold-200/10 dark:hover:bg-gold-200/15"
      >
        <Languages className="size-4" />
        <span className="uppercase">{prefs.lang}</span>
      </button>

      {open && (
        <ul
          role="menu"
          className="glass absolute end-0 top-12 z-50 w-48 animate-pop overflow-hidden rounded-2xl bg-parchment/90 p-1.5 text-emerald-950 dark:bg-ink-900/95 dark:text-gold-50"
        >
          {LANGS.map((l) => {
            const active = prefs.lang === l.id
            return (
              <li key={l.id} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setPref('lang', l.id)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-start transition-colors ${
                    active ? 'bg-gold-300/30 dark:bg-gold-400/15' : 'hover:bg-emerald-900/5 dark:hover:bg-gold-200/10'
                  }`}
                >
                  <span className="w-6 text-xs font-semibold uppercase opacity-50">{l.id}</span>
                  <span
                    dir={l.rtl ? 'rtl' : 'ltr'}
                    className={`flex-1 text-sm ${l.id === 'ur' ? 'urdu leading-loose' : l.id === 'ar' ? 'arabic leading-normal' : ''}`}
                  >
                    {l.native}
                  </span>
                  {active && <Check className="size-4 text-gold-600 dark:text-gold-400" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
