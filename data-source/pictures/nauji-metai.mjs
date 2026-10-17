export default function draw(kit) {
  const { add, shade, limb, hand, shoe, tone, pat, f, W, H } = kit;
  const at = placer(kit);
  const eyesUp = (y, dx, sh = 0) => [-dx + sh, dx + sh].map((x) => `<ellipse class="h" fill="#fff" cx="${x}" cy="${y}" rx="5.5" ry="6.5"/><circle class="k" cx="${x}" cy="${y - 3}" r="2.8"/>`).join('');
  const SKY = tone(0.85);
  const D = {
    sky: `M0 0 H${W} V440 H0 Z`,
    snow: 'M0 432 Q200 420 400 430 Q600 440 800 426 V600 H0 Z',
    house: 'M40 250 H240 V446 H40 Z',
    roof: 'M18 258 L140 148 L262 258 Z'
  };

  add(`<path d="${D.sky}" fill="${SKY}"/>`, shade([{ lin: [0, 0, 0, 440], s: [0.5, 0] }], D.sky));

  const burst = (cx, cy, r, n, rot = 0) =>
    Array.from({ length: n }, (_, i) => {
      const a = rot + (i * 2 * Math.PI) / n;
      const c = Math.cos(a);
      const s = Math.sin(a);
      return `<path class="w" stroke-width="3" d="M${f(cx + c * r * 0.32)} ${f(cy + s * r * 0.32)} L${f(cx + c * r * 0.86)} ${f(cy + s * r * 0.86)}"/><circle cx="${f(cx + c * r)}" cy="${f(cy + s * r)}" r="3.2" fill="#fff"/>`;
    }).join('') + `<circle cx="${cx}" cy="${cy}" r="5" fill="#fff"/>`;
  add(burst(300, 78, 50, 12), burst(486, 100, 70, 16, 0.2), burst(664, 64, 48, 12, 0.1));
  add(`<path class="w" stroke-width="1.6" stroke-dasharray="4 7" d="M300 140 Q296 260 286 400 M486 184 Q490 300 500 400 M664 124 Q670 260 690 400"/>`);
  const sparks = [[30, 160], [200, 34], [392, 28], [574, 30], [770, 118], [590, 178], [400, 190], [760, 30], [240, 120], [30, 40]];
  add(sparks.map(([x, y]) => `<path fill="#fff" d="M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z"/>`).join(''));
  add(`<circle class="o" cx="96" cy="70" r="30"/>
<circle class="h" cx="86" cy="62" r="7"/><circle class="h" cx="106" cy="82" r="5"/><circle class="h" cx="108" cy="58" r="3"/>`);

  add(`<path class="o" d="${D.snow}"/>`, shade([{ lin: [0, 430, 0, 470], s: [0.3, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.14] }], D.snow));
  add(`<path class="h" d="M60 500 q20 -6 40 0 M240 540 q24 -6 48 0 M120 572 q18 -5 36 0 M700 520 q22 -6 44 0 M560 590 q20 -5 40 0"/>`);

  add(`<rect class="o" fill="${tone(0.6)}" x="190" y="168" width="24" height="60"/>
<path class="o" d="M186 170 Q202 156 218 170 L218 176 H186 Z"/>
<path class="o" fill="${tone(0.35)}" d="${D.house}"/>
${shade([{ lin: [140, 0, 240, 0], s: [0, 0.45] }], D.house)}
<path class="o" fill="${tone(0.75)}" d="${D.roof}"/>
<path class="o" d="M10 262 L140 142 L270 262 Q262 272 252 264 L140 166 L30 264 Q20 272 10 262 Z"/>
<rect class="o" x="60" y="284" width="58" height="56"/><rect class="o" x="162" y="284" width="58" height="56"/>
<path class="t" d="M89 284 V340 M60 312 H118 M191 284 V340 M162 312 H220"/>
<rect class="o" x="56" y="340" width="66" height="8"/><rect class="o" x="158" y="340" width="66" height="8"/>
<rect class="o" fill="${tone(0.75)}" x="114" y="368" width="52" height="78"/>
<circle class="o" cx="156" cy="410" r="3"/>
<path class="o" d="M106 446 H174 V454 H106 Z"/>`);

  add(`<rect class="k" x="736" y="206" width="9" height="244"/>
<path class="k" d="M726 450 h29 v8 h-29 Z"/>
<ellipse cx="740" cy="190" rx="44" ry="44" fill="#fff" opacity="0.25"/>
<path class="o" d="M722 210 H760 L754 176 H728 Z"/>
<path class="k" d="M720 178 L741 158 L762 178 Z M716 208 h50 v6 h-50 Z"/>
<path class="t" d="M741 168 V214"/>
${shade([{ rad: [740, 452, 34, 6], s: 0.6 }])}`);

  add(shade([{ rad: [386, 566, 68, 10], s: 0.6 }, { rad: [506, 566, 44, 8], s: 0.6 }, { rad: [626, 566, 62, 10], s: 0.6 }]));

  const A = at(380, 560, 0.86);
  add(A.limb([[-18, -200], [-20, -16]], 28, 24, tone(0.85)), A.limb([[18, -200], [20, -16]], 28, 24, tone(0.85)));
  add(A.svg(`${shoe(-24, 0, -1)}${shoe(24, 0)}`));
  const coat = 'M-46 -332 Q-42 -358 0 -358 Q42 -358 46 -332 L56 -150 L-56 -150 Z';
  add(A.svg(`<path class="o" fill="${tone(0.5)}" d="${coat}"/>`), A.shade([{ lin: [0, 0, 56, 0], s: [0, 0.45] }], coat));
  add(A.svg(`<path class="t" d="M0 -350 V-152"/><circle class="k" cx="-9" cy="-300" r="3.5"/><circle class="k" cx="-9" cy="-260" r="3.5"/><circle class="k" cx="-9" cy="-220" r="3.5"/>
<path class="h" d="M-34 -200 h18 M16 -200 h18"/>
<rect class="o" x="-7" y="-372" width="14" height="18"/>
<path class="o" fill="${tone(0.2)}" d="M-26 -364 Q0 -350 26 -364 L28 -342 Q0 -330 -28 -342 Z M8 -344 L22 -344 L26 -286 L12 -286 Z"/>`));
  add(A.limb([[-40, -334], [-62, -392], [-70, -452]], 21, 17, tone(0.5)));
  add(A.svg(`<ellipse class="o" cx="-71" cy="-462" rx="8" ry="11" transform="rotate(-8 -71 -462)"/><path class="o" d="M-75 -470 L-77 -484 Q-74 -488 -71 -484 L-68 -470 Z"/>`));
  add(A.svg(`<ellipse class="o" cx="0" cy="-398" rx="29" ry="34"/>
<path class="o" fill="${tone(0.85)}" d="M-30 -408 Q-32 -446 0 -448 Q32 -446 30 -408 Z"/>
<path class="o" fill="${tone(0.55)}" d="M-33 -418 H33 V-402 H-33 Z"/>
<path class="h" d="M-20 -424 V-440 M-8 -420 V-446 M8 -420 V-446 M20 -424 V-440"/>
${eyesUp(-394, 11, -1)}
<path class="h" d="M-20 -405 q6 -5 12 -2 M2 -407 q6 -3 12 2 M-1 -388 q-3 7 2 8"/>
<path class="k" d="M-9 -378 Q0 -374 9 -378 Q7 -369 0 -369 Q-7 -369 -9 -378 Z"/>`));

  const C = at(622, 560, 0.78);
  add(C.limb([[-15, -114], [-16, -16]], 20, 18, tone(0.85)), C.limb([[15, -114], [16, -16]], 20, 18, tone(0.85)));
  add(C.svg(`${shoe(-20, 0, -1)}${shoe(20, 0)}`));
  add(C.svg(`<path class="k" d="M-36 -380 Q-44 -446 0 -446 Q44 -446 36 -380 Q40 -346 30 -332 L-30 -332 Q-40 -346 -36 -380 Z"/>`));
  const mcoat = 'M-42 -332 Q-38 -356 0 -356 Q38 -356 42 -332 L60 -108 L-60 -108 Z';
  add(C.svg(`<path class="o" fill="${tone(0.3)}" d="${mcoat}"/>`), C.shade([{ lin: [0, 0, 60, 0], s: [0, 0.45] }], mcoat));
  add(C.svg(`<path class="t" d="M4 -350 L8 -110"/><circle class="k" cx="-6" cy="-290" r="3.5"/><circle class="k" cx="-5" cy="-240" r="3.5"/><circle class="k" cx="-4" cy="-190" r="3.5"/>
<rect class="o" x="-6" y="-370" width="12" height="16"/>
<path class="o" fill="${pat('stH')}" d="M-26 -364 Q0 -350 26 -364 L28 -340 Q0 -328 -28 -340 Z M-22 -342 L-8 -342 L-12 -270 L-26 -272 Z"/>
<path class="h" d="M-24 -270 l-2 8 M-19 -270 v8 M-14 -270 l2 8"/>`));
  add(C.limb([[38, -334], [50, -262], [52, -192]], 19, 15, tone(0.3)));
  add(C.svg(`${hand(52, -184, 5)}
<ellipse class="o" cx="0" cy="-398" rx="28" ry="33"/>
<path class="o" fill="${tone(0.15)}" d="M-30 -412 Q-30 -452 0 -454 Q30 -452 30 -412 Z"/>
<path class="o" fill="${pat('stV')}" d="M-32 -422 H32 V-408 H-32 Z"/>
<circle class="o" cx="0" cy="-460" r="11"/>
<path class="h" d="M-6 -466 l12 12 M6 -466 l-12 12 M0 -471 v22"/>
${eyesUp(-394, 11)}
<path class="h" d="M-18 -405 q6 -5 12 -2 M5 -407 q6 -3 12 2 M0 -388 q-3 7 2 8"/>
<path class="t" d="M-8 -377 q8 6 16 0"/>`));

  const B = at(504, 560, 0.82);
  add(B.limb([[-14, -116], [-15, -18]], 19, 17, tone(0.6)), B.limb([[14, -116], [15, -18]], 19, 17, tone(0.6)));
  add(B.svg(`${shoe(-18, 0, -1)}${shoe(18, 0)}`));
  const jacket = 'M-36 -206 Q-32 -224 0 -224 Q32 -224 36 -206 L42 -110 L-42 -110 Z';
  add(B.svg(`<path class="o" fill="${tone(0.18)}" d="${jacket}"/>`), B.shade([{ lin: [0, 0, 42, 0], s: [0, 0.4] }], jacket));
  add(B.svg(`<path class="h" d="M-37 -176 H37 M-39 -144 H39 M0 -222 V-112"/>
<path class="o" fill="${pat('stH')}" d="M-20 -228 Q0 -220 20 -228 L22 -212 Q0 -204 -22 -212 Z"/>`));
  const hL = [429, 421];
  const hR = [572, 424];
  add(limb([[+B.X(-30), +B.Y(-204)], [+B.X(-62), +B.Y(-186)], [hL[0] + 6, hL[1] - 4]], 15, 13, tone(0.18)));
  add(limb([[+B.X(30), +B.Y(-204)], [+B.X(62), +B.Y(-184)], [hR[0] - 6, hR[1] - 4]], 15, 13, tone(0.18)));
  add(limb([[+A.X(40), +A.Y(-334)], [+A.X(50), +A.Y(-262)], [hL[0] + 2, hL[1] - 6]], 18, 14.5, tone(0.5)));
  add(limb([[+C.X(-38), +C.Y(-334)], [+C.X(-50), +C.Y(-262)], [hR[0] - 2, hR[1] - 6]], 15, 12, tone(0.3)));
  add(hand(hL[0], hL[1], -30), hand(hR[0], hR[1], 30));
  add(B.svg(`<ellipse class="o" cx="0" cy="-258" rx="27" ry="31"/>
<path class="k" d="M-26 -262 Q-34 -230 -30 -212 L-22 -214 Q-24 -236 -18 -252 Z M26 -262 Q34 -230 30 -212 L22 -214 Q24 -236 18 -252 Z"/>
<path class="o" fill="${pat('zig')}" d="M-29 -264 Q-30 -300 0 -302 Q30 -300 29 -264 Z"/>
<path class="o" fill="${tone(0.18)}" d="M-31 -272 H31 V-258 H-31 Z"/>
<circle class="o" cx="0" cy="-310" r="12"/>
<path class="h" d="M-7 -316 l14 12 M7 -316 l-14 12 M0 -322 v24"/>
${eyesUp(-254, 10)}
<path class="h" d="M-17 -264 q6 -4 11 -1 M6 -265 q6 -3 11 1 M0 -248 q-3 6 2 7"/>
<path class="k" d="M-8 -240 Q0 -236 8 -240 Q6 -231 0 -231 Q-6 -231 -8 -240 Z"/>
<path class="h" d="M-22 -239 q3 3 6 0 M16 -239 q3 3 6 0"/>`));
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
