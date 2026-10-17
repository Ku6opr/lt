export default function draw({ add, shade, floor, limb, hand, tone, pat, f, W, H }) {
  const star = (x, y, r) => `<path class="o" d="M${x} ${y - r} L${f(x + r * 0.28)} ${f(y - r * 0.28)} L${x + r} ${y} L${f(x + r * 0.28)} ${f(y + r * 0.28)} L${x} ${y + r} L${f(x - r * 0.28)} ${f(y + r * 0.28)} L${x - r} ${y} L${f(x - r * 0.28)} ${f(y - r * 0.28)} Z"/>`;
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M37 71 H165 V229 H37 Z',
    head: 'M300 236 Q300 222 311 222 Q322 222 322 236 V528 H300 Z',
    foot: 'M744 340 Q744 328 754 328 Q764 328 764 340 V528 H744 Z',
    rail: 'M322 432 H744 V474 H322 Z',
    blanket: 'M338 392 Q420 388 476 382 Q514 346 552 350 Q588 356 600 382 Q680 388 746 384 L750 472 Q700 480 650 474 Q600 482 548 474 Q496 482 444 474 Q392 482 336 474 Z',
    pajama: 'M354 352 Q358 340 380 340 Q402 340 406 352 L410 398 L350 398 Z',
    rug: 'M300 540 L712 540 L738 588 L274 588 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<path class="k" d="M8 42 H196 V48 H8 Z"/><circle class="k" cx="8" cy="45" r="6"/><circle class="k" cx="196" cy="45" r="6"/>
<rect class="o" x="26" y="60" width="150" height="180"/>
<rect class="o" fill="${tone(0.88)}" x="37" y="71" width="128" height="158"/>
<path class="o" d="M64 88 a24 24 0 1 0 30 32 a19 19 0 1 1 -30 -32 Z"/>
${star(136, 96, 9)}${star(150, 136, 6)}${star(118, 124, 5)}${star(62, 186, 8)}${star(136, 196, 9)}${star(146, 172, 5)}
<rect class="o" x="98" y="71" width="7" height="158"/>
<rect class="o" x="37" y="147" width="128" height="7"/>
<rect class="o" x="14" y="240" width="174" height="11"/>
<path class="o" fill="${tone(0.14)}" d="M16 48 C36 110 12 180 40 268 L18 272 C0 190 22 110 10 48 Z"/>
<path class="o" fill="${tone(0.14)}" d="M186 48 C166 110 190 180 162 268 L184 272 C202 190 180 110 192 48 Z"/>`);

  add(`<path class="t" d="M550 70 L494 104 M550 70 L606 104"/>
<circle class="k" cx="550" cy="70" r="4"/>
<rect class="o" fill="${tone(0.35)}" x="478" y="98" width="144" height="104"/>
<rect class="o" x="490" y="110" width="120" height="80"/>
<path class="o" fill="${tone(0.4)}" d="M492 188 L530 134 L556 166 L576 146 L608 188 Z"/>
<path class="w" d="M522 146 l8 -12 l8 12"/>
<circle class="o" cx="588" cy="128" r="10"/>`);
  add(shade([{ lin: [550, 0, 622, 0], s: [0, 0.3] }], 'M478 98 H622 V202 H478 Z'));

  add(shade([{ rad: [540, 532, 262, 15], s: 0.7 }]));
  add(shade([{ rad: [258, 532, 40, 7], s: 0.7 }]));

  add(`<path class="k" d="M237 236 h6 v290 h-6 Z"/>
<ellipse class="k" cx="240" cy="528" rx="24" ry="6"/>
<circle class="o" cx="240" cy="242" r="9"/>
<path class="o" fill="${tone(0.3)}" d="M206 238 L274 238 L262 182 L218 182 Z"/>
${shade([{ lin: [240, 0, 274, 0], s: [0, 0.4] }], 'M206 238 L274 238 L262 182 L218 182 Z')}
<path class="t" d="M220 258 l-14 18 M240 262 v22 M260 258 l14 18 M200 236 l-14 3 M280 236 l12 3 M208 196 l-16 -8 M272 196 l16 -8"/>`);

  add(`<path class="o" fill="${tone(0.35)}" d="${D.head}"/>
${shade([{ lin: [300, 0, 322, 0], s: [0, 0.4] }], D.head)}
<path class="o" fill="${tone(0.35)}" d="${D.foot}"/>
${shade([{ lin: [744, 0, 764, 0], s: [0, 0.45] }], D.foot)}
<path class="o" d="M322 396 H744 V436 H322 Z"/>
<path class="o" fill="${tone(0.35)}" d="${D.rail}"/>
${shade([{ lin: [500, 0, 744, 0], s: [0, 0.4] }], D.rail)}`);

  add(`<path class="o" d="M326 262 Q324 254 334 255 L422 263 Q432 265 430 274 L428 344 Q428 354 418 353 L332 348 Q324 348 325 340 Z"/>
<path class="h" d="M336 266 q4 38 0 74 M418 272 q-4 36 0 70"/>
<path class="o" d="M326 352 Q322 344 333 344 L440 348 Q450 350 448 360 L446 398 L326 398 Z"/>
<path class="h" d="M336 356 q-2 20 2 38 M436 358 q2 18 0 36"/>`);

  add('<g transform="translate(380 398) scale(1.12) translate(-380 -398)">');
  add(`<rect class="o" x="374" y="326" width="12" height="18"/>
<path class="o" fill="${tone(0.25)}" d="${D.pajama}"/>`);
  add(`<ellipse class="o" fill="${tone(0.55)}" cx="342" cy="286" rx="11" ry="19" transform="rotate(-35 342 286)"/>
<ellipse class="o" fill="${tone(0.55)}" cx="418" cy="286" rx="11" ry="19" transform="rotate(35 418 286)"/>
<path class="o" fill="${tone(0.55)}" d="M350 306 Q346 264 380 264 Q414 264 410 306 L413 338 Q398 342 393 330 L367 330 Q362 342 347 338 Z"/>
<ellipse class="o" cx="380" cy="302" rx="27" ry="31"/>
<path class="o" fill="${tone(0.55)}" d="M353 300 Q351 270 380 270 Q409 270 407 300 Q404 290 397 287 L393 294 L387 285 L381 294 L375 285 L369 294 L364 287 Q356 290 353 300 Z"/>
<path class="k" d="M346 276 l10 4 l-10 6 Z M362 276 l-8 4 l8 6 Z M414 276 l-10 4 l10 6 Z M398 276 l8 4 l-8 6 Z"/>
<ellipse class="k" cx="369" cy="310" rx="3" ry="3.5"/><ellipse class="k" cx="391" cy="310" rx="3" ry="3.5"/>
<path class="h" d="M363 302 q6 -3 12 0 M385 302 q6 -3 12 0 M380 313 q-3 6 2 7"/>
<path class="t" d="M373 324 q7 4 14 0"/>
<path class="h" d="M358 318 q3 3 6 0 M396 318 q3 3 6 0"/>`);

  add(`<path class="k" d="M334 348 L380 356 L426 348 L428 392 L380 398 L332 392 Z"/>
<path class="o" d="M338 350 L380 359 L380 393 L336 387 Z"/>
<path class="o" d="M380 359 L422 350 L424 387 L380 393 Z"/>
<path class="h" d="M344 360 l28 5 M344 368 l28 5 M344 376 l28 5 M388 365 l28 -5 M388 373 l28 -5 M388 381 l28 -5"/>`);
  add(limb([[356, 350], [342, 362], [340, 372]], 15, 13, tone(0.25)));
  add(limb([[404, 350], [418, 362], [420, 372]], 15, 13, tone(0.25)));
  add(`${hand(338, 374, 10)}${hand(422, 374, -10)}`);
  add('</g>');

  add(`<path class="o" fill="${pat('check')}" d="${D.blanket}"/>
${shade([{ lin: [520, 0, 750, 0], s: [0, 0.45] }, { lin: [0, 430, 0, 476], s: [0, 0.25] }], D.blanket)}
<path class="o" d="M336 392 Q342 384 350 386 L418 384 Q428 384 426 394 Q380 400 336 400 Z"/>`);

  add(`<g transform="translate(410 -176)"><path class="o" d="M196 556 Q190 516 244 510 Q304 508 308 540 Q310 558 272 558 Z"/>
<path class="t" d="M240 514 q6 18 0 40 M258 512 q7 20 0 44 M276 514 q7 18 2 40 M292 520 q5 14 2 30" stroke-width="4.5"/>
<path class="o" d="M196 556 Q198 528 220 527 Q242 528 240 556 Z"/>
<path class="o" d="M199 536 l-6 -20 l17 11 Z M222 527 l8 -19 l7 21 Z"/>
<path class="k" d="M201 524 l2 -6 l3 4 Z M227 523 l3 -7 l3 7 Z"/>
<path class="t" d="M204 540 q5 4 10 0 M222 540 q5 4 10 0"/>
<path class="h" d="M216 548 l2 2 l2 -2 M200 548 l-10 -1 M200 552 l-10 2 M236 548 l10 -1"/>
<path class="o" d="M304 538 Q326 552 298 560 Q270 566 238 560 Q276 556 300 548 Z"/>
<path class="h" d="M282 556 v6 M266 558 v5"/>
</g>
<path class="t" d="M598 326 h10 l-10 10 h10 M580 300 h12 l-12 12 h12 M560 270 h14 l-14 14 h14"/>`);

  add(`<path class="o" fill="${tone(0.42)}" d="${D.rug}"/>
<path class="o" d="M314 548 L700 548 L718 580 L294 580 Z"/>
<path class="o" fill="${pat('diam')}" d="M334 554 L682 554 L694 574 L320 574 Z"/>
<path class="h" d="M290 548 l-12 0 M286 558 l-14 0 M282 568 l-14 0 M278 578 l-14 0 M722 548 l12 0 M726 558 l14 0 M730 568 l14 0 M734 578 l14 0"/>`);
}
