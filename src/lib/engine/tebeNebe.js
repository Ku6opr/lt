import { VERBS, PRON_PERSON, SRC_PRON } from '../data/verbsConj.js';
import { TEBE } from '../data/verbsTebe.js';
import { ADJECTIVES } from '../data/adjectives.js';
import { PRONOUNS } from '../data/pronouns.js';
import { pastKey, ukPhrase } from './conjugation.js';

export const TEBE_TIERS = [
  { cue: 'plain' },
  { cue: 'inf' },
  { cue: 'gloss' }
];
export const TEBE_PREFIXES = ['tebe', 'nebe'];

const PRON_A = {};
for (const p of PRONOUNS) PRON_A[p.id] = (p.ltA || [])[0] || null;

const JAUNAS = ADJECTIVES.find((a) => a.id === 'jaunas');
const YOUNG_RU = { m: 'молод', f: 'молода', pl: 'молоды' };
const YOUNG_UK = { m: JAUNAS.ukM, f: JAUNAS.ukF, pl: JAUNAS.ukPl };

const rnd = (a) => a[Math.floor(Math.random() * a.length)];

function ltYoung(pron) {
  const g = pron.id === 'ji' || pron.id === 'jos' ? 'f' : 'm';
  const n = pron.num === 'pl' ? 'pl' : 'sg';
  return { lt: JAUNAS[g][n][0], ltA: (JAUNAS[g + 'A'] && JAUNAS[g + 'A'][n][0]) || null };
}

export function tebeHead(form, plain) {
  let k = 0;
  while (k < plain.length && form[form.length - 1 - k] === plain[plain.length - 1 - k]) k++;
  return form.slice(0, form.length - k);
}

function phrase(verb, tKey, pron, pfx) {
  const subj = SRC_PRON[tKey][pron.id];
  const buti = verb.id === 'buti';
  if (tKey === 'en') {
    const f = verb.g.en[pron.pi];
    const adv = pfx === 'tebe' ? 'still' : 'no longer';
    return subj + ' ' + (buti ? f + ' ' + adv + ' ' + JAUNAS.en : adv + ' ' + f);
  }
  const adv = tKey === 'ru' ? (pfx === 'tebe' ? ['всё', 'ещё'] : ['уже', 'не']) : (pfx === 'tebe' ? ['досі'] : ['вже', 'не']);
  const pred = buti ? (tKey === 'ru' ? YOUNG_RU : YOUNG_UK)[pastKey(pron.id)] : verb.g[tKey][pron.pi];
  const words = [subj, ...adv, ...pred.split(' ')];
  return tKey === 'uk' ? ukPhrase(words) : words.join(' ');
}

export function tebePoolOk() {
  return VERBS.some((v) => TEBE[v.id]);
}

export function newTebeTask(state, prev) {
  const lang = state.lang || 'uk';
  const tKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const tier = TEBE_TIERS[Math.min(state.level, TEBE_TIERS.length - 1)];

  let vpool = VERBS.filter((v) => TEBE[v.id]);
  if (!vpool.length) return null;
  if (state.focusWordId) { const f = vpool.filter((v) => v.id === state.focusWordId); if (f.length) vpool = f; }
  if (prev && prev.wordId && vpool.length > 1) { const a = vpool.filter((v) => v.id !== prev.wordId); if (a.length) vpool = a; }
  const verb = rnd(vpool);

  let ppool = PRON_PERSON;
  if (state.focusPerson) { const f = ppool.filter((p) => p.slot === state.focusPerson); if (f.length) ppool = f; }
  if (prev && prev.pronId && ppool.length > 1) { const a = ppool.filter((p) => p.id !== prev.pronId); if (a.length) ppool = a; }
  const pron = rnd(ppool);

  const pfx = state.focusPfx && TEBE_PREFIXES.includes(state.focusPfx) ? state.focusPfx : rnd(TEBE_PREFIXES);
  const T = TEBE[verb.id];
  const targetForm = T[pfx][pron.slot];
  const plain = verb.f[pron.slot];
  const head = tebeHead(targetForm, plain);
  const text = phrase(verb, tKey, pron, pfx);
  const young = verb.id === 'buti' ? ltYoung(pron) : null;

  return {
    tebe: true,
    wordId: verb.id,
    pronId: pron.id,
    person: pron.slot,
    number: pron.num,
    pfx,
    theme: 'all',
    prompt: { text: tier.cue === 'gloss' ? text : tier.cue === 'plain' ? plain : verb.inf },
    promptA: tier.cue === 'plain' ? (verb.fA && verb.fA[pron.slot]) || null : null,
    leadA: PRON_A[pron.id] || null,
    trailA: young ? young.ltA : null,
    promptNote: tier.cue === 'gloss' ? null : text,
    hasNote: tier.cue !== 'gloss',
    wordUk: null,
    hasLead: true,
    lead: pron.lt,
    trail: young ? young.lt : null,
    hint: null,
    revealUk: tier.cue === 'gloss' ? null : text,
    stemPrefix: '',
    head,
    stem: targetForm.slice(head.length),
    tail: '',
    targetForm,
    targetFormA: T[pfx + 'A'][pron.slot] || null
  };
}
