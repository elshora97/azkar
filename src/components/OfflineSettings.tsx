import { CheckCircle2, Download, Loader2, MonitorDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { countSavedAudio, saveAudio } from '../pwa/caches'
import { isIos, isStandalone, useInstallPrompt } from '../pwa/hooks'
import { IosInstallSteps } from './IosInstall'
import { usePrefs } from '../state/prefs'

const fill = (s: string, n: number, total: number) => s.replace('{n}', String(n)).replace('{total}', String(total))

/** Install button and per-category "save recitations for offline" control. */
export function OfflineSettings({ audioUrls, open }: { audioUrls: string[]; open: boolean }) {
  const { prefs, t } = usePrefs()
  const install = useInstallPrompt()
  const [saved, setSaved] = useState(0)
  const [state, setState] = useState<'idle' | 'saving' | 'error'>('idle')
  const total = audioUrls.length
  const urlsKey = audioUrls.join('|')

  useEffect(() => {
    if (!open) return
    let live = true
    void countSavedAudio(audioUrls).then((n) => live && setSaved(n))
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, urlsKey])

  const download = async () => {
    setState('saving')
    try {
      await saveAudio(audioUrls, setSaved)
      setState('idle')
    } catch {
      setState('error')
      setSaved(await countSavedAudio(audioUrls))
    }
  }

  const supported = typeof caches !== 'undefined'
  const complete = total > 0 && saved >= total

  return (
    <>
      <h3 className="mt-6 mb-2 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase dark:text-gold-400">{t.offline}</h3>
      <div className="space-y-2">
        {supported && total > 0 && (
          <div className="rounded-2xl border border-emerald-900/10 p-3 dark:border-gold-200/10">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{t.offlineAudio.replace('{category}', t.categories[prefs.category])}</p>
                <p className={`text-xs ${state === 'error' ? 'text-red-600 dark:text-red-400' : 'opacity-60'}`}>
                  {state === 'error' ? t.downloadFailed : complete ? t.allAudioSaved : fill(t.audioSavedOf, saved, total)}
                </p>
              </div>
              {complete ? (
                <CheckCircle2 className="size-6 shrink-0 text-emerald-700 dark:text-gold-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => void download()}
                  disabled={state === 'saving'}
                  className="flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-emerald-800 px-3 text-sm font-medium text-gold-200 active:scale-95 disabled:opacity-70 dark:bg-gold-400 dark:text-ink-900"
                >
                  {state === 'saving' ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
                  {t.download}
                </button>
              )}
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-emerald-900/10 dark:bg-gold-200/10">
              <div className="h-full rounded-full bg-gold-500 transition-[width] duration-300" style={{ width: `${(saved / total) * 100}%` }} />
            </div>
          </div>
        )}
        {isIos() && !isStandalone() && (
          <div className="rounded-2xl border border-gold-500/50 bg-gold-300/20 p-3 dark:bg-gold-400/10">
            <IosInstallSteps />
          </div>
        )}
        {install && (
          <button
            type="button"
            onClick={() => void install()}
            className="flex w-full items-center gap-3 rounded-2xl border border-gold-500/50 bg-gold-300/20 p-3 text-start transition hover:bg-gold-300/30 dark:bg-gold-400/10"
          >
            <MonitorDown className="size-5 shrink-0 text-gold-600 dark:text-gold-400" />
            <span className="flex-1">
              <span className="block text-sm font-medium">{t.install}</span>
              <span className="block text-xs opacity-60">{t.installHint}</span>
            </span>
          </button>
        )}
      </div>
    </>
  )
}
