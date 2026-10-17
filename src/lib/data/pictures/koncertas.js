export default {
  id: 'koncertas',
  since: '2026-10-17',
  phrases: [
    {
      id: 'koncertas-siandien',
      lt: [{ w: 'šiandien' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { n: 'koncertas', c: 'V', num: 'sg' }],
      uk: 'Сьогодні концерт.',
      ru: 'Сегодня концерт.',
      en: 'There is a concert today.'
    },
    {
      id: 'koncertas-dainininke',
      lt: [{ n: 'scena', c: 'Vt', num: 'sg' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { n: 'dainininkė', c: 'V', num: 'sg' }],
      uk: 'На сцені стоїть співачка.',
      ru: 'На сцене стоит певица.',
      en: 'A singer is standing on the stage.'
    },
    {
      id: 'koncertas-dainuoja',
      lt: [{ n: 'dainininkė', c: 'V', num: 'sg' }, { w: 'garsiai' }, { v: 'dainuoti', t: 'pres', p: 'p3' }],
      uk: 'Співачка голосно співає.',
      ru: 'Певица громко поёт.',
      en: 'The singer is singing loudly.'
    },
    {
      id: 'koncertas-mikrofonas',
      lt: [{ n: 'dainininkė', c: 'V', num: 'sg' }, { v: 'laikyti', t: 'pres', p: 'p3' }, { n: 'mikrofonas', c: 'G', num: 'sg' }],
      uk: 'Співачка тримає мікрофон.',
      ru: 'Певица держит микрофон.',
      en: 'The singer is holding a microphone.'
    },
    {
      id: 'koncertas-suknele',
      lt: [{ n: 'dainininkė', c: 'V', num: 'sg' }, { v: 'vilkėti', t: 'pres', p: 'p3', alt: [{ v: 'dėvėti' }] }, { a: 'ilgas', to: 3 }, { n: 'suknelė', c: 'G', num: 'sg' }],
      uk: 'Співачка в довгій сукні.',
      ru: 'Певица в длинном платье.',
      en: 'The singer is wearing a long dress.'
    },
    {
      id: 'koncertas-plaukai',
      lt: [{ n: 'dainininkė', c: 'V', num: 'sg' }, { v: 'tureti', t: 'pres', p: 'p3' }, { a: 'ilgas', to: 3 }, { n: 'plaukai', c: 'G', num: 'pl' }],
      uk: 'У співачки довге волосся.',
      ru: 'У певицы длинные волосы.',
      en: 'The singer has long hair.'
    },
    {
      id: 'koncertas-gitara',
      lt: [{ w: 'dešinėje' }, { n: 'vaikinas', c: 'V', num: 'sg' }, { v: 'groti', t: 'pres', p: 'p3' }, { n: 'gitara', c: 'In', num: 'sg' }],
      uk: 'Праворуч хлопець грає на гітарі.',
      ru: 'Справа парень играет на гитаре.',
      en: 'On the right, a young man is playing the guitar.'
    },
    {
      id: 'koncertas-megztinis',
      lt: [{ n: 'vaikinas', c: 'V', num: 'sg' }, { v: 'vilkėti', t: 'pres', p: 'p3', alt: [{ v: 'dėvėti' }] }, { a: 'dryžuotas', to: 3 }, { n: 'megztinis', c: 'G', num: 'sg' }],
      uk: 'Хлопець у смугастому светрі.',
      ru: 'Парень в полосатом свитере.',
      en: 'The young man is wearing a striped sweater.'
    },
    {
      id: 'koncertas-lempos',
      lt: [{ prep: 'virš' }, { n: 'scena', c: 'K', num: 'sg' }, { v: 'šviesti', t: 'pres', p: 'p3' }, { q: '3', to: 4 }, { n: 'lempa', c: 'V', num: 'pl' }],
      uk: 'Над сценою світять три лампи.',
      ru: 'Над сценой светят три лампы.',
      en: 'Three lamps are shining above the stage.'
    },
    {
      id: 'koncertas-uzdangos',
      lt: [{ w: 'kairėje' }, { w: 'ir' }, { w: 'dešinėje' }, { v: 'kaboti', t: 'pres', p: 'p3' }, { n: 'uždanga', c: 'V', num: 'pl' }],
      uk: 'Ліворуч і праворуч висять завіси.',
      ru: 'Слева и справа висят занавеси.',
      en: 'Stage curtains hang on the left and on the right.'
    },
    {
      id: 'koncertas-ziurovai',
      lt: [{ prep: 'prieš' }, { n: 'scena', c: 'G', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { q: '3', to: 4 }, { n: 'žiūrovas', c: 'V', num: 'pl' }],
      uk: 'Перед сценою троє глядачів.',
      ru: 'Перед сценой три зрителя.',
      en: 'There are three spectators in front of the stage.'
    },
    {
      id: 'koncertas-klauso',
      lt: [{ n: 'žiūrovas', c: 'V', num: 'pl' }, { v: 'klausyti', t: 'pres', p: 'p3' }, { n: 'muzika', c: 'K', num: 'sg' }],
      uk: 'Глядачі слухають музику.',
      ru: 'Зрители слушают музыку.',
      en: 'The spectators are listening to the music.'
    },
    {
      id: 'koncertas-kepure',
      lt: [{ q: '1', to: 1 }, { n: 'žiūrovas', c: 'V', num: 'sg' }, { v: 'dėvėti', t: 'pres', p: 'p3' }, { n: 'kepurė', c: 'G', num: 'sg' }],
      uk: 'Один глядач у шапці.',
      ru: 'Один зритель в шапке.',
      en: 'One spectator is wearing a hat.'
    }
  ]
};
