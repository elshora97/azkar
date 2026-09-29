import { Share, SquarePlus, Smartphone, X } from 'lucide-react'
import { useState } from 'react'
import { isIos, isStandalone } from '../pwa/hooks'
import { usePrefs } from '../state/prefs'

const DISMISS_KEY = 'azkar:iosInstallDismissed'

/**
 * iOS never fires `beforeinstallprompt`, so there is no install button to show.
 * The only route is Share → Add to Home Screen; these steps walk users through it.
 */
export function IosInstallSteps() {
  const { t } = usePrefs()
  const steps = [
    { icon: Share, text: t.iosStepShare },
    { icon: SquarePlus, text: t.iosStepAdd },
    { icon: Smartphone, text: t.iosStepConfirm },
  ]
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{t.iosInstallTitle}</p>
      <ol className="space-y-1.5">
        {steps.map(({ icon: Icon, text }, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-800 text-gold-200 dark:bg-gold-400 dark:text-ink-900">
              <Icon className="size-4" />
            </span>
            <span className="leading-snug">{text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** One-time, dismissible install notice for iPhone and iPad users browsing in Safari. */
export function IosInstallBanner() {
  const { t } = usePrefs()
  const [visible, setVisible] = useState(() => {
    if (!isIos() || isStandalone()) return false
    try {
      return !localStorage.getItem(DISMISS_KEY)
    } catch {
      return true
    }
  })
  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Blocked storage: the notice simply shows again next visit.
    }
  }

  return (
    <div role="note" className="mb-3 shrink-0 animate-rise">
      <div className="glass glass-done relative rounded-2xl bg-parchment/80 p-3 pe-10 text-emerald-950 dark:bg-ink-900/85 dark:text-gold-50">
        <IosInstallSteps />
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.dismiss}
          className="absolute end-2 top-2 grid size-8 place-items-center rounded-lg opacity-60 hover:opacity-100"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
