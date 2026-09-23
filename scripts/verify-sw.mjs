// Offline verification for the FemCare service worker.
// Runs the REAL public/sw.js against the REAL dist/ build inside a mocked
// SW environment, then proves:
//   1. install precaches the app shell + hashed bundles + fonts (same-origin only)
//   2. a navigation with the network DOWN is served from cache (app opens offline)
//   3. assets are cache-first and keep working after the network dies
//   4. activate cleans up old versioned caches
// Run with: node scripts/verify-sw.mjs   (after: npm run build)

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const swCode = readFileSync(join(root, 'public', 'sw.js'), 'utf8');

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html missing — run `npm run build` first.');
  process.exit(1);
}

const SCOPE = 'http://localhost:4173/';
let pass = 0, fail = 0;
const check = (name, cond) => {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; console.log('  FAIL', name); }
};

// ── Network simulation ────────────────────────────────────────────
let offline = false;
const keyOf = (req) => new URL(typeof req === 'string' ? req : req.url, SCOPE).href;

function makeResponse(bodyText, ok = true, type = 'basic') {
  const res = {
    ok,
    status: ok ? 200 : 0,
    type,
    bodyText,
    clone: () => makeResponse(bodyText, ok, type),
    text: () => Promise.resolve(bodyText),
  };
  return res;
}

async function fakeFetch(input) {
  if (offline) throw new TypeError('Failed to fetch (network is down)');
  const url = keyOf(input);
  const u = new URL(url);
  if (u.origin !== new URL(SCOPE).origin) {
    // Zero third-party rule: any cross-origin request is a red flag
    return makeResponse('cross-origin!', true, 'opaque');
  }
  const filePath = join(dist, decodeURIComponent(u.pathname).replace(/^\//, '') || 'index.html');
  const target = u.pathname === '/' || u.pathname === '' ? join(dist, 'index.html') : filePath;
  if (!existsSync(target)) return makeResponse('not found', false);
  return makeResponse(readFileSync(target, 'utf8'));
}

// ── Cache API mock ────────────────────────────────────────────────
class FakeCache {
  constructor(store) { this.store = store; }
  async put(req, res) { this.store.set(keyOf(req), res); }
  async match(req) { return this.store.get(keyOf(req)); }
  async keys() { return [...this.store.keys()].map((url) => ({ url })); }
}
class FakeCacheStorage {
  constructor() { this.map = new Map(); }
  async open(name) {
    if (!this.map.has(name)) this.map.set(name, new Map());
    return new FakeCache(this.map.get(name));
  }
  async keys() { return [...this.map.keys()]; }
  async delete(name) { return this.map.delete(name); }
  async match(req) {
    for (const store of this.map.values()) {
      const hit = store.get(keyOf(req));
      if (hit) return hit;
    }
    return undefined;
  }
}

// ── Service worker global mock ────────────────────────────────────
const listeners = {};
const self = {
  registration: { scope: SCOPE },
  location: { origin: new URL(SCOPE).origin },
  clients: { claim: async () => {}, matchAll: async () => [], openWindow: async () => {} },
  skipWaiting: () => {},
  addEventListener: (type, fn) => { listeners[type] = fn; },
};

// Evaluate the real sw.js with its globals shadowed by our mocks
new Function('self', 'caches', 'fetch', 'Response', swCode)(
  self,
  new FakeCacheStorage(),
  fakeFetch,
  { error: () => makeResponse('', false, 'error') }
);

const dispatchInstall = async () => {
  const pending = [];
  listeners.install({ waitUntil: (p) => pending.push(p) });
  await Promise.all(pending);
};
const dispatchFetch = async (request) => {
  let responded = null;
  listeners.fetch({ request, respondWith: (p) => { responded = p; } });
  if (!responded) return null;
  return await responded;
};

// ── 1. Install: precache the shell while online ──────────────────
check('install + fetch + activate handlers registered',
  !!listeners.install && !!listeners.fetch && !!listeners.activate);

await dispatchInstall();

const shellHas = async (url) => {
  // Ask the SW itself: an offline fetch proves the file is cached
  const wasOffline = offline;
  offline = true;
  const res = await dispatchFetch({ method: 'GET', mode: 'cors', url: keyOf(url) });
  offline = wasOffline;
  return !!(res && res.ok);
};

check('index.html precached', await shellHas('/index.html'));
check('manifest precached', await shellHas('/manifest.webmanifest'));
check('fonts.css precached', await shellHas('/fonts/fonts.css'));
check('icon-192.png precached', await shellHas('/icon-192.png'));

// Extract the hashed bundles the build produced and confirm each is cached
const builtHtml = readFileSync(join(dist, 'index.html'), 'utf8');
const bundleRefs = [...builtHtml.matchAll(/(?:href|src)="([^"]+\.(?:js|css))"/g)].map((m) => m[1]);
check('build references JS/CSS bundles', bundleRefs.length >= 2);
for (const ref of bundleRefs) {
  check(`bundle cached: ${ref}`, await shellHas(ref));
}

// ── 2. Offline navigation: the app must open with the network down ──
offline = true;
const navRes = await dispatchFetch({ method: 'GET', mode: 'navigate', url: SCOPE });
const navHtml = navRes && navRes.ok ? await navRes.text() : '';
check('navigation served from cache while offline', navHtml.includes('<div id="root">'));

const nav2 = await dispatchFetch({ method: 'GET', mode: 'navigate', url: SCOPE + 'index.html' });
check('explicit /index.html navigation served offline', !!(nav2 && nav2.ok));
offline = false;

// ── 3. Cache-first assets survive the network dying later ────────
const assetUrl = bundleRefs.find((r) => r.endsWith('.js'));
// First hit while online populates the runtime cache
const onlineAsset = await dispatchFetch({ method: 'GET', mode: 'cors', url: keyOf(assetUrl) });
check('asset fetches while online', !!(onlineAsset && onlineAsset.ok));
offline = true;
const offlineAsset = await dispatchFetch({ method: 'GET', mode: 'cors', url: keyOf(assetUrl) });
check('same asset still served after network dies', !!(offlineAsset && offlineAsset.ok));
offline = false;

// ── 4. Zero third-party precaching ───────────────────────────────
check('all shell assets are same-origin',
  bundleRefs.every((r) => !/^https?:\/\//.test(r) || r.startsWith(SCOPE)));

// ── 5. Activate cleans old versioned caches ──────────────────────
// The SW has its own storage instance, so emulate the cleanup contract by
// running the real activate handler against a storage we can inspect:
const captured = new FakeCacheStorage();
(await captured.open('femcare-shell-v0')).put('/stale.txt', makeResponse('old'));
(await captured.open('femcare-runtime-v0')).put('/stale.txt', makeResponse('old'));
await captured.open('femcare-shell-v1');
await captured.open('femcare-runtime-v1');
await (async () => {
  const pending = [];
  const self2 = {
    ...self,
    addEventListener: (type, fn) => { if (type === 'activate') listeners.__activateCaptured = fn; },
  };
  new Function('self', 'caches', 'fetch', 'Response', swCode)(
    self2, captured, fakeFetch, { error: () => makeResponse('', false, 'error') }
  );
  listeners.__activateCaptured({ waitUntil: (p) => pending.push(p) });
  await Promise.all(pending);
})();
const namesAfter = await captured.keys();
check('activate drops old femcare-* caches',
  !namesAfter.includes('femcare-shell-v0') && !namesAfter.includes('femcare-runtime-v0'));
check('activate keeps current caches',
  namesAfter.includes('femcare-shell-v1') && namesAfter.includes('femcare-runtime-v1'));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
