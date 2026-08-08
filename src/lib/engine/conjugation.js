import { VERBS, PRON_PERSON, SRC_PRON } from '../data/verbsConj.js';
import { PRONOUNS } from '../data/pronouns.js';

const PRON_A = {};
for (const p of PRONOUNS) PRON_A[p.id] = (p.ltA || [])[0] || null;

const rnd = (a) => a[Math.floor(Math.random() * a.length)];

// Рівні складності — кожен ЗНІМАЄ одну опору для виведення основи теперішнього часу.
// 0: 3-тя особа (основа видна) + переклад — лишається додати закінчення. 3-тю особу не питаємо.
// 1: інфінітив + переклад — треба згадати дієвідміну й вивести основу.
// 2: лише переклад (без литовської) — згадати дієслово І провідміняти.
export const CONJ_TIERS = [
  { cue: 'p3' },
  { cue: 'inf' },
  { cue: 'gloss' }
];

export function conjPoolOk() {
  return true;
}

export function newConjTask(state, prev) {
  const lang = state.lang || 'uk';
  const tKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const tier = CONJ_TIERS[Math.min(state.level, CONJ_TIERS.length - 1)];

  let vpool = VERBS.slice();
  if (prev && prev.wordId && vpool.length > 1) { const a = vpool.filter((v) => v.id !== prev.wordId); if (a.length) vpool = a; }
  const verb = rnd(vpool);

  // на рівні з показом 3-ї особи не питаємо особу з тією САМОЮ формою (у II дієвідміні sg2 = p3: tu myli / jis myli)
  let ppool = tier.cue === 'p3' ? PRON_PERSON.filter((p) => verb.f[p.slot] !== verb.f.p3) : PRON_PERSON.slice();
  if (prev && prev.pronId && ppool.length > 1) { const a = ppool.filter((p) => p.id !== prev.pronId); if (a.length) ppool = a; }
  const pron = rnd(ppool);

  const targetForm = verb.f[pron.slot];
  // глос-фраза, узгоджена з особою відповіді: «он видит», «вони їдять» — для розкриття
  const phrase = SRC_PRON[tKey][pron.id] + ' ' + verb.g[tKey][pron.pi];
  // промпт і його переклад — у ТІЙ САМІЙ формі, що й показане слово, БЕЗ займенника:
  // 0 → 3-тя особа (valgo → «ест»); 1 → інфінітив (galėti → «мочь»); 2 → сама фраза-переклад (без нотатки).
  const headword = tier.cue === 'gloss' ? phrase : tier.cue === 'p3' ? verb.f.p3 : verb.inf;
  const note = tier.cue === 'p3' ? verb.g[tKey][2] : tier.cue === 'inf' ? verb[tKey] : null;

  return {
    conj: true,
    wordId: verb.id,
    pronId: pron.id,
    person: pron.slot,
    number: pron.num,
    theme: 'all',
    prompt: { text: headword },
    promptA: tier.cue === 'p3' ? (verb.fA && verb.fA.p3) || null : null,
    leadA: PRON_A[pron.id] || null,
    trailA: null,
    promptNote: note,
    hasNote: !!note,
    wordUk: null,
    hasLead: true,
    lead: pron.lt,
    trail: null,
    hint: null,
    revealUk: tier.cue === 'gloss' ? null : phrase,
    stemPrefix: '',
    stem: targetForm,
    tail: '',
    targetForm,
    targetFormA: (verb.fA && verb.fA[pron.slot]) || null
  };
}
