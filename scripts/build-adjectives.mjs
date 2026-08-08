import fs from 'fs';

const SOURCE = 'data-source/lt-adjectives.json';
const OUT = 'src/lib/data/adjectives.js';
const fetched = JSON.parse(fs.readFileSync(SOURCE));
const RU_EN = JSON.parse(fs.readFileSync('data-source/ru-en-adj.json', 'utf8'));
const DEG = fs.existsSync('data-source/adj-degrees.json') ? JSON.parse(fs.readFileSync('data-source/adj-degrees.json', 'utf8')) : {};
const ADV = fs.existsSync('data-source/adv-degrees.json') ? JSON.parse(fs.readFileSync('data-source/adv-degrees.json', 'utf8')) : {};
const NO_ADV = new Set(['baltas', 'juodas', 'raudonas', 'geltonas', 'žalias', 'pilkas', 'rudas', 'mėlynas']);
const ACC = fs.existsSync('data-source/lt-accents-adj.json') ? JSON.parse(fs.readFileSync('data-source/lt-accents-adj.json', 'utf8')) : {};
const ACC_FIX = fs.existsSync('data-source/lt-accents-adj-fix.json') ? JSON.parse(fs.readFileSync('data-source/lt-accents-adj-fix.json', 'utf8')) : {};
const DEGA = {};
for (const p of ['data-source/lt-accents-deg-1.json', 'data-source/lt-accents-deg-2.json', 'data-source/lt-accents-deg-3.json']) {
  if (fs.existsSync(p)) Object.assign(DEGA, JSON.parse(fs.readFileSync(p, 'utf8')));
}
const ADVA = fs.existsSync('data-source/lt-accents-adv.json') ? JSON.parse(fs.readFileSync('data-source/lt-accents-adv.json', 'utf8')) : {};
const foldA = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const guard1 = (acc, base) => (acc && base && foldA(acc) === foldA(base) ? acc : null);
const guardPair = (accArr, baseArr) => {
  if (!accArr || !baseArr) return null;
  const out = baseArr.map((b, i) => guard1(accArr[i], b));
  return out.some(Boolean) ? out.map((v, i) => v || baseArr[i]) : null;
};

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
  rytinis: { t: 'III', m: 'ранковий', f: 'ранкова', n: 'ранкове' },
  sausas: { t: 'I', m: 'сухий', f: 'суха', n: 'сухе' },
  pilnas: { t: 'I', m: 'повний', f: 'повна', n: 'повне' },
  storas: { t: 'I', m: 'товстий', f: 'товста', n: 'товсте' },
  plonas: { t: 'I', m: 'тонкий', f: 'тонка', n: 'тонке' },
  linksmas: { t: 'I', m: 'веселий', f: 'весела', n: 'веселе' },
  pilkas: { t: 'I', m: 'сірий', f: 'сіра', n: 'сіре' },
  mėlynas: { t: 'I', m: 'синій', f: 'синя', n: 'синє' },
  rudas: { t: 'I', m: 'коричневий', f: 'коричнева', n: 'коричневе' },
  lengvas: { t: 'I', m: 'легкий', f: 'легка', n: 'легке' },
  siauras: { t: 'I', m: 'вузький', f: 'вузька', n: 'вузьке' },
  platus: { t: 'II', m: 'широкий', f: 'широка', n: 'широке' },
  aštrus: { t: 'II', m: 'гострий', f: 'гостра', n: 'гостре' },
  garsus: { t: 'II', m: 'гучний', f: 'гучна', n: 'гучне' },
  svarbus: { t: 'II', m: 'важливий', f: 'важлива', n: 'важливе' },
  stiklinis: { t: 'III', m: 'скляний', f: 'скляна', n: 'скляне' },
  vakarinis: { t: 'III', m: 'вечірній', f: 'вечірня', n: 'вечірнє' }
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
  const re = RU_EN[a.lemma] || {};
  const ru = re.ru || {};
  const w = { id: a.lemma, type: m.t, uk: m.m, ukM: m.m, ukF: m.f, ukN: m.n, ukPl: m.m.replace(/[иі]й$/, 'і'),
    ru: ru.m || m.m, ruM: ru.m || m.m, ruF: ru.f || m.f, ruN: ru.n || m.n, en: re.en || m.m,
    for: FOR[a.lemma] || '*', m: a.m, f: a.f };
  const dg = DEG[a.lemma];
  if (dg) {
    Object.assign(w, { comp: dg.comp, sup: dg.sup, ukComp: dg.ukComp, ukSup: dg.ukSup, enComp: dg.enComp, enSup: dg.enSup });
    const supM = dg.sup.m[0];
    const adv = {
      pos: m.t === 'I' ? a.m.sg[0].replace(/as$/, 'ai') : supM.replace(/ausias$/, 'ai'),
      comp: supM.replace(/ausias$/, 'au'),
      sup: supM.replace(/ausias$/, 'ausiai')
    };
    const at = ADV[a.lemma];
    if (at && !NO_ADV.has(a.lemma)) {
      Object.assign(w, { adv, advTr: { uk: at.uk, ru: at.ru, en: at.en } });
      const av = ADVA[a.lemma];
      if (av) {
        const advA = { pos: guard1(av.posA, adv.pos), comp: guard1(av.compA, adv.comp), sup: guard1(av.supA, adv.sup) };
        if (advA.pos || advA.comp || advA.sup) w.advA = advA;
      }
    }
    const da = DEGA[a.lemma];
    if (da) {
      const compA = da.compA && { m: guardPair(da.compA.m, dg.comp.m), f: guardPair(da.compA.f, dg.comp.f) };
      const supA = da.supA && { m: guardPair(da.supA.m, dg.sup.m), f: guardPair(da.supA.f, dg.sup.f) };
      if (compA && (compA.m || compA.f)) w.compA = { m: compA.m || dg.comp.m, f: compA.f || dg.comp.f };
      if (supA && (supA.m || supA.f)) w.supA = { m: supA.m || dg.sup.m, f: supA.f || dg.sup.f };
    }
  }
  const ac = ACC_FIX[a.lemma] || ACC[a.lemma];
  if (ac && ac.mA && ac.mA.sg && ac.mA.sg.length === 6) {
    const mA = { sg: guardPair(ac.mA.sg, a.m.sg), pl: guardPair(ac.mA.pl, a.m.pl) };
    const fA = { sg: guardPair(ac.fA && ac.fA.sg, a.f.sg), pl: guardPair(ac.fA && ac.fA.pl, a.f.pl) };
    if (mA.sg && fA.sg) {
      w.mA = { sg: mA.sg, pl: mA.pl || a.m.pl };
      w.fA = { sg: fA.sg, pl: fA.pl || a.f.pl };
    }
  }
  adjs.push(w);
}

if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }

const lines = adjs.map((a) => '  ' + JSON.stringify(a));
fs.writeFileSync(OUT, 'export const ADJECTIVES = [\n' + lines.join(',\n') + '\n];\n');
const byType = {};
for (const a of adjs) byType[a.type] = (byType[a.type] || 0) + 1;
console.log('written', adjs.length, 'adjectives to', OUT);
console.log('by type:', JSON.stringify(byType));
