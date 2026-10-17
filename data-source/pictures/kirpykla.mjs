export default function draw({ add, shade, floor, limb, hand, shoe, tone, pat, rng, W, H }) {
  const eyes = (x, y, dx = 11) => `<ellipse class="k" cx="${x - dx}" cy="${y}" rx="3" ry="4"/><ellipse class="k" cx="${x + dx}" cy="${y}" rx="3" ry="4"/>`;
  const brows = (x, y, dx = 11) => `<path class="h" d="M${x - dx - 6} ${y} q6 -4 12 0 M${x + dx - 6} ${y} q6 -4 12 0"/>`;
  const nose = (x, y) => `<path class="h" d="M${x} ${y} q-3 7 2 8"/>`;
  const bottle = (x, y, w, h, t) => `<rect class="o" fill="${tone(t)}" x="${x}" y="${y - h}" width="${w}" height="${h}" rx="4"/><rect class="o" x="${x + w * 0.25}" y="${y - h - 9}" width="${w * 0.5}" height="10" rx="2"/><rect class="o" x="${x + 3}" y="${y - h * 0.66}" width="${w - 6}" height="${h * 0.3}"/>`;

  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    glass: 'M130 82 A70 92 0 1 1 129.9 82 Z',
    back: 'M304 268 Q304 232 390 232 Q476 232 476 268 L480 440 L300 440 Z',
    cape: 'M376 258 Q390 266 404 258 Q434 268 442 310 L456 452 Q390 468 324 452 L338 310 Q346 268 376 258 Z',
    top: 'M536 240 Q540 214 572 214 Q604 214 608 240 L612 344 L532 344 Z',
    skirt: 'M534 340 L610 340 L626 508 L518 508 Z',
    vase: 'M712 330 Q700 300 716 282 L744 282 Q760 300 748 330 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [394, 548, 96, 13], s: 0.75 }]));
  add(shade([{ rad: [576, 562, 76, 11], s: 0.7 }]));
  add(shade([{ rad: [736, 552, 56, 9], s: 0.7 }]));

  add(`<ellipse class="o" fill="${tone(0.35)}" cx="130" cy="174" rx="84" ry="106"/>
${shade([{ lin: [130, 0, 214, 0], s: [0, 0.5] }], 'M130 68 A84 106 0 1 1 129.9 68 Z')}
<ellipse class="o" fill="${tone(0.1)}" cx="130" cy="174" rx="70" ry="92"/>
${shade([{ lin: [60, 82, 200, 266], s: [0.05, 0.3] }], D.glass)}
<path class="w" d="M88 150 L124 104 M90 186 L148 112 M150 240 L180 202" stroke-width="5"/>
<rect class="o" fill="${tone(0.3)}" x="30" y="300" width="200" height="10"/>
<path class="k" d="M52 310 l8 0 l-8 14 Z M200 310 l8 0 l0 14 Z"/>
${bottle(44, 300, 24, 46, 0.6)}${bottle(78, 300, 20, 34, 0.25)}${bottle(108, 300, 26, 52, 0.8)}
<path class="o" fill="${pat('stH')}" d="M150 300 H222 V286 Q222 278 214 278 H158 Q150 278 150 286 Z"/>
<path class="o" fill="${pat('stH')}" d="M154 278 H218 V266 Q218 258 210 258 H162 Q154 258 154 266 Z"/>
${shade([{ lin: [186, 0, 222, 0], s: [0, 0.4] }], 'M150 300 H222 V258 H150 Z')}`);

  add(`<path class="o" fill="${tone(0.35)}" d="M700 344 H772 L776 356 H696 Z"/>
<path class="k" d="M732 356 h8 v170 h-8 Z"/>
<ellipse class="k" cx="736" cy="532" rx="34" ry="7"/>
<path class="t" d="M730 284 Q722 240 702 214 M730 284 Q734 230 732 196 M730 284 Q744 240 764 222 M730 284 Q716 260 688 252 M730 284 Q750 264 772 258"/>
${[[702, 212], [732, 192], [764, 220], [688, 250], [772, 256]].map(([x, y], i) => `<g transform="rotate(${i * 37} ${x} ${y})"><ellipse class="o" cx="${x}" cy="${y - 9}" rx="7" ry="10"/><ellipse class="o" cx="${x}" cy="${y + 9}" rx="7" ry="10"/><ellipse class="o" cx="${x - 9}" cy="${y}" rx="10" ry="7"/><ellipse class="o" cx="${x + 9}" cy="${y}" rx="10" ry="7"/><circle class="k" cx="${x}" cy="${y}" r="5"/></g>`).join('')}
<path class="o" fill="${tone(0.55)}" d="${D.vase}"/>
${shade([{ lin: [730, 0, 754, 0], s: [0, 0.5] }], D.vase)}
<path class="o" fill="${tone(0.55)}" d="M710 334 H750 V344 H710 Z"/>
<path class="o" fill="${tone(0.4)}" d="M714 274 H746 V284 H714 Z"/>`);

  add(`<path class="o" fill="${tone(0.78)}" d="${D.back}"/>
${shade([{ lin: [390, 0, 446, 0], s: [0, 0.5] }], D.back)}
<path class="k" d="M380 470 h22 v58 h-22 Z"/>
<ellipse class="k" cx="391" cy="536" rx="52" ry="9"/>
<path class="k" d="M352 520 H430 V528 H352 Z"/>
<path class="k" d="M290 386 h9 v56 h-9 Z M481 386 h9 v56 h-9 Z"/>
<path class="o" fill="${tone(0.78)}" d="M282 370 H314 Q320 370 320 378 V388 H276 V378 Q276 370 282 370 Z"/>
<path class="o" fill="${tone(0.78)}" d="M466 370 H498 Q504 370 504 378 V388 H460 V378 Q460 370 466 370 Z"/>
<path class="o" fill="${tone(0.78)}" d="M292 438 H488 L494 466 H286 Z"/>
${shade([{ lin: [390, 0, 494, 0], s: [0, 0.5] }], 'M292 438 H488 L494 466 H286 Z')}`);

  add(limb([[374, 456], [372, 516]], 20, 18, tone(0.7)));
  add(limb([[406, 456], [408, 516]], 20, 18, tone(0.7)));
  add(`${shoe(370, 528, -1)}${shoe(412, 528)}
<path class="o" fill="${pat('stV')}" d="${D.cape}"/>
${shade([{ lin: [390, 0, 476, 0], s: [0, 0.45] }], D.cape)}
<path class="o" d="M376 258 Q390 272 404 258 L408 268 Q390 284 372 268 Z"/>
<rect class="o" x="384" y="240" width="12" height="22"/>
<ellipse class="o" cx="359" cy="218" rx="6" ry="9"/><ellipse class="o" cx="421" cy="218" rx="6" ry="9"/>
<ellipse class="o" cx="390" cy="214" rx="30" ry="35"/>
<path class="k" d="M361 212 Q358 176 390 176 Q422 176 419 212 Q416 194 406 190 Q390 198 376 190 Q364 194 361 212 Z"/>
${eyes(390, 216)}${brows(390, 205)}${nose(390, 220)}
<path class="t" d="M378 234 q12 9 24 0"/>`);
  const r = rng(11);
  const bits = (x0, x1, y0, y1, n) =>
    Array.from({ length: n }, () => {
      const x = x0 + r() * (x1 - x0);
      const y = y0 + r() * (y1 - y0);
      const a = r() * 10 - 5;
      return `M${x.toFixed(1)} ${y.toFixed(1)} q${(4 + a).toFixed(1)} -5 ${(9 + a).toFixed(1)} ${(r() * 6 - 3).toFixed(1)}`;
    }).join(' ');
  add(`<path class="t" d="${bits(352, 430, 300, 440, 9)}"/>
<path class="t" stroke-width="2.6" d="${bits(286, 330, 540, 588, 6)} ${bits(452, 500, 540, 588, 6)} ${bits(330, 460, 562, 594, 9)}"/>`);

  add(`<path class="o" fill="${tone(0.6)}" d="M540 160 Q534 118 572 116 Q610 118 604 160 L612 300 Q590 312 572 300 Q554 312 532 300 Z"/>
<path class="h" d="M546 200 Q544 250 548 292 M598 200 Q600 250 596 292"/>
<path class="t" d="M552 360 V520 M592 360 V520" stroke="none"/>
<path class="t" d="M560 508 V552 M584 508 V552"/>
${shoe(556, 562, -1)}${shoe(588, 562)}
<path class="o" fill="${tone(0.42)}" d="${D.skirt}"/>
${shade([{ lin: [572, 0, 626, 0], s: [0, 0.45] }], D.skirt)}
<path class="o" fill="${pat('dots')}" d="${D.top}"/>
${shade([{ lin: [572, 0, 612, 0], s: [0, 0.45] }], D.top)}
<path class="o" d="M556 216 Q572 232 588 216 L592 226 Q572 244 552 226 Z"/>
<rect class="o" x="566" y="196" width="12" height="22"/>
<ellipse class="o" cx="572" cy="162" rx="29" ry="35"/>
<path class="o" fill="${tone(0.6)}" d="M543 162 Q540 124 572 124 Q604 124 601 162 Q594 140 580 138 Q566 150 548 146 Q544 152 543 162 Z"/>
<path class="h" d="M560 128 Q552 136 548 146 M580 128 Q594 136 598 150"/>
${eyes(572, 166)}${brows(572, 155)}${nose(572, 170)}
<path class="t" d="M563 184 q9 6 18 0"/>`);
  add(limb([[604, 242], [618, 300], [606, 350]], 18, 14, pat('dots')));
  add(`<path class="k" d="M582 352 H632 V360 H582 Z"/>
<path class="t" d="M586 360 v9 M592 360 v9 M598 360 v9 M604 360 v9 M610 360 v9 M616 360 v9 M622 360 v9 M628 360 v9"/>
${hand(606, 354, 0)}`);
  add(limb([[542, 242], [500, 268], [470, 224]], 18, 14, pat('dots')));
  add(`${hand(468, 220, -40)}
<path class="k" d="M458 214 L416 192 L418 187 L462 208 Z"/>
<path class="k" d="M458 220 L418 214 L418 208 L460 214 Z"/>
<circle class="o" cx="474" cy="204" r="8"/><circle class="o" cx="476" cy="226" r="8"/>
<circle class="k" cx="460" cy="214" r="3"/>`);
}
