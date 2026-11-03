import { writable } from 'svelte/store';
import { dayKey } from './daily.js';
import { REVIEW_STEPS } from '../data/review.js';

const KEY = 'lt-vocab-v1';

export const LEARNED = REVIEW_STEPS.length;

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return v && v.words && typeof v.words === 'object' ? v : { words: {} };
  } catch (e) {
    return { words: {} };
  }
}

export const vocab = writable(load());
vocab.subscribe((v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
});

export function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + n));
}

export function stepOf(e) {
  if (e.box != null) return { box: e.box, due: e.due };
  return { box: 0, due: addDays(e.added, REVIEW_STEPS[0].days) };
}

export const isDue = (e, today) => {
  const { box, due } = stepOf(e);
  return box < LEARNED && due <= today;
};

export function dueCount(words, today) {
  return Object.values(words).filter((e) => isDue(e, today)).length;
}

export function saveVocab(shown, picked, date) {
  vocab.update((v) => {
    const words = { ...v.words };
    for (const ref of shown) delete words[ref];
    for (const w of picked) words[w.ref] = { added: date, box: 0, due: addDays(date, REVIEW_STEPS[0].days), phrase: w.phrase, k: w.k };
    return { ...v, words };
  });
}

export function nextStep(e, move, today) {
  const { box } = stepOf(e);
  const next = move === 'up' ? box + 1 : move === 'down' ? Math.max(0, box - 1) : box;
  if (next >= LEARNED) return { ...e, box: LEARNED, due: null };
  return { ...e, box: next, due: addDays(today, REVIEW_STEPS[move === 'up' ? next : 0].days) };
}

export function reviewWord(ref, move, today) {
  vocab.update((v) => (v.words[ref] ? { ...v, words: { ...v.words, [ref]: nextStep(v.words[ref], move, today) } } : v));
}

export function removeWord(ref) {
  vocab.update((v) => {
    const words = { ...v.words };
    delete words[ref];
    return { ...v, words };
  });
}

export function restoreWord(ref, entry) {
  vocab.update((v) => ({ ...v, words: { ...v.words, [ref]: entry } }));
}
