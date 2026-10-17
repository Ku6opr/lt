import fs from 'fs';

const PAGE = 'https://kalbu.vdu.lt/mokymosi-priemones/kirciuoklis/';
const AJAX = 'https://kalbu.vdu.lt/ajax-call';
const UA = 'lt-trainer/1.0 (https://github.com/Ku6opr/lt)';
export const CASE = ['vard.', 'kilm.', 'naud.', 'gal.', 'įnag.', 'viet.'];
export const GENDER = { m: 'vyr. g.', f: 'mot. g.' };
export const NUM = { sg: 'vns.', pl: 'dgs.' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let nonce = null;
let cookie = '';
const CACHE = 'node_modules/.cache/vdu-analyze.json';
const cache = new Map(fs.existsSync(CACHE) ? Object.entries(JSON.parse(fs.readFileSync(CACHE, 'utf8'))) : []);
export const saveCache = () => {
  fs.mkdirSync('node_modules/.cache', { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(Object.fromEntries(cache)));
};

export async function init() {
  const res = await fetch(PAGE, { headers: { 'User-Agent': UA } });
  cookie = (res.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).join('; ');
  nonce = ((await res.text()).match(/"NONCE":"([^"]+)"/) || [])[1];
  if (!nonce) throw new Error('no nonce');
}

export async function analyze(word) {
  if (cache.has(word)) return cache.get(word);
  for (let attempt = 0; attempt < 5; attempt++) {
    const body = new URLSearchParams({ action: 'word_accent', nonce, word });
    let text = '';
    try {
      const res = await fetch(AJAX, { method: 'POST', body, headers: { 'User-Agent': UA, Cookie: cookie }, signal: AbortSignal.timeout(20000) });
      text = await res.text();
    } catch (e) {}
    await sleep(250);
    let j = null;
    try { j = JSON.parse(text); } catch (e) {}
    if (j && j.code === 200) {
      const out = JSON.parse(j.message).flat().flatMap((g) => (g.information || []).map((i) => ({ mi: i.mi || '', accented: g.accented[0] })));
      cache.set(word, out);
      return out;
    }
    if (j && j.code === 502) {
      cache.set(word, []);
      return [];
    }
    await sleep(2000 * 2 ** attempt);
    if (attempt === 2) await init().catch(() => {});
  }
  throw new Error('vdu failed: ' + word);
}

