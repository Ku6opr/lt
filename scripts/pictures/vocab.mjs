import { WORDS } from '../../src/lib/data/words.js';
import { ADJECTIVES } from '../../src/lib/data/adjectives.js';
import { VERBS } from '../../src/lib/data/verbsConj.js';
import { PRONOUNS } from '../../src/lib/data/pronouns.js';
import { DEM_PRONOUNS } from '../../src/lib/data/demPronouns.js';
import { NUMERALS } from '../../src/lib/data/numerals.js';
import { PREPS } from '../../src/lib/data/prepositions.js';
import { LEX_NOUNS, LEX_ADJECTIVES, LEX_VERBS } from '../../src/lib/data/lexicon.js';
import { glossOf } from '../../src/lib/engine/daily.js';
import { DAILY_GLOSS } from '../../src/lib/data/dailyGloss.js';
import { ltGender } from '../../src/lib/engine/numerals.js';

const q = (process.argv[2] || '').toLowerCase();
const g = (ref) => {
  const x = glossOf(ref);
  return x ? `${x.ru} / ${x.en}` : 'NO GLOSS';
};
const show = (title, rows) => {
  const list = rows.filter((r) => !q || r.toLowerCase().includes(q));
  if (list.length) console.log(`\n## ${title} (${list.length})\n` + list.join('\n'));
};
const num = (w) => (w.sg && w.sg[0] ? '' : ' pl-only') + (w.pl && w.pl.length ? '' : ' sg-only');

show('nouns  {n: id, c, num}', [...WORDS.map((w) => ({ ...w, gender: ltGender(w) })), ...LEX_NOUNS].map((w) => `${w.id} (${w.gender}${num(w)}) — ${g('n:' + w.id)}`));
show('verbs  {v: id, t, p}', [...VERBS.map((v) => v.id), ...LEX_VERBS.map((v) => v.id || v.inf)].map((id) => {
  const v = [...VERBS, ...LEX_VERBS].find((x) => (x.id || x.inf) === id);
  return `${id} (${v.inf}: ${v.f?.p3}, ${v.past?.p3}) — ${g('v:' + id)}`;
}));
show('adjectives  {a: id, to}', [...ADJECTIVES, ...LEX_ADJECTIVES].map((a) => `${a.id} — ${g('a:' + a.id)}`));
show('pronouns  {pr: id, c}', PRONOUNS.map((p) => `${p.id} (${p.lt.join(' ')})`));
show('demonstratives  {d: id, to}', DEM_PRONOUNS.map((d) => `${d.id} (${d.lt})`));
show('numerals  {q: id, to}', NUMERALS.map((n) => `${n.id} (${n.lt})`));
show('prepositions  {prep}', [...Object.entries(PREPS).map(([k, v]) => `${k} + ${v.case}${k === 'už' ? '/gen' : ''}`), 'ant + gen', 'po + ins/gen/acc', 'šalia + gen', 'prieš + acc', 'tarp + gen', 'virš + gen']);
show('invariant words  {w}', Object.keys(DAILY_GLOSS).filter((k) => k.startsWith('w:')).map((k) => `${k.slice(2)} — ${g(k)}`));
