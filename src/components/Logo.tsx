/** Mihrab arch framing a crescent and star. Keep in sync with public/favicon.svg. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M20 52V31Q20 19 32 11Q44 19 44 31V52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M14 52H50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 25.5A9 9 0 1 0 35 42.5A10 10 0 0 1 35 25.5Z" fill="currentColor" />
      <path d="M38.5 30.5L39.4 33.1L42 34L39.4 34.9L38.5 37.5L37.6 34.9L35 34L37.6 33.1Z" fill="currentColor" />
    </svg>
  )
}
