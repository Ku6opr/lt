import fs from 'fs';

const LT = JSON.parse(fs.readFileSync('data-source/lt-dempron.json', 'utf8'));
const TR = JSON.parse(fs.readFileSync('data-source/dempron-tr.json', 'utf8'));
const OUT = 'src/lib/data/demPronouns.js';

const IDS = ['tas', 'sitas', 'anas', 'kas', 'kitas', 'visas', 'toks', 'joks', 'visoks', 'kuris', 'sis', 'pats'];
const LEMMA = { tas: 'tas', sitas: 'šitas', anas: 'anas', kas: 'kas', kitas: 'kitas', visas: 'visas', toks: 'toks', joks: 'joks', visoks: 'visoks', kuris: 'kuris', sis: 'šis', pats: 'pats' };

const fold = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const guardArr = (accArr, baseArr) => {
  if (!accArr || !baseArr || accArr.length !== baseArr.length) return null;
  const out = baseArr.map((b, i) => (accArr[i] && fold(accArr[i]) === fold(b) ? accArr[i] : b));
  return out.some((v, i) => v !== baseArr[i]) ? out : null;
};
const guardG = (accG, baseG) => {
  if (!accG || !baseG) return null;
  const sg = guardArr(accG.sg, baseG.sg);
  const pl = baseG.pl ? guardArr(accG.pl, baseG.pl) : null;
  if (!sg && !pl) return null;
  const out = {};
  if (baseG.sg) out.sg = sg || baseG.sg;
  if (baseG.pl) out.pl = pl || baseG.pl;
  return out;
};

const problems = [];
const items = [];
for (const id of IDS) {
  const lemma = LEMMA[id];
  const lt = LT[lemma];
  const tr = TR[lemma];
  if (!lt || !tr) { problems.push('missing ' + lemma); continue; }
  const bare = !lt.f;
  if (!lt.m || !lt.m.sg || lt.m.sg.length !== 6) { problems.push('bad m.sg ' + lemma); continue; }
  if (!bare && (!lt.m.pl || lt.m.pl.length !== 6 || !lt.f.sg || lt.f.sg.length !== 6 || !lt.f.pl || lt.f.pl.length !== 6)) { problems.push('bad forms ' + lemma); continue; }
  const item = {
    id,
    lt: lt.m.sg[0],
    ltF: bare ? null : lt.f.sg[0],
    m: lt.m,
    f: bare ? null : lt.f,
    uk: tr.uk,
    ru: tr.ru,
    en: tr.en
  };
  const mA = guardG(lt.mA, lt.m);
  const fA = bare ? null : guardG(lt.fA, lt.f);
  if (mA) item.mA = mA;
  if (fA) item.fA = fA;
  items.push(item);
}

if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }
const lines = items.map((x) => '  ' + JSON.stringify(x));
fs.writeFileSync(OUT, 'export const DEM_PRONOUNS = [\n' + lines.join(',\n') + '\n];\n');
console.log('written', items.length, 'pronouns,', items.filter((x) => x.mA).length, 'with accents');
