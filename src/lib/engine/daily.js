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
import { pickForDay } from './schedule.js';

const TENSE = {
  pres: ['f', 'fA', 'conj'],
  past: ['past', 'pastA', 'conj-past'],
  fut: ['fut', 'futA', 'conj-fut'],
  imp: ['imp', 'impA', 'conj-imp'],
  cond: ['cond', 'condA', 'conj-cond'],
  habit: ['habit', 'habitA', 'conj-habit']
};
const PREP_CASE = { gen: 'K', dat: 'N', acc: 'G', ins: 'In', loc: 'Vt' };
const EXTRA_PREPS = { ant: { case: 'gen' }, po: { case: 'ins' }, šalia: { case: 'gen' }, prieš: { case: 'acc' }, tarp: { case: 'gen' }, virš: { case: 'gen' } };
const PREP_ALSO = { už: ['gen'], po: ['gen', 'acc'] };
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
    const want = [prepOf(tok.prep).case, ...(PREP_ALSO[tok.prep] || [])];
    if (!head || !want.some((c) => head.c === PREP_CASE[c])) throw new Error('daily: ' + tok.prep + ' governs ' + want.join('/') + ' in ' + p.id);
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

const EUPHONY = { uk: { у: ['в'], в: ['у'], і: ['й'], й: ['і'], з: ['із', 'зі'] }, ru: { в: ['во'], с: ['со'], к: ['ко'], о: ['об'] }, en: {} };
const nat = (s) => s.toLowerCase().normalize('NFC').replace(/[̀́]/g, '').replace(/ё/g, 'е').replace(/[’ʼ`]/g, "'");
const strings = (x) => (x == null ? [] : typeof x === 'string' ? [x] : Object.values(x).flatMap(strings));

function phrasesOf(s, L) {
  return s
    .replace(/\([^)]*\)/g, '')
    .split(/[,;/]/)
    .map((x) => nat(L === 'en' ? x.trim().replace(/^to\s+/, '') : x).trim())
    .filter(Boolean)
    .map((x) => x.split(/\s+/));
}

const PATTERNS = new Map();

function nativePatterns(ref, L) {
  const key = ref + '|' + L;
  if (PATTERNS.has(key)) return PATTERNS.get(key);
  const cut = ref.indexOf(':');
  const kind = ref.slice(0, cut);
  const id = ref.slice(cut + 1);
  const lemmas = [];
  const words = [];
  const forms = [];
  const g = glossOf(ref);
  if (g) lemmas.push(g[L]);
  if (kind === 'n') {
    const w = WORDS.find((x) => x.id === id);
    if (w) {
      lemmas.push(w[L], w[L + 'Pl']);
      forms.push(w[L + 'Forms'], w[L + 'PlForms']);
    }
  }
  if (kind === 'a') {
    const a = ADJECTIVES.find((x) => x.id === id);
    if (a) lemmas.push(a[L], a[L + 'M'], a[L + 'F'], a[L + 'N'], a[L + 'Pl']);
  }
  if (kind === 'v') {
    const v = VERBS.find((x) => (x.id || x.inf) === id);
    if (v) {
      lemmas.push(v[L]);
      words.push(v.g?.[L], v.gp?.[L]);
    }
  }
  if (kind === 'prep') lemmas.push(PREPS[id]?.[L]);
  if (kind === 'pr') forms.push(PRONOUNS.find((x) => x.id === id)?.[L]);
  if (kind === 'd') forms.push(DEM_PRONOUNS.find((x) => x.id === id)?.[L]);
  if (kind === 'num') forms.push(NUMERALS.find((x) => x.id === id)?.[L]);
  const heads = strings(lemmas).flatMap((s) => phrasesOf(s, L));
  const pats = [
    ...heads,
    ...strings(words).flatMap((s) => phrasesOf(s, L)),
    ...strings(forms).flatMap((s) => phrasesOf(s, L).map((p) => p.slice(-1)))
  ];
  for (const p of [...pats]) if (p.length === 1) for (const e of EUPHONY[L][p[0]] || []) pats.push([e]);
  const stems = new Map();
  if (STEMMED[L].includes(kind)) for (const p of heads) if (p.length === 1) for (const [x, score] of stemsOf(p[0], kind, L)) stems.set(x, Math.max(score, stems.get(x) || 0));
  const out = { exact: [...new Map(pats.map((p) => [p.join(' '), p])).values()], stems: [...stems] };
  PATTERNS.set(key, out);
  return out;
}

const STEMMED = { uk: ['n', 'a', 'v'], ru: ['n', 'a', 'v'], en: ['n', 'v'] };

const MUTATION = {
  uk: [['ст', ['щ']], ['к', ['ч', 'ц']], ['г', ['ж', 'з']], ['х', ['ш', 'с']], ['т', ['ч']], ['д', ['дж']], ['с', ['ш']], ['з', ['ж']], ['ц', ['ч']]],
  ru: [['ст', ['щ']], ['ск', ['щ']], ['к', ['ч']], ['г', ['ж']], ['х', ['ш']], ['т', ['ч', 'щ']], ['д', ['ж']], ['с', ['ш']], ['з', ['ж']], ['ц', ['ч']]]
};
const VOWEL_ALT = { uk: { і: ['о', 'е', ''], о: [''], е: [''] }, ru: { о: [''], е: [''] } };

function stemsOf(base, kind, L) {
  if (L === 'en') return base.length >= 3 ? [[base, base.length]] : [];
  const s = (kind === 'v' ? base.replace(/(ся|сь)$/, '').replace(/(ти|ть|чь)$/, '') : base).replace(/(?:[аеєиіїоуюяыэ]й|[аеєиіїоуюяыэь])$/, '');
  const alt = [];
  for (const [a, bs] of MUTATION[L]) if (s.endsWith(a)) alt.push(...bs.map((b) => s.slice(0, -a.length) + b));
  const m = s.match(/^(.*[^аеєиіїоуюяыэ])([аеєиіїоуюяыэ])([^аеєиіїоуюяыэ]+)$/);
  if (m) alt.push(...(VOWEL_ALT[L][m[2]] || []).map((v) => m[1] + v + m[3]));
  return [[s, s.length], ...alt.map((x) => [x, x.length - 0.5])].filter(([x]) => x.length >= 3);
}

function inflected(w, stem, kind, L) {
  if (L !== 'en') return w.startsWith(stem) && w.length - stem.length <= 6;
  const y = stem.endsWith('y') ? stem.slice(0, -1) : null;
  const plural = [stem + 's', stem + 'es', ...(y ? [y + 'ies'] : [])];
  if (kind === 'n') return plural.includes(w);
  const e = stem.endsWith('e') ? stem.slice(0, -1) : stem;
  const d = stem + stem.slice(-1);
  return [...plural, stem + 'd', stem + 'ed', stem + 'ing', e + 'ing', d + 'ing', d + 'ed', ...(y ? [y + 'ied'] : [])].includes(w);
}

function linkWords(phrase, L) {
  const parts = phrase[L].split(/(\s+)/);
  const chunks = [];
  for (let i = 0; i < parts.length; i += 2) {
    const [, lead, core, trail] = parts[i].match(/^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/su);
    chunks.push({ lead, core, trail, space: parts[i + 1] || '', k: null });
  }
  const words = chunks.filter((c) => c.core);
  const keys = words.map((c) => nat(c.core));
  const found = new Map();
  phrase.tokens.forEach((t, k) => {
    for (const p of nativePatterns(t.ref, L).exact) {
      for (let i = 0; i + p.length <= keys.length; i++) {
        if (!p.every((w, j) => keys[i + j] === w)) continue;
        const at = i + ':' + p.length;
        if (!found.has(at)) found.set(at, { i, n: p.length, refs: new Set() });
        found.get(at).refs.add(t.ref);
      }
    }
  });
  const covered = new Set([...found.values()].flatMap((o) => keys.slice(o.i, o.i + o.n).map((_, j) => o.i + j)));
  const linked = new Set([...found.values()].flatMap((o) => [...o.refs]));
  keys.forEach((w, i) => {
    if (covered.has(i)) return;
    let best = 0;
    let refs = new Set();
    for (const t of phrase.tokens) {
      if (linked.has(t.ref)) continue;
      for (const [s, score] of nativePatterns(t.ref, L).stems) {
        if (!inflected(w, s, t.kind, L) || score < best) continue;
        if (score > best) {
          best = score;
          refs = new Set();
        }
        refs.add(t.ref);
      }
    }
    if (refs.size) found.set(i + ':1', { i, n: 1, refs });
  });
  const owner = keys.map(() => null);
  for (const o of found.values()) if (o.n === 1) owner[o.i] = { ...o, at: [o.i] };
  for (const o of [...found.values()].filter((o) => o.n > 1).sort((a, b) => b.n - a.n)) {
    const own = { ...o, at: [] };
    for (let x = o.i; x < o.i + o.n; x++) {
      const t = owner[x];
      if (t && t.n > 1) t.bad = own.bad = true;
      if (!t || (t.n === 1 && [...t.refs].some((r) => o.refs.has(r)))) own.at.push(x);
    }
    for (const x of own.at) owner[x] = own;
  }
  const byRef = new Map();
  for (const o of new Set(owner)) {
    if (!o || o.bad || o.refs.size !== 1) continue;
    const ref = [...o.refs][0];
    if (!byRef.has(ref)) byRef.set(ref, []);
    byRef.get(ref).push(o);
  }
  for (const [ref, occ] of byRef) {
    const toks = phrase.tokens.map((t, k) => (t.ref === ref ? k : -1)).filter((k) => k >= 0);
    if (occ.length > toks.length) continue;
    occ.sort((a, b) => a.at[0] - b.at[0]).forEach((o, j) => {
      for (const x of o.at) words[x].k = toks[j];
    });
  }
  words.forEach((w, x) => {
    const t = w.k != null && phrase.tokens[w.k];
    if (!t || t.kind !== 'prep') return;
    const head = phrase.tokens.findIndex((h, j) => j > w.k && (h.kind === 'n' || h.kind === 'pr'));
    let y = x + 1;
    while (y < words.length && words[y].k === w.k) y++;
    if (!words.slice(y, y + 4).some((v) => v.k === head)) w.k = null;
  });
  return chunks;
}

const LINKS = new WeakMap();

export function sourceWords(phrase, L) {
  if (!LINKS.has(phrase)) LINKS.set(phrase, {});
  const cache = LINKS.get(phrase);
  if (!cache[L]) cache[L] = linkWords(phrase, L);
  return cache[L];
}

export function hintedWords(entries, known = {}, byId = BY_ID) {
  const seen = new Set();
  return entries.flatMap(({ ref, phrase, k }) => {
    const t = byId.get(phrase)?.tokens[k];
    if (!t || t.ref !== ref || seen.has(ref) || known[ref]) return [];
    seen.add(ref);
    return [{ ref, phrase, k, lemma: t.lemma, lemmaA: t.lemmaA, gloss: glossOf(ref) }];
  });
}

export function dailyTasks(key, pool = DAILY_POOL, count = DAILY_COUNT) {
  return pickForDay(key, pool, count);
}

const words = (s) => fold(s).replace(/[^\p{L}\s]/gu, ' ').split(/\s+/).filter(Boolean);

export const NEAR_CREDIT = 0.5;

export function typoAt(typed, target) {
  if (target.length < 4 || Math.abs(typed.length - target.length) > 1) return -1;
  let p = 0;
  while (p < typed.length && p < target.length && typed[p] === target[p]) p++;
  if (p > target.length - 3) return -1;
  const rest = typed.length === target.length ? [p + 1, p + 1] : typed.length > target.length ? [p + 1, p] : [p, p + 1];
  return typed.slice(rest[0]) === target.slice(rest[1]) ? p : -1;
}

export function checkAnswer(input, phrase, hinted = []) {
  const typed = words(input);
  if (!typed.length) return { match: false, hit: phrase.tokens.map(() => null), typo: phrase.tokens.map(() => -1), guessed: 0, rest: {} };
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
  const typo = phrase.tokens.map(() => -1);
  phrase.tokens.forEach((t, i) => {
    if (hit[i] !== false) return;
    for (const w of Object.keys(left)) {
      if (!(left[w] > 0)) continue;
      const at = t.accept.map((a) => typoAt(w, a)).find((x) => x >= 0);
      if (at === undefined) continue;
      left[w] -= 1;
      hit[i] = 'near';
      typo[i] = at;
      return;
    }
  });
  const credit = (h, i) => (phrase.tokens[i].opt || hinted.includes(i) ? 0 : h === true ? 1 : h === 'near' ? NEAR_CREDIT : 0);
  const guessed = hit.reduce((n, h, i) => n + credit(h, i), 0);
  return { match: hit.every((h) => h === true || h === null) && Object.values(left).every((n) => n === 0), hit, typo, guessed, rest: left };
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

export function formsOf(t) {
  if (!FORMS.has(t.ref)) {
    const cut = t.ref.indexOf(':');
    FORMS.set(t.ref, new Set(lexemeForms(t.ref.slice(0, cut), t.ref.slice(cut + 1)).filter(Boolean).map(fold)));
  }
  return FORMS.get(t.ref);
}

export function nextHint(input, phrase, hinted = []) {
  const { hit, rest } = checkAnswer(input, phrase);
  const known = phrase.tokens.map((t, k) => {
    if (hit[k] === true || hit[k] === 'near') return true;
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
