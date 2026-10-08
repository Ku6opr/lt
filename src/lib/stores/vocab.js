import { writable } from 'svelte/store';

const KEY = 'lt-vocab-v1';

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

export function saveVocab(shown, picked, date) {
  vocab.update((v) => {
    const words = { ...v.words };
    for (const ref of shown) delete words[ref];
    for (const ref of picked) words[ref] = { added: date };
    return { ...v, words };
  });
}
