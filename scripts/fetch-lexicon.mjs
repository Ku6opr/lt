import fs from 'fs';

const SRC = 'data-source/lexicon-lemmas.json';
const OUT = { verbs: 'data-source/lt-lexicon-verbs.json', adjectives: 'data-source/lt-lexicon-adj.json', nouns: 'data-source/lt-lexicon-nouns.json' };
const CASES = ['nominative', 'genitive', 'dative', 'accusative', 'instrumental', 'locative'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function accented(s) {
  let out = '';
  let base = '';
  for (const ch of (s || '').normalize('NFD')) {
    if (/[̀-ͯ]/.test(ch)) {
      if (ch === '̇' && /[iI]/.test(base)) continue;
      out += ch;
    } else {
      base = ch;
      out += ch;
    }
  }
  return out.normalize('NFC').trim();
}
const plain = (s) => accented(s).normalize('NFD').replace(/[̀́̃]/g, '').normalize('NFC');
const text = (html) => html.replace(/<[^>]+>/g, '').replace(/&#160;|&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function cellForms(html) {
  return html.split(/<br\s*\/?>/).map(text).filter((f) => f && f !== '—' && f !== '-');
}

function rows(table) {
  return table.split(/<tr[\s>]/).slice(1).map((tr) => ({
    th: [...tr.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => text(m[1]).toLowerCase()),
    td: [...tr.matchAll(/<td(?![^>]*class="separator")[^>]*>([\s\S]*?)<\/td>/g)].map((m) => cellForms(m[1]))
  }));
}

async function fetchPage(title) {
  const url = 'https://en.wiktionary.org/w/api.php?action=parse&redirects=1&prop=text&format=json&formatversion=2&page=' + encodeURIComponent(title);
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': 'lt-trainer/1.0 (https://github.com/Ku6opr/lt)' } });
    const body = await res.text();
    let j = null;
    try { j = JSON.parse(body); } catch (e) {}
    if (j && j.parse) return { html: j.parse.text };
    if (j && j.error && j.error.code === 'missingtitle') return { missing: true };
    await sleep(2000 * 2 ** attempt);
  }
  throw new Error('request failed: ' + title);
}

function lithuanian(html) {
  const i = html.indexOf('id="Lithuanian"');
  if (i < 0) return null;
  const j = html.indexOf('<h2', i + 10);
  return html.slice(i, j < 0 ? undefined : j);
}

function section(lt, pos) {
  const m = lt.match(new RegExp('<h[345] id="' + pos + '(_\\d+)?"'));
  if (!m) return null;
  const rest = lt.slice(m.index + m[0].length);
  const next = rest.search(/<h[345] id="(Noun|Verb|Adjective|Adverb|Participle|Pronoun|Numeral)(_\d+)?"/);
  return next < 0 ? rest : rest.slice(0, next);
}

function firstTable(sec) {
  const t = sec.indexOf('<table class="inflection-table');
  if (t < 0) return null;
  return sec.slice(t, sec.indexOf('</table>', t));
}

function gloss(sec) {
  const m = sec.match(/<ol>\s*<li>([\s\S]*?)<\/li>/);
  return m ? text(m[1].replace(/<ul[\s\S]*$/, '').replace(/<dl[\s\S]*$/, '')).slice(0, 120) : null;
}

function parseNoun(sec) {
  const table = firstTable(sec);
  if (!table) return null;
  const rs = rows(table);
  const head = rs.find((r) => r.th.some((h) => h.startsWith('singular') || h.startsWith('plural')));
  const cols = head ? head.th.filter((h) => h.startsWith('singular') || h.startsWith('plural')).map((h) => (h.startsWith('singular') ? 'sg' : 'pl')) : ['sg', 'pl'];
  const out = { sg: [], pl: [] };
  for (const c of CASES) {
    const r = rs.find((x) => x.th[0] === c);
    if (!r) return null;
    cols.forEach((col, k) => out[col].push(r.td[k] ? r.td[k][0] : null));
  }
  const hl = sec.match(/class="headword-line"[\s\S]*?<\/span>\s*(?:&#32;|<\/p>|$)/);
  const g = (sec.match(/<abbr title="(masculine|feminine) gender">/) || [])[1];
  return {
    gender: g === 'masculine' ? 'm' : g === 'feminine' ? 'f' : null,
    sg: out.sg.length ? out.sg.map(plain) : [],
    pl: out.pl.length ? out.pl.map(plain) : [],
    sgA: out.sg.map(accented),
    plA: out.pl.map(accented),
    headword: hl ? text(hl[0].replace(/^class="headword-line">/, '')) : null
  };
}

function parseAdjective(sec) {
  const table = firstTable(sec);
  if (!table) return null;
  const rs = rows(table);
  const start = rs.findIndex((r) => r.th.some((h) => h.startsWith('positive')));
  const out = { m: { sg: [], pl: [] }, f: { sg: [], pl: [] } };
  for (const c of CASES) {
    const r = rs.slice(start + 1).find((x) => x.th[0] === c && x.td.length >= 4);
    if (!r) return null;
    out.m.sg.push(r.td[0][0]);
    out.m.pl.push(r.td[1][0]);
    out.f.sg.push(r.td[2][0]);
    out.f.pl.push(r.td[3][0]);
  }
  const map = (fn) => ({ sg: out.m.sg.map(fn), pl: out.m.pl.map(fn) });
  const mapF = (fn) => ({ sg: out.f.sg.map(fn), pl: out.f.pl.map(fn) });
  return { m: map(plain), f: mapF(plain), mA: map(accented), fA: mapF(accented) };
}

const TENSES = [['past frequentative', 'habit'], ['present', 'pres'], ['past', 'past'], ['future', 'fut'], ['subjunctive', 'cond'], ['imperative', 'imp']];

function parseVerb(sec) {
  const table = firstTable(sec);
  if (!table) return null;
  const rs = rows(table);
  const out = {};
  for (const r of rs) {
    if (r.td.length < 6) continue;
    const label = r.th[r.th.length - 1] || '';
    const t = TENSES.find(([k]) => label.startsWith(k));
    if (!t || out[t[1]]) continue;
    const key = t[1];
    const pick = (i, pref) => {
      const fs = r.td[i] || [];
      const hit = pref ? fs.find((f) => plain(f).endsWith(pref)) : null;
      return hit || fs[0] || null;
    };
    const raw = key === 'imp'
      ? { sg2: pick(1), pl1: pick(3), pl2: pick(4) }
      : { sg1: pick(0), sg2: pick(1), p3: pick(2), pl1: pick(3, key === 'cond' ? 'tume' : null), pl2: pick(4) };
    out[key] = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, v && plain(v)]));
    out[key + 'A'] = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, v && accented(v)]));
  }
  return out.pres ? out : null;
}

const PARSE = { verbs: [['Verb'], parseVerb], adjectives: [['Adjective', 'Participle'], parseAdjective], nouns: [['Noun'], parseNoun] };

const lemmas = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const only = process.argv[2];
for (const [kind, list] of Object.entries(lemmas)) {
  if (only && only !== kind) continue;
  const [poses, parse] = PARSE[kind];
  const res = [];
  for (const lemma of list) {
    let entry = { lemma, found: false };
    try {
      const page = await fetchPage(lemma);
      if (page.missing) entry.missing = true;
      const lt = page.html && lithuanian(page.html);
      for (const pos of poses) {
        const sec = lt && section(lt, pos);
        const data = sec && parse(sec);
        if (data) {
          entry = { lemma, found: true, pos, gloss: gloss(sec), ...data };
          break;
        }
      }
    } catch (e) {
      entry.error = e.message;
    }
    res.push(entry);
    console.log(kind, lemma, entry.found ? 'ok' : entry.error ? 'ERROR ' + entry.error : entry.missing ? 'no page' : 'no table');
    await sleep(400);
  }
  fs.writeFileSync(OUT[kind], JSON.stringify(res, null, 1) + '\n');
  console.log(kind, res.filter((r) => r.found).length + '/' + res.length, '→', OUT[kind]);
}
