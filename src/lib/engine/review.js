import { DAILY_POOL, glossOf, formsOf, typoAt } from './daily.js';
import { PICTURE_POOL, PICTURE_PHRASES } from './pictures.js';
import { shownBefore, hash } from './schedule.js';
import { DAILY_COUNT, DAILY_SYNONYMS } from '../data/dailyPhrases.js';
import { REVIEW_STEPS } from '../data/review.js';
import { fold } from '../stores/progress.js';
import { stepOf, isDue, LEARNED } from '../stores/vocab.js';

const PHRASES = new Map([...DAILY_POOL.map((p) => [p.id, p]), ...PICTURE_PHRASES]);
const UNTIL = new Map(PICTURE_POOL.flatMap((pic) => pic.phrases.map((p) => [p.id, pic.until])));

const LEXEMES = new Map();
const USES = new Map();

function usable(p, k) {
  const t = p.tokens[k];
  if (!t || t.opt) return false;
  if (p.tokens.filter((x) => x.ref === t.ref).length > 1) return false;
  return !p.tokens.some((x, j) => j !== k && fold(x.text) === fold(t.text));
}

for (const p of PHRASES.values()) {
  p.tokens.forEach((t, k) => {
    if (!LEXEMES.has(t.ref)) LEXEMES.set(t.ref, { lemma: t.lemma, lemmaA: t.lemmaA });
    if (!usable(p, k)) return;
    if (!USES.has(t.ref)) USES.set(t.ref, []);
    USES.get(t.ref).push({ phrase: p.id, k });
  });
}

export function lexemeOf(ref) {
  return LEXEMES.get(ref) || { lemma: ref.slice(ref.indexOf(':') + 1), lemmaA: null };
}

export const phraseOf = (id) => PHRASES.get(id) || null;

export function seenBefore(today) {
  const pics = shownBefore(today, PICTURE_POOL, 1);
  return new Set([
    ...shownBefore(today, DAILY_POOL, DAILY_COUNT),
    ...PICTURE_POOL.filter((pic) => pics.has(pic.id)).flatMap((pic) => pic.phrases.map((p) => p.id))
  ]);
}

function live(id, today) {
  const p = PHRASES.get(id);
  const until = p && (p.until || UNTIL.get(id));
  return !!p && (!until || until > today);
}

function ownContext(ref, entry, hinted, today) {
  const ok = (phrase, k) => live(phrase, today) && PHRASES.get(phrase).tokens[k]?.ref === ref && usable(PHRASES.get(phrase), k);
  if (entry.phrase != null && ok(entry.phrase, entry.k)) return { phrase: entry.phrase, k: entry.k };
  const h = hinted.filter((x) => x.ref === ref && ok(x.phrase, x.k)).pop();
  return h ? { phrase: h.phrase, k: h.k } : null;
}

function acceptOf(p, k) {
  const shownText = (j) => fold(p.tokens[j].text);
  const alts = (p.groups || [])
    .filter((g) => g.members.includes(k))
    .flatMap((g) => g.variants.filter((v) => g.members.every((j) => j === k || v[j] === shownText(j))).map((v) => v[k]));
  return [...new Set([...p.tokens[k].accept, ...alts])];
}

function bareAccept(lemma) {
  const group = DAILY_SYNONYMS.find((s) => s.words.includes(lemma));
  return [...new Set((group ? group.words : [lemma]).map(fold))];
}

function sameGloss(ref, lang) {
  const g = glossOf(ref);
  if (!g) return [];
  return [...LEXEMES.keys()].filter((r) => r !== ref && glossOf(r)?.[lang] === g[lang]);
}

export function dueRefs(words, today) {
  return Object.keys(words)
    .filter((ref) => isDue(words[ref], today))
    .sort((a, b) => stepOf(words[a]).due.localeCompare(stepOf(words[b]).due) || hash(a + '|' + today) - hash(b + '|' + today));
}

export function makeCard(ref, entry, { today, seen, hinted, lang }) {
  const box = Math.min(stepOf(entry).box, LEARNED - 1);
  const want = REVIEW_STEPS[box].ask;
  const own = ownContext(ref, entry, hinted, today);
  const others = (USES.get(ref) || []).filter((u) => u.phrase !== own?.phrase && seen.has(u.phrase) && live(u.phrase, today));
  const pick = () => (others.length ? others[hash(ref + '|' + today) % others.length] : null);
  const ctx = want === 'own' ? own || pick() : want === 'other' ? pick() || own : null;
  const example = ctx || own || pick();
  const lex = lexemeOf(ref);
  const card = {
    ref, box, want, lemma: lex.lemma, lemmaA: lex.lemmaA, gloss: glossOf(ref),
    ask: ctx ? 'context' : 'bare',
    phrase: example ? PHRASES.get(example.phrase) : null,
    k: example ? example.k : -1,
    accept: null,
    same: []
  };
  if (ctx) card.accept = acceptOf(card.phrase, card.k);
  else {
    card.accept = bareAccept(lex.lemma);
    card.same = sameGloss(ref, lang).filter((r) => !card.accept.includes(fold(lexemeOf(r).lemma)));
  }
  return card;
}

export function checkCard(card, input) {
  const typed = fold(input).replace(/[^\p{L}\s]/gu, ' ').trim().replace(/\s+/g, ' ');
  if (!typed) return { result: 'empty', typo: -1 };
  if (card.accept.includes(typed)) return { result: 'exact', typo: -1 };
  const near = card.accept.map((a) => typoAt(typed, a)).find((x) => x >= 0);
  if (near != null) return { result: 'near', typo: near };
  if (formsOf({ ref: card.ref }).has(typed)) return { result: 'form', typo: -1 };
  if (card.same.some((r) => formsOf({ ref: r }).has(typed))) return { result: 'syn', typo: -1 };
  return { result: 'miss', typo: -1 };
}

export const recalled = (result) => result === 'exact' || result === 'near' || result === 'form';

export function moveOf(result, hinted) {
  if (recalled(result)) return hinted ? 'stay' : 'up';
  return result === 'syn' ? 'stay' : 'down';
}
