/*
 * FemCare offline-first service worker
 * ─────────────────────────────────────────────────────────────────────
 * The #1 product promise is that FemCare works with ZERO internet.
 * This worker makes that real:
 *
 *   install  → precaches the app shell (index.html, manifest, icons,
 *              fonts) plus the built JS/CSS bundles referenced by
 *              index.html, so the very first visit boots offline later.
 *   fetch    → navigations are network-first with a cache fallback
 *              (fresh when online, full app when offline);
 *              hashed /assets/* bundles and static media are
 *              cache-first (immutable, instant);
 *              dev-served JS/CSS stay network-first so `npm run dev`
 *              hot-reloading keeps working.
 *   activate → drops caches from older versions.
 *
 * It also powers system-level notifications (notificationclick).
 */

const VERSION = 'v1';
const SHELL_CACHE = `femcare-shell-${VERSION}`;
const RUNTIME_CACHE = `femcare-runtime-${VERSION}`;
const KEEP_CACHES = [SHELL_CACHE, RUNTIME_CACHE];

// Minimum set of files the app needs to open offline.
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.svg',
  './icons.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './fonts/fonts.css'
];

/** Put one asset into the shell cache; never let a single 404 break install. */
async function precache(cache, url) {
  try {
    const res = await fetch(url, { cache: 'reload' });
    if (res && res.ok) await cache.put(url, res);
  } catch {
    /* offline or missing — skip, runtime caching will retry later */
  }
}

async function precacheShell() {
  const cache = await caches.open(SHELL_CACHE);

  await Promise.all(SHELL_ASSETS.map((url) => precache(cache, url)));

  // Pull every JS/CSS/asset referenced by index.html (Vite hashes these
  // filenames on each build, so they can't be listed statically).
  try {
    const res = await fetch('./index.html', { cache: 'reload' });
    if (res && res.ok) {
      const html = await res.text();
      const refs = [...html.matchAll(/(?:href|src)="([^"]+\.(?:js|mjs|css|woff2?|svg|png|jpg|webmanifest))"/g)]
        .map((m) => m[1]);
      await Promise.all(
        refs.map((ref) => precache(cache, new URL(ref, self.registration.scope).href))
      );
    }
  } catch {
    /* shell still cached from SHELL_ASSETS */
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(precacheShell());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Remove caches from previous versions
      const names = await caches.keys();
      await Promise.all(
        names.filter((n) => n.startsWith('femcare-') && !KEEP_CACHES.includes(n))
          .map((n) => caches.delete(n))
      );
      await self.clients.claim();
    })()
  );
});

/** Cache first, fall back to network (and cache what succeeds). */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const res = await fetch(request);
    if (res && (res.ok || res.type === 'opaque')) {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, res.clone());
    }
    return res;
  } catch {
    return Response.error();
  }
}

/** Network first, fall back to the cached copy (offline mode). */
async function networkFirst(request, fallbackUrl) {
  try {
    const res = await fetch(request);
    if (res && res.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (fallbackUrl) {
      const shell = await caches.match(fallbackUrl);
      if (shell) return shell;
    }
    return Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Page navigations (the SPA) → network first, full app shell offline.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, './index.html'));
    return;
  }

  // Same-origin requests
  if (url.origin === self.location.origin) {
    const isViteBundle = url.pathname.includes('/assets/');
    const isMutableDevFile = /\.(jsx?|mjs|css)$/.test(url.pathname) && !isViteBundle;

    // Hashed production bundles + images/fonts/gifs → cache-first (immutable).
    // Dev-served modules/styles → network-first so HMR stays fresh, with a
    // cache fallback so `npm run dev` also survives brief disconnections.
    event.respondWith(isMutableDevFile ? networkFirst(request) : cacheFirst(request));
    return;
  }

  // Any remaining cross-origin request (shouldn't exist — FemCare is
  // zero third-party — but cache defensively if one appears).
  event.respondWith(cacheFirst(request));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Reuse an already-open FemCare tab if one exists
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      // Otherwise open the app (works offline too — served from cache)
      if (self.clients.openWindow) return self.clients.openWindow('./');
      return undefined;
    })
  );
});
