export default function draw(kit) {
  const { add, shade, floor, hand, shoe, tone, pat, W, H } = kit;
  const at = placer(kit);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<path class="k" d="M300 104 h6 v22 l-6 -6 Z M554 104 h6 v22 l-6 -6 Z"/>
<rect class="o" fill="${tone(0.35)}" x="292" y="96" width="276" height="10"/>`);
  const sw = [[306, tone(0.3)], [370, pat('stH')], [434, tone(0.65)], [498, pat('dots')]];
  add(sw.map(([x, fl]) => {
    const d = `M${x} 96 V66 Q${x} 60 ${x + 6} 60 H${x + 50} Q${x + 56} 60 ${x + 56} 66 V96 Z`;
    return `<path class="o" fill="${fl}" d="${d}"/>${shade([{ lin: [x + 28, 0, x + 56, 0], s: [0, 0.4] }], d)}<path class="h" d="M${x + 14} 62 V96 M${x + 42} 62 V96"/><path class="o" d="M${x + 18} 60 Q${x + 28} 76 ${x + 38} 60 Z"/><path class="h" d="M${x + 20} 90 H${x + 36}"/>`;
  }).join(''));

  add(shade([{ rad: [140, 414, 120, 8], s: 0.6 }]));
  add(`<path class="k" d="M30 140 h7 v270 h-7 Z M243 140 h7 v270 h-7 Z M20 406 h28 v7 h-28 Z M233 406 h28 v7 h-28 Z M30 138 H250 V145 H30 Z"/>`);
  const dresses = [[84, pat('stH')], [140, tone(0.3)], [196, pat('dots')]];
  add(dresses.map(([x, fl]) => {
    const d = `M${x - 16} 168 Q${x} 176 ${x + 16} 168 L${x + 20} 236 L${x + 32} 326 Q${x} 336 ${x - 32} 326 L${x - 20} 236 Z`;
    return `<path class="t" d="M${x} 142 q-5 -6 0 -10 M${x} 152 L${x - 24} 168 H${x + 24} Z"/>
<path class="o" fill="${fl}" d="${d}"/>${shade([{ lin: [x, 0, x + 32, 0], s: [0, 0.4] }], d)}
<path class="o" d="M${x - 10} 169 Q${x} 180 ${x + 10} 169 Z"/>`;
  }).join(''));

  add(`<path class="o" fill="${tone(0.55)}" d="M40 380 h12 v178 h-12 Z M118 380 h12 v178 h-12 Z"/>
<rect class="o" fill="${tone(0.55)}" x="40" y="380" width="90" height="12"/>
<rect class="o" fill="${tone(0.55)}" x="40" y="412" width="90" height="10"/>
<path class="o" fill="${tone(0.35)}" d="M30 458 H142 L148 474 H24 Z"/>
<path class="k" d="M28 474 h10 v84 h-10 Z M134 474 h10 v84 h-10 Z"/>`);
  const bag = 'M54 456 Q52 420 62 420 L110 420 Q120 420 118 456 Z';
  add(`<path class="t" d="M66 422 Q86 386 106 422"/>
<path class="o" fill="${tone(0.7)}" d="${bag}"/>${shade([{ lin: [86, 0, 118, 0], s: [0, 0.4] }], bag)}
<path class="h" d="M56 434 H116"/><rect class="o" x="80" y="430" width="12" height="8"/>`);

  add(shade([{ rad: [336, 566, 70, 10], s: 0.6 }, { rad: [552, 566, 62, 10], s: 0.6 }, { rad: [706, 562, 66, 9], s: 0.6 }]));

  add(`<path class="k" d="M696 470 h8 v76 h-8 Z M650 546 H750 V556 H650 Z"/>
<ellipse class="o" fill="${tone(0.55)}" cx="700" cy="316" rx="62" ry="164"/>
<ellipse class="o" fill="${tone(0.2)}" cx="700" cy="316" rx="48" ry="150"/>
${shade([{ lin: [652, 166, 748, 466], s: [0, 0.5] }], 'M652 316 A48 150 0 1 0 748 316 A48 150 0 1 0 652 316 Z')}
<path class="w" stroke-width="5" d="M672 240 L716 196 M668 290 L728 230 M690 410 L726 374"/>`);

  const A = at(332, 560, 0.92);
  add(A.svg(`<path class="t" d="M-18 -40 V-12 M18 -40 V-12"/>${shoe(-22, 0, -1)}${shoe(22, 0)}`));
  const skirt = 'M-46 -212 L46 -212 L60 -40 L-60 -40 Z';
  add(A.svg(`<path class="o" fill="${tone(0.5)}" d="${skirt}"/>`), A.shade([{ lin: [0, 0, 60, 0], s: [0, 0.45] }], skirt));
  const blouse = 'M-40 -324 Q-34 -350 0 -350 Q34 -350 40 -324 L48 -200 L-48 -200 Z';
  add(A.svg(`<path class="o" fill="${tone(0.08)}" d="${blouse}"/>`), A.shade([{ lin: [0, 0, 48, 0], s: [0, 0.4] }], blouse));
  add(A.svg(`<rect class="o" x="-6" y="-370" width="12" height="22"/>
<path class="o" d="M-14 -348 L0 -330 L14 -348 L6 -352 L0 -342 L-6 -352 Z"/>
<path class="o" fill="${pat('stV')}" d="M-20 -352 Q-28 -300 -24 -250 L-14 -250 Q-18 -300 -10 -350 Z M20 -352 Q28 -300 24 -250 L14 -250 Q18 -300 10 -350 Z"/>`));
  add(A.limb([[-36, -322], [-50, -262], [-52, -206]], 19, 15, tone(0.08)));
  add(A.limb([[36, -322], [72, -290], [112, -292]], 19, 15, tone(0.08)));
  add(A.svg(`${hand(-52, -200, 5)}
<path class="o" fill="${pat('zig')}" d="M100 -296 Q100 -340 136 -340 Q172 -340 172 -296 Z"/>
<path class="o" fill="${tone(0.4)}" d="M98 -306 H174 V-290 H98 Z"/>
<circle class="o" cx="136" cy="-350" r="12"/>
<path class="h" d="M128 -356 l16 12 M144 -356 l-16 12 M136 -362 v24"/>
${hand(112, -292, -80)}
<ellipse class="o" cx="0" cy="-402" rx="28" ry="33"/>
<path class="k" d="M-29 -398 Q-32 -440 0 -440 Q32 -440 29 -398 Q24 -420 0 -422 Q-24 -420 -29 -398 Z"/>
<circle class="k" cx="0" cy="-446" r="14"/>
<circle class="o" cx="-11" cy="-398" r="9"/><circle class="o" cx="13" cy="-398" r="9"/>
<path class="t" d="M-2 -398 h6 M-20 -400 l-8 -2 M22 -400 l7 -2"/>
<circle class="k" cx="-8" cy="-397" r="2.4"/><circle class="k" cx="16" cy="-397" r="2.4"/>
<path class="h" d="M2 -392 q-3 8 2 9"/>
<path class="t" d="M-7 -378 q9 6 18 0"/>`));

  const B = at(552, 560, 0.92);
  add(B.svg(`<path class="k" d="M-34 -384 Q-42 -446 2 -446 Q44 -446 38 -384 L44 -296 Q0 -286 -40 -296 Z"/>`));
  add(B.limb([[-15, -116], [-16, -16]], 18, 15), B.limb([[15, -116], [16, -16]], 18, 15));
  add(B.svg(`${shoe(-20, 0, -1)}${shoe(20, 0)}`));
  const dress = 'M-34 -330 Q-30 -352 0 -352 Q30 -352 34 -330 L36 -240 L64 -112 Q0 -100 -64 -112 L-36 -240 Z';
  add(B.svg(`<path class="o" fill="${pat('check')}" d="${dress}"/>`), B.shade([{ lin: [0, 0, 64, 0], s: [0, 0.4] }], dress));
  add(B.svg(`<path class="o" fill="${tone(0.5)}" d="M-37 -248 H37 V-234 H-37 Z"/>
<rect class="o" x="-6" y="-370" width="12" height="20"/>
<path class="o" fill="${pat('check')}" d="M-34 -334 Q-48 -330 -50 -306 L-36 -300 Z M34 -334 Q48 -330 50 -306 L36 -300 Z"/>`));
  add(B.limb([[-42, -310], [-58, -250], [-60, -196]], 15, 13), B.limb([[42, -310], [58, -250], [62, -196]], 15, 13));
  add(B.svg(`${hand(-60, -190, 5)}${hand(62, -190, -5)}
<ellipse class="o" cx="0" cy="-402" rx="27" ry="32"/>
<path class="k" d="M-28 -398 Q-30 -438 2 -438 Q32 -438 28 -398 Q20 -420 -2 -424 Q-14 -412 -28 -398 Z"/>
<ellipse class="k" cx="-5" cy="-398" rx="3" ry="4"/><ellipse class="k" cx="16" cy="-398" rx="3" ry="4"/>
<path class="h" d="M-12 -408 q6 -4 11 0 M10 -408 q6 -4 11 0 M8 -392 q5 7 -1 8"/>
<path class="t" d="M-2 -380 q9 6 18 0"/>
<path class="h" d="M-14 -384 q3 3 6 0 M20 -384 q3 3 6 0"/>`));
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
