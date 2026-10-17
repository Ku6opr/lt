export default function draw({ add, shade, floor, limb, hand, shoe, tone, pat, W, H }) {
  const eyes = (x, y, dx = 11) => `<ellipse class="k" cx="${x - dx}" cy="${y}" rx="3" ry="4"/><ellipse class="k" cx="${x + dx}" cy="${y}" rx="3" ry="4"/>`;
  const brows = (x, y, dx = 11) => `<path class="h" d="M${x - dx - 6} ${y} q6 -4 12 0 M${x + dx - 6} ${y} q6 -4 12 0"/>`;
  const nose = (x, y) => `<path class="h" d="M${x} ${y} q-3 7 2 8"/>`;
  const smile = (x, y, w = 9) => `<path class="t" d="M${x - w} ${y} q${w} 6 ${w * 2} 0"/>`;

  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    board: 'M34 54 H316 V246 H34 Z',
    dress: 'M352 238 Q356 214 385 214 Q414 214 418 238 L424 330 L446 524 L324 524 L346 330 Z',
    deskA: 'M448 380 H604 V394 H448 Z',
    deskB: 'M626 380 H782 V394 H626 Z',
    girl: 'M494 318 Q498 296 526 296 Q554 296 558 318 L562 372 L490 372 Z',
    boy: 'M672 318 Q676 296 704 296 Q732 296 736 318 L740 372 L668 372 Z',
    bag: 'M728 500 Q728 470 759 470 Q790 470 790 500 L793 586 L725 586 Z',
    tdesk: 'M44 420 H246 V490 H44 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(shade([{ rad: [385, 560, 78, 11], s: 0.7 }]));
  add(shade([{ rad: [528, 550, 96, 11], s: 0.7 }]));
  add(shade([{ rad: [706, 550, 96, 11], s: 0.7 }]));
  add(shade([{ rad: [768, 590, 40, 7], s: 0.6 }]));
  add(shade([{ rad: [160, 552, 130, 12], s: 0.7 }]));

  add(`<rect class="o" fill="${tone(0.32)}" x="22" y="42" width="306" height="216" rx="3"/>
<path class="o" fill="#2e2e2e" d="${D.board}"/>
${shade([{ lin: [34, 54, 316, 246], s: [0, 0.35] }], D.board)}
<rect class="o" fill="${tone(0.32)}" x="16" y="256" width="318" height="10" rx="2"/>
<rect class="o" x="64" y="250" width="16" height="6"/><rect class="o" x="92" y="250" width="12" height="6"/>
<g stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M64 132 L82 80 L100 132 M70 114 H94"/>
<path d="M120 132 V80 H134 Q150 80 150 94 Q150 106 134 106 H120 M134 106 Q156 106 156 119 Q156 132 134 132 H120"/>
<path d="M210 90 Q200 79 188 80 Q170 84 170 106 Q170 130 190 132 Q202 132 210 122"/>
<path d="M64 170 Q68 160 80 160 Q92 162 90 174 Q86 186 64 204 H94"/>
<path d="M112 184 H138 M125 171 V197"/>
<path d="M156 166 Q168 156 178 165 Q182 176 168 181 Q184 186 180 198 Q172 208 156 200"/>
<path d="M198 178 H222 M198 190 H222"/>
<path d="M262 164 H242 L240 182 Q256 176 264 186"/>
</g>`);

  add(`<path class="o" fill="${tone(0.18)}" d="M52 404 H238 L250 420 H40 Z"/>
<path class="o" fill="${tone(0.32)}" d="${D.tdesk}"/>
${shade([{ lin: [130, 0, 250, 0], s: [0, 0.5] }], D.tdesk)}
<path class="k" d="M48 490 h9 v58 h-9 Z M233 490 h9 v58 h-9 Z"/>
<path class="h" d="M60 455 H230"/><rect class="k" x="135" y="434" width="20" height="6" rx="2"/><rect class="k" x="135" y="466" width="20" height="6" rx="2"/>
<path class="o" fill="${tone(0.5)}" d="M70 376 H170 V392 H70 Z"/>
<path class="o" d="M76 360 H164 V376 H76 Z"/>
<path class="o" fill="${pat('stV')}" d="M66 392 H174 V410 H66 Z"/>
<path class="h" d="M156 360 V376 M162 392 V410 M162 376 V392"/>
<circle class="o" cx="206" cy="392" r="17"/>
<path class="t" d="M206 376 Q206 368 210 364"/>
<path class="o" fill="${tone(0.35)}" d="M209 368 Q218 360 226 364 Q218 372 209 368 Z"/>
<path class="h" d="M196 386 q3 -6 8 -6"/>
<circle class="o" cx="640" cy="112" r="44"/>
<circle class="o" cx="640" cy="112" r="36"/>
${shade([{ rad: [652, 124, 40, 40], s: 0.25 }])}
${Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  const r0 = i % 3 ? 31 : 27;
  return `<path class="${i % 3 ? 'h' : 't'}" d="M${(640 + Math.sin(a) * r0).toFixed(1)} ${(112 - Math.cos(a) * r0).toFixed(1)} L${(640 + Math.sin(a) * 34).toFixed(1)} ${(112 - Math.cos(a) * 34).toFixed(1)}"/>`;
}).join('')}
<path class="t" d="M640 112 L640 88 M640 112 L657 120" stroke-width="3.4"/>
<circle class="k" cx="640" cy="112" r="3.5"/>`);

  const chair = (cx) => `<rect class="o" fill="${tone(0.28)}" x="${cx - 46}" y="290" width="92" height="15" rx="3"/>
<path class="k" d="M${cx - 42} 305 h7 v75 h-7 Z M${cx + 35} 305 h7 v75 h-7 Z"/>
<path class="k" d="M${cx - 42} 446 h7 v96 h-7 Z M${cx + 35} 446 h7 v96 h-7 Z"/>
<path class="o" fill="${tone(0.28)}" d="M${cx - 46} 436 H${cx + 46} L${cx + 49} 448 H${cx - 49} Z"/>`;
  add(chair(526), chair(704));

  add(limb([[512, 446], [512, 520]], 15, 13));
  add(limb([[540, 446], [540, 520]], 15, 13));
  add(`<path class="o" fill="${pat('check')}" d="M494 420 L558 420 L562 452 L490 452 Z"/>
<rect class="o" fill="${tone(0.7)}" x="504" y="510" width="16" height="12"/><rect class="o" fill="${tone(0.7)}" x="532" y="510" width="16" height="12"/>
${shoe(508, 534, -1)}${shoe(544, 534)}`);
  add(limb([[690, 446], [690, 520]], 15, 13, tone(0.55)));
  add(limb([[718, 446], [718, 520]], 15, 13, tone(0.55)));
  add(`<path class="o" fill="${tone(0.55)}" d="M672 420 L736 420 L740 452 L668 452 Z"/>
${shoe(686, 532, -1)}${shoe(722, 532)}`);

  add(`<path class="o" fill="${pat('check')}" d="${D.girl}"/>
${shade([{ lin: [526, 0, 562, 0], s: [0, 0.4] }], D.girl)}
<path class="o" d="M510 298 Q526 312 542 298 L546 306 Q526 322 506 306 Z"/>
<rect class="o" x="520" y="282" width="12" height="16"/>
<path class="k" d="M498 236 Q480 250 486 278 Q490 290 482 300 Q500 296 500 270 Z"/>
<path class="k" d="M554 236 Q572 250 566 278 Q562 290 570 300 Q552 296 552 270 Z"/>
<circle class="o" fill="${tone(0.5)}" cx="490" cy="246" r="6"/><circle class="o" fill="${tone(0.5)}" cx="562" cy="246" r="6"/>
<ellipse class="o" cx="526" cy="250" rx="29" ry="33"/>
<path class="k" d="M497 252 Q492 214 526 213 Q560 214 555 252 Q550 232 540 228 Q526 236 512 228 Q502 232 497 252 Z"/>
<path class="k" d="M514 263 q4 4 8 0 M530 263 q4 4 8 0" stroke-width="2" fill="none"/>
<path class="h" d="M509 252 q6 -3 11 0 M532 252 q6 -3 11 0"/>
${nose(526, 266)}${smile(526, 278, 7)}`);

  add(`<path class="o" fill="${pat('stH')}" d="${D.boy}"/>
${shade([{ lin: [704, 0, 740, 0], s: [0, 0.45] }], D.boy)}
<path class="o" d="M691 298 L704 311 L717 298 Z"/>
<rect class="o" x="698" y="282" width="12" height="16"/>
<ellipse class="o" cx="675" cy="254" rx="6" ry="9"/><ellipse class="o" cx="733" cy="254" rx="6" ry="9"/>
<ellipse class="o" cx="704" cy="250" rx="29" ry="33"/>
<path class="k" d="M675 252 Q670 214 704 213 Q738 214 733 252 Q730 236 724 232 L718 226 Q704 236 688 228 Q680 236 675 252 Z"/>
<path class="k" d="M692 263 q4 4 8 0 M708 263 q4 4 8 0" stroke-width="2" fill="none"/>
<path class="h" d="M687 251 q6 -3 11 0 M710 251 q6 -3 11 0"/>
${nose(704, 266)}${smile(704, 278, 7)}`);

  const desk = (x0, d) => `<path class="o" fill="${tone(0.18)}" d="M${x0 + 20} 338 H${x0 + 136} L${x0 + 156} 380 H${x0} Z"/>
<path class="o" fill="${tone(0.32)}" d="${d}"/>
${shade([{ lin: [x0 + 78, 0, x0 + 156, 0], s: [0, 0.45] }], d)}
<path class="k" d="M${x0 + 6} 394 h9 v150 h-9 Z M${x0 + 141} 394 h9 v150 h-9 Z"/>`;
  add(desk(448, D.deskA), desk(626, D.deskB));

  add(`<path class="o" d="M494 346 L526 342 L528 374 L486 377 Z"/>
<path class="o" d="M526 342 L560 346 L568 377 L528 374 Z"/>
<path class="t" d="M497 353 L522 350 M494 360 L523 357 M492 367 L524 364 M531 350 L556 353 M532 357 L559 360 M533 364 L562 367"/>`);
  add(limb([[497, 312], [486, 344], [506, 368]], 16, 14, pat('check')));
  add(limb([[555, 312], [568, 344], [546, 364]], 16, 14, pat('check')));
  add(`<path class="k" d="M538 372 L560 334 L566 337 L544 375 Z"/><path class="o" d="M560 334 L563 328 L567 331 L566 337 Z"/>
${hand(507, 369, 70)}${hand(543, 364, -60)}`);

  add(`<path class="o" fill="${tone(0.7)}" d="M656 352 Q680 342 704 350 Q728 342 752 352 L758 380 Q730 372 704 380 Q678 372 650 380 Z"/>
<path class="o" d="M660 348 Q682 338 704 346 L704 376 Q680 368 654 376 Z"/>
<path class="o" d="M748 348 Q726 338 704 346 L704 376 Q728 368 754 376 Z"/>
<path class="t" d="M666 352 Q684 345 698 350 M664 359 Q683 352 698 357 M662 366 Q682 359 698 364 M710 350 Q724 345 742 352 M710 357 Q725 352 744 359 M710 364 Q726 359 746 366"/>`);
  add(limb([[675, 312], [654, 340], [652, 366]], 16, 14, pat('stH')));
  add(limb([[733, 312], [754, 340], [756, 366]], 16, 14, pat('stH')));
  add(`${hand(654, 370, 20)}${hand(754, 370, -20)}`);

  add(`<path class="o" fill="${tone(0.5)}" d="${D.bag}"/>
${shade([{ lin: [759, 0, 793, 0], s: [0, 0.45] }], D.bag)}
<path class="t" d="M744 474 Q759 452 774 474"/>
<path class="o" fill="${tone(0.32)}" d="M730 500 Q730 478 759 478 Q788 478 788 500 L788 512 Q759 524 730 512 Z"/>
<rect class="k" x="754" y="510" width="10" height="10" rx="2"/>
<path class="o" fill="${tone(0.25)}" d="M738 534 H780 V566 Q759 574 738 566 Z"/>
<path class="h" d="M738 544 H780"/>`);

  add(`<path class="t" d="M374 536 V552 M396 536 V552"/>
${shoe(370, 562, -1)}${shoe(400, 562)}
<path class="o" fill="${tone(0.42)}" d="${D.dress}"/>
${shade([{ lin: [385, 0, 446, 0], s: [0, 0.45] }], D.dress)}
<path class="o" fill="${tone(0.8)}" d="M345 322 H425 L426 334 H344 Z"/>
<path class="o" d="M366 216 Q385 236 404 216 L408 226 Q385 248 362 226 Z"/>
<rect class="o" x="379" y="196" width="12" height="22"/>
<circle class="k" cx="385" cy="124" r="16"/>
<ellipse class="o" cx="385" cy="164" rx="29" ry="35"/>
<path class="k" d="M356 170 Q350 128 385 127 Q420 128 414 170 Q410 148 400 144 Q388 152 372 142 Q360 148 356 170 Z"/>
<circle class="o" cx="373" cy="168" r="9"/><circle class="o" cx="397" cy="168" r="9"/>
<path class="t" d="M382 168 h6 M364 166 l-8 -2 M406 166 l8 -2"/>
<circle class="k" cx="373" cy="169" r="2.4"/><circle class="k" cx="397" cy="169" r="2.4"/>
${nose(385, 174)}${smile(385, 186, 8)}`);
  add(limb([[358, 240], [318, 236], [272, 196]], 18, 14, tone(0.42)));
  add(limb([[412, 240], [428, 300], [426, 360]], 18, 14, tone(0.42)));
  add(`<path class="o" d="M262 184 l10 -6 l4 7 l-10 6 Z"/>${hand(268, 192, -50)}${hand(426, 364, 5)}`);
}
