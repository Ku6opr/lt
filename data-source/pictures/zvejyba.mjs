export default function draw({ add, shade, limb, hand, tone, pat, rng, f, W, H }) {
  const D = {
    lake: `M-10 246 H${W + 10} V${H + 10} H-10 Z`,
    shore: `M-10 222 Q200 214 400 220 Q600 226 ${W + 10} 218 V246 H-10 Z`,
    hull: 'M196 402 L616 396 Q604 466 532 484 L298 486 Q222 474 196 402 Z',
    vest: 'M296 310 Q300 290 330 290 Q360 290 364 310 L370 410 L290 410 Z',
    tee: 'M476 344 Q480 328 502 328 Q524 328 528 344 L532 410 L472 410 Z'
  };

  const sun = [78, 62, 28];
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `M${f(sun[0] + Math.cos(a) * 37)} ${f(sun[1] + Math.sin(a) * 37)} L${f(sun[0] + Math.cos(a) * 50)} ${f(sun[1] + Math.sin(a) * 50)}`;
  });
  add(`<path class="t" stroke-width="3" d="${rays.join(' ')}"/><circle class="o" cx="${sun[0]}" cy="${sun[1]}" r="${sun[2]}"/>`);
  add(`<path class="o" d="M330 70 Q332 48 358 52 Q372 30 400 40 Q422 30 436 50 Q462 50 460 72 Q462 86 440 86 L348 86 Q326 88 330 70 Z"/>
<path class="o" d="M590 104 Q592 84 616 88 Q630 66 656 76 Q676 66 690 86 Q714 86 712 106 Q714 118 694 118 L606 118 Q586 120 590 104 Z"/>`);

  add(`<path class="o" fill="${tone(0.22)}" d="${D.lake}"/>`);
  add(shade([{ lin: [0, 246, 0, 600], s: [0, 0.35] }], D.lake));

  const trees = [];
  const R = rng(14);
  for (let i = 0; i < 15; i++) {
    const x = -10 + i * 58 + R() * 20;
    const h = 56 + R() * 30;
    const base = 228;
    if (i % 3 === 1) {
      trees.push(`<path class="o" fill="${tone(0.75)}" d="M${f(x)} ${f(base - h - 20)} L${f(x + 26)} ${base} L${f(x - 26)} ${base} Z"/>`);
    } else {
      const r = 26 + R() * 10;
      trees.push(`<rect class="o" fill="${tone(0.6)}" x="${f(x - 4)}" y="${f(base - 30)}" width="8" height="30"/><ellipse class="o" fill="${tone(0.45)}" cx="${f(x)}" cy="${f(base - h + 10)}" rx="${f(r)}" ry="${f(h * 0.5)}"/>`);
    }
  }
  add(trees.join(''));
  add(`<path class="o" fill="${tone(0.35)}" d="${D.shore}"/>
`);

  const RW = rng(2);
  const ripples = [];
  for (let i = 0; i < 34; i++) {
    const x = RW() * W;
    const y = 262 + RW() * 330;
    if (x > 180 && x < 640 && y > 380 && y < 500) continue;
    if (x > 40 && x < 210 && y > 450 && y < 550) continue;
    const w = 16 + RW() * 22;
    ripples.push(`M${f(x)} ${f(y)} q${f(w / 4)} -4 ${f(w / 2)} 0 q${f(w / 4)} 4 ${f(w / 2)} 0`);
  }
  add(`<path class="w" stroke-width="2.2" d="${ripples.join(' ')}"/>`);

  add(shade([{ rad: [420, 500, 240, 26], s: 0.8 }]));

  const ax = 120;
  const ay = 530;
  add(`<path class="w" stroke-width="2.4" d="M${ax - 60} ${ay + 10} q20 -6 40 0 q20 6 40 0 q20 -6 40 0"/>
<path class="o" d="M${ax - 50} ${ay - 10} Q${ax - 56} ${ay - 34} ${ax - 34} ${ay - 26} Q${ax - 10} ${ay - 34} ${ax + 20} ${ay - 26} Q${ax + 46} ${ay - 22} ${ax + 40} ${ay} Q${ax} ${ay + 8} ${ax - 50} ${ay - 10} Z"/>
${shade([{ lin: [ax - 10, ay - 30, ax + 10, ay + 4], s: [0, 0.4] }], `M${ax - 50} ${ay - 10} Q${ax - 56} ${ay - 34} ${ax - 34} ${ay - 26} Q${ax - 10} ${ay - 34} ${ax + 20} ${ay - 26} Q${ax + 46} ${ay - 22} ${ax + 40} ${ay} Q${ax} ${ay + 8} ${ax - 50} ${ay - 10} Z`)}
<path class="o" fill="${tone(0.5)}" d="M${ax - 30} ${ay - 22} Q${ax - 4} ${ay - 32} ${ax + 18} ${ay - 18} Q${ax - 4} ${ay - 8} ${ax - 30} ${ay - 22} Z"/>
<path class="o" fill="${tone(0.75)}" d="M${ax + 26} ${ay - 22} Q${ax + 20} ${ay - 50} ${ax + 34} ${ay - 60} Q${ax + 52} ${ay - 66} ${ax + 56} ${ay - 48} Q${ax + 56} ${ay - 36} ${ax + 42} ${ay - 30} Q${ax + 40} ${ay - 18} ${ax + 36} ${ay - 14} Z"/>
<path class="o" d="M${ax + 30} ${ay - 32} Q${ax + 38} ${ay - 26} ${ax + 40} ${ay - 18} L${ax + 32} ${ay - 16} Z" fill="${tone(0.15)}"/>
<path class="o" fill="${tone(0.4)}" d="M${ax + 54} ${ay - 50} L${ax + 72} ${ay - 46} Q${ax + 70} ${ay - 40} ${ax + 54} ${ay - 42} Z"/>
<circle class="k" cx="${ax + 44}" cy="${ay - 50}" r="3"/>
<circle cx="${ax + 45}" cy="${ay - 51}" r="1" fill="#fff"/>`);

  add(`<path class="t" stroke-width="3.2" d="M296 376 L86 176"/>
<path class="h" d="M86 176 L86 436"/>
<path class="o" d="M86 432 a6 8 0 1 1 0.1 0 Z"/>
<path class="k" d="M80 438 a6 6 0 0 0 12 0 Z"/>
<path class="w" stroke-width="2" d="M66 446 q20 6 40 0 M58 454 q28 8 56 0"/>`);

  add(`<path class="t" stroke-width="3.2" d="M532 352 L722 192"/>
<path class="h" d="M722 192 L722 300"/>`);
  const fx = 722;
  const fy = 300;
  const fish = `M${fx} ${fy} Q${fx + 22} ${fy + 20} ${fx + 18} ${fy + 56} Q${fx + 12} ${fy + 80} ${fx} ${fy + 88} Q${fx - 12} ${fy + 80} ${fx - 18} ${fy + 56} Q${fx - 22} ${fy + 20} ${fx} ${fy} Z`;
  add(`<path class="o" fill="${tone(0.4)}" d="M${fx} ${fy + 84} L${fx + 20} ${fy + 112} L${fx - 20} ${fy + 112} Z"/>
<path class="o" fill="${tone(0.4)}" d="M${fx + 16} ${fy + 44} l14 8 l-12 6 Z M${fx - 16} ${fy + 44} l-14 8 l12 6 Z"/>
<path class="o" fill="${tone(0.25)}" d="${fish}"/>
${shade([{ lin: [fx, 0, fx + 20, 0], s: [0, 0.5] }], fish)}
<path class="h" d="M${fx - 12} ${fy + 22} Q${fx} ${fy + 30} ${fx + 12} ${fy + 22}"/>
<path class="h" d="M${fx - 8} ${fy + 48} q4 4 8 0 q4 4 8 0 M${fx - 10} ${fy + 60} q4 4 8 0 q4 4 8 0 q4 4 4 0 M${fx - 6} ${fy + 72} q4 4 8 0 q4 4 4 0"/>
<circle class="o" cx="${fx - 7}" cy="${fy + 14}" r="4"/><circle class="k" cx="${fx - 7}" cy="${fy + 14}" r="2"/>
<circle class="o" cx="${fx + 7}" cy="${fy + 14}" r="4"/><circle class="k" cx="${fx + 7}" cy="${fy + 14}" r="2"/>
<path class="k" d="M${fx - 4} ${fy + 2} q4 4 8 0 Z"/>
<path class="w" stroke-width="2" d="M${fx - 30} ${fy + 40} l-8 -4 M${fx - 30} ${fy + 54} l-10 0 M${fx + 30} ${fy + 40} l8 -4 M${fx + 30} ${fy + 54} l10 0" stroke="#111"/>`);

  const gx = 330;
  add(`<path class="o" fill="${tone(0.55)}" d="M398 372 L432 372 L430 408 L400 408 Z"/>
<ellipse class="o" fill="${tone(0.3)}" cx="415" cy="372" rx="17" ry="5"/>
<path class="t" d="M400 376 Q415 352 430 376"/>`);
  add(`<path class="o" fill="${tone(0.45)}" d="${D.vest}"/>
${shade([{ lin: [gx, 0, gx + 40, 0], s: [0, 0.45] }], D.vest)}
<path class="o" fill="${pat('check')}" d="M${gx - 14} 292 L${gx} 318 L${gx + 14} 292 Z"/>
<path class="t" d="M${gx} 318 V410"/>
<rect class="o" fill="${tone(0.45)}" x="${gx - 28}" y="346" width="20" height="16"/><rect class="o" fill="${tone(0.45)}" x="${gx + 8}" y="346" width="20" height="16"/>`);
  add(limb([[gx - 26, 310], [gx - 30, 350], [gx - 50, 362]], 18, 15, pat('check')));
  add(limb([[gx + 26, 310], [gx + 10, 356], [gx - 22, 350]], 18, 15, pat('check')));
  add(`${hand(gx - 54, 362, 60)}${hand(gx - 26, 350, 60)}`);
  add(`<rect class="o" x="${gx - 6}" y="270" width="12" height="22"/>
<ellipse class="o" cx="${gx}" cy="244" rx="28" ry="33"/>
<path class="o" d="M${gx - 28} 252 Q${gx - 30} 232 ${gx - 24} 226 Q${gx - 20} 238 ${gx - 22} 256 Z M${gx + 28} 252 Q${gx + 30} 232 ${gx + 24} 226 Q${gx + 20} 238 ${gx + 22} 256 Z"/>
<path class="o" fill="${tone(0.5)}" d="M${gx - 26} 228 Q${gx - 26} 196 ${gx} 194 Q${gx + 26} 196 ${gx + 26} 228 Z"/>
${shade([{ lin: [gx, 0, gx + 26, 0], s: [0, 0.45] }], `M${gx - 26} 228 Q${gx - 26} 196 ${gx} 194 Q${gx + 26} 196 ${gx + 26} 228 Z`)}
<path class="o" fill="${tone(0.5)}" d="M${gx - 44} 232 Q${gx} 216 ${gx + 44} 232 Q${gx} 226 ${gx - 44} 232 Z"/>
<path class="h" d="M${gx - 25} 220 Q${gx} 214 ${gx + 25} 220"/>
<ellipse class="k" cx="${gx - 10}" cy="246" rx="3" ry="4"/><ellipse class="k" cx="${gx + 10}" cy="246" rx="3" ry="4"/>
<path class="t" d="M${gx - 17} 237 q6 -3 12 0 M${gx + 5} 237 q6 -3 12 0"/>
<path class="h" d="M${gx} 248 q-4 9 2 10"/>
<path class="o" d="M${gx - 18} 264 Q${gx - 9} 254 ${gx} 260 Q${gx + 9} 254 ${gx + 18} 264 Q${gx + 9} 268 ${gx} 264 Q${gx - 9} 268 ${gx - 18} 264 Z"/>
<path class="t" d="M${gx - 6} 270 q6 3 12 0"/>`);

  const bx = 502;
  add(`<path class="o" fill="${pat('stH')}" d="${D.tee}"/>
${shade([{ lin: [bx, 0, bx + 28, 0], s: [0, 0.45] }], D.tee)}`);
  add(limb([[bx - 20, 340], [bx - 2, 372], [bx + 26, 360]], 13, 11, pat('stH')));
  add(limb([[bx + 20, 340], [bx + 40, 362], [bx + 44, 350]], 13, 11, pat('stH')));
  add(`${hand(bx + 28, 358, -60)}${hand(bx + 46, 346, -60)}`);
  add(`<rect class="o" x="${bx - 6}" y="314" width="12" height="16"/>
<ellipse class="o" cx="${bx}" cy="290" rx="26" ry="29"/>
<path class="k" d="M${bx - 26} 290 Q${bx - 28} 258 ${bx} 258 Q${bx + 28} 258 ${bx + 26} 290 Q${bx + 22} 276 ${bx + 16} 274 L${bx + 13} 284 L${bx + 8} 272 L${bx + 2} 282 L${bx - 4} 270 L${bx - 10} 282 L${bx - 14} 272 L${bx - 18} 284 L${bx - 22} 276 Q${bx - 25} 280 ${bx - 26} 290 Z"/>
<ellipse class="k" cx="${bx - 9}" cy="292" rx="3" ry="4"/><ellipse class="k" cx="${bx + 9}" cy="292" rx="3" ry="4"/>
<path class="h" d="M${bx - 15} 283 q5 -3 10 0 M${bx + 5} 283 q5 -3 10 0 M${bx} 296 q-3 6 2 7"/>
<path class="k" d="M${bx - 11} 304 Q${bx} 310 ${bx + 11} 304 Q${bx + 9} 315 ${bx} 315 Q${bx - 9} 315 ${bx - 11} 304 Z"/>
<path class="w" d="M${bx - 6} 306 Q${bx} 308 ${bx + 6} 306"/>
<path class="h" d="M${bx - 22} 304 q3 3 6 0 M${bx + 16} 304 q3 3 6 0"/>`);

  add(`<path class="o" fill="${tone(0.55)}" d="${D.hull}"/>
${shade([{ lin: [420, 400, 420, 486], s: [0, 0.45] }], D.hull)}
<path class="h" d="M206 428 Q400 432 604 424 M222 452 Q400 458 590 448"/>
<path class="o" fill="${tone(0.3)}" d="M192 396 L620 390 L616 404 L196 410 Z"/>
<path class="w" stroke-width="2.4" d="M180 486 q20 -6 40 0 q20 6 40 0 M560 488 q20 -6 40 0 q20 6 40 0 M300 496 q30 -6 60 0 q30 6 60 0 q30 -6 60 0"/>`);
}
