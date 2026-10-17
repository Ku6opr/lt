export default function draw({ add, shade, floor, limb, hand, shoe, tone, pat, W, H }) {
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M52 52 H268 V318 H52 Z',
    picture: 'M572 92 H716 V196 H572 Z',
    bucket: 'M474 486 L552 486 L544 556 L482 556 Z',
    puddle: 'M478 566 Q470 548 520 546 Q600 540 660 548 Q736 552 724 572 Q712 590 640 588 Q560 594 506 586 Q482 582 478 566 Z',
    blouse: 'M318 168 Q322 154 346 154 Q370 154 374 168 L380 292 L312 292 Z',
    hips: 'M314 282 L378 282 L376 316 L316 316 Z',
    shirt: 'M628 318 Q632 304 658 304 Q684 304 688 318 L694 424 L622 424 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<rect class="o" x="40" y="40" width="240" height="290"/>
<rect class="o" x="52" y="52" width="216" height="266"/>
${shade([{ lin: [52, 52, 268, 318], s: [0.24, 0.04] }], D.pane)}
<circle class="o" cx="98" cy="98" r="18"/>
<path class="t" d="M98 72 v-7 M98 124 v7 M72 98 h-7 M124 98 h7 M80 80 l-5 -5 M116 80 l5 -5 M80 116 l-5 5 M116 116 l5 5"/>
<path class="t" d="M160 52 V318 M52 185 H268"/>
<path class="t" d="M74 262 q12 -14 26 -4 q10 -12 22 0 q8 -6 16 2 M180 236 q6 -8 12 0 q6 -8 12 0"/>
<path class="h" d="M184 150 q22 -30 50 -8 M180 168 q26 -34 60 -10 M190 128 q16 -18 34 -6"/>
<circle class="h" cx="196" cy="186" r="5"/><circle class="h" cx="212" cy="196" r="3.5"/><circle class="h" cx="186" cy="204" r="3"/><circle class="h" cx="250" cy="160" r="4"/>
<rect class="o" x="28" y="330" width="264" height="12"/>`);

  add(`<rect class="o" fill="${tone(0.3)}" x="560" y="80" width="168" height="128"/>
<rect class="o" x="572" y="92" width="144" height="104"/>
<path class="t" d="M572 172 L612 128 L640 156 L664 132 L716 182"/>
<circle class="o" cx="684" cy="114" r="10"/>
${shade([{ lin: [644, 0, 716, 0], s: [0, 0.3] }], D.picture)}`);

  add(shade([{ rad: [378, 562, 110, 11], s: 0.7 }]));
  add(shade([{ rad: [526, 560, 52, 8], s: 0.7 }]));
  add(shade([{ rad: [698, 572, 60, 9], s: 0.6 }]));

  const rail = (x0, x1) => `M${x0} 560 L${x1} 300 L${x1 + 12} 300 L${x0 + 12} 560 Z`;
  const lx = (y) => 276 + (30 * (560 - y)) / 260;
  const rx = (y) => 432 - (30 * (560 - y)) / 260;
  add(`<path class="o" fill="${tone(0.25)}" d="M384 304 L396 304 L466 550 L454 552 Z"/>
<path class="t" d="M412 420 L436 446" stroke-width="5"/>
<path class="o" fill="${tone(0.25)}" d="${rail(276, 306)}"/>
<path class="o" fill="${tone(0.25)}" d="${rail(420, 390)}"/>
${shade([{ lin: [420, 0, 432, 0], s: [0, 0.45] }], rail(420, 390))}
${[494, 430, 366].map((y) => `<rect class="o" fill="${tone(0.25)}" x="${lx(y) + 6}" y="${y}" width="${rx(y) - lx(y) - 12}" height="10"/>`).join('')}
<rect class="o" fill="${tone(0.25)}" x="296" y="292" width="116" height="12" rx="2"/>
<path class="h" d="M278 548 h10 M422 548 h10"/>`);

  add(`<path class="t" d="M476 490 Q513 436 550 490"/>
<path class="o" fill="${tone(0.32)}" d="${D.bucket}"/>
${shade([{ lin: [513, 0, 552, 0], s: [0, 0.5] }], D.bucket)}
<path class="h" d="M478 512 L548 512 M481 536 L545 536"/>
<ellipse class="o" fill="${tone(0.32)}" cx="513" cy="486" rx="39" ry="7"/>
<ellipse class="o" fill="${tone(0.5)}" cx="513" cy="487" rx="32" ry="4.5"/>
<path class="w" d="M492 487 q5 -2 10 0 q5 2 10 0 M516 487 q5 -2 10 0" stroke-width="1.6"/>
`);

  add(`<path class="o" fill="${tone(0.6)}" d="${D.hips}"/>`);
  add(limb([[331, 300], [330, 484]], 26, 19, tone(0.6)));
  add(limb([[361, 300], [362, 484]], 26, 19, tone(0.6)));
  add(shade([{ lin: [340, 0, 376, 0], s: [0, 0.5] }], 'M352 290 H376 V490 H352 Z'));
  add(`${shoe(328, 494, -1)}${shoe(364, 494)}`);
  add(`<path class="o" fill="${pat('dots')}" d="${D.blouse}"/>
${shade([{ lin: [346, 0, 380, 0], s: [0, 0.45] }], D.blouse)}
<rect class="o" x="335" y="138" width="22" height="20"/>`);
  add(limb([[370, 176], [394, 236], [398, 286]], 19, 15, pat('dots')));
  add(hand(398, 290, 0));
  add(`<path class="o" fill="${tone(0.16)}" d="M222 104 L250 98 L262 128 L232 136 Z"/>
<path class="h" d="M230 112 l18 -4 M234 124 l18 -4"/>`);
  add(limb([[322, 176], [284, 160], [252, 124]], 19, 15, pat('dots')));
  add(hand(248, 120, 40));

  add(`<path class="k" d="M314 126 Q308 66 346 64 Q384 66 378 126 L382 150 Q370 154 364 144 L328 144 Q322 154 310 150 Z"/>
<ellipse class="o" cx="346" cy="110" rx="28" ry="34"/>
<path class="k" d="M318 102 Q319 72 346 72 Q373 72 374 102 Q365 86 346 88 Q329 86 318 102 Z"/>
<circle class="k" cx="346" cy="60" r="13"/>
<ellipse class="k" cx="334" cy="110" rx="3" ry="4"/><ellipse class="k" cx="358" cy="110" rx="3" ry="4"/>
<path class="h" d="M327 101 q6 -4 12 0 M353 101 q6 -4 12 0 M346 114 q-3 7 2 8"/>
<ellipse class="k" cx="346" cy="130" rx="7" ry="6"/>`);

  add(`<ellipse class="k" cx="410" cy="88" rx="7" ry="5.5" transform="rotate(-20 410 88)"/>
<path class="t" d="M416 86 V52 q8 4 14 12"/>
<ellipse class="k" cx="440" cy="128" rx="7" ry="5.5" transform="rotate(-20 440 128)"/>
<ellipse class="k" cx="466" cy="120" rx="7" ry="5.5" transform="rotate(-20 466 120)"/>
<path class="t" d="M446 126 V90 L472 82 V118"/>
<path class="k" d="M446 90 L472 82 V90 L446 98 Z"/>`);

  add('<g transform="translate(22 0)">');
  add(`<path class="o" fill="${tone(0.2)}" d="${D.puddle}"/>
<path class="w" d="M520 560 q30 -6 60 -2 M600 572 q30 4 60 -2 M500 574 q10 4 22 4" stroke-width="3.6"/>
<ellipse class="o" fill="${tone(0.2)}" cx="740" cy="586" rx="9" ry="3.5"/><ellipse class="o" fill="${tone(0.2)}" cx="460" cy="582" rx="7" ry="3"/><ellipse class="o" fill="${tone(0.2)}" cx="704" cy="540" rx="6" ry="2.5"/>`);

  add(`<path class="o" fill="${tone(0.18)}" d="M548 566 Q544 540 574 538 L604 534 Q628 538 630 562 Z"/>
<path class="h" d="M556 562 l4 -16 M570 564 l2 -20 M586 564 l0 -22 M602 564 l-1 -22 M616 562 l-3 -18"/>
<rect class="o" fill="${tone(0.5)}" x="574" y="526" width="34" height="14" rx="3"/>`);

  add(`<path class="o" fill="${pat('stH')}" d="${D.shirt}"/>
${shade([{ lin: [658, 0, 694, 0], s: [0, 0.45] }], D.shirt)}
<path class="o" d="M646 306 L658 318 L670 306 Z"/>
<rect class="o" x="651" y="290" width="14" height="16"/>`);
  add(limb([[642, 420], [640, 554]], 16, 14, tone(0.75)));
  add(limb([[674, 420], [676, 554]], 16, 14, tone(0.75)));
  add(`${shoe(636, 566, -1)}${shoe(680, 566)}`);
  add(`<ellipse class="o" cx="658" cy="260" rx="30" ry="33"/>
<path class="k" d="M628 262 Q624 224 658 223 Q692 224 688 262 Q684 246 678 244 L674 253 L668 240 L662 251 L656 238 L650 251 L644 240 L638 253 L634 244 Q630 248 628 262 Z"/>
<ellipse class="k" cx="647" cy="262" rx="3" ry="4"/><ellipse class="k" cx="669" cy="262" rx="3" ry="4"/>
<path class="h" d="M640 253 q6 -4 12 0 M664 253 q6 -4 12 0 M658 266 q-3 7 2 8"/>
<path class="t" d="M647 278 q11 7 22 0"/>
<path class="h" d="M631 274 q3 3 6 0 M679 274 q3 3 6 0"/>`);
  add(limb([[632, 326], [614, 384], [642, 418]], 17, 14, pat('stH')));
  add(limb([[684, 326], [696, 350], [674, 362]], 17, 14, pat('stH')));
  add(limb([[720, 262], [592, 528]], 9, 9, tone(0.42)));
  add(`${hand(671, 362, 60)}${hand(645, 418, 60)}`);
  add('</g>');
}
