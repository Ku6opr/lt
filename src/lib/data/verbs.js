export const VERBS = [
  { id: 'pirkti', uk: 'купувати', case: 'acc', ukCase: 'acc', accepts: ['thing', 'food', 'drink', 'animal', 'place', 'nature'] },
  { id: 'gerti', uk: 'пити', case: 'acc', ukCase: 'acc', accepts: ['drink'] },
  { id: 'užsakyti', uk: 'замовляти', case: 'acc', ukCase: 'acc', accepts: ['food', 'drink'] },
  { id: 'valgyti', uk: 'їсти', case: 'acc', ukCase: 'acc', accepts: ['food'] },
  { id: 'turėti', uk: 'мати', case: 'acc', ukCase: 'acc', accepts: '*' },
  { id: 'matyti', uk: 'бачити', case: 'acc', ukCase: 'acc', accepts: ['person', 'animal', 'place', 'thing', 'nature'] },
  { id: 'mylėti', uk: 'любити', case: 'acc', ukCase: 'acc', accepts: ['person', 'animal', 'abstract', 'nature'] },
  { id: 'skaityti', uk: 'читати', case: 'acc', ukCase: 'acc', accepts: ['thing'] },
  { id: 'skambinti', uk: 'дзвонити', case: 'dat', ukCase: 'dat', accepts: ['person'] },
  { id: 'padėti', uk: 'допомагати', case: 'dat', ukCase: 'dat', accepts: ['person', 'animal'] },
  { id: 'ieškoti', uk: 'шукати', case: 'gen', ukCase: 'acc', accepts: ['person', 'animal', 'place', 'thing', 'food', 'nature'] },
  { id: 'bijoti', uk: 'боятися', case: 'gen', ukCase: 'gen', accepts: ['person', 'animal', 'nature', 'abstract'] },
  { id: 'klausytis', uk: 'слухати', case: 'gen', ukCase: 'acc', accepts: ['person', 'nature', 'animal'] },
  { id: 'naudotis', uk: 'користуватися', case: 'ins', ukCase: 'ins', accepts: ['thing'] },
  { id: 'domėtis', uk: 'цікавитися', case: 'ins', ukCase: 'ins', accepts: ['abstract', 'thing', 'person'] }
];
