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

function computeTotal(topicId) {
  switch (topicId) {
    case 'verb-forms': return { prefix: 'w|', total: VERBS.filter((v) => v.p3p).length };
    case 'conj': return { prefix: 'w|', total: VERBS.length * 5 };
    case 'conj-past': return { prefix: 'w|', total: VERBS.filter((v) => v.past).length * 5 };
    case 'conj-fut': return { prefix: 'w|', total: VERBS.filter((v) => v.fut).length * 5 };
    case 'numerals': return { prefix: 'tc|', total: 9 * 5 };
    case 'num-qty': return { prefix: 'tc|', total: 20 };
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
