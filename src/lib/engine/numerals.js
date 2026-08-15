import { CASES } from '../data/cases.js';
import { NUMERALS, TEENS } from '../data/numerals.js';
import { WORDS } from '../data/words.js';
import { idx, boundedPrefix } from './stem.js';

const OBLIQUE = ['K', 'N', 'G', 'In', 'Vt'];
const rnd = (a) => a[Math.floor(Math.random() * a.length)];
export const FEM_LT = new Set(['a', 'ia', 'e', 'is_f', 'uo_f']);
const CASEKEY = { V: 'nom', K: 'gen', N: 'dat', G: 'acc', In: 'ins', Vt: 'loc' };

// лічильні іменники: мають множину, не singularia tantum і не маси/збірні
// (маси кшталту «капуста/варення» дають кашу в рахунку: «п'ять капуст»)
export const COUNTABLE = WORDS.filter((w) => w.num === 'both' && w.pl && w.pl.length === 6 && !w.mass);

export const srcG = (g) => (g === 'f' ? 'f' : 'm');
// литовський рід іменника: тип відміни, АЛЕ з винятками (dėdė — ч.р. попри -ė;
// dantis — ч.р. попри i-відміну)
const MASC_EXC = new Set(['dėdė', 'dantis']);
export const ltGender = (w) => (MASC_EXC.has(w.id) ? 'm' : FEM_LT.has(w.type) ? 'f' : 'm');
export const stripPrep = (s) => (s || '').replace(/^(у|в|об|о|на)\s+/, '');

// іменник джерельною мовою у потрібній формі (мн. непрямі — з ukPlForms/ruPlForms)
export function nounSrc(noun, lang, number, caseId) {
  const key = CASEKEY[caseId];
  if (lang === 'en') return number === 'pl' ? noun.enPl || noun.en : noun.en;
  const f = lang === 'ru' ? 'ru' : 'uk';
  if (number === 'sg') return caseId === 'V' ? noun[f] : (noun[f + 'Forms'] || {})[key] || noun[f];
  if (caseId === 'V') return noun[f + 'Pl'] || noun[f];
  const pf = noun[f + 'PlForms'];
  return (pf && pf[key]) || noun[f + 'Pl'] || noun[f];
}

// ── Урок Б: відмінювання 1–9 з іменником-контекстом ──
// Промпт — ЦИФРА (мовна вісь «du↔два» для чисел косметична: число очевидне в обидва боки),
// тому і знахідний 2–9 (du=du) тренується чесно. Рівні — лише реальна вісь підказки.
export const NUM_TIERS = [
  { hint: 'fullq' },
  { hint: 'q' },
  { hint: null }
];

export function numeralPoolOk(state) {
  return OBLIQUE.some((c) => state.cases[c]);
}

export function newNumeralTask(state, prev) {
  const lang = state.lang || 'uk';
  const tier = NUM_TIERS[Math.min(state.level, NUM_TIERS.length - 1)];

  let pool = NUMERALS.slice();
  if (state.focusWordId) { const f = pool.filter((n) => n.id === state.focusWordId); if (f.length) pool = f; }
  let pick = pool;
  if (prev && prev.wordId && pool.length > 1) { const a = pool.filter((n) => n.id !== prev.wordId); if (a.length) pick = a; }
  const num = rnd(pick);

  const noun = rnd(COUNTABLE);
  const gender = ltGender(noun);
  const number = num.id === '1' ? 'sg' : 'pl';
  const forms = num[gender];

  let cpool = OBLIQUE.filter((c) => state.cases[c]);
  if (!cpool.length) cpool = OBLIQUE.slice();
  if (prev && prev.caseId && cpool.length > 1) { const a = cpool.filter((c) => c !== prev.caseId); if (a.length) cpool = a; }
  const caseId = rnd(cpool);
  const ci = idx(caseId);
  const target = CASES.find((c) => c.id === caseId);
  const targetForm = forms[ci];
  const nounForm = number === 'sg' ? noun.sg[ci] : noun.pl[ci];

  const pref = boundedPrefix(forms);
  const stem = pref.length >= 2 ? pref : targetForm;
  const tail = pref.length >= 2 ? targetForm.slice(pref.length) : '';

  const sg2 = srcG(noun.ukG);
  const rg2 = srcG(noun.ruG);
  // Знахідний джерельною мовою живе за ЇЇ правилами кількости, не узгодженням:
  // істоти 1–4 → числ. у РОДОВІЙ («одного лебедя», «двух собак»); інакше — конструкція
  // називного («два дома», «сім будинків», «пять кошек» — у 5+ істотність не діє).
  const srcPair = () => {
    if (lang === 'en') return num.en + ' ' + nounSrc(noun, lang, number, caseId);
    const g2 = lang === 'ru' ? rg2 : sg2;
    const arr = (lang === 'ru' ? num.ru : num.uk)[g2];
    if (caseId === 'G') {
      const fx = lang === 'ru' ? noun.ruForms : noun.ukForms;
      const pfx = lang === 'ru' ? noun.ruPlForms : noun.ukPlForms;
      const anim = number === 'sg' ? fx && fx.acc && fx.acc === fx.gen : pfx && pfx.acc && pfx.acc === pfx.gen;
      if (anim && Number(num.id) <= 4) return arr[1] + ' ' + nounSrc(noun, lang, number, 'G');
      return arr[0] + ' ' + qtyNounSrc(noun, num, lang);
    }
    const nSrc = nounSrc(noun, lang, number, caseId);
    return arr[ci] + ' ' + (caseId === 'Vt' ? stripPrep(nSrc) : nSrc);
  };
  const gloss = srcPair();
  const qLoc = lang === 'ru' ? target.qRu : lang === 'en' ? target.qEn : target.qUk;
  const qStr = lang === 'en' ? '(' + qLoc + ')' : '(' + qLoc + ' / ' + target.q + ')';
  const accForms = gender === 'm' ? num.mA : num.fA;
  const nounA = number === 'sg' ? (noun.sgA || [])[ci] : (noun.plA || [])[ci];
  const nounGloss = lang === 'en' ? noun.en : lang === 'ru' ? noun.ru : noun.uk;

  return {
    numeral: true,
    caseId,
    gender,
    wordId: num.id,
    theme: 'all',
    number,
    prompt: { text: num.id },
    promptA: null,
    leadA: null,
    trailA: nounA || null,
    promptNote: tier.hint === 'fullq' ? null : nounGloss,
    hasNote: tier.hint !== 'fullq',
    wordUk: null,
    hasLead: false,
    lead: null,
    trail: nounForm,
    hint: tier.hint === 'fullq' ? gloss + ' ' + qStr : tier.hint === 'q' ? qStr : null,
    revealUk: tier.hint === 'fullq' ? null : gloss,
    stemPrefix: '',
    stem,
    tail,
    targetForm,
    targetFormA: (accForms || [])[ci] || null
  };
}

// ── Урок А: кількість 1–20 у називному (vienas namas / du namai / dešimt namų) ──
// Чесна драбина: 0 — цифра → ЧИСЛО (іменник дано); 1 — число дано → ФОРМА іменника;
// 2 — цифра + цитатна форма → уся пара («septyni namai»)
export const NUMQ_TIERS = [
  { cue: 'num' },
  { cue: 'noun' },
  { cue: 'both' }
];

const QTY_POOL = () => [...NUMERALS.map((n) => ({ ...n, kind: 'unit' })), ...TEENS.map((n) => ({ ...n, kind: 'teen' }))];

// іменник при числі: 1 → одн. називний; 2–9 → мн. називний; 10–20 → мн. РОДОВИЙ
function qtyNounLt(noun, num) {
  if (num.id === '1') return { form: noun.sg[0], a: (noun.sgA || [])[0], number: 'sg', ci: 0 };
  if (num.kind === 'teen') return { form: noun.pl[1], a: (noun.plA || [])[1], number: 'pl', ci: 1 };
  return { form: noun.pl[0], a: (noun.plA || [])[0], number: 'pl', ci: 0 };
}

// джерельною мовою — за ЇЇ правилами: uk 2–4 наз. мн., 5+ род. мн.; ru 2–4 род. одн., 5+ род. мн.
function qtyNounSrc(noun, num, lang) {
  const n = Number(num.id);
  if (lang === 'en') return n === 1 ? noun.en : noun.enPl || noun.en;
  const f = lang === 'ru' ? 'ru' : 'uk';
  if (n === 1) return noun[f];
  if (lang === 'ru') {
    if (n <= 4) return (noun.ruForms || {}).gen || noun.ruPl;
    return (noun.ruPlForms || {}).gen || noun.ruPl;
  }
  if (n <= 4) return noun.ukPl;
  return (noun.ukPlForms || {}).gen || noun.ukPl;
}

export function numQtyPoolOk() {
  return QTY_POOL().length > 0;
}

export function newNumQtyTask(state, prev) {
  const lang = state.lang || 'uk';
  const tier = NUMQ_TIERS[Math.min(state.level, NUMQ_TIERS.length - 1)];

  let pool = QTY_POOL();
  // «1» на рівні форми іменника тривіальне: форма = цитатній
  if (tier.cue === 'noun') pool = pool.filter((n) => n.id !== '1');
  if (state.focusWordId) { const f = pool.filter((n) => n.id === state.focusWordId); if (f.length) pool = f; }
  let pick = pool;
  if (prev && prev.wordId && pool.length > 1) { const a = pool.filter((n) => n.id !== prev.wordId); if (a.length) pick = a; }
  const num = rnd(pick);

  const noun = rnd(COUNTABLE);
  const gender = ltGender(noun);
  const nl = qtyNounLt(noun, num);

  const numLt = num.kind === 'teen' ? num.lt : num[gender][0];
  const numLtA = num.kind === 'teen' ? num.ltA || null : ((gender === 'm' ? num.mA : num.fA) || [])[0] || null;

  const sg2 = srcG(noun.ukG);
  const rg2 = srcG(noun.ruG);
  const numSrc = num.kind === 'teen'
    ? (lang === 'en' ? num.en : lang === 'ru' ? num.ru : num.uk)
    : (lang === 'en' ? num.en : lang === 'ru' ? num.ru[rg2][0] : num.uk[sg2][0]);
  const gloss = numSrc + ' ' + qtyNounSrc(noun, num, lang);
  const nounGloss = lang === 'en' ? noun.en : lang === 'ru' ? noun.ru : noun.uk;

  const base = {
    numqty: true,
    wordId: num.id,
    gender,
    caseId: 'V',
    theme: 'all',
    number: nl.number,
    promptA: null,
    leadA: null,
    trailA: null,
    wordUk: null,
    hasLead: false,
    lead: null,
    trail: null,
    hint: null,
    revealUk: gloss,
    stemPrefix: ''
  };

  if (tier.cue === 'num') {
    return {
      ...base,
      prompt: { text: num.id },
      promptNote: null,
      hasNote: false,
      trail: nl.form,
      trailA: nl.a || null,
      stem: numLt,
      tail: '',
      targetForm: numLt,
      targetFormA: numLtA
    };
  }
  if (tier.cue === 'noun') {
    return {
      ...base,
      prompt: { text: noun.sg[0] },
      promptA: (noun.sgA || [])[0] || null,
      promptNote: nounGloss,
      hasNote: true,
      hasLead: true,
      lead: numLt,
      leadA: numLtA,
      stem: nl.form,
      tail: '',
      targetForm: nl.form,
      targetFormA: nl.a || null
    };
  }
  const pairA = numLtA && nl.a ? numLtA + ' ' + nl.a : null;
  return {
    ...base,
    prompt: { text: num.id + ' ' + noun.sg[0] },
    promptNote: nounGloss,
    hasNote: true,
    stem: numLt + ' ' + nl.form,
    tail: '',
    targetForm: numLt + ' ' + nl.form,
    targetFormA: pairA
  };
}
