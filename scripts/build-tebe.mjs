import fs from 'fs';
import { init, analyze, saveCache } from './vdu-client.mjs';
import { VERBS } from '../src/lib/data/verbsConj.js';

const OUT = 'src/lib/data/verbsTebe.js';
const PREFIXES = ['tebe', 'nebe'];
const PERSON = { sg1: ['1 asm.', 'vns.'], sg2: ['2 asm.', 'vns.'], p3: ['3 asm.'], pl1: ['1 asm.', 'dgs.'], pl2: ['2 asm.', 'dgs.'] };
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const merges = (verbId, pfx) => verbId === 'buti' || (verbId === 'eiti' && pfx === 'nebe');
function prefixed(verbId, pfx, form) {
  if (!merges(verbId, pfx)) return pfx + form;
  return pfx.slice(0, -1) + (form === 'yra' ? 'ėra' : form);
}

await init();
const out = {};
const bad = [];
for (const v of VERBS) {
  const e = {};
  for (const pfx of PREFIXES) {
    e[pfx] = {};
    e[pfx + 'A'] = {};
    for (const [slot, form] of Object.entries(v.f)) {
      const cand = prefixed(v.id, pfx, form);
      const hit = (await analyze(cand)).find((a) => a.mi.startsWith('vksm.') && a.mi.includes('es. l.') && PERSON[slot].every((p) => a.mi.includes(p)));
      if (!hit) { bad.push(cand); continue; }
      const acc = hit.accented.normalize('NFC');
      e[pfx][slot] = cand;
      e[pfx + 'A'][slot] = fold(acc) === fold(cand) ? acc : null;
    }
  }
  out[v.id] = e;
}
saveCache();
if (bad.length) {
  console.error('VDU не підтвердив:', bad.join(' '));
  process.exit(1);
}
const lines = Object.entries(out).map(([id, e]) => '  ' + id + ': ' + JSON.stringify(e));
fs.writeFileSync(OUT, 'export const TEBE = {\n' + lines.join(',\n') + '\n};\n');
console.log(Object.keys(out).length, 'verbs →', OUT);
