export default function draw(kit) {
  const { add, def, shade, hand, shoe, tone, pat, f, W, H } = kit;
  const at = placer(kit);
  const D = {
    sky: `M0 0 H${W} V384 H0 Z`,
    ground: `M0 380 H${W} V${H} H0 Z`,
    tent: 'M18 412 L104 262 L190 412 Z',
    pot: 'M398 412 H462 V440 Q462 456 430 456 Q398 456 398 440 Z'
  };

  add(`<path d="${D.sky}" fill="${tone(0.7)}"/>`, shade([{ lin: [0, 0, 0, 384], s: [0.55, 0] }], D.sky));
  const moon = (() => {
    const [x1, y1, r1, x2, y2, r2] = [700, 74, 32, 714, 62, 27];
    const d = Math.hypot(x2 - x1, y2 - y1);
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h = Math.sqrt(r1 * r1 - a * a);
    const px = x1 + (a * (x2 - x1)) / d;
    const py = y1 + (a * (y2 - y1)) / d;
    const ix = (h * (y2 - y1)) / d;
    const iy = (h * (x2 - x1)) / d;
    return `M${f(px + ix)} ${f(py - iy)} A${r1} ${r1} 0 1 1 ${f(px - ix)} ${f(py + iy)} A${r2} ${r2} 0 1 0 ${f(px + ix)} ${f(py - iy)} Z`;
  })();
  add(`<path class="o" d="${moon}"/>`);
  const stars = [[60, 50], [180, 90], [300, 40], [420, 110], [520, 50], [610, 140], [770, 160], [250, 170], [470, 200], [90, 190]];
  add(stars.map(([x, y]) => `<path fill="#fff" d="M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z"/>`).join(''));

  const firs = [[30, 120], [92, 150], [160, 110], [222, 140], [290, 118], [352, 156], [420, 124], [486, 146], [548, 112], [612, 150], [676, 120], [740, 144], [800, 116]];
  add(firs.map(([x, h]) => {
    const y = 386;
    const w = h * 0.36;
    return `<path class="o" fill="${tone(1)}" d="M${x} ${y - h} L${f(x + w * 0.55)} ${f(y - h * 0.62)} L${f(x + w * 0.3)} ${f(y - h * 0.62)} L${f(x + w * 0.8)} ${f(y - h * 0.28)} L${f(x + w * 0.45)} ${f(y - h * 0.28)} L${x + w} ${y} L${x - w} ${y} L${f(x - w * 0.45)} ${f(y - h * 0.28)} L${f(x - w * 0.8)} ${f(y - h * 0.28)} L${f(x - w * 0.3)} ${f(y - h * 0.62)} L${f(x - w * 0.55)} ${f(y - h * 0.62)} Z"/>`;
  }).join(''));

  add(`<path class="o" fill="${tone(0.5)}" d="${D.ground}"/>`, shade([{ lin: [0, 380, 0, 600], s: [0.5, 0.1] }], D.ground));
  const tufts = [[40, 470], [120, 540], [300, 420], [330, 590], [520, 440], [560, 580], [700, 430], [760, 520], [230, 520], [480, 590], [40, 580], [660, 590], [780, 420], [360, 470]];
  add(`<path class="h" d="${tufts.map(([x, y]) => `M${x} ${y} l-4 -9 M${x + 5} ${y} l1 -11 M${x + 10} ${y} l4 -8`).join(' ')}"/>`);
  def(`<radialGradient id="glow"><stop offset="0" stop-color="#fff" stop-opacity="0.75"/><stop offset="0.6" stop-color="#fff" stop-opacity="0.3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`);
  add(`<ellipse cx="430" cy="490" rx="300" ry="150" fill="url(#glow)"/>`);

  add(`<path class="o" fill="${tone(0.4)}" d="${D.tent}"/>
${shade([{ lin: [104, 0, 190, 0], s: [0, 0.5] }], D.tent)}
<path class="k" d="M80 412 L104 318 L128 412 Z"/>
<path class="o" d="M104 318 L128 412 L136 412 Z"/>
<path class="t" d="M18 412 L2 424 M190 412 L208 424 M104 262 V252"/>
${shade([{ rad: [104, 416, 100, 8], s: 0.6 }])}`);
  const bag = 'M150 470 Q148 420 176 418 Q204 420 202 470 Z';
  add(shade([{ rad: [178, 472, 34, 6], s: 0.6 }]), `<path class="o" fill="${tone(0.6)}" d="${bag}"/>${shade([{ lin: [176, 0, 202, 0], s: [0, 0.45] }], bag)}
<path class="o" fill="${tone(0.6)}" d="M152 436 Q176 424 200 436 L200 446 Q176 436 152 446 Z"/>
<rect class="o" fill="${tone(0.3)}" x="162" y="448" width="28" height="16" rx="3"/>`);

  const log = (x0, x1, y) => `<path class="o" fill="${tone(0.55)}" d="M${x0} ${y} H${x1} V${y + 26} H${x0} Z"/>${shade([{ lin: [(x0 + x1) / 2, 0, x1, 0], s: [0, 0.45] }], `M${x0} ${y} H${x1} V${y + 26} H${x0} Z`)}<ellipse class="o" fill="${tone(0.2)}" cx="${x1}" cy="${y + 13}" rx="8" ry="13"/><path class="h" d="M${x0 + 20} ${y + 9} h30 M${x0 + 60} ${y + 18} h26"/>`;

  add(shade([{ rad: [430, 528, 90, 10], s: 0.6 }, { rad: [262, 562, 70, 9], s: 0.6 }, { rad: [618, 562, 76, 9], s: 0.6 }]));
  add(`<path class="k" d="M372 400 h7 v124 h-7 Z M481 400 h7 v124 h-7 Z M366 398 l8 -14 M384 398 l-8 -14 M494 398 l-8 -14 M476 398 l8 -14 M368 398 H492 V404 H368 Z"/>
<path class="t" d="M412 412 L430 402 L448 412"/>
<path class="o" fill="${tone(0.85)}" d="${D.pot}"/>${shade([{ lin: [430, 0, 462, 0], s: [0, 0.4] }], D.pot)}
<rect class="o" fill="${tone(0.85)}" x="392" y="408" width="76" height="8" rx="3"/>
<path class="h" d="M420 400 q-5 -8 0 -16 M440 400 q-5 -8 0 -16"/>`);
  add(`<path class="o" d="M394 516 Q384 488 404 470 Q402 484 412 490 Q408 466 428 450 Q426 470 438 482 Q442 466 454 462 Q450 480 460 492 Q470 500 464 516 Z"/>
<path class="o" fill="${tone(0.3)}" d="M410 516 Q404 498 416 488 Q418 500 426 502 Q428 486 438 478 Q438 494 446 500 Q452 506 448 516 Z"/>
<circle fill="#fff" cx="402" cy="458" r="2.5"/><circle fill="#fff" cx="462" cy="452" r="2"/><circle fill="#fff" cx="384" cy="474" r="2"/><circle fill="#fff" cx="476" cy="470" r="2.5"/>
<path class="o" fill="${tone(0.6)}" d="M372 508 L486 526 L484 538 L370 520 Z"/>
<path class="o" fill="${tone(0.5)}" d="M374 530 L486 510 L490 522 L378 542 Z"/>`);

  const lap = 'M-44 -126 H44 Q52 -108 42 -92 Q24 -82 4 -92 L-4 -92 Q-24 -82 -42 -92 Q-52 -108 -44 -126 Z';
  const torso = 'M-40 -206 Q-36 -232 0 -232 Q36 -232 40 -206 L44 -112 L-44 -112 Z';

  add(log(196, 316, 466));
  const G = at(258, 560, 0.95);
  add(G.limb([[-18, -100], [-17, -14]], 20, 17, tone(0.75)), G.limb([[18, -100], [17, -14]], 20, 17, tone(0.75)));
  add(G.svg(`${shoe(-19, 0, -1)}${shoe(19, 0)}`));
  add(G.svg(`<path class="k" d="M-34 -266 Q-42 -326 0 -326 Q42 -326 34 -266 L40 -178 Q0 -168 -40 -178 Z"/>`));
  add(G.svg(`<path class="o" fill="${tone(0.75)}" d="${lap}"/>`), G.shade([{ lin: [0, 0, 50, 0], s: [0, 0.4] }], lap));
  add(G.svg(`<path class="o" fill="${pat('stH')}" d="${torso}"/>`), G.shade([{ lin: [0, 0, 44, 0], s: [0, 0.45] }], torso));
  add(G.svg(`<rect class="o" x="-6" y="-248" width="12" height="20"/><path class="o" d="M-14 -232 Q0 -218 14 -232 Z"/>`));
  add(G.limb([[-36, -204], [-50, -160], [-16, -132]], 17, 14, pat('stH')), G.limb([[36, -204], [50, -160], [16, -132]], 17, 14, pat('stH')));
  add(G.svg(`<path class="o" d="M-12 -152 h24 v24 q0 6 -6 6 h-12 q-6 0 -6 -6 Z"/>
<path class="h" d="M-4 -160 q-4 -6 0 -12 M4 -160 q-4 -6 0 -12"/>
${hand(-15, -132, 60)}${hand(15, -132, -60)}
<ellipse class="o" cx="0" cy="-276" rx="28" ry="33"/>
<path class="k" d="M-29 -272 Q-32 -312 0 -312 Q32 -312 29 -272 Q26 -292 12 -296 Q-4 -288 -22 -296 Q-28 -286 -29 -272 Z"/>
<ellipse class="k" cx="-6" cy="-272" rx="3" ry="4"/><ellipse class="k" cx="15" cy="-272" rx="3" ry="4"/>
<path class="h" d="M-13 -282 q6 -4 11 0 M9 -282 q6 -4 11 0 M6 -266 q5 7 -1 8"/>
<ellipse class="k" cx="4" cy="-252" rx="6" ry="7"/>
<path class="h" d="M-16 -258 q3 3 6 0 M20 -258 q3 3 6 0"/>`));
  add(G.svg(`<ellipse class="k" cx="52" cy="-312" rx="8" ry="6" transform="rotate(-20 52 -312)"/>
<path class="t" d="M59 -314 V-344 Q66 -336 74 -334"/>
<ellipse class="k" cx="82" cy="-346" rx="8" ry="6" transform="rotate(-20 82 -346)"/>
<ellipse class="k" cx="106" cy="-354" rx="8" ry="6" transform="rotate(-20 106 -354)"/>
<path class="t" d="M89 -348 V-378 M113 -356 V-386"/>
<path class="k" d="M88 -382 L114 -390 V-382 L88 -374 Z"/>`));

  add(log(548, 690, 466));
  const B = at(618, 560, 1);
  add(B.limb([[-18, -100], [-17, -14]], 22, 19, tone(0.6)), B.limb([[18, -100], [17, -14]], 22, 19, tone(0.6)));
  add(B.svg(`${shoe(-21, 0, -1)}${shoe(21, 0)}`));
  add(B.svg(`<path class="o" fill="${tone(0.6)}" d="${lap}"/>`), B.shade([{ lin: [0, 0, 50, 0], s: [0, 0.4] }], lap));
  const shirt = 'M-46 -206 Q-42 -232 0 -232 Q42 -232 46 -206 L48 -112 L-48 -112 Z';
  add(B.svg(`<path class="o" fill="${pat('check')}" d="${shirt}"/>`), B.shade([{ lin: [0, 0, 48, 0], s: [0, 0.45] }], shirt));
  add(B.svg(`<rect class="o" x="-7" y="-250" width="14" height="20"/><path class="o" d="M-16 -232 L0 -216 L16 -232 Z"/>`));
  const rot = 'transform="rotate(-28 -50 -118)"';
  add(B.svg(`<path class="o" fill="${tone(0.45)}" ${rot} d="M-82 -118 Q-82 -144 -56 -144 Q-38 -144 -32 -136 Q-26 -138 -20 -137 Q-4 -134 -4 -118 Q-4 -102 -20 -99 Q-26 -98 -32 -100 Q-38 -92 -56 -92 Q-82 -92 -82 -118 Z"/>
<path class="o" fill="${tone(0.75)}" ${rot} d="M-6 -123 H100 V-113 H-6 Z"/>
<path class="o" fill="${tone(0.9)}" ${rot} d="M100 -125 H122 V-111 H100 Z"/>
<circle class="k" cx="-34" cy="-118" r="8" ${rot}/>
<rect class="k" x="-66" y="-125" width="6" height="14" ${rot}/>
<path class="h" ${rot} d="M-63 -121 H112 M-63 -115 H112"/>`));
  add(B.limb([[-40, -204], [-64, -160], [-44, -122]], 19, 15, pat('check')));
  add(B.limb([[40, -204], [64, -184], [42, -166]], 19, 15, pat('check')));
  add(B.svg(`${hand(-42, -120, 70)}${hand(40, -166, 30)}
<ellipse class="o" cx="0" cy="-280" rx="29" ry="34"/>
<path class="o" fill="${tone(0.9)}" d="M-30 -286 Q-32 -324 0 -326 Q32 -324 30 -286 Z"/>
<path class="o" fill="${tone(0.6)}" d="M-33 -298 H33 V-282 H-33 Z"/>
<ellipse class="k" cx="-14" cy="-272" rx="3" ry="4"/><ellipse class="k" cx="8" cy="-272" rx="3" ry="4"/>
<path class="h" d="M-21 -279 q6 -4 12 0 M1 -279 q6 -4 12 0 M-3 -266 q-4 7 1 8"/>
<path class="t" d="M-12 -256 q10 7 20 0"/>`));
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
