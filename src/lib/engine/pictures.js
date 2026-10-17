import { PICTURES } from '../data/pictures/index.js';
import { buildPhrase, glossOf } from './daily.js';
import { pickForDay } from './schedule.js';

function build(src) {
  try {
    return [buildPhrase(src)];
  } catch (e) {
    console.error(src.id + ': ' + e.message);
    return [];
  }
}

export const PICTURE_POOL = PICTURES.map((p) => ({ id: p.id, since: p.since || null, until: p.until || null, phrases: p.phrases.flatMap(build) })).filter((p) => p.phrases.length);

export const PICTURE_PHRASES = new Map(PICTURE_POOL.flatMap((p) => p.phrases.map((x) => [x.id, x])));

for (const ref of new Set([...PICTURE_PHRASES.values()].flatMap((p) => p.tokens.map((t) => t.ref)))) {
  if (!glossOf(ref)) console.error('pictures: no gloss for ' + ref);
}

export function pictureOfDay(key, pool = PICTURE_POOL) {
  return pickForDay(key, pool, 1)[0] || null;
}
