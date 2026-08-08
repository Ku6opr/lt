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

// показ: à/ã → ´, тильда з приголосного (kal̃ba) переїжджає на голосну складу;
// односкладові — без знака; без прекомпозиційного гліфа (ū́ ė́ ą́) — теж без знака (шрифт не вміє)
export function simplifyAccent(s) {
  const d = (s || '').normalize('NFD');
  const isVowel = (c) => 'aeiouy'.includes(c);
  const isTone = (c) => c === '̀' || c === '́' || c === '̃';
  const isMark = (c) => /[̀-ͯ]/.test(c);
  let nuclei = 0, inV = false;
  for (const c of d) {
    if (isMark(c)) continue;
    if (isVowel(c)) { if (!inV) { nuclei++; inV = true; } }
    else inV = false;
  }
  if (nuclei <= 1) return d.replace(/[̀́̃]/g, '').normalize('NFC');
  const out = [];
  let lastVowelEnd = -1;
  for (let i = 0; i < d.length; i++) {
    const c = d[i];
    if (isTone(c)) {
      let b = out.length - 1;
      while (b >= 0 && isMark(out[b])) b--;
      if (b >= 0 && isVowel(out[b])) out.push('́');
      else if (lastVowelEnd >= 0) out.splice(lastVowelEnd + 1, 0, '́');
      continue;
    }
    out.push(c);
    if (isVowel(c)) {
      let e = out.length - 1;
      lastVowelEnd = e;
    } else if (isMark(c) && lastVowelEnd === out.length - 2) {
      lastVowelEnd = out.length - 1;
    }
  }
  const res = out.join('').normalize('NFC');
  if (/[̀́̃]/.test(res)) return d.replace(/[̀́̃]/g, '').normalize('NFC');
  return res;
}

export function stemOf(type, num) {
  const k = type.id + num;
  if (stemCache[k] == null) stemCache[k] = commonPrefix(type[num]);
  return stemCache[k];
}
