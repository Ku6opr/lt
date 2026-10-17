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
  const { add, shade, floor, limb, shoe, tone, pat, f, W, H } = kit;
  const { head, torso, neck, arm } = people(kit);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    unit: 'M24 56 H304 V424 H24 Z',
    top: 'M452 350 L796 350 L804 366 L444 366 Z',
    front: 'M444 366 H804 V548 H444 Z',
    till: 'M690 318 H786 V350 H690 Z',
    skirt: 'M336 338 L424 338 L452 506 L308 506 Z',
    basket: 'M228 382 L326 382 L316 446 L238 446 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor({ step: 80 }));
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [190, 428, 170, 12], s: 0.7 }]));
  add(shade([{ rad: [640, 552, 190, 14], s: 0.7 }]));
  add(shade([{ rad: [392, 556, 76, 10], s: 0.7 }]));

  add(`<circle class="o" cx="740" cy="118" r="36"/>
<circle class="o" cx="740" cy="118" r="29"/>
<path class="h" d="M740 92 v6 M740 138 v6 M714 118 h6 M760 118 h6"/>
<path class="t" d="M740 118 L726 106 M740 118 L754 100"/>
<circle class="k" cx="740" cy="118" r="3"/>`);

  add(`<path class="o" fill="${tone(0.16)}" d="${D.unit}"/>
${shade([{ lin: [164, 0, 304, 0], s: [0, 0.4] }], D.unit)}
<path class="o" fill="${tone(0.32)}" d="M24 56 H304 V66 H24 Z M24 150 H304 V160 H24 Z M24 252 H304 V262 H24 Z M24 352 H304 V362 H24 Z M24 414 H304 V424 H24 Z"/>
<path class="o" fill="${tone(0.32)}" d="M16 50 H32 V426 H16 Z M296 50 H312 V426 H296 Z"/>`);

  const loaf = (x, y) => `<path class="o" fill="${tone(0.42)}" d="M${x - 30} ${y} Q${x - 31} ${y - 26} ${x} ${y - 27} Q${x + 31} ${y - 26} ${x + 30} ${y} Z"/><path class="w" d="M${x - 16} ${y - 8} l8 -12 M${x - 3} ${y - 6} l8 -14 M${x + 10} ${y - 6} l7 -12"/>`;
  add([66, 133, 200, 266].map((x) => loaf(x, 150)).join(''));
  add(shade([{ rad: [176, 150, 130, 5], s: 0.4 }]));

  const bottle = (x, y) => `<path class="o" d="M${x - 15} ${y} L${x - 15} ${y - 44} Q${x - 15} ${y - 52} ${x - 7} ${y - 58} L${x - 7} ${y - 70} L${x + 7} ${y - 70} L${x + 7} ${y - 58} Q${x + 15} ${y - 52} ${x + 15} ${y - 44} L${x + 15} ${y} Z"/><rect class="k" x="${x - 9}" y="${y - 78}" width="18" height="9" rx="2"/><path class="o" fill="${tone(0.35)}" d="M${x - 15} ${y - 34} H${x + 15} V${y - 14} H${x - 15} Z"/><path class="o" d="M${x} ${y - 31} q-6 8 0 11 q6 -3 0 -11 Z"/>`;
  add([66, 114, 162, 210, 258].map((x) => bottle(x, 252)).join(''));

  add(`<path class="o" fill="${tone(0.18)}" d="M54 352 L54 316 Q54 302 100 302 Q146 302 146 316 L146 352 Z"/>
<ellipse class="o" fill="${tone(0.1)}" cx="100" cy="316" rx="46" ry="12"/>
<path class="o" fill="${tone(0.18)}" d="M186 352 L186 318 L272 300 L272 352 Z"/>
<path class="o" fill="${tone(0.1)}" d="M186 318 L272 300 L260 292 L186 310 Z"/>
${[[80, 338, 6], [108, 330, 4], [124, 342, 5], [206, 336, 6], [232, 324, 5], [254, 340, 6], [244, 312, 3]].map(([x, y, r]) => `<circle class="o" fill="${tone(0.45)}" cx="${x}" cy="${y}" r="${r}"/>`).join('')}`);

  add(`<path class="o" fill="${tone(0.5)}" d="M560 258 H664 V272 H560 Z M564 272 h9 v80 h-9 Z M651 272 h9 v80 h-9 Z"/>`);
  add(torso(612, 214, tone(0.35), { w0: 38, w1: 44, h: 110 }));
  add(`<path class="o" d="M604 258 L612 270 L598 274 Z M620 258 L612 270 L626 274 Z"/>`);
  add(neck(612, 214));
  add(`<path class="o" d="M604 258 L612 270 L598 274 Z M620 258 L612 270 L626 274 Z"/>`);
  add(head(612, 214, { back: 'bob', hair: 'fringe', hairFill: tone(0.5), glasses: true, look: -3 }));
  add(arm([[646, 284], [668, 326], [700, 316]], tone(0.35), -60, [18, 14]));

  add(`<path class="o" fill="${tone(0.62)}" d="${D.top}"/>
<path class="o" fill="${tone(0.28)}" d="${D.front}"/>
${shade([{ lin: [620, 0, 804, 0], s: [0, 0.5] }, { lin: [0, 366, 0, 392], s: [0.4, 0] }], D.front)}
<path class="h" d="M444 396 H804"/>
<path class="o" fill="${tone(0.45)}" d="${D.till}"/>
${shade([{ lin: [740, 0, 786, 0], s: [0, 0.45] }], D.till)}
<path class="h" d="M702 328 h10 M718 328 h10 M734 328 h10 M702 340 h10 M718 340 h10 M734 340 h10"/>
<rect class="o" x="756" y="326" width="22" height="16"/>
<path class="k" d="M736 318 L742 296 L750 296 L746 318 Z"/>
<path class="o" fill="${tone(0.85)}" d="M720 262 L776 262 L772 298 L716 298 Z"/>
<path class="w" d="M726 272 h30 M726 284 h20"/>`);

  add(arm([[578, 284], [560, 326], [536, 306]], tone(0.35), -70, [18, 14]));

  add(`<path class="o" fill="${tone(0.45)}" d="M246 392 L242 340 Q243 332 250 330 L250 316 L260 316 L260 330 Q267 332 268 340 L270 392 Z"/><rect class="k" x="248" y="308" width="14" height="9" rx="2"/>
<path class="o" fill="${tone(0.3)}" d="M276 388 L300 314 Q306 304 314 310 Q318 316 314 328 L294 392 Z"/><path class="w" d="M302 328 l8 3 M298 342 l8 3 M294 356 l8 3"/>`);
  add(`<path class="o" fill="${tone(0.14)}" d="${D.basket}"/>
${shade([{ lin: [277, 0, 326, 0], s: [0, 0.45] }], D.basket)}
<path class="h" d="M230 398 H324 M232 414 H322 M234 430 H320 M252 382 L256 446 M277 382 V446 M302 382 L298 446"/>`);

  add(limb([[364, 500], [364, 536]], 14, 12));
  add(limb([[396, 500], [396, 536]], 14, 12));
  add(`${shoe(360, 548, -1)}${shoe(400, 548)}`);
  add(`<path class="o" fill="${pat('dots')}" d="${D.skirt}"/>
${shade([{ lin: [380, 0, 448, 0], s: [0, 0.45] }], D.skirt)}`);
  add(torso(380, 150, pat('dots'), { w0: 37, w1: 44, h: 150 }));
  add(neck(380, 150));
  add(`<path class="t" d="M352 206 L420 316"/>
<path class="o" fill="${tone(0.7)}" d="M404 312 L444 312 L448 352 L400 352 Z"/>
<path class="h" d="M404 324 H446"/>`);
  add(head(380, 150, { back: 'long', hair: 'fringe', look: 3 }));
  add(`<path class="t" d="M234 384 Q277 326 320 384"/>`);
  add(arm([[348, 224], [322, 288], [279, 344]], pat('dots'), 40, [17, 14]));
  add(arm([[412, 224], [452, 262], [508, 290]], pat('dots'), -70, [17, 14]));
  add(`<g transform="rotate(-14 524 290)"><rect class="o" fill="${tone(0.3)}" x="508" y="280" width="34" height="18"/><circle class="o" cx="525" cy="289" r="5"/></g>`);
}
