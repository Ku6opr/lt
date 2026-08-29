import { WORDS } from '../data/words.js';
import { ltGender } from './numerals.js';

const rnd = (a) => a[Math.floor(Math.random() * a.length)];

// Рівні: 0 — дано литовську лему питального слова (koks) + іменник, узгодь;
// 1 — лише питання джерельною мовою («какая книга?») — згадай слово І узгодь.
export const QUEST_TIERS = [
  { cue: 'lt' },
  { cue: 'native' }
];

// Питальні слова. lt: форми за родом×числом; невідмінювані — одна форма.
// kiek — керування: іменник у родовому (зліченні — мн., маси — одн.).
export const Q_WORDS = [
  {
    id: 'koks',
    lt: { m_sg: 'koks', f_sg: 'kokia', m_pl: 'kokie', f_pl: 'kokios' },
    src: { uk: { m: 'який', f: 'яка', n: 'яке', pl: 'які' }, ru: { m: 'какой', f: 'какая', n: 'какое', pl: 'какие' }, en: 'what' }
  },
  {
    id: 'kuris',
    lt: { m_sg: 'kuris', f_sg: 'kuri', m_pl: 'kurie', f_pl: 'kurios' },
    src: { uk: { m: 'котрий', f: 'котра', n: 'котре', pl: 'котрі' }, ru: { m: 'который', f: 'которая', n: 'которое', pl: 'которые' }, en: 'which' }
  },
  {
    id: 'kieno',
    invariant: true,
    lt: { m_sg: 'kieno', f_sg: 'kieno', m_pl: 'kieno', f_pl: 'kieno' },
    src: { uk: { m: 'чий', f: 'чия', n: 'чиє', pl: 'чиї' }, ru: { m: 'чей', f: 'чья', n: 'чьё', pl: 'чьи' }, en: 'whose' }
  },
  {
    id: 'kiek',
    kiek: true,
    lt: { m_sg: 'kiek', f_sg: 'kiek', m_pl: 'kiek', f_pl: 'kiek' },
    src: { uk: { m: 'скільки', f: 'скільки', n: 'скільки', pl: 'скільки' }, ru: { m: 'сколько', f: 'сколько', n: 'сколько', pl: 'сколько' }, en: 'how many' }
  }
];
const QW_BY_ID = {};
for (const q of Q_WORDS) QW_BY_ID[q.id] = q;

// Семантика пар: kuris — вибір серед зліченних предметів, kieno — те, чим володіють.
const nounPool = (qw) => WORDS.filter((w) => {
  if (qw.kiek) return !w.cat.includes('abstract');
  if (qw.id === 'kuris') return !w.mass && !w.cat.some((c) => ['abstract', 'time'].includes(c));
  if (qw.id === 'kieno') return !w.mass && !w.cat.some((c) => ['nature', 'time', 'abstract'].includes(c));
  return true;
});

const srcG = (w, tKey) => (tKey === 'en' ? 'm' : (tKey === 'ru' ? w.ruG : w.ukG) || 'm');
const srcNoun = (w, tKey, num) => {
  if (tKey === 'en') return num === 'pl' ? w.enPl || w.en : w.en;
  if (num === 'pl') return (tKey === 'ru' ? w.ruPl : w.ukPl) || w[tKey];
  return w[tKey];
};

function pickNumber(qw, w) {
  if (qw.kiek) return w.mass || w.num === 'sg' ? 'sg' : 'pl';
  if (w.mass) return 'sg';
  if (w.num === 'pl') return 'pl';
  if (w.num === 'sg') return 'sg';
  return Math.random() < 0.5 ? 'sg' : 'pl';
}

// джерельне питання: «какая книга?» / «сколько книг?» / «сколько молока?»
function srcQuestion(qw, w, tKey, num) {
  const g = num === 'pl' ? 'pl' : srcG(w, tKey);
  if (qw.kiek) {
    const gen = num === 'pl' ? (tKey === 'ru' ? w.ruPlForms : w.ukPlForms) : (tKey === 'ru' ? w.ruForms : w.ukForms);
    if (tKey === 'en') return (num === 'sg' ? 'how much ' : 'how many ') + srcNoun(w, tKey, num) + '?';
    return qw.src[tKey][g] + ' ' + (gen ? gen.gen : srcNoun(w, tKey, num)) + '?';
  }
  if (tKey === 'en') return qw.src.en + ' ' + srcNoun(w, tKey, num) + '?';
  return qw.src[tKey][g] + ' ' + srcNoun(w, tKey, num) + '?';
}

export function questPoolOk(state) {
  const on = state.qws || {};
  return Q_WORDS.some((q) => on[q.id]);
}

export function newQuestTask(state, prev) {
  const lang = state.lang || 'uk';
  const tKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const tiers = QUEST_TIERS;
  const tier = tiers[Math.min(state.level, tiers.length - 1)];
  const on = state.qws || {};

  // на рівні з показаною лемою (koks) не питаємо форму, що дорівнює показаній:
  // ч.одн. = лема; невідмінювані (kieno) цілком тривіальні — лише на рівні 1
  let qpool = Q_WORDS.filter((q) => on[q.id]);
  if (tier.cue === 'lt') qpool = qpool.filter((q) => !q.invariant);
  if (!qpool.length) return null;
  if (state.focusQw) { const f = qpool.filter((q) => q.id === state.focusQw); if (f.length) qpool = f; }
  if (prev && prev.qw && qpool.length > 1) { const a = qpool.filter((q) => q.id !== prev.qw); if (a.length) qpool = a; }
  const qw = rnd(qpool);

  let pool = nounPool(qw);
  if (state.focusWordId) { const f = pool.filter((w) => w.id === state.focusWordId); if (f.length) pool = f; }
  if (prev && prev.wordId && pool.length > 1) { const a = pool.filter((w) => w.id !== prev.wordId); if (a.length) pool = a; }

  for (let i = 0; i < 40; i++) {
    const w = rnd(pool);
    const num = pickNumber(qw, w);
    const ltg = ltGender(w);
    const slot = ltg + '_' + num;

    let targetForm, targetFormA, lead, leadA, trail, trailA;
    if (qw.kiek) {
      targetForm = num === 'pl' ? w.pl[1] : w.sg[1];
      targetFormA = num === 'pl' ? (w.plA || [])[1] || null : (w.sgA || [])[1] || null;
      lead = 'kiek';
      leadA = null;
      trail = '?';
      trailA = null;
    } else {
      targetForm = qw.lt[slot];
      targetFormA = null;
      lead = null;
      leadA = null;
      trail = (num === 'pl' ? w.pl[0] : w.sg[0]) + '?';
      const tAcc = (num === 'pl' ? (w.plA || [])[0] : (w.sgA || [])[0]) || null;
      trailA = tAcc ? tAcc + '?' : null;
    }

    const shown = tier.cue === 'lt' ? (qw.kiek ? (num === 'pl' ? w.pl[0] : w.sg[0]) : qw.lt.m_sg) : null;
    if (shown && shown === targetForm) continue;

    const question = srcQuestion(qw, w, tKey, num);
    const prompt = tier.cue === 'lt' ? shown : question;
    const note = tier.cue === 'lt'
      ? (qw.kiek ? srcNoun(w, tKey, num) : qw.src[tKey] && (tKey === 'en' ? qw.src.en : qw.src[tKey].m))
      : null;

    return {
      quest: true,
      qw: qw.id,
      wordId: w.id,
      g: ltg,
      number: num,
      theme: 'all',
      prompt: { text: prompt },
      promptA: tier.cue === 'lt' && qw.kiek ? (num === 'pl' ? (w.plA || [])[0] : (w.sgA || [])[0]) || null : null,
      leadA,
      trailA,
      promptNote: note,
      hasNote: !!note,
      wordUk: null,
      hasLead: !!lead,
      lead,
      trail,
      hint: null,
      revealUk: tier.cue === 'lt' ? question : null,
      stemPrefix: '',
      stem: targetForm,
      tail: '',
      targetForm,
      targetFormA
    };
  }
  return null;
}
