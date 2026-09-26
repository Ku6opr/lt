export const DAILY_COUNT = 20;

export const DAILY_SYNONYMS = [
  { words: ['tėvas', 'tėtis'], num: 'sg' },
  { words: ['mama', 'motina'] },
  { words: ['močiutė', 'senelė'] },
  { words: ['automobilis', 'mašina'] }
];

export const DAILY_PHRASES = [
  {
    id: 'berniukas-obuolys',
    lt: [{ a: 'gražus', to: 1 }, { n: 'berniukas', c: 'V', num: 'sg' }, { v: 'valgyti', t: 'past', p: 'p3' }, { a: 'geltonas', to: 4 }, { n: 'obuolys', c: 'G', num: 'sg' }],
    uk: 'Гарний хлопчик їв жовте яблуко.',
    ru: 'Красивый мальчик ел жёлтое яблоко.',
    en: 'The handsome boy ate a yellow apple.'
  },
  {
    id: 'draugai-parkas',
    lt: [{ w: 'rytoj' }, { q: '3', to: 2 }, { n: 'draugas', c: 'V', num: 'pl' }, { v: 'eiti', t: 'fut', p: 'p3' }, { prep: 'į' }, { n: 'parkas', c: 'G', num: 'sg' }],
    uk: 'Завтра троє друзів підуть у парк.',
    ru: 'Завтра три друга пойдут в парк.',
    en: 'Tomorrow three friends will go to the park.'
  },
  {
    id: 'senele-dainuoja',
    lt: [{ n: 'vakaras', c: 'Vt', num: 'sg', alt: [{ c: 'In', num: 'pl' }] }, { n: 'senelė', c: 'V', num: 'sg', alt: [{ n: 'močiutė' }] }, { pr: 'mes', c: 'N' }, { v: 'dainuoti', t: 'pres', p: 'p3' }],
    uk: 'Увечері бабуся нам співає.',
    ru: 'Вечером бабушка нам поёт.',
    en: 'In the evening, Grandma sings to us.'
  },
  {
    id: 'vyras-dviratis',
    lt: [{ d: 'tas', to: 1 }, { n: 'vyras', c: 'V', num: 'sg' }, { v: 'noreti', t: 'cond', p: 'p3' }, { a: 'naujas', to: 4 }, { n: 'dviratis', c: 'K', num: 'sg' }],
    uk: 'Той чоловік хотів би новий велосипед.',
    ru: 'Тот мужчина хотел бы новый велосипед.',
    en: 'That man would like a new bicycle.'
  },
  {
    id: 'senelis-kaimas',
    lt: [{ n: 'senelis', c: 'V', num: 'sg' }, { w: 'anksčiau' }, { v: 'gyventi', t: 'past', p: 'p3' }, { a: 'mažas', to: 4 }, { n: 'kaimas', c: 'Vt', num: 'sg' }, { prep: 'su' }, { q: '2', to: 7 }, { n: 'šuo', c: 'In', num: 'pl' }],
    uk: 'Дідусь раніше жив у маленькому селі з двома собаками.',
    ru: 'Дедушка раньше жил в маленькой деревне с двумя собаками.',
    en: 'Grandpa used to live in a small village with two dogs.'
  },
  {
    id: 'mama-pyragas',
    lt: [{ n: 'mama', c: 'V', num: 'sg' }, { v: 'kepti', t: 'pres', p: 'p3' }, { a: 'skanus', to: 3 }, { n: 'pyragas', c: 'G', num: 'sg' }],
    uk: 'Мама пече смачний пиріг.',
    ru: 'Мама печёт вкусный пирог.',
    en: 'Mom is baking a tasty pie.'
  },
  {
    id: 'sesuo-universitetas',
    lt: [{ w: 'mano' }, { n: 'sesuo', c: 'V', num: 'sg' }, { v: 'studijuoti', t: 'pres', p: 'p3' }, { n: 'universitetas', c: 'Vt', num: 'sg' }],
    uk: 'Моя сестра навчається в університеті.',
    ru: 'Моя сестра учится в университете.',
    en: 'My sister studies at university.'
  },
  {
    id: 'mergaite-gele',
    lt: [{ n: 'mergaitė', c: 'V', num: 'sg' }, { v: 'padovanoti', t: 'past', p: 'p3', alt: [{ v: 'dovanoti' }] }, { n: 'mama', c: 'N', num: 'sg' }, { a: 'gražus', to: 4 }, { n: 'gėlė', c: 'G', num: 'sg' }],
    uk: 'Дівчинка подарувала мамі гарну квітку.',
    ru: 'Девочка подарила маме красивый цветок.',
    en: 'The girl gave Mom a beautiful flower as a gift.'
  },
  {
    id: 'tevas-sriuba',
    lt: [{ n: 'tėvas', c: 'V', num: 'sg', alt: [{ n: 'tėtis' }] }, { v: 'virti', t: 'pres', p: 'p3' }, { a: 'karštas', to: 3 }, { n: 'sriuba', c: 'G', num: 'sg' }, { n: 'virtuvė', c: 'Vt', num: 'sg' }],
    uk: 'Батько варить гарячий суп на кухні.',
    ru: 'Отец варит горячий суп на кухне.',
    en: 'Father is cooking hot soup in the kitchen.'
  },
  {
    id: 'seima-penki',
    lt: [{ pr: 'mes', c: 'K' }, { n: 'šeima', c: 'Vt', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { q: '5', to: 4 }, { n: 'žmogus', c: 'V', num: 'pl' }],
    uk: 'У нашій родині п’ять людей.',
    ru: 'В нашей семье пять человек.',
    en: 'There are five people in our family.'
  },
  {
    id: 'dede-sunys',
    lt: [{ w: 'mano', opt: true }, { n: 'dėdė', c: 'V', num: 'sg' }, { v: 'tureti', t: 'pres', p: 'p3' }, { q: '2', to: 4 }, { n: 'šuo', c: 'G', num: 'pl' }, { w: 'ir' }, { q: '3', to: 7 }, { n: 'katė', c: 'G', num: 'pl' }],
    uk: 'Мій дядько має двох собак і трьох кішок.',
    ru: 'У моего дяди две собаки и три кошки.',
    en: 'My uncle has two dogs and three cats.'
  },
  {
    id: 'vaikai-futbolas',
    lt: [{ n: 'vaikas', c: 'V', num: 'pl' }, { v: 'žaisti', t: 'pres', p: 'p3' }, { n: 'futbolas', c: 'G', num: 'sg' }, { n: 'kiemas', c: 'Vt', num: 'sg' }],
    uk: 'Діти грають у футбол у дворі.',
    ru: 'Дети играют в футбол во дворе.',
    en: 'The children are playing soccer in the yard.'
  },
  {
    id: 'senelis-sachmatai',
    lt: [{ n: 'senelis', c: 'V', num: 'sg' }, { v: 'žaisti', t: 'pres', p: 'p3' }, { n: 'šachmatai', c: 'In', num: 'pl' }, { prep: 'su' }, { w: 'savo', opt: true }, { n: 'anūkas', c: 'In', num: 'sg' }],
    uk: 'Дідусь грає в шахи з онуком.',
    ru: 'Дедушка играет в шахматы с внуком.',
    en: 'Grandpa is playing chess with his grandson.'
  },
  {
    id: 'vaikinas-gitara',
    lt: [{ n: 'vaikinas', c: 'V', num: 'sg' }, { v: 'groti', t: 'pres', p: 'p3' }, { n: 'gitara', c: 'In', num: 'sg', after: ',' }, { w: 'o' }, { n: 'mergina', c: 'V', num: 'sg' }, { v: 'dainuoti', t: 'pres', p: 'p3' }],
    uk: 'Хлопець грає на гітарі, а дівчина співає.',
    ru: 'Парень играет на гитаре, а девушка поёт.',
    en: 'The guy plays the guitar, and the girl sings.'
  },
  {
    id: 'noreciau-arbatos',
    lt: [{ pr: 'as', c: 'V', opt: true }, { v: 'noreti', t: 'cond', p: 'sg1' }, { a: 'karštas', to: 3 }, { n: 'arbata', c: 'K', num: 'sg' }],
    uk: 'Я б хотів гарячого чаю.',
    ru: 'Я бы хотел горячего чая.',
    en: 'I would like some hot tea.'
  },
  {
    id: 'restoranas-zuvis',
    lt: [{ w: 'vakar' }, { n: 'restoranas', c: 'Vt', num: 'sg' }, { pr: 'mes', c: 'V', opt: true }, { v: 'valgyti', t: 'past', p: 'pl1' }, { a: 'šviežias', to: 5 }, { n: 'žuvis', c: 'G', num: 'sg', alt: [{ c: 'K' }] }],
    uk: 'Учора в ресторані ми їли свіжу рибу.',
    ru: 'Вчера в ресторане мы ели свежую рыбу.',
    en: 'Yesterday we ate fresh fish at a restaurant.'
  },
  {
    id: 'ledai-skanus',
    lt: [{ d: 'sis', to: 1 }, { n: 'ledai', c: 'V', num: 'pl' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { w: 'labai' }, { a: 'skanus', to: 1 }],
    uk: 'Це морозиво дуже смачне.',
    ru: 'Это мороженое очень вкусное.',
    en: 'This ice cream is very tasty.'
  },
  {
    id: 'mociute-pyragai',
    lt: [{ n: 'močiutė', c: 'V', num: 'sg', alt: [{ n: 'senelė' }] }, { w: 'anksčiau', opt: true }, { v: 'kepti', t: 'habit', p: 'p3' }, { a: 'skanus', to: 4 }, { n: 'pyragas', c: 'G', num: 'pl' }],
    uk: 'Бабуся раніше пекла смачні пироги.',
    ru: 'Бабушка раньше пекла вкусные пироги.',
    en: 'Grandma used to bake tasty pies.'
  },
  {
    id: 'pusryciai-kose',
    lt: [{ w: 'rytoj' }, { n: 'pusryčiai', c: 'N', num: 'pl' }, { pr: 'as', c: 'V', opt: true }, { v: 'valgyti', t: 'fut', p: 'sg1' }, { n: 'košė', c: 'G', num: 'sg' }, { prep: 'su' }, { n: 'uoga', c: 'In', num: 'pl' }],
    uk: 'Завтра на сніданок я їстиму кашу з ягодами.',
    ru: 'Завтра на завтрак я буду есть кашу с ягодами.',
    en: 'Tomorrow I will eat porridge with berries for breakfast.'
  },
  {
    id: 'kiek-bilietas',
    lt: [{ w: 'kiek' }, { v: 'kainuoti', t: 'pres', p: 'p3' }, { d: 'sis', to: 3 }, { n: 'bilietas', c: 'V', num: 'sg' }],
    end: '?',
    uk: 'Скільки коштує цей квиток?',
    ru: 'Сколько стоит этот билет?',
    en: 'How much does this ticket cost?'
  },
  {
    id: 'patinka-miestas',
    lt: [{ pr: 'as', c: 'N' }, { w: 'labai' }, { v: 'patikti', t: 'pres', p: 'p3' }, { d: 'sis', to: 4 }, { n: 'miestas', c: 'V', num: 'sg' }],
    uk: 'Мені дуже подобається це місто.',
    ru: 'Мне очень нравится этот город.',
    en: 'I really like this city.'
  },
  {
    id: 'reikia-saldytuvo',
    lt: [{ pr: 'mes', c: 'N' }, { v: 'reikėti', t: 'pres', p: 'p3' }, { a: 'naujas', to: 3 }, { n: 'šaldytuvas', c: 'K', num: 'sg' }],
    uk: 'Нам потрібен новий холодильник.',
    ru: 'Нам нужен новый холодильник.',
    en: 'We need a new fridge.'
  },
  {
    id: 'nori-vandens',
    lt: [{ w: 'ar', opt: true }, { pr: 'tu', c: 'V', opt: true, alt: [{ pr: 'jus' }] }, { v: 'noreti', t: 'pres', p: 'sg2', alt: [{ p: 'pl2' }] }, { a: 'šaltas', to: 4 }, { n: 'vanduo', c: 'K', num: 'sg' }],
    end: '?',
    uk: 'Ти хочеш холодної води?',
    ru: 'Ты хочешь холодной воды?',
    en: 'Do you want some cold water?'
  },
  {
    id: 'turgus-moliugas',
    lt: [{ n: 'turgus', c: 'Vt', num: 'sg' }, { n: 'mama', c: 'V', num: 'sg' }, { v: 'nupirkti', t: 'past', p: 'p3', alt: [{ v: 'pirkti' }] }, { a: 'didelis', to: 4 }, { n: 'moliūgas', c: 'G', num: 'sg' }],
    uk: 'На ринку мама купила великий гарбуз.',
    ru: 'На рынке мама купила большую тыкву.',
    en: 'Mom bought a big pumpkin at the market.'
  },
  {
    id: 'sveciai-svetaine',
    lt: [{ n: 'svečias', c: 'V', num: 'pl' }, { v: 'sėdėti', t: 'past', p: 'p3' }, { a: 'didelis', to: 3 }, { n: 'svetainė', c: 'Vt', num: 'sg' }],
    uk: 'Гості сиділи у великій вітальні.',
    ru: 'Гости сидели в большой гостиной.',
    en: 'The guests were sitting in the big living room.'
  },
  {
    id: 'kava-pienas',
    lt: [{ pr: 'as', c: 'V', opt: true }, { v: 'mėgti', t: 'pres', p: 'sg1' }, { n: 'kava', c: 'G', num: 'sg' }, { prep: 'su' }, { n: 'pienas', c: 'In', num: 'sg' }],
    uk: 'Я люблю каву з молоком.',
    ru: 'Я люблю кофе с молоком.',
    en: 'I like coffee with milk.'
  },
  {
    id: 'saltibarsciai',
    lt: [{ n: 'vasara', c: 'G', num: 'sg' }, { pr: 'mes', c: 'V', opt: true }, { v: 'valgyti', t: 'pres', p: 'pl1' }, { n: 'šaltibarščiai', c: 'G', num: 'pl' }, { prep: 'su' }, { n: 'bulvė', c: 'In', num: 'pl' }],
    uk: 'Улітку ми їмо холодний борщ із картоплею.',
    ru: 'Летом мы едим холодный борщ с картошкой.',
    en: 'In summer we eat cold beet soup with potatoes.'
  },
  {
    id: 'duok-obuoli',
    lt: [{ v: 'duoti', t: 'imp', p: 'sg2', alt: [{ p: 'pl2' }] }, { pr: 'as', c: 'N' }, { d: 'tas', to: 4 }, { a: 'raudonas', to: 4 }, { n: 'obuolys', c: 'G', num: 'sg' }],
    end: '!',
    uk: 'Дай мені те червоне яблуко!',
    ru: 'Дай мне то красное яблоко!',
    en: 'Give me that red apple!'
  },
  {
    id: 'imk-bandele',
    lt: [{ v: 'imti', t: 'imp', p: 'sg2', alt: [{ p: 'pl2' }] }, { w: 'dar' }, { q: '1', to: 3 }, { n: 'bandelė', c: 'G', num: 'sg' }],
    end: '!',
    uk: 'Візьми ще одну булочку!',
    ru: 'Возьми ещё одну булочку!',
    en: 'Take one more bun!'
  },
  {
    id: 'picerija',
    lt: [{ w: 'šiandien' }, { pr: 'mes', c: 'V', opt: true }, { v: 'vakarieniauti', t: 'fut', p: 'pl1' }, { n: 'picerija', c: 'Vt', num: 'sg' }],
    uk: 'Сьогодні ми вечерятимемо в піцерії.',
    ru: 'Сегодня мы будем ужинать в пиццерии.',
    en: 'Today we will have dinner at a pizzeria.'
  },
  {
    id: 'kate-sofa',
    lt: [{ n: 'katė', c: 'V', num: 'sg' }, { v: 'miegoti', t: 'pres', p: 'p3' }, { prep: 'ant' }, { a: 'minkštas', to: 4 }, { n: 'sofa', c: 'K', num: 'sg' }],
    uk: 'Кішка спить на м’якій софі.',
    ru: 'Кошка спит на мягкой софе.',
    en: 'The cat is sleeping on a soft sofa.'
  },
  {
    id: 'knyga-stalas',
    lt: [{ a: 'naujas', to: 1 }, { n: 'knyga', c: 'V', num: 'sg' }, { v: 'gulėti', t: 'pres', p: 'p3' }, { prep: 'ant' }, { a: 'didelis', to: 5 }, { n: 'stalas', c: 'K', num: 'sg' }],
    uk: 'Нова книжка лежить на великому столі.',
    ru: 'Новая книга лежит на большом столе.',
    en: 'The new book is lying on a big table.'
  },
  {
    id: 'atidarykite-langus',
    lt: [{ v: 'atidaryti', t: 'imp', p: 'pl2', alt: [{ p: 'sg2' }] }, { d: 'visas', to: 2 }, { n: 'langas', c: 'G', num: 'pl' }],
    end: '!',
    uk: 'Відчиніть усі вікна!',
    ru: 'Откройте все окна!',
    en: 'Open all the windows!'
  },
  {
    id: 'valysime-buta',
    lt: [{ n: 'šeštadienis', c: 'G', num: 'sg' }, { pr: 'mes', c: 'V', opt: true }, { v: 'valyti', t: 'fut', p: 'pl1', alt: [{ v: 'tvarkyti' }] }, { d: 'visas', to: 4 }, { n: 'butas', c: 'G', num: 'sg' }],
    uk: 'У суботу ми прибиратимемо всю квартиру.',
    ru: 'В субботу мы будем убирать всю квартиру.',
    en: 'On Saturday we will clean the whole apartment.'
  },
  {
    id: 'automobilis-namas',
    lt: [{ a: 'raudonas', to: 1 }, { n: 'automobilis', c: 'V', num: 'sg', alt: [{ n: 'mašina' }] }, { v: 'stovėti', t: 'pres', p: 'p3' }, { prep: 'prie' }, { pr: 'mes', c: 'K' }, { n: 'namas', c: 'K', num: 'sg' }],
    uk: 'Червоне авто стоїть біля нашого будинку.',
    ru: 'Красный автомобиль стоит возле нашего дома.',
    en: 'A red car is parked near our house.'
  },
  {
    id: 'filmas',
    lt: [{ n: 'vakaras', c: 'Vt', num: 'sg' }, { pr: 'mes', c: 'V', opt: true }, { v: 'žiūrėti', t: 'past', p: 'pl1' }, { a: 'įdomus', to: 4 }, { n: 'filmas', c: 'G', num: 'sg' }],
    uk: 'Увечері ми дивилися цікавий фільм.',
    ru: 'Вечером мы смотрели интересный фильм.',
    en: 'In the evening we watched an interesting film.'
  },
  {
    id: 'klausyti-muzikos',
    lt: [{ n: 'senelis', c: 'V', num: 'sg' }, { v: 'mėgti', t: 'pres', p: 'p3' }, { v: 'klausyti', t: 'inf' }, { n: 'muzika', c: 'K', num: 'sg' }],
    uk: 'Дідусь любить слухати музику.',
    ru: 'Дедушка любит слушать музыку.',
    en: 'Grandpa likes listening to music.'
  },
  {
    id: 'ieskau-telefono',
    lt: [{ pr: 'as', c: 'V', opt: true }, { v: 'ieškoti', t: 'pres', p: 'sg1' }, { w: 'savo' }, { n: 'telefonas', c: 'K', num: 'sg' }],
    uk: 'Я шукаю свій телефон.',
    ru: 'Я ищу свой телефон.',
    en: 'I am looking for my phone.'
  },
  {
    id: 'traukinys-sostine',
    lt: [{ w: 'rytoj' }, { pr: 'mes', c: 'V', opt: true }, { v: 'važiuoti', t: 'fut', p: 'pl1' }, { n: 'traukinys', c: 'In', num: 'sg' }, { prep: 'į' }, { n: 'sostinė', c: 'G', num: 'sg' }],
    uk: 'Завтра ми поїдемо потягом до столиці.',
    ru: 'Завтра мы поедем на поезде в столицу.',
    en: 'Tomorrow we will go to the capital by train.'
  },
  {
    id: 'autobusas-veluoja',
    lt: [{ n: 'autobusas', c: 'V', num: 'sg' }, { v: 'vėluoti', t: 'pres', p: 'p3' }, { q: '5', to: 3 }, { n: 'minutė', c: 'G', num: 'pl' }],
    uk: 'Автобус запізнюється на п’ять хвилин.',
    ru: 'Автобус опаздывает на пять минут.',
    en: 'The bus is five minutes late.'
  },
  {
    id: 'skubame-darbas',
    lt: [{ n: 'rytas', c: 'G', num: 'sg', alt: [{ c: 'In', num: 'pl' }, { c: 'Vt' }] }, { pr: 'mes', c: 'V', opt: true }, { v: 'skubėti', t: 'pres', p: 'pl1' }, { prep: 'į' }, { n: 'darbas', c: 'G', num: 'sg' }],
    uk: 'Уранці ми поспішаємо на роботу.',
    ru: 'Утром мы спешим на работу.',
    en: 'In the morning we hurry to work.'
  },
  {
    id: 'senamiestis-vaikstome',
    lt: [{ n: 'sekmadienis', c: 'In', num: 'pl' }, { pr: 'mes', c: 'V', opt: true }, { v: 'vaikščioti', t: 'pres', p: 'pl1' }, { n: 'senamiestis', c: 'Vt', num: 'sg' }],
    uk: 'По неділях ми гуляємо старим містом.',
    ru: 'По воскресеньям мы гуляем по старому городу.',
    en: 'On Sundays we walk around the old town.'
  },
  {
    id: 'keliausime-automobiliu',
    lt: [{ n: 'vasara', c: 'G', num: 'sg' }, { pr: 'mes', c: 'V', opt: true }, { v: 'keliauti', t: 'fut', p: 'pl1' }, { n: 'automobilis', c: 'In', num: 'sg', alt: [{ n: 'mašina' }] }],
    uk: 'Улітку ми подорожуватимемо автомобілем.',
    ru: 'Летом мы будем путешествовать на автомобиле.',
    en: 'In summer we will travel by car.'
  },
  {
    id: 'tevas-grys',
    lt: [{ n: 'tėvas', c: 'V', num: 'sg', alt: [{ n: 'tėtis' }] }, { v: 'grįžti', t: 'fut', p: 'p3' }, { w: 'namo' }, { n: 'vakaras', c: 'Vt', num: 'sg' }],
    uk: 'Батько повернеться додому ввечері.',
    ru: 'Отец вернётся домой вечером.',
    en: 'Father will come home in the evening.'
  },
  {
    id: 'susitiksime-kavine',
    lt: [{ pr: 'mes', c: 'V', opt: true }, { v: 'susitikti', t: 'fut', p: 'pl1' }, { prep: 'su' }, { n: 'draugas', c: 'In', num: 'pl' }, { n: 'kavinė', c: 'Vt', num: 'sg' }],
    uk: 'Ми зустрінемося з друзями в кав’ярні.',
    ru: 'Мы встретимся с друзьями в кафе.',
    en: 'We will meet up with friends at a café.'
  },
  {
    id: 'kvieciu-koncertas',
    lt: [{ pr: 'as', c: 'V', opt: true }, { v: 'kviesti', t: 'pres', p: 'sg1' }, { pr: 'tu', c: 'G', alt: [{ pr: 'jus' }] }, { prep: 'į' }, { n: 'koncertas', c: 'G', num: 'sg' }],
    uk: 'Запрошую тебе на концерт.',
    ru: 'Приглашаю тебя на концерт.',
    en: 'I am inviting you to a concert.'
  },
  {
    id: 'knygynas-knygos',
    lt: [{ d: 'sis', to: 1 }, { n: 'knygynas', c: 'Vt', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { w: 'daug' }, { a: 'įdomus', to: 5 }, { n: 'knyga', c: 'K', num: 'pl' }],
    uk: 'У цій книгарні багато цікавих книжок.',
    ru: 'В этом книжном магазине много интересных книг.',
    en: 'There are many interesting books in this bookstore.'
  },
  {
    id: 'trys-egzaminai',
    lt: [{ d: 'sis', to: 1 }, { n: 'savaitė', c: 'G', num: 'sg' }, { pr: 'mes', c: 'V', opt: true }, { v: 'tureti', t: 'pres', p: 'pl1' }, { q: '3', to: 5 }, { n: 'egzaminas', c: 'G', num: 'pl' }],
    uk: 'Цього тижня в нас три іспити.',
    ru: 'На этой неделе у нас три экзамена.',
    en: 'This week we have three exams.'
  },
  {
    id: 'naujas-darbas',
    lt: [{ d: 'kitas', to: 1 }, { n: 'savaitė', c: 'G', num: 'sg' }, { pr: 'as', c: 'V', opt: true }, { v: 'pradėti', t: 'fut', p: 'sg1' }, { a: 'naujas', to: 5 }, { n: 'darbas', c: 'G', num: 'sg' }],
    uk: 'Наступного тижня я почну нову роботу.',
    ru: 'На следующей неделе я начну новую работу.',
    en: 'Next week I will start a new job.'
  },
  {
    id: 'brolis-mokykla',
    lt: [{ w: 'mano' }, { n: 'brolis', c: 'V', num: 'sg' }, { v: 'baigti', t: 'past', p: 'p3' }, { n: 'mokykla', c: 'G', num: 'sg' }, { w: 'pernai' }],
    uk: 'Мій брат закінчив школу торік.',
    ru: 'Мой брат окончил школу в прошлом году.',
    en: 'My brother finished school last year.'
  },
  {
    id: 'vaikas-sirgo',
    lt: [{ n: 'vaikas', c: 'V', num: 'sg' }, { v: 'sirgti', t: 'past', p: 'p3' }, { d: 'visas', to: 3 }, { n: 'savaitė', c: 'G', num: 'sg' }],
    uk: 'Дитина хворіла цілий тиждень.',
    ru: 'Ребёнок болел целую неделю.',
    en: 'The child was sick for a whole week.'
  },
  {
    id: 'kepure-pirstines',
    lt: [{ n: 'mergina', c: 'V', num: 'sg' }, { v: 'nusipirkti', t: 'past', p: 'p3', alt: [{ v: 'nupirkti' }, { v: 'pirkti' }] }, { a: 'naujas', to: 3 }, { n: 'kepurė', c: 'G', num: 'sg' }, { w: 'ir' }, { a: 'šiltas', to: 6 }, { n: 'pirštinė', c: 'G', num: 'pl' }],
    uk: 'Дівчина купила нову шапку й теплі рукавички.',
    ru: 'Девушка купила новую шапку и тёплые перчатки.',
    en: 'The young woman bought a new hat and warm gloves.'
  },
  {
    id: 'paltas-didelis',
    lt: [{ d: 'sis', to: 1 }, { n: 'paltas', c: 'V', num: 'sg' }, { pr: 'as', c: 'N' }, { w: 'per' }, { a: 'didelis', to: 1 }],
    uk: 'Це пальто мені завелике.',
    ru: 'Это пальто мне велико.',
    en: 'This coat is too big for me.'
  },
  {
    id: 'marskiniai',
    lt: [{ w: 'kur' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { w: 'mano' }, { a: 'mėlynas', to: 4 }, { n: 'marškiniai', c: 'V', num: 'pl' }],
    end: '?',
    uk: 'Де моя синя сорочка?',
    ru: 'Где моя синяя рубашка?',
    en: 'Where is my blue shirt?'
  },
  {
    id: 'tevai-kuprine',
    lt: [{ w: 'mano' }, { n: 'tėvas', c: 'V', num: 'pl' }, { v: 'padovanoti', t: 'fut', p: 'p3', alt: [{ v: 'dovanoti' }] }, { pr: 'as', c: 'N' }, { a: 'naujas', to: 5 }, { n: 'kuprinė', c: 'G', num: 'sg' }],
    uk: 'Мої батьки подарують мені новий рюкзак.',
    ru: 'Мои родители подарят мне новый рюкзак.',
    en: 'My parents will give me a new backpack as a present.'
  },
  {
    id: 'mergaites-soko',
    lt: [{ n: 'mergaitė', c: 'V', num: 'pl' }, { w: 'gražiai' }, { v: 'šokti', t: 'past', p: 'p3' }, { prep: 'per' }, { n: 'šventė', c: 'G', num: 'sg', alt: [{ c: 'Vt' }] }],
    uk: 'Дівчатка гарно танцювали на святі.',
    ru: 'Девочки красиво танцевали на празднике.',
    en: 'The girls danced beautifully at the celebration.'
  },
  {
    id: 'moki-groti',
    lt: [{ w: 'ar', opt: true }, { pr: 'tu', c: 'V', opt: true, alt: [{ pr: 'jus' }] }, { v: 'moketi', t: 'pres', p: 'sg2', alt: [{ p: 'pl2' }] }, { v: 'groti', t: 'inf' }, { n: 'gitara', c: 'In', num: 'sg' }],
    end: '?',
    uk: 'Ти вмієш грати на гітарі?',
    ru: 'Ты умеешь играть на гитаре?',
    en: 'Can you play the guitar?'
  },
  {
    id: 'trys-kalbos',
    lt: [{ w: 'mano' }, { n: 'sesuo', c: 'V', num: 'sg' }, { v: 'moketi', t: 'pres', p: 'p3' }, { q: '3', to: 4 }, { n: 'kalba', c: 'G', num: 'pl' }],
    uk: 'Моя сестра знає три мови.',
    ru: 'Моя сестра знает три языка.',
    en: 'My sister knows three languages.'
  },
  {
    id: 'tenisas',
    lt: [{ w: 'vakar' }, { pr: 'mes', c: 'V', opt: true }, { prep: 'su' }, { n: 'draugas', c: 'In', num: 'sg' }, { v: 'žaisti', t: 'past', p: 'pl1' }, { n: 'tenisas', c: 'G', num: 'sg' }],
    uk: 'Учора ми з другом грали в теніс.',
    ru: 'Вчера мы с другом играли в теннис.',
    en: 'Yesterday a friend and I played tennis.'
  },
  {
    id: 'kinas-vakaras',
    lt: [{ d: 'sis', to: 1 }, { n: 'vakaras', c: 'G', num: 'sg' }, { pr: 'mes', c: 'V', opt: true }, { v: 'eiti', t: 'fut', p: 'pl1' }, { prep: 'į' }, { n: 'kinas', c: 'G', num: 'sg' }],
    uk: 'Цього вечора ми підемо в кіно.',
    ru: 'Этим вечером мы пойдём в кино.',
    en: 'This evening we will go to the cinema.'
  },
  {
    id: 'rasysiu-laiskus',
    lt: [{ pr: 'as', c: 'V', opt: true }, { pr: 'tu', c: 'N', alt: [{ pr: 'jus' }] }, { v: 'rasyti', t: 'fut', p: 'sg1', alt: [{ v: 'parašyti' }] }, { n: 'laiškas', c: 'G', num: 'pl' }],
    uk: 'Я писатиму тобі листи.',
    ru: 'Я буду писать тебе письма.',
    en: 'I will write you letters.'
  },
  {
    id: 'mylime-jus',
    lt: [{ pr: 'mes', c: 'V', opt: true }, { pr: 'jus', c: 'G', alt: [{ pr: 'tu' }] }, { w: 'labai' }, { v: 'myleti', t: 'pres', p: 'pl1' }],
    uk: 'Ми вас дуже любимо.',
    ru: 'Мы вас очень любим.',
    en: 'We love you all very much.'
  },
  {
    id: 'apie-mus',
    lt: [{ pr: 'jie', c: 'V', alt: [{ pr: 'jos' }] }, { v: 'kalbeti', t: 'past', p: 'p3' }, { prep: 'apie' }, { pr: 'mes', c: 'G' }],
    uk: 'Вони говорили про нас.',
    ru: 'Они говорили о нас.',
    en: 'They were talking about us.'
  },
  {
    id: 'supranti-mane',
    lt: [{ w: 'ar', opt: true }, { pr: 'tu', c: 'V', opt: true, alt: [{ pr: 'jus' }] }, { pr: 'as', c: 'G' }, { v: 'suprasti', t: 'pres', p: 'sg2', alt: [{ p: 'pl2' }] }],
    end: '?',
    uk: 'Ти мене розумієш?',
    ru: 'Ты меня понимаешь?',
    en: 'Do you understand me?'
  },
  {
    id: 'jai-patiko',
    lt: [{ pr: 'ji', c: 'N' }, { w: 'labai' }, { v: 'patikti', t: 'past', p: 'p3' }, { d: 'tas', to: 4 }, { n: 'dovana', c: 'V', num: 'sg' }],
    uk: 'Їй дуже сподобався той подарунок.',
    ru: 'Ей очень понравился тот подарок.',
    en: 'She really liked that present.'
  },
  {
    id: 'su-jais',
    lt: [{ w: 'rytoj' }, { pr: 'as', c: 'V', opt: true }, { v: 'susitikti', t: 'fut', p: 'sg1' }, { prep: 'su' }, { pr: 'jie', c: 'In', alt: [{ pr: 'jos' }] }],
    uk: 'Завтра я зустрінуся з ними.',
    ru: 'Завтра я встречусь с ними.',
    en: 'Tomorrow I will meet them.'
  },
  {
    id: 'stalas-kojos',
    lt: [{ n: 'stalas', c: 'V', num: 'sg' }, { v: 'tureti', t: 'pres', p: 'p3' }, { q: '4', to: 3 }, { n: 'koja', c: 'G', num: 'pl' }],
    uk: 'У стола чотири ніжки.',
    ru: 'У стола четыре ножки.',
    en: 'The table has four legs.'
  },
  {
    id: 'kedes-fotelis',
    lt: [{ n: 'kambarys', c: 'Vt', num: 'sg' }, { v: 'stovėti', t: 'pres', p: 'p3', alt: [{ v: 'buti' }] }, { q: '2', to: 3 }, { n: 'kėdė', c: 'V', num: 'pl' }, { w: 'ir' }, { q: '1', to: 6 }, { n: 'fotelis', c: 'V', num: 'sg' }],
    uk: 'У кімнаті стоять два стільці й одне крісло.',
    ru: 'В комнате стоят два стула и одно кресло.',
    en: 'There are two chairs and one armchair in the room.'
  },
  {
    id: 'sesios-seimos',
    lt: [{ d: 'sis', to: 1 }, { n: 'namas', c: 'Vt', num: 'sg' }, { v: 'gyventi', t: 'pres', p: 'p3' }, { q: '6', to: 4 }, { n: 'šeima', c: 'V', num: 'pl' }],
    uk: 'У цьому будинку живуть шість сімей.',
    ru: 'В этом доме живут шесть семей.',
    en: 'Six families live in this house.'
  },
  {
    id: 'obuoliai-bananas',
    lt: [{ w: 'vakar' }, { pr: 'as', c: 'V', opt: true }, { v: 'nupirkti', t: 'past', p: 'sg1', alt: [{ v: 'pirkti' }] }, { q: '2', to: 4 }, { n: 'obuolys', c: 'G', num: 'pl' }, { w: 'ir' }, { q: '1', to: 7 }, { n: 'bananas', c: 'G', num: 'sg' }],
    uk: 'Учора я купив два яблука й один банан.',
    ru: 'Вчера я купил два яблока и один банан.',
    en: 'Yesterday I bought two apples and one banana.'
  },
  {
    id: 'astuoni-studentai',
    lt: [{ n: 'biblioteka', c: 'Vt', num: 'sg' }, { v: 'sėdėti', t: 'pres', p: 'p3' }, { q: '8', to: 3 }, { n: 'studentas', c: 'V', num: 'pl' }],
    uk: 'У бібліотеці сидять вісім студентів.',
    ru: 'В библиотеке сидят восемь студентов.',
    en: 'Eight students are sitting in the library.'
  },
  {
    id: 'prie-juros',
    lt: [{ pr: 'mes', c: 'V', opt: true }, { v: 'noreti', t: 'cond', p: 'pl1' }, { v: 'gyventi', t: 'inf' }, { prep: 'prie' }, { n: 'jūra', c: 'K', num: 'sg' }],
    uk: 'Ми хотіли б жити біля моря.',
    ru: 'Мы хотели бы жить у моря.',
    en: 'We would like to live by the sea.'
  },
  {
    id: 'galetumete-langa',
    lt: [{ w: 'ar', opt: true }, { pr: 'jus', c: 'V', opt: true, alt: [{ pr: 'tu' }] }, { v: 'galeti', t: 'cond', p: 'pl2', alt: [{ p: 'sg2' }] }, { v: 'atidaryti', t: 'inf' }, { n: 'langas', c: 'G', num: 'sg' }],
    end: '?',
    uk: 'Чи могли б ви відчинити вікно?',
    ru: 'Вы могли бы открыть окно?',
    en: 'Could you please open the window?'
  },
  {
    id: 'valgyk-darzoviu',
    lt: [{ v: 'valgyti', t: 'imp', p: 'sg2', alt: [{ p: 'pl2' }] }, { w: 'daugiau' }, { n: 'daržovė', c: 'K', num: 'pl' }],
    end: '!',
    uk: 'Їж більше овочів!',
    ru: 'Ешь больше овощей!',
    en: 'Eat more vegetables!'
  },
  {
    id: 'pasakykite-varda',
    lt: [{ v: 'pasakyti', t: 'imp', p: 'pl2', alt: [{ p: 'sg2' }] }, { pr: 'mes', c: 'N' }, { w: 'savo' }, { n: 'vardas', c: 'G', num: 'sg' }],
    end: '!',
    uk: 'Скажіть нам своє ім’я!',
    ru: 'Скажите нам своё имя!',
    en: 'Tell us your name!'
  },
  {
    id: 'du-bilietai',
    lt: [{ v: 'duoti', t: 'imp', p: 'pl2', alt: [{ p: 'sg2' }] }, { pr: 'as', c: 'N' }, { q: '2', to: 3 }, { n: 'bilietas', c: 'G', num: 'pl' }, { prep: 'į' }, { n: 'koncertas', c: 'G', num: 'sg' }],
    end: '!',
    uk: 'Дайте мені два квитки на концерт!',
    ru: 'Дайте мне два билета на концерт!',
    en: 'Give me two tickets to the concert!'
  },
  {
    id: 'sveciams-patiko',
    lt: [{ n: 'svečias', c: 'N', num: 'pl' }, { v: 'patikti', t: 'past', p: 'p3' }, { n: 'mama', c: 'K', num: 'sg' }, { n: 'pyragas', c: 'V', num: 'sg' }],
    uk: 'Гостям сподобався мамин пиріг.',
    ru: 'Гостям понравился мамин пирог.',
    en: 'The guests liked Mom’s pie.'
  },
  {
    id: 'vaikinas-restoranas',
    lt: [{ n: 'vaikinas', c: 'V', num: 'sg' }, { v: 'kviesti', t: 'pres', p: 'p3' }, { n: 'mergina', c: 'G', num: 'sg' }, { prep: 'į' }, { n: 'restoranas', c: 'G', num: 'sg' }],
    uk: 'Хлопець запрошує дівчину до ресторану.',
    ru: 'Парень приглашает девушку в ресторан.',
    en: 'The guy is inviting the girl to a restaurant.'
  },
  {
    id: 'kalakutiena-skani',
    lt: [{ n: 'kalakutiena', c: 'V', num: 'sg' }, { prep: 'su' }, { n: 'padažas', c: 'In', num: 'sg' }, { v: 'buti', t: 'past', p: 'p3' }, { w: 'labai' }, { a: 'skanus', to: 0 }],
    uk: 'Індичка з соусом була дуже смачна.',
    ru: 'Индейка с соусом была очень вкусной.',
    en: 'The turkey with sauce was very tasty.'
  },
  {
    id: 'sriuba-moliugas',
    lt: [{ n: 'mama', c: 'V', num: 'sg' }, { v: 'virti', t: 'pres', p: 'p3' }, { n: 'moliūgas', c: 'K', num: 'pl' }, { n: 'sriuba', c: 'G', num: 'sg' }],
    uk: 'Мама варить гарбузовий суп.',
    ru: 'Мама варит тыквенный суп.',
    en: 'Mom is cooking pumpkin soup.'
  },
  {
    id: 'baznycios',
    lt: [{ n: 'senamiestis', c: 'Vt', num: 'sg' }, { v: 'buti', t: 'pres', p: 'p3', opt: true }, { w: 'daug' }, { a: 'gražus', to: 4 }, { n: 'bažnyčia', c: 'K', num: 'pl' }],
    uk: 'У старому місті багато гарних церков.',
    ru: 'В старом городе много красивых церквей.',
    en: 'There are many beautiful churches in the old town.'
  },
  {
    id: 'sostine-zmones',
    lt: [{ n: 'sostinė', c: 'Vt', num: 'sg' }, { v: 'gyventi', t: 'pres', p: 'p3' }, { w: 'daug' }, { n: 'žmogus', c: 'K', num: 'pl' }],
    uk: 'У столиці живе багато людей.',
    ru: 'В столице живёт много людей.',
    en: 'Many people live in the capital.'
  },
  {
    id: 'balkonas-kate',
    lt: [{ n: 'močiutė', c: 'V', num: 'sg', alt: [{ n: 'senelė' }] }, { v: 'sėdėti', t: 'pres', p: 'p3' }, { n: 'balkonas', c: 'Vt', num: 'sg' }, { prep: 'su' }, { n: 'katė', c: 'In', num: 'sg' }],
    uk: 'Бабуся сидить на балконі з кішкою.',
    ru: 'Бабушка сидит на балконе с кошкой.',
    en: 'Grandma is sitting on the balcony with the cat.'
  },
  {
    id: 'kelione-ilga',
    lt: [{ n: 'kelionė', c: 'V', num: 'sg' }, { v: 'buti', t: 'past', p: 'p3' }, { a: 'ilgas', to: 0, after: ',' }, { w: 'bet' }, { a: 'įdomus', to: 0 }],
    uk: 'Подорож була довгою, але цікавою.',
    ru: 'Поездка была долгой, но интересной.',
    en: 'The trip was long but interesting.'
  },
  {
    id: 'lektuvas-jura',
    lt: [{ prep: 'per' }, { n: 'atostogos', c: 'G', num: 'pl' }, { pr: 'mes', c: 'V', opt: true }, { v: 'skristi', t: 'fut', p: 'pl1' }, { n: 'lėktuvas', c: 'In', num: 'sg' }, { prep: 'prie' }, { n: 'jūra', c: 'K', num: 'sg' }],
    uk: 'У відпустку ми полетимо літаком до моря.',
    ru: 'В отпуск мы полетим на самолёте к морю.',
    en: 'On vacation we will fly to the seaside by plane.'
  },
  {
    id: 'vaikas-langas',
    lt: [{ a: 'mažas', to: 1 }, { n: 'vaikas', c: 'V', num: 'sg' }, { v: 'žiūrėti', t: 'pres', p: 'p3' }, { prep: 'pro' }, { n: 'langas', c: 'G', num: 'sg' }],
    uk: 'Маленька дитина дивиться у вікно.',
    ru: 'Маленький ребёнок смотрит в окно.',
    en: 'A little child is looking out the window.'
  },
  {
    id: 'pietus-kalakutiena',
    lt: [{ n: 'pietūs', c: 'N', num: 'pl' }, { pr: 'mes', c: 'V', opt: true }, { v: 'valgyti', t: 'past', p: 'pl1' }, { n: 'kalakutiena', c: 'G', num: 'sg' }, { prep: 'su' }, { n: 'bulvė', c: 'In', num: 'pl' }],
    uk: 'На обід ми їли індичку з картоплею.',
    ru: 'На обед мы ели индейку с картошкой.',
    en: 'For lunch we ate turkey with potatoes.'
  },
  {
    id: 'grybu-sriuba',
    lt: [{ n: 'vakarienė', c: 'N', num: 'sg' }, { pr: 'as', c: 'V', opt: true }, { v: 'išvirti', t: 'fut', p: 'sg1', alt: [{ v: 'virti' }] }, { n: 'grybas', c: 'K', num: 'pl' }, { n: 'sriuba', c: 'G', num: 'sg' }],
    uk: 'На вечерю я зварю грибний суп.',
    ru: 'На ужин я сварю грибной суп.',
    en: 'I will cook mushroom soup for dinner.'
  },
  {
    id: 'butas-senamiestis',
    lt: [{ pr: 'mes', c: 'V', opt: true }, { v: 'gyventi', t: 'pres', p: 'pl1' }, { a: 'didelis', to: 3 }, { n: 'butas', c: 'Vt', num: 'sg' }, { n: 'senamiestis', c: 'Vt', num: 'sg' }],
    uk: 'Ми живемо у великій квартирі в старому місті.',
    ru: 'Мы живём в большой квартире в старом городе.',
    en: 'We live in a big apartment in the old town.'
  },
  {
    id: 'kaimynas-biuras',
    lt: [{ pr: 'mes', c: 'K' }, { n: 'kaimynas', c: 'V', num: 'sg' }, { v: 'dirbti', t: 'pres', p: 'p3' }, { a: 'naujas', to: 4 }, { n: 'biuras', c: 'Vt', num: 'sg' }],
    uk: 'Наш сусід працює в новому офісі.',
    ru: 'Наш сосед работает в новом офисе.',
    en: 'Our neighbor works in a new office.'
  },
  {
    id: 'svecias-dovana',
    lt: [{ n: 'svečias', c: 'V', num: 'sg' }, { v: 'duoti', t: 'past', p: 'p3' }, { n: 'vaikas', c: 'N', num: 'pl' }, { a: 'didelis', to: 4 }, { n: 'dovana', c: 'G', num: 'sg' }],
    uk: 'Гість дав дітям великий подарунок.',
    ru: 'Гость дал детям большой подарок.',
    en: 'The guest gave the children a big present.'
  },
  {
    id: 'kiemas-vaikai',
    lt: [{ n: 'kiemas', c: 'Vt', num: 'sg' }, { v: 'žaisti', t: 'past', p: 'p3' }, { q: '4', to: 4 }, { a: 'linksmas', to: 4 }, { n: 'vaikas', c: 'V', num: 'pl' }],
    uk: 'У дворі гралися четверо веселих дітей.',
    ru: 'Во дворе играли четверо весёлых детей.',
    en: 'Four cheerful children were playing in the yard.'
  },
  {
    id: 'kelnes-sijonas',
    lt: [{ w: 'mano' }, { n: 'sesuo', c: 'V', num: 'sg' }, { v: 'mėgti', t: 'pres', p: 'p3' }, { a: 'ilgas', to: 4 }, { n: 'sijonas', c: 'G', num: 'pl' }, { w: 'ir' }, { a: 'platus', to: 7 }, { n: 'kelnės', c: 'G', num: 'pl' }],
    uk: 'Моя сестра любить довгі спідниці й широкі штани.',
    ru: 'Моя сестра любит длинные юбки и широкие брюки.',
    en: 'My sister likes long skirts and wide pants.'
  },
  {
    id: 'kiausiniai-kepa',
    lt: [{ n: 'rytas', c: 'G', num: 'sg', alt: [{ c: 'In', num: 'pl' }, { c: 'Vt' }] }, { n: 'tėvas', c: 'V', num: 'sg', alt: [{ n: 'tėtis' }] }, { v: 'kepti', t: 'pres', p: 'p3' }, { q: '3', to: 4 }, { n: 'kiaušinis', c: 'G', num: 'pl' }],
    uk: 'Уранці батько смажить три яйця.',
    ru: 'Утром отец жарит три яйца.',
    en: 'In the morning, Father fries three eggs.'
  },
  {
    id: 'kepure-salikas',
    lt: [{ n: 'žiema', c: 'G', num: 'sg' }, { n: 'vaikas', c: 'N', num: 'pl' }, { v: 'reikėti', t: 'pres', p: 'p3' }, { a: 'šiltas', to: 4 }, { n: 'kepurė', c: 'K', num: 'pl' }, { w: 'ir' }, { n: 'šalikas', c: 'K', num: 'pl' }],
    uk: 'Узимку дітям потрібні теплі шапки й шарфи.',
    ru: 'Зимой детям нужны тёплые шапки и шарфы.',
    en: 'In winter children need warm hats and scarves.'
  },
  {
    id: 'gydytojas-ligonine',
    lt: [{ a: 'jaunas', to: 1 }, { n: 'gydytojas', c: 'V', num: 'sg' }, { v: 'dirbti', t: 'pres', p: 'p3' }, { a: 'didelis', to: 4 }, { n: 'ligoninė', c: 'Vt', num: 'sg' }],
    uk: 'Молодий лікар працює у великій лікарні.',
    ru: 'Молодой врач работает в большой больнице.',
    en: 'A young doctor works in a big hospital.'
  },
  {
    id: 'studentas-biblioteka',
    lt: [{ n: 'studentas', c: 'V', num: 'sg' }, { v: 'skaityti', t: 'pres', p: 'p3' }, { a: 'įdomus', to: 3 }, { n: 'knyga', c: 'G', num: 'sg' }, { n: 'biblioteka', c: 'Vt', num: 'sg' }],
    uk: 'Студент читає цікаву книжку в бібліотеці.',
    ru: 'Студент читает интересную книгу в библиотеке.',
    en: 'The student is reading an interesting book in the library.'
  },
  {
    id: 'mokytojas-uzduotis',
    lt: [{ n: 'mokytojas', c: 'V', num: 'sg' }, { pr: 'mes', c: 'N' }, { v: 'duoti', t: 'past', p: 'p3' }, { a: 'sunkus', to: 4 }, { n: 'užduotis', c: 'G', num: 'sg' }],
    uk: 'Учитель дав нам важке завдання.',
    ru: 'Учитель дал нам трудное задание.',
    en: 'The teacher gave us a difficult task.'
  },
  {
    id: 'klause-mokytojo',
    lt: [{ n: 'mokinys', c: 'V', num: 'sg' }, { v: 'paklausti', t: 'past', p: 'p3', alt: [{ v: 'klausti' }] }, { n: 'mokytojas', c: 'K', num: 'sg' }, { prep: 'apie' }, { n: 'egzaminas', c: 'G', num: 'sg' }],
    uk: 'Учень спитав учителя про іспит.',
    ru: 'Ученик спросил учителя об экзамене.',
    en: 'The pupil asked the teacher about the exam.'
  },
  {
    id: 'eidavome-kina',
    lt: [{ w: 'anksčiau' }, { pr: 'mes', c: 'V', opt: true }, { w: 'dažnai' }, { v: 'eiti', t: 'habit', p: 'pl1' }, { prep: 'į' }, { n: 'kinas', c: 'G', num: 'sg' }],
    uk: 'Раніше ми часто ходили в кіно.',
    ru: 'Раньше мы часто ходили в кино.',
    en: 'We used to go to the cinema often.'
  }
];
