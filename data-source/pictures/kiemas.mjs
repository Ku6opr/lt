export default function draw({ add, clip, shade, limb, hand, shoe, tone, pat, f, W, H }) {
  const circ = (cx, cy, r) => `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
  const crown = [
    [80, 110, 78],
    [160, 72, 70],
    [226, 130, 58],
    [140, 162, 72],
    [50, 190, 52],
    [214, 194, 40]
  ];
  const ball = [505, 96, 26];
  const D = {
    ground: `M0 395 H${W} V${H} H0 Z`,
    wall: 'M452 200 H612 V312 H452 Z',
    roof: 'M436 204 L532 136 L628 204 Z',
    fence: `M0 300 H${W} V405 H0 Z`,
    trunk: 'M98 470 Q108 400 106 330 Q104 260 108 200 L146 200 Q150 260 146 330 Q144 400 156 470 Z',
    crown: crown.map(([x, y, r]) => circ(x, y, r)).join(' '),
    cat: 'M172 446 Q166 404 192 394 Q218 404 214 446 Z',
    shirt: 'M302 316 Q306 304 330 304 Q354 304 358 316 L362 402 L298 402 Z',
    dress: 'M666 316 Q670 304 690 304 Q710 304 714 316 L718 392 L738 452 L642 452 L662 392 Z',
    ball: circ(...ball)
  };

  add(`<path class="o" d="M300 86 Q284 86 286 72 Q290 58 306 62 Q312 44 334 48 Q350 36 366 50 Q388 46 390 64 Q404 70 396 84 Q394 88 386 88 Z"/>
<path class="o" d="M600 66 Q588 66 590 56 Q594 46 606 50 Q614 36 632 42 Q646 34 656 46 Q672 46 672 58 Q678 66 668 68 Z"/>
<circle class="o" cx="738" cy="76" r="24"/>
<path class="t" d="M738 40 v-10 M738 112 v10 M702 76 h-10 M774 76 h10 M713 51 l-7 -7 M763 51 l7 -7 M713 101 l-7 7 M763 101 l7 7"/>`);

  add(`<path class="o" fill="${pat('grass')}" d="${D.ground}"/>
<rect x="0" y="298" width="${W}" height="100" fill="${tone(0.14)}"/>`);

  add(`<rect class="o" fill="${tone(0.4)}" x="566" y="148" width="20" height="44"/>
<path class="o" fill="${tone(0.12)}" d="${D.wall}"/>
${shade([{ lin: [520, 0, 612, 0], s: [0, 0.4] }], D.wall)}
<path class="o" fill="${tone(0.55)}" d="${D.roof}"/>
${shade([{ lin: [532, 0, 628, 0], s: [0, 0.45] }], D.roof)}
<path class="h" d="M470 180 H594 M492 164 H572 M512 150 H552"/>
${[472, 558].map((x) => `<rect class="o" fill="${tone(0.35)}" x="${x}" y="222" width="34" height="42"/><path class="t" d="M${x + 17} 222 V264 M${x} 243 H${x + 34}"/><path class="w" d="M${x + 4} 238 l9 -12"/><rect class="o" x="${x - 4}" y="264" width="42" height="7"/>`).join('')}`);

  const pickets = [];
  for (let x = -6; x < W; x += 33) pickets.push(`<path class="o" fill="${tone(0.3)}" d="M${x} 405 V312 L${x + 13} 298 L${x + 26} 312 V405 Z"/><path class="h" stroke="#777" d="M${x + 9} 330 q3 20 0 40 M${x + 17} 350 q-3 18 0 36"/>`);
  add(`<rect class="o" fill="${tone(0.5)}" x="-10" y="324" width="${W + 20}" height="12"/>
<rect class="o" fill="${tone(0.5)}" x="-10" y="374" width="${W + 20}" height="12"/>
${pickets.join('')}`);
  add(shade([{ lin: [0, 0, 800, 0], s: [0, 0.22] }], D.fence));
  add(shade([{ lin: [0, 405, 0, 450], s: [0.4, 0] }], `M0 405 H${W} V450 H0 Z`));

  add(shade([{ rad: [166, 512, 132, 14], s: 0.7 }]));
  add(shade([{ rad: [348, 564, 62, 9], s: 0.7 }]));
  add(shade([{ rad: [706, 564, 62, 9], s: 0.7 }]));
  add(shade([{ rad: [530, 566, 32, 6], s: 0.6 }]));

  add(`<path class="o" fill="${tone(0.45)}" d="${D.trunk}"/>
${shade([{ lin: [118, 0, 156, 0], s: [0, 0.5] }], D.trunk)}
<path class="h" d="M118 240 q4 16 0 30 M132 290 q-4 18 0 34 M120 350 q4 16 0 30"/>`);
  add(limb([[136, 284], [210, 268], [296, 248]], 14, 7, tone(0.45)));
  add(`${crown.map(([x, y, r]) => `<circle class="o" fill="${tone(0.3)}" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
${shade([{ lin: [60, 40, 280, 220], s: [0, 0.4] }], D.crown)}
<path class="h" d="M60 90 q10 -8 20 0 M120 60 q10 -8 20 0 M180 110 q10 -8 20 0 M90 170 q10 -8 20 0 M150 200 q10 -8 20 0 M30 200 q8 -6 16 0 M210 160 q8 -6 16 0"/>`);
  add(`<path class="k" d="M252 238 l-18 -10 l4 16 Z"/>
<ellipse class="o" fill="${tone(0.7)}" cx="266" cy="240" rx="18" ry="12"/>
<path class="h" d="M256 238 q10 8 20 0"/>
<circle class="o" fill="${tone(0.7)}" cx="283" cy="227" r="10"/>
<path class="k" d="M292 224 l11 4 l-11 4 Z"/>
<circle cx="286" cy="225" r="2.4" fill="#fff"/>
<path class="h" d="M262 251 v6 M271 251 v6"/>`);

  add(`<path class="k" d="M48 396 h8 v50 h-8 Z M226 396 h8 v50 h-8 Z"/>
<rect class="o" fill="${tone(0.35)}" x="36" y="398" width="210" height="12" rx="2"/>
<rect class="o" fill="${tone(0.35)}" x="36" y="416" width="210" height="12" rx="2"/>
<path class="o" fill="${tone(0.35)}" d="M40 440 L242 440 L250 452 L32 452 Z"/>
<rect class="o" fill="${tone(0.5)}" x="32" y="452" width="218" height="8"/>
<path class="k" d="M40 460 h9 v46 h-9 Z M233 460 h9 v46 h-9 Z"/>`);
  add(limb([[210, 444], [232, 440], [236, 416]], 8, 6, tone(0.5)));
  add(`<path class="o" fill="${tone(0.5)}" d="${D.cat}"/>
${shade([{ lin: [192, 0, 214, 0], s: [0, 0.4] }], D.cat)}
<path class="h" d="M176 414 q8 4 14 0 M174 426 q8 4 16 0 M196 410 q8 4 14 0 M196 424 q8 4 16 0"/>
<ellipse class="o" cx="184" cy="444" rx="8" ry="5"/><ellipse class="o" cx="202" cy="444" rx="8" ry="5"/>
<path class="o" d="M178 374 l-4 -20 l15 11 Z M208 374 l4 -20 l-15 11 Z"/>
<ellipse class="o" cx="193" cy="380" rx="19" ry="16"/>
<path class="k" d="M178 360 l-1 -6 l5 4 Z M208 360 l1 -6 l-5 4 Z"/>
<ellipse class="k" cx="186" cy="378" rx="2.4" ry="3.2"/><ellipse class="k" cx="200" cy="378" rx="2.4" ry="3.2"/>
<path class="k" d="M191 385 h4 l-2 3 Z"/>
<path class="h" d="M193 388 q-4 4 -7 1 M193 388 q4 4 7 1 M180 386 l-14 -2 M180 390 l-14 3 M206 386 l14 -2 M206 390 l14 3"/>`);

  add(`<path class="h" stroke-dasharray="7 9" d="M406 236 Q426 148 478 104"/>
<path class="h" d="M470 70 q-12 4 -18 14 M462 120 q-10 2 -16 10"/>`);

  add(limb([[316, 436], [300, 548]], 15, 13));
  add(limb([[344, 436], [362, 548]], 15, 13));
  add(`${shoe(296, 558, -1)}${shoe(366, 558)}`);
  add(limb([[306, 322], [290, 360], [284, 394]], 17, 14, tone(0.42)));
  add(limb([[352, 324], [382, 292], [396, 254]], 17, 14, tone(0.42)));
  add(`<path class="o" fill="${tone(0.42)}" d="${D.shirt}"/>
${shade([{ lin: [330, 0, 362, 0], s: [0, 0.45] }], D.shirt)}
<path class="o" fill="${tone(0.78)}" d="M298 396 L362 396 L368 442 L334 442 L330 424 L326 442 L292 442 Z"/>
<path class="o" d="M318 306 L330 318 L342 306 Z"/>`);
  add(`${hand(284, 400, 10)}${hand(398, 246, 20)}`);
  add(`<g transform="translate(-135 -26)"><rect class="o" x="459" y="320" width="12" height="16"/>
<ellipse class="o" cx="465" cy="294" rx="33" ry="36"/>
<path class="k" d="M432 296 Q427 258 465 256 Q503 258 498 296 Q494 280 488 278 L484 287 L478 274 L472 285 L466 272 L460 285 L454 274 L448 287 L444 278 Q438 282 432 296 Z"/>
<ellipse class="k" cx="453" cy="297" rx="3" ry="4"/><ellipse class="k" cx="477" cy="297" rx="3" ry="4"/>
<path class="h" d="M446 288 q6 -4 12 0 M472 288 q6 -4 12 0 M465 300 q-3 7 2 8"/>
<path class="k" d="M450 312 Q465 318 480 312 Q477 329 465 329 Q453 329 450 312 Z"/>
<path class="w" d="M455 315 Q465 318 475 315"/>
<path class="h" d="M438 308 q3 3 6 0 M486 308 q3 3 6 0"/></g>`);

  add(limb([[678, 450], [674, 548]], 14, 12));
  add(limb([[702, 450], [706, 548]], 14, 12));
  add(`${shoe(670, 558, -1)}${shoe(710, 558)}`);
  add(limb([[672, 324], [640, 284], [628, 228]], 15, 13));
  add(limb([[708, 324], [740, 284], [752, 228]], 15, 13));
  add(`<path class="o" fill="${pat('dots')}" d="${D.dress}"/>
${shade([{ lin: [690, 0, 738, 0], s: [0, 0.45] }], D.dress)}
<path class="o" d="M676 306 Q690 318 704 306 Z"/>`);
  add(`${hand(627, 222, -15)}${hand(753, 222, 15)}`);
  add(`<path class="k" d="M656 276 Q648 228 690 226 Q732 228 724 276 L728 300 Q718 304 712 296 L668 296 Q662 304 652 300 Z"/>
<rect class="o" x="684" y="292" width="12" height="16"/>
<ellipse class="o" cx="690" cy="268" rx="29" ry="33"/>
<path class="k" d="M660 262 Q662 234 690 234 Q718 234 720 262 Q708 248 690 250 Q672 248 660 262 Z"/>
<path class="o" fill="${tone(0.6)}" d="M714 238 L700 228 L700 248 Z M714 238 L728 228 L728 248 Z"/>
<circle class="o" fill="${tone(0.6)}" cx="714" cy="238" r="4"/>
<ellipse class="k" cx="679" cy="270" rx="3" ry="4"/><ellipse class="k" cx="701" cy="270" rx="3" ry="4"/>
<path class="h" d="M672 262 q6 -4 12 0 M696 262 q6 -4 12 0 M690 274 q-3 6 2 7"/>
<path class="k" d="M677 285 Q690 291 703 285 Q700 299 690 299 Q680 299 677 285 Z"/>
<path class="h" d="M665 282 q3 3 6 0 M709 282 q3 3 6 0"/>`);

  add(`<path class="o" d="${D.ball}"/>
<g ${clip(D.ball)}><g transform="rotate(-28 ${ball[0]} ${ball[1]})">${[-22, -4, 14].map((dy) => `<rect x="${ball[0] - 40}" y="${ball[1] + dy}" width="80" height="9" fill="${tone(0.75)}"/>`).join('')}</g></g>
${shade([{ lin: [490, 80, 530, 122], s: [0, 0.45] }], D.ball)}
<path class="o" fill="none" d="${D.ball}"/>`);
}
