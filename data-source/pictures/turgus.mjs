function people({ limb, hand, shoe, shade, tone }) {
  const BACK = {
    long: 'M-33 -6 Q-36 -44 0 -44 Q36 -44 33 -6 L37 54 Q18 62 0 56 Q-18 62 -37 54 Z',
    bob: 'M-34 -6 Q-36 -44 0 -44 Q36 -44 34 -6 L36 30 Q20 36 4 30 L-4 30 Q-20 36 -36 30 Z'
  };
  const HAIR = {
    boy: 'M-30 4 Q-34 -34 0 -37 Q34 -34 30 4 Q27 -12 21 -14 L17 -5 L11 -18 L6 -7 L0 -20 L-5 -7 L-11 -18 L-16 -5 L-20 -14 Q-25 -10 -30 4 Z',
    man: 'M-30 4 Q-34 -38 2 -38 Q34 -37 30 4 Q29 -12 23 -19 Q4 -11 -16 -19 Q-26 -12 -30 4 Z',
    fringe: 'M-30 2 Q-33 -40 0 -40 Q33 -40 30 2 Q27 -18 15 -22 Q2 -14 -12 -21 Q-25 -16 -30 2 Z',
    bun: 'M-30 6 Q-34 -34 0 -36 Q34 -34 30 6 Q24 -18 0 -20 Q-24 -18 -30 6 Z'
  };
  const MOUTH = {
    smile: '<path class="t" d="M-9 19 q9 6 18 0"/>',
    open: '<path class="k" d="M-13 16 Q0 22 13 16 Q10 31 0 31 Q-10 31 -13 16 Z"/><path class="w" d="M-8 19 Q0 21 8 19"/>',
    talk: '<path class="k" d="M-7 18 Q0 16 7 18 Q6 28 0 28 Q-6 28 -7 18 Z"/>'
  };
  function head(x, y, o = {}) {
    const hf = o.hairFill ? `class="o" fill="${o.hairFill}"` : 'class="k"';
    const s = [];
    if (o.back) s.push(`<path ${hf} d="${BACK[o.back]}"/>`);
    s.push('<ellipse class="o" cx="0" cy="0" rx="29" ry="35"/>');
    if (o.hair) s.push(`<path ${hf} d="${HAIR[o.hair]}"/>`);
    if (o.hair === 'bun') s.push(`<circle ${hf} cx="0" cy="-46" r="14"/><path class="h" d="M0 -34 Q-14 -28 -24 -6 M0 -34 Q14 -28 24 -6"/>`);
    const lx = o.look || 0;
    if (o.glasses) s.push(`<circle class="o" cx="-12" cy="2" r="9"/><circle class="o" cx="12" cy="2" r="9"/><path class="t" d="M-3 2 h6 M-21 0 l-8 -2 M21 0 l8 -2"/><circle class="k" cx="${-12 + lx}" cy="3" r="2.6"/><circle class="k" cx="${12 + lx}" cy="3" r="2.6"/>`);
    else s.push(`<ellipse class="k" cx="${-11 + lx}" cy="2" rx="3" ry="4"/><ellipse class="k" cx="${11 + lx}" cy="2" rx="3" ry="4"/>`);
    s.push('<path class="h" d="M-18 -10 q6 -4 12 0 M6 -10 q6 -4 12 0 M0 6 q-3 7 2 8"/>');
    s.push(MOUTH[o.mouth || 'smile']);
    return `<g transform="translate(${x} ${y})">${s.join('')}</g>`;
  }
  function torso(x, y, fill, o = {}) {
    const w0 = o.w0 || 40;
    const w1 = o.w1 || 46;
    const top = y + 44;
    const h = o.h || 152;
    const d = `M${x - w0} ${top + 26} Q${x - w0 + 6} ${top} ${x} ${top} Q${x + w0 - 6} ${top} ${x + w0} ${top + 26} L${x + w1} ${top + h} L${x - w1} ${top + h} Z`;
    return `<path class="o" fill="${fill}" d="${d}"/>${shade([{ lin: [x, 0, x + w1, 0], s: [0, 0.45] }], d)}`;
  }
  const neck = (x, y) => `<rect class="o" x="${x - 6}" y="${y + 28}" width="12" height="19"/>`;
  const arm = (pts, fill = '#fff', a = 0, w = [19, 15]) => limb(pts, w[0], w[1], fill) + hand(pts[pts.length - 1][0], pts[pts.length - 1][1], a);
  return { head, torso, neck, arm };
}

const apple = (x, y, fill) => `<path class="o" fill="${fill}" d="M${x} ${y - 8} Q${x - 13} ${y - 15} ${x - 13} ${y} Q${x - 12} ${y + 12} ${x} ${y + 12} Q${x + 12} ${y + 12} ${x + 13} ${y} Q${x + 13} ${y - 15} ${x} ${y - 8} Z"/><path class="h" d="M${x} ${y - 8} q1 -6 4 -8"/><path class="o" d="M${x + 4} ${y - 13} q8 -7 13 -1 q-7 5 -13 1 Z"/>`;

export default function draw(kit) {
  const { add, clip, shade, floor, limb, shoe, scallops, tone, pat, f, W, H } = kit;
  const { head, torso, neck, arm } = people(kit);
  const D = {
    ground: `M0 400 H${W} V${H} H0 Z`,
    dome: 'M88 140 Q96 64 290 40 Q484 64 492 140 Z',
    top: 'M118 362 L554 362 L564 378 L108 378 Z',
    front: 'M108 378 H564 V544 H108 Z',
    coat: 'M628 222 Q634 196 670 196 Q706 196 712 222 L724 424 L616 424 Z',
    pumpkin: 'M22 528 Q20 494 60 494 Q100 494 100 528 Q100 562 60 562 Q20 562 22 528 Z'
  };

  add(`<circle class="o" cx="46" cy="50" r="22"/>
<path class="t" d="M46 16 v-10 M46 84 v10 M12 50 h-10 M80 50 h10 M22 26 l-7 -7 M70 74 l7 7 M70 26 l7 -7 M22 74 l-7 7"/>
<path class="o" d="M574 98 Q568 74 596 74 Q604 52 632 58 Q652 42 674 62 Q704 58 702 86 Q712 102 690 106 L586 106 Q568 106 574 98 Z"/>
<path class="o" d="M676 176 Q672 160 692 160 Q700 146 720 152 Q738 142 752 158 Q774 158 770 176 L686 178 Q674 178 676 176 Z"/>`);

  add(`<path class="o" fill="${tone(0.25)}" d="M520 400 Q510 352 544 340 Q548 312 576 316 Q604 306 610 336 Q634 350 620 400 Z"/>
<path class="o" fill="${tone(0.25)}" d="M736 400 Q726 360 752 350 Q758 326 782 332 Q806 330 808 360 L808 400 Z"/>`);

  add(shade([{ lin: [0, 400, 0, 600], s: [0.1, 0.25] }, { lin: [300, 0, 800, 0], s: [0, 0.12] }], D.ground));
  add(floor({ top: 400, step: 80, color: '#b4b4b4' }));
  add(`<path class="t" d="M0 400 H${W}"/>`);
  add(shade([{ rad: [340, 550, 250, 16], s: 0.7 }]));
  add(shade([{ rad: [682, 556, 70, 10], s: 0.7 }]));
  add(shade([{ rad: [74, 566, 50, 8], s: 0.7 }]));

  add(`<rect class="k" x="287" y="120" width="7" height="250"/>`);
  const xs = [88, 155, 222, 290, 358, 425, 492];
  const ext = (x) => f(290 + (x - 290) * 1.25);
  add(`<g ${clip(D.dome)}>${xs.slice(0, -1).map((x, i) => `<path class="o" fill="${i % 2 ? '#fff' : tone(0.62)}" stroke="none" d="M290 20 L${ext(x)} 165 L${ext(xs[i + 1])} 165 Z"/>`).join('')}</g>
${shade([{ lin: [290, 0, 492, 0], s: [0, 0.45] }], D.dome)}
<path class="o" fill="none" d="${D.dome}"/>
<path class="h" d="${xs.slice(1, -1).map((x) => `M290 40 Q${f(290 + (x - 290) * 0.75)} 70 ${x} 140`).join(' ')}"/>
${xs.slice(0, -1).map((x, i) => `<path class="o" fill="${i % 2 ? '#fff' : tone(0.62)}" d="M${x} 140 Q${(x + xs[i + 1]) / 2} 166 ${xs[i + 1]} 140 Z"/>`).join('')}
<circle class="k" cx="290" cy="36" r="6"/>`);

  add(torso(392, 214, tone(0.45), { w0: 38, w1: 44, h: 120 }));
  add(`<path class="o" d="M370 272 H414 V362 H370 Z"/>
<path class="t" d="M372 272 L380 252 M412 272 L404 252"/>`);
  add(neck(392, 214));
  add(head(392, 214, { back: 'bob', hair: 'fringe', look: 3 }));
  add(arm([[358, 284], [338, 330], [362, 362]], tone(0.45), 60, [18, 14]));
  add(arm([[426, 284], [452, 326], [462, 300]], tone(0.45), -20, [18, 14]));

  add(`<path class="o" fill="${tone(0.28)}" d="${D.top}"/>
${shade([{ lin: [340, 0, 564, 0], s: [0, 0.4] }], D.top)}
<path class="o" fill="${tone(0.4)}" d="${D.front}"/>
${shade([{ lin: [340, 0, 564, 0], s: [0, 0.5] }, { lin: [0, 378, 0, 400], s: [0.4, 0] }], D.front)}
<path class="h" d="M165 380 V542 M222 380 V542 M279 380 V542 M336 380 V542 M393 380 V542 M450 380 V542 M507 380 V542"/>`);

  const carrot = (x, y, a) => `<g transform="rotate(${a} ${x} ${y})"><path class="o" fill="${tone(0.45)}" d="M${x} ${y - 10} Q${x + 40} ${y - 7} ${x + 74} ${y} Q${x + 40} ${y + 7} ${x} ${y + 10} Q${x - 6} ${y} ${x} ${y - 10} Z"/><path class="h" d="M${x + 16} ${y - 5} l3 4 M${x + 34} ${y - 3} l3 4 M${x + 50} ${y - 2} l2 3"/><path class="o" d="M${x - 3} ${y - 2} Q${x - 18} ${y - 22} ${x - 26} ${y - 14} Q${x - 18} ${y - 6} ${x - 3} ${y - 2} Z M${x - 3} ${y + 1} Q${x - 24} ${y - 4} ${x - 30} ${y + 4} Q${x - 18} ${y + 10} ${x - 3} ${y + 1} Z"/></g>`;
  add(`${carrot(140, 352, 4)}${carrot(146, 336, -6)}${carrot(138, 320, 8)}`);
  const cabbage = (x, y, r) => {
    const P = (a, b) => `${f(x + a * r)} ${f(y + b * r)}`;
    const leaf = (m) => `M${P(0, 1)} Q${P(-0.9 * m, 1.02)} ${P(-1.25 * m, 0.45)} Q${P(-1.45 * m, 0.05)} ${P(-1.32 * m, -0.3)} Q${P(-1.1 * m, -0.05)} ${P(-0.95 * m, -0.1)} Q${P(-0.95 * m, 0.4)} ${P(-0.55 * m, 0.7)} Q${P(-0.25 * m, 0.9)} ${P(0, 1)} Z`;
    return `<path class="o" fill="${tone(0.3)}" d="${leaf(1)} ${leaf(-1)}"/><circle class="o" fill="${tone(0.1)}" cx="${x}" cy="${y + 0.05 * r}" r="${f(r * 0.92)}"/><path class="h" d="M${P(-0.55, -0.6)} Q${P(0, -0.2)} ${P(0.55, -0.62)} M${P(-0.75, -0.05)} Q${P(-0.3, 0.15)} ${P(-0.2, 0.9)} M${P(0.75, -0.05)} Q${P(0.3, 0.15)} ${P(0.2, 0.9)}"/><path class="h" d="M${P(-1.0, 0.6)} Q${P(-1.05, 0.2)} ${P(-1.2, -0.05)} M${P(1.0, 0.6)} Q${P(1.05, 0.2)} ${P(1.2, -0.05)}"/>`;
  };
  add(`${cabbage(258, 334, 27)}${cabbage(326, 338, 24)}`);
  add(shade([{ rad: [300, 362, 70, 6], s: 0.5 }]));

  add(`${apple(476, 306, tone(0.38))}${apple(500, 302, tone(0.38))}${apple(522, 308, tone(0.38))}
<rect class="o" x="495" y="322" width="10" height="12"/>
<path class="o" d="M454 314 Q500 344 546 314 Z"/>
<path class="o" fill="${tone(0.18)}" d="M456 332 L544 332 L550 362 L450 362 Z"/>
${shade([{ lin: [500, 0, 550, 0], s: [0, 0.4] }], 'M456 332 L544 332 L550 362 L450 362 Z')}
<circle class="o" cx="500" cy="347" r="11"/>
<path class="t" d="M500 347 l5 -7"/>
${apple(462, 296, tone(0.38))}`);

  add(`<path class="o" fill="${tone(0.38)}" d="${D.pumpkin}"/>
${shade([{ lin: [60, 0, 100, 0], s: [0, 0.5] }], D.pumpkin)}
<path class="h" d="M60 496 Q44 528 60 560 M60 496 Q76 528 60 560 M40 500 Q26 528 40 556 M80 500 Q94 528 80 556"/>
<path class="k" d="M56 496 l2 -12 l8 2 l-4 10 Z"/>`);

  const potato = (x, y, a) => `<ellipse class="o" fill="${tone(0.32)}" cx="${x}" cy="${y}" rx="15" ry="10" transform="rotate(${a} ${x} ${y})"/><path class="h" d="M${x - 5} ${y - 2} l2 1 M${x + 5} ${y + 2} l2 1"/>`;
  add(`${potato(298, 496, -10)}${potato(352, 496, 12)}${potato(324, 492, 4)}${potato(310, 480, -18)}${potato(338, 478, 16)}${potato(324, 466, 0)}
<path class="o" fill="${tone(0.15)}" d="M278 500 L374 500 L364 560 L288 560 Z"/>
${shade([{ lin: [326, 0, 374, 0], s: [0, 0.45] }], 'M278 500 L374 500 L364 560 L288 560 Z')}
<path class="h" d="M282 520 H370 M286 540 H367 M300 500 L304 560 M326 500 V560 M352 500 L348 560"/>`);

  add(limb([[650, 420], [649, 534]], 26, 22, tone(0.8)));
  add(limb([[690, 420], [691, 534]], 26, 22, tone(0.8)));
  add(`${shoe(645, 548, -1)}${shoe(696, 548)}`);
  add(`<path class="o" fill="${tone(0.55)}" d="${D.coat}"/>
${shade([{ lin: [670, 0, 724, 0], s: [0, 0.45] }], D.coat)}
<path class="t" d="M670 230 V424"/>
<circle class="k" cx="662" cy="260" r="3.5"/><circle class="k" cx="662" cy="300" r="3.5"/><circle class="k" cx="662" cy="340" r="3.5"/><circle class="k" cx="662" cy="380" r="3.5"/>`);
  add(neck(670, 150));
  add(`<path class="o" fill="${tone(0.55)}" d="M648 196 L670 222 L692 196 L700 206 L670 236 L640 206 Z"/>`);
  add(head(670, 150, { hair: 'man', look: -3 }));
  add(`<path class="o" fill="${tone(0.75)}" d="M638 136 Q636 98 670 96 Q704 98 702 136 Z"/>
<path class="o" fill="${tone(0.75)}" d="M634 130 H706 V144 H634 Z"/>
<path class="h" d="M650 104 V130 M662 99 V130 M678 99 V130 M690 104 V130"/>
<circle class="o" cx="670" cy="90" r="10"/>`);
  add(arm([[634, 226], [606, 262], [566, 270]], tone(0.55), -80));
  add(`<path class="t" d="M712 340 Q700 352 698 368 M712 340 Q724 352 726 368"/>
<path class="o" d="M688 364 L736 364 L744 448 L680 448 Z"/>
${shade([{ lin: [712, 0, 744, 0], s: [0, 0.3] }], 'M688 364 L736 364 L744 448 L680 448 Z')}`);
  add(arm([[706, 226], [720, 290], [712, 340]], tone(0.55), 0));
}
