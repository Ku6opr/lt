import { CASES } from '../data/cases.js';
import { TYPES } from '../data/types.js';
import { STOPS } from '../data/stops.js';
import { PREPS } from '../data/prepositions.js';
import { idx, stemOf } from './stem.js';

function rnd(a) {
  return a[Math.floor(Math.random() * a.length)];
}

export function poolOk(state) {
  return CASES.some((c) => state.cases[c.id]) && TYPES.some((t) => state.types[t.id]) && (state.numbers.sg || state.numbers.pl);
}

export function newTask(state) {
  const ec = CASES.filter((c) => state.cases[c.id]);
  const et = TYPES.filter((t) => state.types[t.id]);
  const en = ['sg', 'pl'].filter((n) => state.numbers[n]);
  if (!ec.length || !et.length || !en.length) return null;

  const CASEKEY = { V: 'nom', K: 'gen', N: 'dat', G: 'acc', In: 'ins', Vt: 'loc' };

  const stop = STOPS[state.level];
  const number = rnd(en);
  const type = stop.word === 'fixed' ? et.find((t) => t.id === 'as') || et[0] : rnd(et);
  let mode = stop.prompt;
  if (mode === 'mix-otheruk') mode = rnd(['lt-othercase', 'uk']);

  const caseBound = mode !== 'lt-tonom';
  let target;
  if (mode === 'lt-tonom') {
    target = CASES[0];
  } else {
    let casePool = ec.slice();
    if (mode === 'lt-nom' && casePool.length > 1) casePool = casePool.filter((c) => c.id !== 'V');
    target = rnd(casePool);
  }
  const ti = idx(target.id);
  const forms = type[number];
  const stem = stemOf(type, number);
  const tail = forms[ti].slice(stem.length);
  const uf = type.ukForms || {};

  let prompt, note = null, hasNote = false, promptCaseId = null;
  if (mode === 'lt-nom') {
    prompt = { stem, tail: forms[0].slice(stem.length) };
    promptCaseId = 'V';
  } else if (mode === 'lt-tonom') {
    const si = 1 + Math.floor(Math.random() * 5);
    prompt = { stem, tail: forms[si].slice(stem.length) };
    note = 'дано ' + CASES[si].name + ' → зроби ' + target.name;
    hasNote = true;
    promptCaseId = CASES[si].id;
  } else if (mode === 'lt-othercase') {
    let si = Math.floor(Math.random() * 5);
    if (si >= ti) si++;
    prompt = { stem, tail: forms[si].slice(stem.length) };
    note = 'дано ' + CASES[si].name + ' → зроби ' + target.name;
    hasNote = true;
    promptCaseId = CASES[si].id;
  } else {
    prompt = { text: type.uk };
    note = 'переклади й провідміняй';
    hasNote = true;
  }

  const allowedPreps = stop.preps ? target.preps.filter((p) => stop.preps.includes(p)) : target.preps;
  const hasPrep = allowedPreps.length > 0;
  const prepWord = hasPrep ? rnd(allowedPreps) : null;

  const qStr = '(' + target.qUk + ' / ' + target.q + ')';
  let hint = null;
  if (prepWord) {
    const p = PREPS[prepWord];
    const uform = uf[p.case];
    if (uform) hint = p.uk + (stop.question ? ' ' + qStr : '') + ' ' + uform;
  } else {
    const uform = uf[CASEKEY[target.id]];
    if (uform) hint = qStr + ' ' + uform;
  }
  const wordUk = promptCaseId ? uf[CASEKEY[promptCaseId]] : null;

  const stemPrefill = mode !== 'uk';
  return {
    caseId: target.id,
    caseBound,
    typeId: type.id,
    number,
    mode,
    prompt,
    promptNote: note,
    hasNote,
    wordUk,
    hasPrep,
    prep: prepWord,
    hint,
    stemPrefill,
    stemPrefix: stemPrefill ? stem : '',
    stem,
    tail,
    targetForm: forms[ti]
  };
}
