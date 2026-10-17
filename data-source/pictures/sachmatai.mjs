export default function draw({ add, shade, floor, limb, shoe, tone, f, W, H }) {
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    top: 'M284 282 L516 282 L548 372 L252 372 Z',
    board: 'M318 290 L482 290 L504 362 L296 362 Z',
    shade: 'M362 178 L438 178 L422 128 L378 128 Z',
    chairBack: 'M96 196 Q96 168 176 168 Q256 168 256 196 L262 420 L90 420 Z',
    cardigan: 'M140 284 Q146 266 176 266 Q206 266 212 284 L218 414 L134 414 Z',
    lap: 'M130 406 L222 406 Q230 430 224 452 L128 452 Q122 430 130 406 Z',
    skirt: 'M588 412 L656 412 Q662 436 656 456 L588 456 Q582 436 588 412 Z',
    dress: 'M598 322 Q602 308 622 308 Q642 308 646 322 L652 420 L592 420 Z',
    cup: 'M478 296 L506 296 L502 326 Q492 332 482 326 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<rect class="o" x="580" y="56" width="164" height="124"/>
<rect class="o" fill="${tone(0.1)}" x="594" y="70" width="136" height="96"/>
<path class="o" fill="${tone(0.45)}" d="M594 166 L640 106 L668 140 L690 116 L730 166 Z"/>
<circle class="o" cx="704" cy="92" r="11"/>
${shade([{ lin: [662, 0, 744, 0], s: [0, 0.3] }], 'M580 56 H744 V180 H580 Z')}`);

  add(`<path class="t" d="M400 -10 V128"/>
<path class="o" fill="${tone(0.42)}" d="${D.shade}"/>
${shade([{ lin: [400, 0, 438, 0], s: [0, 0.45] }], D.shade)}
<ellipse class="o" cx="400" cy="182" rx="14" ry="8"/>
<path class="h" d="M372 196 L356 222 M400 200 V230 M428 196 L444 222 M384 200 L376 228 M416 200 L424 228"/>`);

  add(shade([{ rad: [410, 512, 190, 18], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.5)}" d="M300 372 h12 v108 h-12 Z M488 372 h12 v108 h-12 Z"/>
${shade([{ lin: [488, 0, 500, 0], s: [0, 0.5] }], 'M488 372 h12 v108 h-12 Z')}
<path class="o" fill="${tone(0.5)}" d="M290 372 h14 v138 h-14 Z M496 372 h14 v138 h-14 Z"/>
${shade([{ lin: [496, 0, 510, 0], s: [0, 0.5] }], 'M496 372 h14 v138 h-14 Z')}
<path class="o" fill="${tone(0.42)}" d="${D.top}"/>
${shade([{ lin: [400, 0, 548, 0], s: [0, 0.4] }], D.top)}
<path class="o" fill="${tone(0.5)}" d="M252 372 H548 V388 H252 Z"/>
${shade([{ lin: [400, 0, 548, 0], s: [0, 0.4] }], 'M252 372 H548 V388 H252 Z')}`);

  const at = (u, v) => {
    const x0 = 318 + (296 - 318) * v;
    const x1 = 482 + (504 - 482) * v;
    return [x0 + (x1 - x0) * u, 290 + 72 * v];
  };
  const squares = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 0) continue;
      const p = [at(i / 8, j / 8), at((i + 1) / 8, j / 8), at((i + 1) / 8, (j + 1) / 8), at(i / 8, (j + 1) / 8)];
      squares.push(`M${p.map((q) => `${f(q[0])} ${f(q[1])}`).join(' L')} Z`);
    }
  add(`<path class="o" d="M312 286 L488 286 L512 366 L288 366 Z"/>
<path class="o" d="${D.board}"/>
<path fill="${tone(0.75)}" d="${squares.join(' ')}"/>
<path class="h" d="${D.board}"/>`);

  const piece = (x, y, dark, tall) => {
    const h = tall ? 30 : 20;
    const cls = dark ? 'class="k"' : 'class="o"';
    const top = tall ? `<path ${cls} d="M${x - 4} ${y - h - 4} h8 v-6 h-8 Z"/>` : '';
    return `<ellipse ${cls} cx="${x}" cy="${y}" rx="9" ry="3.5"/>
<path ${cls} d="M${x - 8} ${y} L${x - 4} ${y - h + 6} L${x + 4} ${y - h + 6} L${x + 8} ${y} Z"/>
<circle ${cls} cx="${x}" cy="${y - h + 2}" r="6"/>${top}`;
  };
  const sq = (i, j) => {
    const p = at((i + 0.5) / 8, (j + 0.65) / 8);
    return [f(p[0]), f(p[1])];
  };
  add([[1, 1, 1, 0], [3, 1, 1, 1], [5, 2, 1, 0], [6, 1, 1, 0], [2, 5, 0, 0], [4, 6, 0, 1], [5, 5, 0, 0], [6, 6, 0, 0]].map(([i, j, d, t]) => piece(...sq(i, j), d, t)).join(''));

  add(`<path class="o" d="${D.cup}"/>
<path class="t" d="M504 302 q12 0 10 10 q-2 8 -12 8"/>
${shade([{ lin: [492, 0, 506, 0], s: [0, 0.5] }], D.cup)}
<path class="h" d="M486 286 q-5 -8 0 -14 q5 -6 0 -12 M496 286 q-5 -8 0 -14 q5 -6 0 -12"/>`);

  add(`<g transform="translate(176 -66)"><path class="o" d="M196 556 Q190 516 244 510 Q304 508 308 540 Q310 558 272 558 Z"/>
<path class="t" d="M240 514 q6 18 0 40 M258 512 q7 20 0 44 M276 514 q7 18 2 40 M292 520 q5 14 2 30" stroke-width="4.5"/>
<path class="o" d="M196 556 Q198 528 220 527 Q242 528 240 556 Z"/>
<path class="o" d="M199 536 l-6 -20 l17 11 Z M222 527 l8 -19 l7 21 Z"/>
<path class="k" d="M201 524 l2 -6 l3 4 Z M227 523 l3 -7 l3 7 Z"/>
<path class="t" d="M204 540 q5 4 10 0 M222 540 q5 4 10 0"/>
<path class="h" d="M216 548 l2 2 l2 -2 M200 548 l-10 -1 M200 552 l-10 2 M236 548 l10 -1"/>
<path class="o" d="M304 538 Q326 552 298 560 Q270 566 238 560 Q276 556 300 548 Z"/>
<path class="h" d="M282 556 v6 M266 558 v5"/></g>
${shade([{ rad: [432, 498, 70, 7], s: 0.4 }])}
<path class="t" d="M352 442 h10 l-10 10 h10 M332 418 h12 l-12 12 h12"/>`);

  add(shade([{ rad: [190, 540, 110, 12], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.55)}" d="M106 470 h12 v62 h-12 Z M236 470 h12 v62 h-12 Z"/>
<path class="o" fill="${tone(0.55)}" d="${D.chairBack}"/>
${shade([{ lin: [176, 0, 262, 0], s: [0, 0.5] }], D.chairBack)}
<path class="h" d="M110 210 Q176 190 242 210"/>
<path class="o" fill="${tone(0.6)}" d="M82 400 H270 V474 H82 Z"/>
${shade([{ lin: [176, 0, 270, 0], s: [0, 0.5] }], 'M82 400 H270 V474 H82 Z')}
<path class="o" fill="${tone(0.6)}" d="M70 316 Q70 300 88 300 Q106 300 106 316 V474 H70 Z"/>
<path class="o" fill="${tone(0.6)}" d="M246 316 Q246 300 264 300 Q282 300 282 316 V474 H246 Z"/>
${shade([{ lin: [264, 0, 282, 0], s: [0, 0.5] }], 'M246 316 Q246 300 264 300 Q282 300 282 316 V474 H246 Z')}`);
  add(limb([[152, 444], [150, 520]], 22, 18, tone(0.7)));
  add(limb([[200, 444], [204, 520]], 22, 18, tone(0.7)));
  add(`${shoe(148, 534, -1)}${shoe(208, 534)}
<path class="o" fill="${tone(0.7)}" d="${D.lap}"/>
${shade([{ lin: [186, 0, 226, 0], s: [0, 0.45] }], D.lap)}
<path class="h" d="M176 412 V452"/>
<path class="o" fill="${tone(0.42)}" d="${D.cardigan}"/>
${shade([{ lin: [186, 0, 220, 0], s: [0, 0.45] }], D.cardigan)}
<path class="t" d="M176 280 V414"/>
<circle class="k" cx="170" cy="316" r="3"/><circle class="k" cx="170" cy="348" r="3"/><circle class="k" cx="170" cy="380" r="3"/>
<path class="o" d="M164 268 L176 286 L188 268 Z"/>`);
  add(limb([[146, 288], [128, 350], [150, 402]], 19, 15, tone(0.42)));
  add(limb([[208, 288], [258, 322], [320, 304]], 19, 15, tone(0.42)));
  add(`<ellipse class="o" cx="156" cy="406" rx="8" ry="10" transform="rotate(-50 156 406)"/>
<ellipse class="o" cx="326" cy="302" rx="8" ry="10" transform="rotate(80 326 302)"/>
<rect class="o" x="170" y="248" width="12" height="20"/>
<path class="o" fill="${tone(0.12)}" d="M152 222 Q132 220 136 206 Q128 194 140 188 Q140 176 154 178 Z"/>
<path class="o" fill="${tone(0.12)}" d="M200 222 Q220 220 216 206 Q224 194 212 188 Q212 176 198 178 Z"/>
<ellipse class="o" cx="146" cy="220" rx="6" ry="9"/><ellipse class="o" cx="206" cy="220" rx="6" ry="9"/>
<ellipse class="o" cx="176" cy="214" rx="30" ry="36"/>
<path class="h" d="M164 182 q12 -5 24 0"/>
<circle class="o" cx="166" cy="216" r="9"/><circle class="o" cx="190" cy="216" r="9"/>
<path class="t" d="M175 216 h6 M157 214 l-8 -2 M199 214 l8 -2"/>
<circle class="k" cx="169" cy="217" r="2.4"/><circle class="k" cx="193" cy="217" r="2.4"/>
<path class="h" d="M158 202 q8 -4 14 0 M184 202 q8 -4 14 0"/>
<path class="h" d="M179 220 q-3 9 3 10"/>
<path class="o" fill="${tone(0.12)}" d="M160 236 Q170 228 179 234 Q188 228 198 236 Q190 244 179 240 Q168 244 160 236 Z"/>
<path class="t" d="M170 244 q9 4 18 0"/>`);

  add(shade([{ rad: [636, 540, 80, 11], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.3)}" d="M584 254 h12 v280 h-12 Z M664 254 h12 v280 h-12 Z"/>
<path class="o" fill="${tone(0.3)}" d="M584 262 H676 V280 H584 Z M584 300 H676 V316 H584 Z"/>
<path class="o" fill="${tone(0.3)}" d="M572 426 H688 V444 H572 Z"/>
${shade([{ lin: [630, 0, 688, 0], s: [0, 0.45] }], 'M572 426 H688 V444 H572 Z')}
<path class="o" fill="${tone(0.3)}" d="M576 444 h12 v90 h-12 Z M672 444 h12 v90 h-12 Z"/>`);
  add(limb([[604, 450], [604, 520]], 14, 12));
  add(limb([[640, 450], [642, 520]], 14, 12));
  add(`<path class="o" fill="url(#stH)" d="M596 494 h16 v24 h-16 Z M634 494 h16 v24 h-16 Z"/>
${shoe(602, 532, -1)}${shoe(646, 532)}
<path class="o" fill="url(#check)" d="${D.skirt}"/>
${shade([{ lin: [622, 0, 660, 0], s: [0, 0.45] }], D.skirt)}
<path class="o" fill="url(#check)" d="${D.dress}"/>
${shade([{ lin: [622, 0, 654, 0], s: [0, 0.45] }], D.dress)}
<path class="o" d="M610 310 L622 322 L634 310 Z"/>`);
  add(limb([[600, 326], [566, 350], [528, 334]], 14, 12, 'url(#check)'));
  add(limb([[644, 326], [662, 370], [644, 408]], 14, 12, 'url(#check)'));
  add(`<ellipse class="o" cx="522" cy="332" rx="7" ry="9" transform="rotate(80 522 332)"/>
<ellipse class="o" cx="640" cy="414" rx="7" ry="9" transform="rotate(60 640 414)"/>
<rect class="o" x="616" y="290" width="12" height="20"/>
<path class="k" d="M592 262 Q584 290 588 316 Q596 310 598 280 Z M652 262 Q660 290 656 316 Q648 310 646 280 Z"/>
<path class="o" fill="${tone(0.5)}" d="M584 314 l8 -6 l8 6 l-8 6 Z M644 314 l8 -6 l8 6 l-8 6 Z"/>
<ellipse class="o" cx="622" cy="262" rx="28" ry="32"/>
<path class="k" d="M593 262 Q590 228 622 228 Q654 228 651 262 Q646 244 632 240 Q624 250 612 240 Q598 244 593 262 Z"/>
<ellipse class="k" cx="606" cy="266" rx="3" ry="4"/><ellipse class="k" cx="628" cy="266" rx="3" ry="4"/>
<path class="h" d="M600 256 q5 -3 10 0 M622 256 q5 -3 10 0 M615 270 q-4 6 1 7"/>
<path class="t" d="M609 282 q8 4 16 0"/>`);
}
