import { CASES } from '../data/cases.js';
import { WORDS } from '../data/words.js';
import { DECLENSIONS } from '../data/declensions.js';
import { LEVELS, PHRASE_TIERS } from '../data/levels.js';
import { PREPS } from '../data/prepositions.js';
import { VERBS } from '../data/verbs.js';
import { PHRASES } from '../data/phrases.js';
import { UI } from '../i18n/ui.js';
import { idx, stemOf } from './stem.js';

const CASEKEY = { V: 'nom', K: 'gen', N: 'dat', G: 'acc', In: 'ins', Vt: 'loc' };
function langBits(state) {
  const lang = state.lang || 'uk';
  return {
    lang,
    tKey: lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk',
    qKey: lang === 'ru' ? 'qRu' : lang === 'en' ? 'qEn' : 'qUk',
    U: UI[lang]
  };
}
function nounForm(word, key, number, lang) {
  if (lang === 'en') return number === 'pl' ? word.enPl || word.en : word.en;
  if (number === 'pl') {
    const nomPl = lang === 'ru' ? word.ruPl : word.ukPl;
    if (key === 'nom') return nomPl;
    const pf = lang === 'ru' ? word.ruPlForms : word.ukPlForms;
    return (pf && pf[key]) || nomPl;
  }
  return (lang === 'ru' ? word.ruForms : word.ukForms)[key];
}
function caseQ(target, lang) {
  const loc = lang === 'ru' ? target.qRu : lang === 'en' ? target.qEn : target.qUk;
  return lang === 'en' ? '(' + loc + ')' : '(' + loc + ' / ' + target.q + ')';
}

function rnd(a) {
  return a[Math.floor(Math.random() * a.length)];
}

function inTheme(w, theme) {
  return !theme || theme === 'all' || (w.themes && w.themes.includes(theme));
}

export function poolOk(state) {
  if (PHRASES[state.theme] && PHRASES[state.theme].length) return true;
  return CASES.some((c) => state.cases[c.id]) && WORDS.some((w) => state.types[w.type] && inTheme(w, state.theme)) && (state.numbers.sg || state.numbers.pl);
}

function phraseTask(state, bank, prev) {
  let pick = bank;
  if (prev && bank.length > 1) {
    let a = bank.filter((p) => p.w !== prev.wordId && p.c !== prev.caseId);
    if (!a.length) a = bank.filter((p) => p.w !== prev.wordId);
    if (!a.length) a = bank.filter((p) => p.c !== prev.caseId);
    if (a.length) pick = a;
  }
  const p = pick[Math.floor(Math.random() * pick.length)];
  const word = WORDS.find((w) => w.id === p.w);
  const target = CASES.find((c) => c.id === p.c);
  const ti = idx(target.id);
  const forms = word.sg;
  const stem = stemOf(word, 'sg');
  const tail = forms[ti].slice(stem.length);
  const tier = PHRASE_TIERS[Math.min(state.level, PHRASE_TIERS.length - 1)];
  const useUk = tier.prompt === 'uk' || (tier.prompt === 'mix' && Math.random() < 0.5);
  const hintMode = tier.hint;
  const { lang, tKey } = langBits(state);
  const prompt = useUk ? { text: word[tKey] } : { stem, tail: forms[0].slice(stem.length) };
  const qStr = caseQ(target, lang);
  const showsPhrase = hintMode === 'fullq' || hintMode === 'full';
  let hint = null, revealUk = null;
  if (lang === 'uk') {
    if (hintMode === 'fullq') hint = (p.ukPre ? p.ukPre + ' ' : '') + qStr + ' ' + p.ukForm;
    else if (hintMode === 'full') hint = p.uk;
    else if (hintMode === 'q') hint = qStr;
    revealUk = showsPhrase ? null : p.uk;
  } else {
    const tn = nounForm(word, CASEKEY[target.id], 'sg', lang);
    if (hintMode === 'fullq') hint = qStr + ' ' + tn;
    else if (hintMode === 'full') hint = tn;
    else if (hintMode === 'q') hint = qStr;
    revealUk = showsPhrase ? null : tn;
  }
  return {
    caseId: target.id,
    caseBound: false,
    typeId: word.type,
    wordId: word.id,
    themes: [state.theme],
    number: 'sg',
    mode: 'phrase',
    prompt,
    promptA: useUk ? null : (word.sgA || [])[0] || null,
    leadA: null,
    trailA: null,
    promptNote: null,
    hasNote: false,
    wordUk: null,
    hasLead: true,
    lead: p.lead,
    hint,
    revealUk,
    stemPrefix: useUk ? '' : stem,
    stem,
    tail,
    targetForm: forms[ti],
    targetFormA: (word.sgA || [])[ti]
  };
}

export function newTask(state, prev) {
  const bank = PHRASES[state.theme];
  if (bank && bank.length) return phraseTask(state, bank, prev);

  const ec = CASES.filter((c) => state.cases[c.id]);
  const ew = WORDS.filter((w) => state.types[w.type] && inTheme(w, state.theme));
  const en = ['sg', 'pl'].filter((n) => state.numbers[n]);
  if (!ec.length || !ew.length || !en.length) return null;

  const { lang, tKey, U } = langBits(state);
  const caseName = (id) => U.caseNames[id];

  const stop = LEVELS[state.level];
  const supports = (w, nn) => (nn === 'sg' ? w.num !== 'pl' : w.num !== 'sg' && w.pl && w.pl.length === 6);
  let number = rnd(en);
  let avail = ew.filter((w) => supports(w, number));
  if (!avail.length) { number = number === 'pl' ? 'sg' : 'pl'; avail = ew.filter((w) => supports(w, number)); }
  if (!avail.length) { number = 'sg'; avail = ew; }
  let pool;
  if (stop.word === 'fixed') {
    const samples = DECLENSIONS.filter((t) => avail.some((w) => w.type === t.id)).map((t) => t.sample);
    pool = avail.filter((w) => samples.includes(w.id));
    if (!pool.length) pool = avail;
  } else {
    pool = avail;
  }
  if (state.focusWordId) { const f = pool.filter((w) => w.id === state.focusWordId); if (f.length) pool = f; }
  let pick = pool;
  if (prev && prev.wordId && pool.length > 1) {
    const a = pool.filter((w) => w.id !== prev.wordId);
    if (a.length) pick = a;
  }
  const type = rnd(pick);
  let mode = stop.prompt;
  if (mode === 'mix-otheruk') mode = rnd(['lt-othercase', 'uk']);
  if (mode === 'mix-all') mode = rnd(['lt-nom', 'lt-tonom', 'lt-othercase', 'uk']);
  if (mode === 'lt-nom' && ec.length === 1 && ec[0].id === 'V') mode = 'lt-tonom';

  const caseBound = mode !== 'lt-tonom';
  let target;
  if (mode === 'lt-tonom') {
    target = CASES[0];
  } else {
    let casePool = ec.slice();
    if (mode === 'lt-nom' && casePool.length > 1) {
      const a = casePool.filter((c) => c.id !== 'V' && type[number][idx(c.id)] !== type[number][0]);
      if (a.length) casePool = a;
    }
    if (prev && prev.caseId && casePool.length > 1) {
      const a = casePool.filter((c) => c.id !== prev.caseId);
      if (a.length) casePool = a;
    }
    target = rnd(casePool);
  }
  const ti = idx(target.id);
  const forms = type[number];
  const stem = stemOf(type, number);
  const tail = forms[ti].slice(stem.length);

  const accArr = (number === 'pl' ? type.plA : type.sgA) || [];
  let prompt, note = null, hasNote = false, promptCaseId = null, promptA = null;
  if (mode === 'lt-nom') {
    prompt = { stem, tail: forms[0].slice(stem.length) };
    promptA = accArr[0] || null;
    promptCaseId = 'V';
  } else if (mode === 'lt-tonom') {
    const opts = [1, 2, 3, 4, 5].filter((k) => forms[k] !== forms[0]);
    const si = opts.length ? rnd(opts) : 1;
    prompt = { stem, tail: forms[si].slice(stem.length) };
    promptA = accArr[si] || null;
    note = U.noteGiven + ' ' + caseName(CASES[si].id) + ' → ' + U.noteMake + ' ' + caseName(target.id);
    hasNote = true;
    promptCaseId = CASES[si].id;
  } else if (mode === 'lt-othercase') {
    const opts = [0, 1, 2, 3, 4, 5].filter((k) => k !== ti && forms[k] !== forms[ti]);
    let si = opts.length ? rnd(opts) : (ti === 0 ? 1 : 0);
    prompt = { stem, tail: forms[si].slice(stem.length) };
    promptA = accArr[si] || null;
    note = U.noteGiven + ' ' + caseName(CASES[si].id) + ' → ' + U.noteMake + ' ' + caseName(target.id);
    hasNote = true;
    promptCaseId = CASES[si].id;
  } else {
    prompt = { text: type[tKey] };
    note = U.noteTranslate;
    hasNote = true;
  }

  const ck = CASEKEY[target.id];
  const cats = type.cat || [];
  const accepts = (d) => d.accepts === '*' || d.accepts.some((c) => cats.includes(c));
  const dKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const dCaseKey = lang === 'ru' ? 'ruCase' : 'ukCase';
  let drivers = [];
  if (mode !== 'uk' || stop.ukDrivers) {
    const preps = stop.preps || [];
    for (const p of preps) {
      const pd = PREPS[p];
      if (pd.case === ck && accepts(pd)) drivers.push({ lt: p, word: pd[dKey], dCase: lang === 'en' ? ck : pd[dCaseKey] });
    }
    if (stop.verbs) {
      for (const v of VERBS) {
        if (v.case === ck && accepts(v)) drivers.push({ lt: v.id, word: v[dKey], dCase: lang === 'en' ? ck : v[dCaseKey] });
      }
    }
  }
  const driver = drivers.length ? rnd(drivers) : null;

  const gNoun = (key) => nounForm(type, key, number, lang);
  let hint = null;
  if (driver) {
    const dform = gNoun(driver.dCase) || gNoun(ck);
    if (dform) hint = driver.word + (stop.question ? ' (' + target.q + ')' : '') + ' ' + dform;
  } else {
    const uform = gNoun(ck);
    if (uform) hint = caseQ(target, lang) + ' ' + uform;
  }
  const wordUk = promptCaseId ? gNoun(CASEKEY[promptCaseId]) : null;

  return {
    caseId: target.id,
    caseBound,
    typeId: type.type,
    wordId: type.id,
    themes: type.themes || [],
    number,
    mode,
    prompt,
    promptA,
    leadA: null,
    trailA: null,
    promptNote: note,
    hasNote,
    wordUk,
    hasLead: !!driver,
    lead: driver ? driver.lt : null,
    hint,
    stemPrefix: mode !== 'uk' ? stem : '',
    stem,
    tail,
    targetForm: forms[ti],
    targetFormA: ((number === 'pl' ? type.plA : type.sgA) || [])[ti]
  };
}
