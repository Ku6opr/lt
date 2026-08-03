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
  V: { sg: { m: ['Koks?', 'який?', 'какой?'], f: ['Kokia?', 'яка?', 'какая?'] }, pl: { m: ['Kokie?', 'які?', 'какие?'], f: ['Kokios?', 'які?', 'какие?'] } },
  K: { sg: { m: ['Kokio?', 'якого?', 'какого?'], f: ['Kokios?', 'якої?', 'какой?'] }, pl: { m: ['Kokių?', 'яких?', 'каких?'], f: ['Kokių?', 'яких?', 'каких?'] } },
  N: { sg: { m: ['Kokiam?', 'якому?', 'какому?'], f: ['Kokiai?', 'якій?', 'какой?'] }, pl: { m: ['Kokiems?', 'яким?', 'каким?'], f: ['Kokioms?', 'яким?', 'каким?'] } },
  G: { sg: { m: ['Kokį?', 'який?', 'какой?'], f: ['Kokią?', 'яку?', 'какую?'] }, pl: { m: ['Kokius?', 'які?', 'какие?'], f: ['Kokias?', 'які?', 'какие?'] } },
  In: { sg: { m: ['Kokiu?', 'яким?', 'каким?'], f: ['Kokia?', 'якою?', 'какой?'] }, pl: { m: ['Kokiais?', 'якими?', 'какими?'], f: ['Kokiomis?', 'якими?', 'какими?'] } },
  Vt: { sg: { m: ['Kokiame?', 'у якому?', 'о каком?'], f: ['Kokioje?', 'у якій?', 'о какой?'] }, pl: { m: ['Kokiuose?', 'у яких?', 'о каких?'], f: ['Kokiose?', 'у яких?', 'о каких?'] } }
};
const Q_IDX = { uk: 1, ru: 2 };

const CASE_UK = { V: 'naz', K: 'rod', N: 'dav', G: 'znah', In: 'oru', Vt: 'misc' };
const CASE_RU = { V: 'nom', K: 'gen', N: 'dat', G: 'acc', In: 'ins', Vt: 'prep' };
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

function ukAdjForm(adj, g3, number, caseId, animate) {
  const base = adj.ukM;
  const E = UK_END[/ій$/.test(base) ? 'soft' : 'hard'];
  const stem = base.slice(0, -2);
  const uc = CASE_UK[caseId];
  if (number === 'pl') return stem + (uc === 'znah' ? (animate ? E.pl.rod : E.pl.naz) : E.pl[uc]);
  const g = g3 === 'n' ? 'n' : g3 === 'f' ? 'f' : 'm';
  const end = uc === 'znah' && g === 'm' ? (animate ? E.m.rod : E.m.naz) : E[g][uc];
  return stem + end;
}

const RU_HARD = {
  m: { nom: 'ый', gen: 'ого', dat: 'ому', ins: 'ым', prep: 'ом' },
  f: { nom: 'ая', gen: 'ой', dat: 'ой', acc: 'ую', ins: 'ой', prep: 'ой' },
  n: { nom: 'ое', gen: 'ого', dat: 'ому', ins: 'ым', prep: 'ом' },
  pl: { nom: 'ые', gen: 'ых', dat: 'ым', ins: 'ыми', prep: 'ых' }
};
const RU_SOFT = {
  m: { nom: 'ий', gen: 'его', dat: 'ему', ins: 'им', prep: 'ем' },
  f: { nom: 'яя', gen: 'ей', dat: 'ей', acc: 'юю', ins: 'ей', prep: 'ей' },
  n: { nom: 'ее', gen: 'его', dat: 'ему', ins: 'им', prep: 'ем' },
  pl: { nom: 'ие', gen: 'их', dat: 'им', ins: 'ими', prep: 'их' }
};
const RU_VELHUSH = /[кгхжшчщ]$/;

function ruAdjForm(adj, g3, number, caseId, animate) {
  const base = adj.ruM;
  let mNom, table;
  if (/ой$/.test(base)) { mNom = 'ой'; table = RU_HARD; }
  else if (/ний$/.test(base)) { mNom = 'ий'; table = RU_SOFT; }
  else if (/ий$/.test(base)) { mNom = 'ий'; table = RU_HARD; }
  else { mNom = 'ый'; table = RU_HARD; }
  const stem = base.slice(0, -2);
  const uc = CASE_RU[caseId];
  let end;
  if (number === 'pl') end = uc === 'acc' ? (animate ? table.pl.gen : table.pl.nom) : table.pl[uc];
  else {
    const g = g3 === 'n' ? 'n' : g3 === 'f' ? 'f' : 'm';
    if (uc === 'nom' && g === 'm') end = mNom;
    else if (uc === 'acc') end = g === 'm' ? (animate ? table.m.gen : mNom) : g === 'n' ? table.n.nom : table.f.acc;
    else end = table[g][uc];
  }
  if (table === RU_HARD && RU_VELHUSH.test(stem)) end = end.replace(/^ы/, 'и');
  return stem + end;
}

const PREP_RE = /^(у|в|во|на|при|по|о|об|обо)\s+/;

function splitPrep(nf) {
  const mp = nf.match(PREP_RE);
  return mp ? [mp[0], nf.slice(mp[0].length)] : ['', nf];
}

const EN_PREP = { V: '', K: 'of ', N: 'to ', G: '', In: 'with ', Vt: 'in ' };

function adjPhrase(lang, adj, noun, number, caseId) {
  if (lang === 'en') {
    const a = adj.en;
    const n = number === 'pl' ? noun.enPl || noun.en : noun.en;
    return EN_PREP[caseId] + a + ' ' + n;
  }
  const g3 = lang === 'ru' ? noun.ruG : noun.ukG;
  const key = CASE_NOUNKEY[caseId];
  let nounF, animate;
  if (number === 'pl') {
    const pf = lang === 'ru' ? noun.ruPlForms : noun.ukPlForms;
    const nomPl = lang === 'ru' ? noun.ruPl : noun.ukPl;
    animate = pf ? pf.acc === pf.gen : false;
    nounF = caseId === 'V' || !pf ? nomPl : pf[key] || nomPl;
    if (!pf && caseId !== 'V') {
      const adjPl = lang === 'ru' ? ruAdjForm(adj, g3, 'pl', caseId, animate) : adj.ukPl;
      return adjPl + ' · ' + nomPl;
    }
  } else {
    const forms = lang === 'ru' ? noun.ruForms : noun.ukForms;
    animate = forms.acc === forms.gen;
    nounF = forms[key];
  }
  const dAdj = lang === 'ru' ? ruAdjForm(adj, g3, number, caseId, animate) : ukAdjForm(adj, g3, number, caseId, animate);
  const [prep, nf] = splitPrep(nounF);
  return prep + dAdj + ' ' + nf;
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

  const lang = state.lang || 'uk';
  const transKey = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'uk';
  const tier = PHRASE_TIERS[Math.min(state.level, PHRASE_TIERS.length - 1)];
  const useTr = tier.prompt === 'uk' || (tier.prompt === 'mix' && Math.random() < 0.5);
  const q = ADJ_Q[caseId][number][gender];
  const qLt = q[0];
  const qLoc = lang === 'en' ? '' : q[Q_IDX[lang]];
  const trPhrase = adjPhrase(lang, adj, noun, number, caseId);
  const prompt = useTr ? { text: adj[transKey] } : { text: adj.m.sg[0] };

  const qStr = lang === 'en' ? '(' + qLt + ')' : '(' + qLoc + ' / ' + qLt + ')';
  let hint = null;
  if (tier.hint === 'fullq') hint = trPhrase + ' ' + qStr;
  else if (tier.hint === 'q') hint = qStr;
  const revealUk = tier.hint === 'fullq' ? null : trPhrase;

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
    stemPrefill: !useTr,
    stemPrefix: useTr ? '' : stem,
    stem,
    tail,
    targetForm: forms[ci]
  };
}
