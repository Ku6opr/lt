import fs from 'fs';
import { ADS } from '../src/lib/data/ads.js';

const PAGE = 'https://kalbu.vdu.lt/mokymosi-priemones/kirciuoklis/';
const AJAX = 'https://kalbu.vdu.lt/ajax-call';
const UA = 'lt-trainer/1.0 (https://github.com/Ku6opr/lt)';
const CACHE = 'node_modules/.cache/vdu-ads.json';
const CASE = { V: 'vard.', K: 'kilm.', N: 'naud.', G: 'gal.', In: 'įnag.', Vt: 'viet.' };

const args = process.argv.slice(2);
const all = args.includes('--all');
const only = args.filter((a) => !a.startsWith('--'));
const cache = new Map(fs.existsSync(CACHE) ? Object.entries(JSON.parse(fs.readFileSync(CACHE, 'utf8'))) : []);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let nonce = null;
let cookie = '';

async function init() {
  const res = await fetch(PAGE, { headers: { 'User-Agent': UA } });
  cookie = (res.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).join('; ');
  nonce = ((await res.text()).match(/"NONCE":"([^"]+)"/) || [])[1];
  if (!nonce) throw new Error('no nonce');
}

async function analyze(word) {
  if (cache.has(word)) return cache.get(word).filter(Boolean);
  if (!nonce) await init();
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const body = new URLSearchParams({ action: 'word_accent', nonce, word });
      const res = await fetch(AJAX, { method: 'POST', body, headers: { 'User-Agent': UA, Cookie: cookie }, signal: AbortSignal.timeout(20000) });
      const j = await res.json();
      const out = j.code === 200 ? JSON.parse(j.message).flat().flatMap((g) => (g.information || []).map((i) => i.mi)).filter(Boolean) : [];
      cache.set(word, out);
      fs.mkdirSync('node_modules/.cache', { recursive: true });
      fs.writeFileSync(CACHE, JSON.stringify(Object.fromEntries(cache)));
      await sleep(250);
      return out;
    } catch (e) {
      await sleep(2000 * 2 ** attempt);
      if (attempt === 1) await init().catch(() => {});
    }
  }
  throw new Error('vdu failed: ' + word);
}

let bad = 0;
let unknown = 0;
for (const ad of ADS.filter((a) => !only.length || only.includes(a.id))) {
  for (const t of ad.tokens) {
    if (t.length < 2) continue;
    const mi = await analyze(t[0].replace(/[^\p{L}]/gu, '').toLowerCase());
    const [c, num] = [t[5], t[6]];
    const hits = c ? mi.filter((m) => m.includes(CASE[c]) && (m.includes(num === 'pl' ? 'dgs.' : 'vns.') || !/vns\.|dgs\./.test(m))) : mi;
    const proper = /^\p{Lu}/u.test(t[1]);
    const mark = !mi.length || (c && !hits.length && proper) ? '??' : c && !hits.length ? 'XX' : 'ok';
    if (mark === '??') unknown++;
    if (mark === 'XX') bad++;
    if (all || mark !== 'ok') console.log(`${mark} ${ad.id}: ${t[0]} → ${t[1]} ${c || ''} ${num || ''} | ${(hits.length ? hits : mi).join(' ; ') || 'VDU не знає'}`);
  }
}
console.log(`mismatch: ${bad}, unknown to VDU (check by hand): ${unknown}`);
if (bad) process.exit(1);
