import { CalculationMethod, Coordinates, PrayerTimes as Adhan, Qibla } from 'adhan'
import { Compass, Loader2, LocateFixed, MapPin } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

// Arabic-only for now (see ARABIC_ONLY in i18n.ts), so labels live here.
const PRAYERS = [
  { id: 'fajr', label: 'الفجر' },
  { id: 'sunrise', label: 'الشروق' },
  { id: 'dhuhr', label: 'الظهر' },
  { id: 'asr', label: 'العصر' },
  { id: 'maghrib', label: 'المغرب' },
  { id: 'isha', label: 'العشاء' },
] as const
type PrayerId = (typeof PRAYERS)[number]['id']

const METHODS = {
  Egyptian: 'الهيئة المصرية العامة للمساحة',
  UmmAlQura: 'أم القرى (مكة المكرمة)',
  MuslimWorldLeague: 'رابطة العالم الإسلامي',
  Karachi: 'جامعة العلوم الإسلامية بكراتشي',
  Dubai: 'دبي',
  Kuwait: 'الكويت',
  Qatar: 'قطر',
  Turkey: 'تركيا',
  NorthAmerica: 'أمريكا الشمالية (ISNA)',
} as const
type MethodId = keyof typeof METHODS

const LOC_KEY = 'azkar:location'
const METHOD_KEY = 'azkar:method'

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage blocked: the location is simply asked for again next time.
  }
}

const fmt = (d: Date) => d.toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' })
const countdown = (ms: number) => {
  const m = Math.max(0, Math.floor(ms / 60000))
  const h = Math.floor(m / 60)
  return h > 0 ? `${h.toLocaleString('ar-EG')} س ${(m % 60).toLocaleString('ar-EG')} د` : `${m.toLocaleString('ar-EG')} دقيقة`
}

/** Compass heading in degrees from north, when the device has an orientation sensor. */
function useHeading() {
  const [heading, setHeading] = useState<number | null>(null)
  const [needsPermission, setNeedsPermission] = useState(
    () => typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent,
  )

  useEffect(() => {
    if (needsPermission) return
    const onOrient = (e: DeviceOrientationEvent & { webkitCompassHeading?: number }) => {
      // iOS reports a true compass heading; elsewhere absolute alpha counts counter-clockwise.
      if (typeof e.webkitCompassHeading === 'number') setHeading(e.webkitCompassHeading)
      else if (e.absolute && e.alpha !== null) setHeading((360 - e.alpha) % 360)
    }
    const evt = 'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation'
    window.addEventListener(evt, onOrient as EventListener)
    return () => window.removeEventListener(evt, onOrient as EventListener)
  }, [needsPermission])

  // iOS 13+ only grants sensor access from a user gesture.
  const requestPermission = async () => {
    const req = (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission
    if ((await req()) === 'granted') setNeedsPermission(false)
  }

  return { heading, needsPermission, requestPermission }
}

export function PrayerTimes() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(() => read(LOC_KEY, null))
  const [method, setMethod] = useState<MethodId>(() => read(METHOD_KEY, 'Egyptian'))
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')
  const [now, setNow] = useState(() => new Date())
  const { heading, needsPermission, requestPermission } = useHeading()

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const locate = () => {
    if (!('geolocation' in navigator)) return setError('المتصفح لا يدعم تحديد الموقع')
    setLocating(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      ({ coords: c }) => {
        const next = { lat: +c.latitude.toFixed(4), lng: +c.longitude.toFixed(4) }
        setCoords(next)
        write(LOC_KEY, next)
        setLocating(false)
      },
      () => {
        setError('تعذّر تحديد الموقع. اسمح بالوصول إلى الموقع ثم حاول مرة أخرى.')
        setLocating(false)
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 6 * 60 * 60 * 1000 },
    )
  }

  const data = useMemo(() => {
    if (!coords) return null
    const c = new Coordinates(coords.lat, coords.lng)
    const params = CalculationMethod[method]()
    const today = new Adhan(c, now, params)
    const times = Object.fromEntries(PRAYERS.map((p) => [p.id, today[p.id]])) as Record<PrayerId, Date>
    // After Isha, the next prayer is tomorrow's Fajr.
    const upcoming = PRAYERS.find((p) => times[p.id] > now)
    const next = upcoming
      ? { id: upcoming.id as PrayerId, at: times[upcoming.id] }
      : { id: 'fajr' as PrayerId, at: new Adhan(c, new Date(now.getTime() + 864e5), params).fajr }
    const current = [...PRAYERS].reverse().find((p) => p.id !== 'sunrise' && times[p.id] <= now)?.id ?? 'isha'
    return { times, next, current, qibla: Qibla(c) }
    // `now` ticks every 30 s; recomputing is cheap.
  }, [coords, method, now])

  if (!coords) {
    return (
      <div className="glass flex flex-1 flex-col items-center justify-center gap-4 rounded-[1.75rem] p-6 text-center">
        <MapPin className="size-10 text-gold-500" />
        <p className="font-display text-xl font-semibold">مواقيت الصلاة والقبلة</p>
        <p className="max-w-xs text-sm opacity-70">نحتاج موقعك لحساب مواقيت الصلاة واتجاه القبلة. يُحفظ الموقع على جهازك فقط.</p>
        <button
          type="button"
          onClick={locate}
          disabled={locating}
          className="flex items-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 font-medium text-gold-200 active:scale-95 disabled:opacity-70 dark:bg-gold-400 dark:text-ink-900"
        >
          {locating ? <Loader2 className="size-5 animate-spin" /> : <LocateFixed className="size-5" />} حدّد موقعي
        </button>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    )
  }

  const { times, next, current, qibla } = data!
  const nextLabel = PRAYERS.find((p) => p.id === next.id)!.label
  // Needle angle relative to the phone's top edge when a compass is available.
  const needle = heading === null ? qibla : qibla - heading
  const aligned = heading !== null && Math.abs(((needle % 360) + 540) % 360 - 180) < 5

  return (
    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pb-2">
      {/* Next prayer */}
      <section className="glass glass-done rounded-[1.75rem] p-4 text-center">
        <p className="text-sm opacity-70">الصلاة القادمة</p>
        <p className="font-display text-3xl font-semibold">{nextLabel}</p>
        <p className="mt-1 text-lg tabular-nums text-gold-600 dark:text-gold-400">{fmt(next.at)}</p>
        <p className="text-sm opacity-70">بعد {countdown(next.at.getTime() - now.getTime())}</p>
      </section>

      {/* Today's times */}
      <section className="glass rounded-[1.75rem] p-2">
        <ul>
          {PRAYERS.map((p) => {
            const isCurrent = p.id === current
            const isNext = p.id === next.id
            return (
              <li
                key={p.id}
                className={`flex items-center justify-between rounded-2xl px-4 py-2.5 ${
                  isNext ? 'bg-gold-300/30 font-semibold dark:bg-gold-400/15' : isCurrent ? 'bg-emerald-900/5 dark:bg-gold-200/5' : ''
                } ${p.id === 'sunrise' ? 'opacity-60' : ''}`}
              >
                <span>{p.label}</span>
                <span className="tabular-nums">{fmt(times[p.id])}</span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Qibla */}
      <section className="glass rounded-[1.75rem] p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-2 font-display text-lg font-semibold">
            <Compass className="size-5 text-gold-500" /> القبلة
          </p>
          <p className="text-sm tabular-nums opacity-70">{Math.round(qibla).toLocaleString('ar-EG')}° من الشمال</p>
        </div>
        <div className="relative mx-auto size-52">
          {/* Dial: rotates with the phone so N points north */}
          <div
            className="absolute inset-0 rounded-full border-2 border-emerald-900/15 transition-transform duration-300 dark:border-gold-200/15"
            style={{ transform: `rotate(${heading === null ? 0 : -heading}deg)` }}
          >
            {['ش', 'ق', 'ج', 'غ'].map((d, i) => (
              <span
                key={d}
                className={`absolute inset-0 flex justify-center pt-1.5 text-xs font-semibold ${i === 0 ? 'text-red-600 dark:text-red-400' : 'opacity-50'}`}
                style={{ transform: `rotate(${i * 90}deg)` }}
              >
                {d}
              </span>
            ))}
          </div>
          {/* Needle toward the Kaaba */}
          <div className="absolute inset-0 transition-transform duration-300" style={{ transform: `rotate(${needle}deg)` }}>
            <div className="absolute top-5 left-1/2 flex -translate-x-1/2 flex-col items-center">
              <span className={`grid size-9 place-items-center rounded-xl text-lg ${aligned ? 'bg-gold-400 text-ink-900' : 'bg-emerald-900 text-gold-300'}`}>🕋</span>
              <span className={`h-16 w-1 rounded-full ${aligned ? 'bg-gold-400' : 'bg-emerald-800 dark:bg-gold-300/70'}`} />
            </div>
          </div>
          <span className="absolute top-1/2 left-1/2 size-3 -translate-1/2 rounded-full bg-gold-500" />
        </div>
        <p className="mt-3 text-center text-sm opacity-70">
          {heading === null
            ? needsPermission
              ? ''
              : 'لا توجد بوصلة في هذا الجهاز: الاتجاه محسوب من الشمال'
            : aligned
              ? 'أنت متجه نحو القبلة'
              : 'أدر الهاتف حتى يشير السهم إلى الأعلى'}
        </p>
        {needsPermission && (
          <button type="button" onClick={() => void requestPermission()} className="mx-auto mt-2 block rounded-xl bg-emerald-800 px-4 py-2 text-sm text-gold-200 dark:bg-gold-400 dark:text-ink-900">
            تفعيل البوصلة
          </button>
        )}
      </section>

      {/* Settings */}
      <section className="glass space-y-3 rounded-[1.75rem] p-4 text-sm">
        <label className="block">
          <span className="mb-1 block opacity-70">طريقة الحساب</span>
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value as MethodId)
              write(METHOD_KEY, e.target.value)
            }}
            className="w-full rounded-xl border border-emerald-900/15 bg-transparent px-3 py-2 dark:border-gold-200/15 [&>option]:text-black"
          >
            {Object.entries(METHODS).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={locate} disabled={locating} className="flex items-center gap-2 opacity-80 hover:opacity-100">
          {locating ? <Loader2 className="size-4 animate-spin" /> : <LocateFixed className="size-4" />} تحديث الموقع
        </button>
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      </section>
    </div>
  )
}
