import { writable } from 'svelte/store';

const KEY = 'lt-trainer-vidminky-v1';

const defaults = {
  level: 0,
  cases: { V: false, K: true, N: false, G: false, In: false, Vt: false },
  types: { as: true, is_b: true, is_m: true, ys: true, us: true, ius: true, uo_m: true, a: true, ia: true, e: true, is_f: true, uo_f: true },
  numbers: { sg: true, pl: false },
  theme: 'all',
  viewNumber: 'sg',
  tableOpen: true
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return {
        level: s.level ?? defaults.level,
        cases: { ...defaults.cases, ...(s.cases || {}) },
        types: { ...defaults.types, ...(s.types || {}) },
        numbers: { ...defaults.numbers, ...(s.numbers || {}) },
        theme: s.theme ?? defaults.theme,
        viewNumber: s.viewNumber ?? defaults.viewNumber,
        tableOpen: s.tableOpen ?? defaults.tableOpen
      };
    }
  } catch (e) {}
  return { ...defaults, cases: { ...defaults.cases }, types: { ...defaults.types }, numbers: { ...defaults.numbers } };
}

export const settings = writable(load());

settings.subscribe((s) => {
  try {
    const { level, cases, types, numbers, theme, viewNumber, tableOpen } = s;
    localStorage.setItem(KEY, JSON.stringify({ level, cases, types, numbers, theme, viewNumber, tableOpen }));
  } catch (e) {}
});
