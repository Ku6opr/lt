import fs from 'fs';

const SRC = 'data-source/lexicon-vdu-lemmas.json';
const OUT = { verbs: 'data-source/lt-lexicon-vdu-verbs.json', adjectives: 'data-source/lt-lexicon-vdu-adj.json', nouns: 'data-source/lt-lexicon-vdu-nouns.json' };
const PAGE = 'https://kalbu.vdu.lt/mokymosi-priemones/kirciuoklis/';
const AJAX = 'https://kalbu.vdu.lt/ajax-call';
const UA = 'lt-trainer/1.0 (https://github.com/Ku6opr/lt)';
const CASE = ['vard.', 'kilm.', 'naud.', 'gal.', 'įnag.', 'viet.'];
const GENDER = { m: 'vyr. g.', f: 'mot. g.' };
const NUM = { sg: 'vns.', pl: 'dgs.' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let nonce = null;
let cookie = '';
const CACHE = 'node_modules/.cache/vdu-analyze.json';
const cache = new Map(fs.existsSync(CACHE) ? Object.entries(JSON.parse(fs.readFileSync(CACHE, 'utf8'))) : []);
const saveCache = () => {
  fs.mkdirSync('node_modules/.cache', { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(Object.fromEntries(cache)));
};

async function init() {
  const res = await fetch(PAGE, { headers: { 'User-Agent': UA } });
  cookie = (res.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).join('; ');
  nonce = ((await res.text()).match(/"NONCE":"([^"]+)"/) || [])[1];
  if (!nonce) throw new Error('no nonce');
}

async function analyze(word) {
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

const soft = (stem) => stem.replace(/t$/, 'č').replace(/d$/, 'dž');
const softens = (end) => /^i[aouąųė]/.test(end);

function candidates(stem, end) {
  const out = [stem + end];
  if (softens(end) && soft(stem) !== stem) out.push(soft(stem) + end);
  return out;
}

async function pick(cands, match) {
  for (const c of cands) {
    const hit = (await analyze(c)).find((a) => match(a.mi));
    if (hit) return { form: c, accented: hit.accented.normalize('NFC') };
  }
  return null;
}

const has = (...parts) => (mi) => parts.every((p) => mi.includes(p));

const NOUN = {
  as: { sg: ['as', 'o', 'ui', 'ą', 'u', ['e', 'uje']], pl: ['ai', 'ų', 'ams', 'us', 'ais', 'uose'] },
  is: { sg: ['is', 'io', 'iui', 'į', 'iu', 'yje'], pl: ['iai', 'ių', 'iams', 'ius', 'iais', 'iuose'] },
  ys: { sg: ['ys', 'io', 'iui', 'į', 'iu', 'yje'], pl: ['iai', 'ių', 'iams', 'ius', 'iais', 'iuose'] },
  ius: { sg: ['ius', 'iaus', 'iui', 'ių', 'iumi', 'iuje'], pl: ['iai', 'ių', 'iams', 'ius', 'iais', 'iuose'] },
  us: { sg: ['us', 'aus', 'ui', 'ų', 'umi', 'uje'], pl: ['ūs', 'ų', 'ums', 'us', 'umis', 'uose'] },
  is_f: { sg: ['is', 'ies', 'iai', 'į', 'imi', 'yje'], pl: ['ys', 'ių', 'ims', 'is', 'imis', 'yse'] },
  a: { sg: ['a', 'os', 'ai', 'ą', 'a', 'oje'], pl: ['os', 'ų', 'oms', 'as', 'omis', 'ose'] },
  ia: { sg: ['ia', 'ios', 'iai', 'ią', 'ia', 'ioje'], pl: ['ios', 'ių', 'ioms', 'ias', 'iomis', 'iose'] },
  e: { sg: ['ė', 'ės', 'ei', 'ę', 'e', 'ėje'], pl: ['ės', 'ių', 'ėms', 'es', 'ėmis', 'ėse'] }
};

function nounClass(n) {
  const w = n.lemma;
  if (n.plural) {
    if (w.endsWith('ys') && n.gender === 'f') return ['is_f', w.slice(0, -2)];
    if (w.endsWith('iai')) return ['is', w.slice(0, -3)];
    if (w.endsWith('ai')) return ['as', w.slice(0, -2)];
    if (w.endsWith('os')) return ['a', w.slice(0, -2)];
    if (w.endsWith('ės')) return ['e', w.slice(0, -2)];
    return null;
  }
  if (w.endsWith('is') && n.gender === 'f') return ['is_f', w.slice(0, -2)];
  for (const [k, end] of [['ys', 'ys'], ['is', 'is'], ['ius', 'ius'], ['us', 'us'], ['as', 'as'], ['ia', 'ia'], ['e', 'ė'], ['a', 'a']]) if (w.endsWith(end)) return [k, w.slice(0, -end.length)];
  return null;
}

async function nounForms(n) {
  const cls = nounClass(n);
  if (!cls) return null;
  const [k, stem] = cls;
  const res = { gender: n.gender, sg: [], pl: [], sgA: [], plA: [] };
  for (const num of n.plural ? ['pl'] : ['sg', 'pl']) {
    for (let i = 0; i < 6; i++) {
      const ends = [].concat(NOUN[k][num][i]);
      const cands = ends.flatMap((e) => candidates(stem, e));
      const hit = await pick(cands, has('dkt.', GENDER[n.gender], NUM[num] + ' ' + CASE[i]));
      if (!hit) { res[num] = []; res[num + 'A'] = []; break; }
      res[num].push(hit.form);
      res[num + 'A'].push(hit.accented);
    }
  }
  if (!res.sg.length && !res.pl.length) return null;
  if (!n.plural && !res.sg.length) return null;
  return res;
}

const ADJ = {
  I: { m: { sg: ['as', 'o', 'am', 'ą', 'u', 'ame'], pl: ['i', 'ų', 'iems', 'us', 'ais', 'uose'] }, f: { sg: ['a', 'os', 'ai', 'ą', 'a', 'oje'], pl: ['os', 'ų', 'oms', 'as', 'omis', 'ose'] } },
  II: { m: { sg: ['us', 'aus', 'iam', 'ų', 'iu', 'iame'], pl: ['ūs', 'ių', 'iems', 'ius', 'iais', 'iuose'] }, f: { sg: ['i', 'ios', 'iai', 'ią', 'ia', 'ioje'], pl: ['ios', 'ių', 'ioms', 'ias', 'iomis', 'iose'] } }
};

async function adjForms(lemma) {
  const t = lemma.endsWith('us') ? 'II' : lemma.endsWith('as') ? 'I' : null;
  if (!t) return null;
  const stem = lemma.slice(0, -2);
  const res = { m: { sg: [], pl: [] }, f: { sg: [], pl: [] }, mA: { sg: [], pl: [] }, fA: { sg: [], pl: [] } };
  for (const g of ['m', 'f']) for (const num of ['sg', 'pl']) for (let i = 0; i < 6; i++) {
    const cands = candidates(stem, ADJ[t][g][num][i]);
    const tag = (mi) => (mi.startsWith('bdv.') || mi.startsWith('dlv.')) && mi.includes(GENDER[g]) && mi.includes(NUM[num] + ' ' + CASE[i]);
    const hit = await pick(cands, tag);
    if (!hit) return null;
    res[g][num].push(hit.form);
    res[g + 'A'][num].push(hit.accented);
  }
  return res;
}

const TENSE = { pres: 'es. l.', past: 'būt. k. l.', habit: 'būt. d. l.', fut: 'būs. l.', cond: 'tariam. n.', imp: 'liep. n.' };
const PERSON = { sg1: ['1 asm.', 'vns.'], sg2: ['2 asm.', 'vns.'], p3: ['3 asm.'], pl1: ['1 asm.', 'dgs.'], pl2: ['2 asm.', 'dgs.'] };
const unsoft = (s) => s.replace(/č$/, 't').replace(/dž$/, 'd');

function verbCandidates(v) {
  const { inf, pres3, past3 } = v;
  const st = inf.slice(0, -2);
  const out = {};
  if (pres3.endsWith('a')) {
    const b = pres3.slice(0, -1);
    if (b.endsWith('i')) out.pres = { sg1: [b + 'u'], sg2: [unsoft(b.slice(0, -1)) + 'i', b], p3: [pres3], pl1: [pres3 + 'me'], pl2: [pres3 + 'te'] };
    else out.pres = { sg1: [b + 'u'], sg2: [b + 'i'], p3: [pres3], pl1: [pres3 + 'me'], pl2: [pres3 + 'te'] };
  } else if (pres3.endsWith('i')) {
    const b = pres3.slice(0, -1);
    out.pres = { sg1: candidates(b, 'iu'), sg2: [pres3], p3: [pres3], pl1: [b + 'ime'], pl2: [b + 'ite'] };
  } else if (pres3.endsWith('o')) {
    const b = pres3.slice(0, -1);
    out.pres = { sg1: [b + 'au'], sg2: [b + 'ai'], p3: [pres3], pl1: [b + 'ome'], pl2: [b + 'ote'] };
  }
  if (past3.endsWith('o')) {
    const b = past3.slice(0, -1);
    out.past = { sg1: [b + 'au'], sg2: [b + 'ai'], p3: [past3], pl1: [b + 'ome'], pl2: [b + 'ote'] };
  } else if (past3.endsWith('ė')) {
    const b = past3.slice(0, -1);
    out.past = { sg1: candidates(b, 'iau'), sg2: [b + 'ei'], p3: [past3], pl1: [b + 'ėme'], pl2: [b + 'ėte'] };
  }
  const fst = st.replace(/ž$/, 'š').replace(/z$/, 's');
  const fs = /[sš]$/.test(fst) ? { sg1: fst + 'iu', sg2: fst + 'i', p3: fst, pl1: fst + 'ime', pl2: fst + 'ite' } : { sg1: st + 'siu', sg2: st + 'si', p3: st + 's', pl1: st + 'sime', pl2: st + 'site' };
  out.fut = Object.fromEntries(Object.entries(fs).map(([k, x]) => [k, [x]]));
  out.cond = { sg1: [st + 'čiau'], sg2: [st + 'tum'], p3: [st + 'tų'], pl1: [st + 'tume'], pl2: [st + 'tumėte', st + 'tute'] };
  out.habit = { sg1: [st + 'davau'], sg2: [st + 'davai'], p3: [st + 'davo'], pl1: [st + 'davome'], pl2: [st + 'davote'] };
  const ik = /[kg]$/.test(st) ? st.slice(0, -1) + 'k' : st + 'k';
  out.imp = { sg2: [ik], pl1: [ik + 'ime'], pl2: [ik + 'ite'] };
  return out;
}

async function verbForms(v) {
  const res = {};
  for (const [t, slots] of Object.entries(verbCandidates(v))) {
    const forms = {};
    const acc = {};
    let ok = true;
    for (const [slot, cands] of Object.entries(slots)) {
      const hit = await pick(cands, has('vksm.', TENSE[t], ...PERSON[slot]));
      if (!hit) { ok = false; break; }
      forms[slot] = hit.form;
      acc[slot] = hit.accented;
    }
    if (ok) {
      res[t] = forms;
      res[t + 'A'] = acc;
    }
  }
  return res.pres ? res : null;
}

const RUN = { verbs: [verbForms, (v) => v.inf], adjectives: [adjForms, (a) => a], nouns: [nounForms, (n) => n.lemma] };

await init();
const lemmas = JSON.parse(fs.readFileSync(process.argv[3] || SRC, 'utf8'));
const only = process.argv[2];
for (const [kind, list] of Object.entries(lemmas)) {
  if (only && only !== 'all' && only !== kind) continue;
  const [fn, name] = RUN[kind];
  const res = [];
  for (const item of list) {
    const data = await fn(item);
    res.push(data ? { lemma: name(item), found: true, source: 'vdu', ...data } : { lemma: name(item), found: false, source: 'vdu' });
    console.log(kind, name(item), data ? 'ok' + (kind === 'verbs' ? ' [' + Object.keys(data).filter((k) => !k.endsWith('A')).join(' ') + ']' : kind === 'nouns' ? ` sg${data.sg.length} pl${data.pl.length}` : '') : 'NOT VERIFIED');
  }
  const out = process.argv[4] ? process.argv[4].replace('{kind}', kind) : OUT[kind];
  fs.writeFileSync(out, JSON.stringify(res, null, 1) + '\n');
  saveCache();
  console.log(kind, res.filter((r) => r.found).length + '/' + res.length, '→', out);
}
