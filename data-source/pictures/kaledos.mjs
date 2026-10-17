export default function draw({ add, shade, floor, limb, hand, shoe, scallops, tone, pat, f, W, H }) {
  const star = (cx, cy, R, r) =>
    'M' +
    Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const q = i % 2 ? r : R;
      return `${f(cx + q * Math.cos(a))} ${f(cy + q * Math.sin(a))}`;
    }).join(' L') +
    ' Z';

  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M48 82 H184 V256 H48 Z',
    trunk: 'M318 436 H342 V476 H318 Z',
    sweater: 'M524 346 Q528 330 560 330 Q592 330 596 346 L600 440 L520 440 Z',
    top: 'M660 241 Q666 215 700 215 Q734 215 740 241 L748 365 L652 365 Z',
    skirt: 'M652 355 L748 355 L770 545 L630 545 Z',
    p1: 'M206 462 H282 V526 H206 Z',
    p2: 'M292 482 H344 V528 H292 Z',
    p3: 'M354 456 H440 V524 H354 Z',
    box: 'M526 380 H594 V430 H526 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [326, 530, 160, 16], s: 0.7 }]));
  add(shade([{ rad: [566, 550, 54, 9], s: 0.7 }]));
  add(shade([{ rad: [714, 568, 82, 11], s: 0.7 }]));

  const flakes = [[66, 102, 4], [104, 96, 3], [150, 110, 4], [172, 92, 3], [82, 140, 3], [128, 136, 5], [168, 150, 3], [60, 182, 5], [100, 176, 3], [146, 190, 4], [176, 206, 3], [78, 214, 3], [120, 216, 4]];
  add(`<rect class="o" x="36" y="70" width="160" height="198"/>
<rect class="o" fill="${tone(0.42)}" x="48" y="82" width="136" height="174"/>
${shade([{ lin: [48, 82, 184, 256], s: [0, 0.3] }], D.pane)}
${flakes.map(([x, y, r], i) => (i % 2 ? `<circle class="o" cx="${x}" cy="${y}" r="${r}"/>` : `<path class="w" stroke-width="3" d="M${x - 6} ${y} h12 M${x} ${y - 6} v12 M${x - 4} ${y - 4} l8 8 M${x + 4} ${y - 4} l-8 8"/>`)).join('')}
<path class="o" d="M48 256 L48 236 Q70 222 96 234 Q126 220 152 232 Q172 224 184 234 L184 256 Z"/>
<path class="t" d="M116 82 V256 M48 166 H184"/>
<rect class="o" x="24" y="268" width="184" height="12"/>`);

  add(`<rect class="o" x="462" y="78" width="136" height="104"/>
<rect class="o" fill="${tone(0.12)}" x="474" y="90" width="112" height="80"/>
${shade([{ lin: [474, 90, 586, 170], s: [0, 0.3] }], 'M474 90 H586 V170 H474 Z')}
<path class="o" fill="${tone(0.35)}" d="M474 170 L474 140 Q510 118 546 138 Q570 126 586 132 L586 170 Z"/>
<path class="k" d="M512 104 L524 126 L518 126 L530 146 L494 146 L506 126 L500 126 Z M509 146 h6 v8 h-6 Z"/>
<path class="o" d="M548 148 H574 V166 H548 Z M544 148 L561 134 L578 148 Z"/>
<rect class="k" x="557" y="154" width="8" height="12"/>
<path class="t" d="M530 82 L506 60 L554 60 Z"/><circle class="k" cx="530" cy="56" r="4"/>`);
  add(`<path class="o" fill="${tone(0.55)}" d="${D.trunk}"/>`);
  const tiers = [
    [280, 446, 162],
    [205, 362, 130],
    [142, 278, 98],
    [94, 198, 64]
  ];
  for (const [ay, by, hw] of tiers) {
    const n = Math.round((2 * hw) / 24);
    const d = `M330 ${ay} L${330 + hw} ${by} ${scallops(330 - hw, 330 + hw, by, (2 * hw) / n, 9)} Z`;
    add(`<path class="o" fill="${tone(0.5)}" d="${d}"/>${shade([{ lin: [320, 0, 330 + hw, 0], s: [0, 0.5] }], d)}
<path class="h" d="M${330 - hw * 0.45} ${by - 8} q${hw * 0.2} -14 ${hw * 0.45} -${f((by - ay) * 0.28)} M${330 + hw * 0.5} ${by - 10} q-${hw * 0.15} -12 -${hw * 0.4} -${f((by - ay) * 0.26)}"/>`);
  }
  const balls = [
    [234, 426, '#fff'], [298, 414, 'k'], [370, 428, pat('stH')], [436, 424, '#fff'],
    [262, 344, pat('stH')], [342, 332, '#fff'], [406, 346, 'k'],
    [292, 258, '#fff'], [366, 262, pat('stH')], [328, 232, 'k'],
    [306, 180, pat('stH')], [356, 176, '#fff']
  ];
  add(
    balls
      .map(([x, y, fl]) => {
        const body = fl === 'k' ? `<circle class="k" cx="${x}" cy="${y}" r="11"/><path class="w" d="M${x - 5} ${y - 4} q2 -4 6 -5"/>` : `<circle class="o" fill="${fl}" cx="${x}" cy="${y}" r="11"/>`;
        return `<path class="h" d="M${x} ${y - 18} V${y - 13}"/><rect class="o" x="${x - 4}" y="${y - 15}" width="8" height="5"/>${body}`;
      })
      .join('')
  );
  add(`<path class="t" d="M330 50 V40 M330 118 V126 M296 84 H286 M364 84 H374 M306 60 l-7 -7 M354 60 l7 -7 M306 108 l-7 7 M354 108 l7 7"/>
<path class="o" d="${star(330, 86, 28, 12)}"/>
<path class="o" fill="${tone(0.2)}" d="${star(330, 86, 14, 6)}"/>`);

  const bow = (x, y) => `<path class="k" d="M${x} ${y} Q${x - 22} ${y - 26} ${x - 30} ${y - 10} Q${x - 22} ${y + 6} ${x} ${y} Q${x + 22} ${y - 26} ${x + 30} ${y - 10} Q${x + 22} ${y + 6} ${x} ${y} Z"/><path class="w" d="M${x - 19} ${y - 12} q6 2 11 8 M${x + 19} ${y - 12} q-6 2 -11 8"/>`;
  add(`<path class="o" fill="${pat('check')}" d="${D.p1}"/>
${shade([{ lin: [244, 0, 282, 0], s: [0, 0.4] }], D.p1)}
<path class="k" d="M240 462 h9 v64 h-9 Z"/>
${bow(244, 462)}
<path class="o" d="${D.p2}"/>
${shade([{ lin: [318, 0, 344, 0], s: [0, 0.5] }], D.p2)}
<path class="o" fill="${pat('stD')}" d="M314 482 h9 v46 h-9 Z M292 500 h52 v9 h-52 Z"/>
${bow(318, 482)}
<path class="o" fill="${tone(0.38)}" d="${D.p3}"/>
${shade([{ lin: [398, 0, 440, 0], s: [0, 0.4] }], D.p3)}
<path class="k" d="M393 456 h9 v68 h-9 Z M354 484 h86 v9 h-86 Z"/>
${bow(397, 456)}`);

  add(`<path class="o" fill="${tone(0.6)}" d="M520 436 H600 L602 464 H518 Z"/>`);
  add(limb([[543, 456], [542, 534]], 19, 16, tone(0.6)));
  add(limb([[577, 456], [578, 534]], 19, 16, tone(0.6)));
  add(`${shoe(540, 547, -1)}${shoe(582, 547)}
<path class="o" fill="${pat('stH')}" d="${D.sweater}"/>
${shade([{ lin: [558, 0, 600, 0], s: [0, 0.45] }], D.sweater)}
<path class="o" d="M548 332 L560 346 L572 332 Z"/>`);
  add(limb([[528, 350], [512, 384], [530, 410]], 17, 14, pat('stH')));
  add(limb([[592, 350], [608, 384], [590, 410]], 17, 14, pat('stH')));
  add(`<path class="o" fill="${pat('dots')}" d="${D.box}"/>
${shade([{ lin: [560, 0, 594, 0], s: [0, 0.4] }], D.box)}
<path class="k" d="M556 380 h8 v50 h-8 Z"/>
${bow(560, 380)}
${hand(530, 410, 60)}${hand(590, 410, -60)}
<rect class="o" x="554" y="314" width="12" height="18"/>
<g transform="translate(560 286)">
<ellipse class="o" cx="0" cy="0" rx="31" ry="34"/>
<path class="k" d="M-31 2 Q-36 -34 0 -36 Q36 -34 31 2 Q27 -13 22 -15 L18 -6 L12 -19 L6 -8 L0 -21 L-6 -8 L-12 -19 L-18 -6 L-22 -15 Q-27 -11 -31 2 Z"/>
<ellipse class="k" cx="-12" cy="2" rx="3" ry="4"/><ellipse class="k" cx="12" cy="2" rx="3" ry="4"/>
<path class="h" d="M-19 -7 q6 -4 12 0 M7 -7 q6 -4 12 0 M0 6 q-3 7 2 8"/>
<path class="k" d="M-14 17 Q0 23 14 17 Q11 33 0 33 Q-11 33 -14 17 Z"/>
<path class="w" d="M-9 20 Q0 23 9 20"/>
<path class="h" d="M-26 14 q3 3 6 0 M20 14 q3 3 6 0"/>
</g>`);

  add(`<path class="o" fill="${tone(0.3)}" d="${D.skirt}"/>
${shade([{ lin: [700, 0, 770, 0], s: [0, 0.5] }, { lin: [0, 355, 0, 378], s: [0.35, 0] }], D.skirt)}
<path class="t" d="M682 545 V555 M720 545 V555"/>
${shoe(678, 565, -1)}${shoe(724, 565)}
<path class="o" fill="${tone(0.3)}" d="${D.top}"/>
${shade([{ lin: [708, 0, 748, 0], s: [0, 0.45] }], D.top)}
<path class="o" fill="${tone(0.7)}" d="M650 352 H750 V366 H650 Z"/>
<path class="o" d="M686 216 Q700 232 714 216 Z"/>`);
  add(limb([[664, 244], [650, 300], [652, 356]], 19, 15, tone(0.3)));
  add(limb([[736, 244], [754, 294], [732, 318]], 19, 15, tone(0.3)));
  add(`${hand(652, 360, 5)}
<path class="o" d="M702 292 h26 v20 q0 7 -7 7 h-12 q-7 0 -7 -7 Z"/>
<path class="t" d="M702 298 q-10 0 -10 7 q0 7 10 6"/>
<path class="h" d="M710 282 q-4 -6 0 -12 q4 -6 0 -12 M720 282 q-4 -6 0 -12 q4 -6 0 -12"/>
${hand(730, 312, 70)}
<rect class="o" x="694" y="194" width="12" height="24"/>
<g transform="translate(700 162) rotate(-7)">
<path class="k" d="M-37 28 Q-46 -47 0 -46 Q46 -47 37 28 Q30 34 22 29 L-22 29 Q-30 34 -37 28 Z"/>
<ellipse class="o" cx="0" cy="0" rx="29" ry="35"/>
<path class="k" d="M-30 2 Q-32 -40 0 -40 Q32 -40 30 2 Q27 -16 14 -22 Q-2 -14 -22 -22 Q-28 -12 -30 2 Z"/>
<path class="w" d="M-24 -26 q10 -8 22 -8 M8 -32 q12 2 18 12 M-33 10 q-2 -18 2 -30 M33 10 q2 -18 -2 -30"/>
<ellipse class="k" cx="-16" cy="4" rx="3" ry="4"/><ellipse class="k" cx="7" cy="4" rx="3" ry="4"/>
<path class="h" d="M-23 -5 q6 -4 12 0 M1 -5 q6 -4 12 0 M-4 8 q-5 6 0 9"/>
<path class="t" d="M-14 23 q8 5 16 0"/>
</g>`);
}
