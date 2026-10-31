import { PRON_PERSON, SRC_PRON } from '../data/verbsConj.js';
import { REFL_VERBS } from '../data/verbsRefl.js';
import { PRONOUNS } from '../data/pronouns.js';
import { boundedPrefix, commonPrefix } from './stem.js';
import { FUT_AUX, enBase, pastKey, ukPhrase } from './conjugation.js';

const REFL_TIERS = [
  { cue: 'p3', prefill: true },
  { cue: 'inf', prefill: false },
  { cue: 'gloss', prefill: false }
];
const PLAIN_TIER = { cue: 'plain', prefill: true };
const REFL_PRES_TIERS = [
  PLAIN_TIER,
  { cue: 'inf', prefill: true, only: 'p3' },
  ...REFL_TIERS
];
const REFL_OTHER_TIERS = [PLAIN_TIER, ...REFL_TIERS];
export const reflTiersFor = (tense) => (tense === 'pres' ? REFL_PRES_TIERS : REFL_OTHER_TIERS);
export const REFL_POLS = ['aff', 'neg'];
export const NEG_HEAD = 'nesi';

const PRON_A = {};
for (const p of PRONOUNS) PRON_A[p.id] = (p.ltA || [])[0] || null;

const rnd = (a) => a[Math.floor(Math.random() * a.length)];

export const reflForms = (v, tense, pol) => (pol === 'neg' ? v.neg[tense] : v[tense]);
const reflAcc = (v, tense, pol) => (pol === 'neg' ? v.negA[tense] : v[tense + 'A']) || {};

export function reflSplit(v, tense, pol) {
  const head = pol === 'neg' ? NEG_HEAD : '';
  const rest = Object.values(reflForms(v, tense, pol)).map((f) => f.slice(head.length));
  const infStem = v.inf.slice(0, -3);
  const stem = tense === 'fut' && rest.every((f) => f.startsWith(infStem)) ? infStem : boundedPrefix(rest);
  return { head, stem };
}

export function reflPredicate(v, tKey, tense, pol, pron) {
  const neg = pol === 'neg';
  const tr = v.trail;
  const trailNeg = neg && tr && tr.neg && tKey !== 'en';
  let words;
  if (tKey === 'en') {
    const base = enBase(v);
    const vp = tense === 'pres' ? (neg ? (pron.pi === 2 ? "doesn't " : "don't ") + base : v.g.en[pron.pi])
      : tense === 'past' ? (neg ? "didn't " + base : v.gp.en)
      : (neg ? "won't " : 'will ') + base;
    words = vp.split(' ');
  } else {
    const vp = tense === 'pres' ? v.g[tKey][pron.pi] : tense === 'past' ? v.pt[tKey][pastKey(pron.id)] : FUT_AUX[tKey][pron.pi] + ' ' + v[tKey];
    words = [...(neg && !trailNeg ? ['не'] : []), ...vp.split(' ')];
  }
  if (tr) words.push(trailNeg ? tr.neg[tKey] : tr[tKey]);
  return words;
}

const joinWords = (tKey, words) => (tKey === 'uk' ? ukPhrase(words) : words.join(' '));

export function reflPoolOk(state) {
  return REFL_POLS.some((p) => state.pols && state.pols[p]);
}

export function newReflTask(state, prev) {
  const lang = state.lang || 'uk';
  const tKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const tense = state.tense || 'pres';
  const tiers = reflTiersFor(tense);
  const tier = tiers[Math.min(state.level, tiers.length - 1)];

  const pols = REFL_POLS.filter((p) => state.pols && state.pols[p]);
  if (!pols.length) return null;
  const pol = rnd(pols);

  let vpool = tier.cue === 'plain' ? REFL_VERBS.filter((v) => v.plain) : REFL_VERBS;
  if (state.focusWordId) { const f = vpool.filter((v) => v.id === state.focusWordId); if (f.length) vpool = f; }
  if (prev && prev.wordId && vpool.length > 1) { const a = vpool.filter((v) => v.id !== prev.wordId); if (a.length) vpool = a; }
  const verb = rnd(vpool);

  const F = reflForms(verb, tense, pol);
  const shown = verb[tense].p3;
  let ppool = PRON_PERSON;
  if (tier.cue === 'p3') ppool = ppool.filter((p) => F[p.slot] !== shown);
  if (tier.only) ppool = ppool.filter((p) => p.slot === tier.only);
  if (state.focusPerson) { const f = ppool.filter((p) => p.slot === state.focusPerson); if (f.length) ppool = f; }
  if (prev && prev.pronId && ppool.length > 1) { const a = ppool.filter((p) => p.id !== prev.pronId); if (a.length) ppool = a; }
  const pron = rnd(ppool);

  const targetForm = F[pron.slot];
  const text = joinWords(tKey, [SRC_PRON[tKey][pron.id], ...reflPredicate(verb, tKey, tense, pol, pron)]);
  const plainCue = tier.cue === 'plain';
  const plainText = plainCue ? joinWords(tKey, [SRC_PRON[tKey][pron.id], ...reflPredicate(verb.plain, tKey, tense, pol, pron)]) : null;
  const split = reflSplit(verb, tense, pol);
  const head = split.head;
  const canPrefill = tier.prefill && !head;
  const stem = canPrefill && tier.cue === 'inf' ? commonPrefix([verb.inf, split.stem]) : split.stem;

  return {
    refl: true,
    wordId: verb.id,
    pronId: pron.id,
    person: pron.slot,
    number: pron.num,
    tense,
    pol,
    theme: 'all',
    prompt: { text: tier.cue === 'gloss' ? text : tier.cue === 'p3' ? shown : plainCue ? reflForms(verb.plain, tense, pol)[pron.slot] : verb.inf },
    promptA: tier.cue === 'p3' ? verb[tense + 'A'].p3 || null : plainCue ? reflAcc(verb.plain, tense, pol)[pron.slot] || null : null,
    leadA: PRON_A[pron.id] || null,
    trailA: verb.trail ? verb.trail.ltA : null,
    promptNote: tier.cue === 'gloss' ? null : text,
    hasNote: tier.cue !== 'gloss',
    wordUk: plainText,
    hasLead: true,
    lead: pron.lt,
    trail: verb.trail ? verb.trail.lt : null,
    hint: null,
    revealUk: tier.cue === 'gloss' ? null : text,
    stemPrefix: canPrefill ? stem : '',
    head,
    stem,
    tail: targetForm.slice(head.length + stem.length),
    targetForm,
    targetFormA: reflAcc(verb, tense, pol)[pron.slot] || null
  };
}
