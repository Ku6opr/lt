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

// ділить наголошену форму на [основа, хвіст] за довжиною ОСНОВИ (у базових літерах),
// щоб хвіст лишався червоним навіть з наголосами. Комбіновані знаки йдуть з попередньою літерою.
export function accentSplit(acc, stemLen) {
  const s = (acc || '').normalize('NFD');
  let i = 0, base = 0;
  while (i < s.length && base < stemLen) {
    i++;
    while (i < s.length && /[̀-ͯ]/.test(s[i])) i++;
    base++;
  }
  return [s.slice(0, i).normalize('NFC'), s.slice(i).normalize('NFC')];
}

export function stemOf(type, num) {
  const k = type.id + num;
  if (stemCache[k] == null) stemCache[k] = commonPrefix(type[num]);
  return stemCache[k];
}
