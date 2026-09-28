import { CheckCircle2, RefreshCw, X } from 'lucide-react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { usePrefs } from '../state/prefs'

/** Tells the user when the app is ready offline, and offers to reload when an update is waiting. */
export function PwaToast() {
  const { t } = usePrefs()
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // Check for a new version every hour while the app stays open.
      if (registration) setInterval(() => void registration.update(), 60 * 60 * 1000)
    },
  })

  if (!offlineReady && !needRefresh) return null
  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div role="status" className="fixed inset-x-3 top-[calc(4.75rem+env(safe-area-inset-top))] z-[25] mx-auto max-w-md animate-rise">
      <div className="glass glass-done flex items-center gap-3 rounded-2xl bg-parchment/80 p-3 text-sm text-emerald-950 dark:bg-ink-900/85 dark:text-gold-50">
        {needRefresh ? (
          <RefreshCw className="size-5 shrink-0 text-gold-600 dark:text-gold-400" />
        ) : (
          <CheckCircle2 className="size-5 shrink-0 text-emerald-700 dark:text-gold-400" />
        )}
        <p className="flex-1">{needRefresh ? t.updateAvailable : t.offlineReady}</p>
        {needRefresh && (
          <button
            type="button"
            onClick={() => void updateServiceWorker(true)}
            className="rounded-xl bg-emerald-800 px-3 py-1.5 font-medium text-gold-200 active:scale-95 dark:bg-gold-400 dark:text-ink-900"
          >
            {t.reload}
          </button>
        )}
        <button type="button" onClick={close} aria-label={t.close} className="grid size-8 place-items-center rounded-lg opacity-60 hover:opacity-100">
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
