import { writable } from 'svelte/store';

const KEY = 'lt-ads-v1';
const CACHE = 'lt-ads';

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return v && v.seen && typeof v.seen === 'object' ? v : { seen: {}, n: 0 };
  } catch (e) {
    return { seen: {}, n: 0 };
  }
}

export const adsSeen = writable(load());
adsSeen.subscribe((v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
});

export function markSeen(id) {
  adsSeen.update((v) => ({ n: v.n + 1, seen: { ...v.seen, [id]: v.n + 1 } }));
}

export const adSrc = (id) => 'ads/' + id + '.jpg';
const adUrl = (id) => new URL(adSrc(id), document.baseURI).href;
const hasCache = () => typeof caches !== 'undefined';

export async function cachedAds() {
  if (!hasCache()) return new Set();
  const keys = await (await caches.open(CACHE)).keys();
  return new Set(keys.map((r) => r.url.split('/').pop().replace(/\.jpg$/, '')));
}

let job = Promise.resolve();

export function keepAds(ids) {
  job = job.then(async () => {
    if (!hasCache() || !navigator.onLine) return;
    const cache = await caches.open(CACHE);
    const want = new Set(ids.map(adUrl));
    for (const url of want) if (!(await cache.match(url))) await cache.add(url).catch(() => {});
    for (const req of await cache.keys()) if (!want.has(req.url)) await cache.delete(req);
  }).catch(() => {});
  return job;
}
