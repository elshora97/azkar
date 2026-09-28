/// <reference lib="webworker" />
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { AUDIO_CACHE, API_CACHE } from './pwa/caches'

declare const self: ServiceWorkerGlobalScope

// App shell, bundled fallback data, icons and self-hosted fonts.
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// Single-page app: every navigation is served the precached index.html.
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')))

const isHisnMuslim = (url: URL) => url.hostname.endsWith('hisnmuslim.com')

// Azkar data: prefer fresh, fall back to the last response when offline or slow.
registerRoute(
  ({ url }) => isHisnMuslim(url) && url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: API_CACHE,
    networkTimeoutSeconds: 5,
    plugins: [new CacheableResponsePlugin({ statuses: [200] }), new ExpirationPlugin({ maxEntries: 60 })],
  }),
)

// Recitations. <audio> asks for byte ranges, and a 206 partial response can't be cached,
// so on a miss we fetch the whole file (a 200 the player also accepts) and store it.
// Later plays are served from the cache, sliced to the requested range.
registerRoute(
  ({ url }) => isHisnMuslim(url) && url.pathname.startsWith('/audio/'),
  new CacheFirst({
    cacheName: AUDIO_CACHE,
    plugins: [
      { requestWillFetch: async ({ request }) => new Request(request.url, { mode: 'cors', credentials: 'omit' }) },
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 300, purgeOnQuotaError: true }),
      new RangeRequestsPlugin(),
    ],
  }),
)

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') void self.skipWaiting()
})
clientsClaim()
