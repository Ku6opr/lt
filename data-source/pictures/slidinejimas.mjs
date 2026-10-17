export default function draw({ add, shade, limb, shoe, tone, f, W, H }) {
  const D = {
    far: `M0 330 H${W} V${H} H0 Z`,
    slope: `M-10 246 L560 468 Q640 490 ${W + 10} 488 V${H + 10} H-10 Z`,
    m1: 'M250 332 L430 108 L610 332 Z',
    m2: 'M450 332 L626 58 L830 332 Z',
    m3: 'M660 332 L770 160 L860 332 Z',
    jacket: 'M344 286 Q352 268 378 276 Q398 284 396 304 L380 362 L326 350 Z',
    girlCoat: 'M552 464 Q556 452 574 452 Q592 452 596 464 L600 528 L548 528 Z',
    boyCoat: 'M694 446 Q698 434 716 434 Q734 434 738 446 L742 520 L690 520 Z',
    sled: 'M516 528 H648 V542 H516 Z'
  };

  add(`<circle class="o" cx="96" cy="76" r="30"/>
<path class="t" d="M96 30 V16 M96 122 V136 M50 76 H36 M142 76 H156 M64 44 L54 34 M128 44 L138 34 M64 108 L54 118 M128 108 L138 118"/>
<path class="o" d="M230 70 Q232 50 254 52 Q264 34 288 40 Q308 34 318 52 Q338 52 338 70 Z"/>`);

  const snowCap = (px, py, lx, rx, depth) => {
    const pts = [];
    const n = 5;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = lx + (rx - lx) * t;
      const y = py + depth + (i % 2 ? 14 : 0);
      pts.push(`${f(x)} ${f(y)}`);
    }
    return `M${px} ${py} L${lx} ${py + depth} L${pts.join(' L')} L${rx} ${py + depth} Z`;
  };
  [[D.m1, 430, 108, 250, 610, 0.4], [D.m2, 626, 58, 450, 830, 0.48], [D.m3, 770, 160, 660, 860, 0.34]].forEach(([d, px, py, lx, rx, t]) => {
    const k = 0.32;
    const capL = px - (px - lx) * k;
    const capR = px + (rx - px) * k;
    const depth = (332 - py) * k;
    add(`<path class="o" fill="${tone(t)}" d="${d}"/>
${shade([{ lin: [px, 0, rx, 0], s: [0.15, 0.6] }], d)}
<path class="o" d="${snowCap(px, py, f(capL), f(capR), f(depth))}"/>
${shade([{ lin: [px, 0, capR, 0], s: [0, 0.35] }], snowCap(px, py, f(capL), f(capR), f(depth)))}
<path class="h" d="M${px} ${py} L${f(px + (rx - px) * 0.18)} ${f(py + (332 - py) * 0.55)}"/>`);
  });

  add(`<path class="o" d="${D.far}"/>
${shade([{ lin: [0, 330, 0, 400], s: [0.22, 0] }], D.far)}
<path class="o" d="${D.slope}"/>
${shade([{ lin: [0, 0, 0, 0], s: [0, 0] }], D.slope)}
${shade([{ lin: [200, 300, 260, 420], s: [0, 0.18] }], D.slope)}
<path class="h" stroke="#9a9a9a" d="M60 330 q40 10 80 30 M220 420 q50 18 100 40 M480 520 q60 14 120 16 M80 470 q60 20 120 50 M640 560 q60 4 120 0"/>`);

  const tree = (x, y, s) => {
    const T = (dx, dy) => `${f(x + dx * s)} ${f(y + dy * s)}`;
    return `${shade([{ rad: [f(x + 26 * s), f(y + 2), f(40 * s), f(8 * s)], s: 0.6 }])}
<path class="k" d="M${T(-6, 0)} L${T(6, 0)} L${T(6, 14)} L${T(-6, 14)} Z"/>
<path class="k" d="M${T(0, -120)} L${T(22, -84)} L${T(12, -84)} L${T(34, -48)} L${T(20, -48)} L${T(44, -8)} L${T(-44, -8)} L${T(-20, -48)} L${T(-34, -48)} L${T(-12, -84)} L${T(-22, -84)} Z"/>
<path class="o" d="M${T(-12, -84)} L${T(0, -78)} L${T(12, -84)} L${T(4, -96)} L${T(-4, -96)} Z M${T(-20, -48)} L${T(0, -40)} L${T(20, -48)} L${T(10, -60)} L${T(-10, -60)} Z M${T(-44, -8)} L${T(0, 0)} L${T(44, -8)} L${T(24, -20)} L${T(-24, -20)} Z"/>`;
  };
  add(tree(54, 306, 0.95) + tree(126, 342, 1.05) + tree(196, 368, 1.15));

  const dir = [Math.cos((21 * Math.PI) / 180), Math.sin((21 * Math.PI) / 180)];
  const ski = (x, y, len) => {
    const e = [x + dir[0] * len, y + dir[1] * len];
    return `<path class="o" fill="${tone(0.7)}" d="M${f(x)} ${f(y)} L${f(e[0])} ${f(e[1])} Q${f(e[0] + 16)} ${f(e[1] + 2)} ${f(e[0] + 18)} ${f(e[1] - 10)} L${f(e[0] + 14)} ${f(e[1] - 8)} Q${f(e[0] + 10)} ${f(e[1] - 6)} ${f(e[0] + 2)} ${f(e[1] - 6)} L${f(x)} ${f(y - 6)} Z"/>`;
  };
  add(shade([{ rad: [392, 462, 110, 12], s: 0.55 }]));
  add(`<circle class="o" cx="262" cy="398" r="9"/><circle class="o" cx="248" cy="388" r="7"/><circle class="o" cx="240" cy="402" r="6"/><circle class="o" cx="270" cy="412" r="7"/>
${ski(262, 404, 180)}${ski(276, 418, 180)}`);
  add(limb([[340, 352], [372, 380], [356, 422]], 17, 15, tone(0.75)));
  add(limb([[350, 356], [388, 388], [376, 432]], 17, 15, tone(0.75)));
  add(`<path class="k" d="M342 414 L370 422 L372 432 L340 426 Z"/>
<path class="k" d="M362 426 L390 434 L392 444 L360 438 Z"/>
<path class="t" d="M402 330 L288 420 M412 338 L306 430"/>
<path class="h" d="M282 416 l12 8 M300 426 l12 8"/>
<path class="o" fill="url(#stH)" d="${D.jacket}"/>
${shade([{ lin: [360, 0, 396, 0], s: [0, 0.45] }], D.jacket)}`);
  add(limb([[356, 292], [366, 326], [400, 330]], 16, 14, 'url(#stH)'));
  add(limb([[384, 292], [400, 318], [412, 338]], 16, 14, 'url(#stH)'));
  add(`<ellipse class="k" cx="402" cy="330" rx="8" ry="9"/><ellipse class="k" cx="412" cy="338" rx="8" ry="9"/>
<rect class="o" x="380" y="256" width="12" height="22" transform="rotate(20 386 267)"/>
<ellipse class="o" cx="394" cy="236" rx="27" ry="31"/>
<path class="k" d="M366 232 Q362 198 396 198 Q428 200 423 228 Q400 218 366 232 Z"/>
<path class="w" d="M378 214 q12 -8 26 -6"/>
<path class="k" d="M367 234 Q394 224 420 228 L420 238 Q394 236 367 244 Z"/>
<rect class="o" fill="${tone(0.25)}" x="392" y="224" width="30" height="18" rx="6"/>
<path class="w" d="M398 230 l6 -3"/>
<path class="h" d="M420 246 q6 4 1 8"/>
<path class="t" d="M398 260 q9 4 17 -3"/>`);

  add(shade([{ rad: [600, 552, 110, 10], s: 0.55 }]));
  add(`<path class="o" fill="${tone(0.45)}" d="M522 540 h10 v16 h-10 Z M626 540 h10 v16 h-10 Z"/>
<path class="t" stroke-width="5" d="M508 556 H648 Q670 556 668 536"/>`);
  add(limb([[566, 524], [596, 522], [626, 528]], 15, 13, tone(0.75)));
  add(limb([[582, 524], [612, 520], [640, 524]], 15, 13, tone(0.75)));
  add(`${shoe(630, 534)}${shoe(648, 530)}
<path class="o" fill="${tone(0.4)}" d="${D.sled}"/>
${shade([{ lin: [580, 0, 648, 0], s: [0, 0.4] }], D.sled)}
<path class="o" fill="${tone(0.4)}" d="${D.girlCoat}"/>
${shade([{ lin: [574, 0, 600, 0], s: [0, 0.45] }], D.girlCoat)}
<path class="t" d="M574 456 V528"/>`);
  add(limb([[556, 470], [544, 500], [560, 520]], 13, 11, tone(0.4)));
  add(limb([[594, 470], [612, 496], [600, 516]], 13, 11, tone(0.4)));
  add(`<ellipse class="k" cx="562" cy="522" rx="7" ry="8"/><ellipse class="k" cx="598" cy="518" rx="7" ry="8"/>
<path class="o" fill="url(#stV)" d="M552 446 Q574 458 596 446 L598 462 Q574 472 550 462 Z"/>
<path class="o" fill="url(#stV)" d="M580 462 L594 462 L596 496 L582 496 Z"/>
<path class="h" d="M583 496 l-1 6 M588 496 v6 M593 496 l1 6"/>
<ellipse class="o" cx="574" cy="420" rx="25" ry="28"/>
<path class="o" fill="${tone(0.55)}" d="M548 418 Q546 382 574 382 Q602 382 600 418 Z"/>
${shade([{ lin: [574, 0, 600, 0], s: [0, 0.45] }], 'M548 418 Q546 382 574 382 Q602 382 600 418 Z')}
<path class="o" fill="url(#stV)" d="M546 406 H602 V420 H546 Z"/>
<circle class="o" cx="574" cy="376" r="10"/>
<path class="h" d="M569 371 l3 3 M578 370 l-2 4 M568 380 l4 -2 M579 381 l-3 -3"/>
<ellipse class="k" cx="565" cy="428" rx="3" ry="4"/><ellipse class="k" cx="584" cy="428" rx="3" ry="4"/>
<path class="h" d="M574 432 q-3 5 2 6"/>
<path class="t" d="M566 440 q8 5 16 0"/>`);

  add(`<path class="t" d="M668 536 Q680 500 692 476"/>`);
  add(shade([{ rad: [724, 584, 50, 8], s: 0.6 }]));
  add(limb([[704, 516], [702, 548], [702, 570]], 15, 13, tone(0.75)));
  add(limb([[728, 516], [732, 548], [734, 570]], 15, 13, tone(0.75)));
  add(`${shoe(700, 582, -1)}${shoe(738, 582)}
<path class="o" fill="${tone(0.7)}" d="${D.boyCoat}"/>
${shade([{ lin: [716, 0, 742, 0], s: [0, 0.45] }], D.boyCoat)}
<path class="t" d="M716 438 V520"/>
<path class="o" d="M702 436 Q716 446 730 436 L732 448 Q716 456 700 448 Z"/>`);
  add(limb([[698, 450], [686, 470], [694, 478]], 13, 11, tone(0.7)));
  add(limb([[734, 450], [748, 484], [740, 510]], 13, 11, tone(0.7)));
  add(`<ellipse class="k" cx="692" cy="478" rx="7" ry="8"/><ellipse class="k" cx="740" cy="514" rx="7" ry="8"/>
<rect class="o" x="710" y="420" width="12" height="16"/>
<ellipse class="o" cx="716" cy="398" rx="25" ry="28"/>
<path class="k" d="M690 398 Q688 362 716 362 Q744 362 742 398 Z"/>
<path class="w" d="M694 388 H738"/>
<ellipse class="k" cx="707" cy="404" rx="3" ry="4"/><ellipse class="k" cx="726" cy="404" rx="3" ry="4"/>
<path class="h" d="M716 408 q-3 5 2 6"/>
<path class="k" d="M706 414 Q716 420 726 414 Q724 426 716 426 Q708 426 706 414 Z"/>`);
}
