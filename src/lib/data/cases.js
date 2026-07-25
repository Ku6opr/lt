export const ORDER = ['V', 'K', 'N', 'G', 'In', 'Vt'];

export const CASES = [
  { id: 'V', abbr: 'V.', q: 'kas?', qUk: 'хто/що?', name: 'Називний', preps: [] },
  { id: 'K', abbr: 'K.', q: 'ko?', qUk: 'кого/чого?', name: 'Родовий', preps: ['iš', 'nuo', 'iki', 'prie', 'be', 'dėl'] },
  { id: 'N', abbr: 'N.', q: 'kam?', qUk: 'кому/чому?', name: 'Давальний', preps: [] },
  { id: 'G', abbr: 'G.', q: 'ką?', qUk: 'кого/що?', name: 'Знахідний', preps: ['į', 'per', 'pro', 'apie', 'pas', 'už'] },
  { id: 'In', abbr: 'Įn.', q: 'kuo?', qUk: 'ким/чим?', name: 'Орудний', preps: ['su'] },
  { id: 'Vt', abbr: 'Vt.', q: 'kur?', qUk: 'де?', name: 'Місцевий', preps: [] }
];
