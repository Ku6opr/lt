import { WORDS } from '../data/words.js';
import { ADJECTIVES } from '../data/adjectives.js';
import { DECLENSIONS } from '../data/declensions.js';
import { PHRASE_TIERS } from '../data/levels.js';
import { ADJ_PHRASES } from '../data/adjPhrases.js';
import { idx, boundedPrefix } from './stem.js';

const GENDER = {};
for (const d of DECLENSIONS) GENDER[d.id] = d.gender;
const NOUN = {};
for (const w of WORDS) NOUN[w.id] = w;
const ADJ = {};
for (const a of ADJECTIVES) ADJ[a.id] = a;

const ALL_PAIRS = [];
{
  const seen = new Set();
  for (const arr of Object.values(ADJ_PHRASES)) {
    for (const p of arr) {
      const k = p.a + '|' + p.n;
      if (ADJ[p.a] && NOUN[p.n] && !seen.has(k)) { seen.add(k); ALL_PAIRS.push(p); }
    }
  }
}

const ORDER = ['V', 'K', 'N', 'G', 'In', 'Vt'];
const ADJ_Q = {
  V: { sg: { m: ['Koks?', 'який?'], f: ['Kokia?', 'яка?'] }, pl: { m: ['Kokie?', 'які?'], f: ['Kokios?', 'які?'] } },
  K: { sg: { m: ['Kokio?', 'якого?'], f: ['Kokios?', 'якої?'] }, pl: { m: ['Kokių?', 'яких?'], f: ['Kokių?', 'яких?'] } },
  N: { sg: { m: ['Kokiam?', 'якому?'], f: ['Kokiai?', 'якій?'] }, pl: { m: ['Kokiems?', 'яким?'], f: ['Kokioms?', 'яким?'] } },
  G: { sg: { m: ['Kokį?', 'який?'], f: ['Kokią?', 'яку?'] }, pl: { m: ['Kokius?', 'які?'], f: ['Kokias?', 'які?'] } },
  In: { sg: { m: ['Kokiu?', 'яким?'], f: ['Kokia?', 'якою?'] }, pl: { m: ['Kokiais?', 'якими?'], f: ['Kokiomis?', 'якими?'] } },
  Vt: { sg: { m: ['Kokiame?', 'у якому?'], f: ['Kokioje?', 'у якій?'] }, pl: { m: ['Kokiuose?', 'у яких?'], f: ['Kokiose?', 'у яких?'] } }
};

const CASE_UK = { V: 'naz', K: 'rod', N: 'dav', G: 'znah', In: 'oru', Vt: 'misc' };
const CASE_NOUNKEY = { V: 'nom', K: 'gen', N: 'dat', G: 'acc', In: 'ins', Vt: 'loc' };
const UK_END = {
  hard: {
    m: { naz: 'ий', rod: 'ого', dav: 'ому', oru: 'им', misc: 'ому' },
    f: { naz: 'а', rod: 'ої', dav: 'ій', znah: 'у', oru: 'ою', misc: 'ій' },
    n: { naz: 'е', rod: 'ого', dav: 'ому', znah: 'е', oru: 'им', misc: 'ому' },
    pl: { naz: 'і', rod: 'их', dav: 'им', oru: 'ими', misc: 'их' }
  },
  soft: {
    m: { naz: 'ій', rod: 'ього', dav: 'ьому', oru: 'ім', misc: 'ьому' },
    f: { naz: 'я', rod: 'ьої', dav: 'ій', znah: 'ю', oru: 'ьою', misc: 'ій' },
    n: { naz: 'є', rod: 'ього', dav: 'ьому', znah: 'є', oru: 'ім', misc: 'ьому' },
    pl: { naz: 'і', rod: 'іх', dav: 'ім', oru: 'іми', misc: 'іх' }
  }
};

function ukAdjForm(adj, ukG, number, caseId, animate) {
  const base = adj.ukM;
  const E = UK_END[/ій$/.test(base) ? 'soft' : 'hard'];
  const stem = base.slice(0, -2);
  const uc = CASE_UK[caseId];
  if (number === 'pl') {
    const end = uc === 'znah' ? (animate ? E.pl.rod : E.pl.naz) : E.pl[uc];
    return stem + end;
  }
  const g = ukG === 'n' ? 'n' : ukG === 'f' ? 'f' : 'm';
  let end;
  if (uc === 'znah' && g === 'm') end = animate ? E.m.rod : E.m.naz;
  else end = E[g][uc];
  return stem + end;
}

function ukAdjPhrase(adj, noun, number, caseId) {
  if (number === 'pl') {
    if (caseId === 'V') return adj.ukPl + ' ' + noun.ukPl;
    return adj.ukPl + ' · ' + noun.ukPl;
  }
  const animate = noun.ukForms.acc === noun.ukForms.gen;
  const ukAdj = ukAdjForm(adj, noun.ukG, 'sg', caseId, animate);
  let nf = noun.ukForms[CASE_NOUNKEY[caseId]];
  const mp = nf.match(/^(у|в|на|при|по|о|об)\s+/);
  const prep = mp ? mp[0] : '';
  if (mp) nf = nf.slice(mp[0].length);
  return prep + ukAdj + ' ' + nf;
}

function rnd(a) {
  return a[Math.floor(Math.random() * a.length)];
}

function poolFor(state) {
  if (state.theme && state.theme !== 'all' && ADJ_PHRASES[state.theme]) return ADJ_PHRASES[state.theme];
  let pool = ALL_PAIRS.filter((p) => {
    const a = ADJ[p.a], n = NOUN[p.n];
    if (!state.types[a.type]) return false;
    if (state.gender !== 'both' && state.gender !== GENDER[n.type]) return false;
    return true;
  });
  if (!pool.length) pool = ALL_PAIRS;
  return pool;
}

export function adjPoolOk(state) {
  const themed = state.theme && state.theme !== 'all';
  const scope = state.caseScope || ORDER;
  const cs = themed || scope.some((c) => state.cases[c]);
  return cs && poolFor(state).length > 0;
}

export function newAdjTask(state, prev) {
  const themed = state.theme && state.theme !== 'all';
  const scope = state.caseScope || ORDER;
  const pool = poolFor(state);
  if (!pool.length) return null;

  const wants = ['sg', 'pl'].filter((nn) => state.numbers[nn]);
  const supports = (n, nn) => (nn === 'sg' ? n.num !== 'pl' : n.num !== 'sg' && n.pl && n.pl.length === 6);
  let feas = pool.filter((p) => { const n = NOUN[p.n]; return wants.some((nn) => supports(n, nn)); });
  if (!feas.length) feas = pool;

  let pick = feas;
  if (prev && prev.wordId && feas.length > 1) { const a = feas.filter((x) => x.a !== prev.wordId); if (a.length) pick = a; }
  const pair = rnd(pick);
  const adj = ADJ[pair.a];
  const noun = NOUN[pair.n];
  if (!adj || !noun) return null;
  const gender = GENDER[noun.type];
  const nums = wants.filter((nn) => supports(noun, nn));
  const number = nums.length ? rnd(nums) : (supports(noun, 'sg') ? 'sg' : 'pl');

  let cpool = themed ? scope.slice() : scope.filter((c) => state.cases[c]);
  if (!cpool.length) cpool = scope.slice();
  if (prev && prev.caseId && cpool.length > 1) { const a = cpool.filter((c) => c !== prev.caseId); if (a.length) cpool = a; }
  const caseId = rnd(cpool);

  const ci = idx(caseId);
  const forms = adj[gender][number];
  const stem = boundedPrefix(forms);
  const tail = forms[ci].slice(stem.length);
  const nounForm = noun[number][ci];

  const tier = PHRASE_TIERS[Math.min(state.level, PHRASE_TIERS.length - 1)];
  const useUk = tier.prompt === 'uk' || (tier.prompt === 'mix' && Math.random() < 0.5);
  const [qLt, qUk] = ADJ_Q[caseId][number][gender];
  const ukPhrase = ukAdjPhrase(adj, noun, number, caseId);
  const prompt = useUk ? { text: adj.uk } : { text: adj.m.sg[0] };

  const qStr = '(' + qUk + ' / ' + qLt + ')';
  let hint = null;
  if (tier.hint === 'fullq') hint = ukPhrase + ' ' + qStr;
  else if (tier.hint === 'q') hint = qStr;
  const revealUk = tier.hint === 'fullq' ? null : ukPhrase;

  return {
    caseId,
    adjType: adj.type,
    wordId: adj.id,
    nounId: noun.id,
    theme: themed ? state.theme : 'all',
    number,
    gender,
    prompt,
    promptNote: null,
    hasNote: false,
    wordUk: null,
    hasLead: false,
    lead: null,
    trail: nounForm,
    hint,
    revealUk,
    stemPrefill: !useUk,
    stemPrefix: useUk ? '' : stem,
    stem,
    tail,
    targetForm: forms[ci]
  };
}
