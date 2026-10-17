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
  const { add, clip, shade, limb, shoe, tone, pat, f, W, H } = kit;
  const { head, torso, neck, arm } = people(kit);
  const D = {
    lake: 'M0 262 H800 V352 Q600 364 400 356 Q200 348 0 360 Z',
    grass: `M0 360 Q200 348 400 356 Q600 364 800 352 V${H} H0 Z`,
    blanket: 'M196 440 L654 440 L736 586 L120 586 Z',
    crown: 'M-20 196 Q-40 150 -10 120 Q-30 70 20 52 Q30 10 80 14 Q120 -10 160 20 Q210 20 214 64 Q250 90 228 130 Q244 170 206 190 Q190 224 140 214 Q100 236 60 216 Q10 230 -20 196 Z',
    trunk: 'M72 200 Q82 300 70 452 L118 452 Q106 300 114 200 Z',
    basket: 'M388 418 L476 418 L468 476 L396 476 Z'
  };

  add(`<circle class="o" cx="320" cy="62" r="24"/>
<path class="t" d="M320 26 v-10 M320 98 v10 M284 62 h-10 M356 62 h10 M295 37 l-7 -7 M345 87 l7 7 M345 37 l7 -7 M295 87 l-7 7"/>
<path class="o" d="M520 88 Q514 64 542 64 Q550 42 578 48 Q598 32 620 52 Q650 48 648 76 Q658 92 636 96 L532 96 Q514 96 520 88 Z"/>
<path class="o" d="M670 150 Q666 134 686 134 Q694 120 714 126 Q732 116 746 132 Q768 132 764 150 L680 152 Q668 152 670 150 Z"/>`);

  add(`<path class="o" fill="${tone(0.22)}" d="M180 264 Q230 226 290 244 Q340 214 410 236 Q470 210 540 232 Q610 206 680 230 Q740 214 800 236 V264 H180 Z"/>
<path class="o" fill="${tone(0.1)}" d="${D.lake}"/>
${shade([{ lin: [0, 262, 0, 360], s: [0.25, 0.05] }], D.lake)}
<path class="h" d="M260 290 q10 -6 20 0 q10 6 20 0 M420 312 q10 -6 20 0 q10 6 20 0 M560 328 q10 -6 20 0 q10 6 20 0 M330 334 q10 -6 20 0 q10 6 20 0 M700 300 q10 -6 20 0 q10 6 20 0"/>`);

  const duck = (x, y) => `<path class="o" fill="${tone(0.3)}" d="M${x - 26} ${y} Q${x - 30} ${y - 18} ${x - 8} ${y - 16} Q${x + 6} ${y - 14} ${x + 12} ${y - 8} L${x + 24} ${y - 4} Q${x + 18} ${y + 8} ${x} ${y + 8} Q${x - 20} ${y + 8} ${x - 26} ${y} Z"/>
<path class="o" fill="${tone(0.3)}" d="M${x + 6} ${y - 12} Q${x + 4} ${y - 30} ${x + 14} ${y - 34} Q${x + 26} ${y - 36} ${x + 26} ${y - 24} Q${x + 24} ${y - 14} ${x + 14} ${y - 8} Z"/>
<path class="k" d="M${x + 25} ${y - 28} L${x + 38} ${y - 25} L${x + 25} ${y - 21} Z"/>
<circle class="k" cx="${x + 18}" cy="${y - 27}" r="2.5"/>
<path class="h" d="M${x - 16} ${y - 6} Q${x - 4} ${y - 2} ${x + 6} ${y - 8}"/>
<path class="h" d="M${x - 34} ${y + 10} q8 -4 16 0 M${x + 14} ${y + 10} q8 -4 16 0"/>`;
  add(`${duck(664, 300)}${duck(744, 326)}`);

  add(`<path class="o" fill="${pat('grass')}" d="${D.grass}"/>
${shade([{ lin: [0, 360, 0, 600], s: [0.05, 0.25] }], D.grass)}`);
  add(shade([{ rad: [130, 456, 110, 14], s: 0.7 }]));
  add(`<path class="o" fill="${tone(0.45)}" d="${D.trunk}"/>
${shade([{ lin: [93, 0, 118, 0], s: [0, 0.5] }], D.trunk)}
<path class="h" d="M88 260 q4 20 0 40 M100 330 q-4 20 0 40 M86 390 q4 16 0 30"/>
<path class="o" fill="${tone(0.3)}" d="${D.crown}"/>
${shade([{ lin: [100, 0, 240, 0], s: [0, 0.45] }], D.crown)}
<path class="h" d="M40 90 q10 -8 20 0 M120 60 q10 -8 20 0 M150 140 q10 -8 20 0 M60 170 q10 -8 20 0 M180 100 q10 -8 20 0"/>`);

  add(shade([{ rad: [440, 592, 330, 16], s: 0.6 }]));
  add(`<path class="o" fill="${pat('check')}" d="${D.blanket}"/>
${shade([{ lin: [430, 0, 736, 0], s: [0, 0.4] }], D.blanket)}`);
  add(shade([{ rad: [330, 520, 90, 12], s: 0.6 }, { rad: [552, 520, 90, 12], s: 0.6 }, { rad: [440, 478, 56, 7], s: 0.6 }]));

  const sit = (x, y, fill) => `${limb([[x - 16, y], [x - 60, y + 30], [x + 4, y + 50]], 28, 20, fill)}${limb([[x + 16, y], [x + 60, y + 30], [x - 4, y + 50]], 28, 20, fill)}${shoe(x - 12, y + 58, -1)}${shoe(x + 12, y + 58)}`;

  add(torso(322, 290, tone(0.38), { h: 124 }));
  add(sit(322, 452, tone(0.7)));
  add(neck(322, 290));
  add(`<path class="o" d="M310 334 L322 348 L334 334 Z"/>`);
  add(head(322, 290, { hair: 'boy', look: 3 }));
  add(arm([[288, 362], [268, 414], [282, 462]], tone(0.38), 10));

  add(`<path class="o" fill="${tone(0.18)}" d="${D.basket}"/>`);
  add(`${apple(410, 414, tone(0.38))}${apple(434, 410, tone(0.38))}${apple(456, 414, tone(0.38))}`);
  add(`<path class="o" fill="${tone(0.18)}" d="${D.basket}"/>
${shade([{ lin: [432, 0, 476, 0], s: [0, 0.45] }], D.basket)}
<path class="h" d="M390 434 H474 M392 450 H472 M394 464 H470 M410 418 L412 476 M432 418 V476 M454 418 L452 476"/>
<path class="t" d="M394 420 Q432 368 470 420"/>`);

  add(`${''}`);
  add(torso(552, 290, pat('stH'), { w0: 37, w1: 44, h: 124 }));
  add(sit(552, 452, tone(0.25)));
  add(neck(552, 290));
  add(head(552, 290, { back: 'long', hair: 'fringe', mouth: 'smile', look: -2 }));
  add(arm([[586, 362], [608, 414], [592, 462]], pat('stH'), -10, [18, 14]));

  const sw = (x, y) => `<path class="o" fill="${tone(0.12)}" d="M${x - 26} ${y} h52 v-11 q-26 -3 -52 0 Z"/>
<path class="o" fill="${tone(0.55)}" d="M${x - 29} ${y - 11} q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 l0 -5 h-56 Z"/>
<path class="o" fill="${tone(0.25)}" d="M${x - 27} ${y - 16} h54 v-6 h-54 Z M${x + 4} ${y - 16} l6 9 l6 -9 Z"/>
<path class="o" fill="${tone(0.12)}" d="M${x - 26} ${y - 22} h52 v-8 q0 -6 -6 -6 h-40 q-6 0 -6 6 Z"/>`;
  add(`<ellipse class="o" cx="440" cy="548" rx="70" ry="13"/>
${sw(412, 546)}${sw(470, 550)}`);

  add(arm([[356, 362], [386, 410], [404, 362]], tone(0.38), -10));
  add(`<path class="o" d="M392 360 L390 322 L418 322 L416 360 Z"/><path class="o" fill="${tone(0.3)}" d="M391 334 L417 334 L416 360 L392 360 Z"/><path class="w" d="M396 340 v14"/>`);
  add(arm([[518, 362], [494, 390], [494, 404], [520, 344]], pat('stH'), 30, [18, 14]));
  add(`<g transform="rotate(-20 534 334)">${sw(534, 336)}</g>`);
}
