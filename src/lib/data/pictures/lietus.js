export default {
  id: 'lietus',
  since: '2026-10-17',
  phrases: [
    {
      id: 'lietus-lyja',
      lt: [{ w: 'šiandien' }, { v: 'lyti', t: 'pres', p: 'p3' }],
      uk: 'Сьогодні йде дощ.',
      ru: 'Сегодня идёт дождь.',
      en: 'It is raining today.'
    },
    {
      id: 'lietus-debesys',
      lt: [{ n: 'dangus', c: 'Vt', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { a: 'didelis', to: 4 }, { a: 'tamsus', to: 4 }, { n: 'debesis', c: 'V', num: 'pl' }],
      uk: 'На небі великі темні хмари.',
      ru: 'На небе большие тёмные тучи.',
      en: 'There are big dark clouds in the sky.'
    },
    {
      id: 'lietus-matau',
      lt: [{ pr: 'as', c: 'V', opt: true }, { v: 'matyti', t: 'pres', p: 'sg1' }, { n: 'moteris', c: 'G', num: 'sg' }, { w: 'ir' }, { n: 'berniukas', c: 'G', num: 'sg' }],
      uk: 'Я бачу жінку і хлопчика.',
      ru: 'Я вижу женщину и мальчика.',
      en: 'I see a woman and a boy.'
    },
    {
      id: 'lietus-gatve',
      lt: [{ n: 'moteris', c: 'V', num: 'sg' }, { v: 'eiti', t: 'pres', p: 'p3' }, { n: 'gatvė', c: 'In', num: 'sg' }],
      uk: 'Жінка йде вулицею.',
      ru: 'Женщина идёт по улице.',
      en: 'The woman is walking down the street.'
    },
    {
      id: 'lietus-sketis',
      lt: [{ n: 'moteris', c: 'V', num: 'sg' }, { v: 'laikyti', t: 'pres', p: 'p3' }, { a: 'didelis', to: 4 }, { a: 'juodas', to: 4 }, { n: 'skėtis', c: 'G', num: 'sg' }],
      uk: 'Жінка тримає велику чорну парасольку.',
      ru: 'Женщина держит большой чёрный зонт.',
      en: 'The woman is holding a big black umbrella.'
    },
    {
      id: 'lietus-paltas',
      lt: [{ n: 'moteris', c: 'V', num: 'sg' }, { v: 'dėvėti', t: 'pres', p: 'p3' }, { a: 'languotas', to: 3 }, { n: 'paltas', c: 'G', num: 'sg' }],
      uk: 'Жінка в картатому пальті.',
      ru: 'Женщина в клетчатом пальто.',
      en: 'The woman is wearing a checked coat.'
    },
    {
      id: 'lietus-bala',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { n: 'bala', c: 'Vt', num: 'sg' }],
      uk: 'Хлопчик стоїть у калюжі.',
      ru: 'Мальчик стоит в луже.',
      en: 'The boy is standing in a puddle.'
    },
    {
      id: 'lietus-slapias',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { a: 'šlapias', to: 0 }],
      uk: 'Хлопчик мокрий.',
      ru: 'Мальчик мокрый.',
      en: 'The boy is wet.'
    },
    {
      id: 'lietus-linksmas',
      lt: [{ w: 'bet' }, { n: 'berniukas', c: 'V', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { w: 'labai' }, { a: 'linksmas', to: 1 }],
      uk: 'Але хлопчик дуже веселий.',
      ru: 'Но мальчик очень весёлый.',
      en: 'But the boy is very cheerful.'
    },
    {
      id: 'lietus-striuke',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'dėvėti', t: 'pres', p: 'p3' }, { a: 'dryžuotas', to: 3 }, { n: 'striukė', c: 'G', num: 'sg' }],
      uk: 'Хлопчик у смугастій куртці.',
      ru: 'Мальчик в полосатой куртке.',
      en: 'The boy is wearing a striped jacket.'
    },
    {
      id: 'lietus-balos',
      lt: [{ n: 'gatvė', c: 'Vt', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { w: 'daug' }, { n: 'bala', c: 'K', num: 'pl' }],
      uk: 'На вулиці багато калюж.',
      ru: 'На улице много луж.',
      en: 'There are a lot of puddles in the street.'
    },
    {
      id: 'lietus-slapia',
      lt: [{ n: 'gatvė', c: 'V', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { a: 'šlapias', to: 0 }],
      uk: 'Вулиця мокра.',
      ru: 'Улица мокрая.',
      en: 'The street is wet.'
    },
    {
      id: 'lietus-zibintas',
      lt: [{ prep: 'tarp' }, { n: 'moteris', c: 'K', num: 'sg' }, { w: 'ir' }, { n: 'berniukas', c: 'K', num: 'sg' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { n: 'žibintas', c: 'V', num: 'sg' }],
      uk: 'Між жінкою і хлопчиком стоїть ліхтар.',
      ru: 'Между женщиной и мальчиком стоит фонарь.',
      en: 'There is a street lamp between the woman and the boy.'
    },
    {
      id: 'lietus-namas',
      lt: [{ w: 'kairėje' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { a: 'aukštas', to: 3 }, { n: 'namas', c: 'V', num: 'sg' }],
      uk: 'Ліворуч стоїть високий будинок.',
      ru: 'Слева стоит высокий дом.',
      en: 'There is a tall building on the left.'
    }
  ]
};
