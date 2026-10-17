import fs from 'fs';
import sharp from 'sharp';
import { ADS } from '../src/lib/data/ads.js';

const UA = 'lt-trainer/1.0 (https://github.com/Ku6opr/lt)';
const CACHE = 'node_modules/.cache/ads';
const OUT = 'public/ads';
const W = 1200;
const H = 900;

fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

async function original(ad) {
  const file = `${CACHE}/${ad.id}`;
  if (fs.existsSync(file)) return fs.readFileSync(file);
  const url = ad.photo.file || ad.photo.page.replace('/wiki/File:', '/wiki/Special:FilePath/');
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(ad.id + ': HTTP ' + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(file, buf);
  return buf;
}

const only = process.argv.slice(2);
for (const ad of ADS.filter((a) => !only.length || only.includes(a.id))) {
  const src = await original(ad);
  const img = sharp(src).rotate();
  const { width, height } = await img.metadata().then((m) => (m.orientation >= 5 ? { width: m.height, height: m.width } : m));
  const [x0, y0, x1, y1] = ad.photo.crop;
  const left = Math.round(x0 * width);
  const top = Math.round(y0 * height);
  const box = { left, top, width: Math.round(x1 * width) - left, height: Math.round(y1 * height) - top };
  const out = `${OUT}/${ad.id}.jpg`;
  await img.extract(box).resize(W, H, { fit: 'cover', withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
  const meta = await sharp(out).metadata();
  console.log(ad.id, `${width}x${height}`, '→', `${meta.width}x${meta.height}`, Math.round(fs.statSync(out).size / 1024) + 'KB');
}
