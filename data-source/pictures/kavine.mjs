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
  const { add, shade, floor, limb, shoe, tone, pat, W, H } = kit;
  const { head, torso, neck, arm } = people(kit);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M42 60 H176 V246 H42 Z',
    top: 'M150 352 L520 352 L534 372 L136 372 Z',
    edge: 'M136 372 H534 V386 H136 Z',
    cake: 'M297 300 L297 334 Q336 344 375 334 L375 300 Z',
    vest: 'M610 210 Q616 184 650 184 Q684 184 690 210 L694 336 L606 336 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [335, 546, 220, 18], s: 0.7 }]));
  add(shade([{ rad: [656, 552, 74, 11], s: 0.7 }]));

  add(`<rect class="o" x="30" y="48" width="158" height="210"/>
<rect class="o" x="42" y="60" width="134" height="186"/>
${shade([{ lin: [42, 60, 176, 246], s: [0.22, 0.04] }], D.pane)}
<path class="k" d="M106 246 L106 196 L112 196 L112 246 Z"/>
<path class="o" fill="${tone(0.3)}" d="M70 190 Q52 186 56 166 Q48 146 66 136 Q66 112 90 110 Q100 92 122 100 Q144 96 148 118 Q168 126 160 148 Q170 170 150 182 Q146 200 124 196 Q110 206 94 198 Q80 204 70 190 Z"/>
<path class="h" d="M80 150 q8 -6 16 0 M114 132 q8 -6 16 0 M120 170 q8 -6 16 0"/>
<path class="t" d="M109 60 V246 M42 153 H176"/>
<rect class="o" x="20" y="258" width="178" height="12"/>`);

  add(`<path class="t" d="M335 0 V84"/>
<path class="k" d="M300 120 L370 120 L352 84 L318 84 Z"/>
<ellipse class="o" cx="335" cy="122" rx="12" ry="7"/>
<path class="h" d="M312 136 l-8 10 M335 138 v12 M358 136 l8 10"/>`);

  const sit = (x, legFill) => `<path class="k" d="M${x - 54} 290 h7 v68 h-7 Z M${x + 47} 290 h7 v68 h-7 Z"/>
<path class="k" d="M${x - 46} 436 h6 v106 h-6 Z M${x + 40} 436 h6 v106 h-6 Z"/>
<rect class="o" x="${x - 52}" y="424" width="104" height="12" rx="2"/>
${limb([[x - 17, 426], [x - 18, 524]], 21, 16, legFill)}${limb([[x + 17, 426], [x + 18, 524]], 21, 16, legFill)}
${shoe(x - 21, 538, -1)}${shoe(x + 21, 538)}`;

  add(sit(250, tone(0.75)));
  add(sit(422, tone(0.3)));

  add(torso(250, 200, pat('check'), { w1: 44, h: 120 }));
  add(neck(250, 200));
  add(`<path class="o" d="M243 244 L250 254 L235 259 Z M257 244 L250 254 L265 259 Z"/>`);
  add(head(250, 200, { hair: 'man', glasses: true, look: 2 }));

  add(torso(422, 206, pat('stH'), { w0: 37, w1: 42, h: 110 }));
  add(neck(422, 206));
  add(head(422, 206, { back: 'long', hair: 'fringe', mouth: 'talk', look: -2 }));
  add(arm([[455, 286], [480, 310], [478, 270]], pat('stH'), -10, [18, 14]));

  add(`<path class="o" fill="${tone(0.3)}" d="${D.top}"/>
${shade([{ lin: [335, 0, 534, 0], s: [0, 0.4] }], D.top)}
<path class="o" fill="${tone(0.55)}" d="${D.edge}"/>
${shade([{ lin: [335, 0, 534, 0], s: [0, 0.5] }], D.edge)}
<path class="k" d="M150 386 h11 v156 h-11 Z M509 386 h11 v156 h-11 Z"/>`);

  add(arm([[215, 274], [198, 332], [226, 362]], pat('check'), 70, [18, 14]));
  add(arm([[285, 274], [302, 332], [276, 362]], pat('check'), -70, [18, 14]));
  add(arm([[390, 286], [376, 334], [398, 362]], pat('stH'), 70, [18, 14]));

  add(`<ellipse class="o" cx="250" cy="364" rx="30" ry="6"/>
<ellipse class="o" cx="430" cy="364" rx="30" ry="6"/>
<path class="t" d="M276 366 l14 -6 M456 366 l14 -6"/>
<ellipse class="o" cx="336" cy="362" rx="26" ry="5"/>
<path class="o" d="M330 340 h12 v20 h-12 Z"/>
<ellipse class="o" cx="336" cy="338" rx="50" ry="7"/>
<path class="o" fill="${tone(0.18)}" d="${D.cake}"/>
${shade([{ lin: [336, 0, 375, 0], s: [0, 0.5] }], D.cake)}
<path class="h" d="M297 318 Q336 328 375 318"/>
<path class="o" d="M297 300 Q297 290 336 290 Q375 290 375 300 L375 308 Q368 318 360 308 Q352 320 344 308 Q336 320 328 308 Q320 320 312 308 Q304 318 297 308 Z"/>
<circle class="k" cx="336" cy="283" r="7"/>
<path class="h" d="M336 276 q4 -8 10 -10"/>`);

  add(limb([[630, 334], [628, 534]], 30, 24, tone(0.8)));
  add(limb([[670, 334], [672, 534]], 30, 24, tone(0.8)));
  add(`${shoe(624, 548, -1)}${shoe(676, 548)}`);
  add(torso(650, 140, '#fff', { h: 154 }));
  add(`<path class="o" fill="${tone(0.85)}" d="${D.vest}"/>
${shade([{ lin: [650, 0, 694, 0], s: [0, 0.35] }], D.vest)}
<path class="o" d="M632 188 L650 242 L668 188 Q650 180 632 188 Z"/>
<circle class="o" cx="650" cy="262" r="3"/><circle class="o" cx="650" cy="288" r="3"/><circle class="o" cx="650" cy="314" r="3"/>`);
  add(neck(650, 140));
  add(`<path class="k" d="M650 186 L636 178 L636 194 Z M650 186 L664 178 L664 194 Z"/><circle class="k" cx="650" cy="186" r="4"/>`);
  add(head(650, 140, { hair: 'man', look: -2 }));
  add(arm([[686, 214], [700, 278], [696, 330]], '#fff', 5));

  add(`<ellipse class="o" fill="${tone(0.5)}" cx="548" cy="256" rx="54" ry="9"/>
<path class="o" d="M520 226 h22 v20 q-11 7 -22 0 Z M542 230 q9 0 8 8 q-1 7 -8 6"/>
<ellipse class="o" cx="531" cy="248" rx="16" ry="4"/>
<path class="o" d="M562 226 h22 v20 q-11 7 -22 0 Z M584 230 q9 0 8 8 q-1 7 -8 6"/>
<ellipse class="o" cx="573" cy="248" rx="16" ry="4"/>
<path class="h" d="M526 218 q-5 -7 0 -14 q5 -7 0 -14 M536 218 q-5 -7 0 -14 q5 -7 0 -14 M568 218 q-5 -7 0 -14 q5 -7 0 -14 M578 218 q-5 -7 0 -14 q5 -7 0 -14"/>`);
  add(arm([[614, 214], [592, 288], [566, 268]], '#fff', -20));
}
