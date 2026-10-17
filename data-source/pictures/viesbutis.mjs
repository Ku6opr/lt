export default function draw(kit) {
  const { add, shade, floor, hand, shoe, tone, pat, f, W, H } = kit;
  const at = placer(kit);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    board: 'M24 86 H194 V222 H24 Z',
    door: 'M690 150 H790 V400 H690 Z',
    front: 'M50 348 H434 V540 H50 Z',
    case: 'M556 424 H622 Q630 424 630 432 V540 Q630 548 622 548 H556 Q548 548 548 540 V432 Q548 424 556 424 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  const key = (x, y) => `<circle class="k" cx="${x}" cy="${y}" r="3"/>
<circle class="o" cx="${x}" cy="${y + 12}" r="8"/><circle class="h" cx="${x}" cy="${y + 12}" r="3"/>
<path class="o" d="M${x - 3} ${y + 20} h6 v24 h-6 Z"/>
<path class="o" d="M${x + 3} ${y + 32} h7 v4 h-7 Z M${x + 3} ${y + 39} h5 v4 h-5 Z"/>`;
  add(`<path class="o" fill="${tone(0.32)}" d="${D.board}"/>
${shade([{ lin: [110, 0, 194, 0], s: [0, 0.4] }], D.board)}
${[[56, 96], [109, 96], [162, 96], [56, 160], [109, 160], [162, 160]].map(([x, y]) => key(x, y)).join('')}`);

  add(`<circle class="o" cx="430" cy="110" r="40"/>
${shade([{ lin: [430, 0, 470, 0], s: [0, 0.35] }], 'M390 110 A40 40 0 1 0 470 110 A40 40 0 1 0 390 110 Z')}
<circle class="h" cx="430" cy="110" r="33"/>
${Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  return `<path class="${i % 3 ? 'h' : 't'}" d="M${f(430 + 28 * Math.cos(a))} ${f(110 + 28 * Math.sin(a))} L${f(430 + 33 * Math.cos(a))} ${f(110 + 33 * Math.sin(a))}"/>`;
}).join('')}
<path class="t" stroke-width="3" d="M430 110 L430 88 M430 110 L446 118"/>
<circle class="k" cx="430" cy="110" r="3"/>`);

  add(`<path class="o" fill="${tone(0.42)}" d="${D.door}"/>
${shade([{ lin: [740, 0, 790, 0], s: [0, 0.4] }], D.door)}
<rect class="h" x="702" y="166" width="76" height="96"/><rect class="h" x="702" y="280" width="76" height="104"/>
<circle class="o" cx="710" cy="276" r="5"/>`);

  add(shade([{ rad: [244, 546, 210, 12], s: 0.7 }, { rad: [512, 566, 62, 10], s: 0.6 }, { rad: [596, 552, 56, 8], s: 0.65 }]));

  const A = at(230, 520, 0.9);
  const shirt = 'M-48 -332 Q-44 -358 0 -358 Q44 -358 48 -332 L52 -180 L-52 -180 Z';
  add(A.svg(`<path class="o" fill="${pat('check')}" d="${shirt}"/>`), A.shade([{ lin: [0, 0, 52, 0], s: [0, 0.4] }], shirt));
  add(A.svg(`<rect class="o" x="-7" y="-372" width="14" height="18"/>
<path class="o" d="M-16 -360 L0 -340 L-4 -362 Z M16 -360 L0 -340 L4 -362 Z"/>
<path class="k" d="M-5 -342 h10 l5 50 l-10 12 l-10 -12 Z"/>`));
  add(A.limb([[-42, -334], [-56, -270], [-40, -214]], 21, 17, pat('check')));
  add(A.limb([[42, -334], [80, -290], [126, -274]], 21, 17, pat('check')));
  add(A.svg(`<ellipse class="o" cx="0" cy="-398" rx="29" ry="34"/>
<path class="k" d="M-30 -394 Q-34 -440 0 -440 Q34 -440 30 -394 Q28 -414 22 -420 Q0 -416 -14 -424 Q-26 -416 -30 -394 Z"/>
<ellipse class="k" cx="-11" cy="-394" rx="3" ry="4"/><ellipse class="k" cx="11" cy="-394" rx="3" ry="4"/>
<path class="h" d="M-18 -404 q6 -4 12 0 M6 -404 q6 -4 12 0 M0 -388 q-3 7 2 8"/>
<path class="t" d="M-10 -376 q10 7 20 0"/>
<path class="h" d="M-30 -398 q-6 0 -5 7 q1 6 6 5 M30 -398 q6 0 5 7 q-1 6 -6 5"/>`));

  add(`<path class="o" fill="${tone(0.38)}" d="${D.front}"/>
${shade([{ lin: [240, 0, 434, 0], s: [0, 0.45] }], D.front)}
<path class="h" d="M50 372 H434 M146 372 V540 M242 372 V540 M338 372 V540"/>
<path class="o" d="M38 334 H446 V350 H38 Z"/>`);
  add(`<path class="o" d="M80 334 Q80 324 100 324 Q120 324 120 334 Z"/>
<path class="t" d="M100 324 L92 282 L112 262"/>
<path class="o" fill="${tone(0.3)}" d="M98 250 L132 246 L140 278 Q118 290 100 280 Z"/>
<path class="o" d="M296 334 L300 316 H352 L356 334 Z"/>
<rect class="o" fill="${tone(0.4)}" x="310" y="320" width="32" height="8" rx="2"/>
<path class="o" fill="${tone(0.75)}" d="M290 316 Q290 300 302 300 L350 300 Q362 300 362 316 L350 316 Q348 308 340 308 L312 308 Q304 308 302 316 Z"/>
<path class="t" d="M360 318 q12 6 6 16"/>`);
  add(A.svg(hand(-40, -208, 5)));

  const B = at(510, 560, 0.92);
  add(B.limb([[-17, -200], [-18, -16]], 26, 22, tone(0.55)), B.limb([[17, -200], [18, -16]], 26, 22, tone(0.55)));
  add(B.svg(`${shoe(-22, 0, -1)}${shoe(22, 0)}`));
  add(B.svg(`<path class="k" d="M-36 -380 Q-44 -446 0 -446 Q44 -446 36 -380 Q38 -350 32 -340 L-32 -340 Q-38 -350 -36 -380 Z"/>`));
  const top = 'M-44 -330 Q-40 -356 0 -356 Q40 -356 44 -330 L48 -190 L-48 -190 Z';
  add(B.svg(`<path class="o" fill="${tone(0.2)}" d="${top}"/>`), B.shade([{ lin: [0, 0, 48, 0], s: [0, 0.45] }], top));
  add(B.svg(`<path class="o" fill="${tone(0.55)}" d="M-48 -196 H48 L50 -170 H-50 Z"/>
<rect class="o" x="-6" y="-370" width="12" height="18"/>
<path class="o" d="M-14 -355 Q0 -338 14 -355 Z"/>`));
  add(B.limb([[-40, -332], [-82, -298], [-128, -296]], 19, 15, tone(0.2)));
  add(B.limb([[40, -332], [62, -276], [80, -216]], 19, 15, tone(0.2)));

  add(`<path class="t" d="M366 268 L398 276"/>
<path class="t" d="M386 273 l-2 7 M392 275 l-2 6"/>
<circle class="o" cx="360" cy="266" r="8"/><circle class="h" cx="360" cy="266" r="3"/>`);
  add(A.svg(hand(130, -274, -70)), B.svg(hand(-132, -296, 70)));

  add(B.svg(`<ellipse class="o" cx="0" cy="-398" rx="28" ry="33"/>
<path class="k" d="M-29 -394 Q-32 -436 0 -436 Q32 -436 29 -394 Q24 -414 10 -418 Q-6 -410 -24 -416 Q-28 -406 -29 -394 Z"/>
<ellipse class="k" cx="-13" cy="-394" rx="3" ry="4"/><ellipse class="k" cx="9" cy="-394" rx="3" ry="4"/>
<path class="h" d="M-20 -404 q6 -4 12 0 M3 -404 q6 -4 12 0 M-2 -388 q-4 7 1 8"/>
<path class="t" d="M-12 -376 q9 6 18 0"/>
<ellipse class="o" fill="${tone(0.15)}" cx="0" cy="-426" rx="56" ry="10"/>
<path class="o" fill="${tone(0.15)}" d="M-30 -428 Q-30 -466 0 -466 Q30 -466 30 -428 Q0 -420 -30 -428 Z"/>
<path class="o" fill="${tone(0.7)}" d="M-30 -436 Q0 -428 30 -436 L30 -428 Q0 -420 -30 -428 Z"/>`));

  add(`<path class="o" fill="${tone(0.1)}" d="M564 428 V360 H608 V428 H601 V367 H571 V428 Z"/>`);
  add(`<path class="o" fill="${tone(0.5)}" d="${D.case}"/>
${shade([{ lin: [590, 0, 630, 0], s: [0, 0.45] }], D.case)}
<path class="h" d="M566 434 V538 M582 434 V538 M598 434 V538 M614 434 V538"/>
<circle class="k" cx="560" cy="552" r="5"/><circle class="k" cx="618" cy="552" r="5"/>`);
  add(B.svg(hand(80, -210, 80)));
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
