export default function draw({ add, def, clip, shade, floor, limb, hand, shoe, tone, pat, f, W, H }) {
  def(`<pattern id="rugband" width="40" height="22" patternUnits="userSpaceOnUse"><rect width="40" height="22" fill="#fff"/><rect y="7" width="40" height="9" fill="${tone(0.5)}"/></pattern>`);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    canvas: 'M240 82 H380 V188 H240 Z',
    back: 'M130 384 L130 270 Q130 250 152 250 L438 250 Q460 250 460 270 L460 384 Z',
    seat: 'M144 384 L446 384 L452 412 L138 412 Z',
    front: 'M138 412 H452 V500 H138 Z',
    armL: 'M98 332 Q98 312 122 312 Q146 312 146 332 L146 504 L98 504 Z',
    armR: 'M444 332 Q444 312 468 312 Q492 312 492 332 L492 504 L444 504 Z',
    rug: 'M236 518 L660 518 L728 598 L168 598 Z',
    sweater: 'M212 300 Q216 284 250 284 Q284 284 288 300 L294 404 L206 404 Z',
    tvTop: 'M606 376 L764 376 L772 390 L598 390 Z',
    tvFront: 'M598 390 H772 V408 H598 Z',
    shadeL: 'M30 206 L96 206 L82 144 L44 144 Z',
    dog: 'M462 548 Q470 520 520 520 Q588 520 592 552 Q592 574 548 574 L470 574 Q458 566 462 548 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<rect class="o" fill="${tone(0.3)}" x="226" y="68" width="168" height="134"/>
${shade([{ lin: [300, 0, 394, 0], s: [0, 0.4] }], 'M226 68 H394 V202 H226 Z')}
<path class="o" d="${D.canvas}"/>
<path class="t" d="M240 160 Q280 136 318 156 Q348 140 380 152"/>
<path class="o" d="M268 172 V146 L284 132 L300 146 V172 Z"/>
<path class="k" d="M280 172 v-12 h8 v12 Z"/>
<path class="t" d="M262 148 L284 128 L306 148"/>
<path class="k" d="M342 176 h6 v-22 h-6 Z"/>
<circle class="o" fill="${tone(0.45)}" cx="345" cy="136" r="18"/>
<circle class="o" cx="364" cy="102" r="9"/>
<path class="t" d="M240 176 H380"/>`);

  add(shade([{ rad: [74, 532, 44, 7], s: 0.7 }]));
  add(`<path class="k" d="M60 206 h5 v322 h-5 Z"/>
<ellipse class="k" cx="62" cy="528" rx="26" ry="6"/>
<path class="o" fill="${tone(0.12)}" d="${D.shadeL}"/>
${shade([{ lin: [56, 0, 96, 0], s: [0, 0.4] }], D.shadeL)}
<path class="t" d="M30 206 H96"/>
<path class="h" d="M40 218 l-10 14 M54 222 l-3 16 M72 222 l3 16 M86 218 l10 14 M24 196 l-14 4 M102 196 l14 4 M28 168 l-14 -4 M98 168 l14 -4"/>`);

  add(`<path class="o" fill="${pat('rugband')}" d="${D.rug}"/>
${shade([{ lin: [430, 0, 728, 0], s: [0, 0.3] }], D.rug)}
<path class="h" d="${Array.from({ length: 22 }, (_, i) => `M${f(240 + i * 19.6)} 518 v-7`).join(' ')}"/>`);
  add(shade([{ rad: [312, 516, 226, 14], s: 0.75 }]));
  add(`<path class="o" fill="${tone(0.42)}" d="${D.back}"/>
${shade([{ lin: [300, 0, 460, 0], s: [0, 0.4] }], D.back)}
<path class="h" d="M232 262 V384 M336 262 V384"/>
<path class="o" fill="${tone(0.3)}" d="${D.seat}"/>
${shade([{ lin: [300, 0, 452, 0], s: [0, 0.35] }], D.seat)}
<path class="o" fill="${tone(0.42)}" d="${D.front}"/>
${shade([{ lin: [300, 0, 452, 0], s: [0, 0.45] }], D.front)}
<path class="h" d="M240 418 V496 M346 418 V496"/>
<path class="o" fill="${tone(0.42)}" d="${D.armL}"/>
${shade([{ lin: [98, 0, 146, 0], s: [0, 0.3] }], D.armL)}
<path class="o" fill="${tone(0.42)}" d="${D.armR}"/>
${shade([{ lin: [444, 0, 492, 0], s: [0.2, 0.6] }], D.armR)}
<path class="k" d="M106 504 h10 v12 h-10 Z M474 504 h10 v12 h-10 Z"/>`);

  add(`<g transform="rotate(-8 418 352)"><rect class="o" fill="${pat('check')}" x="390" y="318" width="58" height="62" rx="12"/></g>`);
  add(shade([{ lin: [400, 0, 450, 0], s: [0, 0.35] }], 'M392 324 L444 316 L452 378 L398 386 Z'));
  add(`<path class="o" d="M312 396 L384 386 L398 404 L326 414 Z"/>
<path class="k" d="M322 398 L350 394 L353 399 L325 403 Z"/>
<path class="h" d="M330 406 L384 399 M356 393 L380 390 M358 398 L384 395"/>`);

  add(`<path class="o" fill="${tone(0.5)}" d="${D.sweater}"/>
${shade([{ lin: [250, 0, 294, 0], s: [0, 0.45] }], D.sweater)}
<path class="o" d="M236 286 L250 304 L264 286 Z"/>
<rect class="o" x="243" y="260" width="14" height="26"/>
<path class="o" fill="${tone(0.78)}" d="M202 398 L298 398 L302 434 Q302 446 288 446 L264 446 Q252 446 250 438 Q248 446 236 446 L212 446 Q198 446 198 434 Z"/>`);
  add(limb([[226, 438], [224, 528]], 17, 15, tone(0.78)));
  add(limb([[274, 438], [276, 528]], 17, 15, tone(0.78)));
  add(shade([{ rad: [258, 544, 56, 8], s: 0.7 }]));
  add(`${shoe(220, 540, -1)}${shoe(280, 540)}`);

  add(`<ellipse class="o" cx="220" cy="234" rx="7" ry="11"/>
<ellipse class="o" cx="250" cy="228" rx="30" ry="35"/>
<path class="o" fill="${tone(0.18)}" d="M220 230 Q217 210 232 200 Q227 216 228 232 Z M281 226 Q283 210 270 200 Q275 214 273 228 Z"/>
<path class="h" d="M238 196 q4 -6 10 -4 M252 194 q4 -5 10 -2"/>
<circle class="o" cx="247" cy="228" r="9.5"/><circle class="o" cx="271" cy="228" r="9.5"/>
<path class="t" d="M256.5 227 h5 M237.5 226 l-16 -1"/>
<circle class="k" cx="252" cy="229" r="2.6"/><circle class="k" cx="276" cy="229" r="2.6"/>
<path class="h" d="M239 214 q7 -4 14 0 M264 214 q7 -4 14 0"/>
<path class="h" d="M264 234 q9 7 0 10"/>
<path class="o" d="M248 250 Q261 243 274 250 Q268 257 261 253 Q254 257 248 250 Z"/>
<path class="t" d="M255 259 q6 3 12 0"/>`);

  add(limb([[214, 298], [200, 352], [222, 410]], 18, 15, tone(0.5)));
  add(hand(226, 414, -60));
  add(limb([[286, 298], [302, 352], [292, 398]], 18, 15, tone(0.5)));
  add(`<path class="o" fill="${tone(0.22)}" d="M276 376 H304 V404 Q304 410 298 410 H282 Q276 410 276 404 Z"/>
<path class="t" d="M304 382 q10 0 10 9 q0 9 -10 9"/>
`);
  add(hand(290, 404, 80));

  add(shade([{ rad: [700, 532, 104, 10], s: 0.7 }]));
  add(`<path class="o" fill="${tone(0.22)}" d="${D.tvTop}"/>
<path class="o" fill="${tone(0.22)}" d="${D.tvFront}"/>
${shade([{ lin: [680, 0, 772, 0], s: [0, 0.45] }], D.tvFront)}
<path class="o" fill="${tone(0.22)}" d="M604 408 h14 v122 h-14 Z M752 408 h14 v122 h-14 Z"/>
${shade([{ lin: [752, 0, 766, 0], s: [0, 0.5] }], 'M752 408 h14 v122 h-14 Z')}
<path class="k" d="M666 380 L700 380 L696 370 L670 370 Z M680 370 h8 v-14 h-8 Z"/>
<path class="k" d="M612 260 L756 246 L756 364 L612 356 Z"/>
<path class="o" fill="${tone(0.55)}" d="M620 268 L748 256 L748 354 L620 348 Z"/>
<path class="w" d="M626 330 Q660 300 690 322 Q716 304 744 316 M716 286 a10 10 0 1 0 0.1 0 M640 290 q5 -5 10 0 q5 -5 10 0" stroke-width="3"/>`);

  add('<g transform="translate(60 0)">');
  add(shade([{ rad: [536, 576, 96, 10], s: 0.7 }]));
  add(limb([[588, 552], [612, 540], [626, 520]], 10, 6));
  add(`<path class="o" d="${D.dog}"/>
${shade([{ lin: [520, 0, 592, 0], s: [0, 0.4] }], D.dog)}
<path class="k" d="M528 524 Q548 520 556 534 Q550 548 534 546 Q522 538 528 524 Z"/>
<path class="h" d="M560 574 q4 -16 22 -18"/>`);
  add(limb([[476, 566], [432, 572]], 14, 13));
  add(limb([[488, 572], [446, 580]], 14, 13));
  add(`<ellipse class="o" cx="452" cy="540" rx="28" ry="23"/>
<ellipse class="o" cx="420" cy="552" rx="20" ry="13"/>
<ellipse class="k" cx="403" cy="548" rx="6" ry="5"/>
<path class="h" d="M418 562 q6 3 12 -1"/>
<path class="k" d="M458 518 Q482 518 480 548 Q476 562 466 556 Q456 538 458 518 Z"/>
<path class="t" d="M432 534 q6 5 12 0"/>
<path class="o" fill="${tone(0.8)}" d="M480 524 L490 522 L496 562 L486 564 Z"/>
<circle class="o" cx="492" cy="570" r="5"/>
`);
  add('</g>');
  add(`<path class="t" d="M522 500 h10 l-10 10 h10 M540 474 h13 l-13 13 h13 M560 444 h16 l-16 16 h16"/>`);
}
