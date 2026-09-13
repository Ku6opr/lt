const ALL_PREPS = ['prie', 'iš', 'nuo', 'iki', 'be', 'dėl', 'į', 'per', 'pro', 'apie', 'pas', 'už', 'su'];

// Перекладена ЦІЛА фраза-значення («він питає», «з кроликом») показується ЗАВЖДИ — без неї
// незрозуміло, яке речення взагалі складати (виявлено на практиці — issue #18/#19/#16 і скарги
// на прикметники/займенники з тим самим форматом). Тому `hint` тут — лише про ДОДАТКОВИЙ
// маркер відмінка/питання (kur? / ką? тощо) поверх завжди показаної фрази: true — показати,
// false — ні. Було 6 рівнів із трискладовим hint (fullq/q/none) — рівні 1 і 2 всередині
// lt-групи відрізнялись ЛИШЕ наявністю фрази; тепер, коли фраза завжди є, вони б стали
// дублікатами, тому група лишилась із 2 (з маркером / без), як і uk-група.
export const PHRASE_TIERS = [
  { prompt: 'lt', hint: true },
  { prompt: 'lt', hint: false },
  { prompt: 'uk', hint: true },
  { prompt: 'uk', hint: false },
  { prompt: 'mix', hint: false }
];

export const LEVELS = [
  { word: 'fixed', prompt: 'lt-nom', question: true, preps: [], verbs: false },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: [], verbs: false },
  { word: 'pool', prompt: 'lt-nom', question: true, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'lt-nom', question: false, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'lt-tonom', question: true, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'lt-othercase', question: true, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'mix-otheruk', question: false, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'uk', question: false, preps: ALL_PREPS, verbs: true },
  { word: 'pool', prompt: 'uk', question: false, preps: ALL_PREPS, verbs: true, ukDrivers: true },
  { word: 'pool', prompt: 'mix-all', question: false, preps: ALL_PREPS, verbs: true, ukDrivers: true }
];
