export default function draw({ add, def, shade, limb, shoe, tone, W, H }) {
  def(`<pattern id="mesh" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0.5 H18 M0.5 0 V18" stroke="#8a8a8a" stroke-width="1.5"/></pattern>`);

  const D = {
    court: `M0 390 H${W} V${H} H0 Z`,
    crownA: 'M-10 280 Q-30 230 10 200 Q0 150 50 140 Q80 104 120 130 Q160 120 166 166 Q196 196 170 236 Q176 278 130 280 Z',
    crownB: 'M130 280 Q100 250 126 214 Q120 166 168 164 Q196 130 232 156 Q272 156 270 200 Q292 236 262 262 Q256 290 220 286 Z',
    board: 'M660 92 L736 104 L736 214 L660 226 Z',
    shirtM: 'M302 206 Q306 192 330 192 Q354 192 358 206 L364 330 L296 330 Z',
    shirtG: 'M520 292 Q524 280 542 280 Q560 280 564 292 L568 380 L516 380 Z',
    shirtB: 'M66 400 Q70 388 90 388 Q110 388 114 400 L116 462 L64 462 Z',
    bag: 'M174 410 Q174 390 198 390 Q222 390 222 410 L224 448 L172 448 Z'
  };

  add(`<circle class="o" cx="92" cy="66" r="28"/>
<path class="t" d="M92 24 V10 M92 108 V122 M50 66 H36 M134 66 H148 M62 36 L52 26 M122 36 L132 26 M62 96 L52 106 M122 96 L132 106"/>
<path class="o" d="M330 70 Q332 50 354 52 Q364 34 388 40 Q408 34 418 52 Q438 52 438 70 Z"/>
<path class="o" d="M520 46 Q522 30 540 32 Q550 18 568 24 Q584 20 590 34 Q606 34 606 46 Z"/>`);

  add(`<path class="o" fill="${tone(0.3)}" d="M60 260 h14 v130 h-14 Z M196 260 h14 v130 h-14 Z"/>
<path class="o" fill="${tone(0.2)}" d="${D.crownA}"/>
${shade([{ lin: [40, 140, 190, 280], s: [0, 0.45] }], D.crownA)}
<path class="o" fill="${tone(0.24)}" d="${D.crownB}"/>
${shade([{ lin: [150, 160, 290, 290], s: [0, 0.5] }], D.crownB)}
<path class="h" d="M40 196 q10 -10 22 -2 M100 160 q10 -10 22 -2 M150 240 q10 -10 22 -2 M190 196 q10 -10 22 -2 M226 236 q10 -10 22 -2 M60 246 q10 -10 22 -2"/>`);

  add(`<path fill="url(#mesh)" d="M0 262 H${W} V390 H0 Z"/>
<path class="o" fill="${tone(0.5)}" d="M-10 256 H${W + 10} V264 H-10 Z"/>
${[10, 270, 530, 790].map((x) => `<path class="o" fill="${tone(0.5)}" d="M${x - 5} 252 h10 v140 h-10 Z"/>`).join('')}`);

  add(`<path class="o" fill="${tone(0.16)}" d="${D.court}"/>
${shade([{ lin: [0, 390, 0, 430], s: [0.35, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.2] }], D.court)}
<path class="t" stroke="#fff" stroke-width="7" d="M440 ${H + 10} Q500 450 ${W + 10} 436 M0 470 H300"/>`);

  add(shade([{ rad: [752, 524, 40, 7], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.55)}" d="M734 150 h14 v370 h-14 Z"/>
${shade([{ lin: [741, 0, 748, 0], s: [0, 0.6] }], 'M734 150 h14 v370 h-14 Z')}
<path class="o" fill="${tone(0.55)}" d="M720 512 h42 v10 h-42 Z"/>
<path class="o" fill="${tone(0.55)}" d="M736 150 L748 150 L748 170 L736 172 Z"/>
<path class="o" d="${D.board}"/>
${shade([{ lin: [660, 0, 736, 0], s: [0, 0.4] }], D.board)}
<path class="t" d="M680 150 L716 152 L716 196 L680 200 Z"/>
<path class="h" d="M638 228 L644 262 M650 230 L652 266 M662 230 L660 266 M674 228 L668 262 M641 244 L671 244 M644 256 L668 256"/>
<ellipse class="t" stroke-width="4.5" cx="656" cy="224" rx="22" ry="6"/>
<path class="t" d="M676 222 L690 214"/>`);

  add(shade([{ rad: [130, 520, 120, 10], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.45)}" d="M36 372 h12 v142 h-12 Z M204 372 h12 v142 h-12 Z"/>
<path class="o" fill="${tone(0.35)}" d="M20 378 H232 V392 H20 Z M20 400 H232 V414 H20 Z"/>
<path class="o" fill="${tone(0.35)}" d="M14 446 H238 V462 H14 Z"/>
${shade([{ lin: [120, 0, 238, 0], s: [0, 0.4] }], 'M14 446 H238 V462 H14 Z')}`);

  add(`<path class="o" fill="${tone(0.6)}" d="${D.bag}"/>
${shade([{ lin: [200, 0, 226, 0], s: [0, 0.5] }], D.bag)}
<path class="o" fill="${tone(0.6)}" d="M180 418 H216 V438 H180 Z"/>
<path class="t" d="M188 390 Q198 374 208 390"/>`);

  add(limb([[78, 458], [74, 484], [72, 508]], 14, 12));
  add(limb([[102, 458], [106, 484], [108, 508]], 14, 12));
  add(`${shoe(70, 520, -1)}${shoe(110, 520)}
<path class="k" d="M62 438 L118 438 Q122 456 116 466 L64 466 Q58 456 62 438 Z"/>
<path class="o" fill="url(#stV)" d="${D.shirtB}"/>
${shade([{ lin: [90, 0, 116, 0], s: [0, 0.45] }], D.shirtB)}`);
  add(limb([[68, 400], [56, 428], [70, 446]], 13, 11, 'url(#stV)'));
  add(limb([[112, 400], [124, 428], [112, 446]], 13, 11, 'url(#stV)'));
  add(`<ellipse class="o" cx="74" cy="448" rx="6" ry="8" transform="rotate(70 74 448)"/>
<ellipse class="o" cx="108" cy="448" rx="6" ry="8" transform="rotate(-70 108 448)"/>
<rect class="o" x="85" y="374" width="10" height="16"/>
${kidHead(90, 352, 0.85, 'short', 3, -3)}`);

  add(shade([{ rad: [344, 548, 62, 10], s: 0.65 }]));
  add(limb([[316, 326], [312, 430], [312, 530]], 17, 15));
  add(limb([[344, 326], [350, 430], [354, 530]], 17, 15));
  add(`<path class="o" fill="${tone(0.18)}" d="M302 494 h20 v26 h-20 Z M344 494 h20 v26 h-20 Z"/>
${shoe(308, 544, -1)}${shoe(358, 544)}
<path class="k" d="M296 316 L364 316 L368 372 L292 372 Z"/>
<path class="w" d="M330 372 V340"/>
<path class="o" fill="url(#stH)" d="${D.shirtM}"/>
${shade([{ lin: [330, 0, 364, 0], s: [0, 0.45] }], D.shirtM)}
<path class="o" d="M318 194 L330 208 L342 194 Z"/>`);
  add(limb([[302, 210], [282, 260], [290, 306]], 17, 14));
  add(limb([[358, 210], [392, 166], [416, 120]], 17, 14));
  add(`<ellipse class="o" cx="292" cy="312" rx="7" ry="9" transform="rotate(-10 292 312)"/>
<ellipse class="o" cx="420" cy="112" rx="7" ry="9" transform="rotate(30 420 112)"/>
<rect class="o" x="324" y="178" width="12" height="18"/>
${kidHead(330, 148, 1, 'spiky', 2, -2)}`);

  add(`<path class="t" stroke-dasharray="2 12" d="M432 96 Q470 78 506 96"/>
<circle class="o" fill="${tone(0.45)}" cx="534" cy="118" r="24"/>
${shade([{ lin: [520, 0, 558, 0], s: [0, 0.45] }], 'M510 118 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0 Z')}
<path class="t" d="M510 118 H558 M534 94 V142 M516 101 Q530 118 516 135 M552 101 Q538 118 552 135"/>`);

  add(shade([{ rad: [554, 556, 52, 8], s: 0.55 }]));
  add(limb([[530, 376], [516, 420], [526, 466]], 14, 12));
  add(limb([[554, 376], [570, 418], [562, 462]], 14, 12));
  add(`${shoe(520, 478, -1)}${shoe(566, 474)}
<path class="k" d="M516 370 L568 370 L572 404 L512 404 Z"/>
<path class="o" fill="${tone(0.5)}" d="${D.shirtG}"/>
${shade([{ lin: [542, 0, 568, 0], s: [0, 0.45] }], D.shirtG)}
<path class="o" d="M532 282 L542 292 L552 282 Z"/>`);
  add(limb([[524, 294], [508, 252], [508, 210]], 14, 12, tone(0.5)));
  add(limb([[560, 294], [578, 252], [582, 210]], 14, 12, tone(0.5)));
  add(`<ellipse class="o" cx="508" cy="204" rx="7" ry="9"/>
<ellipse class="o" cx="583" cy="204" rx="7" ry="9"/>
<rect class="o" x="537" y="264" width="10" height="18"/>
${girlHead(542, 240)}`);

  function kidHead(cx, cy, s, hair, lx = 0, ly = 0) {
    const rx = 33 * s;
    const ry = 36 * s;
    const P = (dx, dy) => `${cx + dx * s} ${cy + dy * s}`;
    const hairPath = hair === 'spiky'
      ? `M${P(-33, 2)} Q${P(-38, -36)} ${P(0, -38)} Q${P(38, -36)} ${P(33, 2)} Q${P(29, -14)} ${P(23, -16)} L${P(19, -7)} L${P(13, -20)} L${P(7, -9)} L${P(1, -22)} L${P(-5, -9)} L${P(-11, -20)} L${P(-17, -7)} L${P(-21, -16)} Q${P(-27, -12)} ${P(-33, 2)} Z`
      : `M${P(-32, 4)} Q${P(-36, -38)} ${P(2, -38)} Q${P(38, -36)} ${P(33, 2)} Q${P(26, -18)} ${P(4, -20)} Q${P(-10, -14)} ${P(-22, -18)} Q${P(-28, -10)} ${P(-32, 4)} Z`;
    return `<ellipse class="o" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
<path class="k" d="${hairPath}"/>
<ellipse class="k" cx="${cx - 12 * s + lx}" cy="${cy + 3 * s + ly}" rx="3" ry="4"/><ellipse class="k" cx="${cx + 12 * s + lx}" cy="${cy + 3 * s + ly}" rx="3" ry="4"/>
<path class="h" d="M${P(-19, -6)} q${6 * s} -4 ${12 * s} 0 M${P(7, -6)} q${6 * s} -4 ${12 * s} 0 M${P(0, 6)} q-3 7 2 8"/>
<path class="k" d="M${P(-13, 18)} Q${P(0, 24)} ${P(13, 18)} Q${P(10, 32)} ${P(0, 32)} Q${P(-10, 32)} ${P(-13, 18)} Z"/>
<path class="w" d="M${P(-8, 21)} Q${P(0, 24)} ${P(8, 21)}"/>`;
  }

  function girlHead(cx, cy) {
    return `<path class="k" d="M${cx + 22} ${cy - 30} Q${cx + 52} ${cy - 44} ${cx + 64} ${cy - 20} Q${cx + 52} ${cy - 26} ${cx + 30} ${cy - 14} Z"/>
<circle class="o" cx="${cx + 26}" cy="${cy - 28}" r="5"/>
<ellipse class="o" cx="${cx}" cy="${cy}" rx="29" ry="34"/>
<path class="k" d="M${cx - 30} ${cy - 2} Q${cx - 32} ${cy - 36} ${cx} ${cy - 36} Q${cx + 32} ${cy - 36} ${cx + 30} ${cy - 2} Q${cx + 24} ${cy - 16} ${cx + 4} ${cy - 18} Q${cx - 16} ${cy - 16} ${cx - 30} ${cy - 2} Z"/>
<ellipse class="k" cx="${cx - 10}" cy="${cy}" rx="3" ry="4"/><ellipse class="k" cx="${cx + 12}" cy="${cy}" rx="3" ry="4"/>
<path class="h" d="M${cx - 17} ${cy - 8} q5 -3 10 0 M${cx + 7} ${cy - 8} q5 -3 10 0 M${cx + 1} ${cy + 5} q-3 6 2 7"/>
<ellipse class="k" cx="${cx + 1}" cy="${cy + 21}" rx="6" ry="5"/>`;
  }
}
