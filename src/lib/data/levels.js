const ALL_PREPS = ['prie', 'iš', 'nuo', 'iki', 'be', 'dėl', 'į', 'per', 'pro', 'apie', 'pas', 'už', 'su'];

export const PHRASE_TIERS = [
  { prompt: 'lt', hint: 'fullq' },
  { prompt: 'lt', hint: 'q' },
  { prompt: 'lt', hint: 'none' },
  { prompt: 'uk', hint: 'q' },
  { prompt: 'uk', hint: 'none' },
  { prompt: 'mix', hint: 'none' }
];

export const LEVELS = [
  { word: 'fixed', prompt: 'lt-nom', question: true, preps: [], verbs: false },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: [], verbs: false },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'lt-nom', question: false, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'lt-tonom', question: true, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'lt-othercase', question: true, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'mix-otheruk', question: false, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'uk', question: false, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'uk', question: false, preps: ALL_PREPS, verbs: true, ukDrivers: true },
  { word: 'pool', prompt: 'mix-all', question: false, preps: ALL_PREPS, verbs: true, ukDrivers: true }
];
