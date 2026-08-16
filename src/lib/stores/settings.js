import { writable } from 'svelte/store';

function persisted(key, defaults) {
  const merge = (s) => ({
    ...defaults,
    ...s,
    cases: { ...defaults.cases, ...(s && s.cases) },
    types: { ...defaults.types, ...(s && s.types) },
    numbers: { ...defaults.numbers, ...(s && s.numbers) },
    ...(defaults.degrees ? { degrees: { ...defaults.degrees, ...(s && s.degrees) } } : {})
  });
  let init = merge(null);
  try {
    const raw = localStorage.getItem(key);
    if (raw) init = merge(JSON.parse(raw));
  } catch (e) {}
  const store = writable(init);
  store.subscribe((s) => {
    try {
      localStorage.setItem(key, JSON.stringify(s));
    } catch (e) {}
  });
  return store;
}

const vformsSettings = persisted('lt-trainer-verb-forms-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const conjSettings = persisted('lt-trainer-conj-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const conjPastSettings = persisted('lt-trainer-conj-past-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const conjFutSettings = persisted('lt-trainer-conj-fut-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const conjImpSettings = persisted('lt-trainer-conj-imp-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const conjCondSettings = persisted('lt-trainer-conj-cond-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const numQtySettings = persisted('lt-trainer-num-qty-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const numeralSettings = persisted('lt-trainer-numerals-v1', {
  level: 0,
  autoLevel: false,
  cases: { V: false, K: true, N: true, G: true, In: true, Vt: true },
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const demNomSettings = persisted('lt-trainer-dem-nom-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const demCaseSettings = persisted('lt-trainer-dem-cases-v1', {
  level: 0,
  autoLevel: false,
  cases: { V: false, K: true, N: true, G: true, In: true, Vt: true },
  types: { tas: true, kitas: true, toks: true, kuris: true, pats: true },
  numbers: { sg: true, pl: true },
  theme: 'all',
  tableOpen: true
});

const nounSettings = persisted('lt-trainer-vidminky-v1', {
  level: 0,
  autoLevel: false,
  cases: { V: false, K: true, N: false, G: false, In: false, Vt: false },
  types: { as: true, is_b: true, is_m: true, ys: true, us: true, ius: true, uo_m: true, a: true, ia: true, e: true, is_f: true, uo_f: true },
  numbers: { sg: true, pl: false },
  theme: 'all',
  viewNumber: 'sg',
  tableOpen: true
});

const adjNomSettings = persisted('lt-trainer-adj-nom-v1', {
  level: 0,
  autoLevel: false,
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
  autoLevel: false,
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

const adjDegSettings = persisted('lt-trainer-adj-degrees-v1', {
  level: 0,
  autoLevel: false,
  cases: { V: true, K: false, N: false, G: false, In: false, Vt: false },
  types: { I: true, II: true, III: true },
  gender: 'both',
  numbers: { sg: true, pl: true },
  degrees: { comp: true, sup: true },
  theme: 'all',
  viewNumber: 'sg',
  viewGender: 'm',
  tableOpen: true
});

const adverbSettings = persisted('lt-trainer-adverbs-v1', {
  level: 0,
  autoLevel: false,
  cases: {},
  types: { I: true, II: true, III: true },
  numbers: { sg: true, pl: false },
  degrees: { pos: true, comp: true, sup: true },
  theme: 'all',
  viewNumber: 'sg',
  tableOpen: true
});

const pronounSettings = persisted('lt-trainer-pronouns-v1', {
  level: 0,
  autoLevel: false,
  cases: { V: false, K: true, N: true, G: true, In: true, Vt: true },
  types: {},
  numbers: { sg: true, pl: true },
  theme: 'all',
  viewNumber: 'sg',
  tableOpen: true
});

const byTopic = { 'verb-forms': vformsSettings, conj: conjSettings, 'conj-past': conjPastSettings, 'conj-fut': conjFutSettings, 'conj-imp': conjImpSettings, 'conj-cond': conjCondSettings, numerals: numeralSettings, 'num-qty': numQtySettings, 'dem-nom': demNomSettings, 'dem-cases': demCaseSettings, vidminky: nounSettings, 'adj-nom': adjNomSettings, 'adj-degrees': adjDegSettings, 'adj-cases': adjCasesSettings, pronouns: pronounSettings, adverbs: adverbSettings };

export function settingsFor(topicId) {
  return byTopic[topicId] || nounSettings;
}
