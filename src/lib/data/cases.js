export const ORDER = ['V', 'K', 'N', 'G', 'In', 'Vt'];

export const CASES = [
  { id: 'V', abbr: 'V.', q: 'kas?', qUk: 'хто/що?', qRu: 'кто/что?', qEn: 'who/what?', name: 'Називний', preps: [] },
  { id: 'K', abbr: 'K.', q: 'ko?', qUk: 'кого/чого?', qRu: 'кого/чего?', qEn: 'of what?', name: 'Родовий', preps: ['iš', 'nuo', 'iki', 'prie', 'be', 'dėl'] },
  { id: 'N', abbr: 'N.', q: 'kam?', qUk: 'кому/чому?', qRu: 'кому/чему?', qEn: 'to whom?', name: 'Давальний', preps: [] },
  { id: 'G', abbr: 'G.', q: 'ką?', qUk: 'кого/що?', qRu: 'кого/что?', qEn: 'whom/what?', name: 'Знахідний', preps: ['į', 'per', 'pro', 'apie', 'pas', 'už'] },
  { id: 'In', abbr: 'Įn.', q: 'kuo?', qUk: 'ким/чим?', qRu: 'кем/чем?', qEn: 'with what?', name: 'Орудний', preps: ['su'] },
  { id: 'Vt', abbr: 'Vt.', q: 'kur?', qUk: 'де?', qRu: 'где?', qEn: 'where?', name: 'Місцевий', preps: [] }
];
