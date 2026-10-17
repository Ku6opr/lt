export default {
  id: 'miegamasis',
  since: '2026-10-17',
  phrases: [
    {
      id: 'miegamasis-kambarys',
      lt: [{ pr: 'as', c: 'V', opt: true }, { v: 'matyti', t: 'pres', p: 'sg1' }, { n: 'kambarys', c: 'G', num: 'sg' }],
      uk: 'Я бачу кімнату.',
      ru: 'Я вижу комнату.',
      en: 'I see a room.'
    },
    {
      id: 'miegamasis-lova',
      lt: [{ n: 'kambarys', c: 'Vt', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { a: 'didelis', to: 3 }, { n: 'lova', c: 'V', num: 'sg' }],
      uk: 'У кімнаті є велике ліжко.',
      ru: 'В комнате большая кровать.',
      en: 'There is a big bed in the room.'
    },
    {
      id: 'miegamasis-mergaite',
      lt: [{ n: 'mergaitė', c: 'V', num: 'sg' }, { v: 'sėdėti', t: 'pres', p: 'p3' }, { n: 'lova', c: 'Vt', num: 'sg' }],
      uk: 'Дівчинка сидить у ліжку.',
      ru: 'Девочка сидит в кровати.',
      en: 'The girl is sitting up in bed.'
    },
    {
      id: 'miegamasis-knyga',
      lt: [{ n: 'mergaitė', c: 'V', num: 'sg' }, { v: 'skaityti', t: 'pres', p: 'p3' }, { n: 'knyga', c: 'G', num: 'sg' }],
      uk: 'Дівчинка читає книжку.',
      ru: 'Девочка читает книгу.',
      en: 'The girl is reading a book.'
    },
    {
      id: 'miegamasis-languota',
      lt: [{ n: 'antklodė', c: 'V', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { a: 'languotas', to: 0 }],
      uk: 'Ковдра картата.',
      ru: 'Одеяло клетчатое.',
      en: 'The blanket is checkered.'
    },
    {
      id: 'miegamasis-kate',
      lt: [{ prep: 'ant' }, { n: 'antklodė', c: 'K', num: 'sg' }, { v: 'miegoti', t: 'pres', p: 'p3' }, { n: 'katė', c: 'V', num: 'sg' }],
      uk: 'На ковдрі спить кішка.',
      ru: 'На одеяле спит кошка.',
      en: 'A cat is sleeping on the blanket.'
    },
    {
      id: 'miegamasis-dryzuota',
      lt: [{ n: 'katė', c: 'V', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { a: 'dryžuotas', to: 0 }],
      uk: 'Кішка смугаста.',
      ru: 'Кошка полосатая.',
      en: 'The cat is striped.'
    },
    {
      id: 'miegamasis-skaito',
      lt: [{ n: 'katė', c: 'V', num: 'sg' }, { v: 'miegoti', t: 'pres', p: 'p3', after: ',' }, { w: 'o' }, { n: 'mergaitė', c: 'V', num: 'sg' }, { v: 'skaityti', t: 'pres', p: 'p3' }],
      uk: 'Кішка спить, а дівчинка читає.',
      ru: 'Кошка спит, а девочка читает.',
      en: 'The cat is sleeping, and the girl is reading.'
    },
    {
      id: 'miegamasis-lempa',
      lt: [{ prep: 'šalia' }, { n: 'lova', c: 'K', num: 'sg' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { n: 'lempa', c: 'V', num: 'sg' }],
      uk: 'Біля ліжка стоїть лампа.',
      ru: 'Рядом с кроватью стоит лампа.',
      en: 'There is a lamp next to the bed.'
    },
    {
      id: 'miegamasis-sviecia',
      lt: [{ n: 'lempa', c: 'V', num: 'sg' }, { v: 'šviesti', t: 'pres', p: 'p3' }],
      uk: 'Лампа світить.',
      ru: 'Лампа светит.',
      en: 'The lamp is shining.'
    },
    {
      id: 'miegamasis-langas',
      lt: [{ w: 'kairėje' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { n: 'langas', c: 'V', num: 'sg' }],
      uk: 'Ліворуч — вікно.',
      ru: 'Слева — окно.',
      en: 'There is a window on the left.'
    },
    {
      id: 'miegamasis-menulis',
      lt: [{ n: 'dangus', c: 'Vt', num: 'sg' }, { v: 'šviesti', t: 'pres', p: 'p3' }, { n: 'mėnulis', c: 'V', num: 'sg' }, { w: 'ir' }, { n: 'žvaigždė', c: 'V', num: 'pl' }],
      uk: 'На небі світять місяць і зорі.',
      ru: 'На небе светят луна и звёзды.',
      en: 'The moon and the stars are shining in the sky.'
    },
    {
      id: 'miegamasis-paveikslas',
      lt: [{ prep: 'virš' }, { n: 'lova', c: 'K', num: 'sg' }, { v: 'kaboti', t: 'pres', p: 'p3' }, { n: 'paveikslas', c: 'V', num: 'sg' }],
      uk: 'Над ліжком висить картина.',
      ru: 'Над кроватью висит картина.',
      en: 'A picture is hanging above the bed.'
    },
    {
      id: 'miegamasis-kalnai',
      lt: [{ n: 'paveikslas', c: 'Vt', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { n: 'kalnas', c: 'V', num: 'pl' }, { w: 'ir' }, { n: 'saulė', c: 'V', num: 'sg' }],
      uk: 'На картині гори й сонце.',
      ru: 'На картине горы и солнце.',
      en: 'The picture shows mountains and the sun.'
    },
    {
      id: 'miegamasis-kilimas',
      lt: [{ prep: 'ant' }, { n: 'grindys', c: 'K', num: 'pl' }, { v: 'gulėti', t: 'pres', p: 'p3' }, { n: 'kilimas', c: 'V', num: 'sg' }],
      uk: 'На підлозі лежить килим.',
      ru: 'На полу лежит ковёр.',
      en: 'There is a rug on the floor.'
    }
  ]
};
