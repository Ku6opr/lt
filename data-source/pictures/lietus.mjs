export default function draw({ add, clip, shade, limb, hand, tone, pat, rng, f, W, H }) {
  const D = {
    street: `M-10 432 H${W + 10} V${H + 10} H-10 Z`,
    left: 'M-10 110 H150 V420 H-10 Z',
    right: 'M650 170 H810 V420 H650 Z',
    canopy: 'M140 262 Q150 182 250 176 Q350 182 360 262 Q343 250 326 262 Q309 250 292 262 Q275 250 258 262 Q241 250 224 262 Q207 250 190 262 Q173 250 157 262 Q149 254 140 262 Z',
    coat: 'M224 330 Q228 306 252 306 Q276 306 280 330 L298 508 Q252 516 206 508 Z',
    jacket: 'M554 410 Q558 390 584 390 Q610 390 614 410 L620 488 L548 488 Z'
  };

  const cloud = (x, y, s, t) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="o" fill="${tone(t)}" d="M-110 30 Q-130 0 -96 -12 Q-92 -52 -46 -46 Q-24 -84 22 -66 Q60 -86 82 -50 Q126 -54 122 -14 Q148 6 120 30 Z"/>${shade([{ lin: [0, -60, 0, 30], s: [0, 0.45] }], 'M-110 30 Q-130 0 -96 -12 Q-92 -52 -46 -46 Q-24 -84 22 -66 Q60 -86 82 -50 Q126 -54 122 -14 Q148 6 120 30 Z')}</g>`;

  add(`<path class="o" fill="${tone(0.12)}" d="M140 290 H660 V430 H140 Z" stroke="none"/>`);
  add(`<path class="o" fill="${tone(0.18)}" d="M170 300 H300 V430 H170 Z M300 330 H420 V430 H300 Z M420 290 H560 V430 H420 Z M560 320 H660 V430 H560 Z"/>`);
  add(`<path class="h" d="${[200, 240, 330, 370, 450, 490, 530, 590, 630].map((x) => `M${x} 340 h16 v16 h-16 Z M${x} 380 h16 v16 h-16 Z`).join(' ')}"/>`);

  add(`<path class="o" fill="${tone(0.3)}" d="${D.left}"/>
${shade([{ lin: [60, 0, 150, 0], s: [0, 0.4] }], D.left)}
${[0, 1, 2, 3].map((r) => [0, 1].map((c) => `<rect class="o" fill="${tone(0.7)}" x="${16 + c * 64}" y="${136 + r * 70}" width="40" height="44"/><path class="h" d="M${36 + c * 64} ${136 + r * 70} v44"/>`).join('')).join('')}
<path class="o" fill="${tone(0.55)}" d="M-10 100 H160 V114 H-10 Z"/>`);
  add(`<path class="o" fill="${tone(0.08)}" d="${D.right}"/>
${shade([{ lin: [720, 0, 800, 0], s: [0, 0.4] }], D.right)}
<path class="o" fill="#222" d="M636 176 L725 104 L814 176 Z"/>
<rect class="o" fill="${tone(0.7)}" x="676" y="212" width="46" height="52"/><path class="h" d="M699 212 v52 M676 238 h46"/>
<rect class="o" fill="${tone(0.7)}" x="676" y="300" width="46" height="52"/><path class="h" d="M699 300 v52 M676 326 h46"/>
<rect class="o" fill="${tone(0.7)}" x="748" y="212" width="40" height="52"/>
<rect class="o" fill="${tone(0.6)}" x="744" y="320" width="44" height="100"/>`);

  add(`<path class="o" fill="${tone(0.2)}" d="M-10 418 H${W + 10} V434 H-10 Z"/>`);
  add(`<path class="o" fill="${tone(0.32)}" d="${D.street}"/>`);
  add(shade([{ lin: [0, 432, 0, 600], s: [0.3, 0] }], D.street));
  add(`<path class="w" d="M30 470 h60 M120 500 h40 M640 470 h70 M700 560 h50 M40 580 h40 M360 590 h50" stroke-width="2"/>
<path class="w" d="M70 440 v30 M110 440 v20 M690 440 v26 M760 440 v22" stroke="${tone(0.5)}" stroke-width="5"/>`);

  add(`<ellipse class="o" fill="${tone(0.14)}" cx="100" cy="540" rx="70" ry="16"/>
<ellipse class="o" fill="${tone(0.14)}" cx="390" cy="476" rx="54" ry="11"/>
<ellipse class="o" fill="${tone(0.14)}" cx="740" cy="510" rx="56" ry="13"/>
<ellipse class="o" fill="${tone(0.14)}" cx="420" cy="572" rx="46" ry="10"/>
<path class="h" d="M70 540 q30 6 60 0 M372 476 q18 4 36 0 M720 510 q20 5 40 0"/>`);

  add(cloud(150, 70, 1.15, 0.62));
  add(cloud(470, 54, 1.4, 0.72));
  add(cloud(720, 88, 1.0, 0.55));

  const lx = 466;
  add(`<rect class="o" fill="${tone(0.7)}" x="${lx - 5}" y="200" width="10" height="250"/>
<path class="o" fill="${tone(0.7)}" d="M${lx - 14} 450 h28 v10 h-28 Z"/>
<path class="o" fill="${tone(0.7)}" d="M${lx - 22} 168 h44 l-10 -14 h-24 Z"/>
<path class="o" fill="${tone(0.06)}" d="M${lx - 16} 168 h32 l-6 34 h-20 Z"/>
<path class="t" d="M${lx} 168 v34"/>
<path class="w" d="M${lx} 466 v40 M${lx - 6} 470 v22 M${lx + 6} 470 v28" stroke="${tone(0.7)}" stroke-width="3"/>`);

  const R = rng(21);
  const rain = [];
  for (let i = 0; i < 170; i++) {
    const x = R() * (W + 40);
    const y = 120 + R() * 470;
    if (x > 166 && x < 406 && y > 170 && y < 560) continue;
    if (x > 520 && x < 650 && y > 270 && y < 560) continue;
    rain.push(`M${f(x)} ${f(y)} l-5 15`);
  }
  add(`<path class="h" stroke="${tone(0.65)}" stroke-width="2" d="${rain.join(' ')}"/>`);

  const wx = 252;
  add(shade([{ rad: [262, 562, 70, 9], s: 0.6 }]));
  add(`<path class="w" d="M240 566 v26 M262 568 v20 M286 566 v24" stroke="${tone(0.55)}" stroke-width="4"/>`);
  add(limb([[wx - 14, 500], [wx - 26, 556]], 15, 13, tone(0.8)));
  add(limb([[wx + 14, 500], [wx + 30, 550]], 15, 13, tone(0.8)));
  add(`<path class="k" d="M${wx - 44} 566 Q${wx - 44} 554 ${wx - 30} 552 L${wx - 18} 552 L${wx - 18} 566 Z"/>
<path class="k" d="M${wx + 22} 544 L${wx + 36} 544 Q${wx + 50} 548 ${wx + 50} 560 L${wx + 24} 560 Z"/>`);
  add(`<path class="o" fill="${pat('check')}" d="${D.coat}"/>
${shade([{ lin: [wx, 0, wx + 46, 0], s: [0, 0.5] }], D.coat)}
<path class="t" d="M${wx} 316 V512"/>
<circle class="k" cx="${wx - 8}" cy="350" r="3.2"/><circle class="k" cx="${wx - 8}" cy="390" r="3.2"/><circle class="k" cx="${wx - 8}" cy="430" r="3.2"/>
<path class="o" fill="${tone(0.6)}" d="M${wx - 30} 400 L${wx + 32} 400 L${wx + 34} 412 L${wx - 32} 412 Z"/>`);
  add(limb([[wx - 22, 322], [wx - 40, 380], [wx - 34, 420]], 17, 14, pat('check')));
  add(hand(wx - 33, 426, 0));
  add(`<path class="k" d="M${wx - 30} 266 Q${wx - 36} 304 ${wx - 26} 318 Q${wx - 20} 300 ${wx - 22} 286 Z M${wx + 30} 266 Q${wx + 36} 304 ${wx + 26} 318 Q${wx + 20} 300 ${wx + 22} 286 Z"/>
<rect class="o" x="${wx - 6}" y="296" width="12" height="16"/>
<ellipse class="o" cx="${wx}" cy="268" rx="27" ry="32"/>
<path class="k" d="M${wx - 28} 274 Q${wx - 32} 236 ${wx} 234 Q${wx + 32} 236 ${wx + 28} 274 Q${wx + 18} 252 ${wx - 4} 250 Q${wx - 20} 256 ${wx - 28} 274 Z"/>
<ellipse class="k" cx="${wx - 10}" cy="272" rx="3" ry="4"/><ellipse class="k" cx="${wx + 10}" cy="272" rx="3" ry="4"/>
<path class="h" d="M${wx - 16} 263 q5 -3 10 0 M${wx + 6} 263 q5 -3 10 0 M${wx} 276 q-3 6 2 7"/>
<path class="t" d="M${wx - 8} 287 q8 5 16 0"/>`);
  add(limb([[wx + 22, 322], [wx + 44, 352], [wx + 40, 356]], 17, 14, pat('check')));
  add(`<g transform="translate(36 0)"><path class="t" stroke-width="4" d="M${wx + 2} 182 V354 Q${wx + 2} 366 ${wx - 8} 366"/>
<path class="k" d="${D.canopy}"/>
<path class="w" d="M250 180 Q214 200 190 262 M250 180 Q238 210 224 262 M250 180 Q262 210 276 262 M250 180 Q286 200 310 262" stroke-width="1.6"/>
<path class="k" d="M247 178 l3 -14 l3 14 Z"/></g>`);
  add(hand(wx + 38, 346, 80));

  const bx = 584;
  add(`<ellipse class="o" fill="${tone(0.14)}" cx="${bx}" cy="560" rx="104" ry="22"/>
<ellipse class="h" cx="${bx}" cy="560" rx="70" ry="12" fill="none"/>
<path class="h" d="M${bx - 92} 556 q20 6 40 0 M${bx + 52} 556 q20 6 40 0"/>`);
  add(shade([{ rad: [bx + 10, 562, 54, 8], s: 0.55 }]));
  add(limb([[bx - 14, 486], [bx - 16, 532]], 15, 13));
  add(limb([[bx + 14, 486], [bx + 16, 532]], 15, 13));
  add(`<path class="k" d="M${bx - 26} 526 h20 v28 Q${bx - 4} 562 ${bx - 16} 562 L${bx - 34} 562 Q${bx - 38} 554 ${bx - 26} 550 Z"/>
<path class="k" d="M${bx + 6} 526 h20 v24 Q${bx + 38} 554 ${bx + 34} 562 L${bx + 16} 562 Q${bx + 4} 562 ${bx + 6} 554 Z"/>
<path class="t" d="M${bx - 54} 540 q-10 -20 -24 -26 M${bx - 46} 530 q-4 -22 -14 -34 M${bx + 46} 530 q4 -22 14 -34 M${bx + 54} 540 q10 -20 24 -26"/>
<path class="k" d="M${bx - 84} 512 a4 5 0 1 0 0.1 0 Z M${bx - 62} 494 a4 5 0 1 0 0.1 0 Z M${bx + 62} 494 a4 5 0 1 0 0.1 0 Z M${bx + 84} 512 a4 5 0 1 0 0.1 0 Z"/>`);
  add(`<path class="o" fill="${tone(0.7)}" d="M${bx - 28} 480 L${bx + 28} 480 L${bx + 30} 500 L${bx - 30} 500 Z"/>
<path class="o" fill="${pat('stH')}" d="${D.jacket}"/>
${shade([{ lin: [bx, 0, bx + 36, 0], s: [0, 0.45] }], D.jacket)}
<path class="t" d="M${bx} 392 V488"/>`);
  add(limb([[bx - 26, 404], [bx - 50, 370], [bx - 56, 330]], 15, 13, pat('stH')));
  add(limb([[bx + 26, 404], [bx + 50, 370], [bx + 56, 330]], 15, 13, pat('stH')));
  add(`${hand(bx - 57, 324, -10)}${hand(bx + 57, 324, 10)}`);
  add(`<rect class="o" x="${bx - 6}" y="372" width="12" height="18"/>
<ellipse class="o" cx="${bx}" cy="344" rx="27" ry="31"/>
<path class="k" d="M${bx - 27} 344 Q${bx - 30} 310 ${bx} 310 Q${bx + 30} 310 ${bx + 27} 344 Q${bx + 24} 330 ${bx + 18} 328 L${bx + 15} 340 L${bx + 10} 326 L${bx + 4} 338 L${bx - 2} 324 L${bx - 8} 338 L${bx - 14} 326 L${bx - 18} 340 L${bx - 22} 328 Q${bx - 26} 332 ${bx - 27} 344 Z"/>
<path class="k" d="M${bx - 32} 352 q-4 10 0 12 q4 -2 0 -12 Z M${bx + 32} 356 q-4 10 0 12 q4 -2 0 -12 Z M${bx + 8} 292 q-4 10 0 12 q4 -2 0 -12 Z M${bx - 14} 288 q-4 10 0 12 q4 -2 0 -12 Z M${bx - 40} 430 q-4 10 0 12 q4 -2 0 -12 Z M${bx + 42} 450 q-4 10 0 12 q4 -2 0 -12 Z M${bx + 26} 296 q-4 10 0 12 q4 -2 0 -12 Z"/>
<ellipse class="k" cx="${bx - 10}" cy="348" rx="3" ry="4"/><ellipse class="k" cx="${bx + 10}" cy="348" rx="3" ry="4"/>
<path class="h" d="M${bx - 16} 339 q5 -3 10 0 M${bx + 6} 339 q5 -3 10 0 M${bx} 352 q-3 6 2 7"/>
<path class="k" d="M${bx - 12} 360 Q${bx} 366 ${bx + 12} 360 Q${bx + 10} 372 ${bx} 372 Q${bx - 10} 372 ${bx - 12} 360 Z"/>
<path class="w" d="M${bx - 7} 362 Q${bx} 364 ${bx + 7} 362"/>
<path class="h" d="M${bx - 24} 360 q3 3 6 0 M${bx + 18} 360 q3 3 6 0"/>`);
  const R2 = rng(9);
  const near = [];
  for (let i = 0; i < 26; i++) {
    const x = 520 + R2() * 130;
    const y = 270 + R2() * 270;
    const inBody = Math.abs(x - bx) < 34 && y > 300;
    const inArm = Math.abs(Math.abs(x - bx) - 50) < 14 && y > 316 && y < 410;
    if (inBody || inArm) continue;
    near.push(`M${f(x)} ${f(y)} l-5 15`);
  }
  add(`<path class="h" stroke="${tone(0.65)}" stroke-width="2" d="${near.join(' ')}"/>`);
}
