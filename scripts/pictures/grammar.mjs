import { VALENCY, QUANTIFIERS, TIME_NOUNS, PURPOSE_DATIVE } from '../../src/lib/data/valency.js';

const PERSON = { as: 'sg1', tu: 'sg2', mes: 'pl1', jus: 'pl2' };
const MODS = new Set(['a', 'd', 'num']);
const POSSESSIVE = new Set(['mano', 'savo']);
const CONJ = new Set(['ir', 'bei', 'arba', 'ar']);

export function grammarIssues(src, ph) {
  const S = src.lt;
  const T = ph.tokens;
  const errors = [];
  const warnings = [];
  const word = (i) => T[i].text;
  const isMod = (i) => MODS.has(T[i].kind) || (S[i].w && POSSESSIVE.has(S[i].w));
  const nextHead = (i) => {
    let j = i;
    while (j < S.length && isMod(j)) j++;
    return j;
  };
  const possessivePr = (i) => S[i].pr && T[i].c === 'K' && T[nextHead(i + 1)]?.kind === 'n';

  const verbs = S.map((t, i) => (t.v ? i : -1)).filter((i) => i >= 0);
  const finite = verbs.filter((i) => S[i].t !== 'inf');
  const verbless = !finite.length;
  if (verbless) warnings.push('no finite verb (ellipsis) — fine only if natural');

  const lic = new Set();
  const slots = { G: 0, N: 0 };
  let infOk = false;
  for (const i of verbs) {
    const val = VALENCY[S[i].v];
    if (val == null) {
      errors.push(`verb ${S[i].v}: no entry in data/valency.js`);
      continue;
    }
    for (const c of val.split(' ').filter(Boolean)) {
      if (c === 'inf') {
        if (S[i].t !== 'inf') infOk = true;
      } else {
        lic.add(c);
        if (c in slots) slots[c]++;
      }
    }
  }
  for (const i of verbs) if (S[i].t === 'inf' && !infOk) errors.push(`infinitive ${word(i)}: no verb in the sentence takes an infinitive`);

  const subj = S.map((t, i) => (t.pr && T[i].c === 'V' ? PERSON[t.pr] || 'p3' : t.n && T[i].c === 'V' ? 'p3' : null)).filter(Boolean);
  if (subj.length)
    for (const i of finite) {
      if (S[i].t === 'imp') continue;
      if (!subj.includes(S[i].p)) errors.push(`verb ${word(i)} (${S[i].p}) does not agree with the subject (${[...new Set(subj)].join('/')})`);
    }

  const governed = new Set();
  S.forEach((t, i) => {
    if (!t.prep) return;
    let j = nextHead(i + 1);
    if (j < S.length && possessivePr(j)) j = nextHead(j + 1);
    if (j >= S.length || !(T[j].kind === 'n' || T[j].kind === 'pr')) {
      errors.push(`preposition ${t.prep}: its noun must follow it (only adjectives/numerals/possessives between)`);
      return;
    }
    governed.add(j);
    while (S[j + 1] && S[j + 1].w && CONJ.has(S[j + 1].w)) {
      const k = nextHead(j + 2);
      if (k >= S.length || !(T[k].kind === 'n' || T[k].kind === 'pr') || T[k].c !== T[j].c) break;
      governed.add(k);
      j = k;
    }
  });

  S.forEach((t, i) => {
    if (t.to == null) return;
    const j = t.to;
    if (j > i) {
      for (let k = i + 1; k < j; k++) {
        const coordMod = S[k].w && CONJ.has(S[k].w) && isMod(k - 1) && isMod(k + 1);
        if (!isMod(k) && !possessivePr(k) && !coordMod) errors.push(`${word(i)} is separated from its noun ${word(j)} by ${word(k)}`);
      }
      return;
    }
    if (T[i].kind !== 'a') errors.push(`${word(i)} must stand before its noun ${word(j)}`);
    else if (T[j].c !== 'V') errors.push(`${word(i)} after its noun ${word(j)}: a predicate adjective needs a nominative noun`);
    else if (!S.slice(j + 1, i).some((x) => x.v === 'buti')) warnings.push(`${word(i)} after ${word(j)} without yra — check it is a natural predicate`);
  });

  const quantified = S.some((t) => t.w && QUANTIFIERS[t.w]);
  const objects = { G: [], N: [] };
  const nounAt = (i) => i >= 0 && i < S.length && T[i].kind === 'n';
  S.forEach((t, i) => {
    if (!(t.n || t.pr) || governed.has(i)) return;
    const c = T[i].c;
    if (c === 'V' || c === 'Vt' || c === 'In') return;
    if (c === 'G' && t.n && TIME_NOUNS.has(t.n)) return;
    if (c === 'N' && t.n && PURPOSE_DATIVE.has(t.n)) return;
    if ((c === 'G' || c === 'N') && lic.has(c)) {
      objects[c].push(i);
      return;
    }
    if (c === 'K') {
      if (lic.has('K') || quantified || possessivePr(i)) return;
      let a = i + 1;
      while (a < S.length && isMod(a) && S[a].to !== i) a++;
      let b = i - 1;
      while (b >= 0 && isMod(b) && S[b].to === i) b--;
      if (t.n && (nounAt(a) || nounAt(b))) return;
    }
    const msg = `${word(i)} (${c}): nothing governs this case (verbs: ${verbs.map((v) => S[v].v).join(', ') || 'none'}; genitive needs a neighbouring noun, a verb with K, or daug/kiek)`;
    (verbless ? warnings : errors).push(msg);
  });

  const coordinated = (a, b) => S.slice(a + 1, b).some((x) => x.w && CONJ.has(x.w)) && S.slice(a + 1, b).every((x, k) => x.w || isMod(a + 1 + k) || (x.n && T[a + 1 + k].c === 'K'));
  for (const c of ['G', 'N']) {
    const list = objects[c];
    const groups = list.filter((i, k) => k === 0 || !coordinated(list[k - 1], i)).length;
    if (groups > slots[c]) errors.push(`${groups} separate ${c} objects (${list.map(word).join(', ')}) but only ${slots[c]} verb slot(s) for ${c}`);
  }

  return { errors, warnings };
}
