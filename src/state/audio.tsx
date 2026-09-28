import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

export type AudioStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

interface Track {
  key: string
  src: string
  title: string
}

interface Ctx {
  track: Track | null
  status: AudioStatus
  progress: number
  toggle: (track: Track) => void
  stop: () => void
}

const AudioContext = createContext<Ctx | null>(null)

/** One shared <audio> element so only a single recitation plays at a time. */
export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [track, setTrack] = useState<Track | null>(null)
  const [status, setStatus] = useState<AudioStatus>('idle')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const a = new Audio()
    a.preload = 'none'
    // CORS mode lets the service worker cache recitations for offline playback.
    a.crossOrigin = 'anonymous'
    audioRef.current = a
    const on = (e: string, fn: () => void) => a.addEventListener(e, fn)
    on('waiting', () => setStatus('loading'))
    on('playing', () => setStatus('playing'))
    on('pause', () => setStatus((s) => (s === 'idle' ? s : 'paused')))
    on('ended', () => {
      setStatus('idle')
      setProgress(0)
      setTrack(null)
    })
    on('error', () => a.src && setStatus('error'))
    on('timeupdate', () => setProgress(a.duration ? a.currentTime / a.duration : 0))
    return () => {
      a.pause()
      a.removeAttribute('src')
    }
  }, [])

  const stop = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    setStatus('idle')
    a.pause()
    a.removeAttribute('src')
    a.load()
    setTrack(null)
    setProgress(0)
  }, [])

  const toggle = useCallback(
    (next: Track) => {
      const a = audioRef.current
      if (!a) return
      if (track?.key === next.key && status !== 'error') {
        if (a.paused) void a.play().catch(() => setStatus('error'))
        else a.pause()
        return
      }
      setTrack(next)
      setProgress(0)
      setStatus('loading')
      a.src = next.src
      void a.play().catch((err: DOMException) => err.name !== 'AbortError' && setStatus('error'))
    },
    [track, status],
  )

  const value = useMemo(() => ({ track, status, progress, toggle, stop }), [track, status, progress, toggle, stop])
  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>')
  return ctx
}
