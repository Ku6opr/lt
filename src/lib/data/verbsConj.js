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

const _A = {
  buti: { sg1: 'esù', sg2: 'esì', p3: 'yrà', pl1: 'ẽsame', pl2: 'ẽsate' },
  tureti: { sg1: 'turiù', sg2: 'turì', p3: 'tùri', pl1: 'tùrime', pl2: 'tùrite' },
  noreti: { sg1: 'nóriu', sg2: 'nóri', p3: 'nóri', pl1: 'nórime', pl2: 'nórite' },
  galeti: { sg1: 'galiù', sg2: 'galì', p3: 'gãli', pl1: 'gãlime', pl2: 'gãlite' },
  eiti: { sg1: 'einù', sg2: 'einì', p3: 'eĩna', pl1: 'eĩname', pl2: 'eĩnate' },
  daryti: { sg1: 'daraũ', sg2: 'daraĩ', p3: 'dãro', pl1: 'dãrome', pl2: 'dãrote' },
  zinoti: { sg1: 'žinaũ', sg2: 'žinaĩ', p3: 'žìno', pl1: 'žìnome', pl2: 'žìnote' },
  matyti: { sg1: 'mataũ', sg2: 'mataĩ', p3: 'mãto', pl1: 'mãtome', pl2: 'mãtote' },
  kalbeti: { sg1: 'kalbù', sg2: 'kalbì', p3: 'kal̃ba', pl1: 'kal̃bame', pl2: 'kal̃bate' },
  gyventi: { sg1: 'gyvenù', sg2: 'gyvenì', p3: 'gyvẽna', pl1: 'gyvẽname', pl2: 'gyvẽnate' },
  dirbti: { sg1: 'dìrbu', sg2: 'dìrbi', p3: 'dìrba', pl1: 'dìrbame', pl2: 'dìrbate' },
  skaityti: { sg1: 'skaitaũ', sg2: 'skaitaĩ', p3: 'skaĩto', pl1: 'skaĩtome', pl2: 'skaĩtote' },
  rasyti: { sg1: 'rašaũ', sg2: 'rašaĩ', p3: 'rãšo', pl1: 'rãšome', pl2: 'rãšote' },
  valgyti: { sg1: 'válgau', sg2: 'válgai', p3: 'válgo', pl1: 'válgome', pl2: 'válgote' },
  gerti: { sg1: 'geriù', sg2: 'gerì', p3: 'gẽria', pl1: 'gẽriame', pl2: 'gẽriate' },
  myleti: { sg1: 'mýliu', sg2: 'mýli', p3: 'mýli', pl1: 'mýlime', pl2: 'mýlite' },
  suprasti: { sg1: 'suprantù', sg2: 'suprantì', p3: 'suprañta', pl1: 'suprañtame', pl2: 'suprañtate' },
  moketi: { sg1: 'móku', sg2: 'móki', p3: 'móka', pl1: 'mókame', pl2: 'mókate' }
};
for (const v of VERBS) v.fA = _A[v.id];

const _P = {
  buti: { p3p: 'buvo', p3pA: 'bùvo', gp: { uk: 'був', ru: 'был', en: 'was' } },
  tureti: { p3p: 'turėjo', p3pA: 'turė́jo', gp: { uk: 'мав', ru: 'имел', en: 'had' } },
  noreti: { p3p: 'norėjo', p3pA: 'norė́jo', gp: { uk: 'хотів', ru: 'хотел', en: 'wanted' } },
  galeti: { p3p: 'galėjo', p3pA: 'galė́jo', gp: { uk: 'міг', ru: 'мог', en: 'could' } },
  eiti: { p3p: 'ėjo', p3pA: 'ė̃jo', gp: { uk: 'ішов', ru: 'шёл', en: 'went' } },
  daryti: { p3p: 'darė', p3pA: 'dãrė', gp: { uk: 'робив', ru: 'делал', en: 'did' } },
  zinoti: { p3p: 'žinojo', p3pA: 'žinójo', gp: { uk: 'знав', ru: 'знал', en: 'knew' } },
  matyti: { p3p: 'matė', p3pA: 'mãtė', gp: { uk: 'бачив', ru: 'видел', en: 'saw' } },
  kalbeti: { p3p: 'kalbėjo', p3pA: 'kalbė́jo', gp: { uk: 'говорив', ru: 'говорил', en: 'spoke' } },
  gyventi: { p3p: 'gyveno', p3pA: 'gyvẽno', gp: { uk: 'жив', ru: 'жил', en: 'lived' } },
  dirbti: { p3p: 'dirbo', p3pA: 'dìrbo', gp: { uk: 'працював', ru: 'работал', en: 'worked' } },
  skaityti: { p3p: 'skaitė', p3pA: 'skaĩtė', gp: { uk: 'читав', ru: 'читал', en: 'read' } },
  rasyti: { p3p: 'rašė', p3pA: 'rãšė', gp: { uk: 'писав', ru: 'писал', en: 'wrote' } },
  valgyti: { p3p: 'valgė', p3pA: 'válgė', gp: { uk: 'їв', ru: 'ел', en: 'ate' } },
  gerti: { p3p: 'gėrė', p3pA: 'gė́rė', gp: { uk: 'пив', ru: 'пил', en: 'drank' } },
  myleti: { p3p: 'mylėjo', p3pA: 'mylė́jo', gp: { uk: 'любив', ru: 'любил', en: 'loved' } },
  suprasti: { p3p: 'suprato', p3pA: 'suprãto', gp: { uk: 'розумів', ru: 'понимал', en: 'understood' } },
  klausti: { p3p: 'klausė', gp: { uk: 'запитував', ru: 'спрашивал', en: 'asked' } },
  moketi: { p3p: 'mokėjo', p3pA: 'mokė́jo', gp: { uk: 'умів', ru: 'умел', en: 'knew how' } },
  dainuoti: { p3p: 'dainavo', gp: { uk: 'співав', ru: 'пел', en: 'sang' } }
};
for (const v of VERBS) Object.assign(v, _P[v.id] || {});

const _T = {
  buti: { past: { sg1: 'buvau', sg2: 'buvai', p3: 'buvo', pl1: 'buvome', pl2: 'buvote' }, pastA: { sg1: 'buvaũ', sg2: 'buvaĩ', p3: 'bùvo', pl1: 'bùvome', pl2: 'bùvote' }, fut: { sg1: 'būsiu', sg2: 'būsi', p3: 'bus', pl1: 'būsime', pl2: 'būsite' }, futA: { sg1: 'bū́siu', sg2: 'bū́si', p3: 'bùs', pl1: 'bū́sime', pl2: 'bū́site' }, pt: { uk: { m: 'був', f: 'була', pl: 'були' }, ru: { m: 'был', f: 'была', pl: 'были' } } },
  tureti: { past: { sg1: 'turėjau', sg2: 'turėjai', p3: 'turėjo', pl1: 'turėjome', pl2: 'turėjote' }, pastA: { sg1: 'turė́jau', sg2: 'turė́jai', p3: 'turė́jo', pl1: 'turė́jome', pl2: 'turė́jote' }, fut: { sg1: 'turėsiu', sg2: 'turėsi', p3: 'turės', pl1: 'turėsime', pl2: 'turėsite' }, futA: { sg1: 'turė́siu', sg2: 'turė́si', p3: 'turė̃s', pl1: 'turė́sime', pl2: 'turė́site' }, pt: { uk: { m: 'мав', f: 'мала', pl: 'мали' }, ru: { m: 'имел', f: 'имела', pl: 'имели' } } },
  noreti: { past: { sg1: 'norėjau', sg2: 'norėjai', p3: 'norėjo', pl1: 'norėjome', pl2: 'norėjote' }, pastA: { sg1: 'norė́jau', sg2: 'norė́jai', p3: 'norė́jo', pl1: 'norė́jome', pl2: 'norė́jote' }, fut: { sg1: 'norėsiu', sg2: 'norėsi', p3: 'norės', pl1: 'norėsime', pl2: 'norėsite' }, futA: { sg1: 'norė́siu', sg2: 'norė́si', p3: 'norė́s', pl1: 'norė́sime', pl2: 'norė́site' }, pt: { uk: { m: 'хотів', f: 'хотіла', pl: 'хотіли' }, ru: { m: 'хотел', f: 'хотела', pl: 'хотели' } } },
  galeti: { past: { sg1: 'galėjau', sg2: 'galėjai', p3: 'galėjo', pl1: 'galėjome', pl2: 'galėjote' }, pastA: { sg1: 'galė́jau', sg2: 'galė́jai', p3: 'galė́jo', pl1: 'galė́jome', pl2: 'galė́jote' }, fut: { sg1: 'galėsiu', sg2: 'galėsi', p3: 'galės', pl1: 'galėsime', pl2: 'galėsite' }, futA: { sg1: 'galė́siu', sg2: 'galė́si', p3: 'galė̃s', pl1: 'galė́sime', pl2: 'galė́site' }, pt: { uk: { m: 'міг', f: 'могла', pl: 'могли' }, ru: { m: 'мог', f: 'могла', pl: 'могли' } } },
  eiti: { past: { sg1: 'ėjau', sg2: 'ėjai', p3: 'ėjo', pl1: 'ėjome', pl2: 'ėjote' }, pastA: { sg1: 'ėjaũ', sg2: 'ėjaĩ', p3: 'ė̃jo', pl1: 'ė̃jome', pl2: 'ė̃jote' }, fut: { sg1: 'eisiu', sg2: 'eisi', p3: 'eis', pl1: 'eisime', pl2: 'eisite' }, futA: { sg1: 'eĩsiu', sg2: 'eĩsi', p3: 'eĩs', pl1: 'eĩsime', pl2: 'eĩsite' }, pt: { uk: { m: 'ішов', f: 'ішла', pl: 'ішли' }, ru: { m: 'шёл', f: 'шла', pl: 'шли' } } },
  daryti: { past: { sg1: 'dariau', sg2: 'darei', p3: 'darė', pl1: 'darėme', pl2: 'darėte' }, pastA: { sg1: 'dariaũ', sg2: 'dareĩ', p3: 'dãrė', pl1: 'dãrėme', pl2: 'dãrėte' }, fut: { sg1: 'darysiu', sg2: 'darysi', p3: 'darys', pl1: 'darysime', pl2: 'darysite' }, futA: { sg1: 'darýsiu', sg2: 'darýsi', p3: 'darỹs', pl1: 'darýsime', pl2: 'darýsite' }, pt: { uk: { m: 'робив', f: 'робила', pl: 'робили' }, ru: { m: 'делал', f: 'делала', pl: 'делали' } } },
  zinoti: { past: { sg1: 'žinojau', sg2: 'žinojai', p3: 'žinojo', pl1: 'žinojome', pl2: 'žinojote' }, pastA: { sg1: 'žinójau', sg2: 'žinójai', p3: 'žinójo', pl1: 'žinójome', pl2: 'žinójote' }, fut: { sg1: 'žinosiu', sg2: 'žinosi', p3: 'žinos', pl1: 'žinosime', pl2: 'žinosite' }, futA: { sg1: 'žinósiu', sg2: 'žinósi', p3: 'žinós', pl1: 'žinósime', pl2: 'žinósite' }, pt: { uk: { m: 'знав', f: 'знала', pl: 'знали' }, ru: { m: 'знал', f: 'знала', pl: 'знали' } } },
  matyti: { past: { sg1: 'mačiau', sg2: 'matei', p3: 'matė', pl1: 'matėme', pl2: 'matėte' }, pastA: { sg1: 'mačiaũ', sg2: 'mateĩ', p3: 'mãtė', pl1: 'mãtėme', pl2: 'mãtėte' }, fut: { sg1: 'matysiu', sg2: 'matysi', p3: 'matys', pl1: 'matysime', pl2: 'matysite' }, futA: { sg1: 'matýsiu', sg2: 'matýsi', p3: 'matýs', pl1: 'matýsime', pl2: 'matýsite' }, pt: { uk: { m: 'бачив', f: 'бачила', pl: 'бачили' }, ru: { m: 'видел', f: 'видела', pl: 'видели' } } },
  kalbeti: { past: { sg1: 'kalbėjau', sg2: 'kalbėjai', p3: 'kalbėjo', pl1: 'kalbėjome', pl2: 'kalbėjote' }, pastA: { sg1: 'kalbė́jau', sg2: 'kalbė́jai', p3: 'kalbė́jo', pl1: 'kalbė́jome', pl2: 'kalbė́jote' }, fut: { sg1: 'kalbėsiu', sg2: 'kalbėsi', p3: 'kalbės', pl1: 'kalbėsime', pl2: 'kalbėsite' }, futA: { sg1: 'kalbė́siu', sg2: 'kalbė́si', p3: 'kalbė́s', pl1: 'kalbė́sime', pl2: 'kalbė́site' }, pt: { uk: { m: 'говорив', f: 'говорила', pl: 'говорили' }, ru: { m: 'говорил', f: 'говорила', pl: 'говорили' } } },
  gyventi: { past: { sg1: 'gyvenau', sg2: 'gyvenai', p3: 'gyveno', pl1: 'gyvenome', pl2: 'gyvenote' }, pastA: { sg1: 'gyvenaũ', sg2: 'gyvenaĩ', p3: 'gyvẽno', pl1: 'gyvẽnome', pl2: 'gyvẽnote' }, fut: { sg1: 'gyvensiu', sg2: 'gyvensi', p3: 'gyvens', pl1: 'gyvensime', pl2: 'gyvensite' }, futA: { sg1: 'gyvénsiu', sg2: 'gyvénsi', p3: 'gyveñs', pl1: 'gyvénsime', pl2: 'gyvénsite' }, pt: { uk: { m: 'жив', f: 'жила', pl: 'жили' }, ru: { m: 'жил', f: 'жила', pl: 'жили' } } },
  dirbti: { past: { sg1: 'dirbau', sg2: 'dirbai', p3: 'dirbo', pl1: 'dirbome', pl2: 'dirbote' }, pastA: { sg1: 'dìrbau', sg2: 'dìrbai', p3: 'dìrbo', pl1: 'dìrbome', pl2: 'dìrbote' }, fut: { sg1: 'dirbsiu', sg2: 'dirbsi', p3: 'dirbs', pl1: 'dirbsime', pl2: 'dirbsite' }, futA: { sg1: 'dìrbsiu', sg2: 'dìrbsi', p3: 'dìrbs', pl1: 'dìrbsime', pl2: 'dìrbsite' }, pt: { uk: { m: 'працював', f: 'працювала', pl: 'працювали' }, ru: { m: 'работал', f: 'работала', pl: 'работали' } } },
  skaityti: { past: { sg1: 'skaičiau', sg2: 'skaitei', p3: 'skaitė', pl1: 'skaitėme', pl2: 'skaitėte' }, pastA: { sg1: 'skaičiaũ', sg2: 'skaiteĩ', p3: 'skaĩtė', pl1: 'skaĩtėme', pl2: 'skaĩtėte' }, fut: { sg1: 'skaitysiu', sg2: 'skaitysi', p3: 'skaitys', pl1: 'skaitysime', pl2: 'skaitysite' }, futA: { sg1: 'skaitýsiu', sg2: 'skaitýsi', p3: 'skaitýs', pl1: 'skaitýsime', pl2: 'skaitýsite' }, pt: { uk: { m: 'читав', f: 'читала', pl: 'читали' }, ru: { m: 'читал', f: 'читала', pl: 'читали' } } },
  rasyti: { past: { sg1: 'rašiau', sg2: 'rašei', p3: 'rašė', pl1: 'rašėme', pl2: 'rašėte' }, pastA: { sg1: 'rašiaũ', sg2: 'rašeĩ', p3: 'rãšė', pl1: 'rãšėme', pl2: 'rãšėte' }, fut: { sg1: 'rašysiu', sg2: 'rašysi', p3: 'rašys', pl1: 'rašysime', pl2: 'rašysite' }, futA: { sg1: 'rašýsiu', sg2: 'rašýsi', p3: 'rašỹs', pl1: 'rašýsime', pl2: 'rašýsite' }, pt: { uk: { m: 'писав', f: 'писала', pl: 'писали' }, ru: { m: 'писал', f: 'писала', pl: 'писали' } } },
  valgyti: { past: { sg1: 'valgiau', sg2: 'valgei', p3: 'valgė', pl1: 'valgėme', pl2: 'valgėte' }, pastA: { sg1: 'válgiau', sg2: 'válgei', p3: 'válgė', pl1: 'válgėme', pl2: 'válgėte' }, fut: { sg1: 'valgysiu', sg2: 'valgysi', p3: 'valgys', pl1: 'valgysime', pl2: 'valgysite' }, futA: { sg1: 'válgysiu', sg2: 'válgysi', p3: 'válgys', pl1: 'válgysime', pl2: 'válgysite' }, pt: { uk: { m: 'їв', f: 'їла', pl: 'їли' }, ru: { m: 'ел', f: 'ела', pl: 'ели' } } },
  gerti: { past: { sg1: 'gėriau', sg2: 'gėrei', p3: 'gėrė', pl1: 'gėrėme', pl2: 'gėrėte' }, pastA: { sg1: 'gė́riau', sg2: 'gė́rei', p3: 'gė́rė', pl1: 'gė́rėme', pl2: 'gė́rėte' }, fut: { sg1: 'gersiu', sg2: 'gersi', p3: 'gers', pl1: 'gersime', pl2: 'gersite' }, futA: { sg1: 'gérsiu', sg2: 'gérsi', p3: 'gérs', pl1: 'gérsime', pl2: 'gérsite' }, pt: { uk: { m: 'пив', f: 'пила', pl: 'пили' }, ru: { m: 'пил', f: 'пила', pl: 'пили' } } },
  myleti: { past: { sg1: 'mylėjau', sg2: 'mylėjai', p3: 'mylėjo', pl1: 'mylėjome', pl2: 'mylėjote' }, pastA: { sg1: 'mylė́jau', sg2: 'mylė́jai', p3: 'mylė́jo', pl1: 'mylė́jome', pl2: 'mylė́jote' }, fut: { sg1: 'mylėsiu', sg2: 'mylėsi', p3: 'mylės', pl1: 'mylėsime', pl2: 'mylėsite' }, pt: { uk: { m: 'любив', f: 'любила', pl: 'любили' }, ru: { m: 'любил', f: 'любила', pl: 'любили' } } },
  suprasti: { past: { sg1: 'supratau', sg2: 'supratai', p3: 'suprato', pl1: 'supratome', pl2: 'supratote' }, pastA: { sg1: 'suprataũ', sg2: 'suprataĩ', p3: 'suprãto', pl1: 'suprãtome', pl2: 'suprãtote' }, fut: { sg1: 'suprasiu', sg2: 'suprasi', p3: 'supras', pl1: 'suprasime', pl2: 'suprasite' }, futA: { sg1: 'supràsiu', sg2: 'supràsi', p3: 'supràs', pl1: 'supràsime', pl2: 'supràsite' }, pt: { uk: { m: 'розумів', f: 'розуміла', pl: 'розуміли' }, ru: { m: 'понимал', f: 'понимала', pl: 'понимали' } } },
  klausti: { past: { sg1: 'klausiau', sg2: 'klausei', p3: 'klausė', pl1: 'klausėme', pl2: 'klausėte' }, fut: { sg1: 'klausiu', sg2: 'klausi', p3: 'klaus', pl1: 'klausime', pl2: 'klausite' }, pt: { uk: { m: 'запитував', f: 'запитувала', pl: 'запитували' }, ru: { m: 'спрашивал', f: 'спрашивала', pl: 'спрашивали' } } },
  moketi: { past: { sg1: 'mokėjau', sg2: 'mokėjai', p3: 'mokėjo', pl1: 'mokėjome', pl2: 'mokėjote' }, pastA: { sg1: 'mokė́jau', sg2: 'mokė́jai', p3: 'mokė́jo', pl1: 'mokė́jome', pl2: 'mokė́jote' }, fut: { sg1: 'mokėsiu', sg2: 'mokėsi', p3: 'mokės', pl1: 'mokėsime', pl2: 'mokėsite' }, futA: { sg1: 'mokė́siu', sg2: 'mokė́si', p3: 'mokė́s', pl1: 'mokė́sime', pl2: 'mokė́site' }, pt: { uk: { m: 'умів', f: 'уміла', pl: 'уміли' }, ru: { m: 'умел', f: 'умела', pl: 'умели' } } },
  dainuoti: { past: { sg1: 'dainavau', sg2: 'dainavai', p3: 'dainavo', pl1: 'dainavome', pl2: 'dainavote' }, fut: { sg1: 'dainuosiu', sg2: 'dainuosi', p3: 'dainuos', pl1: 'dainuosime', pl2: 'dainuosite' }, pt: { uk: { m: 'співав', f: 'співала', pl: 'співали' }, ru: { m: 'пел', f: 'пела', pl: 'пели' } } }
};
for (const v of VERBS) Object.assign(v, _T[v.id] || {});
