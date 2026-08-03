import { writable } from 'svelte/store';

export const LANGS = [
  { id: 'uk', label: 'Українська', short: 'UA' },
  { id: 'ru', label: 'Русский', short: 'RU' },
  { id: 'en', label: 'English', short: 'EN' }
];

const KEY = 'lt-lang-v1';
const IDS = LANGS.map((l) => l.id);

function initial() {
  try {
    const v = localStorage.getItem(KEY);
    if (v && IDS.includes(v)) return v;
  } catch (e) {}
  return 'uk';
}

export const lang = writable(initial());

lang.subscribe((v) => {
  try {
    localStorage.setItem(KEY, v);
    if (typeof document !== 'undefined') document.documentElement.lang = v;
  } catch (e) {}
});
