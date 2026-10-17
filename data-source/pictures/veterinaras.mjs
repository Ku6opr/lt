export default function draw(kit) {
  const { add, shade, floor, limb, hand, shoe, tone, W, H } = kit;
  const at = placer(kit);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    top: 'M196 372 L604 372 L616 390 L184 390 Z',
    edge: 'M184 390 H616 V404 H184 Z',
    body: 'M300 374 Q262 362 274 330 Q292 296 382 294 Q482 292 518 320 Q540 344 520 374 Z',
    b1: 'M576 96 H604 V150 H576 Z',
    b3: 'M696 90 H728 V150 H696 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<path class="k" d="M570 160 h6 v22 l-6 -6 Z M754 160 h6 v22 l-6 -6 Z"/>
<rect class="o" fill="${tone(0.35)}" x="560" y="150" width="210" height="10"/>
<path class="o" fill="${tone(0.4)}" d="${D.b1}"/>${shade([{ lin: [590, 0, 604, 0], s: [0, 0.4] }], D.b1)}
<rect class="o" x="584" y="84" width="12" height="13"/><rect class="k" x="581" y="76" width="18" height="9"/>
<rect class="o" x="644" y="90" width="12" height="18"/><rect class="o" fill="${tone(0.6)}" x="642" y="82" width="16" height="9"/>
<circle class="o" cx="650" cy="128" r="22"/>${shade([{ lin: [650, 0, 672, 0], s: [0, 0.4] }], 'M628 128 A22 22 0 1 0 672 128 A22 22 0 1 0 628 128 Z')}
<path class="h" d="M632 132 Q650 140 668 132"/>
<path class="o" fill="${tone(0.65)}" d="${D.b3}"/>${shade([{ lin: [712, 0, 728, 0], s: [0, 0.4] }], D.b3)}
<rect class="o" x="704" y="80" width="16" height="11"/>
<rect class="o" x="700" y="110" width="24" height="24"/>
<path class="k" d="M709 114 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 v-6 h6 Z"/>`);

  add(`<rect class="o" x="44" y="64" width="160" height="176"/>
<rect class="o" fill="${tone(0.12)}" x="56" y="76" width="136" height="152"/>
${shade([{ lin: [56, 76, 192, 228], s: [0, 0.25] }], 'M56 76 H192 V228 H56 Z')}
<path class="o" fill="${tone(0.3)}" d="M56 228 V196 Q100 178 140 192 Q170 184 192 190 V228 Z"/>
<path class="k" d="M150 196 V164 h8 v32 Z"/>
<circle class="o" fill="${tone(0.45)}" cx="154" cy="140" r="26"/>
<path class="t" d="M74 110 q7 -9 14 0 q7 -9 14 0"/>
<path class="t" d="M124 76 V228 M56 152 H192"/>
<rect class="o" x="34" y="240" width="180" height="11"/>`);
  add(shade([{ rad: [400, 560, 230, 12], s: 0.7 }, { rad: [100, 564, 70, 8], s: 0.6 }, { rad: [672, 566, 52, 9], s: 0.6 }]));

  add(`<path class="o" fill="${tone(0.4)}" d="M40 318 h11 v242 h-11 Z M140 442 h10 v118 h-10 Z"/>
<path class="o" fill="${tone(0.4)}" d="M36 430 H156 V444 H36 Z"/>
<path class="h" d="M51 340 H60 M51 380 H60"/>`);
  add(`<path class="t" stroke-width="7" d="M118 426 Q150 430 152 456 Q152 478 140 486"/>
<path class="o" d="M72 432 Q60 384 96 370 Q132 384 120 432 Z"/>
<path class="t" stroke-width="4.5" d="M74 400 q12 -4 20 4 M70 418 q14 -4 24 4 M120 398 q-10 -2 -16 6 M122 416 q-10 -2 -18 6"/>
<path class="o" d="M80 432 q4 -12 12 0 Z M100 432 q4 -12 12 0 Z"/>
<circle class="o" cx="96" cy="350" r="23"/>
<path class="o" d="M76 340 l-4 -24 l18 12 Z M116 340 l4 -24 l-18 12 Z"/>
<path class="k" d="M77 332 l-2 -9 l6 5 Z M115 332 l2 -9 l-6 5 Z"/>
<path class="t" stroke-width="4.5" d="M90 330 v8 M96 328 v9 M102 330 v8"/>
<ellipse class="k" cx="91" cy="350" rx="2.6" ry="3.6"/><ellipse class="k" cx="107" cy="350" rx="2.6" ry="3.6"/>
<path class="k" d="M96 358 l-4 -3 h8 Z"/>
<path class="h" d="M96 358 v4 q-4 4 -8 1 M96 362 q4 4 8 1 M82 360 l-12 -2 M82 364 l-12 3 M110 360 l12 -2 M110 364 l12 3"/>`);

  const A = at(400, 520, 0.92);
  const coat = 'M-50 -332 Q-46 -360 0 -360 Q46 -360 50 -332 L54 -150 L-54 -150 Z';
  add(A.svg(`<path class="o" d="${coat}"/>`), A.shade([{ lin: [0, 0, 54, 0], s: [0, 0.35] }], coat));
  add(A.svg(`<rect class="o" x="-7" y="-374" width="14" height="20"/>
<path class="o" fill="${tone(0.5)}" d="M-12 -358 L0 -330 L12 -358 Z"/>
<path class="h" d="M-16 -358 L-6 -300 M16 -358 L6 -300"/>
<path class="t" d="M-16 -356 Q-30 -320 -20 -286 M16 -356 Q30 -320 20 -286 M-20 -286 Q0 -270 20 -286"/>
<circle class="k" cx="0" cy="-276" r="6"/>
<ellipse class="o" cx="0" cy="-400" rx="29" ry="34"/>
<path class="o" fill="${tone(0.35)}" d="M-30 -396 Q-34 -436 -12 -440 Q0 -430 12 -440 Q34 -436 30 -396 Q26 -418 14 -420 Q0 -414 -14 -420 Q-26 -418 -30 -396 Z"/>
<circle class="o" cx="-11" cy="-398" r="9"/><circle class="o" cx="13" cy="-398" r="9"/>
<path class="t" d="M-2 -398 h6 M-20 -400 l-9 -2 M22 -400 l8 -2"/>
<circle class="k" cx="-14" cy="-395" r="2.4"/><circle class="k" cx="10" cy="-395" r="2.4"/>
<path class="h" d="M0 -392 q-4 8 2 9"/>
<path class="t" d="M-9 -378 q9 5 18 0"/>`));

  add(`<path class="o" fill="${tone(0.15)}" d="${D.top}"/>${shade([{ lin: [400, 0, 616, 0], s: [0, 0.35] }], D.top)}
<path class="o" fill="${tone(0.4)}" d="${D.edge}"/>${shade([{ lin: [400, 0, 616, 0], s: [0, 0.4] }], D.edge)}
<path class="k" d="M214 404 h10 v152 h-10 Z M576 404 h10 v152 h-10 Z M224 500 H576 V508 H224 Z"/>`);

  add(limb([[518, 342], [546, 352], [552, 392]], 12, 7, tone(0.2)));
  add(`<path class="o" fill="${tone(0.2)}" d="${D.body}"/>${shade([{ lin: [400, 0, 530, 0], s: [0, 0.4] }], D.body)}
<ellipse class="k" cx="372" cy="318" rx="16" ry="10"/><ellipse class="k" cx="430" cy="330" rx="11" ry="7"/><ellipse class="k" cx="486" cy="314" rx="10" ry="6"/>
<ellipse class="o" fill="${tone(0.2)}" cx="470" cy="348" rx="40" ry="24"/>
<ellipse class="o" fill="${tone(0.2)}" cx="436" cy="368" rx="22" ry="7"/>`);
  add(limb([[316, 364], [264, 368], [222, 368]], 18, 15, tone(0.2)));
  add(`<ellipse class="o" fill="${tone(0.2)}" cx="216" cy="368" rx="14" ry="8"/>
<rect class="o" x="236" y="356" width="24" height="24" rx="3"/>
<path class="h" d="M242 358 l-2 20 M248 358 l-2 20 M254 358 l-2 20"/>
<ellipse class="o" fill="${tone(0.2)}" cx="262" cy="328" rx="34" ry="30"/>
<path class="o" d="M236 334 Q212 334 210 348 Q212 360 236 358 Q252 356 252 344 Z"/>
<ellipse class="k" cx="212" cy="342" rx="7" ry="5.5"/>
<path class="h" d="M226 356 q8 4 16 0"/>
<path class="t" d="M240 320 q6 5 12 0"/>
<path class="h" d="M238 310 l14 4"/>
<path class="k" d="M266 300 Q296 300 298 330 Q294 356 280 350 Q274 326 266 300 Z"/>`);

  add(A.limb([[-44, -330], [-80, -270], [-104, -222]], 21, 17, '#fff'));
  add(A.limb([[44, -330], [52, -270], [40, -226]], 21, 17, '#fff'));
  add(A.svg(`${hand(-106, -216, 40)}${hand(38, -220, -20)}`));

  const B = at(672, 560, 1);
  add(B.limb([[-13, -98], [-14, -14]], 15, 13), B.limb([[13, -98], [14, -14]], 15, 13));
  add(B.svg(`${shoe(-18, 0, -1)}${shoe(18, 0)}`));
  const dress = 'M-32 -206 Q0 -218 32 -206 L48 -94 L-48 -94 Z';
  add(B.svg(`<path class="o" fill="${tone(0.35)}" d="${dress}"/>`), B.shade([{ lin: [0, 0, 48, 0], s: [0, 0.45] }], dress));
  add(B.svg(`<rect class="o" x="-5" y="-226" width="10" height="16"/>
<path class="o" d="M-12 -212 Q0 -200 12 -212 L8 -216 Q0 -208 -8 -216 Z"/>`));
  add(B.limb([[-30, -200], [-38, -170], [-6, -150]], 14, 12, tone(0.35)), B.limb([[30, -200], [38, -170], [6, -150]], 14, 12, tone(0.35)));
  add(B.svg(`${hand(-4, -150, 60)}${hand(4, -152, -60)}
<path class="k" d="M-32 -238 Q-38 -290 0 -290 Q38 -290 32 -238 Q30 -226 24 -224 L-24 -224 Q-30 -226 -32 -238 Z"/>
<ellipse class="o" cx="0" cy="-252" rx="26" ry="30"/>
<path class="k" d="M-27 -250 Q-28 -284 0 -284 Q28 -284 27 -250 Q20 -268 0 -270 Q-20 -268 -27 -250 Z"/>
<path class="o" fill="${tone(0.15)}" d="M-26 -266 Q0 -282 26 -266 L24 -260 Q0 -276 -24 -260 Z"/>
<ellipse class="k" cx="-13" cy="-248" rx="3" ry="4"/><ellipse class="k" cx="6" cy="-248" rx="3" ry="4"/>
<path class="h" d="M-20 -256 q5 -1 9 -5 M2 -261 q4 4 9 5 M-4 -243 q-4 6 1 7"/>
<path class="t" d="M-12 -228 q7 -6 14 0"/>`));
}

function placer({ shade, limb, f }) {
  const AR = { M: 2, L: 2, T: 2, H: 1, V: 1, Q: 4, S: 4, C: 6, A: 7, Z: 0 };
  const tp = (d, ox, oy, k) => {
    const toks = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)/g) || [];
    const out = [];
    let cmd = 'M';
    let i = 0;
    while (i < toks.length) {
      if (typeof toks[i] === 'string' && /[a-zA-Z]/.test(toks[i])) {
        cmd = toks[i++];
        out.push(cmd);
        if (cmd === 'Z' || cmd === 'z') continue;
      }
      const U = cmd.toUpperCase();
      const rel = cmd !== U;
      const a = toks.slice(i, i + AR[U]).map(Number);
      i += AR[U];
      let r;
      if (U === 'H') r = [rel ? a[0] * k : ox + a[0] * k];
      else if (U === 'V') r = [rel ? a[0] * k : oy + a[0] * k];
      else if (U === 'A') r = [a[0] * k, a[1] * k, a[2], a[3], a[4], rel ? a[5] * k : ox + a[5] * k, rel ? a[6] * k : oy + a[6] * k];
      else r = a.map((v, j) => (rel ? v * k : (j % 2 ? oy : ox) + v * k));
      out.push(r.map(f).join(' '));
    }
    return out.join(' ');
  };
  return (ox, oy, k = 1) => {
    const X = (v) => f(ox + k * v);
    const Y = (v) => f(oy + k * v);
    const K = (v) => f(k * v);
    const svg = (s) =>
      s.replace(/(\s)(cx|cy|rx|ry|r|x|y|width|height|d|transform)="([^"]*)"/g, (m, sp, a, v) => {
        if (a === 'd') return `${sp}d="${tp(v, ox, oy, k)}"`;
        if (a === 'transform') return `${sp}transform="${v.replace(/rotate\(([-\d.]+)[ ,]+([-\d.]+)[ ,]+([-\d.]+)\)/g, (q, an, cx, cy) => `rotate(${an} ${X(+cx)} ${Y(+cy)})`)}"`;
        if (a === 'cx' || a === 'x') return `${sp}${a}="${X(+v)}"`;
        if (a === 'cy' || a === 'y') return `${sp}${a}="${Y(+v)}"`;
        return `${sp}${a}="${K(+v)}"`;
      });
    const sh = (specs, d) => shade(specs.map((s) => (s.lin ? { lin: [X(s.lin[0]), Y(s.lin[1]), X(s.lin[2]), Y(s.lin[3])], s: s.s } : { rad: [X(s.rad[0]), Y(s.rad[1]), K(s.rad[2]), K(s.rad[3])], s: s.s })), d && tp(d, ox, oy, k));
    const lb = (pts, w0, w1, fill) => limb(pts.map(([x, y]) => [ox + k * x, oy + k * y]), w0 * k, w1 * k, fill);
    return { svg, shade: sh, limb: lb, X, Y, K };
  };
}
