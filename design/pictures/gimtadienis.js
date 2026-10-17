export const PICTURE_GLOSS = {
  'n:žvakė': ['свічка', 'свеча', 'candle'],
  'v:švęsti': ['святкувати', 'праздновать', 'to celebrate'],
  'w:kairėje': ['ліворуч', 'слева', 'on the left', 'adv'],
  'w:dešinėje': ['праворуч', 'справа', 'on the right', 'adv']
};

export const PICTURE = {
  id: 'gimtadienis',
  image: 'gimtadienis.svg',
  phrases: [
    {
      id: 'gimtadienis-zmones',
      lt: [{ pr: 'as', c: 'V', opt: true }, { v: 'matyti', t: 'pres', p: 'sg1' }, { q: '6', to: 3 }, { n: 'žmogus', c: 'G', num: 'pl' }],
      uk: 'Я бачу шість людей.',
      ru: 'Я вижу шесть человек.',
      en: 'I see six people.'
    },
    {
      id: 'gimtadienis-svente',
      lt: [{ n: 'šeima', c: 'V', num: 'sg' }, { v: 'švęsti', t: 'pres', p: 'p3' }, { n: 'berniukas', c: 'K', num: 'sg' }, { n: 'gimtadienis', c: 'G', num: 'sg' }],
      uk: 'Родина святкує день народження хлопчика.',
      ru: 'Семья празднует день рождения мальчика.',
      en: "The family is celebrating the boy's birthday."
    },
    {
      id: 'gimtadienis-berniukas',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'sėdėti', t: 'pres', p: 'p3' }, { prep: 'ant' }, { n: 'kėdė', c: 'K', num: 'sg' }],
      uk: 'Хлопчик сидить на стільці.',
      ru: 'Мальчик сидит на стуле.',
      en: 'The boy is sitting on a chair.'
    },
    {
      id: 'gimtadienis-tortas',
      lt: [{ prep: 'ant' }, { n: 'stalas', c: 'K', num: 'sg' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { a: 'didelis', to: 4 }, { n: 'tortas', c: 'V', num: 'sg' }],
      uk: 'На столі стоїть великий торт.',
      ru: 'На столе стоит большой торт.',
      en: 'There is a big cake on the table.'
    },
    {
      id: 'gimtadienis-zvakes',
      lt: [{ prep: 'ant' }, { n: 'tortas', c: 'K', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { q: '7', to: 4 }, { n: 'žvakė', c: 'V', num: 'pl' }],
      uk: 'На торті сім свічок.',
      ru: 'На торте семь свечей.',
      en: 'There are seven candles on the cake.'
    },
    {
      id: 'gimtadienis-dovana',
      lt: [{ n: 'mama', c: 'V', num: 'sg' }, { v: 'duoti', t: 'pres', p: 'p3' }, { n: 'berniukas', c: 'N', num: 'sg' }, { n: 'dovana', c: 'G', num: 'sg' }],
      uk: 'Мама дає хлопчикові подарунок.',
      ru: 'Мама даёт мальчику подарок.',
      en: 'Mom is giving the boy a present.'
    },
    {
      id: 'gimtadienis-linksmas',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { w: 'labai' }, { a: 'linksmas', to: 0 }],
      uk: 'Хлопчик дуже веселий.',
      ru: 'Мальчик очень весёлый.',
      en: 'The boy is very cheerful.'
    },
    {
      id: 'gimtadienis-fotelis',
      lt: [{ w: 'kairėje' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { n: 'fotelis', c: 'V', num: 'sg' }],
      uk: 'Ліворуч стоїть крісло.',
      ru: 'Слева стоит кресло.',
      en: 'There is an armchair on the left.'
    },
    {
      id: 'gimtadienis-mociute',
      lt: [{ n: 'fotelis', c: 'Vt', num: 'sg' }, { v: 'sėdėti', t: 'pres', p: 'p3' }, { n: 'močiutė', c: 'V', num: 'sg' }],
      uk: 'У кріслі сидить бабуся.',
      ru: 'В кресле сидит бабушка.',
      en: 'Grandma is sitting in the armchair.'
    },
    {
      id: 'gimtadienis-arbata',
      lt: [{ n: 'močiutė', c: 'V', num: 'sg' }, { v: 'gerti', t: 'pres', p: 'p3' }, { n: 'arbata', c: 'G', num: 'sg' }],
      uk: 'Бабуся п’є чай.',
      ru: 'Бабушка пьёт чай.',
      en: 'Grandma is drinking tea.'
    },
    {
      id: 'gimtadienis-sofa',
      lt: [{ w: 'dešinėje' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { n: 'sofa', c: 'V', num: 'sg' }],
      uk: 'Праворуч стоїть диван.',
      ru: 'Справа стоит диван.',
      en: 'There is a sofa on the right.'
    },
    {
      id: 'gimtadienis-senelis',
      lt: [{ prep: 'ant' }, { n: 'sofa', c: 'K', num: 'sg' }, { v: 'sėdėti', t: 'pres', p: 'p3' }, { n: 'senelis', c: 'V', num: 'sg' }],
      uk: 'На дивані сидить дідусь.',
      ru: 'На диване сидит дедушка.',
      en: 'Grandpa is sitting on the sofa.'
    },
    {
      id: 'gimtadienis-kate',
      lt: [{ n: 'katė', c: 'V', num: 'sg' }, { v: 'miegoti', t: 'pres', p: 'p3' }, { prep: 'ant' }, { n: 'sofa', c: 'K', num: 'sg' }],
      uk: 'Кішка спить на дивані.',
      ru: 'Кошка спит на диване.',
      en: 'The cat is sleeping on the sofa.'
    },
    {
      id: 'gimtadienis-gitara',
      lt: [{ n: 'tėtis', c: 'V', num: 'sg' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { w: 'ir' }, { v: 'groti', t: 'pres', p: 'p3' }, { n: 'gitara', c: 'In', num: 'sg' }],
      uk: 'Тато стоїть і грає на гітарі.',
      ru: 'Папа стоит и играет на гитаре.',
      en: 'Dad is standing and playing the guitar.'
    },
    {
      id: 'gimtadienis-sesuo',
      lt: [{ n: 'berniukas', c: 'K', num: 'sg' }, { n: 'sesuo', c: 'V', num: 'sg' }, { v: 'dainuoti', t: 'pres', p: 'p3' }],
      uk: 'Сестра хлопчика співає.',
      ru: 'Сестра мальчика поёт.',
      en: "The boy's sister is singing."
    },
    {
      id: 'gimtadienis-suo',
      lt: [{ n: 'šuo', c: 'V', num: 'sg' }, { v: 'gulėti', t: 'pres', p: 'p3' }, { prep: 'ant' }, { n: 'kilimas', c: 'K', num: 'sg' }],
      uk: 'Собака лежить на килимі.',
      ru: 'Собака лежит на ковре.',
      en: 'The dog is lying on the rug.'
    },
    {
      id: 'gimtadienis-paveikslas',
      lt: [{ prep: 'ant' }, { n: 'siena', c: 'K', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { n: 'paveikslas', c: 'V', num: 'sg' }],
      uk: 'На стіні — картина.',
      ru: 'На стене — картина.',
      en: 'There is a painting on the wall.'
    }
  ]
};
