import { WORDS } from '../data/words.js';
import { ADJECTIVES } from '../data/adjectives.js';
import { VERBS } from '../data/verbsConj.js';
import { NUMERALS } from '../data/numerals.js';
import { PRONOUNS } from '../data/pronouns.js';
import { DEM_PRONOUNS } from '../data/demPronouns.js';
import { PREPS } from '../data/prepositions.js';
import { LEX_NOUNS, LEX_ADJECTIVES, LEX_VERBS } from '../data/lexicon.js';
import { DAILY_PHRASES, DAILY_COUNT, DAILY_SYNONYMS } from '../data/dailyPhrases.js';
import { DAILY_VARIANTS } from '../data/dailyVariants.js';
import { DAILY_GLOSS } from '../data/dailyGloss.js';
import { idx } from './stem.js';
import { ltGender } from './numerals.js';
import { fold } from '../stores/progress.js';

const TENSE = {
  pres: ['f', 'fA', 'conj'],
  past: ['past', 'pastA', 'conj-past'],
  fut: ['fut', 'futA', 'conj-fut'],
  imp: ['imp', 'impA', 'conj-imp'],
  cond: ['cond', 'condA', 'conj-cond'],
  habit: ['habit', 'habitA', 'conj-habit']
};
const PREP_CASE = { gen: 'K', dat: 'N', acc: 'G', ins: 'In', loc: 'Vt' };
const EXTRA_PREPS = { ant: { case: 'gen' } };
const prepOf = (p) => PREPS[p] || EXTRA_PREPS[p];
const NOUNS = [...WORDS.map((w) => ({ ...w, gender: ltGender(w) })), ...LEX_NOUNS];
const ADJS = [...ADJECTIVES, ...LEX_ADJECTIVES];
const ALL_VERBS = [...VERBS, ...LEX_VERBS];

const accented = (a, plain) => (a && fold(a) === fold(plain) ? a : null);

function need(x, what) {
  if (x == null || x === '') throw new Error('daily: missing ' + what);
  return x;
}

function token(kind, text, textA, lemma, lemmaA, topic, extra = {}) {
  return { kind, text, textA, lemma, lemmaA, topic, c: null, num: null, t: null, opt: false, ...extra };
}

function resolveNoun(tok) {
  const w = need(NOUNS.find((x) => x.id === tok.n), 'noun ' + tok.n);
  const i = idx(tok.c);
  const text = need((tok.num === 'pl' ? w.pl : w.sg)[i], `${tok.n} ${tok.c} ${tok.num}`);
  const textA = accented((tok.num === 'pl' ? w.plA : w.sgA)?.[i], text);
  const lemma = w.sg[0] || w.pl[0];
  return token('n', text, textA, lemma, accented((w.sg[0] ? w.sgA : w.plA)?.[0], lemma), tok.c === 'V' ? null : 'vidminky', { ref: 'n:' + w.id, c: tok.c, num: tok.num, g: w.gender });
}

function agreeing(pack, id, head, what) {
  const x = need(pack.find((p) => p.id === id), what + ' ' + id);
  const text = need(x[head.g]?.[head.num]?.[idx(head.c)], `${id} ${head.g} ${head.c} ${head.num}`);
  const textA = accented(x[head.g + 'A']?.[head.num]?.[idx(head.c)], text);
  return { x, text, textA };
}

function resolveAgreeing(tok, head) {
  if (!head || head.kind !== 'n') throw new Error('daily: agreement target is not a noun');
  const extra = { c: head.c, num: head.num };
  if (tok.a) {
    const { x, text, textA } = agreeing(ADJS, tok.a, head, 'adjective');
    return token('a', text, textA, x.m.sg[0], accented(x.mA?.sg?.[0], x.m.sg[0]), head.c === 'V' ? 'adj-nom' : 'adj-cases', { ...extra, ref: 'a:' + x.id });
  }
  if (tok.d) {
    const { x, text, textA } = agreeing(DEM_PRONOUNS, tok.d, head, 'demonstrative');
    return token('d', text, textA, x.lt, accented(x.mA?.sg?.[0], x.lt), head.c === 'V' ? 'dem-nom' : 'dem-cases', { ...extra, ref: 'd:' + x.id });
  }
  const x = need(NUMERALS.find((p) => p.id === tok.q), 'numeral ' + tok.q);
  if (head.num !== (tok.q === '1' ? 'sg' : 'pl')) throw new Error('daily: numeral ' + tok.q + ' with ' + head.num + ' noun');
  const text = need(x[head.g]?.[idx(head.c)], `${tok.q} ${head.g} ${head.c}`);
  const textA = accented(x[head.g + 'A']?.[idx(head.c)], text);
  return token('num', text, textA, x.lt, accented(x.mA?.[0], x.lt), head.c === 'V' ? 'num-qty' : 'numerals', { ...extra, ref: 'num:' + x.id });
}

function resolveSimple(tok) {
  if (tok.v) {
    const v = need(ALL_VERBS.find((x) => x.id === tok.v || x.inf === tok.v), 'verb ' + tok.v);
    const ref = 'v:' + (v.id || v.inf);
    if (tok.t === 'inf') return token('v', v.inf, null, v.inf, null, null, { ref, t: 'inf' });
    const [fk, ak, topic] = need(TENSE[tok.t], 'tense ' + tok.t);
    const text = need(v[fk]?.[tok.p], `${tok.v} ${tok.t} ${tok.p}`);
    return token('v', text, accented(v[ak]?.[tok.p], text), v.inf, null, topic, { ref, t: tok.t });
  }
  if (tok.pr) {
    const p = need(PRONOUNS.find((x) => x.id === tok.pr), 'pronoun ' + tok.pr);
    const i = idx(tok.c);
    const text = need(p.lt[i], `${tok.pr} ${tok.c}`);
    return token('pr', text, accented(p.ltA?.[i], text), p.lt[0], accented(p.ltA?.[0], p.lt[0]), tok.c === 'V' ? null : 'pronouns', { ref: 'pr:' + p.id, c: tok.c });
  }
  if (tok.prep) {
    need(prepOf(tok.prep), 'preposition ' + tok.prep);
    return token('prep', tok.prep, null, tok.prep, null, null, { ref: 'prep:' + tok.prep });
  }
  return token('w', need(tok.w, 'word'), null, tok.w, null, null, { ref: 'w:' + tok.w });
}

function withSynonyms(lt) {
  return lt.map((tok) => {
    if (!tok.n) return tok;
    const syn = DAILY_SYNONYMS.filter((s) => s.words.includes(tok.n) && (!s.num || s.num === tok.num)).flatMap((s) => s.words).filter((w) => w !== tok.n);
    const have = new Set((tok.alt || []).map((a) => a.n));
    const add = syn.filter((w) => !have.has(w)).map((w) => ({ n: w }));
    return add.length ? { ...tok, alt: [...(tok.alt || []), ...add] } : tok;
  });
}

export function buildPhrase(src) {
  const p = { ...src, lt: withSynonyms(src.lt) };
  const tokens = p.lt.map((tok) => (tok.n ? resolveNoun(tok) : null));
  p.lt.forEach((tok, i) => {
    if (tokens[i]) return;
    tokens[i] = tok.to != null ? resolveAgreeing(tok, tokens[tok.to]) : resolveSimple(tok);
  });
  p.lt.forEach((tok, i) => {
    if (tok.opt) tokens[i].opt = true;
    tokens[i].after = tok.after || '';
    tokens[i].accept = [tokens[i].text];
  });
  const groups = [];
  const subj = p.lt.findIndex((t) => t.pr && t.c === 'V' && t.alt && t.alt.length === 1 && t.alt[0].pr);
  const verb = p.lt.findIndex((t) => t.v && t.alt && t.alt.length === 1 && t.alt[0].p && Object.keys(t.alt[0]).length === 1);
  const linked = subj >= 0 && verb >= 0 ? [subj, verb] : [];
  if (linked.length) {
    const alt = (k) => fold(resolveSimple({ ...p.lt[k], ...p.lt[k].alt[0], alt: undefined }).text);
    groups.push({ members: linked, variants: [{ [subj]: fold(tokens[subj].text), [verb]: fold(tokens[verb].text) }, { [subj]: alt(subj), [verb]: alt(verb) }] });
  }
  p.lt.forEach((tok, i) => {
    if (!tok.alt || linked.includes(i)) return;
    if (!tok.n) {
      for (const alt of tok.alt) {
        const v = { ...tok, ...alt, alt: undefined };
        tokens[i].accept.push((v.to != null ? resolveAgreeing(v, tokens[v.to]) : resolveSimple(v)).text);
      }
      return;
    }
    const deps = p.lt.map((d, j) => (d.to === i ? j : -1)).filter((j) => j >= 0);
    const variant = (head, texts) => Object.fromEntries([[i, fold(head.text)], ...deps.map((j) => [j, fold(texts ? texts(j, head) : tokens[j].text)])]);
    const variants = [variant(tokens[i])];
    for (const alt of tok.alt) {
      const head = resolveNoun({ ...tok, ...alt, alt: undefined });
      variants.push(variant(head, (j, h) => resolveAgreeing(p.lt[j], h).text));
    }
    groups.push({ members: [i, ...deps], variants });
  });
  for (const t of tokens) t.accept = [...new Set(t.accept.map(fold))];
  p.lt.forEach((tok, i) => {
    if (!tok.prep) return;
    const head = tokens.slice(i + 1).find((t) => t.kind === 'n' || t.kind === 'pr');
    const want = prepOf(tok.prep).case;
    if (!head || head.c !== PREP_CASE[want]) throw new Error('daily: ' + tok.prep + ' governs ' + want + ' in ' + p.id);
  });
  const lt = tokens.map((t) => t.text + t.after).join(' ');
  return {
    id: p.id,
    uk: p.uk,
    ru: p.ru,
    en: p.en,
    end: p.end || '.',
    group: p.group || p.id,
    since: p.since || null,
    until: p.until || null,
    tokens,
    groups,
    size: tokens.filter((t) => !t.opt).length,
    lt: lt.charAt(0).toUpperCase() + lt.slice(1) + (p.end || '.')
  };
}

export const DAILY_POOL = [...DAILY_PHRASES, ...DAILY_VARIANTS].flatMap((p) => {
  try {
    return [buildPhrase(p)];
  } catch (e) {
    console.error(p.id + ': ' + e.message);
    return [];
  }
});

const POS = { n: 'noun', a: 'adj', v: 'verb', pr: 'pron', d: 'pron', num: 'num', prep: 'prep' };

function packGloss(kind, id) {
  if (kind === 'n') return WORDS.find((x) => x.id === id);
  if (kind === 'a') return ADJECTIVES.find((x) => x.id === id);
  if (kind === 'v') return VERBS.find((x) => x.id === id);
  if (kind === 'prep') return PREPS[id];
  if (kind === 'pr') {
    const p = PRONOUNS.find((x) => x.id === id);
    return p && { uk: p.uk[0], ru: p.ru[0], en: p.en[0] };
  }
  if (kind === 'd') {
    const d = DEM_PRONOUNS.find((x) => x.id === id);
    return d && { uk: d.uk.m.sg[0], ru: d.ru.m.sg[0], en: d.en };
  }
  if (kind === 'num') {
    const q = NUMERALS.find((x) => x.id === id);
    return q && { uk: q.uk.m[0], ru: q.ru.m[0], en: q.en };
  }
  return null;
}

export function glossOf(ref) {
  const cut = ref.indexOf(':');
  const kind = ref.slice(0, cut);
  const own = DAILY_GLOSS[ref];
  if (own) return { uk: own[0], ru: own[1], en: own[2], pos: own[3] || POS[kind] };
  const g = packGloss(kind, ref.slice(cut + 1));
  return g && g.uk && g.ru && g.en ? { uk: g.uk, ru: g.ru, en: g.en, pos: POS[kind] } : null;
}

for (const ref of new Set(DAILY_POOL.flatMap((p) => p.tokens.map((t) => t.ref)))) {
  if (!glossOf(ref)) console.error('daily: no gloss for ' + ref);
}

const BY_ID = new Map(DAILY_POOL.map((p) => [p.id, p]));

export function hintedWords(entries, known = {}) {
  const seen = new Set();
  return entries.flatMap(({ ref, phrase, k }) => {
    const t = BY_ID.get(phrase)?.tokens[k];
    if (!t || t.ref !== ref || seen.has(ref) || known[ref]) return [];
    seen.add(ref);
    return [{ ref, lemma: t.lemma, lemmaA: t.lemmaA, gloss: glossOf(ref) }];
  });
}

function hash(s) {
  let h = 2166136261;
  for (const ch of s) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const DAY0 = '2026-09-26';

function dayNum(key) {
  const [y, m, d] = key.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

export function dailyTasks(key, pool = DAILY_POOL, count = DAILY_COUNT) {
  const first = dayNum(DAY0);
  const today = Math.max(first, dayNum(key));
  const shown = new Map();
  let picked = [];
  for (let d = first; d <= today; d++) {
    const ranked = pool
      .filter((p) => (!p.since || dayNum(p.since) <= d) && (!p.until || dayNum(p.until) > d))
      .map((p) => ({ p, last: shown.has(p.id) ? shown.get(p.id) : -1, tie: hash(p.id + '|' + d) }))
      .sort((a, b) => a.last - b.last || a.tie - b.tie);
    const groups = new Set();
    const spread = [];
    const rest = [];
    for (const x of ranked) {
      if (groups.has(x.p.group)) rest.push(x);
      else {
        groups.add(x.p.group);
        spread.push(x);
      }
    }
    picked = spread.concat(rest).slice(0, count).map((x) => x.p);
    for (const p of picked) shown.set(p.id, d);
  }
  return picked;
}

const words = (s) => fold(s).replace(/[^\p{L}\s]/gu, ' ').split(/\s+/).filter(Boolean);

export function checkAnswer(input, phrase, hinted = []) {
  const typed = words(input);
  if (!typed.length) return { match: false, hit: phrase.tokens.map(() => null), guessed: 0, rest: {} };
  const left = {};
  for (const w of typed) left[w] = (left[w] || 0) + 1;
  const hit = phrase.tokens.map(() => undefined);
  for (const g of phrase.groups) {
    const score = (v) => {
      const tmp = { ...left };
      return g.members.filter((m) => tmp[v[m]] > 0 && tmp[v[m]]--).length;
    };
    const best = g.variants.reduce((b, v) => (score(v) > score(b) ? v : b), g.variants[0]);
    for (const m of g.members) {
      if (left[best[m]] > 0) {
        left[best[m]] -= 1;
        hit[m] = true;
      } else hit[m] = phrase.tokens[m].opt ? null : false;
    }
  }
  phrase.tokens.forEach((t, i) => {
    if (hit[i] !== undefined) return;
    const k = t.accept.find((a) => left[a]);
    if (!k) {
      hit[i] = t.opt ? null : false;
      return;
    }
    left[k] -= 1;
    hit[i] = true;
  });
  const guessed = hit.filter((h, i) => h === true && !phrase.tokens[i].opt && !hinted.includes(i)).length;
  return { match: hit.every((h) => h !== false) && Object.values(left).every((n) => n === 0), hit, guessed, rest: left };
}

const byGender = (x) => ['m', 'f'].flatMap((g) => ['sg', 'pl'].flatMap((n) => x?.[g]?.[n] || []));

function lexemeForms(kind, id) {
  if (kind === 'n') {
    const w = NOUNS.find((x) => x.id === id);
    return w ? [...w.sg, ...w.pl] : [];
  }
  if (kind === 'a') return byGender(ADJS.find((x) => x.id === id));
  if (kind === 'd') return byGender(DEM_PRONOUNS.find((x) => x.id === id));
  if (kind === 'num') {
    const q = NUMERALS.find((x) => x.id === id);
    return q ? [...q.m, ...q.f] : [];
  }
  if (kind === 'pr') return PRONOUNS.find((x) => x.id === id)?.lt || [];
  if (kind === 'v') {
    const v = ALL_VERBS.find((x) => (x.id || x.inf) === id);
    return v ? [v.inf, ...Object.values(TENSE).flatMap(([fk]) => Object.values(v[fk] || {}))] : [];
  }
  return [];
}

const FORMS = new Map();

function formsOf(t) {
  if (!FORMS.has(t.ref)) {
    const cut = t.ref.indexOf(':');
    FORMS.set(t.ref, new Set(lexemeForms(t.ref.slice(0, cut), t.ref.slice(cut + 1)).filter(Boolean).map(fold)));
  }
  return FORMS.get(t.ref);
}

export function nextHint(input, phrase, hinted = []) {
  const { hit, rest } = checkAnswer(input, phrase);
  const known = phrase.tokens.map((t, k) => {
    if (hit[k] === true) return true;
    const forms = formsOf(t);
    const w = Object.keys(rest).find((x) => rest[x] > 0 && (forms.has(x) || t.accept.includes(x)));
    if (!w) return false;
    rest[w] -= 1;
    return true;
  });
  let extra = Object.values(rest).reduce((n, c) => n + c, 0);
  phrase.tokens.forEach((t, k) => {
    if (known[k] || t.opt || extra <= 0) return;
    known[k] = true;
    extra -= 1;
  });
  return phrase.tokens.findIndex((t, k) => !t.opt && !known[k] && !hinted.includes(k));
}
