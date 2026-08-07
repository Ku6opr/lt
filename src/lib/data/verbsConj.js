// Дієвідмінювання в теперішньому часі. Особи: sg1=aš, sg2=tu, p3=jis/ji/jie/jos, pl1=mes, pl2=jūs.
// У литовській 3-тя особа однини = 3-тя особа множини (одна форма p3).
// g.<lang> — особові форми ДЖЕРЕЛЬНОЮ мовою у порядку [1sg, 2sg, 3sg, 1pl, 2pl, 3pl]
// (для глоса-фрази «он видит» / «вони їдять»; у джерельній мові 3sg ≠ 3pl, тому 6 форм).
export const VERBS = [
  { id: 'buti', inf: 'būti', uk: 'бути', ru: 'быть', en: 'to be',
    f: { sg1: 'esu', sg2: 'esi', p3: 'yra', pl1: 'esame', pl2: 'esate' },
    g: { uk: ['є', 'є', 'є', 'є', 'є', 'є'], ru: ['есть', 'есть', 'есть', 'есть', 'есть', 'есть'], en: ['am', 'are', 'is', 'are', 'are', 'are'] } },
  { id: 'tureti', inf: 'turėti', uk: 'мати', ru: 'иметь', en: 'to have',
    f: { sg1: 'turiu', sg2: 'turi', p3: 'turi', pl1: 'turime', pl2: 'turite' },
    g: { uk: ['маю', 'маєш', 'має', 'маємо', 'маєте', 'мають'], ru: ['имею', 'имеешь', 'имеет', 'имеем', 'имеете', 'имеют'], en: ['have', 'have', 'has', 'have', 'have', 'have'] } },
  { id: 'noreti', inf: 'norėti', uk: 'хотіти', ru: 'хотеть', en: 'to want',
    f: { sg1: 'noriu', sg2: 'nori', p3: 'nori', pl1: 'norime', pl2: 'norite' },
    g: { uk: ['хочу', 'хочеш', 'хоче', 'хочемо', 'хочете', 'хочуть'], ru: ['хочу', 'хочешь', 'хочет', 'хотим', 'хотите', 'хотят'], en: ['want', 'want', 'wants', 'want', 'want', 'want'] } },
  { id: 'galeti', inf: 'galėti', uk: 'могти', ru: 'мочь', en: 'can',
    f: { sg1: 'galiu', sg2: 'gali', p3: 'gali', pl1: 'galime', pl2: 'galite' },
    g: { uk: ['можу', 'можеш', 'може', 'можемо', 'можете', 'можуть'], ru: ['могу', 'можешь', 'может', 'можем', 'можете', 'могут'], en: ['can', 'can', 'can', 'can', 'can', 'can'] } },
  { id: 'eiti', inf: 'eiti', uk: 'йти', ru: 'идти', en: 'to go',
    f: { sg1: 'einu', sg2: 'eini', p3: 'eina', pl1: 'einame', pl2: 'einate' },
    g: { uk: ['йду', 'йдеш', 'йде', 'йдемо', 'йдете', 'йдуть'], ru: ['иду', 'идёшь', 'идёт', 'идём', 'идёте', 'идут'], en: ['go', 'go', 'goes', 'go', 'go', 'go'] } },
  { id: 'daryti', inf: 'daryti', uk: 'робити', ru: 'делать', en: 'to do',
    f: { sg1: 'darau', sg2: 'darai', p3: 'daro', pl1: 'darome', pl2: 'darote' },
    g: { uk: ['роблю', 'робиш', 'робить', 'робимо', 'робите', 'роблять'], ru: ['делаю', 'делаешь', 'делает', 'делаем', 'делаете', 'делают'], en: ['do', 'do', 'does', 'do', 'do', 'do'] } },
  { id: 'zinoti', inf: 'žinoti', uk: 'знати', ru: 'знать', en: 'to know',
    f: { sg1: 'žinau', sg2: 'žinai', p3: 'žino', pl1: 'žinome', pl2: 'žinote' },
    g: { uk: ['знаю', 'знаєш', 'знає', 'знаємо', 'знаєте', 'знають'], ru: ['знаю', 'знаешь', 'знает', 'знаем', 'знаете', 'знают'], en: ['know', 'know', 'knows', 'know', 'know', 'know'] } },
  { id: 'matyti', inf: 'matyti', uk: 'бачити', ru: 'видеть', en: 'to see',
    f: { sg1: 'matau', sg2: 'matai', p3: 'mato', pl1: 'matome', pl2: 'matote' },
    g: { uk: ['бачу', 'бачиш', 'бачить', 'бачимо', 'бачите', 'бачать'], ru: ['вижу', 'видишь', 'видит', 'видим', 'видите', 'видят'], en: ['see', 'see', 'sees', 'see', 'see', 'see'] } },
  { id: 'kalbeti', inf: 'kalbėti', uk: 'говорити', ru: 'говорить', en: 'to speak',
    f: { sg1: 'kalbu', sg2: 'kalbi', p3: 'kalba', pl1: 'kalbame', pl2: 'kalbate' },
    g: { uk: ['говорю', 'говориш', 'говорить', 'говоримо', 'говорите', 'говорять'], ru: ['говорю', 'говоришь', 'говорит', 'говорим', 'говорите', 'говорят'], en: ['speak', 'speak', 'speaks', 'speak', 'speak', 'speak'] } },
  { id: 'gyventi', inf: 'gyventi', uk: 'жити', ru: 'жить', en: 'to live',
    f: { sg1: 'gyvenu', sg2: 'gyveni', p3: 'gyvena', pl1: 'gyvename', pl2: 'gyvenate' },
    g: { uk: ['живу', 'живеш', 'живе', 'живемо', 'живете', 'живуть'], ru: ['живу', 'живёшь', 'живёт', 'живём', 'живёте', 'живут'], en: ['live', 'live', 'lives', 'live', 'live', 'live'] } },
  { id: 'dirbti', inf: 'dirbti', uk: 'працювати', ru: 'работать', en: 'to work',
    f: { sg1: 'dirbu', sg2: 'dirbi', p3: 'dirba', pl1: 'dirbame', pl2: 'dirbate' },
    g: { uk: ['працюю', 'працюєш', 'працює', 'працюємо', 'працюєте', 'працюють'], ru: ['работаю', 'работаешь', 'работает', 'работаем', 'работаете', 'работают'], en: ['work', 'work', 'works', 'work', 'work', 'work'] } },
  { id: 'skaityti', inf: 'skaityti', uk: 'читати', ru: 'читать', en: 'to read',
    f: { sg1: 'skaitau', sg2: 'skaitai', p3: 'skaito', pl1: 'skaitome', pl2: 'skaitote' },
    g: { uk: ['читаю', 'читаєш', 'читає', 'читаємо', 'читаєте', 'читають'], ru: ['читаю', 'читаешь', 'читает', 'читаем', 'читаете', 'читают'], en: ['read', 'read', 'reads', 'read', 'read', 'read'] } },
  { id: 'rasyti', inf: 'rašyti', uk: 'писати', ru: 'писать', en: 'to write',
    f: { sg1: 'rašau', sg2: 'rašai', p3: 'rašo', pl1: 'rašome', pl2: 'rašote' },
    g: { uk: ['пишу', 'пишеш', 'пише', 'пишемо', 'пишете', 'пишуть'], ru: ['пишу', 'пишешь', 'пишет', 'пишем', 'пишете', 'пишут'], en: ['write', 'write', 'writes', 'write', 'write', 'write'] } },
  { id: 'valgyti', inf: 'valgyti', uk: 'їсти', ru: 'есть', en: 'to eat',
    f: { sg1: 'valgau', sg2: 'valgai', p3: 'valgo', pl1: 'valgome', pl2: 'valgote' },
    g: { uk: ['їм', 'їси', 'їсть', 'їмо', 'їсте', 'їдять'], ru: ['ем', 'ешь', 'ест', 'едим', 'едите', 'едят'], en: ['eat', 'eat', 'eats', 'eat', 'eat', 'eat'] } },
  { id: 'gerti', inf: 'gerti', uk: 'пити', ru: 'пить', en: 'to drink',
    f: { sg1: 'geriu', sg2: 'geri', p3: 'geria', pl1: 'geriame', pl2: 'geriate' },
    g: { uk: ["п'ю", "п'єш", "п'є", "п'ємо", "п'єте", "п'ють"], ru: ['пью', 'пьёшь', 'пьёт', 'пьём', 'пьёте', 'пьют'], en: ['drink', 'drink', 'drinks', 'drink', 'drink', 'drink'] } },
  { id: 'myleti', inf: 'mylėti', uk: 'любити', ru: 'любить', en: 'to love',
    f: { sg1: 'myliu', sg2: 'myli', p3: 'myli', pl1: 'mylime', pl2: 'mylite' },
    g: { uk: ['люблю', 'любиш', 'любить', 'любимо', 'любите', 'люблять'], ru: ['люблю', 'любишь', 'любит', 'любим', 'любите', 'любят'], en: ['love', 'love', 'loves', 'love', 'love', 'love'] } },
  { id: 'suprasti', inf: 'suprasti', uk: 'розуміти', ru: 'понимать', en: 'to understand',
    f: { sg1: 'suprantu', sg2: 'supranti', p3: 'supranta', pl1: 'suprantame', pl2: 'suprantate' },
    g: { uk: ['розумію', 'розумієш', 'розуміє', 'розуміємо', 'розумієте', 'розуміють'], ru: ['понимаю', 'понимаешь', 'понимает', 'понимаем', 'понимаете', 'понимают'], en: ['understand', 'understand', 'understands', 'understand', 'understand', 'understand'] } },
  { id: 'klausti', inf: 'klausti', uk: 'запитувати', ru: 'спрашивать', en: 'to ask',
    f: { sg1: 'klausiu', sg2: 'klausi', p3: 'klausia', pl1: 'klausiame', pl2: 'klausiate' },
    g: { uk: ['запитую', 'запитуєш', 'запитує', 'запитуємо', 'запитуєте', 'запитують'], ru: ['спрашиваю', 'спрашиваешь', 'спрашивает', 'спрашиваем', 'спрашиваете', 'спрашивают'], en: ['ask', 'ask', 'asks', 'ask', 'ask', 'ask'] } },
  { id: 'moketi', inf: 'mokėti', uk: 'уміти', ru: 'уметь', en: 'to know how',
    f: { sg1: 'moku', sg2: 'moki', p3: 'moka', pl1: 'mokame', pl2: 'mokate' },
    g: { uk: ['умію', 'умієш', 'уміє', 'уміємо', 'умієте', 'уміють'], ru: ['умею', 'умеешь', 'умеет', 'умеем', 'умеете', 'умеют'], en: ['know how', 'know how', 'knows how', 'know how', 'know how', 'know how'] } },
  { id: 'dainuoti', inf: 'dainuoti', uk: 'співати', ru: 'петь', en: 'to sing',
    f: { sg1: 'dainuoju', sg2: 'dainuoji', p3: 'dainuoja', pl1: 'dainuojame', pl2: 'dainuojate' },
    g: { uk: ['співаю', 'співаєш', 'співає', 'співаємо', 'співаєте', 'співають'], ru: ['пою', 'поёшь', 'поёт', 'поём', 'поёте', 'поют'], en: ['sing', 'sing', 'sings', 'sing', 'sing', 'sing'] } }
];

// займенник → особова клітинка литовської (slot), число (num), індекс особи в g (pi: 0=1sg…5=3pl)
export const PRON_PERSON = [
  { id: 'as', lt: 'aš', slot: 'sg1', num: 'sg', pi: 0 },
  { id: 'tu', lt: 'tu', slot: 'sg2', num: 'sg', pi: 1 },
  { id: 'jis', lt: 'jis', slot: 'p3', num: 'sg', pi: 2 },
  { id: 'ji', lt: 'ji', slot: 'p3', num: 'sg', pi: 2 },
  { id: 'mes', lt: 'mes', slot: 'pl1', num: 'pl', pi: 3 },
  { id: 'jus', lt: 'jūs', slot: 'pl2', num: 'pl', pi: 4 },
  { id: 'jie', lt: 'jie', slot: 'p3', num: 'pl', pi: 5 },
  { id: 'jos', lt: 'jos', slot: 'p3', num: 'pl', pi: 5 }
];

// займенник-підмет джерельною мовою (для глоса-фрази)
export const SRC_PRON = {
  uk: { as: 'я', tu: 'ти', jis: 'він', ji: 'вона', mes: 'ми', jus: 'ви', jie: 'вони', jos: 'вони' },
  ru: { as: 'я', tu: 'ты', jis: 'он', ji: 'она', mes: 'мы', jus: 'вы', jie: 'они', jos: 'они' },
  en: { as: 'I', tu: 'you', jis: 'he', ji: 'she', mes: 'we', jus: 'you', jie: 'they', jos: 'they' }
};

export const PERSON_COLS = ['sg1', 'sg2', 'p3', 'pl1', 'pl2'];
export const PERSON_LABEL = { sg1: 'aš', sg2: 'tu', p3: 'jis, ji', pl1: 'mes', pl2: 'jūs' };
