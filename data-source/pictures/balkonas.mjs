export default function draw({ add, shade, floor, limb, hand, shoe, tone, pat, f, W, H }) {
  const D = {
    house: 'M560 46 H790 V330 H560 Z',
    parapet: `M-10 324 H${W + 10} V440 H-10 Z`,
    floor: `M0 440 H${W} V${H} H0 Z`,
    box: 'M46 296 H304 V346 H46 Z',
    torso: 'M386 222 Q390 210 410 210 Q430 210 434 222 L440 340 L380 340 Z',
    skirt: 'M382 336 L438 336 L466 500 L354 500 Z',
    can: 'M0 0 L44 0 L48 40 L-4 40 Z'
  };

  add(`<circle class="o" cx="96" cy="84" r="30"/>
<path class="t" d="M96 40 v-12 M96 128 v12 M52 84 h-12 M140 84 h12 M65 53 l-8 -8 M127 53 l8 -8 M65 115 l-8 8 M127 115 l8 8"/>
<path class="o" d="M196 86 Q194 64 218 64 Q226 46 250 50 Q270 40 286 58 Q310 58 310 78 Q314 94 292 96 L212 96 Q194 96 196 86 Z"/>
<path class="o" d="M432 40 Q432 22 452 24 Q462 8 484 14 Q502 10 508 28 Q526 30 524 44 Q522 56 506 56 L446 56 Q432 56 432 40 Z"/>
<path class="t" d="M262 150 q8 -10 16 0 q8 -10 16 0 M310 120 q7 -9 14 0 q7 -9 14 0 M336 166 q6 -8 12 0 q6 -8 12 0"/>`);

  const wins = [];
  for (const y of [66, 124, 182, 240, 298]) {
    for (const x of [578, 632, 686, 740]) {
      wins.push(`<rect class="o" x="${x}" y="${y}" width="34" height="40"/><rect class="o" fill="${tone(0.6)}" x="${x + 5}" y="${y + 5}" width="24" height="30"/><path class="w" d="M${x + 17} ${y + 5} V${y + 35} M${x + 5} ${y + 18} H${x + 29}"/>`);
    }
  }
  add(`<path class="o" fill="${tone(0.22)}" d="${D.house}"/>
${shade([{ lin: [620, 0, 790, 0], s: [0, 0.4] }], D.house)}
<rect class="o" fill="${tone(0.5)}" x="552" y="36" width="246" height="12"/>
${wins.join('')}`);

  add(`<rect class="o" fill="${tone(0.42)}" x="-10" y="312" width="${W + 20}" height="14" rx="3"/>
<path class="o" fill="${tone(0.14)}" d="${D.parapet}"/>
${shade([{ lin: [0, 324, 0, 440], s: [0.3, 0.05] }, { lin: [300, 0, 800, 0], s: [0, 0.2] }], D.parapet)}
<path class="h" d="${Array.from({ length: 33 }, (_, i) => `M${i * 25} 330 V434`).join(' ')}"/>`);
  add(floor({ top: 440 }));
  add(shade([{ lin: [0, 440, 0, 490], s: [0.42, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<path class="t" d="M-10 440 H${W + 10}"/>`);

  const flowers = [72, 112, 152, 192, 232, 272];
  const heads = [282, 274, 284, 276, 282, 276];
  const daisy = (x, y) =>
    `${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse class="o" cx="${x}" cy="${y - 11}" rx="6" ry="10" transform="rotate(${a} ${x} ${y})"/>`).join('')}<circle class="k" cx="${x}" cy="${y}" r="6"/>`;
  const tulip = (x, y) => `<path class="o" fill="${tone(0.42)}" d="M${x - 12} ${y - 14} L${x - 6} ${y - 4} L${x} ${y - 16} L${x + 6} ${y - 4} L${x + 12} ${y - 14} Q${x + 14} ${y + 10} ${x} ${y + 10} Q${x - 14} ${y + 10} ${x - 12} ${y - 14} Z"/>`;
  add(flowers
    .map((x, i) => `<path class="t" d="M${x} 300 Q${x + (i % 2 ? 4 : -4)} ${heads[i] + 20} ${x} ${heads[i] + 6}"/>
<path class="o" fill="${tone(0.3)}" d="M${x} 296 q-18 -6 -20 -20 q16 2 20 18 Z"/><path class="o" fill="${tone(0.3)}" d="M${x} 292 q16 -4 20 -18 q-16 2 -20 16 Z"/>`)
    .join(''));
  add(flowers.map((x, i) => (i % 2 ? tulip(x, heads[i]) : daisy(x, heads[i]))).join(''));
  add(`<path class="o" fill="${tone(0.5)}" d="${D.box}"/>
${shade([{ lin: [170, 0, 304, 0], s: [0, 0.4] }], D.box)}
<path class="h" d="M46 312 H304 M46 328 H304"/>`);

  add(shade([{ rad: [430, 566, 70, 10], s: 0.7 }]));
  add(shade([{ rad: [588, 548, 72, 9], s: 0.7 }]));
  add(shade([{ rad: [742, 566, 66, 9], s: 0.7 }]));

  add(`<path class="k" d="M682 340 h9 v128 h-9 Z M774 340 h9 v128 h-9 Z"/>
<rect class="o" fill="${tone(0.3)}" x="676" y="330" width="112" height="18" rx="3"/>
<path class="k" d="M672 488 h9 v72 h-9 Z M778 488 h9 v72 h-9 Z"/>
<path class="o" fill="${tone(0.3)}" d="M682 466 L782 466 L792 480 L672 480 Z"/>
<rect class="o" fill="${tone(0.3)}" x="672" y="480" width="120" height="10"/>`);
  add(`<g transform="translate(507 -26) scale(0.88)"><path class="o" d="M196 556 Q190 516 244 510 Q304 508 308 540 Q310 558 272 558 Z"/>
<path class="t" d="M240 514 q6 18 0 40 M258 512 q7 20 0 44 M276 514 q7 18 2 40 M292 520 q5 14 2 30" stroke-width="4.5"/>
<path class="o" d="M196 556 Q198 528 220 527 Q242 528 240 556 Z"/>
<path class="o" d="M199 536 l-6 -20 l17 11 Z M222 527 l8 -19 l7 21 Z"/>
<path class="k" d="M201 524 l2 -6 l3 4 Z M227 523 l3 -7 l3 7 Z"/>
<path class="t" d="M204 540 q5 4 10 0 M222 540 q5 4 10 0"/>
<path class="h" d="M216 548 l2 2 l2 -2 M200 548 l-10 -1 M200 552 l-10 2 M236 548 l10 -1"/>
<path class="o" d="M304 538 Q326 552 298 560 Q270 566 238 560 Q276 556 300 548 Z"/>
<path class="h" d="M282 556 v6 M266 558 v5"/></g>
<path class="t" d="M662 436 h10 l-10 10 h10 M652 404 h12 l-12 12 h12"/>`);

  add(`<ellipse class="o" fill="${tone(0.3)}" cx="580" cy="540" rx="34" ry="7"/>
<path class="o" fill="${tone(0.3)}" d="M574 440 h12 v98 h-12 Z"/>
${shade([{ lin: [574, 0, 586, 0], s: [0, 0.5] }], 'M574 440 h12 v98 h-12 Z')}
<path class="o" fill="${tone(0.3)}" d="M510 430 L510 438 Q580 456 650 438 L650 430 Z"/>
<ellipse class="o" fill="${tone(0.22)}" cx="580" cy="430" rx="70" ry="14"/>
${shade([{ lin: [580, 0, 650, 0], s: [0, 0.35] }], 'M510 430 a70 14 0 1 0 140 0 a70 14 0 1 0 -140 0 Z')}
<path class="o" d="M564 402 L592 402 L590 430 L566 430 Z"/>
<path class="t" d="M592 408 q14 2 1 16"/>
<ellipse class="o" cx="578" cy="402" rx="14" ry="3.5"/>`);

  add(`<path class="k" d="M380 176 Q374 116 410 116 Q446 116 440 176 L448 232 Q430 238 426 222 L394 222 Q390 238 372 232 Z"/>
<path class="o" fill="${pat('stH')}" d="${D.skirt}"/>
${shade([{ lin: [410, 0, 466, 0], s: [0, 0.45] }], D.skirt)}
<path class="o" fill="${pat('stH')}" d="${D.torso}"/>
${shade([{ lin: [410, 0, 440, 0], s: [0, 0.45] }], D.torso)}
<path class="o" d="M398 212 L410 226 L422 212 Z"/>
<rect class="o" x="402" y="194" width="16" height="20"/>`);
  add(limb([[396, 498], [395, 552]], 14, 13));
  add(limb([[424, 498], [425, 552]], 14, 13));
  add(`${shoe(391, 562, -1)}${shoe(429, 562)}`);
  add(limb([[434, 228], [450, 290], [450, 344]], 17, 14, pat('stH')));
  add(hand(450, 350, 5));

  add(`<g transform="translate(318 224) rotate(-35)">
<path class="o" d="M2 28 L-36 -6 L-30 -12 L4 16 Z" fill="${tone(0.42)}"/>
<ellipse class="o" fill="${tone(0.42)}" cx="-37" cy="-10" rx="6" ry="10" transform="rotate(-48 -37 -10)"/>
<path class="t" d="M8 0 Q26 -30 44 0" stroke-width="5.5"/>
<path class="o" fill="${tone(0.42)}" d="${D.can}"/>
${shade([{ lin: [20, 0, 48, 0], s: [0, 0.45] }], D.can)}
<path class="h" d="M0 12 H46"/></g>
<path class="t" stroke-dasharray="7 5" stroke-width="3.8" d="M272 244 L258 268 M280 246 L274 270 M288 246 L290 270 M294 242 L302 264"/>
<path class="o" d="M258 266 q-4 6 0 9 q4 -3 0 -9 Z M300 262 q-4 6 0 9 q4 -3 0 -9 Z"/>`);
  add(limb([[388, 228], [360, 226], [334, 200]], 17, 14, pat('stH')));
  add(hand(332, 198, 50));

  add(`<ellipse class="o" cx="410" cy="164" rx="28" ry="34"/>
<path class="k" d="M382 158 Q384 126 410 124 Q436 126 438 158 Q428 140 410 142 Q392 140 382 158 Z"/>
<ellipse class="k" cx="398" cy="166" rx="3" ry="4"/><ellipse class="k" cx="422" cy="166" rx="3" ry="4"/>
<path class="h" d="M391 157 q6 -4 12 0 M417 157 q6 -4 12 0 M410 170 q-3 7 2 8"/>
<path class="t" d="M400 184 q10 6 20 0"/>
<path class="h" d="M386 178 q3 3 6 0 M428 178 q3 3 6 0"/>`);
}
