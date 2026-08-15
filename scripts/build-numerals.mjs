import fs from 'fs';

const LT = JSON.parse(fs.readFileSync('data-source/lt-numerals.json', 'utf8'));
const TR = JSON.parse(fs.readFileSync('data-source/numerals-tr.json', 'utf8'));
const OUT = 'src/lib/data/numerals.js';

const fold = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const guard = (accArr, baseArr) => {
  if (!accArr || !baseArr || accArr.length !== baseArr.length) return null;
  const out = baseArr.map((b, i) => (accArr[i] && fold(accArr[i]) === fold(b) ? accArr[i] : b));
  return out.some((v, i) => v !== baseArr[i]) ? out : null;
};

const problems = [];
const items = [];
for (const id of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
  const lt = LT[id];
  const tr = TR[id];
  if (!lt || !tr) { problems.push('missing ' + id); continue; }
  if (lt.m.length !== 6 || lt.f.length !== 6 || lt.m.some((x) => !x) || lt.f.some((x) => !x)) { problems.push('bad lt forms ' + id); continue; }
  if (tr.uk.m.length !== 6 || tr.uk.f.length !== 6 || tr.ru.m.length !== 6 || tr.ru.f.length !== 6) { problems.push('bad tr ' + id); continue; }
  const item = { id, lt: lt.m[0], ltF: lt.f[0], m: lt.m, f: lt.f, uk: tr.uk, ru: tr.ru, en: tr.en };
  const mA = guard(lt.mA, lt.m);
  const fA = guard(lt.fA, lt.f);
  if (mA) item.mA = mA;
  if (fA) item.fA = fA;
  items.push(item);
}

const TEENS_SRC = fs.existsSync('data-source/lt-numerals-teens.json') ? JSON.parse(fs.readFileSync('data-source/lt-numerals-teens.json', 'utf8')) : {};
const teens = [];
for (let n = 10; n <= 20; n++) {
  const t = TEENS_SRC[String(n)];
  if (!t) continue;
  const item = { id: String(n), lt: t.lt, uk: t.uk, ru: t.ru, en: t.en };
  if (t.ltA && fold(t.ltA) === fold(t.lt)) item.ltA = t.ltA;
  teens.push(item);
}

if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }
const lines = items.map((x) => '  ' + JSON.stringify(x));
const tlines = teens.map((x) => '  ' + JSON.stringify(x));
fs.writeFileSync(OUT, 'export const NUMERALS = [\n' + lines.join(',\n') + '\n];\n\nexport const TEENS = [\n' + tlines.join(',\n') + '\n];\n');
console.log('written', items.length, 'numerals,', items.filter((x) => x.mA).length, 'with accents;', teens.length, 'teens');
