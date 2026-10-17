export default function draw({ add, def, clip, shade, limb, hand, shoe, tone, pat, f, W, H }) {
  def(`<pattern id="vtile" width="32" height="32" patternUnits="userSpaceOnUse"><rect width="32" height="32" fill="#fff"/><path d="M0 0.7 H32 M0.7 0 V32" stroke="#9a9a9a" stroke-width="1.4"/></pattern>`);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    tiles: `M0 224 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    basin: 'M84 306 Q90 370 174 374 Q258 370 264 306 Z',
    pedestal: 'M154 368 L194 368 L202 532 L146 532 Z',
    tub: 'M598 370 L812 370 L812 508 L640 508 Q598 504 598 462 Z',
    shirt: 'M290 262 Q294 250 320 250 Q346 250 350 262 L356 384 L284 384 Z',
    dadShirt: 'M452 222 Q458 206 490 206 Q522 206 528 222 L534 382 L446 382 Z',
    towel: 'M390 318 L428 318 L434 448 L386 448 Z'
  };

  const vp = [400, 150];
  const at = (xb, y) => vp[0] + ((xb - vp[0]) * (y - vp[1])) / (H - vp[1]);
  const rows = [400, 416, 438, 468, 508, 560, 620];
  const grid = [];
  for (let xb = -1600; xb <= 2400; xb += 84) grid.push(`M${f(at(xb, 400))} 400 L${f(at(xb, 620))} 620`);
  rows.slice(1).forEach((y) => grid.push(`M0 ${y} H${W}`));

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(`<path class="o" fill="${pat('vtile')}" d="${D.tiles}"/>`);
  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }], D.tiles));
  add(`<g ${clip(D.floor)}><path class="h" stroke="#b0b0b0" d="${grid.join(' ')}"/></g>`);
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [192, 536, 66, 9], s: 0.7 }]));
  add(shade([{ rad: [332, 544, 66, 9], s: 0.7 }]));
  add(shade([{ rad: [504, 566, 70, 10], s: 0.7 }]));
  add(shade([{ rad: [724, 516, 150, 13], s: 0.7 }]));

  add(`<circle class="o" fill="${tone(0.35)}" cx="174" cy="148" r="72"/>
<circle class="o" fill="${tone(0.1)}" cx="174" cy="148" r="60"/>
${shade([{ lin: [130, 100, 234, 200], s: [0, 0.35] }], 'M174 88 a60 60 0 1 1 0 120 a60 60 0 1 1 0 -120 Z')}
<path class="w" d="M136 150 L170 112 M146 168 L194 116 M170 184 L190 162" stroke-width="4"/>`);

  add(`<path class="o" d="M166 300 V262 Q166 254 174 254 Q182 254 182 262 V300 Z"/>
<path class="o" d="M174 260 H210 Q218 260 218 268 V276 H206 V272 H174 Z"/>
<circle class="k" cx="174" cy="250" r="6"/>
<path class="o" d="${D.pedestal}"/>
${shade([{ lin: [174, 0, 202, 0], s: [0, 0.45] }], D.pedestal)}
<path class="o" d="${D.basin}"/>
${shade([{ lin: [174, 0, 264, 0], s: [0, 0.45] }], D.basin)}
<path class="o" d="M80 306 Q80 292 174 292 Q268 292 268 306 Q268 318 174 318 Q80 318 80 306 Z"/>
<ellipse class="o" fill="${tone(0.3)}" cx="174" cy="305" rx="80" ry="8"/>`);

  add(`<path class="o" d="M766 150 H776 V360 H766 Z"/>
<path class="o" d="M776 150 Q776 136 760 136 H724 V146 H760 Q766 146 766 150 Z"/>
<path class="o" fill="${tone(0.3)}" d="M690 148 L740 140 L744 158 Q718 176 694 168 Z"/>
<path class="h" d="M700 176 l-3 7 M710 178 l-2 7 M720 178 l-1 7 M730 175 l0 7"/>
<path class="o" d="${D.tub}"/>
${shade([{ lin: [690, 0, 812, 0], s: [0, 0.45] }, { lin: [0, 470, 0, 508], s: [0, 0.2] }], D.tub)}
<rect class="o" x="588" y="352" width="240" height="20" rx="10"/>
<path class="k" d="M632 506 h18 l-4 22 h-10 Z M772 506 h18 l-4 22 h-10 Z"/>`);

  add(`<ellipse class="o" fill="${tone(0.42)}" cx="690" cy="562" rx="104" ry="20"/>
<ellipse class="o" cx="690" cy="562" rx="82" ry="12"/>
<path class="h" d="M586 556 h-10 M586 562 h-12 M586 568 h-10 M794 556 h10 M794 562 h12 M794 568 h10"/>`);

  add(`<path class="k" d="M276 410 h8 v48 h-8 Z M358 410 h8 v48 h-8 Z"/>
<rect class="o" fill="${tone(0.3)}" x="268" y="398" width="106" height="16" rx="3"/>
<path class="o" fill="${tone(0.3)}" d="M272 452 L370 452 L376 466 L266 466 Z"/>
<rect class="o" fill="${tone(0.3)}" x="266" y="466" width="110" height="10"/>
<path class="k" d="M272 476 h9 v64 h-9 Z M361 476 h9 v64 h-9 Z"/>`);

  add(`<path class="o" fill="${tone(0.82)}" d="M286 378 L354 378 L356 414 L284 414 Z"/>`);
  add(limb([[306, 412], [305, 448]], 14, 12));
  add(limb([[334, 412], [335, 448]], 14, 12));
  add(`${shoe(302, 459, -1)}${shoe(339, 459)}
<path class="o" fill="${tone(0.5)}" d="${D.shirt}"/>
${shade([{ lin: [320, 0, 356, 0], s: [0, 0.45] }], D.shirt)}
<rect class="o" x="313" y="234" width="14" height="18"/>
<path class="o" d="M308 252 L320 264 L332 252 Z"/>
<ellipse class="o" cx="320" cy="206" rx="30" ry="33"/>
<path class="k" d="M290 208 Q286 170 320 169 Q354 170 350 208 Q346 192 340 190 L336 199 L330 186 L324 197 L318 184 L312 197 L306 186 L300 199 L296 190 Q292 194 290 208 Z"/>
<ellipse class="k" cx="309" cy="208" rx="3" ry="4"/><ellipse class="k" cx="331" cy="208" rx="3" ry="4"/>
<path class="h" d="M302 199 q6 -4 12 0 M326 199 q6 -4 12 0 M320 212 q-3 7 2 8"/>
<path class="t" d="M310 224 q10 6 20 0"/>`);
  add(limb([[292, 268], [270, 300], [240, 296]], 17, 14, tone(0.5)));
  add(limb([[348, 268], [326, 314], [266, 302]], 17, 14, tone(0.5)));
  add(`<path class="t" d="M206 278 q-2 6 0 12 M212 278 q2 7 0 14"/>
${hand(236, 294, 80)}${hand(260, 298, 100)}
<rect class="o" x="226" y="280" width="40" height="22" rx="9"/>
<path class="h" d="M235 287 q11 -3 22 0"/>
<circle class="o" cx="224" cy="282" r="6"/><circle class="o" cx="240" cy="274" r="5"/><circle class="o" cx="256" cy="276" r="7"/><circle class="o" cx="270" cy="288" r="5"/><circle class="o" cx="226" cy="300" r="4"/>`);

  add(`<path class="o" fill="${tone(0.75)}" d="M448 376 L532 376 L534 552 L500 552 L490 424 L480 552 L446 552 Z"/>
${shade([{ lin: [490, 0, 534, 0], s: [0, 0.45] }], 'M448 376 L532 376 L534 552 L500 552 L490 424 L480 552 L446 552 Z')}
${shoe(468, 562, -1)}${shoe(513, 562)}
<path class="o" fill="${pat('check')}" d="${D.dadShirt}"/>
${shade([{ lin: [490, 0, 534, 0], s: [0, 0.45] }], D.dadShirt)}
<rect class="o" x="482" y="184" width="16" height="24"/>
<path class="o" d="M476 206 L490 222 L504 206 Z"/>
<g transform="rotate(-10 490 192)"><ellipse class="o" cx="490" cy="150" rx="30" ry="36"/>
<path class="k" d="M460 152 Q454 106 490 104 Q528 106 520 152 Q518 130 506 124 Q490 134 474 124 Q464 132 460 152 Z"/>
<ellipse class="k" cx="474" cy="156" rx="3" ry="4"/><ellipse class="k" cx="496" cy="156" rx="3" ry="4"/>
<path class="h" d="M468 146 q6 -4 12 0 M490 146 q6 -4 12 0 M482 160 q-6 8 1 9"/>
<path class="t" d="M472 174 q10 6 20 0"/>
<path class="h" d="M458 166 q3 3 6 0 M516 166 q3 3 6 0"/></g>`);
  add(limb([[524, 226], [540, 296], [538, 354]], 19, 15, pat('check')));
  add(hand(538, 360, 5));
  add(limb([[456, 226], [430, 276], [414, 314]], 19, 15, pat('check')));
  add(`<path class="o" fill="${pat('stH')}" d="${D.towel}"/>
${shade([{ lin: [408, 0, 434, 0], s: [0, 0.4] }], D.towel)}
<path class="h" d="M390 448 v8 M398 448 v8 M406 448 v8 M414 448 v8 M422 448 v8 M430 448 v8"/>
${hand(410, 318, 20)}`);
}
