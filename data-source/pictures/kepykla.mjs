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

export default function draw(kit) {
  const { add, shade, floor, limb, shoe, scallops, tone, pat, f, W, H } = kit;
  const { head, torso, neck, arm } = people(kit);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    top: 'M26 340 L566 340 L574 356 L18 356 Z',
    front: 'M18 356 H574 V546 H18 Z',
    cake: 'M48 290 L48 334 Q106 346 164 334 L164 290 Z',
    basket: 'M206 312 L300 312 L292 350 L214 350 Z',
    pack: 'M610 346 Q610 330 626 330 L678 330 Q694 330 694 346 L694 436 L610 436 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [300, 552, 300, 14], s: 0.7 }]));
  add(shade([{ rad: [664, 556, 56, 8], s: 0.7 }]));

  add(`<circle class="o" cx="716" cy="112" r="36"/>
<circle class="o" cx="716" cy="112" r="29"/>
<path class="h" d="M716 86 v6 M716 132 v6 M690 112 h6 M736 112 h6"/>
<path class="t" d="M716 112 L716 92 M716 112 L730 120"/>
<circle class="k" cx="716" cy="112" r="3"/>`);

  const bun = (x, y) => `<path class="o" fill="${tone(0.35)}" d="M${x - 18} ${y} Q${x - 20} ${y - 26} ${x} ${y - 26} Q${x + 20} ${y - 26} ${x + 18} ${y} Z"/>${[[-8, -16], [0, -20], [8, -15], [-3, -11], [6, -9]].map(([a, b]) => `<ellipse class="o" cx="${x + a}" cy="${y + b}" rx="1.6" ry="1.1" stroke-width="1"/>`).join('')}`;
  const loaf = (x, y) => `<path class="o" fill="${tone(0.42)}" d="M${x - 36} ${y} Q${x - 37} ${y - 32} ${x} ${y - 33} Q${x + 37} ${y - 32} ${x + 36} ${y} Z"/><path class="w" d="M${x - 19} ${y - 10} l9 -14 M${x - 4} ${y - 8} l9 -16 M${x + 12} ${y - 8} l8 -14"/>`;
  const baton = (x, y) => `<path class="o" fill="${tone(0.32)}" d="M${x - 40} ${y} Q${x - 46} ${y - 22} ${x - 30} ${y - 22} L${x + 30} ${y - 22} Q${x + 46} ${y - 22} ${x + 40} ${y} Z"/><path class="w" d="M${x - 24} ${y - 6} l8 -11 M${x - 6} ${y - 6} l8 -11 M${x + 12} ${y - 6} l8 -11"/>`;
  add(`<path class="o" fill="${tone(0.32)}" d="M24 128 H336 V138 H24 Z M24 222 H336 V232 H24 Z"/>
<path class="k" d="M44 138 l12 0 l-12 14 Z M304 138 l12 0 l0 14 Z M44 232 l12 0 l-12 14 Z M304 232 l12 0 l0 14 Z"/>
${[80, 180, 280].map((x) => loaf(x, 128)).join('')}
${[78, 180, 282].map((x) => baton(x, 222)).join('')}`);
  add(shade([{ rad: [180, 130, 150, 5], s: 0.4 }, { rad: [180, 224, 150, 5], s: 0.4 }]));

  add(torso(410, 178, '#fff', { w0: 38, w1: 44, h: 130 }));
  add(`<path class="o" fill="${tone(0.4)}" d="M372 246 Q378 222 410 222 Q442 222 448 246 L450 352 L370 352 Z"/>
<path class="o" d="M386 252 H434 V352 H386 Z"/>
<path class="t" d="M388 252 L396 230 M432 252 L424 230"/>`);
  add(neck(410, 178));
  add(head(410, 178, { back: 'bob', hair: 'fringe', look: 4 }));
  add(`<path class="o" d="M382 150 Q352 112 380 98 Q392 70 418 82 Q446 74 450 104 Q470 120 440 150 Z"/>
<path class="o" d="M380 140 H440 V156 H380 Z"/>
<path class="h" d="M396 140 Q394 116 402 100 M424 140 Q428 118 422 100"/>`);
  add(arm([[376, 248], [352, 300], [372, 340]], tone(0.4), 60, [18, 14]));
  add(arm([[444, 248], [480, 296], [540, 300]], tone(0.4), -70, [18, 14]));
  add(bun(556, 302));

  add(`<path class="o" fill="${tone(0.3)}" d="${D.top}"/>
<path class="o" fill="${tone(0.42)}" d="${D.front}"/>
${shade([{ lin: [300, 0, 574, 0], s: [0, 0.5] }, { lin: [0, 356, 0, 380], s: [0.4, 0] }], D.front)}
<path class="h" d="M40 376 H552 V526 H40 Z M200 376 V526 M392 376 V526"/>`);

  add(`<ellipse class="o" cx="106" cy="338" rx="70" ry="8"/>
<path class="o" fill="${tone(0.15)}" d="${D.cake}"/>
${shade([{ lin: [106, 0, 164, 0], s: [0, 0.5] }], D.cake)}
<path class="h" d="M48 316 Q106 330 164 316"/>
<path class="o" d="M48 290 Q48 278 106 278 Q164 278 164 290 L164 298 ${scallops(48, 164, 298, 13, 10).replace(/^/, '')} Z"/>
${[78, 106, 134].map((x) => `<circle class="k" cx="${x}" cy="272" r="8"/><path class="h" d="M${x} 264 q3 -10 9 -12"/>`).join('')}`);

  add(`${bun(226, 318)}${bun(264, 318)}${bun(282, 320)}${bun(244, 304)}${bun(272, 302)}`);
  add(`<path class="o" fill="${tone(0.14)}" d="${D.basket}"/>
${shade([{ lin: [253, 0, 300, 0], s: [0, 0.45] }], D.basket)}
<path class="h" d="M208 324 H298 M210 338 H296 M230 312 L232 350 M253 312 V350 M276 312 L274 350"/>`);

  add(`<path class="t" d="M638 332 Q652 306 666 332"/><path class="o" fill="${tone(0.5)}" d="${D.pack}"/>${shade([{ lin: [652, 0, 698, 0], s: [0, 0.4] }], D.pack)}`);
  add(limb([[638, 460], [638, 534]], 15, 13));
  add(limb([[666, 460], [666, 534]], 15, 13));
  add(`${shoe(634, 546, -1)}${shoe(670, 546)}`);
  add(`<path class="o" fill="${tone(0.65)}" d="M620 424 L684 424 L688 466 L656 466 L652 446 L648 466 L616 466 Z"/>`);
  add(torso(652, 300, pat('stH'), { w0: 30, w1: 33, h: 86 }));
  add(`<path class="k" d="M628 348 h7 v80 h-7 Z M669 348 h7 v80 h-7 Z"/>`);
  add(neck(652, 300));
  add(head(652, 300, { hair: 'boy', mouth: 'open', look: -3 }));
  add(arm([[628, 368], [600, 352], [572, 306]], pat('stH'), 150, [16, 13]));
  add(arm([[676, 368], [690, 404], [688, 436]], pat('stH'), 0, [16, 13]));
}
