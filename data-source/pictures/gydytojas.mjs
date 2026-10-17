export default function draw({ add, shade, floor, limb, hand, shoe, tone, pat, W, H }) {
  const eyes = (x, y, dx = 11) => `<ellipse class="k" cx="${x - dx}" cy="${y}" rx="3" ry="4"/><ellipse class="k" cx="${x + dx}" cy="${y}" rx="3" ry="4"/>`;
  const nose = (x, y) => `<path class="h" d="M${x} ${y} q-3 7 2 8"/>`;
  const flake = (x, y, r = 6) => `<path class="h" d="M${x - r} ${y} H${x + r} M${x - r * 0.5} ${y - r * 0.87} L${x + r * 0.5} ${y + r * 0.87} M${x - r * 0.5} ${y + r * 0.87} L${x + r * 0.5} ${y - r * 0.87}"/>`;

  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M51 61 H199 V229 H51 Z',
    desk: 'M24 380 H296 V396 H24 Z',
    coat: 'M384 238 Q388 212 422 212 Q456 212 460 238 L470 472 L374 472 Z',
    cab: 'M690 96 H792 V548 H690 Z',
    sweater: 'M600 352 Q604 336 630 336 Q656 336 660 352 L664 432 L596 432 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [160, 552, 150, 12], s: 0.7 }]));
  add(shade([{ rad: [384, 562, 74, 11], s: 0.7 }]));
  add(shade([{ rad: [592, 552, 70, 10], s: 0.7 }]));
  add(shade([{ rad: [748, 554, 64, 9], s: 0.7 }]));

  add(`<rect class="o" x="40" y="50" width="170" height="190"/>
<rect class="o" x="51" y="61" width="148" height="168"/>
${shade([{ lin: [51, 61, 199, 229], s: [0.24, 0.04] }], D.pane)}
<path class="t" d="M125 61 V229 M51 145 H199"/>
<path class="o" d="M51 214 Q88 204 125 212 Q162 204 199 210 V229 H51 Z"/>
${flake(74, 86)}${flake(104, 116, 5)}${flake(160, 82, 5)}${flake(182, 120)}${flake(80, 170, 5)}${flake(148, 160)}${flake(108, 192, 5)}${flake(176, 186, 5)}
<rect class="o" x="30" y="240" width="190" height="11"/>`);

  add(`<path class="o" fill="${tone(0.18)}" d="${D.cab}"/>
${shade([{ lin: [730, 0, 792, 0], s: [0, 0.5] }], D.cab)}
<rect class="o" x="700" y="108" width="82" height="250"/>
${shade([{ lin: [700, 108, 782, 358], s: [0.18, 0.04] }], 'M700 108 H782 V358 H700 Z')}
<path class="t" d="M741 108 V358"/>
<rect class="o" fill="${tone(0.32)}" x="700" y="186" width="82" height="7"/><rect class="o" fill="${tone(0.32)}" x="700" y="270" width="82" height="7"/>
<rect class="o" fill="${tone(0.4)}" x="706" y="152" width="14" height="34" rx="3"/><rect class="o" x="709" y="146" width="8" height="7"/>
<rect class="o" fill="${tone(0.7)}" x="724" y="164" width="12" height="22" rx="3"/><rect class="o" x="726" y="158" width="8" height="7"/>
<rect class="o" x="748" y="160" width="28" height="26"/><path class="k" d="M759 165 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 v-6 h6 Z"/>
<rect class="o" x="706" y="242" width="28" height="28"/><path class="k" d="M717 248 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 v-6 h6 Z"/>
<rect class="o" fill="${tone(0.4)}" x="748" y="236" width="12" height="34" rx="3"/><rect class="o" x="750" y="230" width="8" height="7"/>
<rect class="o" fill="${tone(0.7)}" x="764" y="248" width="12" height="22" rx="3"/><rect class="o" x="766" y="242" width="8" height="7"/>
<rect class="o" fill="${tone(0.7)}" x="706" y="324" width="12" height="34" rx="3"/><rect class="o" x="708" y="318" width="8" height="7"/>
<rect class="o" x="722" y="336" width="14" height="22" rx="3"/><rect class="o" x="724" y="330" width="10" height="7"/>
<rect class="o" x="748" y="330" width="28" height="28"/><path class="k" d="M759 336 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 v-6 h6 Z"/>
<rect class="o" x="700" y="372" width="82" height="160"/>
<path class="t" d="M741 372 V532"/>
<rect class="k" x="732" y="440" width="5" height="22" rx="2"/><rect class="k" x="745" y="440" width="5" height="22" rx="2"/>
<path class="k" d="M694 548 h10 v6 h-10 Z M778 548 h10 v6 h-10 Z"/>`);

  add(`<path class="o" fill="${tone(0.18)}" d="M44 340 H276 L296 380 H24 Z"/>
<path class="o" fill="${tone(0.32)}" d="${D.desk}"/>
${shade([{ lin: [160, 0, 296, 0], s: [0, 0.5] }], D.desk)}
<path class="k" d="M30 396 h9 v150 h-9 Z M281 396 h9 v150 h-9 Z"/>
<ellipse class="o" fill="${tone(0.6)}" cx="78" cy="352" rx="26" ry="7"/>
<path class="t" d="M78 350 L92 290 L128 270" stroke-width="5"/>
<circle class="k" cx="92" cy="290" r="4"/>
<path class="o" fill="${tone(0.6)}" d="M104 302 Q106 266 132 264 Q158 266 160 302 Z"/>
${shade([{ lin: [132, 0, 160, 0], s: [0, 0.5] }], 'M104 302 Q106 266 132 264 Q158 266 160 302 Z')}
<path class="h" d="M118 310 l-6 14 M132 312 v16 M146 310 l6 14"/>
<path class="o" d="M156 356 L206 350 L214 368 L160 374 Z"/>
${[[166, 358], [180, 356], [194, 354], [169, 367], [183, 365], [197, 363]].map(([x, y]) => `<ellipse class="o" fill="${tone(0.35)}" cx="${x + 3}" cy="${y}" rx="5" ry="3"/>`).join('')}
<rect class="o" fill="${tone(0.42)}" x="230" y="318" width="26" height="46" rx="4"/>
<rect class="o" x="235" y="306" width="16" height="13" rx="2"/>
<rect class="o" x="234" y="332" width="18" height="16"/>
${shade([{ lin: [243, 0, 256, 0], s: [0, 0.5] }], 'M230 318 H256 V364 H230 Z')}`);

  add('<g transform="translate(-40 0)">');
  add(`<rect class="k" x="584" y="296" width="7" height="150"/><rect class="k" x="669" y="296" width="7" height="150"/>
<rect class="o" fill="${tone(0.3)}" x="578" y="288" width="104" height="17" rx="3"/>
<path class="k" d="M588 446 h6 v84 h-6 Z M666 446 h6 v84 h-6 Z"/>
<path class="o" fill="${tone(0.3)}" d="M584 430 L676 430 L682 446 L578 446 Z"/>
<path class="k" d="M580 446 h9 v100 h-9 Z M671 446 h9 v100 h-9 Z"/>`);
  add(limb([[614, 452], [614, 518]], 15, 13, tone(0.7)));
  add(limb([[646, 452], [646, 518]], 15, 13, tone(0.7)));
  add(`${shoe(610, 528, -1)}${shoe(650, 528)}
<path class="o" fill="${tone(0.55)}" d="M598 424 L662 424 L668 458 L592 458 Z"/>
<path class="o" fill="${tone(0.3)}" d="${D.sweater}"/>
${shade([{ lin: [630, 0, 664, 0], s: [0, 0.45] }], D.sweater)}
<rect class="o" x="624" y="322" width="12" height="16"/>
<path class="k" d="M600 296 Q594 252 630 250 Q666 252 660 296 L664 326 L648 326 L650 282 Q630 270 610 282 L612 326 L596 326 Z"/>
<ellipse class="o" cx="630" cy="294" rx="29" ry="33"/>
<path class="k" d="M601 290 Q598 256 630 256 Q662 256 659 290 Q652 272 630 272 Q608 272 601 290 Z"/>
<path class="o" fill="${tone(0.15)}" d="M603 268 Q630 254 657 268 L655 276 Q630 262 605 276 Z"/>
${eyes(630, 298, 10)}
<path class="h" d="M612 286 q6 -6 12 -3 M636 283 q6 -3 12 3"/>
${nose(630, 302)}
<path class="t" d="M622 318 q8 -5 16 0"/>
<path class="o" fill="${pat('stV')}" d="M604 330 Q630 344 656 330 L658 346 Q630 360 602 346 Z"/>
<path class="o" fill="${pat('stV')}" d="M640 344 L658 344 L662 398 L644 398 Z"/>
<path class="h" d="M646 398 l-1 7 M652 398 v8 M658 398 l1 7"/>`);
  add(limb([[602, 352], [590, 400], [612, 430]], 16, 13, tone(0.3)));
  add(limb([[658, 352], [670, 400], [648, 430]], 16, 13, tone(0.3)));
  add(`${hand(616, 432, 60)}${hand(644, 432, -60)}`);
  add('</g>');

  add('<g transform="translate(-40 0)">');
  add(limb([[406, 466], [404, 548]], 22, 19, tone(0.75)));
  add(limb([[438, 466], [440, 548]], 22, 19, tone(0.75)));
  add(`${shoe(400, 562, -1)}${shoe(444, 562)}
<path class="o" d="${D.coat}"/>
${shade([{ lin: [422, 0, 470, 0], s: [0, 0.5] }], D.coat)}
<path class="t" d="M422 230 V472"/>
<path class="o" fill="${tone(0.3)}" d="M404 213 L422 256 L440 213 Q422 222 404 213 Z"/>
<path class="k" d="M419 222 h6 l3 24 l-6 8 l-6 -8 Z"/>
<path class="t" d="M398 216 L422 266 L446 216"/>
<circle class="k" cx="428" cy="300" r="3"/><circle class="k" cx="428" cy="340" r="3"/><circle class="k" cx="428" cy="380" r="3"/>
<path class="h" d="M388 392 H412 V420 H388 M436 392 H462 V420 H436"/>
<rect class="o" x="416" y="196" width="12" height="18"/>
<ellipse class="o" cx="391" cy="164" rx="6" ry="9"/><ellipse class="o" cx="453" cy="164" rx="6" ry="9"/>
<ellipse class="o" cx="422" cy="160" rx="30" ry="36"/>
<path class="o" fill="${tone(0.15)}" d="M392 158 Q388 120 422 120 Q456 120 452 158 Q448 140 438 136 Q422 146 404 136 Q396 142 392 158 Z"/>
<path class="h" d="M404 128 q8 -4 16 0 M424 126 q8 -2 16 2"/>
${eyes(422, 158)}
<path class="h" d="M405 147 q6 -4 12 0 M427 147 q6 -4 12 0"/>
${nose(422, 162)}
<path class="k" d="M408 178 Q422 170 436 178 Q430 182 422 180 Q414 182 408 178 Z"/>
<path class="t" d="M414 186 q8 5 16 0"/>
<path class="t" d="M404 214 Q396 250 402 300 M440 214 Q448 250 444 288"/>
<circle class="o" fill="${tone(0.5)}" cx="402" cy="306" r="8"/>
<path class="t" d="M444 288 l-6 8 M444 288 l6 8"/>`);
  add(limb([[392, 238], [380, 320], [384, 392]], 19, 15));
  add(limb([[452, 238], [476, 300], [510, 270]], 19, 15));
  add(`${hand(384, 396, 5)}
<rect class="o" x="505" y="196" width="11" height="66" rx="5"/>
<path class="k" d="M509 222 h3 v36 h-3 Z"/>
<path class="h" d="M516 206 h-4 M516 214 h-4 M516 222 h-4 M516 230 h-4 M516 238 h-4"/>
<circle class="o" fill="${tone(0.8)}" cx="510.5" cy="266" r="6"/>
${hand(512, 268, 30)}`);
  add('</g>');
}
