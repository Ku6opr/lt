export default function draw({ add, shade, floor, limb, hand, shoe, tone, pat, W, H }) {
  const eyes = (x, y, dx = 11) => `<ellipse class="k" cx="${x - dx}" cy="${y}" rx="3" ry="4"/><ellipse class="k" cx="${x + dx}" cy="${y}" rx="3" ry="4"/>`;
  const brows = (x, y, dx = 11) => `<path class="h" d="M${x - dx - 6} ${y} q6 -4 12 0 M${x + dx - 6} ${y} q6 -4 12 0"/>`;
  const nose = (x, y) => `<path class="h" d="M${x} ${y} q-3 7 2 8"/>`;

  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pic: 'M150 52 H330 V158 H150 Z',
    desk: 'M110 372 H470 V388 H110 Z',
    blouse: 'M256 268 Q260 246 290 246 Q320 246 324 268 L328 340 L252 340 Z',
    shirt: 'M584 238 Q588 212 620 212 Q652 212 656 238 L660 372 L580 372 Z',
    pot: 'M718 470 H782 L774 548 H726 Z',
    screen: 'M138 240 L230 254 V310 L138 318 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [292, 552, 196, 13], s: 0.7 }]));
  add(shade([{ rad: [624, 562, 76, 11], s: 0.7 }]));
  add(shade([{ rad: [754, 552, 46, 8], s: 0.7 }]));

  add(`<rect class="o" fill="${tone(0.4)}" x="140" y="42" width="200" height="126"/>
<path class="o" d="${D.pic}"/>
<path class="o" fill="${tone(0.3)}" d="M150 158 L196 92 L222 126 L252 80 L330 158 Z"/>
<path class="o" d="M196 92 L206 106 L198 112 L188 104 Z M252 80 L266 100 L256 106 L242 98 Z"/>
<circle class="o" cx="300" cy="84" r="14"/>
<path class="h" d="M300 62 v-6 M300 106 v6 M278 84 h-6 M322 84 h6 M284 68 l-4 -4 M316 68 l4 -4 M284 100 l-4 4 M316 100 l4 4"/>
${shade([{ lin: [150, 52, 330, 158], s: [0.05, 0.25] }], D.pic)}`);

  add(`<rect class="k" x="286" y="436" width="9" height="74"/>
<path class="t" d="M290 510 L248 524 M290 510 L332 524 M290 510 L290 528" stroke-width="5"/>
<circle class="k" cx="246" cy="528" r="6"/><circle class="k" cx="334" cy="528" r="6"/><circle class="k" cx="290" cy="532" r="6"/>
<path class="o" fill="${tone(0.8)}" d="M238 270 Q238 236 290 236 Q342 236 342 270 L346 340 L234 340 Z"/>
${shade([{ lin: [290, 0, 346, 0], s: [0, 0.5] }], 'M238 270 Q238 236 290 236 Q342 236 342 270 L346 340 L234 340 Z')}
<path class="o" fill="${tone(0.8)}" d="M230 428 H350 L356 446 H224 Z"/>
${shade([{ lin: [290, 0, 356, 0], s: [0, 0.5] }], 'M230 428 H350 L356 446 H224 Z')}`);
  add(limb([[274, 430], [272, 516]], 19, 16, tone(0.7)));
  add(limb([[306, 430], [308, 516]], 19, 16, tone(0.7)));
  add(`${shoe(268, 528, -1)}${shoe(312, 528)}
<path class="o" fill="${tone(0.7)}" d="M256 396 L324 396 L330 440 L250 440 Z"/>
<path class="o" fill="${pat('stV')}" d="${D.blouse}"/>
${shade([{ lin: [290, 0, 328, 0], s: [0, 0.45] }], D.blouse)}
<path class="o" d="M276 248 L290 262 L304 248 Z"/>
<rect class="o" x="284" y="230" width="12" height="18"/>
<ellipse class="o" cx="290" cy="198" rx="29" ry="35"/>
<path class="k" d="M260 202 Q254 160 290 160 Q328 160 322 204 Q318 182 306 178 Q296 190 274 182 Q264 188 262 204 Z"/>
<circle class="o" cx="262" cy="212" r="4"/>
${eyes(290, 202)}${brows(290, 191)}${nose(290, 206)}
<path class="t" d="M278 220 Q290 228 302 220 Q290 232 278 220 Z" fill="#111"/>`);

  add(`<path class="o" fill="${tone(0.18)}" d="M134 330 H446 L470 372 H110 Z"/>
<path class="o" fill="${tone(0.32)}" d="${D.desk}"/>
${shade([{ lin: [290, 0, 470, 0], s: [0, 0.5] }], D.desk)}
<path class="k" d="M116 388 h10 v160 h-10 Z M454 388 h10 v160 h-10 Z"/>
<path class="o" fill="${tone(0.8)}" d="M128 228 L240 246 V318 L128 328 Z"/>
<path class="o" fill="${tone(0.9)}" d="M240 246 L250 250 V316 L240 318 Z"/>
<path class="o" fill="${tone(0.08)}" d="${D.screen}"/>
${shade([{ lin: [140, 240, 232, 312], s: [0.04, 0.3] }], D.screen)}
<path class="t" d="M148 256 L206 264 M148 268 L218 276 M148 280 L198 285 M148 292 L214 296"/>
<rect class="k" x="180" y="322" width="12" height="14"/>
<ellipse class="k" cx="186" cy="340" rx="28" ry="5"/>
<path class="o" fill="${tone(0.5)}" d="M246 344 H334 L340 364 H240 Z"/>
<path class="w" d="M252 350 H330 M250 357 H334" stroke-dasharray="6 3"/>
<path class="o" fill="${tone(0.55)}" d="M352 352 L358 334 H398 L404 352 Z"/>
${shade([{ lin: [378, 0, 404, 0], s: [0, 0.5] }], 'M352 352 L358 334 H398 L404 352 Z')}
<path class="o" d="M364 338 h28 v8 h-28 Z"/>
<path class="h" d="M360 340 q-8 -10 -2 -20 q8 -8 0 -16 q-8 -8 0 -16 q8 -8 0 -16 q-6 -10 -18 -24"/>
<ellipse class="o" fill="${tone(0.6)}" cx="436" cy="352" rx="22" ry="6"/>
<path class="t" d="M436 350 L426 296 L446 262" stroke-width="5"/>
<circle class="k" cx="426" cy="296" r="4"/>
<path class="o" fill="${tone(0.6)}" d="M416 284 Q418 250 444 248 Q470 250 472 284 Z"/>
${shade([{ lin: [444, 0, 472, 0], s: [0, 0.5] }], 'M416 284 Q418 250 444 248 Q470 250 472 284 Z')}
<path class="h" d="M428 292 l-6 14 M444 294 v16 M460 292 l6 14"/>`);

  add(limb([[258, 270], [248, 316], [272, 344]], 16, 13, pat('stV')));
  add(`${hand(276, 346, 60)}`);
  add(limb([[322, 270], [340, 250], [324, 222]], 16, 13, pat('stV')));
  add(`<path class="k" d="M316 190 Q308 188 306 196 L310 232 Q314 240 322 236 L328 230 L324 196 Z"/>
${hand(326, 226, -20)}`);

  add(`<path class="o" fill="${tone(0.5)}" d="${D.pot}"/>
${shade([{ lin: [750, 0, 782, 0], s: [0, 0.5] }], D.pot)}
<path class="o" fill="${tone(0.5)}" d="M714 462 H786 V474 H714 Z"/>
${[[750, 462, 708, 330], [750, 462, 744, 300], [750, 462, 782, 330], [750, 462, 716, 400], [750, 462, 790, 400]].map(([x0, y0, x1, y1]) => {
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  return `<path class="o" fill="${tone(0.35)}" d="M${x0} ${y0} Q${mx - 20} ${my} ${x1} ${y1} Q${mx + 20} ${my} ${x0} ${y0} Z"/><path class="h" d="M${x0} ${y0} Q${mx} ${my} ${x1} ${y1}"/>`;
}).join('')}`);

  add(limb([[606, 366], [602, 548]], 24, 20, tone(0.75)));
  add(limb([[636, 366], [640, 548]], 24, 20, tone(0.75)));
  add(`${shoe(598, 562, -1)}${shoe(644, 562)}
<path class="o" fill="${pat('check')}" d="${D.shirt}"/>
${shade([{ lin: [620, 0, 660, 0], s: [0, 0.5] }], D.shirt)}
<path class="o" fill="${tone(0.75)}" d="M578 362 H662 V378 H578 Z"/>
<path class="o" d="M602 214 L620 232 L638 214 L634 208 Q620 212 606 208 Z"/>
<rect class="o" x="614" y="194" width="12" height="18"/>
<ellipse class="o" cx="589" cy="164" rx="6" ry="9"/><ellipse class="o" cx="651" cy="164" rx="6" ry="9"/>
<ellipse class="o" cx="620" cy="160" rx="30" ry="36"/>
<path class="k" d="M590 160 Q586 120 620 120 Q654 120 650 160 Q646 140 632 134 Q612 144 600 136 Q592 144 590 160 Z"/>
${eyes(620, 162)}${brows(620, 151)}${nose(620, 166)}
<path class="t" d="M610 182 q10 7 20 0"/>`);
  add(limb([[652, 238], [670, 300], [664, 350]], 19, 15, pat('check')));
  add(`<g transform="rotate(-8 680 350)"><rect class="o" x="652" y="318" width="54" height="68"/><rect class="o" x="658" y="312" width="54" height="68"/>
<path class="h" d="M666 326 H704 M666 336 H704 M666 346 H698 M666 356 H704 M666 366 H690"/></g>
${hand(664, 352, 10)}`);
  add(limb([[588, 238], [560, 290], [520, 300]], 19, 15, pat('check')));
  add(`<ellipse class="o" cx="506" cy="300" rx="26" ry="5"/>
<path class="o" d="M490 268 H520 L518 296 Q505 302 492 296 Z"/>
<path class="t" d="M520 274 Q532 276 530 284 Q528 292 518 290"/>
${shade([{ lin: [505, 0, 520, 0], s: [0, 0.4] }], 'M490 268 H520 L518 296 Q505 302 492 296 Z')}
<path class="h" d="M498 260 q-6 -8 0 -14 q6 -6 0 -14 M510 260 q-6 -8 0 -14 q6 -6 0 -14"/>
${hand(522, 298, 70)}`);
}
