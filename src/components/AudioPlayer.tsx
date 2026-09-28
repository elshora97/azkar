import { Loader2, Pause, Play, Square, VolumeX } from 'lucide-react'
import { useAudio } from '../state/audio'
import { usePrefs } from '../state/prefs'

/** Four bouncing bars shown while a recitation is playing. */
export function Visualizer({ active, className = '' }: { active: boolean; className?: string }) {
  return (
    <span className={`flex h-4 items-end gap-[3px] ${className}`} aria-hidden>
      {[0, 0.25, 0.1, 0.35].map((delay, i) => (
        <span
          key={i}
          style={{ animationDelay: `${delay}s` }}
          className={`h-full w-[3px] origin-bottom rounded-full bg-current ${active ? 'animate-bar' : 'scale-y-30'}`}
        />
      ))}
    </span>
  )
}

interface Props {
  trackKey: string
  src: string | null
  title: string
}

/** Per-card play/pause control. */
export function AudioButton({ trackKey, src, title }: Props) {
  const { track, status, toggle } = useAudio()
  const { t } = usePrefs()
  const current = track?.key === trackKey
  const playing = current && status === 'playing'
  const loading = current && status === 'loading'
  const error = current && status === 'error'

  if (!src) {
    return (
      <span title={t.audioUnavailable} className="grid size-10 place-items-center rounded-full text-emerald-900/30 dark:text-gold-200/25">
        <VolumeX className="size-4" />
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        toggle({ key: trackKey, src, title })
      }}
      aria-label={playing ? t.pause : t.play}
      aria-pressed={playing}
      className={`flex h-10 min-w-10 items-center justify-center gap-2 rounded-full px-3 text-sm transition-all active:scale-95 ${
        current
          ? 'bg-emerald-800 text-gold-200 dark:bg-gold-400 dark:text-ink-900'
          : 'bg-emerald-900/5 text-emerald-900 hover:bg-emerald-900/10 dark:bg-gold-200/10 dark:text-gold-200 dark:hover:bg-gold-200/15'
      } ${error ? 'ring-2 ring-red-500/60' : ''}`}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : playing ? (
        <Pause className="size-4" fill="currentColor" />
      ) : (
        <Play className="size-4" fill="currentColor" />
      )}
      {current && <Visualizer active={playing} />}
    </button>
  )
}

/** Floating "now playing" pill with progress, shown above the navigation. */
export function NowPlaying() {
  const { track, status, progress, toggle, stop } = useAudio()
  const { t } = usePrefs()
  if (!track) return null
  const playing = status === 'playing'

  return (
    <div className="fixed inset-x-3 top-[calc(4.75rem+env(safe-area-inset-top))] z-30 mx-auto max-w-md animate-rise">
      <div className="glass relative flex items-center gap-3 overflow-hidden rounded-2xl p-2 pe-3 text-emerald-950 dark:text-gold-100">
        <button
          type="button"
          onClick={() => toggle(track)}
          aria-label={playing ? t.pause : t.play}
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-800 text-gold-200 active:scale-95 dark:bg-gold-400 dark:text-ink-900"
        >
          {status === 'loading' ? (
            <Loader2 className="size-4 animate-spin" />
          ) : playing ? (
            <Pause className="size-4" fill="currentColor" />
          ) : (
            <Play className="size-4" fill="currentColor" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p dir="rtl" className="arabic truncate text-base leading-normal">
            {track.title}
          </p>
          {status === 'error' && <p className="text-xs text-red-600 dark:text-red-400">Audio failed to load</p>}
        </div>
        <Visualizer active={playing} className="text-gold-600 dark:text-gold-400" />
        <button type="button" onClick={stop} aria-label={t.close} className="grid size-8 place-items-center rounded-lg opacity-70 hover:opacity-100">
          <Square className="size-3.5" fill="currentColor" />
        </button>
        <span
          className="absolute bottom-0 start-0 h-0.5 bg-gold-500 transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
