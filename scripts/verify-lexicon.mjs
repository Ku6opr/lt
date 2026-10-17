import fs from 'fs';
import { init, analyze, saveCache, CASE, GENDER, NUM } from './vdu-client.mjs';
import { LEX_NOUNS, LEX_ADJECTIVES, LEX_VERBS } from '../src/lib/data/lexicon.js';

const TENSE = { f: 'es. l.', past: 'būt. k. l.', habit: 'būt. d. l.', fut: 'būs. l.', cond: 'tariam. n.', imp: 'liep. n.' };
const PERSON = { sg1: ['1 asm.', 'vns.'], sg2: ['2 asm.', 'vns.'], p3: ['3 asm.'], pl1: ['1 asm.', 'dgs.'], pl2: ['2 asm.', 'dgs.'] };
const has = (...parts) => (mi) => parts.every((p) => mi.includes(p));
const adjTag = (g, num, i) => (mi) => (mi.startsWith('bdv.') || mi.startsWith('dlv.')) && mi.includes(GENDER[g]) && mi.includes(NUM[num] + ' ' + CASE[i]);

const args = process.argv.slice(2);
const kinds = args.filter((a) => !a.startsWith('--'));
const want = (k) => !kinds.length || kinds.includes(k);
const wikt = (kind) => new Set(JSON.parse(fs.readFileSync(`data-source/lt-lexicon-${kind}.json`, 'utf8')).filter((x) => x.found).map((x) => x.lemma));

const checks = [];
if (want('nouns')) {
  const w = wikt('nouns');
  for (const n of LEX_NOUNS.filter((x) => w.has(x.id)))
    for (const num of ['sg', 'pl']) (n[num] || []).forEach((form, i) => form && checks.push({ lemma: n.id, form, slot: `${num} ${CASE[i]}`, ok: has('dkt.', GENDER[n.gender], NUM[num] + ' ' + CASE[i]) }));
}
if (want('adjectives')) {
  const w = wikt('adj');
  for (const a of LEX_ADJECTIVES.filter((x) => w.has(x.id)))
    for (const g of ['m', 'f']) for (const num of ['sg', 'pl']) (a[g]?.[num] || []).forEach((form, i) => form && checks.push({ lemma: a.id, form, slot: `${g} ${num} ${CASE[i]}`, ok: adjTag(g, num, i) }));
}
if (want('verbs')) {
  const w = wikt('verbs');
  for (const v of LEX_VERBS.filter((x) => w.has(x.id || x.inf)))
    for (const [t, tag] of Object.entries(TENSE)) for (const [slot, form] of Object.entries(v[t] || {})) form && checks.push({ lemma: v.id || v.inf, form, slot: `${t} ${slot}`, ok: has('vksm.', tag, ...PERSON[slot]) });
}

await init();
const bad = [];
const unknown = [];
let n = 0;
for (const c of checks) {
  const res = await analyze(c.form);
  if (++n % 200 === 0) {
    saveCache();
    console.error(`${n}/${checks.length}`);
  }
  if (!res.length) unknown.push(c);
  else if (!res.some((r) => c.ok(r.mi))) bad.push({ ...c, vdu: [...new Set(res.map((r) => r.mi))].slice(0, 3) });
}
saveCache();
for (const c of bad) console.log(`XX ${c.lemma}: ${c.form} (${c.slot}) — VDU: ${c.vdu.join(' | ')}`);
for (const c of unknown) console.log(`?? ${c.lemma}: ${c.form} (${c.slot}) — VDU does not know the form`);
const lemmas = [...new Set(bad.map((c) => c.lemma))];
console.log(`\nchecked ${checks.length} forms: ${bad.length} wrong tag, ${unknown.length} unknown; lemmas with wrong forms: ${lemmas.join(' ') || '-'}`);
process.exit(bad.length ? 1 : 0);
