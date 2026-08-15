import { CASES } from '../data/cases.js';
import { DEM_PRONOUNS } from '../data/demPronouns.js';
import { WORDS } from '../data/words.js';
import { ltGender, srcG, stripPrep, nounSrc } from './numerals.js';
import { idx, boundedPrefix } from './stem.js';

const OBLIQUE = ['K', 'N', 'G', 'In', 'Vt'];
const rnd = (a) => a[Math.floor(Math.random() * a.length)];

const WITH_F = DEM_PRONOUNS.filter((p) => p.f);

// іменник для контексту; у знахідному — лише НЕістотовий (інакше глос джерельною мовою
// вимагав би істотових форм займенника, яких у даних нема).
// Семантика пар: pats — лише з істотами («сам учитель», не «сам ранок»),
// visas — лише з неістотами («все місто», не «весь лікар»).
// істотовість: у ж.р. одн. вин.≠род., тому дивимось і множину (у істот мн. вин.=род.)
const isAnim = (n) =>
  (n.ukForms && n.ukForms.acc === n.ukForms.gen) ||
  (n.ukPlForms && n.ukPlForms.acc === n.ukPlForms.gen);
// маси допустимі в однині («вся земля»), але не у множині («всі капусти»)
const NOUN_POOL = WORDS.filter((w) => w.num !== 'pl');
const canPl = (n) => n.num === 'both' && n.pl && n.pl.length === 6 && !n.mass;
function pickNoun(caseId, pronId) {
  for (let i = 0; i < 30; i++) {
    const n = rnd(NOUN_POOL);
    if (caseId === 'G' && isAnim(n)) continue;
    if (pronId === 'pats' && caseId !== 'G' && !isAnim(n)) continue;
    if (pronId === 'visas' && isAnim(n)) continue;
    return n;
  }
  return rnd(NOUN_POOL);
}

function srcPron(p, lang, gSrc, number, ci) {
  if (lang === 'en') return p.en;
  const t = lang === 'ru' ? p.ru : p.uk;
  if (number === 'sg' && gSrc === 'n' && t.n) return t.n.sg[ci];
  const g = t[srcG(gSrc)] || t.m;
  return g[number][ci];
}

// ── Урок А: узгодження у називному (kitas namas, kita knyga, kiti namai) ──
// Дві чесні сходинки: 0 — дано литовську цитату (лише узгодь); 1 — лише переклад
// (згадай слово І узгодь). Проміжна «переклад + фраза-підказка» була дублем:
// фраза повторювала показане і нічого не знімала.
export const DEMNOM_TIERS = [
  { cue: 'lt' },
  { cue: 'tr' }
];

export function demNomPoolOk() {
  return WITH_F.length > 0;
}

export function newDemNomTask(state, prev) {
  const lang = state.lang || 'uk';
  const tier = DEMNOM_TIERS[Math.min(state.level, DEMNOM_TIERS.length - 1)];

  let pool = WITH_F;
  if (state.focusWordId) { const f = pool.filter((p) => p.id === state.focusWordId); if (f.length) pool = f; }
  let pick = pool;
  if (prev && prev.wordId && pool.length > 1) { const a = pool.filter((p) => p.id !== prev.wordId); if (a.length) pick = a; }
  const p = rnd(pick);

  // цитата = m.sg називний: при литовському промпті ціль m.sg заборонена (відповідь = показаному)
  let noun, gender, number;
  for (let i = 0; i < 40; i++) {
    noun = pickNoun('V', p.id);
    gender = ltGender(noun);
    number = canPl(noun) ? rnd(['sg', 'pl']) : 'sg';
    if (tier.cue === 'lt' && gender === 'm') {
      if (canPl(noun)) number = 'pl';
      else continue;
    }
    break;
  }

  const targetForm = p[gender][number][0];
  const acc = gender === 'm' ? p.mA : p.fA;
  const targetFormA = acc && acc[number] ? acc[number][0] || null : null;
  const nounForm = number === 'sg' ? noun.sg[0] : noun.pl[0];
  const nounA = number === 'sg' ? (noun.sgA || [])[0] : (noun.plA || [])[0];

  const gSrc = lang === 'ru' ? noun.ruG : noun.ukG;
  const pronSrc = srcPron(p, lang, gSrc, number, 0);
  const nSrc = nounSrc(noun, lang, number, 'V');
  const phrase = pronSrc + ' ' + nSrc;
  const trBase = lang === 'en' ? p.en : pronSrc;

  return {
    dem: true,
    wordId: p.id,
    gender,
    caseId: 'V',
    theme: 'all',
    number,
    prompt: { text: tier.cue === 'lt' ? p.lt : trBase },
    promptA: tier.cue === 'lt' ? (p.mA && p.mA.sg ? p.mA.sg[0] || null : null) : null,
    leadA: null,
    trailA: nounA || null,
    promptNote: tier.cue === 'lt' ? (lang === 'en' ? p.en : pronSrc) : null,
    hasNote: tier.cue === 'lt',
    wordUk: null,
    hasLead: false,
    lead: null,
    trail: nounForm,
    hint: null,
    revealUk: phrase,
    stemPrefix: '',
    stem: targetForm,
    tail: '',
    targetForm,
    targetFormA
  };
}

// ── Урок Б: відмінювання (tas → ___ knygoms → toms) ──
// 0 — цитата + повний глос; 1 — цитата + питання; 2 — цитата без підказок;
// 3 — ПЕРЕКЛАД: дано лише джерельну форму у відмінку («тим») — згадай слово і провідміняй
export const DEMCASE_TIERS = [
  { hint: 'fullq' },
  { hint: 'q' },
  { hint: null },
  { cue: 'tr' }
];

// групи за зразком відмінювання (як стовпці шпаргалки/підручника)
export const DEM_GROUP = {
  tas: 'tas', sitas: 'tas', anas: 'tas',
  kitas: 'kitas', visas: 'kitas',
  toks: 'toks', joks: 'toks', visoks: 'toks',
  kuris: 'kuris', sis: 'kuris',
  pats: 'pats'
};
export const DEM_GROUPS = [
  { id: 'tas', label: 'tas, šitas, anas' },
  { id: 'kitas', label: 'kitas, visas' },
  { id: 'toks', label: 'toks, joks, visoks' },
  { id: 'kuris', label: 'kuris, šis' },
  { id: 'pats', label: 'pats' }
];

export function demCasePoolOk(state) {
  const cs = OBLIQUE.some((c) => state.cases[c]);
  const gs = !state.types || DEM_GROUPS.some((g) => state.types[g.id]);
  const ns = !state.numbers || !!(state.numbers.sg || state.numbers.pl);
  return !!(cs && gs && ns);
}

export function newDemCaseTask(state, prev) {
  const lang = state.lang || 'uk';
  const tier = DEMCASE_TIERS[Math.min(state.level, DEMCASE_TIERS.length - 1)];

  // kas виключено: без іменника відмінок сигналило б лише питання,
  // а литовське питання (ko? kam?) — це і Є відмінена форма kas = відповідь
  let pool = WITH_F;
  if (state.types && DEM_GROUPS.some((g) => state.types[g.id])) {
    const f = pool.filter((x) => state.types[DEM_GROUP[x.id]]);
    if (f.length) pool = f;
  }
  if (state.focusWordId) { const f = pool.filter((p) => p.id === state.focusWordId); if (f.length) pool = f; }
  let pick = pool;
  if (prev && prev.wordId && pool.length > 1) { const a = pool.filter((x) => x.id !== prev.wordId); if (a.length) pick = a; }
  const p = rnd(pick);

  let cpool = OBLIQUE.filter((c) => state.cases[c]);
  if (!cpool.length) cpool = OBLIQUE.slice();
  // pats вимагає істот, а знахідний істот у глосі неможливий → для pats знахідний виключено
  if (p.id === 'pats' && cpool.length > 1) { const noG = cpool.filter((c) => c !== 'G'); if (noG.length) cpool = noG; }

  const wants = ['sg', 'pl'].filter((n) => !state.numbers || state.numbers[n]);
  let noun, number;
  for (let i = 0; i < 40; i++) {
    noun = pickNoun(cpool.includes('G') ? 'G' : 'V', p.id);
    const nums = wants.filter((n) => (n === 'sg' ? true : canPl(noun)));
    if (!nums.length) continue;
    number = rnd(nums);
    break;
  }
  if (!number) number = 'sg';
  const gender = ltGender(noun);
  const forms = p[gender][number];

  // не питати відмінок, чия форма = показаній цитаті (m.sg називний)
  const a = cpool.filter((c) => forms[idx(c)] !== p.lt);
  if (a.length) cpool = a;
  if (prev && prev.caseId && cpool.length > 1) { const b = cpool.filter((c) => c !== prev.caseId); if (b.length) cpool = b; }
  const caseId = rnd(cpool);
  const ci = idx(caseId);
  const target = CASES.find((c) => c.id === caseId);
  const targetForm = forms[ci];
  const nounForm = number === 'sg' ? noun.sg[ci] : noun.pl[ci];
  const nounA = number === 'sg' ? (noun.sgA || [])[ci] : (noun.plA || [])[ci];

  const pref = boundedPrefix(forms);
  const stem = pref.length >= 2 ? pref : targetForm;
  const tail = pref.length >= 2 ? targetForm.slice(pref.length) : '';

  const gSrc = lang === 'ru' ? noun.ruG : noun.ukG;
  const pronSrc = srcPron(p, lang, gSrc, number, ci);
  const nSrc = nounSrc(noun, lang, number, caseId);
  // повний глос уже містить відмінок (іменник стоїть у ньому) — питання додаємо лише на q-рівні
  const gloss = caseId === 'Vt' ? pronSrc + ' ' + stripPrep(nSrc) : pronSrc + ' ' + nSrc;
  const qLoc = lang === 'ru' ? target.qRu : lang === 'en' ? target.qEn : target.qUk;
  const qStr = lang === 'en' ? '(' + qLoc + ')' : '(' + qLoc + ' / ' + target.q + ')';
  const accG = gender === 'm' ? p.mA : p.fA;
  const toLt = tier.cue === 'tr';

  return {
    dem: true,
    wordId: p.id,
    gender,
    caseId,
    theme: 'all',
    number,
    prompt: { text: toLt ? pronSrc : p.lt },
    promptA: toLt ? null : p.mA && p.mA.sg ? p.mA.sg[0] || null : null,
    leadA: null,
    trailA: nounA,
    promptNote: toLt ? null : lang === 'en' ? p.en : srcPron(p, lang, 'm', 'sg', 0),
    hasNote: !toLt && tier.hint !== 'fullq',
    wordUk: null,
    hasLead: false,
    lead: null,
    trail: nounForm,
    hint: tier.hint === 'fullq' ? gloss : tier.hint === 'q' ? qStr : null,
    revealUk: tier.hint === 'fullq' ? null : gloss,
    stemPrefix: '',
    stem,
    tail,
    targetForm,
    targetFormA: accG && accG[number] ? accG[number][ci] || null : null
  };
}
