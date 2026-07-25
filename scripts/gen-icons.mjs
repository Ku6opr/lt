import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const ACCENT = '#b68235';
const BG = '#f3f2f2';

function svg(size, maskable) {
  const pad = maskable ? Math.round(size * 0.12) : 0;
  const inner = size - pad * 2;
  const radius = maskable ? 0 : Math.round(size * 0.18);
  const fontSize = Math.round(inner * 0.42);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${maskable ? ACCENT : BG}"/>
  <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${radius}" fill="${ACCENT}"/>
  <text x="50%" y="50%" dy="0.02em" text-anchor="middle" dominant-baseline="central"
    font-family="Georgia, 'Times New Roman', serif" font-weight="600" font-size="${fontSize}" fill="${BG}">Įn.</text>
</svg>`;
}

async function render(name, size, maskable) {
  await sharp(Buffer.from(svg(size, maskable))).png().toFile(join(outDir, name));
  console.log('wrote', name);
}

await render('icon-192.png', 192, false);
await render('icon-512.png', 512, false);
await render('icon-maskable-512.png', 512, true);
