const ALL_PREPS = ['prie', 'iš', 'nuo', 'iki', 'be', 'dėl', 'į', 'per', 'pro', 'apie', 'pas', 'už', 'su'];

export const LEVELS = [
  { word: 'fixed', prompt: 'lt-nom', question: true, preps: [] },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: [] },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: ALL_PREPS },
  { word: 'pool', prompt: 'lt-nom', question: false, preps: ALL_PREPS },
  { word: 'pool', prompt: 'lt-tonom', question: true, preps: ALL_PREPS },
  { word: 'pool', prompt: 'lt-othercase', question: true, preps: ALL_PREPS },
  { word: 'pool', prompt: 'mix-otheruk', question: false, preps: ALL_PREPS },
  { word: 'pool', prompt: 'uk', question: false, preps: ALL_PREPS }
];
