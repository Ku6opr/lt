import { weakFormKeys } from '../stores/mastery.js';

// Усі теми, де слово могло стати "слабким" — той самий перелік, що бере участь у
// кросс-урочному потоці "Закріпити".
const TOPIC_IDS = [
  'verb-forms', 'conj', 'conj-past', 'conj-fut', 'conj-imp', 'conj-cond', 'conj-habit',
  'vidminky',
  'adj-nom', 'adj-cases', 'adj-degrees', 'adverbs',
  'pronouns',
  'num-qty', 'numerals',
  'dem-nom', 'dem-cases',
  'questions'
];

// Слабкі КЛІТИНКИ (не просто слова) з УСІХ уроків одним списком: {topicId, key}, де key —
// той самий `form`-ключ, що й у поуроковому "Повторити помилки" (weakFormKeys/reviewOverridesFor) —
// слово + конкретний відмінок/особа/степінь/число, де саме був промах.
export function collectMistakeCells(progressAll) {
  const out = [];
  for (const topicId of TOPIC_IDS) {
    for (const key of weakFormKeys(progressAll, topicId)) {
      out.push({ topicId, key });
    }
  }
  return out;
}

export function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
