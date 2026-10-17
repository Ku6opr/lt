export default function draw(kit) {
  const { add, shade, floor, hand, tone, pat, f, W, H } = kit;
  const at = placer(kit);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M332 58 H468 V214 H332 Z',
    gTop: 'M196 292 Q202 262 240 262 Q278 262 284 292 L292 380 L188 380 Z',
    kTop: 'M538 320 Q544 298 570 298 Q596 298 602 320 L608 380 L532 380 Z',
    table: 'M110 372 L690 372 L702 392 L98 392 Z',
    edge: 'M98 392 H702 V408 H98 Z',
    basket: 'M346 338 L454 338 L444 384 Q400 392 356 384 Z',
    handle: 'M350 342 Q352 262 400 260 Q448 262 450 342 L440 342 Q438 274 400 272 Q362 274 360 342 Z',
    cup: 'M470 352 h30 v26 q0 7 -7 7 h-16 q-7 0 -7 -7 Z',
    vase: 'M636 386 Q624 362 640 344 L640 332 H660 V344 Q676 362 664 386 Z'
  };

  const egg = (x, y, fill, a = 0, s = 1) => `<ellipse class="o" fill="${fill}" cx="${x}" cy="${y}" rx="${f(11 * s)}" ry="${f(14 * s)}" transform="rotate(${a} ${x} ${y})"/>`;
  const brush = (x1, y1, x2, y2) => {
    const L = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / L;
    const uy = (y2 - y1) / L;
    const pt = (t, w) => `${f(x1 + ux * t - uy * w)} ${f(y1 + uy * t + ux * w)}`;
    const a = L * 0.62;
    const b = L * 0.76;
    return `<path class="o" d="M${pt(0, -2.6)} L${pt(a, -2)} L${pt(a, 2)} L${pt(0, 2.6)} Z"/>
<path class="k" d="M${pt(a, -2.6)} L${pt(b, -2.6)} L${pt(b, 2.6)} L${pt(a, 2.6)} Z"/>
<path class="k" d="M${pt(b, -2.6)} Q${pt(L * 0.9, -3.6)} ${pt(L, 0)} Q${pt(L * 0.9, 3.6)} ${pt(b, 2.6)} Z"/>`;
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<rect class="o" x="320" y="46" width="160" height="180"/>
<rect class="o" fill="${tone(0.14)}" x="332" y="58" width="136" height="156"/>
${shade([{ lin: [332, 58, 468, 214], s: [0, 0.22] }], D.pane)}
<path class="t" d="M436 66 V58 M436 134 V142 M402 100 H394 M470 100 H478 M412 76 l-6 -6 M460 76 l6 -6 M412 124 l-6 6 M460 124 l6 6"/>
<circle class="o" cx="436" cy="100" r="20"/>
<path class="t" d="M348 170 q8 -10 18 -4 q8 -10 18 0 M362 112 q6 -8 12 0 q6 -8 12 0"/>
<path class="t" d="M400 58 V214 M332 136 H468"/>
<rect class="o" x="308" y="226" width="184" height="11"/>`);

  const P = at(-103, -28, 1.258);

  add(P.svg(`<rect class="o" x="186" y="240" width="108" height="14" rx="3"/>
<path class="k" d="M192 254 h8 v120 h-8 Z M280 254 h8 v120 h-8 Z"/>
<rect class="o" x="524" y="272" width="92" height="13" rx="3"/>
<path class="k" d="M530 285 h7 v90 h-7 Z M603 285 h7 v90 h-7 Z"/>`));

  add(P.svg(`<path class="o" fill="${tone(0.42)}" d="${D.gTop}"/>`), P.shade([{ lin: [246, 0, 292, 0], s: [0, 0.45] }], D.gTop));
  add(P.svg(`<path class="t" d="M240 270 V372"/>
<circle class="k" cx="233" cy="300" r="3"/><circle class="k" cx="233" cy="330" r="3"/><circle class="k" cx="233" cy="360" r="3"/>
<rect class="o" x="234" y="236" width="12" height="28"/>
<path class="o" d="M222 262 L240 276 L258 262 L250 258 L240 266 L230 258 Z"/>`));
  add(P.limb([[206, 278], [198, 316], [198, 346]], 19, 17, tone(0.42)));
  add(P.limb([[274, 278], [284, 316], [286, 346]], 19, 17, tone(0.42)));
  add(P.limb([[200, 346], [220, 330]], 17, 15, tone(0.42)));
  add(P.limb([[284, 348], [266, 332]], 17, 15, tone(0.42)));
  add(P.svg(`${egg(264, 308, pat('stH'), 8, 1.4)}
${brush(216, 332, 248, 304)}
${hand(218, 330, 40)}${hand(266, 330, -30)}`));
  add(P.svg(`<ellipse class="o" cx="240" cy="204" rx="29" ry="35"/>
<path class="o" d="M210 210 Q206 170 240 168 Q274 170 270 210 Q264 186 240 184 Q216 186 210 210 Z"/>
<path class="h" d="M240 170 Q226 176 216 198 M240 170 Q254 176 264 198 M232 172 Q220 184 213 206 M248 172 Q260 184 267 206"/>
<circle class="o" cx="240" cy="158" r="15"/>
<path class="h" d="M240 158 m-8 0 a8 8 0 1 1 8 8 a4 4 0 1 1 -4 -4"/>
<circle class="o" cx="228" cy="208" r="9"/><circle class="o" cx="252" cy="208" r="9"/>
<path class="t" d="M237 208 h6 M219 206 l-8 -2 M261 206 l8 -2"/>
<circle class="k" cx="230" cy="211" r="2.4"/><circle class="k" cx="254" cy="211" r="2.4"/>
<path class="h" d="M240 213 q-4 10 2 11"/>
<path class="t" d="M231 228 q9 5 18 0"/>`));

  add(P.svg(`<path class="o" fill="${pat('dots')}" d="${D.kTop}"/>`), P.shade([{ lin: [574, 0, 608, 0], s: [0, 0.45] }], D.kTop));
  add(P.svg(`<rect class="o" x="565" y="276" width="10" height="24"/>
<path class="o" d="M552 298 Q570 312 588 298 L582 294 Q570 302 558 294 Z"/>`));
  add(P.limb([[544, 314], [536, 340], [536, 362]], 16, 14, pat('dots')));
  add(P.limb([[596, 314], [604, 340], [606, 362]], 16, 14, pat('dots')));
  add(P.limb([[537, 362], [550, 342]], 14, 13, pat('dots')));
  add(P.limb([[605, 362], [594, 344]], 14, 13, pat('dots')));
  add(P.svg(`${egg(546, 318, pat('zig'), -10, 1.35)}
${brush(596, 344, 563, 318)}
${hand(550, 340, 30)}${hand(594, 342, -40)}
<ellipse class="k" cx="534" cy="258" rx="9" ry="18" transform="rotate(25 534 258)"/>
<ellipse class="k" cx="606" cy="258" rx="9" ry="18" transform="rotate(-25 606 258)"/>
<ellipse class="o" cx="570" cy="250" rx="27" ry="31"/>
<path class="k" d="M543 252 Q540 215 570 215 Q600 215 597 252 Q594 234 582 230 Q572 238 558 230 Q546 236 543 252 Z"/>
<circle class="o" cx="541" cy="242" r="5"/><circle class="o" cx="599" cy="242" r="5"/>
<ellipse class="k" cx="560" cy="254" rx="3" ry="4"/><ellipse class="k" cx="580" cy="254" rx="3" ry="4"/>
<path class="h" d="M553 245 q6 -4 11 0 M576 245 q6 -4 11 0 M570 258 q-3 6 2 7"/>
<path class="k" d="M559 266 Q570 271 581 266 Q579 278 570 278 Q561 278 559 266 Z"/>
<path class="h" d="M548 263 q3 3 6 0 M586 263 q3 3 6 0"/>`));

  add(P.svg(`<path class="o" fill="${tone(0.22)}" d="${D.table}"/>`), P.shade([{ lin: [400, 0, 702, 0], s: [0, 0.35] }], D.table));
  add(P.svg(`<path class="o" fill="${tone(0.5)}" d="${D.edge}"/>`), P.shade([{ lin: [400, 0, 702, 0], s: [0, 0.4] }], D.edge));
  add(P.svg(`<path class="k" d="M110 408 h10 v150 h-10 Z M680 408 h10 v150 h-10 Z M150 408 h7 v80 h-7 Z M643 408 h7 v80 h-7 Z"/>`));
  add(P.shade([{ rad: [160, 386, 50, 6], s: 0.6 }, { rad: [406, 388, 64, 7], s: 0.6 }, { rad: [490, 386, 22, 5], s: 0.6 }, { rad: [656, 388, 26, 5], s: 0.6 }]));

  add(P.svg(`<ellipse class="o" cx="156" cy="382" rx="46" ry="9"/>
<ellipse class="h" cx="156" cy="381" rx="30" ry="5"/>
${egg(156, 363, '#fff')}${egg(134, 368, '#fff', -12)}${egg(178, 368, '#fff', 12)}`));

  add(P.svg(`<path class="o" d="${D.handle}"/>`), P.shade([{ lin: [400, 0, 450, 0], s: [0, 0.4] }], D.handle));
  add(P.svg(`${egg(370, 330, pat('stH'), -14)}${egg(392, 326, '#333')}${egg(412, 328, pat('dots'), 10)}${egg(432, 332, pat('check'), 16)}${egg(402, 340, pat('zig'), 0)}
<path class="o" fill="${tone(0.4)}" d="${D.basket}"/>`), P.shade([{ lin: [400, 0, 454, 0], s: [0, 0.45] }], D.basket));
  add(P.svg(`<path class="h" d="M349 352 Q400 360 451 352 M352 366 Q400 374 448 366 M370 340 L372 386 M390 340 L390 390 M410 340 L410 390 M430 340 L428 386"/>
<path class="o" d="M342 338 Q400 350 458 338 L456 346 Q400 358 344 346 Z"/>`));

  add(P.svg(`<path class="o" d="${D.cup}"/>
<ellipse class="o" fill="${tone(0.7)}" cx="485" cy="353" rx="14" ry="3"/>
<path class="t" d="M500 360 q10 0 10 8 q0 8 -10 7"/>`), P.shade([{ lin: [485, 0, 500, 0], s: [0, 0.4] }], D.cup));

  add(P.svg(`<path class="t" d="M650 334 Q646 300 632 278 M650 334 V270 M650 334 Q654 300 668 282"/>
<path class="o" d="M634 300 q-16 -8 -14 -20 q8 4 12 12 Z M666 304 q16 -6 16 -18 q-8 2 -14 12 Z"/>
${[[632, 276, -16], [650, 266, 0], [668, 280, 16]].map(([x, y, a]) => `<path class="o" fill="${tone(0.3)}" transform="rotate(${a} ${x} ${y})" d="M${x - 11} ${y} Q${x - 12} ${y - 20} ${x - 8} ${y - 24} L${x - 3} ${y - 16} L${x} ${y - 25} L${x + 3} ${y - 16} L${x + 8} ${y - 24} Q${x + 12} ${y - 20} ${x + 11} ${y} Q${x} ${y + 9} ${x - 11} ${y} Z"/>`).join('')}
<path class="o" fill="${pat('stV')}" d="${D.vase}"/>`), P.shade([{ lin: [650, 0, 676, 0], s: [0, 0.45] }], D.vase));
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
