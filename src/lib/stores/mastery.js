import { WORDS } from '../data/words.js';
import { VERBS } from '../data/verbsConj.js';
import { PRONOUNS } from '../data/pronouns.js';
import { ADJECTIVES } from '../data/adjectives.js';

// Обсяг уроку = скільки клітинок/форм узагалі можна освоїти.
// Клітинкові уроки (закінчення) рахуємо за tc|-ключами, словникові — за w|-ключами.
const totals = {};

function nounTotal() {
  const types = {};
  for (const w of WORDS) {
    const t = types[w.type] || (types[w.type] = { pl: false });
    if (w.pl && w.pl.length === 6) t.pl = true;
  }
  let n = 0;
  for (const k of Object.keys(types)) n += 6 + (types[k].pl ? 6 : 0);
  return n;
}

// Уроки дієвідмінювання: реальна вісь навички — модель закінчення × особа, а не слово.
// Слово — лише носій моделі: клітинка «модель × особа» освоєна, коли закінчення
// підтверджене на кількох різних словах (щоб один влучний удар не зараховувався).
const CONJ_TENSE = { conj: 'pres', 'conj-past': 'past', 'conj-fut': 'fut', 'conj-imp': 'imp', 'conj-cond': 'cond' };
const CONJ_SLOTS = { pres: 5, past: 5, fut: 5, imp: 2, cond: 5 };

function verbModel(v, tense) {
  if (tense === 'pres') return v.id === 'buti' ? 'buti' : v.f.p3.slice(-1);
  if (tense === 'past') return v.past.p3.slice(-1);
  return 'one';
}

function conjModels(tense) {
  const set = new Set();
  for (const v of VERBS) {
    const F = tense === 'past' ? v.past : tense === 'fut' ? v.fut : tense === 'imp' ? v.imp && v.it : tense === 'cond' ? v.cond : v.f;
    if (F) set.add(verbModel(v, tense));
  }
  return set;
}

function conjMastery(forms, tense) {
  const modelOf = {};
  for (const v of VERBS) modelOf[v.id] = verbModel(v, tense);
  const cells = {};
  for (const [k, r] of Object.entries(forms)) {
    if (!k.startsWith('w|')) continue;
    const [, id, slot] = k.split('|');
    const model = modelOf[id];
    if (!model) continue;
    const c = cells[model + '|' + slot] || (cells[model + '|' + slot] = { o: 0, m: 0, words: new Set() });
    c.o += r.o;
    c.m += r.m;
    if (r.o > 0) c.words.add(id);
  }
  const models = conjModels(tense);
  const total = models.size * CONJ_SLOTS[tense];
  let done = 0;
  const singleVerb = {};
  for (const m of models) singleVerb[m] = VERBS.filter((v) => verbModel(v, tense) === m).length === 1;
  for (const [key, c] of Object.entries(cells)) {
    const model = key.split('|')[0];
    const g = c.o + c.m;
    const needWords = singleVerb[model] ? 1 : 2;
    if (g >= 3 && c.o / g >= 0.8 && c.words.size >= needWords) done++;
  }
  if (done > total) done = total;
  return { done, total, pct: total ? done / total : 0 };
}

function computeTotal(topicId) {
  switch (topicId) {
    case 'verb-forms': return { prefix: 'w|', total: VERBS.filter((v) => v.p3p).length };
    case 'numerals': return { prefix: 'tc|', total: 9 * 5 };
    case 'num-qty': return { prefix: 'tc|', total: 20 };
    case 'dem-nom': return { prefix: 'tc|', total: 11 * 2 };
    case 'dem-cases': return { prefix: 'tc|', total: 11 * 5 * 2 };
    case 'vidminky': return { prefix: 'tc|', total: nounTotal() };
    case 'adj-nom': return { prefix: 'tc|', total: 3 * 2 * 1 * 2 };
    case 'adj-cases': return { prefix: 'tc|', total: 3 * 2 * 5 * 2 };
    case 'adj-degrees': return { prefix: 'tc|', total: 3 * 2 * 2 * 2 };
    case 'adverbs': {
      const types = new Set(ADJECTIVES.filter((a) => a.adv).map((a) => a.type));
      return { prefix: 'tc|', total: types.size * 3 };
    }
    case 'pronouns': return { prefix: 'w|', total: PRONOUNS.length * 5 };
    default: return { prefix: 'tc|', total: 0 };
  }
}

export function masteryOf(progressAll, topicId) {
  if (CONJ_TENSE[topicId]) {
    const forms = (progressAll[topicId] && progressAll[topicId].forms) || {};
    return conjMastery(forms, CONJ_TENSE[topicId]);
  }
  const t = totals[topicId] || (totals[topicId] = computeTotal(topicId));
  if (!t.total) return { done: 0, total: 0, pct: 0 };
  const forms = (progressAll[topicId] && progressAll[topicId].forms) || {};
  let done = 0;
  for (const [k, r] of Object.entries(forms)) {
    if (!k.startsWith(t.prefix)) continue;
    const g = r.o + r.m;
    if (g > 0 && r.o / g >= 0.8) done++;
  }
  if (done > t.total) done = t.total;
  return { done, total: t.total, pct: done / t.total };
}

// Слова «до повторення»: були промахи, і правильні відповіді ще не перекрили їх із запасом
export function weakFormKeys(progressAll, topicId) {
  const forms = (progressAll[topicId] && progressAll[topicId].forms) || {};
  const out = [];
  for (const [k, r] of Object.entries(forms)) {
    if (!k.startsWith('w|')) continue;
    if (r.m > 0 && r.o - r.m < 2) out.push(k);
  }
  return out;
}
