export default function draw({ add, def, shade, limb, shoe, tone, W, H }) {
  def(`<pattern id="tile" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#fff"/><path d="M0 0.5 H40 M0.5 0 V40" stroke="#b4b4b4" stroke-width="1.4"/></pattern>`);
  def(`<pattern id="band" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#fff"/><rect width="10" height="24" fill="#8a8a8a"/></pattern>`);
  def(`<pattern id="deck" width="50" height="34" patternUnits="userSpaceOnUse"><rect width="50" height="34" fill="#fff"/><path d="M0 0.5 H50 M0.5 0 V34" stroke="#bdbdbd" stroke-width="1.4"/></pattern>`);

  const D = {
    wall: `M0 0 H${W} V300 H0 Z`,
    deck: `M0 300 H${W} V${H} H0 Z`,
    water: `M0 344 H536 V${H} H0 Z`,
    pane: 'M54 54 H186 V186 H54 Z',
    suit: 'M592 304 Q596 290 614 290 Q632 290 636 304 L640 380 Q626 392 614 380 Q602 392 588 380 Z',
    towel: 'M684 458 L682 440 Q682 432 690 432 L764 432 Q772 432 772 442 L774 504 Q764 510 756 504 Q748 510 740 504 L740 458 Z'
  };

  add(`<path class="o" fill="url(#tile)" d="${D.wall}"/>`);
  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 220, 0, 300], s: [0, 0.14] }], D.wall));
  add(`<path class="o" fill="url(#deck)" d="${D.deck}"/>`);
  add(shade([{ lin: [0, 300, 0, 340], s: [0.35, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.deck));
  add(`<rect class="o" x="-10" y="292" width="${W + 20}" height="10"/>`);

  add(`<rect class="o" x="40" y="40" width="160" height="160"/>
<path class="o" d="${D.pane}"/>
<circle class="o" cx="104" cy="104" r="22"/>
<path class="t" d="M104 72 V62 M104 136 V146 M72 104 H62 M136 104 H146 M82 82 L75 75 M126 82 L133 75 M82 126 L75 133 M126 126 L133 133"/>
${shade([{ lin: [54, 54, 186, 186], s: [0.04, 0.22] }], D.pane)}
<path class="t" d="M120 54 V186 M54 120 H186"/>
<path class="t" d="M150 82 q7 -9 14 0 q7 -9 14 0"/>
<rect class="o" x="30" y="200" width="180" height="10"/>`);

  add(`<circle class="o" cx="420" cy="116" r="40"/>
<circle class="o" cx="420" cy="116" r="32"/>
<path class="t" d="M420 88 v6 M420 138 v6 M392 116 h6 M442 116 h6 M420 116 V96 M420 116 L436 124"/>
<circle class="k" cx="420" cy="116" r="3"/>
${shade([{ lin: [400, 0, 460, 0], s: [0, 0.35] }], 'M380 116 a40 40 0 1 0 80 0 a40 40 0 1 0 -80 0 Z')}`);

  add(`<path class="o" fill="${tone(0.24)}" d="${D.water}"/>
${shade([{ lin: [0, 344, 0, 600], s: [0.25, 0] }, { lin: [200, 0, 536, 0], s: [0, 0.3] }], D.water)}
<path class="w" stroke-width="3" d="M20 380 q20 -10 40 0 t40 0 M180 372 q20 -10 40 0 t40 0 M380 384 q20 -10 40 0 t40 0 M40 560 q20 -10 40 0 t40 0 M260 572 q20 -10 40 0 t40 0 M140 500 q20 -10 40 0 t40 0 M420 456 q16 -8 32 0 t32 0"/>
<path class="h" d="M80 420 q20 -10 40 0 t40 0 M300 520 q20 -10 40 0 t40 0 M20 480 q16 -8 32 0 t32 0 M330 400 q16 -8 32 0 t32 0"/>
<path class="o" fill="${tone(0.1)}" d="M-10 332 H548 V${H + 10} H536 V344 H-10 Z"/>`);

  add(limb([[58, 316], [60, 296], [74, 288], [84, 300], [84, 440]], 9, 9, tone(0.15)));
  add(limb([[108, 316], [110, 296], [124, 288], [134, 300], [134, 440]], 9, 9, tone(0.15)));
  add(`<path class="o" fill="${tone(0.15)}" d="M84 376 H134 V384 H84 Z M84 412 H134 V420 H84 Z"/>
<path class="w" stroke-width="3" d="M70 444 q14 -8 28 0 q14 -8 28 0 q14 -8 28 0"/>`);

  add(`<ellipse class="h" stroke="#fff" stroke-width="3" cx="282" cy="462" rx="70" ry="14"/>
<ellipse class="h" stroke="#fff" stroke-width="2" cx="282" cy="466" rx="96" ry="22"/>`);
  add(limb([[300, 452], [338, 404], [378, 410]], 15, 13));
  add(`<ellipse class="o" cx="384" cy="414" rx="7" ry="9" transform="rotate(70 384 414)"/>
<ellipse class="o" cx="280" cy="428" rx="30" ry="32"/>
<path class="k" d="M250 426 Q248 394 282 394 Q314 394 310 424 Q300 410 284 410 Q266 410 250 426 Z"/>
<path class="o" fill="${tone(0.5)}" d="M254 426 H306 V438 H254 Z"/>
<circle class="o" cx="270" cy="432" r="8"/><circle class="o" cx="292" cy="432" r="8"/>
<circle class="k" cx="272" cy="433" r="2.6"/><circle class="k" cx="294" cy="433" r="2.6"/>
<path class="t" d="M272 450 q9 5 18 0"/>
<path fill="${tone(0.24)}" d="M210 456 q18 -10 36 0 q18 -10 36 0 q18 -10 36 0 q18 -10 36 0 V490 H210 Z"/>
${shade([{ lin: [200, 0, 536, 0], s: [0, 0.3] }, { lin: [0, 344, 0, 600], s: [0.25, 0] }], 'M210 456 q18 -10 36 0 q18 -10 36 0 q18 -10 36 0 q18 -10 36 0 V490 H210 Z')}
<path class="w" stroke-width="3" d="M210 456 q18 -10 36 0 q18 -10 36 0 q18 -10 36 0 q18 -10 36 0"/>
<path class="h" d="M228 446 l-8 -10 M236 440 l-2 -12 M222 452 l-12 -4 M390 428 l10 -8 M394 436 l12 -2"/>`);

  add(`<ellipse class="h" stroke="#fff" stroke-width="3" cx="440" cy="530" rx="38" ry="9"/>
<circle class="o" cx="440" cy="512" r="25"/>
<path class="o" fill="${tone(0.7)}" d="M440 487 Q422 512 440 537 Q430 537 422 528 Q412 512 422 496 Q430 487 440 487 Z"/>
<path class="o" fill="${tone(0.7)}" d="M440 487 Q458 512 440 537 Q450 537 458 528 Q468 512 458 496 Q450 487 440 487 Z"/>
<circle class="o" cx="440" cy="490" r="5"/>
${shade([{ lin: [430, 0, 465, 0], s: [0, 0.4] }], 'M415 512 a25 25 0 1 0 50 0 a25 25 0 1 0 -50 0 Z')}
<path class="w" stroke-width="3" d="M410 536 q15 -8 30 0 q15 -8 30 0"/>`);

  add(shade([{ rad: [736, 536, 84, 10], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.45)}" d="M664 396 h10 v134 h-10 Z M780 396 h10 v134 h-10 Z"/>
<path class="o" fill="${tone(0.35)}" d="M654 400 H800 V414 H654 Z M654 422 H800 V436 H654 Z"/>
<path class="o" fill="${tone(0.35)}" d="M648 456 H806 V470 H648 Z"/>
${shade([{ lin: [726, 0, 806, 0], s: [0, 0.4] }], 'M648 456 H806 V470 H648 Z')}
<path class="o" fill="url(#band)" d="${D.towel}"/>
${shade([{ lin: [720, 0, 772, 0], s: [0, 0.35] }], D.towel)}
<path class="h" d="M690 446 Q730 452 766 446"/>`);

  add(shade([{ rad: [626, 506, 52, 8], s: 0.6 }]));
  add(limb([[602, 380], [600, 440], [600, 492]], 15, 13));
  add(limb([[626, 380], [630, 440], [632, 492]], 15, 13));
  add(`${shoe(598, 504, -1).replace('class="k"', `class="o" fill="${tone(0.5)}"`)}${shoe(634, 504).replace('class="k"', `class="o" fill="${tone(0.5)}"`)}
<path class="o" fill="url(#dots)" d="${D.suit}"/>
${shade([{ lin: [614, 0, 640, 0], s: [0, 0.45] }], D.suit)}`);
  add(limb([[594, 302], [576, 268], [562, 236]], 14, 12));
  add(limb([[634, 302], [646, 340], [644, 378]], 14, 12));
  add(`<ellipse class="o" cx="560" cy="228" rx="7" ry="9" transform="rotate(-20 560 228)"/>
<ellipse class="o" cx="644" cy="384" rx="7" ry="9"/>
<path class="o" d="M600 302 Q606 296 610 292 M628 302 Q622 296 618 292"/>
<rect class="o" x="608" y="270" width="12" height="20"/>
<path class="k" d="M586 238 Q582 196 614 194 Q648 196 644 238 Q646 268 640 280 Q630 260 630 240 L598 240 Q598 262 588 280 Q582 266 586 238 Z"/>
<ellipse class="o" cx="614" cy="238" rx="27" ry="32"/>
<path class="k" d="M587 236 Q586 204 614 204 Q642 204 641 234 Q632 220 616 218 Q598 220 587 236 Z"/>
<ellipse class="k" cx="596" cy="242" rx="3" ry="4"/><ellipse class="k" cx="618" cy="242" rx="3" ry="4"/>
<path class="h" d="M591 233 q5 -3 10 0 M613 233 q5 -3 10 0 M604 248 q-5 6 0 7"/>
<path class="t" d="M597 259 q9 6 18 0"/>`);
}
