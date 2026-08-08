import { CASES } from '../data/cases.js';
import { PRONOUNS, PRON_DRIVERS, EN_OBJ } from '../data/pronouns.js';
import { PHRASE_TIERS } from '../data/levels.js';
import { UI } from '../i18n/ui.js';
import { idx } from './stem.js';

const OBLIQUE = ['K', 'N', 'G', 'In', 'Vt'];
const rnd = (a) => a[Math.floor(Math.random() * a.length)];

export function pronounPoolOk(state) {
  const cs = OBLIQUE.some((c) => state.cases[c]);
  const nums = ['sg', 'pl'].some((n) => state.numbers[n]);
  return cs && nums;
}

export function newPronounTask(state, prev) {
  const lang = state.lang || 'uk';
  const tKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const nums = ['sg', 'pl'].filter((n) => state.numbers[n]);
  let pool = PRONOUNS.filter((p) => nums.includes(p.num));
  if (!pool.length) pool = PRONOUNS;

  let pick = pool;
  if (prev && prev.wordId && pool.length > 1) { const a = pool.filter((p) => p.id !== prev.wordId); if (a.length) pick = a; }
  const pron = rnd(pick);

  let cpool = OBLIQUE.filter((c) => state.cases[c]);
  if (!cpool.length) cpool = OBLIQUE.slice();
  if (prev && prev.caseId && cpool.length > 1) { const a = cpool.filter((c) => c !== prev.caseId); if (a.length) cpool = a; }
  const caseId = rnd(cpool);

  const ci = idx(caseId);
  const target = CASES.find((c) => c.id === caseId);
  const targetForm = pron.lt[ci];
  const U = UI[lang];
  const tier = PHRASE_TIERS[Math.min(state.level, PHRASE_TIERS.length - 1)];
  const useTr = tier.prompt === 'uk' || (tier.prompt === 'mix' && Math.random() < 0.5);

  const drivers = PRON_DRIVERS[caseId] || [];
  let driver = drivers.length ? rnd(drivers) : null;
  if (driver && prev && prev.driver && drivers.length > 1) {
    const a = drivers.filter((d) => d.lt !== prev.driver); if (a.length) driver = rnd(a);
  }

  const usePrep = driver && driver.pos === 'pre';
  const src = usePrep && pron[tKey + 'P'] ? pron[tKey + 'P'] : pron[tKey];
  const pronBare = lang === 'en' ? EN_OBJ[pron.id] : src[ci];
  const phrase = driver ? driver.tpl[lang].replace('{p}', pronBare) : pron[tKey][ci];
  const qLoc = lang === 'ru' ? target.qRu : lang === 'en' ? target.qEn : target.qUk;
  const qStr = lang === 'en' ? '(' + qLoc + ')' : '(' + qLoc + ' / ' + target.q + ')';

  return {
    caseId,
    driver: driver ? driver.lt : null,
    wordId: pron.id,
    typeId: 'pron',
    number: pron.num,
    theme: 'all',
    prompt: useTr ? { text: pron[tKey][0] } : { text: pron.lt[0] },
    promptA: useTr ? null : (pron.ltA || [])[0] || null,
    leadA: null,
    trailA: null,
    promptNote: U.caseNames[caseId],
    hasNote: true,
    wordUk: null,
    hasLead: !!(driver && driver.pos === 'pre'),
    lead: driver && driver.pos === 'pre' ? driver.lt : null,
    trail: driver && driver.pos === 'post' ? driver.lt : null,
    hint: tier.hint === 'fullq' ? phrase + ' ' + qStr : tier.hint === 'q' ? qStr : null,
    revealUk: tier.hint === 'fullq' ? null : phrase,
    stemPrefix: '',
    stem: targetForm,
    tail: '',
    targetForm,
    targetFormA: (pron.ltA || [])[ci]
  };
}
