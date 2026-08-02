import { writable } from 'svelte/store';

function persisted(key, defaults) {
  let init = { ...defaults, cases: { ...defaults.cases }, types: { ...defaults.types }, numbers: { ...defaults.numbers } };
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const s = JSON.parse(raw);
      init = {
        ...defaults,
        ...s,
        cases: { ...defaults.cases, ...(s.cases || {}) },
        types: { ...defaults.types, ...(s.types || {}) },
        numbers: { ...defaults.numbers, ...(s.numbers || {}) }
      };
    }
  } catch (e) {}
  const store = writable(init);
  store.subscribe((s) => {
    try {
      localStorage.setItem(key, JSON.stringify(s));
    } catch (e) {}
  });
  return store;
}

const nounSettings = persisted('lt-trainer-vidminky-v1', {
  level: 0,
  cases: { V: false, K: true, N: false, G: false, In: false, Vt: false },
  types: { as: true, is_b: true, is_m: true, ys: true, us: true, ius: true, uo_m: true, a: true, ia: true, e: true, is_f: true, uo_f: true },
  numbers: { sg: true, pl: false },
  theme: 'all',
  viewNumber: 'sg',
  tableOpen: true
});

const adjNomSettings = persisted('lt-trainer-adj-nom-v1', {
  level: 0,
  cases: { V: true, K: false, N: false, G: false, In: false, Vt: false },
  types: { I: true, II: true, III: true },
  gender: 'both',
  numbers: { sg: true, pl: true },
  theme: 'all',
  viewNumber: 'sg',
  viewType: 'I',
  viewGender: 'm',
  tableOpen: true
});

const adjCasesSettings = persisted('lt-trainer-adj-cases-v1', {
  level: 0,
  cases: { V: false, K: true, N: false, G: true, In: false, Vt: false },
  types: { I: true, II: true, III: true },
  gender: 'both',
  numbers: { sg: true, pl: false },
  theme: 'all',
  viewNumber: 'sg',
  viewType: 'I',
  viewGender: 'm',
  tableOpen: true
});

const byTopic = { vidminky: nounSettings, 'adj-nom': adjNomSettings, 'adj-cases': adjCasesSettings };

export function settingsFor(topicId) {
  return byTopic[topicId] || nounSettings;
}
