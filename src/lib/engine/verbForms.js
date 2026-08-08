import { VERBS, SRC_PRON } from '../data/verbsConj.js';
import { boundedPrefix } from './stem.js';

const rnd = (a) => a[Math.floor(Math.random() * a.length)];

// Відповідь завжди «jis + теперішній». Рівні — скільки литовської опори у питанні:
// 0 — всі три форми (dirbti · dirba · dirbo, експозиція форм; матеріали не потрібні);
// 1 — лише інфінітив; 2 — лише переклад рідною мовою.
export const VF_TIERS = [
  { cue: 'all3' },
  { cue: 'inf' },
  { cue: 'gloss' }
];

export function vformsPoolOk() {
  return true;
}

export function newVFormsTask(state, prev) {
  const lang = state.lang || 'uk';
  const tKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const tier = VF_TIERS[Math.min(state.level, VF_TIERS.length - 1)];

  let vpool = VERBS.filter((v) => v.p3p);
  if (!vpool.length) vpool = VERBS.slice();
  if (prev && prev.wordId && vpool.length > 1) { const a = vpool.filter((v) => v.id !== prev.wordId); if (a.length) vpool = a; }
  const verb = rnd(vpool);

  const targetForm = verb.f.p3;
  const he = SRC_PRON[tKey].jis;
  const phrase = he + ' ' + verb.g[tKey][2];

  const promptText =
    tier.cue === 'all3' ? verb.inf + ' · ' + verb.f.p3 + ' · ' + (verb.p3p || '') :
    tier.cue === 'inf' ? verb.inf :
    verb[tKey];

  const trio = [verb.inf, verb.f.p3, verb.p3p || verb.f.p3];
  const pref = boundedPrefix(trio);
  const stem = pref.length >= 2 ? pref : targetForm;
  const tail = pref.length >= 2 ? targetForm.slice(pref.length) : '';

  return {
    vforms: true,
    formTarget: 'pres',
    wordId: verb.id,
    theme: 'all',
    number: 'sg',
    prompt: { text: promptText },
    promptA: null,
    leadA: null,
    trailA: null,
    promptNote: tier.cue === 'gloss' ? null : verb[tKey],
    hasNote: tier.cue !== 'gloss',
    wordUk: null,
    hasLead: true,
    lead: 'jis',
    trail: null,
    hint: null,
    revealUk: phrase,
    stemPrefix: '',
    stem,
    tail,
    targetForm,
    targetFormA: (verb.fA && verb.fA.p3) || null
  };
}
