import fs from 'fs';
import { buildPhrase, glossOf, DAILY_POOL } from '../src/lib/engine/daily.js';
import { grammarIssues } from './pictures/grammar.mjs';

const DIR = 'src/lib/data/pictures';
const MIN = 10;
const MAX = 20;

const args = process.argv.slice(2);
const quiet = args.includes('--quiet');
const ids = args.filter((a) => !a.startsWith('--'));
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.js') && f !== 'index.js').map((f) => f.slice(0, -3));
const index = fs.readFileSync(`${DIR}/index.js`, 'utf8');

const seen = new Map(DAILY_POOL.map((p) => [p.id, 'daily']));
let errors = 0;
const err = (id, msg) => {
  errors++;
  console.log(`  XX ${id}: ${msg}`);
};

for (const file of files) {
  let pic;
  try {
    pic = (await import(new URL(`../${DIR}/${file}.js`, import.meta.url))).default;
  } catch (e) {
    if (!ids.length || ids.includes(file)) err(file, 'cannot load: ' + e.message);
    continue;
  }
  const own = (ref) => pic.gloss && pic.gloss[ref];
  const phrases = pic.phrases || [];
  for (const p of phrases) {
    if (seen.has(p.id)) err(file, `phrase id ${p.id} already used in ${seen.get(p.id)}`);
    seen.set(p.id, file);
  }
  if (ids.length && !ids.includes(file)) continue;
  console.log(`\n${file}`);
  if (pic.id !== file) err(file, `id "${pic.id}" must match file name`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pic.since || '')) err(file, 'since must be YYYY-MM-DD');
  if (!fs.existsSync(`data-source/pictures/${file}.mjs`)) err(file, `no scene data-source/pictures/${file}.mjs`);
  if (!fs.existsSync(`public/pictures/${file}.jpg`)) err(file, `no image public/pictures/${file}.jpg (node scripts/build-pictures.mjs ${file})`);
  if (!index.includes(`'./${file}.js'`)) console.log(`  -- not in ${DIR}/index.js yet`);
  if (phrases.length < MIN || phrases.length > MAX) err(file, `${phrases.length} phrases, need ${MIN}–${MAX}`);
  for (const src of phrases) {
    if (!src.id.startsWith(file + '-')) err(file, `phrase id ${src.id} must start with "${file}-"`);
    for (const l of ['uk', 'ru', 'en']) if (!src[l] || !/[.!?…]$/.test(src[l])) err(src.id, `${l} translation missing or without final punctuation`);
    let ph;
    try {
      ph = buildPhrase(src);
    } catch (e) {
      err(src.id, e.message);
      continue;
    }
    for (const t of ph.tokens) if (!glossOf(t.ref) && !own(t.ref)) err(src.id, `no gloss for ${t.ref}`);
    const g = grammarIssues(src, ph);
    for (const m of g.errors) err(src.id, 'grammar: ' + m);
    for (const m of g.warnings) console.log(`  -- ${src.id}: ${m}`);
    if (!quiet) console.log(`  ${ph.lt.padEnd(52)} | ${src.ru}`);
  }
}

console.log(errors ? `\n${errors} error(s)` : '\nok');
process.exit(errors ? 1 : 0);
