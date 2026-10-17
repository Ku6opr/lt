export default function draw({ add, clip, shade, limb, hand, scallops, tone, pat, rng, f, W, H }) {
  const D = {
    sea: `M-10 232 H${W + 10} V352 Q${W - 40} 344 ${W - 80} 352 Q700 360 640 350 Q580 342 520 352 Q460 362 400 350 Q340 340 280 352 Q220 362 160 350 Q100 342 40 352 Q10 358 -10 352 Z`,
    sand: `M-10 350 H${W + 10} V${H + 10} H-10 Z`,
    canopy: `M66 326 C86 236 314 236 334 326 ${scallops(66, 334, 326, 268 / 6, 14)} Z`,
    towel: 'M52 516 L330 516 L352 572 L30 572 Z',
    castle: 'M640 548 V430 H676 V478 H734 V430 H770 V548 Z'
  };

  add(`<path class="o" fill="${tone(0.1)}" d="${D.sand}"/>`);
  add(shade([{ lin: [0, 350, 0, 420], s: [0.25, 0] }], D.sand));
  const R = rng(5);
  const dots = [];
  for (let i = 0; i < 260; i++) {
    const x = R() * W;
    const y = 360 + R() * 240;
    dots.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.9 + R() * 0.9)}" fill="${tone(0.55)}"/>`);
  }
  add(dots.join(''));

  add(`<path class="o" fill="${tone(0.32)}" d="${D.sea}"/>`);
  add(shade([{ lin: [0, 232, 0, 352], s: [0.35, 0] }], D.sea));
  const waves = [];
  for (let row = 0; row < 5; row++) {
    const y = 250 + row * 22;
    const off = (row % 2) * 40;
    for (let x = -40 + off; x < W; x += 90) waves.push(`M${x} ${y} q12 -${6 + row} 24 0 q12 -${6 + row} 24 0`);
  }
  add(`<path class="w" d="${waves.join(' ')}" stroke-width="2.4"/>`);
  add(`<path class="h" d="M${-10} 349 Q10 356 40 350 Q100 340 160 348 Q220 360 280 350 Q340 338 400 348 Q460 360 520 350 Q580 340 640 348 Q700 358 ${W - 80} 350 Q${W - 40} 342 ${W + 10} 348" stroke="#fff" stroke-width="5"/>`);
  add(`<path class="t" d="M-10 232 H${W + 10}"/>`);

  add(`<g transform="translate(424 0)">
<path class="o" fill="${tone(0.85)}" d="M-44 240 L44 240 L32 258 L-32 258 Z"/>
<path class="t" d="M0 240 V150"/>
<path class="o" d="M4 154 L4 234 L54 234 Z"/>
<path class="o" fill="${tone(0.4)}" d="M-4 166 L-4 234 L-38 234 Z"/>
<path class="w" d="M-40 266 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0 q10 -5 20 0"/>
</g>`);

  const sun = [690, 92, 40];
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `M${f(sun[0] + Math.cos(a) * 52)} ${f(sun[1] + Math.sin(a) * 52)} L${f(sun[0] + Math.cos(a) * 70)} ${f(sun[1] + Math.sin(a) * 70)}`;
  });
  add(`<path class="t" d="${rays.join(' ')}" stroke-width="3"/><circle class="o" cx="${sun[0]}" cy="${sun[1]}" r="${sun[2]}"/>`);
  add(`<path class="o" d="M90 96 Q92 74 118 78 Q132 56 160 66 Q182 56 196 76 Q222 76 220 98 Q222 112 200 112 L108 112 Q86 114 90 96 Z"/>`);
  add(`<path class="t" stroke-width="3.2" d="M282 74 q12 -14 24 0 q12 -14 24 0 M350 116 q10 -12 20 0 q10 -12 20 0"/>`);

  add(shade([{ rad: [214, 556, 190, 34], s: 0.8 }]));
  add(`<path class="o" fill="${pat('check')}" d="${D.towel}"/>`);
  add(shade([{ lin: [200, 0, 352, 0], s: [0, 0.35] }], D.towel));

  add(`<rect class="o" fill="${tone(0.5)}" x="196" y="250" width="8" height="270"/>`);
  const pts = Array.from({ length: 7 }, (_, i) => 66 + (268 / 6) * i);
  const cl = clip(D.canopy);
  add(`<path class="o" d="${D.canopy}"/>
<g ${cl}>${pts.slice(0, 6).map((x, i) => (i % 2 ? '' : `<path fill="${tone(0.62)}" d="M200 230 L${f(x)} 360 L${f(pts[i + 1])} 360 Z"/>`)).join('')}
${shade([{ lin: [200, 0, 334, 0], s: [0, 0.4] }], D.canopy)}</g>
<path class="o" d="${D.canopy}" fill="none"/>
<path class="h" d="${pts.slice(1, 6).map((x) => `M200 250 L${f(x)} 326`).join(' ')}"/>
<circle class="k" cx="200" cy="248" r="6"/>`);

  add(limb([[118, 512], [68, 518], [72, 462]], 18, 15));
  add(limb([[124, 520], [86, 530], [100, 470]], 18, 15));
  add(`<ellipse class="o" cx="71" cy="456" rx="7" ry="10" transform="rotate(-20 71 456)"/><ellipse class="o" cx="99" cy="464" rx="7" ry="10" transform="rotate(-20 99 464)"/>`);
  const shirt = 'M150 482 Q220 472 290 480 Q306 500 294 524 Q220 534 150 526 Z';
  add(`<path class="o" fill="${tone(0.7)}" d="M104 490 Q128 482 156 484 L156 528 Q128 530 106 528 Q98 510 104 490 Z"/>
<path class="o" fill="${pat('stH')}" d="${shirt}"/>
${shade([{ lin: [0, 482, 0, 528], s: [0, 0.4] }], shirt)}`);
  add(`<path class="o" d="M296 514 L404 506 L414 552 L302 560 Z"/>
<path class="k" d="M304 520 L354 516 L355 524 L305 528 Z M358 516 L398 513 L399 521 L359 524 Z"/>
<path class="t" d="M356 512 L362 556"/>
<path class="h" d="M306 534 h44 M307 541 h44 M308 548 h44 M363 530 h40 M364 537 h40 M365 544 h40"/>`);
  add(`<rect class="o" x="284" y="474" width="14" height="18"/>
<ellipse class="o" cx="300" cy="450" rx="28" ry="32"/>
<path class="k" d="M272 446 Q270 414 300 414 Q330 414 328 446 Q324 428 312 426 Q300 434 286 428 Q276 432 272 446 Z"/>
<path class="k" d="M278 444 Q278 436 288 436 L296 436 Q300 446 294 452 Q282 454 278 444 Z M304 436 L312 436 Q322 436 322 444 Q318 454 306 452 Q300 446 304 436 Z"/>
<path class="t" d="M296 440 h8 M278 442 l-6 -2 M322 442 l6 -2"/>
<path class="h" d="M300 452 q-3 6 2 7"/>
<path class="t" d="M291 466 q9 5 18 0"/>`);
  add(limb([[280, 490], [284, 530], [312, 536]], 17, 14, pat('stH')));
  add(hand(318, 534, 80));

  add(shade([{ rad: [730, 556, 90, 12], s: 0.75 }]));
  add(`<path class="o" fill="${tone(0.22)}" d="${D.castle}"/>
<path class="o" fill="${tone(0.22)}" d="M636 432 V414 h10 v8 h8 v-8 h10 v8 h8 v-8 h10 v18 Z M730 432 V414 h10 v8 h8 v-8 h10 v8 h8 v-8 h10 v18 Z M672 480 V466 h10 v6 h10 v-6 h10 v6 h10 v-6 h10 v6 h10 v-6 h4 v14 Z"/>
${shade([{ lin: [720, 0, 776, 0], s: [0, 0.5] }], D.castle)}
<path class="k" d="M692 548 V516 Q705 500 718 516 V548 Z"/>
<rect class="k" x="652" y="452" width="10" height="14" rx="4"/><rect class="k" x="746" y="452" width="10" height="14" rx="4"/>
<path class="t" d="M753 414 V372"/>
<path class="o" fill="${tone(0.7)}" d="M753 372 L780 380 L753 390 Z"/>
<path class="h" d="M648 500 q8 4 16 0 M742 500 q8 4 16 0 M690 494 q8 4 16 0" stroke="${tone(0.7)}"/>`);

  const gx = 562;
  add(shade([{ rad: [574, 552, 70, 12], s: 0.75 }]));
  add(shade([{ rad: [478, 556, 36, 7], s: 0.7 }]));
  add(`<path class="o" fill="${tone(0.5)}" d="M458 552 L452 510 L500 510 L494 552 Z"/>
${shade([{ lin: [476, 0, 500, 0], s: [0, 0.5] }], 'M458 552 L452 510 L500 510 L494 552 Z')}
<ellipse class="o" fill="${tone(0.75)}" cx="476" cy="510" rx="24" ry="6"/>
<path class="t" d="M454 516 Q476 476 498 516"/>`);
  const gy = 40;
  const dress = `M${gx - 26} ${418 + gy} Q${gx} ${408 + gy} ${gx + 26} ${418 + gy} L${gx + 36} 510 Q${gx + 60} 520 ${gx + 56} 540 Q${gx + 40} 552 ${gx} 550 Q${gx - 40} 552 ${gx - 56} 540 Q${gx - 60} 520 ${gx - 36} 510 Z`;
  add(`<path class="o" fill="${pat('dots')}" d="${dress}"/>
${shade([{ lin: [gx, 0, gx + 56, 0], s: [0, 0.45] }], dress)}
<path class="h" d="M${gx - 34} 512 Q${gx - 10} 522 ${gx - 4} 548 M${gx + 34} 512 Q${gx + 10} 522 ${gx + 4} 548"/>`);
  add(limb([[gx - 22, 426 + gy], [gx - 34, 490], [gx - 22, 520]], 14, 12));
  add(limb([[gx + 22, 426 + gy], [gx + 50, 476], [gx + 76, 486]], 14, 12));
  add(`${hand(gx - 20, 524, 10)}${hand(gx + 80, 488, -70)}`);
  add(`<g transform="translate(0 ${gy})"><path class="k" d="M${gx + 18} 352 Q${gx + 52} 352 ${gx + 50} 392 Q${gx + 48} 408 ${gx + 40} 414 Q${gx + 40} 390 ${gx + 26} 372 Z"/>
<rect class="o" x="${gx - 6}" y="402" width="12" height="14"/>
<ellipse class="o" cx="${gx}" cy="380" rx="27" ry="31"/>
<path class="k" d="M${gx - 27} 380 Q${gx - 30} 346 ${gx} 346 Q${gx + 30} 346 ${gx + 27} 380 Q${gx + 22} 362 ${gx + 6} 360 Q${gx - 8} 368 ${gx - 18} 362 Q${gx - 24} 368 ${gx - 27} 380 Z"/>
<circle class="o" fill="${tone(0.6)}" cx="${gx + 24}" cy="354" r="6"/>
<ellipse class="k" cx="${gx - 10}" cy="382" rx="3" ry="4"/><ellipse class="k" cx="${gx + 10}" cy="382" rx="3" ry="4"/>
<path class="h" d="M${gx - 16} 373 q5 -3 10 0 M${gx + 6} 373 q5 -3 10 0 M${gx} 386 q-3 6 2 7"/>
<path class="k" d="M${gx - 9} 397 Q${gx} 402 ${gx + 9} 397 Q${gx + 7} 406 ${gx} 406 Q${gx - 7} 406 ${gx - 9} 397 Z"/>
<path class="h" d="M${gx - 22} 392 q3 3 6 0 M${gx + 16} 392 q3 3 6 0"/></g>`);

  const bx = 404;
  const by = 440;
  add(shade([{ rad: [bx + 14, by + 26, 34, 6], s: 0.7 }]));
  const ball = `M${bx - 26} ${by} A26 26 0 1 1 ${bx + 26} ${by} A26 26 0 1 1 ${bx - 26} ${by} Z`;
  add(`<path class="o" d="${ball}"/>
<g ${clip(ball)}><path fill="${tone(0.7)}" d="M${bx - 4} ${by - 30} Q${bx - 20} ${by} ${bx - 4} ${by + 30} L${bx + 8} ${by + 30} Q${bx - 6} ${by} ${bx + 8} ${by - 30} Z M${bx + 18} ${by - 30} Q${bx + 6} ${by} ${bx + 20} ${by + 30} L${bx + 34} ${by + 30} L${bx + 34} ${by - 30} Z M${bx - 40} ${by - 30} L${bx - 26} ${by - 30} Q${bx - 40} ${by} ${bx - 26} ${by + 30} L${bx - 40} ${by + 30} Z"/>
${shade([{ lin: [bx - 10, by - 20, bx + 26, by + 20], s: [0, 0.5] }], ball)}</g>
<path class="o" d="${ball}" fill="none"/>`);
}
