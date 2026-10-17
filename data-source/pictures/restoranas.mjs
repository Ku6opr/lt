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
  const { add, clip, shade, floor, limb, shoe, scallops, tone, pat, f, W, H } = kit;
  const { head, torso, neck, arm } = people(kit);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M46 58 H174 V262 H46 Z',
    top: 'M178 352 L602 352 L612 370 L168 370 Z',
    cloth: `M168 370 L612 370 L618 536 ${scallops(162, 618, 536)} L162 536 Z`,
    curtainL: 'M14 34 Q40 120 26 200 Q22 240 60 270 L30 290 Q4 240 4 34 Z',
    curtainR: 'M206 34 Q180 120 194 200 Q198 240 160 270 L190 290 Q216 240 216 34 Z',
    dress: 'M262 280 Q266 254 300 254 Q334 254 338 280 L346 372 L254 372 Z',
    skirt: 'M628 330 L712 330 L728 500 L612 500 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(`<path class="h" d="M0 292 H${W}"/><path class="h" d="${[20, 180, 340, 500, 660].map((x) => `M${x} 306 h130 v66 h-130 Z`).join(' ')}"/>`);
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [400, 544, 250, 16], s: 0.7 }]));
  add(shade([{ rad: [676, 556, 72, 10], s: 0.7 }]));

  add(`<rect class="o" x="34" y="46" width="152" height="228"/>
<rect class="o" fill="${tone(0.8)}" x="46" y="58" width="128" height="204"/>
<path class="o" d="M138 92 A22 22 0 1 0 152 128 A17 17 0 1 1 138 92 Z"/>
<path class="w" d="M70 80 v10 M65 85 h10 M96 140 v8 M92 144 h8 M70 200 v8 M66 204 h8 M150 190 v10 M145 195 h10"/>
<path class="t" d="M110 58 V262 M46 160 H174" stroke="#fff"/>
<rect class="o" x="26" y="274" width="168" height="10"/>
<path class="k" d="M4 28 H216 V36 H4 Z"/>
<path class="o" fill="${tone(0.4)}" d="${D.curtainL}"/>
<path class="o" fill="${tone(0.4)}" d="${D.curtainR}"/>
${shade([{ lin: [180, 0, 216, 0], s: [0, 0.4] }], D.curtainR)}
<path class="h" d="M14 60 Q22 140 16 230 M196 60 Q188 140 196 230"/>
<path class="k" d="M18 244 h22 v8 h-22 Z M180 244 h22 v8 h-22 Z"/>`);

  add(`<rect class="o" fill="${tone(0.35)}" x="326" y="34" width="140" height="100"/>
<rect class="o" x="338" y="46" width="116" height="76"/>
<path class="t" d="M338 108 Q380 96 454 104"/>
<rect class="k" x="394" y="94" width="7" height="22"/>
<path class="o" fill="${tone(0.25)}" d="M376 96 Q368 80 382 72 Q384 56 400 58 Q416 54 420 70 Q432 80 422 96 Z"/>`);

  add(`<path class="k" d="M248 280 h8 v78 h-8 Z M344 280 h8 v78 h-8 Z M428 276 h8 v82 h-8 Z M524 276 h8 v82 h-8 Z"/>`);

  add(`<path class="o" fill="#333" d="${D.dress}"/>`);
  add(`<rect class="o" x="294" y="230" width="12" height="28"/>
<path class="o" d="M282 256 Q300 276 318 256 L318 262 Q300 286 282 262 Z"/>
<path class="t" d="M276 256 L284 280 M324 256 L316 280"/>`);
  add(`${[284, 292, 300, 308, 316].map((x, i) => `<circle class="o" cx="${x}" cy="${264 + [0, 4, 6, 4, 0][i]}" r="3"/>`).join('')}`);
  add(head(300, 202, { hair: 'bun', look: 3 }));
  add(arm([[268, 282], [248, 330], [276, 360]], '#fff', 70, [16, 13]));
  add(arm([[332, 282], [352, 330], [326, 360]], '#fff', -70, [16, 13]));

  add(torso(480, 196, tone(0.75), { h: 126 }));
  add(`<path class="o" d="M462 240 L480 300 L498 240 Q480 232 462 240 Z"/>
<path class="k" d="M480 246 L474 252 L478 290 L480 296 L482 290 L486 252 Z"/>`);
  add(neck(480, 196));
  add(`<path class="o" d="M472 240 L480 252 L468 256 Z M488 240 L480 252 L492 256 Z"/>`);
  add(head(480, 196, { hair: 'man', look: 4 }));
  add(arm([[446, 272], [426, 326], [454, 360]], tone(0.75), 70));

  add(`<path class="o" d="${D.top}"/>
<path class="o" d="${D.cloth}"/>
${shade([{ lin: [390, 0, 618, 0], s: [0, 0.5] }, { lin: [0, 370, 0, 392], s: [0.35, 0] }], D.cloth)}
<path class="h" d="M230 386 Q224 440 232 520 M390 386 Q384 440 390 520 M550 386 Q556 440 550 520"/>`);

  add(`<ellipse class="o" cx="300" cy="364" rx="32" ry="6"/><ellipse class="o" cx="300" cy="364" rx="18" ry="3"/>
<ellipse class="o" cx="480" cy="364" rx="32" ry="6"/><ellipse class="o" cx="480" cy="364" rx="18" ry="3"/>
<path class="t" d="M262 366 v-14 M338 366 v-14 M442 366 v-14 M518 366 v-14"/>
<path class="o" d="M346 328 L366 328 L364 360 L348 360 Z"/><path class="o" fill="${tone(0.55)}" d="M347 338 L365 338 L364 360 L348 360 Z"/>
<path class="o" d="M532 328 L552 328 L550 360 L534 360 Z"/><path class="o" fill="${tone(0.55)}" d="M533 338 L551 338 L550 360 L534 360 Z"/>
<ellipse class="o" cx="392" cy="360" rx="16" ry="4"/>
<path class="o" d="M388 360 L388 336 L396 336 L396 360 Z"/>
<ellipse class="o" cx="392" cy="336" rx="11" ry="3"/>
<rect class="o" x="386" y="294" width="12" height="40"/>
<path class="h" d="M392 294 v-6"/>
<path class="o" d="M392 286 q-7 -10 0 -22 q7 12 0 22 Z"/><path class="k" d="M392 283 q-3 -5 0 -10 q3 5 0 10 Z"/>
<path class="h" d="M374 270 l-8 -6 M410 270 l8 -6 M392 256 v-8"/>
<path class="o" fill="${tone(0.8)}" d="M418 360 L418 314 Q418 302 426 296 L426 272 L438 272 L438 296 Q446 302 446 314 L446 360 Z"/>
<rect class="k" x="425" y="266" width="14" height="8"/>
<path class="o" d="M420 322 H444 V344 H420 Z"/>
<path class="h" d="M426 330 h12 M426 337 h12"/>
<path class="o" d="M206 362 L208 318 L244 318 L246 362 Z"/>
<path class="h" d="M216 328 h20 M214 338 h24 M214 346 h24 M214 354 h18"/>
<path class="t" d="M220 322 q6 -4 12 0"/>`);

  add(limb([[654, 496], [654, 536]], 13, 12));
  add(limb([[686, 496], [686, 536]], 13, 12));
  add(`${shoe(650, 548, -1)}${shoe(690, 548)}`);
  add(`<path class="o" fill="${tone(0.85)}" d="${D.skirt}"/>${shade([{ lin: [670, 0, 728, 0], s: [0, 0.3] }], D.skirt)}`);
  add(torso(670, 150, '#fff', { w0: 36, w1: 42, h: 140 }));
  add(`<path class="o" d="M636 300 H704 V420 Q670 430 636 420 Z"/>
<path class="t" d="M640 300 L652 214 M700 300 L688 214"/>`);
  add(neck(670, 150));
  add(head(670, 150, { back: 'bob', hair: 'fringe', look: -4 }));
  add(arm([[704, 222], [716, 286], [712, 336]], '#fff', 0, [17, 14]));
  add(arm([[636, 222], [612, 280], [590, 292]], '#fff', -80, [17, 14]));
  add(`<path class="k" d="M562 296 L606 296 L604 302 L564 302 Z"/>
<path class="o" d="M568 296 L572 262 L598 264 L594 296 Z"/>
<path class="h" d="M576 272 h16 M575 280 h16 M574 288 h12"/>`);
  add(arm([[514, 272], [538, 322], [566, 302]], tone(0.75), -80));
}
