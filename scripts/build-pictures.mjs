import fs from 'fs';
import { renderSvg, renderPng, toJpg, toPhone } from './pictures/lib.mjs';

const SRC = 'data-source/pictures';
const OUT = 'public/pictures';
const PREVIEW = 'node_modules/.cache/pictures';

const args = process.argv.slice(2);
const preview = args.includes('--preview');
const ids = args.filter((a) => !a.startsWith('--'));
const all = fs.readdirSync(SRC).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4));
const todo = ids.length ? ids : all;

fs.mkdirSync(OUT, { recursive: true });
if (preview) fs.mkdirSync(PREVIEW, { recursive: true });

let failed = 0;
for (const id of todo) {
  try {
    const { default: draw } = await import(new URL(`../${SRC}/${id}.mjs`, import.meta.url));
    const svg = renderSvg(draw);
    const png = await renderPng(svg);
    fs.writeFileSync(`${OUT}/${id}.jpg`, await toJpg(png));
    if (preview) {
      fs.writeFileSync(`${PREVIEW}/${id}.png`, png);
      fs.writeFileSync(`${PREVIEW}/${id}-phone.png`, await toPhone(png));
      fs.writeFileSync(`${PREVIEW}/${id}.svg`, svg);
    }
    console.log(id, 'ok', `${OUT}/${id}.jpg`, preview ? `${PREVIEW}/${id}.png ${PREVIEW}/${id}-phone.png` : '');
  } catch (e) {
    failed++;
    console.error(id, 'FAIL', e.message);
  }
}
if (failed) process.exit(1);
