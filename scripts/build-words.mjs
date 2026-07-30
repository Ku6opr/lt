import fs from 'fs';

const OUT = 'src/lib/data/words.js';

const fetched = [
  ...JSON.parse(fs.readFileSync('data-source/lt-declensions.json')),
  ...JSON.parse(fs.readFileSync('data-source/lt-declensions-themes.json')),
  ...JSON.parse(fs.readFileSync('data-source/lt-declensions-more.json'))
];

const DROP = new Set(['druska']);

const CAT = {
  žmogus: ['person'], vyras: ['person'], moteris: ['person'], vaikas: ['person'], mergaitė: ['person'],
  berniukas: ['person'], tėvas: ['person'], motina: ['person'], sūnus: ['person'], duktė: ['person'],
  draugas: ['person'], mokytojas: ['person'], gydytojas: ['person'], kaimynas: ['person'], senelis: ['person'],
  žmona: ['person'], sesuo: ['person'], brolis: ['person'],
  galva: ['body'], akis: ['body'], ranka: ['body'], koja: ['body'], širdis: ['body'],
  dantis: ['body'], veidas: ['body'], ausis: ['body'], burna: ['body'],
  langas: ['thing'], stalas: ['thing'], kėdė: ['thing'], lova: ['thing'], knyga: ['thing'],
  laikrodis: ['thing'], telefonas: ['thing'], raktas: ['thing'], laiškas: ['thing'],
  namas: ['place'], sodas: ['place'], miškas: ['place', 'nature'], miestas: ['place'], kaimas: ['place'],
  šalis: ['place'], gatvė: ['place'], kelias: ['place'], aikštė: ['place'], parduotuvė: ['place'],
  mokykla: ['place'], ligoninė: ['place'], pilis: ['place'], turgus: ['place'],
  jūra: ['place', 'nature'], ežeras: ['place', 'nature'], upė: ['place', 'nature'],
  medis: ['nature'], gėlė: ['nature'], akmuo: ['nature'], saulė: ['nature'], mėnulis: ['nature'],
  žvaigždė: ['nature'], lietus: ['nature'], sniegas: ['nature'], vėjas: ['nature'], oras: ['nature'],
  dangus: ['nature'], vyšnia: ['nature', 'food'],
  šuo: ['animal'], katė: ['animal'], paukštis: ['animal'], arklys: ['animal'], žuvis: ['animal'], gyvūnas: ['animal'],
  duona: ['food'], vanduo: ['drink', 'nature'], pienas: ['drink'], sūris: ['food'], mėsa: ['food'],
  obuolys: ['food'], bulvė: ['food'], arbata: ['drink'], kava: ['drink'], cukrus: ['food'],
  vaisius: ['food'], daržovė: ['food'],
  diena: ['time'], naktis: ['time'], rytas: ['time'], vakaras: ['time'], savaitė: ['time'],
  mėnuo: ['time'], valanda: ['time'], minutė: ['time'], laikas: ['time'], pavasaris: ['time'],
  vasara: ['time'], ruduo: ['time'], žiema: ['time'],
  šeima: ['abstract'], meilė: ['abstract'], gyvenimas: ['abstract'], darbas: ['abstract']
};

const EXTRA = [
  { lemma: 'vyšnia', found: true, pluralOnly: false, sg: ['vyšnia', 'vyšnios', 'vyšniai', 'vyšnią', 'vyšnia', 'vyšnioje'], pl: ['vyšnios', 'vyšnių', 'vyšnioms', 'vyšnias', 'vyšniomis', 'vyšniose'] }
];

const META = {
  žmogus: { t: 'us', uk: 'людина', f: ['людини', 'людині', 'людину', 'людиною', 'в людині'], flag: 1 },
  vyras: { t: 'as', uk: 'чоловік', f: ['чоловіка', 'чоловікові', 'чоловіка', 'чоловіком', 'у чоловікові'] },
  moteris: { t: 'is_f', uk: 'жінка', f: ['жінки', 'жінці', 'жінку', 'жінкою', 'у жінці'], flag: 1 },
  vaikas: { t: 'as', uk: 'дитина', f: ['дитини', 'дитині', 'дитину', 'дитиною', 'у дитині'] },
  mergaitė: { t: 'e', uk: 'дівчинка', f: ['дівчинки', 'дівчинці', 'дівчинку', 'дівчинкою', 'у дівчинці'] },
  berniukas: { t: 'as', uk: 'хлопчик', f: ['хлопчика', 'хлопчикові', 'хлопчика', 'хлопчиком', 'у хлопчикові'] },
  tėvas: { t: 'as', uk: 'батько', f: ['батька', 'батькові', 'батька', 'батьком', 'у батькові'] },
  motina: { t: 'a', uk: 'мати', f: ['матері', 'матері', 'матір', "матір'ю", 'у матері'] },
  sūnus: { t: 'us', uk: 'син', f: ['сина', 'синові', 'сина', 'сином', 'у синові'] },
  duktė: { t: 'e', uk: 'дочка', f: ['дочки', 'дочці', 'дочку', 'дочкою', 'у дочці'], flag: 1 },
  draugas: { t: 'as', uk: 'друг', f: ['друга', 'другові', 'друга', 'другом', 'у другові'] },
  mokytojas: { t: 'as', uk: 'вчитель', f: ['вчителя', 'вчителеві', 'вчителя', 'вчителем', 'у вчителеві'] },
  gydytojas: { t: 'as', uk: 'лікар', f: ['лікаря', 'лікареві', 'лікаря', 'лікарем', 'у лікареві'] },
  kaimynas: { t: 'as', uk: 'сусід', f: ['сусіда', 'сусідові', 'сусіда', 'сусідом', 'у сусідові'] },
  senelis: { t: 'is_b', uk: 'дідусь', f: ['дідуся', 'дідусеві', 'дідуся', 'дідусем', 'у дідусеві'] },
  šeima: { t: 'a', uk: "сім'я", f: ["сім'ї", "сім'ї", "сім'ю", "сім'єю", "у сім'ї"] },
  žmona: { t: 'a', uk: 'дружина', f: ['дружини', 'дружині', 'дружину', 'дружиною', 'у дружині'] },
  sesuo: { t: 'uo_f', uk: 'сестра', f: ['сестри', 'сестрі', 'сестру', 'сестрою', 'у сестрі'], flag: 1 },
  brolis: { t: 'is_b', uk: 'брат', f: ['брата', 'братові', 'брата', 'братом', 'у браті'] },
  galva: { t: 'a', uk: 'голова', f: ['голови', 'голові', 'голову', 'головою', 'на голові'] },
  akis: { t: 'is_f', uk: 'око', f: ['ока', 'оку', 'око', 'оком', 'в оці'] },
  ranka: { t: 'a', uk: 'рука', f: ['руки', 'руці', 'руку', 'рукою', 'в руці'] },
  koja: { t: 'a', uk: 'нога', f: ['ноги', 'нозі', 'ногу', 'ногою', 'на нозі'] },
  širdis: { t: 'is_f', uk: 'серце', f: ['серця', 'серцю', 'серце', 'серцем', 'у серці'] },
  dantis: { t: 'is_f', uk: 'зуб', f: ['зуба', 'зубові', 'зуб', 'зубом', 'у зубі'], flag: 1 },
  veidas: { t: 'as', uk: 'обличчя', f: ['обличчя', 'обличчю', 'обличчя', 'обличчям', 'на обличчі'] },
  ausis: { t: 'is_f', uk: 'вухо', f: ['вуха', 'вуху', 'вухо', 'вухом', 'у вусі'] },
  burna: { t: 'a', uk: 'рот', f: ['рота', 'ротові', 'рот', 'ротом', 'у роті'] },
  namas: { t: 'as', uk: 'будинок', f: ['будинку', 'будинку', 'будинок', 'будинком', 'в будинку'] },
  sodas: { t: 'as', uk: 'сад', f: ['саду', 'саду', 'сад', 'садом', 'в саду'] },
  langas: { t: 'as', uk: 'вікно', f: ['вікна', 'вікну', 'вікно', 'вікном', 'у вікні'] },
  stalas: { t: 'as', uk: 'стіл', f: ['стола', 'столу', 'стіл', 'столом', 'на столі'] },
  kėdė: { t: 'e', uk: 'стілець', f: ['стільця', 'стільцю', 'стілець', 'стільцем', 'на стільці'] },
  lova: { t: 'a', uk: 'ліжко', f: ['ліжка', 'ліжку', 'ліжко', 'ліжком', 'у ліжку'] },
  knyga: { t: 'a', uk: 'книга', f: ['книги', 'книзі', 'книгу', 'книгою', 'у книзі'] },
  laikrodis: { t: 'is_m', uk: 'годинник', f: ['годинника', 'годиннику', 'годинник', 'годинником', 'на годиннику'] },
  telefonas: { t: 'as', uk: 'телефон', f: ['телефону', 'телефону', 'телефон', 'телефоном', 'у телефоні'] },
  raktas: { t: 'as', uk: 'ключ', f: ['ключа', 'ключу', 'ключ', 'ключем', 'у ключі'] },
  laiškas: { t: 'as', uk: 'лист', f: ['листа', 'листові', 'лист', 'листом', 'у листі'] },
  duona: { t: 'a', uk: 'хліб', f: ['хліба', 'хлібу', 'хліб', 'хлібом', 'у хлібі'] },
  vanduo: { t: 'uo_m', uk: 'вода', f: ['води', 'воді', 'воду', 'водою', 'у воді'], flag: 1 },
  pienas: { t: 'as', uk: 'молоко', f: ['молока', 'молоку', 'молоко', 'молоком', 'у молоці'] },
  sūris: { t: 'is_b', uk: 'сир', f: ['сиру', 'сиру', 'сир', 'сиром', 'у сирі'] },
  mėsa: { t: 'a', uk: "м'ясо", f: ["м'яса", "м'ясу", "м'ясо", "м'ясом", "у м'ясі"] },
  obuolys: { t: 'ys', uk: 'яблуко', f: ['яблука', 'яблуку', 'яблуко', 'яблуком', 'у яблуці'] },
  bulvė: { t: 'e', uk: 'картопля', f: ['картоплі', 'картоплі', 'картоплю', 'картоплею', 'у картоплі'] },
  arbata: { t: 'a', uk: 'чай', f: ['чаю', 'чаю', 'чай', 'чаєм', 'у чаї'] },
  kava: { t: 'a', uk: 'кава', f: ['кави', 'каві', 'каву', 'кавою', 'у каві'] },
  cukrus: { t: 'us', uk: 'цукор', f: ['цукру', 'цукру', 'цукор', 'цукром', 'у цукрі'] },
  vaisius: { t: 'ius', uk: 'фрукт', f: ['фрукта', 'фрукту', 'фрукт', 'фруктом', 'у фрукті'] },
  daržovė: { t: 'e', uk: 'овоч', f: ['овоча', 'овочу', 'овоч', 'овочем', 'в овочі'] },
  medis: { t: 'is_m', uk: 'дерево', f: ['дерева', 'дереву', 'дерево', 'деревом', 'на дереві'] },
  gėlė: { t: 'e', uk: 'квітка', f: ['квітки', 'квітці', 'квітку', 'квіткою', 'у квітці'] },
  miškas: { t: 'as', uk: 'ліс', f: ['лісу', 'лісу', 'ліс', 'лісом', 'у лісі'] },
  jūra: { t: 'a', uk: 'море', f: ['моря', 'морю', 'море', 'морем', 'у морі'] },
  ežeras: { t: 'as', uk: 'озеро', f: ['озера', 'озеру', 'озеро', 'озером', 'в озері'] },
  upė: { t: 'e', uk: 'річка', f: ['річки', 'річці', 'річку', 'річкою', 'у річці'] },
  akmuo: { t: 'uo_m', uk: 'камінь', f: ['каменя', 'каменю', 'камінь', 'каменем', 'у камені'], flag: 1 },
  dangus: { t: 'us', uk: 'небо', f: ['неба', 'небу', 'небо', 'небом', 'на небі'] },
  saulė: { t: 'e', uk: 'сонце', f: ['сонця', 'сонцю', 'сонце', 'сонцем', 'на сонці'] },
  mėnulis: { t: 'is_b', uk: 'місяць', f: ['місяця', 'місяцю', 'місяць', 'місяцем', 'на місяці'] },
  žvaigždė: { t: 'e', uk: 'зірка', f: ['зірки', 'зірці', 'зірку', 'зіркою', 'на зірці'] },
  lietus: { t: 'us', uk: 'дощ', f: ['дощу', 'дощу', 'дощ', 'дощем', 'у дощі'] },
  sniegas: { t: 'as', uk: 'сніг', f: ['снігу', 'снігу', 'сніг', 'снігом', 'у снігу'] },
  vėjas: { t: 'as', uk: 'вітер', f: ['вітру', 'вітру', 'вітер', 'вітром', 'на вітрі'] },
  oras: { t: 'as', uk: 'повітря', f: ['повітря', 'повітрю', 'повітря', 'повітрям', 'у повітрі'] },
  gyvūnas: { t: 'as', uk: 'тварина', f: ['тварини', 'тварині', 'тварину', 'твариною', 'у тварині'] },
  šuo: { t: 'uo_m', uk: 'собака', f: ['собаки', 'собаці', 'собаку', 'собакою', 'у собаці'], flag: 1 },
  katė: { t: 'e', uk: 'кішка', f: ['кішки', 'кішці', 'кішку', 'кішкою', 'у кішці'] },
  paukštis: { t: 'is_m', uk: 'птах', f: ['птаха', 'птахові', 'птаха', 'птахом', 'у птахові'] },
  arklys: { t: 'ys', uk: 'кінь', f: ['коня', 'коневі', 'коня', 'конем', 'на коні'] },
  žuvis: { t: 'is_f', uk: 'риба', f: ['риби', 'рибі', 'рибу', 'рибою', 'у рибі'] },
  diena: { t: 'a', uk: 'день', f: ['дня', 'дню', 'день', 'днем', 'у дні'] },
  naktis: { t: 'is_f', uk: 'ніч', f: ['ночі', 'ночі', 'ніч', 'ніччю', 'у ночі'] },
  rytas: { t: 'as', uk: 'ранок', f: ['ранку', 'ранку', 'ранок', 'ранком', 'у ранку'] },
  vakaras: { t: 'as', uk: 'вечір', f: ['вечора', 'вечору', 'вечір', 'вечором', 'у вечорі'] },
  savaitė: { t: 'e', uk: 'тиждень', f: ['тижня', 'тижню', 'тиждень', 'тижнем', 'у тижні'] },
  mėnuo: { t: 'uo_m', uk: 'місяць', f: ['місяця', 'місяцю', 'місяць', 'місяцем', 'у місяці'], flag: 1 },
  valanda: { t: 'a', uk: 'година', f: ['години', 'годині', 'годину', 'годиною', 'у годині'] },
  minutė: { t: 'e', uk: 'хвилина', f: ['хвилини', 'хвилині', 'хвилину', 'хвилиною', 'у хвилині'] },
  laikas: { t: 'as', uk: 'час', f: ['часу', 'часу', 'час', 'часом', 'у часі'] },
  pavasaris: { t: 'is_b', uk: 'весна', f: ['весни', 'весні', 'весну', 'весною', 'у весні'] },
  vasara: { t: 'a', uk: 'літо', f: ['літа', 'літу', 'літо', 'літом', 'у літі'] },
  ruduo: { t: 'uo_m', uk: 'осінь', f: ['осені', 'осені', 'осінь', 'осінню', 'в осені'], flag: 1 },
  žiema: { t: 'a', uk: 'зима', f: ['зими', 'зимі', 'зиму', 'зимою', 'у зимі'] },
  miestas: { t: 'as', uk: 'місто', f: ['міста', 'місту', 'місто', 'містом', 'у місті'] },
  kaimas: { t: 'as', uk: 'село', f: ['села', 'селу', 'село', 'селом', 'у селі'] },
  šalis: { t: 'is_f', uk: 'країна', f: ['країни', 'країні', 'країну', 'країною', 'у країні'] },
  gatvė: { t: 'e', uk: 'вулиця', f: ['вулиці', 'вулиці', 'вулицю', 'вулицею', 'на вулиці'] },
  kelias: { t: 'is_b', uk: 'дорога', f: ['дороги', 'дорозі', 'дорогу', 'дорогою', 'на дорозі'], flag: 1 },
  aikštė: { t: 'e', uk: 'площа', f: ['площі', 'площі', 'площу', 'площею', 'на площі'] },
  parduotuvė: { t: 'e', uk: 'магазин', f: ['магазину', 'магазину', 'магазин', 'магазином', 'у магазині'] },
  mokykla: { t: 'a', uk: 'школа', f: ['школи', 'школі', 'школу', 'школою', 'у школі'] },
  ligoninė: { t: 'e', uk: 'лікарня', f: ['лікарні', 'лікарні', 'лікарню', 'лікарнею', 'у лікарні'] },
  darbas: { t: 'as', uk: 'робота', f: ['роботи', 'роботі', 'роботу', 'роботою', 'на роботі'] },
  pilis: { t: 'is_f', uk: 'замок', f: ['замку', 'замку', 'замок', 'замком', 'у замку'] },
  turgus: { t: 'us', uk: 'ринок', f: ['ринку', 'ринку', 'ринок', 'ринком', 'на ринку'] },
  meilė: { t: 'e', uk: 'любов', f: ['любові', 'любові', 'любов', "любов'ю", 'у любові'] },
  gyvenimas: { t: 'as', uk: 'життя', f: ['життя', 'життю', 'життя', 'життям', 'у житті'] },
  vyšnia: { t: 'ia', uk: 'вишня', f: ['вишні', 'вишні', 'вишню', 'вишнею', 'на вишні'] }
};

const THEME_MEMBERS = {
  prod: ['duona', 'sūris', 'mėsa', 'obuolys', 'bulvė', 'vaisius', 'daržovė', 'cukrus', 'pienas', 'vyšnia'],
  cafe: ['kava', 'arbata', 'vanduo', 'pienas', 'cukrus', 'duona', 'sūris'],
  street: ['gatvė', 'namas', 'parduotuvė', 'miestas', 'aikštė', 'kelias', 'sodas', 'mokykla', 'ligoninė', 'turgus', 'pilis', 'kaimas'],
  home: ['langas', 'stalas', 'kėdė', 'lova', 'knyga', 'laikrodis', 'telefonas', 'raktas', 'laiškas'],
  nature: ['medis', 'gėlė', 'akmuo', 'saulė', 'mėnulis', 'žvaigždė', 'lietus', 'sniegas', 'vėjas', 'oras', 'dangus', 'jūra', 'ežeras', 'upė', 'miškas', 'šuo', 'katė', 'paukštis', 'arklys', 'žuvis', 'gyvūnas'],
  people: ['žmogus', 'vyras', 'moteris', 'vaikas', 'mergaitė', 'berniukas', 'tėvas', 'motina', 'sūnus', 'duktė', 'draugas', 'mokytojas', 'gydytojas', 'kaimynas', 'senelis', 'žmona', 'sesuo', 'brolis', 'šeima'],
  time: ['diena', 'naktis', 'rytas', 'vakaras', 'savaitė', 'mėnuo', 'valanda', 'minutė', 'laikas', 'pavasaris', 'vasara', 'ruduo', 'žiema']
};
Object.assign(META, {
  kavinė: { t: 'e', uk: 'кафе', f: ['кафе', 'кафе', 'кафе', 'кафе', 'у кафе'] },
  sumuštinis: { t: 'is_b', uk: 'бутерброд', f: ['бутерброда', 'бутербродові', 'бутерброд', 'бутербродом', 'у бутерброді'] },
  pyragas: { t: 'as', uk: 'пиріг', f: ['пирога', 'пирогові', 'пиріг', 'пирогом', 'у пирозі'] },
  bandelė: { t: 'e', uk: 'булка', f: ['булки', 'булці', 'булку', 'булкою', 'у булці'] },
  sriuba: { t: 'a', uk: 'суп', f: ['супу', 'супу', 'суп', 'супом', 'у супі'] },
  sviestas: { t: 'as', uk: 'масло', f: ['масла', 'маслу', 'масло', 'маслом', 'у маслі'] },
  kiaušinis: { t: 'is_b', uk: 'яйце', f: ['яйця', 'яйцю', 'яйце', 'яйцем', 'у яйці'] },
  pomidoras: { t: 'as', uk: 'помідор', f: ['помідора', 'помідору', 'помідор', 'помідором', 'у помідорі'] },
  agurkas: { t: 'as', uk: 'огірок', f: ['огірка', 'огірку', 'огірок', 'огірком', 'в огірку'] },
  morka: { t: 'a', uk: 'морква', f: ['моркви', 'моркві', 'моркву', 'морквою', 'у моркві'] },
  dešra: { t: 'a', uk: 'ковбаса', f: ['ковбаси', 'ковбасі', 'ковбасу', 'ковбасою', 'у ковбасі'] },
  mašina: { t: 'a', uk: 'машина', f: ['машини', 'машині', 'машину', 'машиною', 'у машині'] },
  autobusas: { t: 'as', uk: 'автобус', f: ['автобуса', 'автобусу', 'автобус', 'автобусом', 'в автобусі'] },
  dviratis: { t: 'is_m', uk: 'велосипед', f: ['велосипеда', 'велосипеду', 'велосипед', 'велосипедом', 'на велосипеді'] },
  tiltas: { t: 'as', uk: 'міст', f: ['мосту', 'мосту', 'міст', 'мостом', 'на мосту'] },
  parkas: { t: 'as', uk: 'парк', f: ['парку', 'парку', 'парк', 'парком', 'у парку'] },
  kampas: { t: 'as', uk: 'кут', f: ['кута', 'куту', 'кут', 'кутом', 'у куті'] },
  stotelė: { t: 'e', uk: 'зупинка', f: ['зупинки', 'зупинці', 'зупинку', 'зупинкою', 'на зупинці'] },
  virtuvė: { t: 'e', uk: 'кухня', f: ['кухні', 'кухні', 'кухню', 'кухнею', 'на кухні'] },
  kambarys: { t: 'ys', uk: 'кімната', f: ['кімнати', 'кімнаті', 'кімнату', 'кімнатою', 'у кімнаті'] },
  spinta: { t: 'a', uk: 'шафа', f: ['шафи', 'шафі', 'шафу', 'шафою', 'у шафі'] },
  veidrodis: { t: 'is_m', uk: 'дзеркало', f: ['дзеркала', 'дзеркалу', 'дзеркало', 'дзеркалом', 'у дзеркалі'] },
  kalnas: { t: 'as', uk: 'гора', f: ['гори', 'горі', 'гору', 'горою', 'на горі'] },
  debesis: { t: 'is_f', uk: 'хмара', f: ['хмари', 'хмарі', 'хмару', 'хмарою', 'на хмарі'] }
});
Object.assign(CAT, {
  kavinė: ['place'], sumuštinis: ['food'], pyragas: ['food'], bandelė: ['food'], sriuba: ['food'],
  sviestas: ['food'], kiaušinis: ['food'], pomidoras: ['food'], agurkas: ['food'], morka: ['food'], dešra: ['food'],
  mašina: ['thing'], autobusas: ['thing'], dviratis: ['thing'], tiltas: ['place'], parkas: ['place'],
  kampas: ['place'], stotelė: ['place'], virtuvė: ['place'], kambarys: ['place'], spinta: ['thing'],
  veidrodis: ['thing'], kalnas: ['nature'], debesis: ['nature']
});
THEME_MEMBERS.prod.push('sumuštinis', 'bandelė', 'sviestas', 'kiaušinis', 'pomidoras', 'agurkas', 'morka', 'dešra');
THEME_MEMBERS.cafe.push('kavinė', 'sumuštinis', 'pyragas', 'bandelė', 'sriuba');
THEME_MEMBERS.street.push('mašina', 'autobusas', 'dviratis', 'tiltas', 'parkas', 'kampas', 'stotelė');
THEME_MEMBERS.home.push('virtuvė', 'kambarys', 'spinta', 'veidrodis');
THEME_MEMBERS.nature.push('parkas', 'kalnas', 'debesis');

Object.assign(META, {
  tortas: { t: 'as', uk: 'торт', f: ['торта', 'торту', 'торт', 'тортом', 'у торті'] },
  šokoladas: { t: 'as', uk: 'шоколад', f: ['шоколаду', 'шоколаду', 'шоколад', 'шоколадом', 'у шоколаді'] },
  alus: { t: 'us', uk: 'пиво', f: ['пива', 'пиву', 'пиво', 'пивом', 'у пиві'] },
  vynas: { t: 'as', uk: 'вино', f: ['вина', 'вину', 'вино', 'вином', 'у вині'] },
  lėkštė: { t: 'e', uk: 'тарілка', f: ['тарілки', 'тарілці', 'тарілку', 'тарілкою', 'на тарілці'] },
  šaukštas: { t: 'as', uk: 'ложка', f: ['ложки', 'ложці', 'ложку', 'ложкою', 'у ложці'] },
  stiklinė: { t: 'e', uk: 'склянка', f: ['склянки', 'склянці', 'склянку', 'склянкою', 'у склянці'] },
  sąskaita: { t: 'a', uk: 'рахунок', f: ['рахунку', 'рахунку', 'рахунок', 'рахунком', 'у рахунку'] },
  ledas: { t: 'as', uk: 'лід', f: ['льоду', 'льоду', 'лід', 'льодом', 'у льоду'] },
  servetėlė: { t: 'e', uk: 'серветка', f: ['серветки', 'серветці', 'серветку', 'серветкою', 'на серветці'] },
  bananas: { t: 'as', uk: 'банан', f: ['банана', 'банану', 'банан', 'бананом', 'у банані'] },
  apelsinas: { t: 'as', uk: 'апельсин', f: ['апельсина', 'апельсину', 'апельсин', 'апельсином', 'в апельсині'] },
  citrina: { t: 'a', uk: 'лимон', f: ['лимона', 'лимону', 'лимон', 'лимоном', 'у лимоні'] },
  kopūstas: { t: 'as', uk: 'капуста', f: ['капусти', 'капусті', 'капусту', 'капустою', 'у капусті'] },
  svogūnas: { t: 'as', uk: 'цибуля', f: ['цибулі', 'цибулі', 'цибулю', 'цибулею', 'у цибулі'] },
  česnakas: { t: 'as', uk: 'часник', f: ['часнику', 'часнику', 'часник', 'часником', 'у часнику'] },
  riešutas: { t: 'as', uk: 'горіх', f: ['горіха', 'горіху', 'горіх', 'горіхом', 'у горісі'] },
  uoga: { t: 'a', uk: 'ягода', f: ['ягоди', 'ягоді', 'ягоду', 'ягодою', 'у ягоді'] },
  grybas: { t: 'as', uk: 'гриб', f: ['гриба', 'грибу', 'гриб', 'грибом', 'у грибі'] },
  kumpis: { t: 'is_b', uk: 'шинка', f: ['шинки', 'шинці', 'шинку', 'шинкою', 'у шинці'] },
  braškė: { t: 'e', uk: 'полуниця', f: ['полуниці', 'полуниці', 'полуницю', 'полуницею', 'у полуниці'] },
  šviesoforas: { t: 'as', uk: 'світлофор', f: ['світлофора', 'світлофору', 'світлофор', 'світлофором', 'на світлофорі'] },
  viešbutis: { t: 'is_m', uk: 'готель', f: ['готелю', 'готелю', 'готель', 'готелем', 'у готелі'] },
  stotis: { t: 'is_f', uk: 'станція', f: ['станції', 'станції', 'станцію', 'станцією', 'на станції'] },
  bažnyčia: { t: 'ia', uk: 'церква', f: ['церкви', 'церкві', 'церкву', 'церквою', 'у церкві'] },
  muziejus: { t: 'us', uk: 'музей', f: ['музею', 'музею', 'музей', 'музеєм', 'у музеї'] },
  teatras: { t: 'as', uk: 'театр', f: ['театру', 'театру', 'театр', 'театром', 'у театрі'] },
  vaistinė: { t: 'e', uk: 'аптека', f: ['аптеки', 'аптеці', 'аптеку', 'аптекою', 'в аптеці'] },
  bankas: { t: 'as', uk: 'банк', f: ['банку', 'банку', 'банк', 'банком', 'у банку'] },
  vonia: { t: 'ia', uk: 'ванна', f: ['ванни', 'ванні', 'ванну', 'ванною', 'у ванні'] },
  krėslas: { t: 'as', uk: 'крісло', f: ['крісла', 'кріслу', 'крісло', 'кріслом', 'у кріслі'] },
  sofa: { t: 'a', uk: 'диван', f: ['дивана', 'дивану', 'диван', 'диваном', 'на дивані'] },
  paveikslas: { t: 'as', uk: 'картина', f: ['картини', 'картині', 'картину', 'картиною', 'на картині'] },
  kilimas: { t: 'as', uk: 'килим', f: ['килима', 'килиму', 'килим', 'килимом', 'на килимі'] },
  puodas: { t: 'as', uk: 'каструля', f: ['каструлі', 'каструлі', 'каструлю', 'каструлею', 'у каструлі'] },
  šaldytuvas: { t: 'as', uk: 'холодильник', f: ['холодильника', 'холодильнику', 'холодильник', 'холодильником', 'у холодильнику'] },
  viryklė: { t: 'e', uk: 'плита', f: ['плити', 'плиті', 'плиту', 'плитою', 'на плиті'] },
  siena: { t: 'a', uk: 'стіна', f: ['стіни', 'стіні', 'стіну', 'стіною', 'на стіні'] },
  žolė: { t: 'e', uk: 'трава', f: ['трави', 'траві', 'траву', 'травою', 'у траві'] },
  lapas: { t: 'as', uk: 'листок', f: ['листка', 'листку', 'листок', 'листком', 'на листку'] },
  šaka: { t: 'a', uk: 'гілка', f: ['гілки', 'гілці', 'гілку', 'гілкою', 'на гілці'] },
  krūmas: { t: 'as', uk: 'кущ', f: ['куща', 'кущу', 'кущ', 'кущем', 'у кущі'] },
  drugelis: { t: 'is_b', uk: 'метелик', f: ['метелика', 'метеликові', 'метелика', 'метеликом', 'на метелику'] },
  bitė: { t: 'e', uk: 'бджола', f: ['бджоли', 'бджолі', 'бджолу', 'бджолою', 'на бджолі'] },
  lapė: { t: 'e', uk: 'лисиця', f: ['лисиці', 'лисиці', 'лисицю', 'лисицею', 'на лисиці'] },
  meška: { t: 'a', uk: 'ведмідь', f: ['ведмедя', 'ведмедеві', 'ведмедя', 'ведмедем', 'на ведмеді'] },
  vilkas: { t: 'as', uk: 'вовк', f: ['вовка', 'вовкові', 'вовка', 'вовком', 'на вовку'] },
  kiškis: { t: 'is_b', uk: 'заєць', f: ['зайця', 'зайцеві', 'зайця', 'зайцем', 'на зайці'] },
  voverė: { t: 'e', uk: 'білка', f: ['білки', 'білці', 'білку', 'білкою', 'на білці'] },
  gyvatė: { t: 'e', uk: 'змія', f: ['змії', 'змії', 'змію', 'змією', 'на змії'] },
  teta: { t: 'a', uk: 'тітка', f: ['тітки', 'тітці', 'тітку', 'тіткою', 'у тітці'] },
  dėdė: { t: 'e', uk: 'дядько', f: ['дядька', 'дядькові', 'дядька', 'дядьком', 'у дядькові'] },
  senelė: { t: 'e', uk: 'бабуся', f: ['бабусі', 'бабусі', 'бабусю', 'бабусею', 'у бабусі'] },
  anūkas: { t: 'as', uk: 'онук', f: ['онука', 'онукові', 'онука', 'онуком', 'в онукові'] },
  virėjas: { t: 'as', uk: 'кухар', f: ['кухаря', 'кухареві', 'кухаря', 'кухарем', 'у кухареві'] },
  pardavėjas: { t: 'as', uk: 'продавець', f: ['продавця', 'продавцеві', 'продавця', 'продавцем', 'у продавцеві'] },
  vairuotojas: { t: 'as', uk: 'водій', f: ['водія', 'водієві', 'водія', 'водієм', 'у водієві'] },
  studentas: { t: 'as', uk: 'студент', f: ['студента', 'студентові', 'студента', 'студентом', 'у студентові'] },
  mokinys: { t: 'ys', uk: 'учень', f: ['учня', 'учневі', 'учня', 'учнем', 'в учневі'] },
  policininkas: { t: 'as', uk: 'поліцейський', f: ['поліцейського', 'поліцейському', 'поліцейського', 'поліцейським', 'на поліцейському'] },
  ūkininkas: { t: 'as', uk: 'фермер', f: ['фермера', 'фермерові', 'фермера', 'фермером', 'у фермерові'] },
  draugė: { t: 'e', uk: 'подруга', f: ['подруги', 'подрузі', 'подругу', 'подругою', 'у подрузі'] },
  sekmadienis: { t: 'is_b', uk: 'неділя', f: ['неділі', 'неділі', 'неділю', 'неділею', 'у неділі'] },
  pirmadienis: { t: 'is_b', uk: 'понеділок', f: ['понеділка', 'понеділку', 'понеділок', 'понеділком', 'у понеділку'] },
  šeštadienis: { t: 'is_b', uk: 'субота', f: ['суботи', 'суботі', 'суботу', 'суботою', 'у суботі'] },
  šventė: { t: 'e', uk: 'свято', f: ['свята', 'святу', 'свято', 'святом', 'на святі'] },
  gimtadienis: { t: 'is_b', uk: 'день народження', f: ['дня народження', 'дню народження', 'день народження', 'днем народження', 'на дні народження'] },
  sekundė: { t: 'e', uk: 'секунда', f: ['секунди', 'секунді', 'секунду', 'секундою', 'у секунді'] },
  amžius: { t: 'us', uk: 'вік', f: ['віку', 'віку', 'вік', 'віком', 'у віці'] }
});
Object.assign(CAT, {
  tortas: ['food'], šokoladas: ['food'], alus: ['drink'], vynas: ['drink'], lėkštė: ['thing'],
  šaukštas: ['thing'], stiklinė: ['thing'], sąskaita: ['thing'], ledas: ['food'], servetėlė: ['thing'],
  bananas: ['food'], apelsinas: ['food'], citrina: ['food'], kopūstas: ['food'], svogūnas: ['food'],
  česnakas: ['food'], riešutas: ['food'], uoga: ['food'], grybas: ['food'], kumpis: ['food'], braškė: ['food'],
  šviesoforas: ['thing'], viešbutis: ['place'], stotis: ['place'], bažnyčia: ['place'], muziejus: ['place'],
  teatras: ['place'], vaistinė: ['place'], bankas: ['place'],
  vonia: ['thing'], krėslas: ['thing'], sofa: ['thing'], paveikslas: ['thing'], kilimas: ['thing'],
  puodas: ['thing'], šaldytuvas: ['thing'], viryklė: ['thing'], siena: ['thing'],
  žolė: ['nature'], lapas: ['nature'], šaka: ['nature'], krūmas: ['nature'], drugelis: ['animal'],
  bitė: ['animal'], lapė: ['animal'], meška: ['animal'], vilkas: ['animal'], kiškis: ['animal'],
  voverė: ['animal'], gyvatė: ['animal'],
  teta: ['person'], dėdė: ['person'], senelė: ['person'], anūkas: ['person'], virėjas: ['person'],
  pardavėjas: ['person'], vairuotojas: ['person'], studentas: ['person'], mokinys: ['person'],
  policininkas: ['person'], ūkininkas: ['person'], draugė: ['person'],
  sekmadienis: ['time'], pirmadienis: ['time'], šeštadienis: ['time'], šventė: ['time'],
  gimtadienis: ['time'], sekundė: ['time'], amžius: ['time']
});
THEME_MEMBERS.cafe.push('tortas', 'šokoladas', 'alus', 'vynas', 'lėkštė', 'šaukštas', 'stiklinė', 'sąskaita', 'ledas', 'servetėlė');
THEME_MEMBERS.prod.push('bananas', 'apelsinas', 'citrina', 'kopūstas', 'svogūnas', 'česnakas', 'riešutas', 'uoga', 'grybas', 'kumpis', 'braškė');
THEME_MEMBERS.street.push('šviesoforas', 'viešbutis', 'stotis', 'bažnyčia', 'muziejus', 'teatras', 'vaistinė', 'bankas');
THEME_MEMBERS.home.push('vonia', 'krėslas', 'sofa', 'paveikslas', 'kilimas', 'puodas', 'šaldytuvas', 'viryklė', 'siena');
THEME_MEMBERS.nature.push('žolė', 'lapas', 'šaka', 'krūmas', 'drugelis', 'bitė', 'lapė', 'meška', 'vilkas', 'kiškis', 'voverė', 'gyvatė');
THEME_MEMBERS.people.push('teta', 'dėdė', 'senelė', 'anūkas', 'virėjas', 'pardavėjas', 'vairuotojas', 'studentas', 'mokinys', 'policininkas', 'ūkininkas', 'draugė');
THEME_MEMBERS.time.push('sekmadienis', 'pirmadienis', 'šeštadienis', 'šventė', 'gimtadienis', 'sekundė', 'amžius');

const THEMES_OF = {};
for (const [t, ls] of Object.entries(THEME_MEMBERS)) for (const l of ls) (THEMES_OF[l] ||= []).push(t);

const VALID_TYPES = new Set(['as', 'is_b', 'is_m', 'ys', 'us', 'ius', 'uo_m', 'a', 'ia', 'e', 'is_f', 'uo_f']);

const source = [...fetched, ...EXTRA].filter((w) => !DROP.has(w.lemma));
const problems = [];
const words = [];
const flagged = [];

for (const w of source) {
  const m = META[w.lemma];
  if (!m) { problems.push('no META: ' + w.lemma); continue; }
  if (!VALID_TYPES.has(m.t)) { problems.push('bad type ' + m.t + ': ' + w.lemma); continue; }
  if (!w.sg || w.sg.length !== 6 || !w.pl || w.pl.length !== 6 || [...w.sg, ...w.pl].some((x) => x == null)) {
    problems.push('bad forms: ' + w.lemma); continue;
  }
  const cat = CAT[w.lemma];
  if (!cat) { problems.push('no CAT: ' + w.lemma); continue; }
  const [gen, dat, acc, ins, loc] = m.f;
  words.push({
    id: w.lemma, type: m.t, cat, themes: THEMES_OF[w.lemma] || [], uk: m.uk,
    ukForms: { nom: m.uk, gen, dat, acc, ins, loc },
    sg: w.sg, pl: w.pl
  });
  if (m.flag) flagged.push(w.lemma);
}

const byType = {};
for (const w of words) byType[w.type] = (byType[w.type] || 0) + 1;

if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }

const lines = words.map((w) => '  ' + JSON.stringify(w));
fs.writeFileSync(OUT, 'export const WORDS = [\n' + lines.join(',\n') + '\n];\n');

console.log('written', words.length, 'words to', OUT);
console.log('by type:', JSON.stringify(byType));
console.log('flagged (низька впевненість, вичитати):', flagged.join(', '));
const missing = [...VALID_TYPES].filter((t) => !byType[t]);
console.log('types without words:', missing.length ? missing.join(', ') : 'none');
