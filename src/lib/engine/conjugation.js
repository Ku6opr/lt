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

// час (state.tense): 'pres' (дефолт) | 'past' | 'fut'
const FORMS = (v, tense) => (tense === 'past' ? v.past : tense === 'fut' ? v.fut : v.f);
const FORMS_A = (v, tense) => (tense === 'past' ? v.pastA : tense === 'fut' ? v.futA : v.fA);

const FUT_AUX = {
  uk: ['буду', 'будеш', 'буде', 'будемо', 'будете', 'будуть'],
  ru: ['буду', 'будешь', 'будет', 'будем', 'будете', 'будут']
};
const enBase = (v) => (v.en === 'can' ? 'be able' : v.en.replace(/^to /, ''));
// підмет → форма минулого джерельною мовою: aš/tu/jis → чол., ji → жін., множина → мн.
const pastKey = (pronId) => (pronId === 'ji' ? 'f' : ['mes', 'jus', 'jie', 'jos'].includes(pronId) ? 'pl' : 'm');

function glossForm(verb, tKey, tense, pron) {
  if (tense === 'past') {
    if (tKey === 'en') return verb.gp ? verb.gp.en : verb.en;
    return verb.pt ? verb.pt[tKey][pastKey(pron.id)] : verb[tKey];
  }
  if (tense === 'fut') {
    if (tKey === 'en') return 'will ' + enBase(verb);
    return verb.id === 'buti' ? FUT_AUX[tKey][pron.pi] : FUT_AUX[tKey][pron.pi] + ' ' + verb[tKey];
  }
  return verb.g[tKey][pron.pi];
}

function glossP3(verb, tKey, tense) {
  if (tense === 'past') return verb.gp ? verb.gp[tKey] : verb[tKey];
  if (tense === 'fut') {
    if (tKey === 'en') return 'will ' + enBase(verb);
    return verb.id === 'buti' ? FUT_AUX[tKey][2] : FUT_AUX[tKey][2] + ' ' + verb[tKey];
  }
  return verb.g[tKey][2];
}

export function conjPoolOk(state) {
  const tense = (state && state.tense) || 'pres';
  return VERBS.some((v) => FORMS(v, tense));
}

export function newConjTask(state, prev) {
  const lang = state.lang || 'uk';
  const tKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const tense = state.tense || 'pres';
  const tier = CONJ_TIERS[Math.min(state.level, CONJ_TIERS.length - 1)];

  let vpool = VERBS.filter((v) => FORMS(v, tense));
  if (!vpool.length) return null;
  if (state.focusWordId) { const f = vpool.filter((v) => v.id === state.focusWordId); if (f.length) vpool = f; }
  if (prev && prev.wordId && vpool.length > 1) { const a = vpool.filter((v) => v.id !== prev.wordId); if (a.length) vpool = a; }
  const verb = rnd(vpool);
  const F = FORMS(verb, tense);
  const FA = FORMS_A(verb, tense) || {};

  // на рівні з показом 3-ї особи не питаємо особу з тією САМОЮ формою (у II дієвідміні sg2 = p3: tu myli / jis myli)
  let ppool = tier.cue === 'p3' ? PRON_PERSON.filter((p) => F[p.slot] !== F.p3) : PRON_PERSON.slice();
  if (state.focusPerson) { const f = ppool.filter((p) => p.slot === state.focusPerson); if (f.length) ppool = f; }
  if (prev && prev.pronId && ppool.length > 1) { const a = ppool.filter((p) => p.id !== prev.pronId); if (a.length) ppool = a; }
  const pron = rnd(ppool);

  const targetForm = F[pron.slot];
  // глос-фраза, узгоджена з особою відповіді: «он видел», «вони їстимуть» — для розкриття
  const phrase = SRC_PRON[tKey][pron.id] + ' ' + glossForm(verb, tKey, tense, pron);
  // промпт і його переклад — у ТІЙ САМІЙ формі, що й показане слово, БЕЗ займенника:
  // 0 → 3-тя особа; 1 → інфінітив; 2 → сама фраза-переклад (без нотатки).
  const headword = tier.cue === 'gloss' ? phrase : tier.cue === 'p3' ? F.p3 : verb.inf;
  const note = tier.cue === 'p3' ? glossP3(verb, tKey, tense) : tier.cue === 'inf' ? verb[tKey] : null;

  return {
    conj: true,
    wordId: verb.id,
    pronId: pron.id,
    person: pron.slot,
    number: pron.num,
    theme: 'all',
    prompt: { text: headword },
    promptA: tier.cue === 'p3' ? FA.p3 || null : null,
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
    targetFormA: FA[pron.slot] || null
  };
}
