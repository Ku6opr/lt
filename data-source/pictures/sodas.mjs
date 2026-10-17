export default function draw({ add, shade, limb, hand, shoe, tone, pat, rng, f, W, H }) {
  const D = {
    ground: `M-10 398 H${W + 10} V${H + 10} H-10 Z`,
    wall: 'M524 196 H770 V400 H524 Z',
    roof: 'M500 204 L646 92 L792 204 Z',
    shirt: 'M136 232 Q140 212 170 212 Q200 212 204 232 L208 352 L132 352 Z',
    tee: 'M458 384 Q462 368 484 368 Q506 368 510 384 L514 452 L454 452 Z'
  };

  const sun = [92, 82, 36];
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `M${f(sun[0] + Math.cos(a) * 48)} ${f(sun[1] + Math.sin(a) * 48)} L${f(sun[0] + Math.cos(a) * 64)} ${f(sun[1] + Math.sin(a) * 64)}`;
  });
  add(`<path class="t" stroke-width="3" d="${rays.join(' ')}"/><circle class="o" cx="${sun[0]}" cy="${sun[1]}" r="${sun[2]}"/>`);
  add(`<path class="o" d="M300 78 Q302 56 328 60 Q342 38 370 48 Q392 38 406 58 Q432 58 430 80 Q432 94 410 94 L318 94 Q296 96 300 78 Z"/>`);

  add(`<path class="o" fill="${tone(0.06)}" d="${D.wall}"/>
${shade([{ lin: [640, 0, 770, 0], s: [0, 0.4] }], D.wall)}
<rect class="o" fill="${tone(0.5)}" x="700" y="110" width="26" height="64"/>
<path class="o" fill="#222" d="${D.roof}"/>
<path class="w" d="M540 190 L646 108 L752 190" stroke-width="1.5"/>
<rect class="o" fill="${tone(0.3)}" x="556" y="232" width="74" height="70"/>
${shade([{ lin: [556, 232, 630, 302], s: [0.3, 0.05] }], 'M556 232 H630 V302 H556 Z')}
<path class="t" d="M593 232 V302 M556 267 H630"/>
<rect class="o" x="550" y="302" width="86" height="9"/>
<rect class="o" fill="${tone(0.55)}" x="676" y="270" width="54" height="130"/>
<circle class="k" cx="720" cy="338" r="4"/>`);

  add(`<path class="o" fill="${tone(0.12)}" d="${D.ground}"/>`);
  add(shade([{ lin: [0, 398, 0, 450], s: [0.3, 0] }], D.ground));
  const RG = rng(4);
  const tufts = [];
  for (let i = 0; i < 46; i++) {
    const x = RG() * W;
    const y = 470 + RG() * 125;
    tufts.push(`M${f(x - 5)} ${f(y)} l2 -8 M${f(x)} ${f(y)} l0 -10 M${f(x + 5)} ${f(y)} l-2 -8`);
  }
  add(`<path class="h" stroke="${tone(0.6)}" d="${tufts.join(' ')}"/>`);

  const pickets = [];
  for (let x = -6; x < W; x += 28) pickets.push(`<path class="o" d="M${x} 404 V336 L${x + 9} 324 L${x + 18} 336 V404 Z"/>`);
  add(`<rect class="o" fill="${tone(0.35)}" x="-10" y="348" width="${W + 20}" height="10"/><rect class="o" fill="${tone(0.35)}" x="-10" y="380" width="${W + 20}" height="10"/>${pickets.join('')}`);
  add(shade([{ lin: [0, 398, 0, 418], s: [0.5, 0] }], `M-10 404 H${W + 10} V418 H-10 Z`));

  const bx = 414;
  const by = 322;
  add(`<path class="o" fill="${tone(0.45)}" d="M${bx - 26} ${by - 8} L${bx - 44} ${by - 20} L${bx - 40} ${by - 4} Z"/>
<ellipse class="o" fill="${tone(0.45)}" cx="${bx - 10}" cy="${by - 14}" rx="22" ry="14"/>
${shade([{ lin: [bx - 10, by - 28, bx + 6, by], s: [0, 0.4] }], `M${bx - 32} ${by - 14} A22 14 0 1 1 ${bx + 12} ${by - 14} A22 14 0 1 1 ${bx - 32} ${by - 14} Z`)}
<circle class="o" fill="${tone(0.45)}" cx="${bx + 10}" cy="${by - 30}" r="12"/>
<path class="o" fill="${tone(0.6)}" d="M${bx - 18} ${by - 18} Q${bx - 4} ${by - 26} ${bx + 4} ${by - 12} Q${bx - 8} ${by - 6} ${bx - 18} ${by - 18} Z"/>
<circle class="k" cx="${bx + 13}" cy="${by - 32}" r="2.4"/>
<path class="k" d="M${bx + 21} ${by - 32} l9 3 l-9 3 Z"/>
<path class="t" d="M${bx - 14} ${by} v4 M${bx - 4} ${by} v4"/>`);

  const fl = [592, 636, 680, 724, 768];
  add(shade([{ rad: [690, 448, 120, 12], s: 0.6 }]));
  add(fl.map((x, i) => {
    const top = 362 + (i % 2) * 14;
    const head = i % 2 ? tone(0.35) : tone(0.7);
    return `<path class="t" d="M${x} 446 Q${x - 3} ${(446 + top) / 2} ${x} ${top}"/>
<path class="o" fill="${tone(0.5)}" d="M${x} 440 Q${x - 26} 420 ${x - 20} 396 Q${x - 6} 414 ${x} 440 Z M${x} 444 Q${x + 24} 426 ${x + 20} 404 Q${x + 6} 418 ${x} 444 Z"/>
<path class="o" fill="${head}" d="M${x - 16} ${top - 30} L${x - 8} ${top - 18} L${x} ${top - 34} L${x + 8} ${top - 18} L${x + 16} ${top - 30} Q${x + 18} ${top} ${x} ${top} Q${x - 18} ${top} ${x - 16} ${top - 30} Z"/>
${shade([{ lin: [x, 0, x + 18, 0], s: [0, 0.45] }], `M${x - 16} ${top - 30} L${x + 16} ${top - 30} Q${x + 18} ${top} ${x} ${top} Q${x - 18} ${top} ${x - 16} ${top - 30} Z`)}`;
  }).join(''));
  add(`<path class="o" fill="${tone(0.7)}" d="M570 446 Q680 436 792 446 L796 462 Q680 472 566 462 Z"/>`);

  const ux = 708;
  const uy = 236;
  add(`<g transform="rotate(-12 ${ux} ${uy})"><path class="o" fill="${pat('dots')}" d="M${ux} ${uy} Q${ux - 30} ${uy - 34} ${ux - 34} ${uy - 10} Q${ux - 30} ${uy + 4} ${ux} ${uy} Z M${ux} ${uy} Q${ux + 30} ${uy - 34} ${ux + 34} ${uy - 10} Q${ux + 30} ${uy + 4} ${ux} ${uy} Z"/>
<path class="o" fill="${tone(0.5)}" d="M${ux} ${uy} Q${ux - 22} ${uy + 4} ${ux - 22} ${uy + 18} Q${ux - 8} ${uy + 16} ${ux} ${uy} Z M${ux} ${uy} Q${ux + 22} ${uy + 4} ${ux + 22} ${uy + 18} Q${ux + 8} ${uy + 16} ${ux} ${uy} Z"/>
<ellipse class="k" cx="${ux}" cy="${uy + 2}" rx="3.5" ry="14"/>
<path class="h" d="M${ux - 1} ${uy - 11} q-4 -10 -10 -12 M${ux + 1} ${uy - 11} q4 -10 10 -12"/></g>`);

  const gx = 486;
  add(shade([{ rad: [500, 566, 64, 10], s: 0.75 }]));
  add(limb([[gx - 13, 450], [gx - 14, 548]], 15, 13));
  add(limb([[gx + 13, 450], [gx + 14, 548]], 15, 13));
  add(`${shoe(gx - 18, 562, -1)}${shoe(gx + 18, 562, 1)}`);
  add(`<path class="o" fill="${tone(0.75)}" d="M${gx - 30} 440 L${gx + 30} 440 L${gx + 33} 478 L${gx + 4} 478 L${gx} 466 L${gx - 4} 478 L${gx - 33} 478 Z"/>
<path class="o" fill="${pat('stH')}" d="${D.tee}"/>
${shade([{ lin: [gx, 0, gx + 28, 0], s: [0, 0.45] }], D.tee)}`);

  const kx = 560;
  const ky = 378;
  const bucket = `M${kx - 24} ${ky - 26} L${kx + 22} ${ky - 32} L${kx + 18} ${ky + 18} L${kx - 16} ${ky + 22} Z`;
  add(`<path class="o" fill="${tone(0.3)}" d="M${kx + 16} ${ky - 32} Q${kx + 54} ${ky - 26} ${kx + 62} ${ky + 34} L${kx + 46} ${ky + 36} Q${kx + 40} ${ky - 8} ${kx + 14} ${ky - 18} Z"/>
<path class="w" stroke-width="2" d="M${kx + 26} ${ky - 26} Q${kx + 46} ${ky - 18} ${kx + 52} ${ky + 20}"/>
<path class="o" fill="${tone(0.3)}" d="M${kx + 50} ${ky + 44} q4 7 0 10 q-4 -3 0 -10 Z M${kx + 64} ${ky + 46} q4 7 0 10 q-4 -3 0 -10 Z M${kx + 40} ${ky + 42} q4 7 0 10 q-4 -3 0 -10 Z"/>
<path class="o" fill="${tone(0.5)}" d="${bucket}"/>
${shade([{ lin: [kx, 0, kx + 22, 0], s: [0, 0.45] }], bucket)}
<ellipse class="o" fill="${tone(0.25)}" cx="${kx - 1}" cy="${ky - 29}" rx="23" ry="6" transform="rotate(-8 ${kx - 1} ${ky - 29})"/>
<path class="t" d="M${kx - 20} ${ky - 22} Q${kx - 30} ${ky + 20} ${kx} ${ky + 26}"/>`);
  add(limb([[gx - 22, 376], [gx - 4, 410], [kx - 34, ky + 6]], 13, 11, pat('stH')));
  add(limb([[gx + 22, 376], [gx + 46, 392], [kx - 10, ky - 6]], 13, 11, pat('stH')));
  add(`${hand(kx - 30, ky + 8, -60)}${hand(kx - 6, ky - 6, -60)}`);
  add(`<rect class="o" x="${gx - 6}" y="354" width="12" height="16"/>
<ellipse class="o" cx="${gx}" cy="326" rx="27" ry="31"/>
<path class="k" d="M${gx - 27} 326 Q${gx - 30} 292 ${gx} 292 Q${gx + 30} 292 ${gx + 27} 326 Q${gx + 24} 312 ${gx + 18} 310 L${gx + 14} 318 L${gx + 10} 306 L${gx + 4} 316 L${gx - 2} 304 L${gx - 8} 316 L${gx - 14} 306 L${gx - 18} 318 L${gx - 22} 310 Q${gx - 26} 314 ${gx - 27} 326 Z"/>
<ellipse class="k" cx="${gx - 9}" cy="328" rx="3" ry="4"/><ellipse class="k" cx="${gx + 11}" cy="328" rx="3" ry="4"/>
<path class="h" d="M${gx - 15} 319 q5 -3 10 0 M${gx + 6} 319 q5 -3 10 0 M${gx + 2} 332 q-3 6 2 7"/>
<path class="t" d="M${gx - 7} 344 q8 6 16 0"/>
<path class="h" d="M${gx - 22} 340 q3 3 6 0 M${gx + 16} 340 q3 3 6 0"/>`);

  const gp = 170;
  add(shade([{ rad: [186, 568, 76, 11], s: 0.75 }]));
  add(shade([{ rad: [262, 534, 62, 10], s: 0.6 }]));
  add(`<path class="t" stroke-width="5" d="M84 536 L96 290"/>
<path class="t" stroke-width="3" stroke="${tone(0.5)}" d="M84 536 L96 290"/>
<path class="t" stroke-width="4" d="M84 296 h24"/>
<path class="k" d="M70 532 Q84 528 98 534 L96 568 Q84 578 72 566 Z"/>`);
  add(`<path class="o" fill="${tone(0.7)}" d="M216 528 Q228 506 258 506 Q290 506 304 528 Q260 538 216 528 Z"/>`);
  add(`<path class="t" stroke-width="4" d="M258 512 Q254 420 258 300"/>
<path class="t" d="M257 380 Q236 360 226 334 M258 350 Q280 330 290 304 M257 320 Q244 300 236 280"/>
${[[226, 334, -50], [232, 322, 10], [236, 280, -40], [244, 270, 20], [290, 304, 40], [282, 296, -20], [258, 296, 0], [266, 286, 30], [250, 286, -30], [240, 360, -70], [276, 336, 60], [272, 346, 10]].map(([x, y, a]) => `<ellipse class="o" fill="${tone(0.5)}" cx="${x}" cy="${y}" rx="5.5" ry="10" transform="rotate(${a} ${x} ${y})"/>`).join('')}`);
  add(limb([[gp - 15, 350], [gp - 16, 548]], 19, 16, tone(0.75)));
  add(limb([[gp + 15, 350], [gp + 16, 548]], 19, 16, tone(0.75)));
  add(`${shoe(gp - 20, 562, -1)}${shoe(gp + 22, 562, 1)}`);
  add(`<path class="o" fill="${pat('check')}" d="${D.shirt}"/>
${shade([{ lin: [gp, 0, gp + 38, 0], s: [0, 0.45] }], D.shirt)}
<path class="o" d="M${gp - 12} 214 L${gp} 228 L${gp + 12} 214 Z"/>
<path class="t" d="M${gp} 228 V352"/>
<circle class="k" cx="${gp}" cy="250" r="2.6"/><circle class="k" cx="${gp}" cy="280" r="2.6"/><circle class="k" cx="${gp}" cy="310" r="2.6"/>
<path class="o" fill="${tone(0.75)}" d="M${gp - 40} 346 L${gp + 40} 346 L${gp + 41} 362 L${gp - 41} 362 Z"/>`);
  add(limb([[gp - 30, 232], [gp - 62, 266], [gp - 72, 296]], 18, 15, pat('check')));
  add(limb([[gp + 30, 232], [gp + 62, 290], [gp + 82, 330]], 18, 15, pat('check')));
  add(`${hand(gp - 74, 298, 20)}${hand(gp + 86, 334, -40)}
<path class="t" stroke-width="4" d="M${gp + 84} 324 Q${gp + 86} 330 ${gp + 88} 344" stroke="none"/>`);
  add(`<rect class="o" x="${gp - 6}" y="192" width="12" height="22"/>
<ellipse class="o" cx="${gp}" cy="160" rx="29" ry="35"/>
<path class="o" d="M${gp - 30} 170 Q${gp - 32} 146 ${gp - 24} 138 Q${gp - 20} 152 ${gp - 22} 172 Z M${gp + 30} 170 Q${gp + 32} 146 ${gp + 24} 138 Q${gp + 20} 152 ${gp + 22} 172 Z"/>
<path class="o" fill="${tone(0.6)}" d="M${gp - 32} 146 Q${gp - 32} 116 ${gp} 114 Q${gp + 32} 116 ${gp + 32} 146 Q${gp} 136 ${gp - 32} 146 Z"/>
${shade([{ lin: [gp, 0, gp + 32, 0], s: [0, 0.45] }], `M${gp - 32} 146 Q${gp - 32} 116 ${gp} 114 Q${gp + 32} 116 ${gp + 32} 146 Q${gp} 136 ${gp - 32} 146 Z`)}
<path class="o" fill="${tone(0.6)}" d="M${gp - 34} 146 Q${gp} 134 ${gp + 34} 146 Q${gp + 50} 150 ${gp + 46} 156 Q${gp + 10} 146 ${gp - 30} 154 Q${gp - 38} 152 ${gp - 34} 146 Z"/>
<ellipse class="k" cx="${gp - 11}" cy="164" rx="3" ry="4"/><ellipse class="k" cx="${gp + 11}" cy="164" rx="3" ry="4"/>
<path class="t" d="M${gp - 18} 155 q6 -3 12 0 M${gp + 6} 155 q6 -3 12 0"/>
<path class="h" d="M${gp} 166 q-4 9 2 10"/>
<path class="o" d="M${gp - 20} 182 Q${gp - 10} 172 ${gp} 178 Q${gp + 10} 172 ${gp + 20} 182 Q${gp + 10} 186 ${gp} 182 Q${gp - 10} 186 ${gp - 20} 182 Z"/>
<path class="t" d="M${gp - 6} 188 q6 3 12 0"/>`);
}
