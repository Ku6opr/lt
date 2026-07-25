export const STOPS = [
  { word: 'fixed', prompt: 'lt-nom', question: true, preps: [] },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: [] },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: ['prie', 'į', 'su'] },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: ['prie', 'iš', 'į', 'per', 'su'] },
  { word: 'pool', prompt: 'lt-tonom', question: true, preps: ['prie', 'iš', 'nuo', 'į', 'per', 'pro', 'su'] },
  { word: 'pool', prompt: 'lt-othercase', question: true, preps: ['prie', 'iš', 'nuo', 'iki', 'į', 'per', 'pro', 'apie', 'su'] },
  { word: 'pool', prompt: 'mix-otheruk', question: false, preps: ['prie', 'iš', 'nuo', 'iki', 'be', 'į', 'per', 'pro', 'apie', 'pas', 'su'] },
  { word: 'pool', prompt: 'uk', question: false, preps: ['prie', 'iš', 'nuo', 'iki', 'be', 'dėl', 'į', 'per', 'pro', 'apie', 'pas', 'už', 'su'] }
];

export const LEVELDESC = [
  'Одне слово · називний → відмінок',
  'Слова з пулу · називний → відмінок',
  'Називний → відмінок · перші прийменники',
  'Називний → відмінок · більше прийменників',
  'Будь-який відмінок → називний',
  'Відмінок → інший відмінок',
  'Відмінок → інший або укр. слово · без питання',
  'Укр. слово → відмінок'
];
