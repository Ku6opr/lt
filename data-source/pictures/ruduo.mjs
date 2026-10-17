export default function draw({ add, def, clip, shade, limb, hand, shoe, tone, pat, rng, f, W, H }) {
  def(`<pattern id="weave" width="14" height="10" patternUnits="userSpaceOnUse"><rect width="14" height="10" fill="${tone(0.42)}"/><path d="M0 5 Q3.5 1 7 5 Q10.5 9 14 5" fill="none" stroke="#111" stroke-width="1.2"/><path d="M0 0.5 H14" stroke="#111" stroke-width="0.8"/></pattern>`);

  const leaf = (x, y, a, s = 1, fill = tone(0.5)) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)}) scale(${s})"><path class="o" fill="${fill}" d="M-12 0 Q-4 -9 12 0 Q-4 9 -12 0 Z"/><path class="h" d="M-14 0 H9"/></g>`;
  const mushroom = (x, y, s = 1, cap = tone(0.75)) => `<g transform="translate(${x} ${y}) scale(${s})">
<path class="o" d="M-10 0 Q-12 -18 -8 -30 L8 -30 Q12 -18 10 0 Q0 4 -10 0 Z"/>
${shade([{ lin: [0, 0, 10, 0], s: [0, 0.4] }], 'M-10 0 Q-12 -18 -8 -30 L8 -30 Q12 -18 10 0 Q0 4 -10 0 Z')}
<path class="o" fill="${cap}" d="M-26 -26 Q-26 -52 0 -54 Q26 -52 26 -26 Q0 -20 -26 -26 Z"/>
${shade([{ lin: [0, 0, 26, 0], s: [0, 0.5] }], 'M-26 -26 Q-26 -52 0 -54 Q26 -52 26 -26 Q0 -20 -26 -26 Z')}
<path class="w" d="M-16 -42 q6 -6 12 -6"/></g>`;
  const crown = (cx, cy, rx, ry, t) => {
    const n = 9;
    const pts = Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
    });
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p = pts[i];
      const q = pts[(i + 1) % n];
      const mx = (p[0] + q[0]) / 2;
      const my = (p[1] + q[1]) / 2;
      const ox = (mx - cx) * 0.32;
      const oy = (my - cy) * 0.32;
      d += ` Q${f(mx + ox)} ${f(my + oy)} ${f(q[0])} ${f(q[1])}`;
    }
    return `<path class="o" fill="${tone(t)}" d="${d} Z"/>${shade([{ lin: [cx - rx * 0.2, cy - ry, cx + rx, cy + ry * 0.5], s: [0, 0.45] }], d + ' Z')}`;
  };

  const ground = `M-10 392 Q200 382 400 390 Q600 398 ${W + 10} 386 V${H + 10} H-10 Z`;
  add(`<path class="o" fill="${tone(0.14)}" d="${ground}"/>`);
  const RG = rng(8);
  const tufts = [];
  for (let i = 0; i < 40; i++) {
    const x = RG() * W;
    const y = 410 + RG() * 185;
    tufts.push(`M${f(x - 5)} ${f(y)} l2 -8 M${f(x)} ${f(y)} l0 -10 M${f(x + 5)} ${f(y)} l-2 -8`);
  }
  add(shade([{ lin: [0, 386, 0, 470], s: [0.3, 0] }], ground));
  add(`<path class="h" stroke="${tone(0.6)}" d="${tufts.join(' ')}"/>`);

  add(`<rect class="o" fill="${tone(0.25)}" x="596" y="70" width="26" height="330"/>${shade([{ lin: [609, 0, 622, 0], s: [0, 0.4] }], 'M596 70 H622 V400 H596 Z')}`);
  add(`<rect class="o" fill="${tone(0.25)}" x="318" y="60" width="22" height="336"/>${shade([{ lin: [329, 0, 340, 0], s: [0, 0.4] }], 'M318 60 H340 V396 H318 Z')}`);
  add(crown(612, 40, 120, 80, 0.2));
  add(crown(334, 26, 80, 56, 0.18));
  add(`<rect class="o" fill="${tone(0.3)}" x="738" y="40" width="30" height="368"/>${shade([{ lin: [753, 0, 768, 0], s: [0, 0.4] }], 'M738 40 H768 V408 H738 Z')}`);
  add(crown(760, 20, 110, 90, 0.28));


  add(shade([{ rad: [180, 566, 130, 16], s: 0.7 }]));
  const trunk = 'M118 570 Q132 540 130 480 L134 120 L176 120 L174 480 Q172 540 190 570 Q170 562 154 566 Q138 562 118 570 Z';
  add(`<path class="o" fill="${tone(0.55)}" d="${trunk}"/>
${shade([{ lin: [150, 0, 182, 0], s: [0, 0.55] }], trunk)}
<path class="h" d="M146 180 q4 30 0 60 M160 300 q-4 30 0 60 M150 400 q4 30 0 50 M162 220 q3 16 0 30"/>
<path class="o" fill="${tone(0.55)}" d="M172 262 Q240 246 342 236 L344 248 Q250 262 174 286 Z"/>
<path class="o" fill="${tone(0.55)}" d="M296 242 Q312 222 330 214 L333 220 Q318 230 306 244 Z"/>
<ellipse class="k" cx="152" cy="330" rx="8" ry="11"/>`);
  add(crown(150, 40, 170, 120, 0.42));

  const vx = 290;
  const vy = 240;
  const tail = `M${vx - 10} ${vy - 4} C${vx - 62} ${vy - 4} ${vx - 76} ${vy - 74} ${vx - 38} ${vy - 96} C${vx - 14} ${vy - 108} ${vx + 2} ${vy - 88} ${vx - 12} ${vy - 78} C${vx - 22} ${vy - 86} ${vx - 40} ${vy - 74} ${vx - 40} ${vy - 54} C${vx - 40} ${vy - 34} ${vx - 26} ${vy - 22} ${vx - 6} ${vy - 18} Z`;
  add(`<path class="o" fill="${tone(0.6)}" d="${tail}"/>
${shade([{ lin: [vx - 70, vy - 90, vx - 10, vy], s: [0, 0.35] }], tail)}
<path class="h" d="M${vx - 56} ${vy - 60} q8 2 12 10 M${vx - 52} ${vy - 34} q8 0 12 8 M${vx - 46} ${vy - 86} q8 0 10 8"/>
<ellipse class="o" fill="${tone(0.6)}" cx="${vx}" cy="${vy - 22}" rx="16" ry="21"/>
${shade([{ lin: [vx, 0, vx + 16, 0], s: [0, 0.4] }], `M${vx - 16} ${vy - 22} A16 21 0 1 1 ${vx + 16} ${vy - 22} A16 21 0 1 1 ${vx - 16} ${vy - 22} Z`)}
<ellipse class="o" cx="${vx + 4}" cy="${vy - 18}" rx="7" ry="11"/>
<path class="o" fill="${tone(0.6)}" d="M${vx + 2} ${vy - 52} l2 -14 l7 12 Z M${vx + 16} ${vy - 52} l4 -13 l4 13 Z"/>
<circle class="o" fill="${tone(0.6)}" cx="${vx + 10}" cy="${vy - 46}" r="13"/>
<circle class="k" cx="${vx + 14}" cy="${vy - 48}" r="2.6"/>
<circle class="k" cx="${vx + 23}" cy="${vy - 43}" r="2"/>
<ellipse class="o" cx="${vx + 14}" cy="${vy - 26}" rx="5" ry="4"/>
<path class="o" fill="${tone(0.6)}" d="M${vx - 10} ${vy} q4 -6 10 -2 l-2 4 Z M${vx + 6} ${vy} q4 -6 10 -2 l-2 4 Z"/>`);

  add(shade([{ rad: [120, 556, 40, 6], s: 0.7 }]));
  add(shade([{ rad: [196, 572, 40, 6], s: 0.7 }]));
  add(shade([{ rad: [256, 552, 32, 5], s: 0.7 }]));
  add(mushroom(110, 552, 1));
  add(mushroom(186, 568, 1.12));
  add(mushroom(250, 550, 0.85));

  const R = rng(3);
  const gl = [];
  for (let i = 0; i < 30; i++) {
    const x = 20 + R() * 760;
    const y = 420 + R() * 170;
    if (x > 420 && x < 560 && y > 480) continue;
    if (x > 620 && x < 760 && y > 490) continue;
    if (x > 80 && x < 290 && y > 500) continue;
    gl.push(leaf(x, y, R() * 360, 1.15 + R() * 0.4, tone([0.25, 0.5, 0.75][i % 3])));
  }
  add(gl.join(''));

  const fl = [[340, 300, 30], [560, 220, 120], [690, 320, 200], [250, 360, 70], [430, 260, 300], [650, 150, 40]];
  add(fl.map(([x, y, a], i) => leaf(x, y, a, 1.45, tone([0.25, 0.5, 0.75][i % 3]))).join(''));
  add(`<path class="h" d="M330 290 q-6 -10 -2 -20 M550 210 q-8 -8 -4 -18 M680 310 q-4 -10 2 -18 M240 352 q-6 -8 -2 -16" stroke="${tone(0.6)}"/>`);

  const gx = 470;
  add(shade([{ rad: [490, 566, 80, 11], s: 0.75 }]));
  add(`<path class="t" d="M${gx - 16} 500 V550 M${gx + 16} 500 V550"/>`);
  add(limb([[gx - 16, 496], [gx - 16, 548]], 15, 13));
  add(limb([[gx + 16, 496], [gx + 16, 548]], 15, 13));
  add(`${shoe(gx - 20, 562, -1)}${shoe(gx + 22, 562, 1)}`);
  const coat = `M${gx - 36} 238 Q${gx - 32} 212 ${gx} 212 Q${gx + 32} 212 ${gx + 36} 238 L${gx + 54} 506 Q${gx} 514 ${gx - 54} 506 Z`;
  add(`<path class="o" fill="${tone(0.45)}" d="${coat}"/>
${shade([{ lin: [gx + 6, 0, gx + 54, 0], s: [0, 0.5] }], coat)}
<path class="t" d="M${gx + 4} 222 L${gx + 8} 508"/>
<circle class="k" cx="${gx - 4}" cy="270" r="3.4"/><circle class="k" cx="${gx - 3}" cy="320" r="3.4"/><circle class="k" cx="${gx - 2}" cy="370" r="3.4"/><circle class="k" cx="${gx - 1}" cy="420" r="3.4"/>
<path class="o" fill="${tone(0.7)}" d="M${gx - 44} 328 L${gx + 48} 328 L${gx + 49} 342 L${gx - 45} 342 Z"/>
<path class="o" fill="${tone(0.25)}" d="M${gx - 20} 216 L${gx} 244 L${gx + 20} 216 L${gx + 10} 212 L${gx} 226 L${gx - 10} 212 Z"/>
<rect class="o" x="${gx - 6}" y="192" width="12" height="22"/>`);

  add(limb([[gx - 30, 236], [gx - 58, 290], [gx - 72, 326]], 19, 15, tone(0.45)));
  add(limb([[gx + 30, 236], [gx + 54, 292], [gx + 66, 336]], 19, 15, tone(0.45)));

  add(`<g transform="translate(${gx - 78} 344) rotate(-6)">${mushroom(0, 0, 0.8)}</g>`);
  add(hand(gx - 76, 332, 10));

  const bx = gx + 76;
  const basket = `M${bx - 48} 392 Q${bx - 44} 452 ${bx} 454 Q${bx + 44} 452 ${bx + 48} 392 Z`;
  add(`<path class="t" stroke-width="4.5" d="M${bx - 42} 394 Q${bx - 30} 320 ${bx - 6} 330 Q${bx + 30} 340 ${bx + 42} 394"/>
<path class="t" stroke-width="2" stroke="${tone(0.42)}" d="M${bx - 42} 394 Q${bx - 30} 320 ${bx - 6} 330 Q${bx + 30} 340 ${bx + 42} 394"/>
<g transform="translate(${bx - 26} 402) rotate(-16)">${mushroom(0, 0, 0.74)}</g>
<g transform="translate(${bx + 2} 398)">${mushroom(0, 0, 0.78)}</g>
<g transform="translate(${bx + 30} 404) rotate(16)">${mushroom(0, 0, 0.72)}</g>
<path class="o" fill="url(#weave)" d="${basket}"/>
${shade([{ lin: [bx, 0, bx + 48, 0], s: [0, 0.45] }], basket)}
<path class="o" fill="${tone(0.42)}" d="M${bx - 52} 386 Q${bx} 396 ${bx + 52} 386 L${bx + 50} 398 Q${bx} 408 ${bx - 50} 398 Z"/>`);
  add(hand(gx + 68, 338, -20));

  add(`<ellipse class="o" cx="${gx}" cy="160" rx="29" ry="35"/>
<path class="o" d="M${gx - 30} 166 Q${gx - 34} 126 ${gx} 124 Q${gx + 34} 126 ${gx + 30} 166 Q${gx + 24} 142 ${gx} 140 Q${gx - 24} 142 ${gx - 30} 166 Z"/>
<path class="h" d="M${gx} 126 Q${gx - 14} 132 ${gx - 24} 154 M${gx} 126 Q${gx + 14} 132 ${gx + 24} 154 M${gx - 8} 128 Q${gx - 20} 140 ${gx - 27} 162 M${gx + 8} 128 Q${gx + 20} 140 ${gx + 27} 162"/>
<circle class="o" cx="${gx}" cy="114" r="15"/>
<path class="h" d="M${gx} 114 m-8 0 a8 8 0 1 1 8 8 a4 4 0 1 1 -4 -4"/>
<circle class="o" cx="${gx - 12}" cy="164" r="9"/><circle class="o" cx="${gx + 12}" cy="164" r="9"/>
<path class="t" d="M${gx - 3} 164 h6 M${gx - 21} 162 l-8 -2 M${gx + 21} 162 l8 -2"/>
<circle class="k" cx="${gx - 12}" cy="165" r="2.4"/><circle class="k" cx="${gx + 12}" cy="165" r="2.4"/>
<path class="h" d="M${gx} 168 q-4 10 2 11"/>
<path class="t" d="M${gx - 9} 184 q9 5 18 0"/>`);

  const ex = 690;
  const ey = 548;
  add(shade([{ rad: [ex + 14, ey + 8, 62, 9], s: 0.75 }]));
  const spikes = [];
  for (let i = 0; i <= 14; i++) {
    const a = Math.PI + (i / 14) * Math.PI;
    const r1 = 40;
    const r2 = 54;
    const a2 = a + Math.PI / 28;
    spikes.push(`${i ? 'L' : 'M'}${f(ex + 8 + Math.cos(a) * r1 * 1.25)} ${f(ey + Math.sin(a) * r1)} L${f(ex + 8 + Math.cos(a2) * r2 * 1.25)} ${f(ey + Math.sin(a2) * r2)}`);
  }
  const back = `${spikes.join(' ')} L${ex + 58} ${ey} Z`;
  add(`<path class="k" d="${back}"/>
<path class="o" fill="${tone(0.3)}" d="M${ex - 40} ${ey} Q${ex - 34} ${ey - 30} ${ex - 18} ${ey - 30} Q${ex - 30} ${ey - 10} ${ex - 64} ${ey - 4} Q${ex - 64} ${ey + 4} ${ex - 40} ${ey + 2} Z"/>
<path class="o" d="M${ex - 30} ${ey - 30} Q${ex - 54} ${ey - 20} ${ex - 70} ${ey - 4} Q${ex - 50} ${ey + 4} ${ex - 26} ${ey} Z"/>
<circle class="k" cx="${ex - 72}" cy="${ey - 5}" r="4"/>
<circle class="k" cx="${ex - 40}" cy="${ey - 16}" r="3"/>
<path class="h" d="M${ex - 34} ${ey - 4} q-3 4 -8 4"/>
<path class="o" d="M${ex - 26} ${ey + 2} q-2 8 6 8 M${ex + 30} ${ey + 2} q-2 8 6 8"/>
<path class="t" d="M${ex + 8} ${ey - 64} q2 -8 -2 -14"/>
<circle class="o" fill="${tone(0.4)}" cx="${ex + 8}" cy="${ey - 50}" r="17"/>
${shade([{ lin: [ex + 8, 0, ex + 25, 0], s: [0, 0.45] }], `M${ex - 9} ${ey - 50} A17 17 0 1 1 ${ex + 25} ${ey - 50} A17 17 0 1 1 ${ex - 9} ${ey - 50} Z`)}
<path class="o" fill="${tone(0.6)}" d="M${ex + 6} ${ey - 70} q10 -10 20 -4 q-10 8 -20 4 Z"/>
<path class="w" d="M${ex} ${ey - 58} q4 -4 8 -4"/>`);
}
