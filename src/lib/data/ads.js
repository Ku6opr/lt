const CC_BY_SA_2 = 'CC BY-SA 2.0';
const CC_BY_SA_3 = 'CC BY-SA 3.0';
const CC_BY_SA_4 = 'CC BY-SA 4.0';
const CC_BY_2 = 'CC BY 2.0';
const CC_BY_3 = 'CC BY 3.0';
const CC_BY_4 = 'CC BY 4.0';
const CC0 = 'CC0';
const PD = 'Public domain';

const IR = ['ir', 'ir', 'і', 'и', 'and'];
const SVIEZIAS = ['šviežias', 'свіжий', 'свежий', 'fresh'];
const DIENA = ['diena', 'день', 'день', 'day'];
const METAI = ['metai', 'рік', 'год', 'year'];
const IS = ['iš', 'з', 'из', 'from'];
const SU = ['su', 'з', 'с', 'with'];
const TIK = ['tik', 'тільки', 'только', 'only'];
const KAD = ['kad', 'що', 'что', 'that'];
const LIETUVA = ['Lietuva', 'Литва', 'Литва', 'Lithuania'];
const VILNIUS = ['Vilnius', 'Вільнюс', 'Вильнюс', 'Vilnius'];
const KAUNAS = ['Kaunas', 'Каунас', 'Каунас', 'Kaunas'];
const SIS = ['šis', 'цей', 'этот', 'this'];
const NAMAS = ['namas', 'будинок', 'дом', 'house'];
const NAMAI = ['namai', 'дім', 'дом', 'home, house'];
const MISKAS = ['miškas', 'ліс', 'лес', 'forest'];
const BUTI = ['būti', 'бути', 'быть', 'to be'];
const MANO = ['mano', 'мій', 'мой', 'my'];
const SAVO = ['savo', 'свій', 'свой', "one's own"];
const DUONA = ['duona', 'хліб', 'хлеб', 'bread'];
const KAVA = ['kava', 'кава', 'кофе', 'coffee'];
const PREKE = ['prekė', 'товар', 'товар', 'goods'];
const GAMINYS = ['gaminys', 'виріб', 'изделие', 'product'];
const PRODUKTAS = ['produktas', 'продукт', 'продукт', 'product'];
const LININIS = ['lininis', 'лляний', 'льняной', 'linen'];
const LINAS = ['linas', 'льон', 'лён', 'flax, linen'];
const GYVAS = ['gyvas', 'живий', 'живой', 'live, alive'];
const GYVENTOJAS = ['gyventojas', 'мешканець', 'житель', 'inhabitant'];
const PIRMAS = ['pirmas', 'перший', 'первый', 'first'];
const KREDITAS = ['kreditas', 'кредит', 'кредит', 'loan'];
const VISISKAI = ['visiškai', 'повністю', 'полностью', 'completely'];
const VARDAS = ['vardas', "ім'я", 'имя', 'name'];
const TARA = ['tara', 'тара', 'тара', 'returnable containers'];
const PRADZIA = ['pradžia', 'початок', 'начало', 'beginning, start'];

export const ADS = [
  {
    id: 'karantinas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Karantinas,_Taurag%C4%97.JPG', author: 'Vilensija', license: CC_BY_SA_3, crop: [0.12, 0.22, 0.92, 0.67] },
    tokens: [
      ['„Vakar', 'vakar', 'учора', 'вчера', 'yesterday'],
      ['atvažiavo', 'atvažiuoti', 'приїхати', 'приехать', 'to come (by vehicle)'],
      ['anūkė.', 'anūkė', 'онука', 'внучка', 'granddaughter', 'V'],
      ['Šiandien', 'šiandien', 'сьогодні', 'сегодня', 'today'],
      ['atvažiavo', 'atvažiuoti', 'приїхати', 'приехать', 'to come (by vehicle)'],
      ['greitoji.“', 'greitoji (pagalba)', 'швидка допомога', 'скорая помощь', 'ambulance', 'V'],
      ['–'],
      ['Ona,', 'Ona', "Она (ім'я)", 'Она (имя)', 'Ona (a name)', 'V'],
      ['74'],
      ['m.', 'metai', 'рік', 'год', 'year']
    ],
    uk: '«Учора приїхала онука. Сьогодні приїхала швидка». — Она, 74 роки',
    ru: '«Вчера приехала внучка. Сегодня приехала скорая». — Она, 74 года',
    en: '“Yesterday my granddaughter came. Today the ambulance came.” — Ona, 74'
  },
  {
    id: 'nato-transportas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Z9P_4648_(53110703836).jpg', author: 'dave massie', license: CC_BY_2, crop: [0.05, 0.12, 0.95, 0.57] },
    tokens: [
      ['Liepos', 'liepa', 'липень', 'июль', 'July', 'K'],
      ['10–13'],
      ['d.', ...DIENA],
      ['Vilniaus', 'Vilnius', 'Вільнюс', 'Вильнюс', 'Vilnius', 'K'],
      ['viešuoju', 'viešas', 'громадський', 'общественный', 'public', 'In'],
      ['transportu', 'transportas', 'транспорт', 'транспорт', 'transport', 'In'],
      ['keliauk', 'keliauti', 'подорожувати', 'путешествовать', 'to travel'],
      ['nemokamai!', 'nemokamai', 'безкоштовно', 'бесплатно', 'for free']
    ],
    uk: '10–13 липня подорожуй громадським транспортом Вільнюса безкоштовно!',
    ru: '10–13 июля езди на общественном транспорте Вильнюса бесплатно!',
    en: 'July 10–13: ride Vilnius public transport for free!'
  },
  {
    id: 'kauke',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Warning_about_mask_requirement_in_a_supermarket_in_Lithuania.jpg', author: 'LinasD', license: CC_BY_SA_4, crop: [0, 0, 1, 1] },
    tokens: [
      ['Parduotuvėje', 'parduotuvė', 'магазин', 'магазин', 'shop', 'Vt'],
      ['privaloma', 'privalomas', "обов'язковий", 'обязательный', 'mandatory'],
      ['dėvėti', 'dėvėti', 'носити (одяг)', 'носить (одежду)', 'to wear'],
      ['apsauginę', 'apsauginis', 'захисний', 'защитный', 'protective', 'G'],
      ['veido', 'veidas', 'обличчя', 'лицо', 'face', 'K'],
      ['kaukę', 'kaukė', 'маска', 'маска', 'mask', 'G']
    ],
    uk: "У магазині обов'язково носити захисну маску для обличчя.",
    ru: 'В магазине обязательно носить защитную маску для лица.',
    en: 'Wearing a protective face mask in the shop is mandatory.'
  },
  {
    id: 'duona',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Lidl_on_Ras%C5%B3_Street_in_Vilnius,_baked_goods_section,_May_2026.jpg', author: 'Bdx', license: CC0, crop: [0.1, 0, 0.9, 0.8] },
    tokens: [
      ['Šviežios', ...SVIEZIAS, 'V', 'pl'],
      ['bandelės', 'bandelė', 'булочка', 'булочка', 'bun', 'V', 'pl'],
      IR,
      ['duona!', 'duona', 'хліб', 'хлеб', 'bread', 'V']
    ],
    uk: 'Свіжі булочки й хліб!',
    ru: 'Свежие булочки и хлеб!',
    en: 'Fresh buns and bread!'
  },
  {
    id: 'gera-kaina',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Interior_of_Maxima_supermarket_in_Molas_Shopping_Centre,_Kaunas,_May_2026_2.jpg', author: 'Bdx', license: CC0, crop: [0.38, 0.28, 1, 0.9] },
    tokens: [
      ['Tai,', 'tai', 'це, те', 'это, то', 'this, that'],
      ['ko', 'kas', 'що', 'что', 'what', 'K'],
      ['reikia', 'reikėti', 'бути потрібним', 'быть нужным', 'to be needed'],
      ['·'],
      ['Gera', 'geras', 'добрий', 'хороший', 'good', 'V'],
      ['kaina', 'kaina', 'ціна', 'цена', 'price', 'V']
    ],
    uk: 'Те, що треба. Добра ціна.',
    ru: 'То, что нужно. Хорошая цена.',
    en: 'Just what you need. A good price.'
  },
  {
    id: 'kava',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Rimi_Express,_Vilnius,_%C5%A0eimyni%C5%A1ki%C5%B3_gatv%C4%97,_May_2026,_coffee_corner.jpg', author: 'Bdx', license: CC0, crop: [0.58, 0.06, 1, 0.48] },
    tokens: [
      ['Sustokite', 'sustoti', 'зупинитися', 'остановиться', 'to stop'],
      ['bei', 'bei', 'і, та', 'и', 'and'],
      ['trumpam', 'trumpam', 'ненадовго', 'ненадолго', 'for a short while'],
      ['atsikvėpkite', 'atsikvėpti', 'перепочити', 'передохнуть', 'to take a breather'],
      ['·'],
      ['Gražios', 'gražus', 'гарний', 'красивый', 'beautiful', 'K'],
      ['dienos!', ...DIENA, 'K'],
      ['·'],
      ['Kava', 'kava', 'кава', 'кофе', 'coffee', 'V'],
      ['·'],
      ['Šviežios', ...SVIEZIAS, 'V', 'pl'],
      ['sultys', 'sultys', 'сік', 'сок', 'juice', 'V', 'pl'],
      ['·'],
      ['Ledai', 'ledai', 'морозиво', 'мороженое', 'ice cream', 'V', 'pl']
    ],
    uk: 'Зупиніться й трохи перепочиньте. Гарного дня! Кава. Свіжі соки. Морозиво.',
    ru: 'Остановитесь и немного передохните. Хорошего дня! Кофе. Свежие соки. Мороженое.',
    en: 'Stop and take a short break. Have a nice day! Coffee. Fresh juice. Ice cream.'
  },
  {
    id: 'jonava',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Jonavos_reklama.jpg', author: 'Bearas', license: CC_BY_SA_3, crop: [0, 0.3, 1, 0.8625] },
    tokens: [
      ['Aš', 'aš', 'я', 'я', 'I', 'V'],
      ['–'],
      ['Jonas.', 'Jonas', "Йонас (ім'я)", 'Йонас (имя)', 'Jonas (a name)', 'V'],
      ['Gyvenu', 'gyventi', 'жити', 'жить', 'to live'],
      IR,
      ['gyvensiu', 'gyventi', 'жити', 'жить', 'to live'],
      ['Jonavoje', 'Jonava', 'Йонава (місто)', 'Йонава (город)', 'Jonava (a town)', 'Vt']
    ],
    uk: 'Я — Йонас. Живу й житиму в Йонаві.',
    ru: 'Я — Йонас. Живу и буду жить в Йонаве.',
    en: "I'm Jonas. I live in Jonava and I always will."
  },
  {
    id: 'vakcinacija',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:COVID-19_vaccination_centre_sign_in_Luki%C5%A1k%C4%97s_Square,_Vilnius,_Lithuania.jpg', author: 'Pofka', license: CC_BY_SA_4, crop: [0.04, 0.4, 0.34, 0.7] },
    tokens: [
      ['Vilnius', 'Vilnius', 'Вільнюс', 'Вильнюс', 'Vilnius', 'V'],
      ['skiepijasi', 'skiepytis', 'щеплюватися', 'прививаться', 'to get vaccinated'],
      ['·'],
      ['Vakcinacijos', 'vakcinacija', 'вакцинація', 'вакцинация', 'vaccination', 'K'],
      ['centras', 'centras', 'центр', 'центр', 'centre', 'V']
    ],
    uk: 'Вільнюс щеплюється. Центр вакцинації.',
    ru: 'Вильнюс прививается. Центр вакцинации.',
    en: 'Vilnius is getting vaccinated. Vaccination centre.'
  },
  {
    id: 'loterija',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Poster_%27Pirmoji_labdaringoji_lietuvi%C5%B3_loterija%27_(The_First_Lithuanian_Charity_Lottery)_by_Vytautas_Bi%C4%8Di%C5%ABnas_(1918).png', author: 'Bdx', license: CC0, crop: [0.05, 0.03, 0.95, 0.4994] },
    tokens: [
      ['Pirmoji', 'pirmas', 'перший', 'первый', 'first', 'V'],
      ['labdaringoji', 'labdaringas', 'благодійний', 'благотворительный', 'charitable', 'V'],
      ['lietuvių', 'lietuvis', 'литовець', 'литовец', 'Lithuanian (person)', 'K', 'pl'],
      ['loterija', 'loterija', 'лотерея', 'лотерея', 'lottery', 'V'],
      ['·'],
      ['Šimtai', 'šimtas', 'сотня', 'сотня', 'hundred', 'V', 'pl'],
      ['mokinasi', 'mokintis', 'вчитися', 'учиться', 'to study']
    ],
    uk: 'Перша благодійна литовська лотерея. Сотні вчаться.',
    ru: 'Первая благотворительная литовская лотерея. Сотни учатся.',
    en: 'The first Lithuanian charity lottery. Hundreds are studying.'
  },
  {
    id: 'rukyta',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Meat_display_at_Kaunas_Central_Market_(Urmas)_2025_2.jpg', author: 'Bdx', license: CC0, crop: [0.6218, 0.6724, 0.9194, 0.97] },
    tokens: [
      ['VISIŠKAI', ...VISISKAI],
      ['NESITĄSO!', 'tąsytis', 'тягнутися', 'тянуться', 'to be stringy'],
      ['NESŪRŪS!', 'nesūrus', 'несолоний', 'несолёный', 'not salty', 'V', 'pl'],
      ['IŠ', ...IS],
      ['ŪKIO!!!', 'ūkis', 'ферма, господарство', 'ферма, хозяйство', 'farm', 'K'],
      ['VISIŠKAI', ...VISISKAI],
      ['NATŪRALIAI', 'natūraliai', 'натурально', 'натурально', 'naturally'],
      ['RŪKYTI', 'rūkytas', 'копчений', 'копчёный', 'smoked', 'V', 'pl'],
      ['!!!']
    ],
    uk: 'Зовсім не тягнуться! Не солоні! З ферми!!! Повністю натурально копчені!!!',
    ru: 'Совсем не тянутся! Не солёные! С фермы!!! Полностью натурально копчёные!!!',
    en: 'Not stringy at all! Not salty! From the farm!!! Completely naturally smoked!!!'
  },
  {
    id: 'ukines-prekes',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Urmas,_Kaunas,_2025,_inside.jpg', author: 'Bdx', license: CC0, crop: [0.2, 0.06, 0.5, 0.36] },
    tokens: [
      ['ŪKINĖS', 'ūkinis', 'господарський', 'хозяйственный', 'household', 'V', 'pl'],
      ['PREKĖS', ...PREKE, 'V', 'pl'],
      ['SANTECHNIKA', 'santechnika', 'сантехніка', 'сантехника', 'plumbing', 'V'],
      ['MAIŠELIAI,', 'maišelis', 'пакет, мішечок', 'пакет, мешочек', 'bag', 'V', 'pl'],
      ['ŽVAKĖS', 'žvakė', 'свічка', 'свеча', 'candle', 'V', 'pl']
    ],
    uk: 'Господарські товари. Сантехніка. Пакети, свічки.',
    ru: 'Хозяйственные товары. Сантехника. Пакеты, свечи.',
    en: 'Household goods. Plumbing. Bags, candles.'
  },
  {
    id: 'krepselis',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Rimi_Express,_Vilnius,_%C5%A0eimyni%C5%A1ki%C5%B3_gatv%C4%97,_May_2026,_self-checkout.jpg', author: 'Bdx', license: CC0, crop: [0.45, 0.54, 0.85, 0.765] },
    tokens: [
      ['PIRKINIŲ', 'pirkinys', 'покупка', 'покупка', 'purchase', 'K', 'pl'],
      ['KREPŠELĮ', 'krepšelis', 'кошик', 'корзина', 'basket', 'G'],
      ['DĖKITE', 'dėti', 'класти', 'класть', 'to put'],
      ['ČIA', 'čia', 'тут, сюди', 'здесь, сюда', 'here']
    ],
    uk: 'Кошик з покупками ставте сюди',
    ru: 'Корзину с покупками ставьте сюда',
    en: 'Put your shopping basket here'
  },
  {
    id: 'zirneliu-sriuba',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Trinta_%C5%BEali%C5%B3_%C5%BEirneli%C5%B3_sriuba,_Taurag%C4%97s_VDPK.jpg', author: 'Tauragės krašto muziejus „Santaka“', license: CC0, crop: [0.14, 0.335, 0.859, 0.694] },
    tokens: [
      ['TRINTA', 'trintas', 'протертий', 'протёртый', 'pureed', 'V'],
      ['ŽALIŲ', 'žalias', 'зелений', 'зелёный', 'green', 'K', 'pl'],
      ['ŽIRNELIŲ', 'žirnelis', 'горошок', 'горошек', 'pea', 'K', 'pl'],
      ['SRIUBA', 'sriuba', 'суп', 'суп', 'soup', 'V']
    ],
    uk: 'Протертий суп із зеленого горошку',
    ru: 'Протёртый суп из зелёного горошка',
    en: 'Pureed green pea soup'
  },
  {
    id: 'mylim-miesta',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Graffiti_at_%C5%A0iauliai,_%22We_really_like_our_city%22._April,_2013_-_panoramio.jpg', author: 'Ivars Indāns', license: CC_BY_SA_3, crop: [0.45, 0.25, 0.966, 0.736] },
    tokens: [
      ['MES', 'mes', 'ми', 'мы', 'we', 'V', 'pl'],
      ['TIKRAI', 'tikrai', 'справді', 'правда, действительно', 'really'],
      ['MYLIM', 'mylėti', 'любити', 'любить', 'to love'],
      ['SAVO', ...SAVO],
      ['MIESTĄ!', 'miestas', 'місто', 'город', 'city, town', 'G']
    ],
    uk: 'Ми справді любимо своє місто!',
    ru: 'Мы правда любим свой город!',
    en: 'We really love our city!'
  },
  {
    id: 'kaip-tu',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Tags_(8178240208).jpg', author: 'Guillaume Speurt', license: CC_BY_SA_2, crop: [0.54, 0.12, 0.96, 0.552] },
    tokens: [
      ['Kaip', 'kaip', 'як', 'как', 'how, as'],
      ['tu', 'tu', 'ти', 'ты', 'you', 'V'],
      ['–'],
      ['taip', 'taip', 'так', 'так', 'so'],
      ['tau,', 'tu', 'ти', 'ты', 'you', 'N'],
      ['per', 'per', 'через', 'через', 'through'],
      ['amžių', 'amžius', 'вік, століття', 'век', 'age, century', 'K', 'pl'],
      ['amžius', 'amžius', 'вік, століття', 'век', 'age, century', 'G', 'pl']
    ],
    uk: 'Як ти — так і тобі, на віки вічні',
    ru: 'Как ты — так и тебе, во веки веков',
    en: 'As you do, so it is done to you, for ever and ever'
  },
  {
    id: 'pikta-vovere',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:The_cheepest_guard_-_furios_squirell_-)_-_panoramio.jpg', author: 'Ivars Indāns', license: CC_BY_SA_3, crop: [0.36, 0.414, 0.751, 0.805] },
    tokens: [
      ['pikta', 'piktas', 'злий', 'злой', 'angry', 'V'],
      ['voverė', 'voverė', 'білка', 'белка', 'squirrel', 'V'],
      ['–'],
      ['pigiausias', 'pigus', 'дешевий', 'дешёвый', 'cheap', 'V'],
      ['sargas', 'sargas', 'сторож', 'сторож', 'guard', 'V']
    ],
    uk: 'Зла білка — найдешевший сторож',
    ru: 'Злая белка — самый дешёвый сторож',
    en: 'An angry squirrel is the cheapest guard'
  },
  {
    id: 'duonos-arba-oro',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:(We)_Want_bread_or_air_(weather%3F)_(2322213860).jpg', author: 'Eugenijus Radlinskas', license: CC_BY_2, crop: [0.12, 0.38, 0.897, 0.943] },
    tokens: [
      ['DUONOS', ...DUONA, 'K'],
      ['ARBA', 'arba', 'або', 'или', 'or'],
      ['ORO', 'oras', 'повітря; погода', 'воздух; погода', 'air; weather', 'K']
    ],
    uk: 'Хліба або повітря',
    ru: 'Хлеба или воздуха',
    en: 'Bread or air'
  },
  {
    id: 'sakotis',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Urmas,_Kaunas,_May_2026,_%C5%A1akotis.jpg', author: 'Bdx', license: CC0, crop: [0.33, 0.27, 0.67, 0.61] },
    tokens: [
      ['TRAPUS', 'trapus', 'розсипчастий, крихкий', 'рассыпчатый, хрупкий', 'crumbly', 'V'],
      ['SVIESTINIS', 'sviestinis', 'на вершковому маслі', 'сливочный', 'made with butter', 'V'],
      ['ŠAKOTIS', 'šakotis', 'шакотіс (торт-«ялинка»)', 'шакотис (торт-«ёлка»)', 'šakotis (spit cake)', 'V'],
      ['24'],
      ['1kg'],
      ['IŠ', ...IS],
      ['STAKLIŠKIŲ', 'Stakliškės', 'Стаклішкес (містечко)', 'Стаклишкес (местечко)', 'Stakliškės (a town)', 'K', 'pl']
    ],
    uk: 'Розсипчастий шакотіс на вершковому маслі, 24 за 1 кг, зі Стаклішкес',
    ru: 'Рассыпчатый сливочный шакотис, 24 за 1 кг, из Стаклишкеса',
    en: 'Crumbly butter šakotis, 24 per kg, from Stakliškės'
  },
  {
    id: 'vezimeliai',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Senukai,_Mega,_Kaunas,_2026_4.jpg', author: 'Bdx', license: CC0, crop: [0.29, 0.17, 0.43, 0.31] },
    tokens: [
      ['Gerbiamieji', 'gerbiamas', 'шановний', 'уважаемый', 'dear, respected', 'V', 'pl'],
      ['pirkėjai,', 'pirkėjas', 'покупець', 'покупатель', 'shopper', 'V', 'pl'],
      ['parduotuvėje', 'parduotuvė', 'магазин', 'магазин', 'shop', 'Vt'],
      ['prekės', ...PREKE, 'V', 'pl'],
      ['vežiojamos', 'vežioti', 'возити', 'возить', 'to carry around', 'V', 'pl'],
      ['elektriniais', 'elektrinis', 'електричний', 'электрический', 'electric', 'In', 'pl'],
      ['vežimėliais.', 'vežimėlis', 'візок', 'тележка', 'cart', 'In', 'pl'],
      ['Būkite', ...BUTI],
      ['atsargūs!', 'atsargus', 'обережний', 'осторожный', 'careful', 'V', 'pl']
    ],
    uk: 'Шановні покупці, у магазині товари розвозять на електричних візках. Будьте обережні!',
    ru: 'Уважаемые покупатели, в магазине товары развозят на электрических тележках. Будьте осторожны!',
    en: 'Dear shoppers, goods in the store are moved around on electric carts. Be careful!'
  },
  {
    id: 'muges',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Senukai,_Mega,_Kaunas,_2026_2.jpg', author: 'Bdx', license: CC0, crop: [0.377, 0.81, 0.567, 1.0] },
    tokens: [
      ['SENUKUOSE', 'Senukai', '«Senukai» (мережа магазинів)', '«Senukai» (сеть магазинов)', 'Senukai (a store chain)', 'Vt', 'pl'],
      ['MUGĖS', 'mugė', 'ярмарок', 'ярмарка', 'fair', 'V', 'pl'],
      ['ĮSISUKO!', 'įsisukti', 'розкрутитися', 'раскрутиться', 'to get into full swing']
    ],
    uk: 'У «Senukai» розкрутилися ярмарки!',
    ru: 'В «Senukai» раскрутились ярмарки!',
    en: 'The fairs are in full swing at Senukai!'
  },
  {
    id: 'turgelis',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Kalnie%C4%8Diai_Market_(Kalnie%C4%8Di%C5%B3_turgusa),_Kaunas,_2026.jpg', author: 'Bdx', license: CC0, crop: [0.29, 0.4099, 0.55, 0.6701] },
    tokens: [
      ['TURGELIS', 'turgelis', 'базарчик', 'рыночек', 'small market', 'V']
    ],
    uk: 'Базарчик',
    ru: 'Рыночек',
    en: 'Little market'
  },
  {
    id: 'portugaliski-produktai',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Portuguese_products_vending_machine,_Akropolis,_Kaunas,_2026.jpg', author: 'Bdx', license: CC0, crop: [0.095, 0.115, 0.475, 0.299] },
    tokens: [
      ['PORTUGALIŠKI', 'portugališkas', 'португальський', 'португальский', 'Portuguese', 'V', 'pl'],
      ['PRODUKTAI', ...PRODUKTAS, 'V', 'pl'],
      ['AUTENTIŠKI', 'autentiškas', 'автентичний', 'аутентичный', 'authentic', 'V', 'pl'],
      ['PRODUKTAI', ...PRODUKTAS, 'V', 'pl'],
      ['IŠ', ...IS],
      ['PORTUGALIJOS', 'Portugalija', 'Португалія', 'Португалия', 'Portugal', 'K']
    ],
    uk: 'Португальські продукти. Автентичні продукти з Португалії',
    ru: 'Португальские продукты. Аутентичные продукты из Португалии',
    en: 'Portuguese products. Authentic products from Portugal'
  },
  {
    id: 'lino-namai',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Lino_Namai_shop,_Kaunas,_2026.jpg', author: 'Bdx', license: CC0, crop: [0.6355, 0.3255, 0.9805, 0.7065] },
    tokens: [
      ['lino', ...LINAS, 'K'],
      ['namai', ...NAMAI, 'V', 'pl'],
      ['Sukurta', 'sukurti', 'створити', 'создать', 'to create'],
      IR,
      ['pagaminta', 'pagaminti', 'виготовити', 'изготовить', 'to make'],
      ['Lietuvoje!', ...LIETUVA, 'Vt'],
      ['•'],
      ['Lininiai', ...LININIS, 'V', 'pl'],
      ['audiniai', 'audinys', 'тканина', 'ткань', 'fabric', 'V', 'pl'],
      ['•'],
      ['Staltiesės,', 'staltiesė', 'скатертина', 'скатерть', 'tablecloth', 'V', 'pl'],
      ['servetėlės', 'servetėlė', 'серветка', 'салфетка', 'napkin', 'V', 'pl'],
      ['•'],
      ['Patalynė', 'patalynė', 'постільна білизна', 'постельное бельё', 'bedding', 'V'],
      ['•'],
      ['Virtuvės', 'virtuvė', 'кухня', 'кухня', 'kitchen', 'K'],
      ['gaminiai', ...GAMINYS, 'V', 'pl'],
      ['•'],
      ['Vonios', 'vonia', 'ванна, ванна кімната', 'ванна, ванная', 'bath, bathroom', 'K'],
      ['gaminiai', ...GAMINYS, 'V', 'pl'],
      ['•'],
      ['Lininės', ...LININIS, 'V', 'pl'],
      ['užuolaidos', 'užuolaida', 'штора', 'штора', 'curtain', 'V', 'pl'],
      ['Iš', ...IS],
      ['lino', ...LINAS, 'K'],
      ['-'],
      ['su', ...SU],
      ['meile', 'meilė', "любов", 'любовь', 'love', 'In']
    ],
    uk: "Дім льону. Створено й виготовлено в Литві! Лляні тканини. Скатертини, серветки. Постільна білизна. Вироби для кухні. Вироби для ванної. Лляні штори. З льону — з любов'ю",
    ru: 'Дом льна. Создано и сделано в Литве! Льняные ткани. Скатерти, салфетки. Постельное бельё. Изделия для кухни. Изделия для ванной. Льняные шторы. Из льна — с любовью',
    en: 'Linen House. Designed and made in Lithuania! Linen fabrics. Tablecloths, napkins. Bedding. Kitchen goods. Bathroom goods. Linen curtains. From linen, with love'
  },
  {
    id: 'priedanga',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Lithuanian_shelter_sign_(Priedanga),_Vilnius,_2026.jpg', author: 'Bdx', license: CC0, crop: [0.195, 0.2217, 0.445, 0.3623] },
    tokens: [
      ['PRIEDANGA', 'priedanga', 'укриття', 'укрытие', 'shelter', 'V']
    ],
    uk: 'Укриття',
    ru: 'Укрытие',
    en: 'Shelter'
  },
  {
    id: 'vieksniu-vaistine',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Vaistines_muziejaus_iskaba.JPG', author: 'Algirdas', license: CC_BY_SA_3, crop: [0.145, 0.1198, 0.845, 0.8202] },
    tokens: [
      ['ŠIAME', ...SIS, 'Vt'],
      ['NAME', ...NAMAS, 'Vt'],
      ['1860'],
      ['M.', ...METAI],
      ['LIEPOS', 'liepa', 'липень', 'июль', 'July', 'K'],
      ['MĖN.', 'mėnuo', 'місяць', 'месяц', 'month'],
      ['30(17)'],
      ['D.', ...DIENA],
      ['ĮSTEIGTA', 'įsteigti', 'заснувати', 'основать', 'to found', 'V'],
      ['VIEKŠNIŲ', 'Viekšniai', 'Векшняй (містечко)', 'Векшняй (местечко)', 'Viekšniai (a town)', 'K', 'pl'],
      ['VAISTINĖ', 'vaistinė', 'аптека', 'аптека', 'pharmacy', 'V']
    ],
    uk: 'У цьому будинку 30 (17) липня 1860 року заснована аптека Векшняя',
    ru: 'В этом доме 30 (17) июля 1860 года основана аптека Векшняя',
    en: 'The Viekšniai pharmacy was founded in this house on 30 (17) July 1860'
  },
  {
    id: 'mokslu-biblioteka',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Library_of_the_Lithuanian_Academy_of_Sciences_in_Vilnius3.JPG', author: 'Alma Pater', license: CC_BY_SA_3, crop: [0.13, 0.13, 0.88, 0.88] },
    tokens: [
      ['LIETUVOS', ...LIETUVA, 'K'],
      ['MOKSLŲ', 'mokslas', 'наука', 'наука', 'science', 'K', 'pl'],
      ['AKADEMIJOS', 'akademija', 'академія', 'академия', 'academy', 'K'],
      ['VRUBLEVSKIŲ', 'Vrublevskiai', 'Врублевські (родина)', 'Врублевские (семья)', 'the Wróblewskis (a family)', 'K', 'pl'],
      ['BIBLIOTEKA', 'biblioteka', 'бібліотека', 'библиотека', 'library', 'V']
    ],
    uk: 'Бібліотека Врублевських Литовської академії наук',
    ru: 'Библиотека Врублевских Литовской академии наук',
    en: 'Wróblewski Library of the Lithuanian Academy of Sciences'
  },
  {
    id: 'pradzios-mokykla',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Signboard_of_the_Bagr%C4%97nas_Primary_School_with_Vytis_(Waykimas)_in_Lithuania_from_the_interwar_period.jpg', author: 'Lietuvos švietimo istorijos muziejus', license: CC_BY_4, crop: [0.1, 0.0745, 0.9, 0.9255] },
    tokens: [
      ['Bagrėnų', 'Bagrėnai', 'Багренай (село)', 'Багренай (деревня)', 'Bagrėnai (a village)', 'K', 'pl'],
      ['pradžios', ...PRADZIA, 'K'],
      ['mokykla', 'mokykla', 'школа', 'школа', 'school', 'V']
    ],
    uk: 'Багренайська початкова школа',
    ru: 'Багренайская начальная школа',
    en: 'Bagrėnai Primary School'
  },
  {
    id: 'daujenu-duona',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Dauj%C4%97n%C5%B3_duona,_autobusiukas.JPG', author: 'Vilensija', license: CC_BY_SA_3, crop: [0.075, 0.437, 0.6, 0.962] },
    tokens: [
      ['DAUJĖNŲ', 'Daujėnai', 'Дауєнай (село)', 'Дауенай (деревня)', 'Daujėnai (a village)', 'K', 'pl'],
      ['NAMINĖ', 'naminis', 'домашній', 'домашний', 'homemade', 'V'],
      ['DUONA', ...DUONA, 'V'],
      IR,
      ['KONDITERIJOS', 'konditerija', 'кондитерські вироби', 'кондитерские изделия', 'confectionery', 'K'],
      ['GAMINIAI®', ...GAMINYS, 'V', 'pl']
    ],
    uk: 'Дауєнайський домашній хліб і кондитерські вироби',
    ru: 'Дауенайский домашний хлеб и кондитерские изделия',
    en: 'Daujėnai homemade bread and pastries'
  },
  {
    id: 'buk-atsargus',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Bicyclists_warning_sign_in_Kaunas.jpg', author: 'Андрей Романенко', license: CC_BY_SA_4, crop: [0.278, 0.3094, 0.698, 0.5466] },
    tokens: [
      ['BŪK', ...BUTI],
      ['ATSARGUS', 'atsargus', 'обережний', 'осторожный', 'careful', 'V'],
      ['VAIRUODAMAS', 'vairuoti', 'кермувати, їхати', 'рулить, ехать', 'to steer, to ride'],
      ['DVIRATĮ!', 'dviratis', 'велосипед', 'велосипед', 'bicycle', 'G']
    ],
    uk: 'Будь обережний, коли їдеш на велосипеді!',
    ru: 'Будь осторожен, когда едешь на велосипеде!',
    en: 'Be careful when riding a bike!'
  },
  {
    id: 'tiesos-taure',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Tiesos_finalas_1948.png', author: 'Wikimedia Commons', license: PD, crop: [0.33, 0.005, 1, 0.9036] },
    tokens: [
      ['VALSTYBINIS', 'valstybinis', 'державний', 'государственный', 'state', 'V'],
      ['STADIONAS', 'stadionas', 'стадіон', 'стадион', 'stadium', 'V'],
      ['Sekmadienį,', 'sekmadienis', 'неділя', 'воскресенье', 'Sunday', 'G'],
      ['spalio', 'spalis', 'жовтень', 'октябрь', 'October', 'K'],
      ['17'],
      ['d.,', ...DIENA],
      ['įvyks', 'įvykti', 'відбутися', 'состояться', 'to take place'],
      ['„TIESOS“', 'tiesa', 'правда («Tiesa» — газета)', 'правда («Tiesa» — газета)', 'truth ("Tiesa" newspaper)', 'K'],
      ['TAURĖS', 'taurė', 'кубок', 'кубок', 'cup', 'K'],
      ['RESPUBLIKINIO', 'respublikinis', 'республіканський', 'республиканский', 'republic-wide', 'K'],
      ['FUTBOLO', 'futbolas', 'футбол', 'футбол', 'football', 'K'],
      ['TURNYRO', 'turnyras', 'турнір', 'турнир', 'tournament', 'K'],
      ['FINALAS', 'finalas', 'фінал', 'финал', 'final', 'V'],
      ['Susitinka:', 'susitikti', 'зустрітися', 'встретиться', 'to meet'],
      ['Kauno', ...KAUNAS, 'K'],
      ['„Inkaras“', 'inkaras', 'якір («Inkaras» — команда)', 'якорь («Inkaras» — команда)', 'anchor ("Inkaras" team)', 'V'],
      ['—'],
      ['Kauno', ...KAUNAS, 'K'],
      ['„Lokomotyvas“', 'lokomotyvas', 'локомотив', 'локомотив', 'locomotive', 'V'],
      ['(„Žalgiris“)', 'Žalgiris', 'Жальгіріс (команда)', 'Жальгирис (команда)', 'Žalgiris (a team)', 'V'],
      ['Pradžia', ...PRADZIA, 'V'],
      ['—'],
      ['14'],
      ['val.', 'valanda', 'година', 'час', 'hour']
    ],
    uk: 'Державний стадіон. У неділю, 17 жовтня, відбудеться фінал республіканського футбольного турніру на кубок газети «Tiesa». Грають каунаські «Інкарас» і «Локомотивас» («Жальгіріс»). Початок о 14:00.',
    ru: 'Государственный стадион. В воскресенье, 17 октября, состоится финал республиканского футбольного турнира на кубок газеты «Tiesa». Играют каунасские «Инкарас» и «Локомотивас» («Жальгирис»). Начало в 14:00.',
    en: 'State Stadium. On Sunday, 17 October, the final of the national football tournament for the "Tiesa" Cup. Kaunas "Inkaras" vs Kaunas "Lokomotyvas" ("Žalgiris"). Kick-off at 2 p.m.'
  },
  {
    id: 'erkes',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Erkinis_encefalitas,_Pa%C5%A1u%C5%A1vio_mi%C5%A1kas.JPG', author: 'Hugo.arg', license: PD, crop: [0.19, 0.345, 0.79, 0.6825] },
    tokens: [
      ['GRYBAUTOJŲ', 'grybautojas', 'грибник', 'грибник', 'mushroom picker', 'K', 'pl'],
      ['DĖMESIUI!!!', 'dėmesys', 'увага', 'внимание', 'attention', 'N'],
      ['Nustatyta,', 'nustatyti', 'встановити', 'установить', 'to establish'],
      ['kad', ...KAD],
      ['po', 'po', 'після', 'после', 'after'],
      ['erkių', 'erkė', 'кліщ', 'клещ', 'tick', 'K', 'pl'],
      ['įkandimo', 'įkandimas', 'укус', 'укус', 'bite', 'K'],
      ['šiame', ...SIS, 'Vt'],
      ['miške,', ...MISKAS, 'Vt'],
      ['daugeliu', 'daugelis', 'багато (хто, що)', 'многие', 'many', 'In'],
      ['atvejų', 'atvejis', 'випадок', 'случай', 'case', 'K', 'pl'],
      ['išsivystė', 'išsivystyti', 'розвинутися', 'развиться', 'to develop'],
      ['sunkios', 'sunkus', 'важкий', 'тяжёлый', 'heavy, severe', 'K'],
      ['formos', 'forma', 'форма', 'форма', 'form', 'K'],
      ['encefalitas.', 'encefalitas', 'енцефаліт', 'энцефалит', 'encephalitis', 'V'],
      ['Įspėjame,', 'įspėti', 'попередити', 'предупредить', 'to warn'],
      ['kad', ...KAD],
      ['vaikščiojimas', 'vaikščiojimas', 'ходіння, прогулянки', 'хождение, прогулки', 'walking', 'V'],
      ['miške', ...MISKAS, 'Vt'],
      ['gali', 'galėti', 'могти', 'мочь', 'can'],
      ['sukelti', 'sukelti', 'спричинити', 'вызвать', 'to cause'],
      ['jums', 'jūs', 'ви', 'вы', 'you', 'N', 'pl'],
      ['nepagydomą', 'nepagydomas', 'невиліковний', 'неизлечимый', 'incurable', 'G'],
      ['ligą', 'liga', 'хвороба', 'болезнь', 'disease', 'G'],
      ['ar', 'ar', 'або', 'или', 'or'],
      ['mirtį.', 'mirtis', 'смерть', 'смерть', 'death', 'G'],
      ['Lietuvos', ...LIETUVA, 'K'],
      ['gyventojų', ...GYVENTOJAS, 'K', 'pl'],
      ['informavimo', 'informavimas', 'інформування', 'информирование', 'informing', 'K'],
      ['centras', 'centras', 'центр', 'центр', 'centre', 'V']
    ],
    uk: 'До уваги грибників!!! Встановлено, що після укусів кліщів у цьому лісі в багатьох випадках розвивалася тяжка форма енцефаліту. Попереджаємо, що прогулянки лісом можуть спричинити у вас невиліковну хворобу або смерть. Литовський центр інформування населення',
    ru: 'Вниманию грибников!!! Установлено, что после укусов клещей в этом лесу во многих случаях развивалась тяжёлая форма энцефалита. Предупреждаем, что прогулки по лесу могут вызвать у вас неизлечимую болезнь или смерть. Литовский центр информирования населения',
    en: 'Attention, mushroom pickers!!! It has been established that after tick bites in this forest, a severe form of encephalitis developed in many cases. We warn that walking in the forest may cause you an incurable disease or death. Lithuanian Public Information Centre'
  },
  {
    id: 'universiteto-klinika',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Didzioji_10_plaque.JPG', author: 'Alma Pater', license: CC_BY_SA_3, crop: [0.2, 0.151, 0.829, 0.859] },
    tokens: [
      ['ŠIUOSE', ...SIS, 'Vt', 'pl'],
      ['NAMUOSE', ...NAMAI, 'Vt', 'pl'],
      ['1805–1831'],
      ['VEIKĖ', 'veikti', 'діяти, працювати', 'действовать, работать', 'to operate'],
      ['PIRMOJI', ...PIRMAS, 'V'],
      ['VILNIAUS', ...VILNIUS, 'K'],
      ['UNIVERSITETO', 'universitetas', 'університет', 'университет', 'university', 'K'],
      ['KLINIKA', 'klinika', 'клініка', 'клиника', 'clinic', 'V']
    ],
    uk: 'У цьому будинку в 1805–1831 роках працювала перша клініка Вільнюського університету',
    ru: 'В этом доме в 1805–1831 годах работала первая клиника Вильнюсского университета',
    en: 'The first clinic of Vilnius University operated in this house in 1805–1831'
  },
  {
    id: 'brodskis',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Brodskij_Wilno.jpg', author: 'Alma Pater', license: PD, crop: [0.2, 0.27, 0.78, 0.736] },
    tokens: [
      ['ŠIAME', ...SIS, 'Vt'],
      ['NAME', ...NAMAS, 'Vt'],
      ['SVEČIUODAMASIS', 'svečiuotis', 'гостювати', 'гостить', 'to stay as a guest'],
      ['VILNIUJE', ...VILNIUS, 'Vt'],
      ['1966-1971'],
      ['METAIS', ...METAI, 'In', 'pl'],
      ['APSISTODAVO', 'apsistoti', 'зупинятися', 'останавливаться', 'to stay'],
      ['NOBELIO', 'Nobelis', 'Нобель', 'Нобель', 'Nobel', 'K'],
      ['PREMIJOS', 'premija', 'премія', 'премия', 'prize', 'K'],
      ['LAUREATAS', 'laureatas', 'лауреат', 'лауреат', 'laureate', 'V'],
      ['POETAS', 'poetas', 'поет', 'поэт', 'poet', 'V'],
      ['J'],
      ['Brodskis', 'Brodskis', 'Бродський', 'Бродский', 'Brodsky', 'V']
    ],
    uk: 'У цьому будинку, гостюючи у Вільнюсі, у 1966–1971 роках зупинявся лауреат Нобелівської премії поет Й. Бродський',
    ru: 'В этом доме, гостя в Вильнюсе, в 1966–1971 годах останавливался лауреат Нобелевской премии поэт И. Бродский',
    en: 'Nobel Prize-winning poet J. Brodsky used to stay in this house when visiting Vilnius in 1966–1971'
  },
  {
    id: 'baranausko-tiltas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Anyk%C5%A1%C4%8Diai,_tilto_lenta.JPG', author: 'Vilensija', license: CC_BY_SA_3, crop: [0.206, 0.305, 0.785, 0.884] },
    tokens: [
      ['VYSKUPO', 'vyskupas', 'єпископ', 'епископ', 'bishop', 'K'],
      ['A.BARANAUSKO', 'Baranauskas', 'Баранаускас (поет)', 'Баранаускас (поэт)', 'Baranauskas (a poet)', 'K'],
      ['TILTAS', 'tiltas', 'міст', 'мост', 'bridge', 'V'],
      ['VARDAS', ...VARDAS, 'V'],
      ['SUTEIKTAS', 'suteikti', 'надати', 'присвоить', 'to give, to grant', 'V'],
      ['1932'],
      ['METAIS', ...METAI, 'In', 'pl'],
      ['VARDAS', ...VARDAS, 'V'],
      ['GRĄŽINTAS', 'grąžinti', 'повернути', 'вернуть', 'to return', 'V'],
      ['2007'],
      ['METAIS', ...METAI, 'In', 'pl']
    ],
    uk: "Міст єпископа А. Баранаускаса. Ім'я надано 1932 року. Ім'я повернуто 2007 року",
    ru: 'Мост епископа А. Баранаускаса. Имя присвоено в 1932 году. Имя возвращено в 2007 году',
    en: 'Bishop A. Baranauskas Bridge. Named in 1932. Name restored in 2007'
  },
  {
    id: 'banioniu-akmuo',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Banioni%C5%B3_akmuo,_%C5%BEenklas_.JPG', author: 'Vilensija', license: CC_BY_SA_3, crop: [0.08, 0.3, 0.5, 0.72] },
    tokens: [
      ['VALSTYBĖS', 'valstybė', 'держава', 'государство', 'state', 'K'],
      ['SAUGOMAS', 'saugoti', 'охороняти', 'охранять', 'to protect', 'V'],
      ['BANIONIŲ', 'Banioniai', 'Баньоняй (село)', 'Баньоняй (деревня)', 'Banioniai (a village)', 'K', 'pl'],
      ['AKMUO', 'akmuo', 'камінь', 'камень', 'stone', 'V'],
      ['GAMTOS', 'gamta', 'природа', 'природа', 'nature', 'K'],
      ['PAVELDO', 'paveldas', 'спадщина', 'наследие', 'heritage', 'K'],
      ['OBJEKTAS', 'objektas', "об'єкт", 'объект', 'site, object', 'V']
    ],
    uk: "Камінь Баньоняй під охороною держави. Об'єкт природної спадщини",
    ru: 'Охраняемый государством камень Баньоняй. Объект природного наследия',
    en: 'State-protected Banioniai Stone. Natural heritage site'
  },
  {
    id: 'plauk-rankas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Matchbox_label_-_Wash_Hands_-_Lithuania_(circa_1940s)_-_MBP1474208864.jpg', author: 'Wikimedia Commons', license: PD, crop: [0, 0.37, 1, 0.923] },
    tokens: [
      ['PRIEŠ', 'prieš', 'перед', 'перед', 'before'],
      ['VALGĮ', 'valgis', 'їжа', 'еда', 'meal', 'G'],
      ['PLAUK', 'plauti', 'мити', 'мыть', 'to wash'],
      ['RANKAS!', 'ranka', 'рука', 'рука', 'hand', 'G', 'pl']
    ],
    uk: 'Перед їжею мий руки!',
    ru: 'Перед едой мой руки!',
    en: 'Wash your hands before eating!'
  },
  {
    id: 'dujiniai-prietaisai',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Matchbox_label_-_Girl_with_Gas_Cylinder_-_Lithuania_(circa_1940s)_-_MBP1613305606.jpg', author: 'Wikimedia Commons', license: PD, crop: [0, 0.42, 1, 0.951] },
    tokens: [
      ['NELEISKITE', 'leisti', 'пускати, дозволяти', 'пускать, позволять', 'to let'],
      ['VAIKŲ', 'vaikas', 'дитина', 'ребёнок', 'child', 'K', 'pl'],
      ['PRIE', 'prie', 'до, біля', 'к, у', 'near, to'],
      ['DUJINIŲ', 'dujinis', 'газовий', 'газовый', 'gas', 'K', 'pl'],
      ['PRIETAISŲ!', 'prietaisas', 'прилад', 'прибор', 'appliance', 'K', 'pl']
    ],
    uk: 'Не підпускайте дітей до газових приладів!',
    ru: 'Не подпускайте детей к газовым приборам!',
    en: 'Keep children away from gas appliances!'
  },
  {
    id: 'zoologijos-muziejus',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Matchbox_label_-_Chimpanzee_-_Lithuania_(circa_1940s)_-_MBP1473967030.jpg', author: 'Wikimedia Commons', license: PD, crop: [0, 0.08, 1, 0.6125] },
    tokens: [
      ['APLANKYKITE', 'aplankyti', 'відвідати', 'посетить', 'to visit'],
      ['KAUNO', ...KAUNAS, 'K'],
      ['ZOOLOGIJOS', 'zoologija', 'зоологія', 'зоология', 'zoology', 'K'],
      ['MUZIEJŲ', 'muziejus', 'музей', 'музей', 'museum', 'G']
    ],
    uk: 'Відвідайте Каунаський зоологічний музей',
    ru: 'Посетите Каунасский зоологический музей',
    en: 'Visit the Kaunas Zoological Museum'
  },
  {
    id: 'liaudies-daile',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Matchbox_label_-_Black_Pitcher_-_Lithuania_(circa_1940s)_-_MBP1474014946.jpg', author: 'Wikimedia Commons', license: PD, crop: [0, 0, 1, 0.512] },
    tokens: [
      ['LIAUDIES', 'liaudis', 'народ', 'народ', 'folk, people', 'K'],
      ['DAILĖ', 'dailė', 'мистецтво', 'искусство', 'art', 'V'],
      ['PUOŠIA', 'puošti', 'прикрашати', 'украшать', 'to decorate'],
      ['BUITĮ', 'buitis', 'побут', 'быт', 'everyday life', 'G']
    ],
    uk: 'Народне мистецтво прикрашає побут',
    ru: 'Народное искусство украшает быт',
    en: 'Folk art brightens everyday life'
  },
  {
    id: 'ceburekine',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Lentvaris,_Lithuania_-_panoramio_(17).jpg', author: 'VietovesLt', license: CC_BY_3, crop: [0.36, 0.32, 0.66, 0.62] },
    tokens: [
      ['ČEBURĖKINĖ', 'čeburėkinė', 'чебуречна', 'чебуречная', 'chebureki diner', 'V']
    ],
    uk: 'Чебуречна',
    ru: 'Чебуречная',
    en: 'Chebureki diner'
  },
  {
    id: 'dar-viena-pili',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Castrosua_City_Versus,_VVT,_978,_route_10,_Vilnius,_Maironio_gatv%C4%97.jpg', author: 'Terminator216', license: CC_BY_4, crop: [0.31, 0.455, 0.51, 0.68] },
    tokens: [
      ['APSIMESTI', 'apsimesti', 'удавати', 'притворяться', 'to pretend'],
      ['MIEGANČIA?', 'miegoti', 'спати', 'спать', 'to sleep', 'In'],
      ['?'],
      ['PASTATYTI', 'pastatyti', 'збудувати', 'построить', 'to build'],
      ['DAR', 'dar', 'ще', 'ещё', 'still, another'],
      ['VIENĄ', 'vienas', 'один', 'один', 'one', 'G'],
      ['PILĮ?', 'pilis', 'замок', 'замок', 'castle', 'G']
    ],
    uk: 'Прикинутися сплячою? Чи збудувати ще один замок?',
    ru: 'Притвориться спящей? Или построить ещё один замок?',
    en: 'Pretend to be asleep? Or build another castle?'
  },
  {
    id: 'lemon-gym',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Z9P_4615_(53110141507).jpg', author: 'dave massie', license: CC_BY_2, crop: [0.083, 0.222, 0.298, 0.4547] },
    tokens: [
      ['IŠBANDYK', 'išbandyti', 'випробувати', 'попробовать', 'to try out'],
      ['LEMON GYM'],
      ['NEMOKAMAI', 'nemokamai', 'безкоштовно', 'бесплатно', 'for free']
    ],
    uk: 'Спробуй Lemon Gym безкоштовно',
    ru: 'Попробуй Lemon Gym бесплатно',
    en: 'Try Lemon Gym for free'
  },
  {
    id: 'avalyne',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:In_April,_2018_(49213663833).jpg', author: 'Šarūnas Burdulis', license: CC_BY_SA_2, crop: [0.3, 0.136, 0.95, 0.8639] },
    tokens: [
      ['AVALYNĖ', 'avalynė', 'взуття', 'обувь', 'footwear', 'V']
    ],
    uk: 'Взуття',
    ru: 'Обувь',
    en: 'Footwear'
  },
  {
    id: 'botaninis-draustinis',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Zembi%C5%A1kis_3.JPG', author: 'Hugo.arg', license: PD, crop: [0.465, 0.215, 0.8915, 0.6585] },
    tokens: [
      ['ZEMBIŠKIO', 'Zembiškis', 'Зембішкіс', 'Зембишкис', 'Zembiškis', 'K'],
      ['miško', ...MISKAS, 'K'],
      ['botaninis', 'botaninis', 'ботанічний', 'ботанический', 'botanical', 'V'],
      ['draustinis', 'draustinis', 'заказник', 'заказник', 'nature reserve', 'V']
    ],
    uk: 'Ботанічний заказник лісу Зембішкіс',
    ru: 'Ботанический заказник леса Зембишкис',
    en: 'Zembiškis Forest Botanical Reserve'
  },
  {
    id: 'sms-kreditas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:TROLLEYBUS_VILLINUS_LITHUANIA_SEP_2013_(9970834236).jpg', author: 'calflier001', license: CC_BY_SA_2, crop: [0.17, 0.13, 0.57, 0.6084] },
    tokens: [
      ['Kreditai', ...KREDITAS, 'V', 'pl'],
      ['„R-kiosk“'],
      IR,
      ['„Lietuvos', ...LIETUVA, 'K'],
      ['spaudos“', 'spauda', 'преса', 'пресса', 'press', 'K'],
      ['kioskuose!', 'kioskas', 'кіоск', 'киоск', 'kiosk', 'Vt', 'pl'],
      ['Pirmas', ...PIRMAS, 'V'],
      ['kreditas,', ...KREDITAS, 'V'],
      ['iki', 'iki', 'до', 'до', 'up to'],
      ['1000'],
      ['Lt,', 'litas', 'літ', 'лит', 'litas'],
      ['NEMOKAMAI', 'nemokamai', 'безкоштовно', 'бесплатно', 'for free'],
      ['–'],
      ['kiek', 'kiek', 'скільки', 'сколько', 'how much'],
      ['pasiskolinsi,', 'pasiskolinti', 'позичити', 'одолжить', 'to borrow'],
      ['tiek', 'tiek', 'стільки', 'столько', 'that much'],
      IR,
      ['grąžinsi!', 'grąžinti', 'повернути', 'вернуть', 'to pay back']
    ],
    uk: 'Кредити в кіосках «R-kiosk» і «Lietuvos spauda»! Перший кредит, до 1000 літів, безкоштовно — скільки позичиш, стільки й повернеш!',
    ru: 'Кредиты в киосках «R-kiosk» и «Lietuvos spauda»! Первый кредит, до 1000 литов, бесплатно — сколько займёшь, столько и вернёшь!',
    en: 'Loans at "R-kiosk" and "Lietuvos spauda" kiosks! First loan up to 1000 Lt for free: pay back exactly what you borrow!'
  },
  {
    id: 'alyvuogiu-aliejus',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:VILLUNUS_TROLLEY_BUS_LITHUANIA_SEP_2013_(9903482324).jpg', author: 'calflier001', license: CC_BY_SA_2, crop: [0.345, 0.58, 0.567, 0.9284] },
    tokens: [
      ['Ko', 'ko gero', 'мабуть', 'пожалуй', 'probably'],
      ['gero,', 'ko gero', 'мабуть', 'пожалуй', 'probably'],
      ['geriausias', 'geras', 'добрий, хороший', 'хороший', 'good', 'V'],
      ['ALYVUOGIŲ', 'alyvuogė', 'оливка', 'оливка', 'olive', 'K', 'pl'],
      ['ALIEJUS', 'aliejus', 'олія', 'растительное масло', 'oil', 'V'],
      ['iš', ...IS],
      ['Ispanijos', 'Ispanija', 'Іспанія', 'Испания', 'Spain', 'K']
    ],
    uk: 'Мабуть, найкраща оливкова олія з Іспанії',
    ru: 'Пожалуй, лучшее оливковое масло из Испании',
    en: 'Probably the best olive oil from Spain'
  },
  {
    id: 'autoplius',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:TROLLEY_BUS_AT_VILLINUS_RAILWAY_STATION_LITHUANIA_SEP_2013_(9903589386).jpg', author: 'calflier001', license: CC_BY_SA_2, crop: [0.295, 0.525, 0.695, 0.9679] },
    tokens: [
      ['LANKOMIAUSIAS', 'lankomas', 'відвідуваний', 'посещаемый', 'visited', 'V'],
      ['TRANSPORTO', 'transportas', 'транспорт', 'транспорт', 'transport', 'K'],
      ['SKELBIMŲ', 'skelbimas', 'оголошення', 'объявление', 'ad, notice', 'K', 'pl'],
      ['PORTALAS', 'portalas', 'портал', 'портал', 'portal', 'V']
    ],
    uk: 'Найвідвідуваніший портал оголошень про транспорт',
    ru: 'Самый посещаемый портал объявлений о транспорте',
    en: 'The most visited vehicle classifieds site'
  },
  {
    id: 'buvai-kine',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:TROLLEY_BUS_AT_VILLINUS_RAILWAY_STATION_LITHUANIA_SEP_2013_(9903650413).jpg', author: 'calflier001', license: CC_BY_SA_2, crop: [0.795, 0.56, 0.975, 0.8474] },
    tokens: [
      ['KADA', 'kada', 'коли', 'когда', 'when'],
      ['PASKUTINĮ', 'paskutinis', 'останній', 'последний', 'last', 'G'],
      ['KARTĄ', 'kartas', 'раз', 'раз', 'time (occasion)', 'G'],
      ['BUVAI', ...BUTI],
      ['KINE?', 'kinas', 'кіно', 'кино', 'cinema', 'Vt']
    ],
    uk: 'Коли ти востаннє був у кіно?',
    ru: 'Когда ты в последний раз был в кино?',
    en: 'When were you last at the cinema?'
  },
  {
    id: 'elektronikos-lauzas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:TROLLEY_BUS_ROUTE_2_AT_VILLINUS_RAILWAY_STATION_LITHUANIA_SEP_2013_(9880858244).jpg', author: 'calflier001', license: CC_BY_SA_2, crop: [0.685, 0.4, 0.905, 0.6464] },
    tokens: [
      ['BRANGIAI', 'brangiai', 'дорого', 'дорого', 'at a high price'],
      ['SUPERKAME', 'supirkti', 'скуповувати', 'скупать', 'to buy up'],
      ['ELEKTRONIKOS', 'elektronika', 'електроніка', 'электроника', 'electronics', 'K'],
      ['LAUŽĄ', 'laužas', 'брухт', 'лом', 'scrap', 'G']
    ],
    uk: 'Дорого скуповуємо електронний брухт',
    ru: 'Дорого скупаем электронный лом',
    en: 'We pay top price for electronic scrap'
  },
  {
    id: 'karjeros-marsrutas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Vilnius_trolleybus_2025.jpg', author: 'Smiley.toerist', license: CC_BY_SA_4, crop: [0.35, 0.497, 0.4789, 0.642] },
    tokens: [
      ['LEISK', 'leisti', 'дозволити', 'позволить', 'to let'],
      ['TAVO', 'tavo', 'твій', 'твой', 'your'],
      ['KARJEROS', 'karjera', "кар'єра", 'карьера', 'career', 'K'],
      ['MARŠRUTU', 'maršrutas', 'маршрут', 'маршрут', 'route', 'In'],
      ['PASIRŪPINTI', 'pasirūpinti', 'подбати', 'позаботиться', 'to take care'],
      ['MUMS', 'mes', 'ми', 'мы', 'we', 'N', 'pl']
    ],
    uk: "Дозволь нам подбати про маршрут твоєї кар'єри",
    ru: 'Позволь нам позаботиться о маршруте твоей карьеры',
    en: 'Let us take care of your career route'
  },
  {
    id: 'lietuvos-didzioji-kunigaikstyste',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Grand_Duchy_of_Lithuania_(9654550866).jpg', author: 'Bernt Rostad', license: CC_BY_2, crop: [0.05, 0.065, 0.6, 0.615] },
    tokens: [
      ['Lietuvos', ...LIETUVA, 'K'],
      ['Didžioji', 'didelis', 'великий', 'великий', 'big, great', 'V'],
      ['kunigaikštystė', 'kunigaikštystė', 'князівство', 'княжество', 'duchy', 'V'],
      ['Vytauto', 'Vytautas', 'Вітовт', 'Витовт', 'Vytautas', 'K'],
      ['valdymo', 'valdymas', 'правління', 'правление', 'rule', 'K'],
      ['laikais', 'laikas', 'час', 'время', 'time', 'In', 'pl'],
      ['(1392–1430)'],
      ['Plotas', 'plotas', 'площа', 'площадь', 'area', 'V'],
      ['–'],
      ['apie', 'apie', 'близько', 'около', 'about'],
      ['930'],
      ['tūkst.', 'tūkstantis', 'тисяча', 'тысяча', 'thousand'],
      ['km²'],
      ['Gyventojų', ...GYVENTOJAS, 'K', 'pl'],
      ['skaičius', 'skaičius', 'кількість, число', 'число', 'number', 'V'],
      ['–'],
      ['apie', 'apie', 'близько', 'около', 'about'],
      ['2 480 000']
    ],
    uk: 'Велике князівство Литовське за правління Вітовта (1392–1430). Площа — близько 930 тис. км². Населення — близько 2 480 000',
    ru: 'Великое княжество Литовское при Витовте (1392–1430). Площадь — около 930 тыс. км². Население — около 2 480 000',
    en: 'The Grand Duchy of Lithuania under Vytautas (1392–1430). Area: about 930 thousand km². Population: about 2,480,000'
  },
  {
    id: 'maziname-kainas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:RIMI_Kai%C5%A1iadoryse.JPG', author: 'Bearas', license: CC_BY_SA_3, crop: [0.425, 0.42, 0.615, 0.61] },
    tokens: [
      ['mažiname', 'mažinti', 'зменшувати', 'уменьшать', 'to reduce'],
      ['kainas', 'kaina', 'ціна', 'цена', 'price', 'G', 'pl']
    ],
    uk: 'Знижуємо ціни',
    ru: 'Снижаем цены',
    en: "We're cutting prices"
  },
  {
    id: 'gyvi-erketai',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Lithuania_Kaunas_aquarium_for_fish_2011.JPG', author: 'J Hokkanen', license: CC_BY_SA_4, crop: [0.598, 0.13, 0.852, 0.5523] },
    tokens: [
      ['GYVI', ...GYVAS, 'V', 'pl'],
      ['ERŠKETAI', 'eršketas', 'осетер', 'осётр', 'sturgeon', 'V', 'pl'],
      ['1KG'],
      ['-'],
      ['29,99'],
      ['GYVI', ...GYVAS, 'V', 'pl'],
      ['UPĖTAKIAI', 'upėtakis', 'форель', 'форель', 'trout', 'V', 'pl'],
      ['1KG-20,99'],
      ['GYVI', ...GYVAS, 'V', 'pl'],
      ['VĖŽIAI', 'vėžys', 'рак', 'рак', 'crayfish', 'V', 'pl'],
      ['1KG'],
      ['-'],
      ['69,99'],
      ['1VNT', 'vienetas', 'штука', 'штука', 'piece'],
      ['-1,99']
    ],
    uk: 'Живі осетри: 1 кг — 29,99. Жива форель: 1 кг — 20,99. Живі раки: 1 кг — 69,99, 1 шт. — 1,99',
    ru: 'Живые осётры: 1 кг — 29,99. Живая форель: 1 кг — 20,99. Живые раки: 1 кг — 69,99, 1 шт. — 1,99',
    en: 'Live sturgeon: 1 kg — 29.99. Live trout: 1 kg — 20.99. Live crayfish: 1 kg — 69.99, 1 pc — 1.99'
  },
  {
    id: 'taros-supirktuve',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Bottle_reverse_vending_machine_in_Vinius.jpg', author: 'Manvydasz', license: CC0, crop: [0.295, 0.33, 0.595, 0.63] },
    tokens: [
      ['TAROS', ...TARA, 'K'],
      ['SUPIRKTUVĖ', 'supirktuvė', 'пункт приймання', 'пункт приёма', 'buy-back point', 'V']
    ],
    uk: 'Пункт приймання тари',
    ru: 'Пункт приёма тары',
    en: 'Container return point'
  },
  {
    id: 'kvitas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Bottle_reverse_vending_machine_in_Vinius_2.JPG', author: 'Manvydasz', license: CC0, crop: [0.12, 0.475, 0.95, 0.854] },
    tokens: [
      ['Saugokite', 'saugoti', 'берегти', 'беречь', 'to keep, to protect'],
      ['kvitą', 'kvitas', 'чек', 'чек', 'receipt', 'G'],
      ['nuo', 'nuo', 'від', 'от', 'from'],
      ['tiesioginių', 'tiesioginis', 'прямий', 'прямой', 'direct', 'K', 'pl'],
      ['saulės', 'saulė', 'сонце', 'солнце', 'sun', 'K'],
      ['spindulių!', 'spindulys', 'промінь', 'луч', 'ray', 'K', 'pl']
    ],
    uk: 'Бережіть чек від прямих сонячних променів!',
    ru: 'Берегите чек от прямых солнечных лучей!',
    en: 'Keep the receipt away from direct sunlight!'
  },
  {
    id: 'darzoves',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Interior_of_Maxima_supermarket_in_Molas_Shopping_Centre,_Kaunas,_May_2026_1.jpg', author: 'Bdx', license: CC0, crop: [0.392, 0.27, 0.592, 0.47] },
    tokens: [
      ['DARŽOVĖS', 'daržovė', 'овоч', 'овощ', 'vegetable', 'V', 'pl'],
      ['Nuolat', 'nuolat', 'постійно', 'постоянно', 'constantly'],
      ['perrenkamos', 'perrinkti', 'перебирати', 'перебирать', 'to sort through', 'V', 'pl'],
      ['Šviežios', ...SVIEZIAS, 'V', 'pl'],
      IR,
      ['skanios', 'skanus', 'смачний', 'вкусный', 'tasty', 'V', 'pl']
    ],
    uk: 'Овочі. Постійно перебираються. Свіжі й смачні',
    ru: 'Овощи. Постоянно перебираются. Свежие и вкусные',
    en: 'Vegetables. Sorted all the time. Fresh and tasty'
  },
  {
    id: 'prie-baro',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:On_tap_at_Vilniaus_Alus_(9834991966).jpg', author: 'Bernt Rostad', license: CC_BY_2, crop: [0.29, 0.632, 0.78, 0.9076] },
    tokens: [
      ['Klientus', 'klientas', 'клієнт', 'клиент', 'customer', 'G', 'pl'],
      ['aptarnaujame', 'aptarnauti', 'обслуговувати', 'обслуживать', 'to serve'],
      ['tik', ...TIK],
      ['prie', 'prie', 'біля', 'у', 'at'],
      ['baro', 'baras', 'бар', 'бар', 'bar', 'K'],
      ['Užsakant', 'užsakyti', 'замовляти', 'заказывать', 'to order'],
      ['alų', 'alus', 'пиво', 'пиво', 'beer', 'G'],
      ['statinėse', 'statinė', 'бочка', 'бочка', 'barrel, keg', 'Vt', 'pl'],
      ['taikoma', 'taikyti', 'застосовувати', 'применять', 'to apply', 'V'],
      ['5%'],
      ['nuolaida', 'nuolaida', 'знижка', 'скидка', 'discount', 'V']
    ],
    uk: 'Клієнтів обслуговуємо лише біля бару. При замовленні пива в бочках — знижка 5%',
    ru: 'Клиентов обслуживаем только у бара. При заказе пива в бочках — скидка 5%',
    en: 'Customers are served at the bar only. 5% discount when ordering beer in kegs'
  },
  {
    id: 'darbo-laikas',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:LIDL_NAUJININKAI_20160626_013311.jpg', author: 'ViršuLF', license: CC0, crop: [0.475, 0.325, 0.73, 0.6651] },
    tokens: [
      ['DARBO', 'darbas', 'робота', 'работа', 'work', 'K'],
      ['LAIKAS', 'laikas', 'час', 'время', 'time', 'V'],
      ['Pirmadienis-', 'pirmadienis', 'понеділок', 'понедельник', 'Monday', 'V'],
      ['penktadienis', 'penktadienis', "п'ятниця", 'пятница', 'Friday', 'V'],
      ['08.00-18.00'],
      ['Šeštadienis', 'šeštadienis', 'субота', 'суббота', 'Saturday', 'V'],
      ['10.00-18.00']
    ],
    uk: "Години роботи: понеділок–п'ятниця 08.00–18.00, субота 10.00–18.00",
    ru: 'Часы работы: понедельник–пятница 08.00–18.00, суббота 10.00–18.00',
    en: 'Opening hours: Monday–Friday 08.00–18.00, Saturday 10.00–18.00'
  },
  {
    id: 'mano-kava',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:LIDL_NAUJININKAI_20160626_013420.jpg', author: 'ViršuLF', license: CC0, crop: [0, 0.747, 0.19, 1] },
    tokens: [
      ['mano', ...MANO],
      ['KAVA', ...KAVA, 'V'],
      ['PASIIMK', 'pasiimti', 'взяти', 'взять', 'to take'],
      ['SAVO', ...SAVO],
      ['MĖGSTAMIAUSIĄ!', 'mėgstamas', 'улюблений', 'любимый', 'favourite', 'G']
    ],
    uk: 'Моя кава. Візьми свою улюблену!',
    ru: 'Мой кофе. Возьми свой любимый!',
    en: 'My coffee. Grab your favourite!'
  },
  {
    id: 'mano-duona',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:LIDL_%C5%A0NIPI%C5%A0K%C4%96S_20160627_024209.jpg', author: 'ViršuLF', license: CC0, crop: [0.44, 0.36, 0.72, 0.733] },
    tokens: [
      ['mano', ...MANO],
      ['DUONA', ...DUONA, 'V'],
      ['Kasdien', 'kasdien', 'щодня', 'каждый день', 'every day'],
      ['šviežia', ...SVIEZIAS, 'V']
    ],
    uk: 'Мій хліб. Щодня свіжий',
    ru: 'Мой хлеб. Каждый день свежий',
    en: 'My bread. Fresh every day'
  },
  {
    id: 'svaresnis-vilnius',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:LIDL_%C5%A0NIPI%C5%A0K%C4%96S_20160627_024335.jpg', author: 'ViršuLF', license: CC0, crop: [0, 0.15, 0.5, 0.8167] },
    tokens: [
      ['Už', 'už', 'за', 'за', 'for'],
      ['švaresnį', 'švarus', 'чистий', 'чистый', 'clean', 'G'],
      ['Vilnių!', ...VILNIUS, 'G'],
      ['Mažinkime', 'mažinti', 'зменшувати', 'уменьшать', 'to reduce'],
      ['aplinkos', 'aplinka', 'довкілля', 'окружающая среда', 'environment', 'K'],
      ['taršą!', 'tarša', 'забруднення', 'загрязнение', 'pollution', 'G']
    ],
    uk: 'За чистіший Вільнюс! Зменшуймо забруднення довкілля!',
    ru: 'За более чистый Вильнюс! Уменьшим загрязнение окружающей среды!',
    en: "For a cleaner Vilnius! Let's reduce pollution!"
  },
  {
    id: 'poliklinika',
    photo: { page: 'https://commons.wikimedia.org/wiki/File:Kauno-miesto-centro-poliklinika-karantinas-kovo-18.jpg', author: 'LinasD', license: CC_BY_SA_4, crop: [0.26, 0.655, 0.72, 0.9138] },
    tokens: [
      ['KARANTINAS', 'karantinas', 'карантин', 'карантин', 'quarantine', 'V'],
      ['Poliklinikoje', 'poliklinika', 'поліклініка', 'поликлиника', 'outpatient clinic', 'Vt'],
      ['teikiamos', 'teikti', 'надавати', 'предоставлять', 'to provide', 'V', 'pl'],
      ['tik', ...TIK],
      ['būtinosios', 'būtinas', 'необхідний', 'необходимый', 'essential', 'V', 'pl'],
      ['medicinos', 'medicina', 'медицина', 'медицина', 'medicine', 'K'],
      ['pagalbos', 'pagalba', 'допомога', 'помощь', 'help, care', 'K'],
      ['paslaugos!', 'paslauga', 'послуга', 'услуга', 'service', 'V', 'pl']
    ],
    uk: 'Карантин. У поліклініці надаються лише послуги невідкладної медичної допомоги!',
    ru: 'Карантин. В поликлинике оказываются только услуги неотложной медицинской помощи!',
    en: 'Quarantine. The clinic provides essential medical care services only!'
  }
];
