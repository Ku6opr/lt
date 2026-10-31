import fs from 'fs';

const OUT = 'src/lib/data/verbsRefl.js';
const TENSES = ['pres', 'past', 'fut'];
const SLOTS = ['sg1', 'sg2', 'p3', 'pl1', 'pl2'];

const load = (f) => JSON.parse(fs.readFileSync('data-source/' + f, 'utf8'));
const byLemma = (arr) => Object.fromEntries(arr.filter((x) => x.found).map((x) => [x.lemma, x]));
const wikt = byLemma(load('lt-verbs-refl.json'));
const vdu = byLemma(load('lt-verbs-refl-vdu.json'));
const tr = load('verbs-refl-tr.json');

const fold = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const guard = (acc, base) => (acc && fold(acc) === fold(base) && acc !== base ? acc : null);

const errors = [];
const out = tr.map((t) => {
  const w = wikt[t.lemma];
  const v = vdu[t.lemma];
  if (!v) { errors.push(t.lemma + ': нема ВДУ'); return null; }
  const e = { id: t.id, inf: t.lemma, uk: t.uk, ru: t.ru, en: t.en, neg: {}, negA: {} };
  for (const tense of TENSES) {
    const forms = {}, accs = {}, negs = {}, negAs = {};
    for (const s of SLOTS) {
      const base = w ? w[tense][s] : v[tense][s];
      if (w && w[tense][s] !== v[tense][s]) errors.push(`${t.lemma} ${tense} ${s}: Wiktionary ${w[tense][s]} ≠ ВДУ ${v[tense][s]}`);
      forms[s] = base;
      accs[s] = guard(w && w[tense + 'A'][s], base) || guard(v[tense + 'A'][s], base);
      negs[s] = v['neg' + tense][s];
      negAs[s] = guard(v['neg' + tense + 'A'][s], negs[s]);
    }
    e[tense] = forms;
    e[tense + 'A'] = accs;
    e.neg[tense] = negs;
    e.negA[tense] = negAs;
  }
  e.g = t.g;
  e.pt = t.pt;
  e.gp = t.gp;
  e.trail = t.trail || null;
  e.plain = null;
  if (t.plain) {
    if (!v.plainpres) { errors.push(t.lemma + ': нема звичайних форм ВДУ (pair у refl-vdu-lemmas.json)'); return e; }
    const pl = { inf: t.lemma.slice(0, -1), uk: t.plain.uk, ru: t.plain.ru, en: t.plain.en, neg: {}, negA: {} };
    for (const tense of TENSES) {
      const forms = {}, accs = {}, negs = {}, negAs = {};
      for (const s of SLOTS) {
        forms[s] = v['plain' + tense][s];
        accs[s] = guard(v['plain' + tense + 'A'][s], forms[s]);
        negs[s] = v['negplain' + tense][s];
        negAs[s] = guard(v['negplain' + tense + 'A'][s], negs[s]);
      }
      pl[tense] = forms;
      pl[tense + 'A'] = accs;
      pl.neg[tense] = negs;
      pl.negA[tense] = negAs;
    }
    pl.g = t.plain.g;
    pl.pt = t.plain.pt;
    pl.gp = t.plain.gp;
    pl.trail = null;
    e.plain = pl;
  }
  return e;
});
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
fs.writeFileSync(OUT, 'export const REFL_VERBS = [\n' + out.map((e) => '  ' + JSON.stringify(e)).join(',\n') + '\n];\n');
console.log(out.length, 'verbs →', OUT, '· Wiktionary:', out.filter((e) => wikt[e.inf]).length, '· звичайна пара:', out.filter((e) => e.plain).length);
