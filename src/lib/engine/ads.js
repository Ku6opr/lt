import { hash } from './schedule.js';

export function adQueue(ads, seen) {
  return ads
    .map((a) => ({ a, s: seen[a.id] || 0, h: hash(a.id) }))
    .sort((x, y) => x.s - y.s || x.h - y.h)
    .map((x) => x.a);
}
