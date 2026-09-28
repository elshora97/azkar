import { Check, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { LANGS } from '../i18n'
import { usePrefs, type Prefs } from '../state/prefs'
import { OfflineSettings } from './OfflineSettings'

function Toggle({ label, checked, disabled, onChange }: { label: string; checked: boolean; disabled?: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className={`flex items-center justify-between gap-4 py-3 ${disabled ? 'opacity-40' : 'cursor-pointer'}`}>
      <span className="text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-emerald-700 dark:bg-gold-400' : 'bg-emerald-900/15 dark:bg-gold-200/15'}`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white shadow transition-[inset-inline-start] duration-200 ${checked ? 'start-6' : 'start-1'}`}
        />
      </button>
    </label>
  )
}

/** Settings sheet: interface/translation language, content toggles and theme. */
export function LanguageSwitcher({ open, onClose, audioUrls }: { open: boolean; onClose: () => void; audioUrls: string[] }) {
  const { prefs, setPref, t } = usePrefs()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const toggles: { key: keyof Prefs; label: string; disabled?: boolean }[] = [
    { key: 'showArabic', label: t.arabicText },
    { key: 'showTransliteration', label: t.transliteration },
    { key: 'showTranslation', label: t.translation, disabled: prefs.lang === 'ar' },
  ]

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-ink-950/40 backdrop:backdrop-blur-sm
        sm:m-auto sm:max-w-md open:animate-rise"
    >
      <div className="glass rounded-t-[2rem] bg-parchment/80 px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-emerald-950 sm:rounded-[2rem] sm:pt-5 dark:bg-ink-900/85 dark:text-gold-50">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-emerald-900/20 sm:hidden dark:bg-gold-200/20" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{t.settings}</h2>
          <button type="button" onClick={onClose} aria-label={t.close} className="grid size-9 place-items-center rounded-full hover:bg-emerald-900/5 dark:hover:bg-gold-200/10">
            <X className="size-5" />
          </button>
        </div>

        <h3 className="mb-2 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase dark:text-gold-400">{t.language}</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {LANGS.map((l) => {
            const active = prefs.lang === l.id
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setPref('lang', l.id)}
                className={`flex items-center justify-between gap-2 rounded-2xl border px-3 py-2.5 text-start transition-colors ${
                  active
                    ? 'border-gold-500 bg-gold-300/30 dark:border-gold-400/70 dark:bg-gold-400/10'
                    : 'border-emerald-900/10 hover:border-emerald-900/25 dark:border-gold-200/10 dark:hover:border-gold-200/30'
                }`}
              >
                <span className="min-w-0">
                  <span className={`block truncate text-sm font-medium ${l.id === 'ur' ? 'urdu leading-loose' : l.id === 'ar' ? 'arabic leading-normal' : ''}`}>
                    {l.native}
                  </span>
                  <span className="block text-[0.7rem] opacity-60">{l.label}</span>
                </span>
                {active && <Check className="size-4 shrink-0 text-gold-600 dark:text-gold-400" />}
              </button>
            )
          })}
        </div>

        <h3 className="mt-6 mb-1 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase dark:text-gold-400">{t.display}</h3>
        <div className="divide-y divide-emerald-900/10 dark:divide-gold-200/10">
          {toggles.map(({ key, label, disabled }) => (
            <Toggle key={key} label={label} disabled={disabled} checked={prefs[key] as boolean} onChange={(v) => setPref(key, v as never)} />
          ))}
        </div>

        <h3 className="mt-6 mb-2 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase dark:text-gold-400">{t.theme}</h3>
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-emerald-900/5 p-1 dark:bg-gold-200/5">
          {(['light', 'dark'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPref('theme', mode)}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 text-sm transition-colors ${
                prefs.theme === mode ? 'bg-white shadow-sm dark:bg-gold-400 dark:text-ink-900' : 'opacity-70'
              }`}
            >
              {mode === 'light' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {mode === 'light' ? t.light : t.dark}
            </button>
          ))}
        </div>
        <OfflineSettings open={open} audioUrls={audioUrls} />

        <p className="mt-5 text-center text-xs opacity-55">{t.resetsDaily}</p>
      </div>
    </dialog>
  )
}
