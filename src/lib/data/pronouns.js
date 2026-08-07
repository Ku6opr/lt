// Особові займенники. Порядок відмінків: V, K, N, G, In, Vt (nom, gen, dat, acc, ins, loc).
export const PRONOUNS = [
  { id: 'as', num: 'sg',
    lt: ['aš', 'manęs', 'man', 'mane', 'manimi', 'manyje'],
    uk: ['я', 'мене', 'мені', 'мене', 'мною', 'на мені'],
    ru: ['я', 'меня', 'мне', 'меня', 'мной', 'обо мне'],
    en: ['I', 'of me', 'to me', 'me', 'with me', 'about me'] },
  { id: 'tu', num: 'sg',
    lt: ['tu', 'tavęs', 'tau', 'tave', 'tavimi', 'tavyje'],
    uk: ['ти', 'тебе', 'тобі', 'тебе', 'тобою', 'на тобі'],
    ru: ['ты', 'тебя', 'тебе', 'тебя', 'тобой', 'о тебе'],
    en: ['you', 'of you', 'to you', 'you', 'with you', 'about you'] },
  { id: 'jis', num: 'sg',
    lt: ['jis', 'jo', 'jam', 'jį', 'juo', 'jame'],
    uk: ['він', 'його', 'йому', 'його', 'ним', 'на ньому'],
    ukP: ['він', 'нього', 'ньому', 'нього', 'ним', 'ньому'],
    ru: ['он', 'его', 'ему', 'его', 'им', 'о нём'],
    ruP: ['он', 'него', 'нему', 'него', 'ним', 'нём'],
    en: ['he', 'of him', 'to him', 'him', 'with him', 'about him'] },
  { id: 'ji', num: 'sg',
    lt: ['ji', 'jos', 'jai', 'ją', 'ja', 'joje'],
    uk: ['вона', 'її', 'їй', 'її', 'нею', 'на ній'],
    ukP: ['вона', 'неї', 'ній', 'неї', 'нею', 'ній'],
    ru: ['она', 'её', 'ей', 'её', 'ей', 'о ней'],
    ruP: ['она', 'неё', 'ней', 'неё', 'ней', 'ней'],
    en: ['she', 'of her', 'to her', 'her', 'with her', 'about her'] },
  { id: 'mes', num: 'pl',
    lt: ['mes', 'mūsų', 'mums', 'mus', 'mumis', 'mumyse'],
    uk: ['ми', 'нас', 'нам', 'нас', 'нами', 'на нас'],
    ru: ['мы', 'нас', 'нам', 'нас', 'нами', 'о нас'],
    en: ['we', 'of us', 'to us', 'us', 'with us', 'about us'] },
  { id: 'jus', num: 'pl',
    lt: ['jūs', 'jūsų', 'jums', 'jus', 'jumis', 'jumyse'],
    uk: ['ви', 'вас', 'вам', 'вас', 'вами', 'на вас'],
    ru: ['вы', 'вас', 'вам', 'вас', 'вами', 'о вас'],
    en: ['you', 'of you', 'to you', 'you', 'with you', 'about you'] },
  { id: 'jie', num: 'pl',
    lt: ['jie', 'jų', 'jiems', 'juos', 'jais', 'juose'],
    uk: ['вони', 'їх', 'їм', 'їх', 'ними', 'на них'],
    ukP: ['вони', 'них', 'ним', 'них', 'ними', 'них'],
    ru: ['они', 'их', 'им', 'их', 'ими', 'о них'],
    ruP: ['они', 'них', 'ним', 'них', 'ними', 'них'],
    en: ['they', 'of them', 'to them', 'them', 'with them', 'about them'] },
  { id: 'jos', num: 'pl',
    lt: ['jos', 'jų', 'joms', 'jas', 'jomis', 'jose'],
    uk: ['вони', 'їх', 'їм', 'їх', 'ними', 'на них'],
    ukP: ['вони', 'них', 'ним', 'них', 'ними', 'них'],
    ru: ['они', 'их', 'им', 'их', 'ими', 'о них'],
    ruP: ['они', 'них', 'ним', 'них', 'ними', 'них'],
    en: ['they', 'of them', 'to them', 'them', 'with them', 'about them'] }
];

// англ. об'єктна форма (для контексту з драйвером: with me, without me…)
export const EN_OBJ = { as: 'me', tu: 'you', jis: 'him', ji: 'her', mes: 'us', jus: 'you', jie: 'them', jos: 'them' };

// контекст-слова за відмінком: {lt, pos (де стоїть відносно займенника), tpl глоса з {p}}
// pos 'pre' → лит. слово перед займенником (be manęs); 'post' → після (man patinka)
export const PRON_DRIVERS = {
  K: [
    { lt: 'be', pos: 'pre', tpl: { uk: 'без {p}', ru: 'без {p}', en: 'without {p}' } },
    { lt: 'iš', pos: 'pre', tpl: { uk: 'від {p}', ru: 'от {p}', en: 'from {p}' } }
  ],
  N: [
    { lt: 'patinka', pos: 'post', tpl: { uk: '{p} подобається', ru: '{p} нравится', en: 'likes {p}' } },
    { lt: 'reikia', pos: 'post', tpl: { uk: '{p} потрібно', ru: '{p} нужно', en: 'needs {p}' } }
  ],
  G: [
    { lt: 'per', pos: 'pre', tpl: { uk: 'через {p}', ru: 'через {p}', en: 'through {p}' } }
  ],
  In: [
    { lt: 'su', pos: 'pre', tpl: { uk: 'з {p}', ru: 'с {p}', en: 'with {p}' } }
  ]
};


const _A = {"as":["àš","manę̃s","mán","manè","manimì","manyjè"],"tu":["tù","tavę̃s","táu","tavè","tavimì","tavyjè"],"jis":["jìs","jõ","jám","jį̃","juõ","jamè"],"ji":["jì","jõs","jái","ją̃","jà","jojè"],"mes":["mẽs","mū́sų","mùms","mùs","mumìs","mumysè"],"jus":["jū̃s","jū́sų","jùms","jùs","jumìs","jumysè"],"jie":["jiẽ","jų̃","jíems","juõs","jaĩs","juosè"],"jos":["jõs","jų̃","jóms","jàs","jomìs","josè"]};
for (const p of PRONOUNS) p.ltA = _A[p.id];
