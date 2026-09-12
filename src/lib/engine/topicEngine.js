import { newTask, poolOk } from './generate.js';
import { newAdjTask, adjPoolOk, newDegreeTask, degreePoolOk, newAdverbTask, adverbPoolOk } from './adjectives.js';
import { newPronounTask, pronounPoolOk } from './pronouns.js';
import { newConjTask, conjPoolOk } from './conjugation.js';
import { newVFormsTask, vformsPoolOk } from './verbForms.js';
import { newNumeralTask, numeralPoolOk, newNumQtyTask, numQtyPoolOk } from './numerals.js';
import { newDemNomTask, demNomPoolOk, newDemCaseTask, demCasePoolOk, DEM_GROUP } from './demPronouns.js';
import { newQuestTask, questPoolOk } from './questions.js';
import { keysFor } from '../stores/progress.js';

// Спільна маршрутизація "тип теми -> рушій" — те саме розгалуження, що й у Trainer.svelte,
// винесене сюди, щоб ReinforceScreen (кросс-урочний потік) міг генерувати СПРАВЖНІ задачі
// тим самим рушієм, що й сам урок, а не дублювати цю логіку вдруге.
export function kindFlags(topic) {
  return {
    isAdj: topic.kind === 'adj',
    isDeg: topic.mode === 'degrees',
    isAdverb: topic.mode === 'adverbs',
    isPron: topic.kind === 'pron',
    isConj: topic.kind === 'conj',
    isVF: topic.kind === 'vforms',
    isNum: topic.kind === 'num',
    isNumQty: topic.kind === 'numqty',
    isDemNom: topic.kind === 'demnom',
    isDemCase: topic.kind === 'demcase',
    isQuest: topic.kind === 'quest'
  };
}

export function engineFor(topic) {
  const f = kindFlags(topic);
  const genTask = f.isQuest ? newQuestTask : f.isDemNom ? newDemNomTask : f.isDemCase ? newDemCaseTask : f.isNumQty ? newNumQtyTask : f.isNum ? newNumeralTask : f.isVF ? newVFormsTask : f.isConj ? newConjTask : f.isPron ? newPronounTask : f.isAdverb ? newAdverbTask : f.isDeg ? newDegreeTask : f.isAdj ? newAdjTask : newTask;
  const genOk = f.isQuest ? questPoolOk : f.isDemNom ? demNomPoolOk : f.isDemCase ? demCasePoolOk : f.isNumQty ? numQtyPoolOk : f.isNum ? numeralPoolOk : f.isVF ? vformsPoolOk : f.isConj ? conjPoolOk : f.isPron ? pronounPoolOk : f.isAdverb ? adverbPoolOk : f.isDeg ? degreePoolOk : f.isAdj ? adjPoolOk : poolOk;
  return { ...f, genTask, genOk };
}

export function stateOfFor(topic, flags, mergedSettings, lang) {
  return { ...mergedSettings, lang, ...(flags.isAdj ? { caseScope: topic.scopeCases } : {}), ...(flags.isConj ? { tense: topic.tense || 'pres' } : {}) };
}

// Розбір слабкого `form`-ключа (`w|id|...`, той самий, що пише keysFor) у override для
// стану рушія — фокус на конкретному слові + фіксація саме тієї клітинки (відмінок/особа/
// степінь/число), що була слабкою, а не випадкової для цього слова.
export function reviewOverridesFor(flags, key) {
  const p = key.split('|');
  if (flags.isQuest) return { focusWordId: p[1], focusQw: p[2] };
  if (flags.isNumQty) return { focusWordId: p[1] };
  if (flags.isDemNom) return { focusWordId: p[1] };
  if (flags.isDemCase) return { focusWordId: p[1], cases: { [p[3]]: true }, numbers: { [p[4]]: true }, types: { [DEM_GROUP[p[1]]]: true } };
  if (flags.isNum) return { focusWordId: p[1], cases: { [p[3]]: true } };
  if (flags.isVF) return { focusWordId: p[1] };
  if (flags.isConj) return { focusWordId: p[1], focusPerson: p[2] };
  if (flags.isPron) return { focusWordId: p[1], cases: { [p[2]]: true } };
  if (flags.isAdverb) return { focusWordId: p[1], degrees: { [p[3]]: true }, theme: 'all' };
  if (flags.isDeg) return { focusWordId: p[1], degrees: { [p[3]]: true }, numbers: { [p[4]]: true }, theme: 'all' };
  if (flags.isAdj) return { focusWordId: p[1], cases: { [p[3]]: true }, numbers: { [p[4]]: true }, theme: 'all' };
  return { focusWordId: p[1], cases: { [p[2]]: true }, numbers: { [p[3]]: true }, theme: 'all' };
}

// Генерація задачі саме на ту клітинку, де був провал (`key` — той самий `form`-ключ, що й
// weakFormKeys): до 12 спроб знайти рушієм ТОЧНО цю клітинку (keysFor(c).form === key), не
// просто якесь слово/відмінок — інакше "провалив medis родовий" міг би повторитись як
// "medis давальний". Якщо за 12 спроб точного збігу нема (рідкісний рушій-виняток) —
// перший згенерований кандидат, як у поуроковому reviewMode.
export function genForKey(topic, flags, key, settings, lang) {
  const merged = { ...settings, ...reviewOverridesFor(flags, key) };
  const state = stateOfFor(topic, flags, merged, lang);
  let fallback = null;
  for (let i = 0; i < 12; i++) {
    const c = flags.genTask(state, null);
    if (!c) continue;
    if (keysFor(c, flags.isAdj).form === key) return c;
    if (!fallback) fallback = c;
  }
  return fallback;
}
