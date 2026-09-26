import fs from 'fs';
import { WORDS } from '../src/lib/data/words.js';
import { ADJECTIVES } from '../src/lib/data/adjectives.js';
import { VERBS } from '../src/lib/data/verbsConj.js';

const EXCLUDE = new Set(['pusseserė']);
const GENDER = { ledai: 'm' };
const SLOTS = ['sg1', 'sg2', 'p3', 'pl1', 'pl2'];
const TENSES = ['pres', 'past', 'habit', 'fut', 'cond', 'imp'];

const load = (f) => (fs.existsSync('data-source/' + f) ? JSON.parse(fs.readFileSync('data-source/' + f, 'utf8')) : []);
const read = (kind) => {
  const wikt = load('lt-lexicon-' + kind + '.json').filter((x) => x.found && !EXCLUDE.has(x.lemma));
  const have = new Set(wikt.map((x) => x.lemma));
  return [...wikt, ...load('lt-lexicon-vdu-' + kind + '.json').filter((x) => x.found && !have.has(x.lemma))];
};
const fold = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const guard = (acc, base) => (acc && base && fold(acc) === fold(base) && acc !== base ? acc : null);
const guardArr = (acc, base) => {
  const out = base.map((b, i) => guard(acc && acc[i], b));
  return out.some(Boolean) ? out.map((a, i) => a || base[i]) : null;
};
const guardObj = (acc, base) => {
  const out = {};
  let any = false;
  for (const k of Object.keys(base)) {
    const a = guard(acc && acc[k], base[k]);
    if (a) any = true;
    out[k] = a || base[k];
  }
  return any ? out : null;
};

const known = {
  nouns: new Set(WORDS.map((w) => w.id)),
  adjectives: new Set(ADJECTIVES.map((a) => a.id)),
  verbs: new Set(VERBS.map((v) => v.inf))
};
const skip = (kind, lemma) => {
  if (!known[kind].has(lemma)) return false;
  console.warn('skip duplicate', kind, lemma);
  return true;
};

const nouns = read('nouns').filter((n) => !skip('nouns', n.lemma)).map((n) => {
  const pluralOnly = n.pl.length === 0 && / pl\b/.test(n.headword || '');
  const sg = pluralOnly ? [] : n.sg;
  const pl = pluralOnly ? n.sg : n.pl;
  const sgA = pluralOnly ? null : guardArr(n.sgA, sg);
  const plA = pl.length ? guardArr(pluralOnly ? n.sgA : n.plA, pl) : null;
  const gender = GENDER[n.lemma] || n.gender;
  if (!gender) throw new Error('no gender: ' + n.lemma);
  return { id: n.lemma, gender, sg, pl, ...(sgA ? { sgA } : {}), ...(plA ? { plA } : {}) };
});

const adjectives = read('adj').filter((a) => !skip('adjectives', a.lemma)).map((a) => {
  const mA = { sg: guardArr(a.mA.sg, a.m.sg), pl: guardArr(a.mA.pl, a.m.pl) };
  const fA = { sg: guardArr(a.fA.sg, a.f.sg), pl: guardArr(a.fA.pl, a.f.pl) };
  return {
    id: a.lemma,
    m: a.m,
    f: a.f,
    ...(mA.sg || mA.pl ? { mA: { sg: mA.sg || a.m.sg, pl: mA.pl || a.m.pl } } : {}),
    ...(fA.sg || fA.pl ? { fA: { sg: fA.sg || a.f.sg, pl: fA.pl || a.f.pl } } : {})
  };
});

const verbs = read('verbs').filter((v) => !skip('verbs', v.lemma)).map((v) => {
  const out = { id: v.lemma, inf: v.lemma };
  for (const t of TENSES) {
    if (!v[t]) continue;
    const key = t === 'pres' ? 'f' : t;
    const base = Object.fromEntries(Object.entries(v[t]).filter(([k, x]) => SLOTS.includes(k) && x));
    out[key] = base;
    const acc = guardObj(v[t + 'A'], base);
    if (acc) out[key + 'A'] = acc;
  }
  return out;
});

const body =
  'export const LEX_NOUNS = [\n' + nouns.map((x) => '  ' + JSON.stringify(x)).join(',\n') + '\n];\n\n' +
  'export const LEX_ADJECTIVES = [\n' + adjectives.map((x) => '  ' + JSON.stringify(x)).join(',\n') + '\n];\n\n' +
  'export const LEX_VERBS = [\n' + verbs.map((x) => '  ' + JSON.stringify(x)).join(',\n') + '\n];\n';
fs.writeFileSync('src/lib/data/lexicon.js', body);
console.log('lexicon: nouns', nouns.length, 'adjectives', adjectives.length, 'verbs', verbs.length);
console.log('plural-only:', nouns.filter((n) => !n.sg.length).map((n) => n.id).join(', '));
console.log('singular-only:', nouns.filter((n) => !n.pl.length).map((n) => n.id).join(', '));
