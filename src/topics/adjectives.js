export const adjNomTopic = {
  id: 'adj-nom',
  cat: 'adj',
  depth: 1,
  short: { uk: 'Називний', ru: 'Именительный', en: 'Nominative' },
  kind: 'adj',
  n: 8,
  accent: 'violet',
  glyph: 'koks?',
  scopeCases: ['V'],
  cheatCases: ['V'],
  fixedFilters: true,
  cheatBoth: true,
  title: { uk: 'Прикметники: називний', ru: 'Прилагательные: именительный', en: 'Adjectives: nominative' },
  subtitle: {
    uk: 'Прикметник узгоджується з іменником у роді й числі. Однина і множина.',
    ru: 'Прилагательное согласуется с существительным в роде и числе. Ед. и мн.',
    en: 'The adjective agrees with the noun in gender and number. Singular and plural.'
  },
  trainerTitle: { uk: 'Прикметники — називний відмінок', ru: 'Прилагательные — именительный падеж', en: 'Adjectives — nominative case' }
};

export const adjDegreesTopic = {
  id: 'adj-degrees',
  cat: 'adj',
  depth: 2,
  short: { uk: 'Ступені', ru: 'Степени', en: 'Degrees' },
  kind: 'adj',
  mode: 'degrees',
  n: 9,
  accent: 'violet',
  glyph: 'esnis',
  title: { uk: 'Прикметники: ступені', ru: 'Прилагательные: степени', en: 'Adjectives: degrees' },
  subtitle: {
    uk: 'Вищий і найвищий ступінь порівняння. Тільки називний, однина і множина.',
    ru: 'Сравнительная и превосходная степень. Только именительный, ед. и мн.',
    en: 'Comparative and superlative degree. Nominative only, singular and plural.'
  },
  trainerTitle: { uk: 'Ступені порівняння прикметників', ru: 'Степени сравнения прилагательных', en: 'Adjective degrees of comparison' }
};

export const adverbsTopic = {
  id: 'adverbs',
  cat: 'adv',
  depth: 2,
  short: { uk: 'Ступені', ru: 'Степени', en: 'Degrees' },
  kind: 'adj',
  mode: 'adverbs',
  n: 12,
  accent: 'violet',
  glyph: 'gerai',
  title: { uk: 'Прислівники', ru: 'Наречия', en: 'Adverbs' },
  subtitle: {
    uk: 'Прислівники та ступені порівняння: gerai → geriau → geriausiai.',
    ru: 'Наречия и степени сравнения: gerai → geriau → geriausiai.',
    en: 'Adverbs and their degrees: gerai → geriau → geriausiai.'
  },
  trainerTitle: { uk: 'Прислівники та ступені', ru: 'Наречия и степени', en: 'Adverbs and degrees' }
};

export const adjCasesTopic = {
  id: 'adj-cases',
  cat: 'adj',
  depth: 6,
  short: { uk: 'Відмінки', ru: 'Падежи', en: 'Cases' },
  kind: 'adj',
  n: 10,
  accent: 'violet',
  glyph: 'kokio?',
  scopeCases: ['K', 'N', 'G', 'In', 'Vt'],
  cheatCases: ['V', 'K', 'N', 'G', 'In', 'Vt'],
  title: { uk: 'Прикметники: відмінки', ru: 'Прилагательные: падежи', en: 'Adjectives: cases' },
  subtitle: {
    uk: 'Прикметник у непрямих відмінках. Слово дано в називному — постав у потрібну форму.',
    ru: 'Прилагательное в косвенных падежах. Слово дано в именительном — поставь в нужную форму.',
    en: 'Adjectives in oblique cases. The word is given in the nominative — put it in the right form.'
  },
  trainerTitle: { uk: 'Відмінювання прикметників', ru: 'Склонение прилагательных', en: 'Adjective declension' }
};
