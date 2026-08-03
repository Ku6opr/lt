export const VERBS = [
  { id: 'pirkti', uk: 'купувати', ru: 'покупать', en: 'to buy', case: 'acc', ukCase: 'acc', ruCase: 'acc', accepts: ['thing', 'food', 'drink', 'animal', 'place', 'nature'] },
  { id: 'gerti', uk: 'пити', ru: 'пить', en: 'to drink', case: 'acc', ukCase: 'acc', ruCase: 'acc', accepts: ['drink'] },
  { id: 'užsakyti', uk: 'замовляти', ru: 'заказывать', en: 'to order', case: 'acc', ukCase: 'acc', ruCase: 'acc', accepts: ['food', 'drink'] },
  { id: 'valgyti', uk: 'їсти', ru: 'есть', en: 'to eat', case: 'acc', ukCase: 'acc', ruCase: 'acc', accepts: ['food'] },
  { id: 'turėti', uk: 'мати', ru: 'иметь', en: 'to have', case: 'acc', ukCase: 'acc', ruCase: 'acc', accepts: '*' },
  { id: 'matyti', uk: 'бачити', ru: 'видеть', en: 'to see', case: 'acc', ukCase: 'acc', ruCase: 'acc', accepts: ['person', 'animal', 'place', 'thing', 'nature'] },
  { id: 'mylėti', uk: 'любити', ru: 'любить', en: 'to love', case: 'acc', ukCase: 'acc', ruCase: 'acc', accepts: ['person', 'animal', 'abstract', 'nature'] },
  { id: 'skaityti', uk: 'читати', ru: 'читать', en: 'to read', case: 'acc', ukCase: 'acc', ruCase: 'acc', accepts: ['thing'] },
  { id: 'skambinti', uk: 'дзвонити', ru: 'звонить', en: 'to call', case: 'dat', ukCase: 'dat', ruCase: 'dat', accepts: ['person'] },
  { id: 'padėti', uk: 'допомагати', ru: 'помогать', en: 'to help', case: 'dat', ukCase: 'dat', ruCase: 'dat', accepts: ['person', 'animal'] },
  { id: 'ieškoti', uk: 'шукати', ru: 'искать', en: 'to look for', case: 'gen', ukCase: 'acc', ruCase: 'acc', accepts: ['person', 'animal', 'place', 'thing', 'food', 'nature'] },
  { id: 'bijoti', uk: 'боятися', ru: 'бояться', en: 'to fear', case: 'gen', ukCase: 'gen', ruCase: 'gen', accepts: ['person', 'animal', 'nature', 'abstract'] },
  { id: 'klausytis', uk: 'слухати', ru: 'слушать', en: 'to listen to', case: 'gen', ukCase: 'acc', ruCase: 'acc', accepts: ['person', 'nature', 'animal'] },
  { id: 'naudotis', uk: 'користуватися', ru: 'пользоваться', en: 'to use', case: 'ins', ukCase: 'ins', ruCase: 'ins', accepts: ['thing'] },
  { id: 'domėtis', uk: 'цікавитися', ru: 'интересоваться', en: 'to be interested in', case: 'ins', ukCase: 'ins', ruCase: 'ins', accepts: ['abstract', 'thing', 'person'] }
];
