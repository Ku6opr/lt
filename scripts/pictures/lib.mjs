import sharp from 'sharp';

export const W = 800;
export const H = 600;
export const OUT_W = 1600;
export const OUT_H = 1200;
export const INK = '#111';
const PAT = '#8a8a8a';
const LW = 0.62;

export const f = (n) => +n.toFixed(1);

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sample(pts, per = 12) {
  if (pts.length === 2) {
    const [a, b] = pts;
    return Array.from({ length: per + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / per, a[1] + ((b[1] - a[1]) * i) / per]);
  }
  const res = [];
  const P = [pts[0], ...pts, pts[pts.length - 1]];
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    for (let j = 0; j < per; j++) {
      const t = j / per;
      const t2 = t * t;
      const t3 = t2 * t;
      res.push([0, 1].map((k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
    }
  }
  res.push(pts[pts.length - 1]);
  return res;
}

export function limb(pts, w0, w1, fill = '#fff') {
  const s = sample(pts);
  const n = s.length;
  const L = [];
  const R = [];
  for (let i = 0; i < n; i++) {
    const a = s[Math.max(0, i - 1)];
    const b = s[Math.min(n - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const tx = (b[0] - a[0]) / len;
    const ty = (b[1] - a[1]) / len;
    const h = (w0 + ((w1 - w0) * i) / (n - 1)) / 2;
    L.push([s[i][0] - ty * h, s[i][1] + tx * h]);
    R.push([s[i][0] + ty * h, s[i][1] - tx * h]);
  }
  const pt = (p) => f(p[0]) + ' ' + f(p[1]);
  const d = `M${L.map(pt).join(' L')} A${f(w1 / 2)} ${f(w1 / 2)} 0 0 0 ${pt(R[n - 1])} L${R.slice().reverse().map(pt).join(' L')} A${f(w0 / 2)} ${f(w0 / 2)} 0 0 0 ${pt(L[0])} Z`;
  return `<path class="o" fill="${fill}" d="${d}"/>`;
}

export const hand = (x, y, a = 0) => `<ellipse class="o" cx="${x}" cy="${y}" rx="7" ry="9" transform="rotate(${a} ${x} ${y})"/>`;

export const shoe = (x, y, dir = 1) => `<path class="k" d="M${x - 12 * dir} ${y} Q${x - 13 * dir} ${y - 11} ${x} ${y - 11} Q${x + 13 * dir} ${y - 10} ${x + 16 * dir} ${y} Z"/>`;

export function scallops(x0, x1, y, w = 12, dep = 8) {
  const s = [];
  for (let x = x1; x > x0; x -= w) s.push(`Q${f(x - w / 2)} ${y + dep} ${f(Math.max(x0, x - w))} ${y}`);
  return s.join(' ');
}

export function tone(t) {
  const v = Math.round(255 * (1 - 0.62 * t));
  return `rgb(${v},${v},${v})`;
}

export const pat = (name) => `url(#${name})`;

const PATTERNS = `<pattern id="stH" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#fff"/><path d="M0 5 H10" stroke="${PAT}" stroke-width="3"/></pattern>
  <pattern id="stV" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#fff"/><path d="M5 0 V10" stroke="${PAT}" stroke-width="1.8"/></pattern>
  <pattern id="stD" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="13" height="13" fill="#fff"/><rect width="13" height="6" fill="${PAT}"/></pattern>
  <pattern id="dense" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="5" height="5" fill="#fff"/><path d="M0 2.5 H5" stroke="${PAT}" stroke-width="2.4"/></pattern>
  <pattern id="zig" width="16" height="14" patternUnits="userSpaceOnUse"><rect width="16" height="14" fill="#fff"/><path d="M0 11 L4 3 L8 11 L12 3 L16 11" fill="none" stroke="${PAT}" stroke-width="2"/></pattern>
  <pattern id="check" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#fff"/><rect width="6" height="18" fill="${PAT}"/><rect width="18" height="6" fill="${PAT}"/><path d="M12 0 V18 M0 12 H18" stroke="${PAT}" stroke-width="1.3"/></pattern>
  <pattern id="dots" width="13" height="13" patternUnits="userSpaceOnUse"><rect width="13" height="13" fill="#fff"/><circle cx="3.2" cy="3.2" r="2.3" fill="${PAT}"/><circle cx="9.7" cy="9.7" r="2.3" fill="${PAT}"/></pattern>
  <pattern id="diam" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#fff"/><path d="M9 1 L17 9 L9 17 L1 9 Z" fill="none" stroke="${PAT}" stroke-width="1.6"/><circle cx="9" cy="9" r="2.2" fill="${PAT}"/></pattern>
  <pattern id="brick" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#fff"/><path d="M0 0.5 H40 M0 10.5 H40 M10 0.5 V10.5 M30 10.5 V20" fill="none" stroke="${PAT}" stroke-width="1.3"/></pattern>
  <pattern id="grass" width="24" height="16" patternUnits="userSpaceOnUse"><rect width="24" height="16" fill="#fff"/><path d="M3 14 l2 -6 M6 14 l-1 -5 M15 8 l2 -6 M18 8 l-1 -5" fill="none" stroke="${PAT}" stroke-width="1.3" stroke-linecap="round"/></pattern>
  <pattern id="waves" width="28" height="14" patternUnits="userSpaceOnUse"><rect width="28" height="14" fill="#fff"/><path d="M0 7 Q7 2 14 7 Q21 12 28 7" fill="none" stroke="${PAT}" stroke-width="1.5"/></pattern>`;

const CLS = {
  o: { fill: '#fff', stroke: INK, 'stroke-width': 3.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' },
  k: { fill: INK, stroke: INK, 'stroke-width': 2.4, 'stroke-linejoin': 'round' },
  t: { fill: 'none', stroke: INK, 'stroke-width': 2.8, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' },
  h: { fill: 'none', stroke: INK, 'stroke-width': 1.9, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' },
  w: { fill: 'none', stroke: '#fff', 'stroke-width': 2.2, 'stroke-linecap': 'round' }
};

function inline(svg) {
  const res = svg.replace(/<(\w+)([^>]*?) class="(\w)"([^>]*?)(\/?)>/g, (m, tag, a, cls, b, end) => {
    if (!CLS[cls]) throw new Error('unknown class ' + cls);
    const own = a + b;
    const attrs = Object.entries(CLS[cls])
      .filter(([k]) => !new RegExp(`\\s${k}="`).test(own))
      .map(([k, v]) => ` ${k}="${k === 'stroke-width' ? f(v * LW) : v}"`)
      .join('');
    return `<${tag}${a}${b}${attrs}${end}>`;
  });
  if (/class=/.test(res)) throw new Error('unstyled class left');
  return res;
}

export function renderSvg(draw) {
  const out = [];
  const defs = [];
  let uid = 0;
  const add = (...s) => out.push(...s);
  const def = (s) => defs.push(s);

  function clip(d) {
    const id = 'c' + uid++;
    defs.push(`<clipPath id="${id}"><path d="${d}"/></clipPath>`);
    return `clip-path="url(#${id})"`;
  }

  function shade(specs, d) {
    return specs
      .map((sp) => {
        const id = 'g' + uid++;
        if (sp.lin) {
          if (!d) throw new Error('shade: linear spec needs a shape');
          const [x1, y1, x2, y2] = sp.lin;
          defs.push(`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="#000" stop-opacity="${f(sp.s[0] * 0.5)}"/><stop offset="1" stop-color="#000" stop-opacity="${f(sp.s[1] * 0.5)}"/></linearGradient>`);
          return `<path d="${d}" fill="url(#${id})"/>`;
        }
        const [cx, cy, rx, ry] = sp.rad;
        defs.push(`<radialGradient id="${id}"><stop offset="0" stop-color="#000" stop-opacity="${f(sp.s * 0.5)}"/><stop offset="0.55" stop-color="#000" stop-opacity="${f(sp.s * 0.32)}"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`);
        return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})"/>`;
      })
      .join('');
  }

  function floor({ top = 400, vp = [400, 150], step = 64, rows = null, color = '#b0b0b0' } = {}) {
    const ys = rows || [top, top + 14, top + 32, top + 55, top + 85, top + 125, top + 178, top + 250];
    const xs = [];
    for (let xb = -1600; xb <= 2400; xb += step) xs.push(xb);
    const at = (xb, y) => vp[0] + ((xb - vp[0]) * (y - vp[1])) / (H - vp[1]);
    const lines = xs.map((xb) => `M${f(at(xb, top))} ${top} L${f(at(xb, H + 20))} ${H + 20}`);
    const joints = [];
    xs.slice(0, -1).forEach((xb, k) => {
      ys.forEach((y, j) => {
        if (j && !((j + k) % 2)) joints.push(`M${f(at(xb, y))} ${y} L${f(at(xs[k + 1], y))} ${y}`);
      });
    });
    return `<g ${clip(`M0 ${top} H${W} V${H} H0 Z`)}><path class="h" stroke="${color}" d="${lines.join(' ')} ${joints.join(' ')}"/></g>`;
  }

  draw({ add, def, clip, shade, floor, limb, hand, shoe, scallops, tone, pat, rng, f, W, H, INK });

  const head = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${OUT_W}" height="${OUT_H}">
<defs>
  <filter id="ink" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  ${PATTERNS}
  ${defs.join('\n  ')}
</defs>
<rect width="${W}" height="${H}" fill="#fff"/>
<g filter="url(#ink)">`;
  return inline([head, ...out, '</g>\n</svg>'].join('\n'));
}

function grain(w, h, sigma, seed = 1) {
  const rnd = rng(seed);
  const buf = Buffer.alloc(w * h);
  for (let i = 0; i < buf.length; i++) {
    const g = Math.sqrt(-2 * Math.log(rnd() || 1e-9)) * Math.cos(2 * Math.PI * rnd());
    buf[i] = Math.max(0, Math.min(255, Math.round(128 + g * sigma)));
  }
  return sharp(buf, { raw: { width: w, height: h, channels: 1 } }).blur(0.6).toColourspace('srgb').png().toBuffer();
}

let GRAIN = null;

export async function renderPng(svg) {
  GRAIN = GRAIN || (await grain(OUT_W, OUT_H, 30));
  const base = await sharp(Buffer.from(svg), { density: 72 }).resize(OUT_W, OUT_H).flatten({ background: '#fff' }).png().toBuffer();
  return sharp(base).composite([{ input: GRAIN, blend: 'soft-light' }]).png().toBuffer();
}

export const toJpg = (png) => sharp(png).jpeg({ quality: 84, mozjpeg: true }).toBuffer();

export const toPhone = (png) => sharp(png).resize(390).png().toBuffer();
