export default {
  id: 'kepykla',
  since: '2026-10-17',
  phrases: [
    {
      id: 'kepykla-dirba',
      lt: [{ n: 'kepyklėlė', c: 'Vt', num: 'sg' }, { v: 'dirbti', t: 'pres', p: 'p3' }, { n: 'pardavėja', c: 'V', num: 'sg' }],
      uk: 'У пекарні працює продавчиня.',
      ru: 'В пекарне работает продавщица.',
      en: 'A saleswoman works in the bakery.'
    },
    {
      id: 'kepykla-kepure',
      lt: [{ n: 'pardavėja', c: 'V', num: 'sg' }, { v: 'dėvėti', t: 'pres', p: 'p3' }, { a: 'baltas', to: 3 }, { n: 'kepurė', c: 'G', num: 'sg' }, { w: 'ir' }, { n: 'prijuostė', c: 'G', num: 'sg' }],
      uk: 'Продавчиня в білому ковпаку й фартусі.',
      ru: 'Продавщица в белом колпаке и фартуке.',
      en: 'The saleswoman is wearing a white hat and apron.'
    },
    {
      id: 'kepykla-prekystalis',
      lt: [{ n: 'pardavėja', c: 'V', num: 'sg' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { prep: 'už' }, { n: 'prekystalis', c: 'K', num: 'sg' }],
      uk: 'Продавчиня стоїть за прилавком.',
      ru: 'Продавщица стоит за прилавком.',
      en: 'The saleswoman is standing behind the counter.'
    },
    {
      id: 'kepykla-berniukas',
      lt: [{ w: 'dešinėje' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { n: 'berniukas', c: 'V', num: 'sg' }],
      uk: 'Праворуч стоїть хлопчик.',
      ru: 'Справа стоит мальчик.',
      en: 'A boy is standing on the right.'
    },
    {
      id: 'kepykla-duoda',
      lt: [{ n: 'pardavėja', c: 'V', num: 'sg' }, { v: 'duoti', t: 'pres', p: 'p3' }, { n: 'berniukas', c: 'N', num: 'sg' }, { n: 'bandelė', c: 'G', num: 'sg' }],
      uk: 'Продавчиня дає хлопчикові булочку.',
      ru: 'Продавщица даёт мальчику булочку.',
      en: 'The saleswoman is giving the boy a bun.'
    },
    {
      id: 'kepykla-perka',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'pirkti', t: 'pres', p: 'p3' }, { n: 'bandelė', c: 'G', num: 'sg' }],
      uk: 'Хлопчик купує булочку.',
      ru: 'Мальчик покупает булочку.',
      en: 'The boy is buying a bun.'
    },
    {
      id: 'kepykla-linksmas',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { a: 'linksmas', to: 0 }],
      uk: 'Хлопчик веселий.',
      ru: 'Мальчик весёлый.',
      en: 'The boy is cheerful.'
    },
    {
      id: 'kepykla-kuprine',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'tureti', t: 'pres', p: 'p3' }, { n: 'kuprinė', c: 'G', num: 'sg' }],
      uk: 'У хлопчика рюкзак.',
      ru: 'У мальчика рюкзак.',
      en: 'The boy has a backpack.'
    },
    {
      id: 'kepykla-kelnes',
      lt: [{ n: 'berniukas', c: 'V', num: 'sg' }, { v: 'dėvėti', t: 'pres', p: 'p3' }, { a: 'trumpas', to: 3 }, { n: 'kelnės', c: 'G', num: 'pl' }],
      uk: 'Хлопчик у шортах.',
      ru: 'Мальчик в шортах.',
      en: 'The boy is wearing shorts.'
    },
    {
      id: 'kepykla-lentynos',
      lt: [{ prep: 'ant' }, { n: 'lentyna', c: 'K', num: 'pl' }, { v: 'gulėti', t: 'pres', p: 'p3' }, { n: 'duona', c: 'V', num: 'sg' }, { w: 'ir' }, { n: 'batonas', c: 'V', num: 'pl' }],
      uk: 'На полицях лежать хліб і батони.',
      ru: 'На полках лежат хлеб и батоны.',
      en: 'Bread and long loaves are lying on the shelves.'
    },
    {
      id: 'kepykla-batonai',
      lt: [{ prep: 'ant' }, { n: 'lentyna', c: 'K', num: 'sg' }, { v: 'gulėti', t: 'pres', p: 'p3' }, { q: '3', to: 4 }, { n: 'batonas', c: 'V', num: 'pl' }],
      uk: 'На полиці лежать три батони.',
      ru: 'На полке лежат три батона.',
      en: 'There are three long loaves on the shelf.'
    },
    {
      id: 'kepykla-tortas',
      lt: [{ w: 'kairėje' }, { v: 'stovėti', t: 'pres', p: 'p3' }, { a: 'didelis', to: 3 }, { n: 'tortas', c: 'V', num: 'sg' }],
      uk: 'Ліворуч стоїть великий торт.',
      ru: 'Слева стоит большой торт.',
      en: 'There is a big cake on the left.'
    },
    {
      id: 'kepykla-vysnios',
      lt: [{ prep: 'ant' }, { n: 'tortas', c: 'K', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { q: '3', to: 4 }, { n: 'vyšnia', c: 'V', num: 'pl' }],
      uk: 'На торті три вишні.',
      ru: 'На торте три вишни.',
      en: 'There are three cherries on the cake.'
    },
    {
      id: 'kepykla-bandeles',
      lt: [{ n: 'krepšelis', c: 'Vt', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { w: 'daug' }, { n: 'bandelė', c: 'K', num: 'pl' }],
      uk: 'У кошику багато булочок.',
      ru: 'В корзинке много булочек.',
      en: 'There are a lot of buns in the basket.'
    },
    {
      id: 'kepykla-laikrodis',
      lt: [{ prep: 'ant' }, { n: 'siena', c: 'K', num: 'sg' }, { v: 'kaboti', t: 'pres', p: 'p3' }, { n: 'laikrodis', c: 'V', num: 'sg' }],
      uk: 'На стіні висить годинник.',
      ru: 'На стене висят часы.',
      en: 'There is a clock on the wall.'
    }
  ]
};
