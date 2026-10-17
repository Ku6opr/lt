export default function draw({ add, clip, shade, limb, shoe, tone, pat, rng, f, W, H }) {
  const hill = (t) => {
    const p = [[150, 214], [300, 222], [430, 470], [640, 474]];
    const u = 1 - t;
    return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]);
  };
  const D = {
    hill: `M-10 222 Q60 206 150 214 C300 222 430 470 640 474 L${W + 10} 478 V${H + 10} H-10 Z`,
    ground: `M-10 430 Q300 418 ${W + 10} 424 V${H + 10} H-10 Z`
  };

  const mitten = (x, y, a, fill) => `<g transform="rotate(${a} ${x} ${y})"><path class="o" fill="${fill}" d="M${x - 8} ${y - 6} Q${x - 9} ${y + 11} ${x} ${y + 11} Q${x + 9} ${y + 11} ${x + 8} ${y - 6} Z"/><ellipse class="o" fill="${fill}" cx="${x + 9}" cy="${y + 1}" rx="4" ry="6"/></g>`;

  const fir = (x, y, h, w) => {
    let s = `<rect class="o" fill="${tone(0.6)}" x="${x - 7}" y="${y - 18}" width="14" height="20"/>`;
    for (let i = 0; i < 3; i++) {
      const yb = y - 14 - i * h * 0.26;
      const yt = yb - h * 0.44;
      const hw = (w / 2) * (1 - i * 0.26);
      const tier = `M${x} ${f(yt)} L${f(x + hw)} ${f(yb)} Q${x} ${f(yb - 9)} ${f(x - hw)} ${f(yb)} Z`;
      const cy = yt + (yb - yt) * 0.5;
      const cw = hw * 0.5;
      s += `<path class="o" fill="${tone(0.92)}" d="${tier}"/>`;
      s += shade([{ lin: [x, 0, x + hw, 0], s: [0, 0.5] }], tier);
      s += `<path class="o" d="M${x} ${f(yt)} L${f(x + cw)} ${f(cy)} Q${f(x + cw * 0.5)} ${f(cy + 9)} ${x} ${f(cy + 2)} Q${f(x - cw * 0.5)} ${f(cy + 10)} ${f(x - cw)} ${f(cy)} Z"/>`;
      s += `<path class="o" d="M${f(x - hw + 2)} ${f(yb - 1)} Q${f(x - hw * 0.6)} ${f(yb - 12)} ${f(x - hw * 0.2)} ${f(yb - 5)} Q${f(x - hw * 0.4)} ${f(yb + 3)} ${f(x - hw + 2)} ${f(yb - 1)} Z"/>`;
    }
    return s;
  };

  const flake = (x, y, r) => `<path class="h" d="M${f(x - r)} ${y} H${f(x + r)} M${f(x - r * 0.5)} ${f(y - r * 0.87)} L${f(x + r * 0.5)} ${f(y + r * 0.87)} M${f(x - r * 0.5)} ${f(y + r * 0.87)} L${f(x + r * 0.5)} ${f(y - r * 0.87)}"/>`;

  const hat = (cx, cy, fill, band) => `<path class="o" fill="${fill}" d="M${cx - 30} ${cy - 8} Q${cx - 31} ${cy - 50} ${cx} ${cy - 52} Q${cx + 31} ${cy - 50} ${cx + 30} ${cy - 8} Z"/>
${shade([{ lin: [cx, 0, cx + 30, 0], s: [0, 0.4] }], `M${cx - 30} ${cy - 8} Q${cx - 31} ${cy - 50} ${cx} ${cy - 52} Q${cx + 31} ${cy - 50} ${cx + 30} ${cy - 8} Z`)}
<path class="o" fill="${band}" d="M${cx - 32} ${cy - 22} Q${cx} ${cy - 30} ${cx + 32} ${cy - 22} L${cx + 32} ${cy - 6} Q${cx} ${cy - 14} ${cx - 32} ${cy - 6} Z"/>
<circle class="o" fill="${fill}" cx="${cx}" cy="${cy - 58}" r="11"/>
<path class="h" d="M${cx - 6} ${cy - 62} l3 4 M${cx + 3} ${cy - 64} l2 5 M${cx - 2} ${cy - 54} l3 3"/>`;

  add(`<path class="o" d="M228 78 Q232 52 262 56 Q276 32 306 42 Q330 30 346 52 Q374 50 372 76 Q376 92 352 92 L246 92 Q222 94 228 78 Z"/>
<path class="o" d="M560 116 Q562 92 590 96 Q604 72 634 82 Q660 70 674 94 Q700 94 698 116 Q700 130 678 130 L578 130 Q556 132 560 116 Z"/>`);

  add(`<path class="o" fill="${tone(0.06)}" d="${D.ground}"/>`);
  add(shade([{ lin: [0, 424, 0, 470], s: [0.22, 0] }], D.ground));
  add(`<path class="o" d="${D.hill}" stroke="none"/><path class="t" stroke-width="2.1" d="M-10 222 Q60 206 150 214 C300 222 430 470 640 474"/>`);
  add(`<g ${clip('M-10 222 Q60 206 150 214 C300 222 430 470 640 474 L-10 474 Z')}>${shade([{ rad: [440, 480, 320, 200], s: 0.4 }])}</g>`);
  add(shade([{ lin: [0, 500, 0, 600], s: [0, 0.18] }], D.hill));
  add(`<path class="h" d="M250 260 q20 10 34 30 M330 360 q24 20 40 30 M180 300 q18 6 30 18 M470 520 q40 8 80 4 M90 470 q40 8 70 2 M640 560 q30 6 60 0" stroke="${tone(0.5)}"/>`);

  add(shade([{ rad: [70, 232, 60, 10], s: 0.6 }]));
  add(shade([{ rad: [148, 230, 52, 9], s: 0.6 }]));
  add(shade([{ rad: [218, 238, 44, 8], s: 0.55 }]));
  add(fir(48, 226, 196, 104));
  add(fir(128, 222, 160, 90));
  add(fir(204, 232, 128, 76));

  const hx = 128;
  const hy = 540;
  add(shade([{ rad: [hx + 14, hy + 30, 70, 9], s: 0.7 }]));
  add(`<circle class="o" cx="${hx - 40}" cy="${hy - 6}" r="11"/>
<ellipse class="o" cx="${hx}" cy="${hy}" rx="44" ry="30"/>
${shade([{ lin: [hx - 10, hy - 30, hx + 30, hy + 30], s: [0, 0.35] }], `M${hx - 44} ${hy} A44 30 0 1 1 ${hx + 44} ${hy} A44 30 0 1 1 ${hx - 44} ${hy} Z`)}
<ellipse class="o" cx="${hx - 18}" cy="${hy + 12}" rx="24" ry="17"/>
<path class="o" d="M${hx - 34} ${hy + 30} Q${hx - 40} ${hy + 22} ${hx - 26} ${hy + 20} L${hx + 2} ${hy + 22} Q${hx + 8} ${hy + 30} ${hx} ${hy + 31} Z"/>
<path class="o" d="M${hx + 26} ${hy + 30} Q${hx + 22} ${hy + 18} ${hx + 32} ${hy + 14} L${hx + 40} ${hy + 18} L${hx + 44} ${hy + 31} Z"/>
<ellipse class="o" cx="${hx + 18}" cy="${hy - 70}" rx="8" ry="30" transform="rotate(-18 ${hx + 18} ${hy - 70})"/>
<ellipse class="o" fill="${tone(0.35)}" cx="${hx + 18}" cy="${hy - 70}" rx="3.5" ry="22" transform="rotate(-18 ${hx + 18} ${hy - 70})"/>
<ellipse class="o" cx="${hx + 34}" cy="${hy - 68}" rx="8" ry="30" transform="rotate(8 ${hx + 34} ${hy - 68})"/>
<ellipse class="o" fill="${tone(0.35)}" cx="${hx + 34}" cy="${hy - 68}" rx="3.5" ry="22" transform="rotate(8 ${hx + 34} ${hy - 68})"/>
<ellipse class="o" cx="${hx + 36}" cy="${hy - 26}" rx="24" ry="21"/>
<circle class="k" cx="${hx + 44}" cy="${hy - 30}" r="3.6"/>
<path class="k" d="M${hx + 57} ${hy - 24} l4 2 l-4 3 Z"/>
<path class="h" d="M${hx + 56} ${hy - 18} q-4 4 -8 2 M${hx + 54} ${hy - 22} l16 -4 M${hx + 54} ${hy - 20} l16 2"/>`);

  const R = rng(11);
  const flakes = [];
  for (let i = 0; i < 70; i++) {
    const x = 10 + R() * 780;
    const y = 10 + R() * 420;
    flakes.push(flake(f(x), f(y), 3.5 + R() * 2.5));
  }
  add(flakes.join(''));

  const a = 31;
  const [bx, by] = hill(0.44);
  add(`<g transform="translate(${f(bx)} ${f(by)}) rotate(${a})">
${shade([{ rad: [6, 4, 74, 7], s: 0.6 }])}
<path class="t" stroke-width="5" d="M-66 0 H44 Q70 0 66 -24"/>
<path class="t" stroke-width="4" d="M-46 0 V-18 M-8 0 V-18 M30 0 V-18"/>
<rect class="o" fill="${tone(0.45)}" x="-62" y="-26" width="102" height="10" rx="2"/>
<path class="t" d="M64 -22 Q50 -42 30 -50" stroke-width="2"/>
${limb([[-26, -36], [10, -46], [36, -32]], 22, 19, tone(0.75))}
${shoe(48, -24, 1)}
<g transform="rotate(-30 -30 -30)">
<path class="o" fill="${tone(0.42)}" d="M-56 -28 Q-60 -84 -42 -96 Q-30 -102 -16 -96 Q-2 -84 -4 -28 Z"/>
${shade([{ lin: [-30, 0, -4, 0], s: [0, 0.45] }], 'M-56 -28 Q-60 -84 -42 -96 Q-30 -102 -16 -96 Q-2 -84 -4 -28 Z')}
<path class="t" d="M-30 -96 V-30"/>
<rect class="o" x="-36" y="-108" width="12" height="12"/>
<path class="o" fill="${tone(0.7)}" d="M-50 -104 Q-30 -94 -10 -104 L-10 -92 Q-30 -82 -50 -92 Z"/>
<path class="o" fill="${tone(0.7)}" d="M-48 -98 Q-70 -92 -88 -100 L-90 -88 Q-70 -80 -48 -88 Z"/>
<path class="h" d="M-90 -88 l-4 6 M-88 -94 l-6 2"/>
</g>
${limb([[-46, -80], [-14, -62], [18, -52]], 15, 13, tone(0.42))}
${mitten(24, -50, -75, tone(0.75))}
<g transform="rotate(-30 -30 -30)">
<ellipse class="o" cx="-30" cy="-138" rx="27" ry="31"/>
<path class="k" d="M-54 -146 Q-44 -136 -34 -146 Q-28 -136 -18 -146 Q-12 -138 -6 -146 L-6 -156 L-54 -156 Z"/>
${hat(-30, -138, pat('stH'), tone(0.75))}
<ellipse class="k" cx="-40" cy="-134" rx="3" ry="4"/><ellipse class="k" cx="-20" cy="-134" rx="3" ry="4"/>
<path class="h" d="M-30 -130 q-3 6 2 7"/>
<path class="k" d="M-41 -123 Q-30 -118 -19 -123 Q-21 -111 -30 -111 Q-39 -111 -41 -123 Z"/>
<path class="w" d="M-37 -121 Q-30 -119 -23 -121"/>
<path class="h" d="M-52 -124 q3 3 6 0 M-14 -124 q3 3 6 0"/>
</g></g>`);

  const gx = 586;
  add(shade([{ rad: [604, 566, 50, 9], s: 0.7 }]));
  add(shade([{ rad: [470, 562, 70, 8], s: 0.6 }]));
  add(`<path class="t" stroke-width="5" d="M402 556 H496 Q518 556 514 534"/>
<path class="t" stroke-width="4" d="M418 556 V540 M452 556 V540 M486 556 V540"/>
<rect class="o" fill="${tone(0.45)}" x="404" y="532" width="96" height="10" rx="2"/>
<path class="t" stroke-width="2" d="M508 540 Q520 500 548 470"/>`);
  add(limb([[gx - 12, 470], [gx - 16, 548]], 18, 15, tone(0.75)));
  add(limb([[gx + 12, 470], [gx + 18, 548]], 18, 15, tone(0.75)));
  add(`${shoe(gx - 20, 562, -1)}${shoe(gx + 22, 562, 1)}`);
  const coat = `M${gx - 34} 482 Q${gx - 36} 400 ${gx - 24} 382 Q${gx} 372 ${gx + 24} 382 Q${gx + 36} 400 ${gx + 34} 482 Z`;
  add(`<path class="o" fill="${tone(0.3)}" d="${coat}"/>
${shade([{ lin: [gx, 0, gx + 34, 0], s: [0, 0.45] }], coat)}
<path class="t" d="M${gx} 382 V482"/>
<circle class="k" cx="${gx - 8}" cy="408" r="3"/><circle class="k" cx="${gx - 8}" cy="432" r="3"/><circle class="k" cx="${gx - 8}" cy="456" r="3"/>
<path class="o" fill="${tone(0.6)}" d="M${gx - 36} 474 L${gx + 36} 474 L${gx + 37} 484 L${gx - 37} 484 Z"/>`);
  add(limb([[gx - 26, 392], [gx - 46, 432], [gx - 40, 466]], 16, 14, tone(0.3)));
  add(limb([[gx + 26, 392], [gx + 40, 430], [gx + 38, 462]], 16, 14, tone(0.3)));
  add(`${mitten(gx - 40, 470, 10, tone(0.75))}${mitten(gx + 38, 466, -10, tone(0.75))}`);
  add(`<rect class="o" x="${gx - 6}" y="366" width="12" height="14"/>
<path class="o" fill="${pat('stH')}" d="M${gx - 24} 370 Q${gx} 384 ${gx + 24} 370 L${gx + 25} 384 Q${gx} 398 ${gx - 25} 384 Z"/>
<path class="o" fill="${pat('stH')}" d="M${gx + 8} 388 L${gx + 22} 386 L${gx + 26} 436 L${gx + 12} 438 Z"/>
<path class="h" d="M${gx + 13} 438 l-1 7 M${gx + 19} 437 v7 M${gx + 25} 436 l1 7"/>
${limb([[gx - 24, 334], [gx - 34, 358], [gx - 36, 384]], 12, 10, '#111')}
${limb([[gx + 24, 334], [gx + 34, 358], [gx + 36, 384]], 12, 10, '#111')}
<path class="w" d="M${gx - 33} 352 l-6 4 M${gx - 35} 364 l-6 4 M${gx - 36} 376 l-6 4 M${gx + 33} 352 l6 4 M${gx + 35} 364 l6 4 M${gx + 36} 376 l6 4"/>
<path class="o" fill="${tone(0.5)}" d="M${gx - 36} 388 l-10 -6 v12 Z M${gx - 36} 388 l10 -6 v12 Z M${gx + 36} 388 l-10 -6 v12 Z M${gx + 36} 388 l10 -6 v12 Z"/>
<ellipse class="o" cx="${gx}" cy="336" rx="27" ry="31"/>
<path class="k" d="M${gx - 26} 326 Q${gx - 12} 334 ${gx - 2} 320 Q${gx + 10} 334 ${gx + 26} 326 L${gx + 26} 316 L${gx - 26} 316 Z"/>
${hat(gx, 336, tone(0.5), pat('stV'))}
<ellipse class="k" cx="${gx - 10}" cy="340" rx="3" ry="4"/><ellipse class="k" cx="${gx + 10}" cy="340" rx="3" ry="4"/>
<path class="h" d="M${gx - 16} 331 q5 -3 10 0 M${gx + 6} 331 q5 -3 10 0 M${gx} 344 q-3 6 2 7"/>
<path class="t" d="M${gx - 8} 355 q8 6 16 0"/>
<path class="h" d="M${gx - 22} 350 q3 3 6 0 M${gx + 16} 350 q3 3 6 0"/>`);

  const sx = 730;
  const balls = [[sx, 508, 62], [sx, 424, 46], [sx, 356, 34]];
  add(shade([{ rad: [sx + 34, 570, 92, 12], s: 0.75 }]));
  add(`<path class="t" d="M${sx - 40} 418 L${sx - 76} 350 M${sx - 64} 372 l-16 -6 M${sx - 70} 362 l2 -16"/>
<path class="t" d="M${sx + 40} 420 L${sx + 64} 374 M${sx + 56} 390 l14 -2 M${sx + 59} 384 l-4 -14"/>`);
  for (const [x, y, r] of balls) {
    const d = `M${x - r} ${y} A${r} ${r} 0 1 1 ${x + r} ${y} A${r} ${r} 0 1 1 ${x - r} ${y} Z`;
    add(`<path class="o" d="${d}"/>${shade([{ lin: [x - r * 0.3, y - r, x + r, y + r * 0.4], s: [0, 0.5] }], d)}`);
  }
  add(`<circle class="k" cx="${sx}" cy="404" r="5"/><circle class="k" cx="${sx}" cy="428" r="5"/><circle class="k" cx="${sx}" cy="452" r="5"/>
<path class="o" fill="${pat('check')}" d="M${sx - 36} 384 Q${sx} 398 ${sx + 36} 384 L${sx + 37} 398 Q${sx} 412 ${sx - 37} 398 Z"/>
<path class="o" fill="${pat('check')}" d="M${sx + 18} 402 L${sx + 34} 398 L${sx + 44} 448 L${sx + 28} 452 Z"/>
<circle class="k" cx="${sx - 12}" cy="346" r="4.5"/><circle class="k" cx="${sx + 12}" cy="346" r="4.5"/>
<path class="o" fill="${tone(0.55)}" d="M${sx - 2} 354 L${sx - 44} 366 L${sx - 2} 364 Z"/>
<path class="h" d="M${sx - 14} 358 v5 M${sx - 26} 361 v4"/>
${[-14, -7, 0, 7, 14].map((dx) => `<circle class="k" cx="${sx + dx}" cy="${374 + Math.abs(dx) * -0.18}" r="2.4"/>`).join('')}
<path class="o" fill="${tone(0.7)}" d="M${sx - 26} 330 L${sx - 20} 286 L${sx + 20} 286 L${sx + 26} 330 Z"/>
${shade([{ lin: [sx, 0, sx + 26, 0], s: [0, 0.5] }], `M${sx - 26} 330 L${sx - 20} 286 L${sx + 20} 286 L${sx + 26} 330 Z`)}
<ellipse class="o" fill="${tone(0.4)}" cx="${sx}" cy="286" rx="20" ry="5"/>`);
}
