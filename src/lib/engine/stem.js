import { ORDER } from '../data/cases.js';

const stemCache = {};

export function idx(id) {
  return ORDER.indexOf(id);
}

export function commonPrefix(arr) {
  let p = arr[0];
  for (const s of arr) {
    let i = 0;
    while (i < p.length && i < s.length && p[i] === s[i]) i++;
    p = p.slice(0, i);
  }
  return p;
}

export function boundedPrefix(arr) {
  let p = commonPrefix(arr);
  const minLen = Math.min(...arr.map((s) => s.length));
  if (p.length > minLen - 1) p = p.slice(0, Math.max(0, minLen - 1));
  return p;
}

export function stemOf(type, num) {
  const k = type.id + num;
  if (stemCache[k] == null) stemCache[k] = commonPrefix(type[num]);
  return stemCache[k];
}
