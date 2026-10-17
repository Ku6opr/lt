export default function draw({ add, shade, floor, limb, hand, shoe, scallops, tone, pat, f, W, H }) {
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M63 73 H191 V231 H63 Z',
    cloth: `M120 364 L402 364 L408 520 ${scallops(114, 408, 520)} L114 520 Z`,
    cake: 'M197 300 L197 350 Q261 366 325 350 L325 300 Z',
    shirt: 'M436 352 Q440 336 465 336 Q490 336 494 352 L498 432 L432 432 Z',
    skirt: 'M622 352 L718 352 L738 542 L602 542 Z',
    cardigan: 'M630 238 Q636 212 670 212 Q704 212 710 238 L718 362 L622 362 Z',
    box: 'M522 318 H608 V390 H522 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(shade([{ rad: [300, 524, 182, 16], s: 0.7 }]));
  add(shade([{ rad: [478, 548, 64, 10], s: 0.7 }]));
  add(shade([{ rad: [684, 566, 76, 11], s: 0.7 }]));

  const curve = (t) => {
    const p0 = [262, 30];
    const p1 = [530, 92];
    const p2 = [800, 26];
    const u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
  };
  const fills = ['#333', pat('stH'), '#fff', tone(0.22)];
  const flags = [];
  for (let i = 0; i < 10; i++) {
    const a = curve(0.05 + i * 0.095);
    const b = curve(0.05 + i * 0.095 + 0.07);
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    const tip = [mx + (b[1] - a[1]) * -0.15, my + 30];
    flags.push(`<path class="o" fill="${fills[i % 4]}" d="M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])} L${f(tip[0])} ${f(tip[1])} Z"/>`);
  }
  add(`<path class="t" d="M262 30 Q530 92 800 26"/>${flags.join('')}`);
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<g transform="translate(-6 -20)"><path class="k" d="M18 42 H252 V48 H18 Z"/><circle class="k" cx="18" cy="45" r="6"/><circle class="k" cx="252" cy="45" r="6"/>
<rect class="o" x="52" y="62" width="150" height="180"/>
<rect class="o" x="63" y="73" width="128" height="158"/>
${shade([{ lin: [63, 73, 191, 231], s: [0.24, 0.04] }], D.pane)}
<path class="t" d="M127 73 V231 M63 152 H191"/>
<path class="k" d="M93 160 L108 184 L101 184 L115 206 L106 206 L120 224 L66 224 L80 206 L71 206 L85 184 L78 184 Z"/>
<path class="k" d="M90 222 h6 v9 h-6 Z"/>
<path class="w" d="M87 194 l6 4 l6 -4 M80 215 l13 5 l13 -5"/>
<path class="t" d="M146 100 q7 -9 14 0 q7 -9 14 0 M156 124 q5 -6 10 0 q5 -6 10 0"/>
<path class="t" d="M150 184 q10 -12 22 -4 q8 -10 16 2"/>
<rect class="o" x="40" y="242" width="174" height="11"/>
<path class="o" fill="${tone(0.14)}" d="M26 48 C48 110 22 180 54 270 L30 274 C10 190 34 110 22 48 Z"/>
<path class="o" fill="${tone(0.14)}" d="M232 48 C210 110 236 180 204 270 L228 274 C248 190 224 110 236 48 Z"/></g>`);

  add(`<path class="o" d="M130 350 L392 350 L402 364 L120 364 Z"/>
<path class="o" d="${D.cloth}"/>
${shade([{ lin: [290, 0, 408, 0], s: [0, 0.5] }], D.cloth)}
<path class="o" fill="${pat('zig')}" d="M115 486 L407 486 L408 506 L114 506 Z"/>
<path class="h" d="M160 380 Q155 430 162 480 M250 380 Q244 430 250 480 M330 380 Q336 430 330 480"/>
${Array.from({ length: 24 }, (_, i) => `<circle class="h" cx="${120 + i * 12}" cy="522" r="2"/>`).join('')}`);

  const candles = [227, 244, 261, 278, 295, 312, 329];
  add(`<g transform="translate(20 0)"><ellipse class="o" cx="261" cy="356" rx="86" ry="8"/>
<path class="o" d="${D.cake}"/>
${shade([{ lin: [262, 0, 325, 0], s: [0, 0.5] }], D.cake)}
<path class="h" d="M197 334 Q261 350 325 334"/>
${[214, 236, 258, 280, 302].map((x) => `<circle class="k" cx="${x}" cy="${344 + (x === 258 ? 2 : x === 236 || x === 280 ? 1 : 0)}" r="3"/>`).join('')}
<path class="o" d="M197 300 Q197 288 261 288 Q325 288 325 300 L325 312 Q318 326 310 312 Q302 328 292 312 Q282 326 272 312 Q262 330 252 312 Q242 326 232 312 Q222 328 212 312 Q204 326 197 312 Z"/></g>
${candles.map((x, i) => `<rect class="o" fill="${pat('stD')}" x="${x}" y="${i % 2 ? 258 : 264}" width="7" height="${i % 2 ? 34 : 28}"/>`).join('')}
${candles.map((x, i) => `<path class="o" d="M${x + 3.5} ${i % 2 ? 254 : 260} q-6 -9 0 -18 q6 9 0 18 Z"/><path class="k" d="M${x + 3.5} ${i % 2 ? 251 : 257} q-2 -4 0 -7 q2 3 0 7 Z"/>`).join('')}`);

  add(`<path class="k" d="M424 296 h7 v146 h-7 Z M499 296 h7 v146 h-7 Z"/>
<rect class="o" x="418" y="288" width="94" height="17" rx="3"/>
<path class="k" d="M428 446 h6 v80 h-6 Z M496 446 h6 v80 h-6 Z"/>
<path class="o" d="M414 430 L516 430 L522 446 L408 446 Z"/>
<path class="k" d="M410 446 h9 v100 h-9 Z M511 446 h9 v100 h-9 Z"/>`);

  add(`<path class="o" fill="${pat('stH')}" d="${D.shirt}"/>
${shade([{ lin: [462, 0, 498, 0], s: [0, 0.45] }], D.shirt)}
<path class="o" d="M452 338 L465 351 L478 338 Z"/>
<path class="o" fill="${tone(0.75)}" d="M428 426 L502 426 L505 456 L425 456 Z"/>`);
  add(limb([[447, 454], [446, 512]], 15, 13));
  add(limb([[483, 454], [484, 512]], 15, 13));
  add(`<path class="o" fill="${pat('stH')}" d="M438 496 h16 v20 h-16 Z M476 496 h16 v20 h-16 Z"/>
${shoe(443, 527, -1)}${shoe(487, 527)}`);
  add(limb([[438, 350], [412, 322], [416, 282]], 17, 14, pat('stH')));
  add(limb([[492, 350], [508, 374], [524, 362]], 17, 14, pat('stH')));
  add(`${hand(416, 278, -10)}
<rect class="o" x="459" y="322" width="12" height="16"/>
<ellipse class="o" cx="465" cy="294" rx="33" ry="36"/>
<path class="k" d="M432 296 Q427 258 465 256 Q503 258 498 296 Q494 280 488 278 L484 287 L478 274 L472 285 L466 272 L460 285 L454 274 L448 287 L444 278 Q438 282 432 296 Z"/>
<path class="o" fill="${pat('stD')}" d="M442 266 L488 266 L468 196 Z"/>
<circle class="k" cx="468" cy="194" r="8"/>
<path class="h" d="M466 184 l-3 -8 M470 184 l3 -8 M460 191 l-8 -2 M476 191 l8 -2"/>
<ellipse class="k" cx="453" cy="297" rx="3" ry="4"/><ellipse class="k" cx="477" cy="297" rx="3" ry="4"/>
<path class="h" d="M446 288 q6 -4 12 0 M472 288 q6 -4 12 0 M465 300 q-3 7 2 8"/>
<path class="k" d="M450 312 Q465 318 480 312 Q477 329 465 329 Q453 329 450 312 Z"/>
<path class="w" d="M455 315 Q465 318 475 315"/>
<path class="h" d="M438 308 q3 3 6 0 M486 308 q3 3 6 0"/>`);

  add(`<path class="o" fill="${tone(0.22)}" d="${D.skirt}"/>
${shade([{ lin: [664, 0, 738, 0], s: [0, 0.5] }, { lin: [0, 352, 0, 374], s: [0.35, 0] }], D.skirt)}
<path class="t" d="M652 542 V552 M690 542 V552"/>
${shoe(648, 562, -1)}${shoe(694, 562)}
<path class="o" fill="${tone(0.42)}" d="${D.cardigan}"/>
${shade([{ lin: [680, 0, 718, 0], s: [0, 0.45] }], D.cardigan)}
<path class="t" d="M670 222 V362"/>
<circle class="k" cx="664" cy="276" r="3"/><circle class="k" cx="664" cy="306" r="3"/><circle class="k" cx="664" cy="336" r="3"/>
<rect class="o" x="664" y="192" width="12" height="22"/>
<path class="o" fill="${tone(0.9)}" d="M652 214 L662 216 L658 284 L648 283 Z"/>
<path class="o" fill="${tone(0.9)}" d="M678 216 L688 214 L692 283 L682 284 Z"/>
<path class="o" fill="${tone(0.9)}" d="M646 198 Q670 208 694 198 L696 216 Q670 226 644 216 Z"/>
<path class="h" d="M649 285 l-2 7 M653 285 v8 M657 285 l2 7 M683 285 l-2 7 M687 285 v8 M691 285 l2 7"/>
<ellipse class="o" cx="670" cy="160" rx="29" ry="35"/>
<path class="o" d="M640 166 Q636 126 670 124 Q704 126 700 166 Q694 142 670 140 Q646 142 640 166 Z"/>
<path class="h" d="M670 126 Q656 132 646 154 M670 126 Q684 132 694 154 M662 128 Q650 140 643 162 M678 128 Q690 140 697 162"/>
<circle class="o" cx="670" cy="114" r="15"/>
<path class="h" d="M670 114 m-8 0 a8 8 0 1 1 8 8 a4 4 0 1 1 -4 -4"/>
<circle class="o" cx="658" cy="164" r="9"/><circle class="o" cx="682" cy="164" r="9"/>
<path class="t" d="M667 164 h6 M649 162 l-8 -2 M691 162 l8 -2"/>
<circle class="k" cx="658" cy="165" r="2.4"/><circle class="k" cx="682" cy="165" r="2.4"/>
<path class="h" d="M670 168 q-4 10 2 11"/>
<path class="t" d="M661 184 q9 5 18 0"/>`);

  add(limb([[704, 240], [718, 300], [716, 352]], 19, 15));
  add(`<rect class="o" fill="${tone(0.38)}" x="522" y="318" width="86" height="72" rx="2"/>
${shade([{ lin: [566, 0, 608, 0], s: [0, 0.4] }], D.box)}
<path class="k" d="M560 318 h9 v72 h-9 Z M522 350 h86 v9 h-86 Z"/>
<path class="k" d="M564 318 Q542 292 532 308 Q540 324 564 318 Q588 292 598 308 Q590 324 564 318 Z"/>
<path class="w" d="M545 306 q7 2 12 9 M583 306 q-7 2 -12 9"/>`);
  add(limb([[638, 240], [620, 318], [596, 392]], 19, 15));
  add(`${hand(592, 394, 75)}${hand(716, 358, 5)}${hand(526, 360, 70)}`);

  add(`<ellipse class="o" fill="${tone(0.5)}" cx="192" cy="566" rx="142" ry="25"/>
<ellipse class="o" cx="192" cy="566" rx="116" ry="17"/>
<ellipse class="o" fill="${tone(0.22)}" cx="192" cy="566" rx="82" ry="9"/>
<path class="h" d="M50 558 h-10 M50 564 h-12 M50 570 h-10 M334 558 h10 M334 564 h12 M334 570 h10"/>
${shade([{ rad: [212, 576, 74, 9], s: 0.55 }])}`);

  add(`<g transform="translate(-105 -79) scale(1.15)"><path class="o" d="M196 556 Q190 516 244 510 Q304 508 308 540 Q310 558 272 558 Z"/>
<path class="t" d="M240 514 q6 18 0 40 M258 512 q7 20 0 44 M276 514 q7 18 2 40 M292 520 q5 14 2 30" stroke-width="4.5"/>
<path class="o" d="M196 556 Q198 528 220 527 Q242 528 240 556 Z"/>
<path class="o" d="M199 536 l-6 -20 l17 11 Z M222 527 l8 -19 l7 21 Z"/>
<path class="k" d="M201 524 l2 -6 l3 4 Z M227 523 l3 -7 l3 7 Z"/>
<path class="t" d="M204 540 q5 4 10 0 M222 540 q5 4 10 0"/>
<path class="h" d="M216 548 l2 2 l2 -2 M200 548 l-10 -1 M200 552 l-10 2 M236 548 l10 -1"/>
<path class="o" d="M304 538 Q326 552 298 560 Q270 566 238 560 Q276 556 300 548 Z"/>
<path class="h" d="M282 556 v6 M266 558 v5"/>
</g>
<path class="t" d="M98 508 h10 l-10 10 h10 M76 482 h12 l-12 12 h12 M50 452 h14 l-14 14 h14"/>`);
}
