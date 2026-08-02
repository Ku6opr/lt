import fs from 'fs';

const SOURCE = 'data-source/lt-adjectives.json';
const OUT = 'src/lib/data/adjectives.js';
const fetched = JSON.parse(fs.readFileSync(SOURCE));

const META = {
  geras: { t: 'I', m: 'добрий', f: 'добра', n: 'добре' },
  blogas: { t: 'I', m: 'поганий', f: 'погана', n: 'погане' },
  mažas: { t: 'I', m: 'малий', f: 'мала', n: 'мале' },
  naujas: { t: 'I', m: 'новий', f: 'нова', n: 'нове' },
  senas: { t: 'I', m: 'старий', f: 'стара', n: 'старе' },
  jaunas: { t: 'I', m: 'молодий', f: 'молода', n: 'молоде' },
  ilgas: { t: 'I', m: 'довгий', f: 'довга', n: 'довге' },
  trumpas: { t: 'I', m: 'короткий', f: 'коротка', n: 'коротке' },
  aukštas: { t: 'I', m: 'високий', f: 'висока', n: 'високе' },
  žemas: { t: 'I', m: 'низький', f: 'низька', n: 'низьке' },
  greitas: { t: 'I', m: 'швидкий', f: 'швидка', n: 'швидке' },
  šiltas: { t: 'I', m: 'теплий', f: 'тепла', n: 'тепле' },
  šaltas: { t: 'I', m: 'холодний', f: 'холодна', n: 'холодне' },
  baltas: { t: 'I', m: 'білий', f: 'біла', n: 'біле' },
  juodas: { t: 'I', m: 'чорний', f: 'чорна', n: 'чорне' },
  raudonas: { t: 'I', m: 'червоний', f: 'червона', n: 'червоне' },
  geltonas: { t: 'I', m: 'жовтий', f: 'жовта', n: 'жовте' },
  žalias: { t: 'I', m: 'зелений', f: 'зелена', n: 'зелене' },
  gražus: { t: 'II', m: 'гарний', f: 'гарна', n: 'гарне' },
  brangus: { t: 'II', m: 'дорогий', f: 'дорога', n: 'дороге' },
  pigus: { t: 'II', m: 'дешевий', f: 'дешева', n: 'дешеве' },
  sunkus: { t: 'II', m: 'важкий', f: 'важка', n: 'важке' },
  stiprus: { t: 'II', m: 'сильний', f: 'сильна', n: 'сильне' },
  švarus: { t: 'II', m: 'чистий', f: 'чиста', n: 'чисте' },
  saldus: { t: 'II', m: 'солодкий', f: 'солодка', n: 'солодке' },
  gilus: { t: 'II', m: 'глибокий', f: 'глибока', n: 'глибоке' },
  didelis: { t: 'III', m: 'великий', f: 'велика', n: 'велике' },
  naminis: { t: 'III', m: 'домашній', f: 'домашня', n: 'домашнє' },
  medinis: { t: 'III', m: "дерев'яний", f: "дерев'яна", n: "дерев'яне" },
  paskutinis: { t: 'III', m: 'останній', f: 'остання', n: 'останнє' },
  vidutinis: { t: 'III', m: 'середній', f: 'середня', n: 'середнє' },
  auksinis: { t: 'III', m: 'золотий', f: 'золота', n: 'золоте' },
  rytinis: { t: 'III', m: 'ранковий', f: 'ранкова', n: 'ранкове' }
};

const FOR = {
  geras: '*', blogas: '*', gražus: ['person', 'place', 'nature', 'thing', 'animal', 'body'],
  naujas: ['thing', 'place', 'food', 'drink'], senas: ['thing', 'place', 'person', 'animal', 'nature'],
  jaunas: ['person', 'animal'],
  didelis: ['thing', 'place', 'nature', 'animal', 'person', 'food', 'body', 'drink'],
  mažas: ['thing', 'place', 'nature', 'animal', 'person', 'food', 'body', 'drink'],
  ilgas: ['thing', 'place', 'time', 'nature'], trumpas: ['thing', 'place', 'time', 'nature'],
  aukštas: ['person', 'place', 'thing', 'nature'], žemas: ['person', 'place', 'thing', 'nature'],
  greitas: ['thing', 'animal', 'person'],
  šiltas: ['food', 'drink', 'nature', 'thing', 'place', 'time'], šaltas: ['food', 'drink', 'nature', 'thing', 'place', 'time'],
  baltas: ['thing', 'place', 'nature', 'animal', 'food', 'drink', 'body'],
  juodas: ['thing', 'place', 'nature', 'animal', 'food', 'drink', 'body'],
  raudonas: ['thing', 'place', 'nature', 'animal', 'food', 'drink', 'body'],
  geltonas: ['thing', 'place', 'nature', 'animal', 'food', 'drink', 'body'],
  žalias: ['thing', 'place', 'nature', 'food'],
  brangus: ['thing', 'food', 'drink', 'place'], pigus: ['thing', 'food', 'drink', 'place'],
  sunkus: ['thing', 'nature', 'food'], stiprus: ['person', 'animal', 'drink', 'nature'],
  švarus: ['thing', 'place', 'body', 'food', 'drink'], saldus: ['food', 'drink'],
  gilus: ['nature', 'place'],
  naminis: ['food', 'animal', 'place', 'thing'], medinis: ['thing', 'place'],
  paskutinis: ['time', 'thing', 'place', 'person', 'animal'], vidutinis: ['thing', 'place', 'person', 'time'],
  auksinis: ['thing'], rytinis: ['time']
};

const VALID = new Set(['I', 'II', 'III']);
const problems = [];
const adjs = [];
for (const a of fetched) {
  const m = META[a.lemma];
  if (!m) { problems.push('no META: ' + a.lemma); continue; }
  if (!VALID.has(m.t)) { problems.push('bad type: ' + a.lemma); continue; }
  const ok = ['m', 'f'].every((g) => a[g] && a[g].sg.length === 6 && a[g].pl.length === 6 && [...a[g].sg, ...a[g].pl].every((x) => x));
  if (!ok) { problems.push('bad forms: ' + a.lemma); continue; }
  adjs.push({ id: a.lemma, type: m.t, uk: m.m, ukM: m.m, ukF: m.f, ukN: m.n, ukPl: m.m.replace(/[иі]й$/, 'і'), for: FOR[a.lemma] || '*', m: a.m, f: a.f });
}

if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }

const lines = adjs.map((a) => '  ' + JSON.stringify(a));
fs.writeFileSync(OUT, 'export const ADJECTIVES = [\n' + lines.join(',\n') + '\n];\n');
const byType = {};
for (const a of adjs) byType[a.type] = (byType[a.type] || 0) + 1;
console.log('written', adjs.length, 'adjectives to', OUT);
console.log('by type:', JSON.stringify(byType));
