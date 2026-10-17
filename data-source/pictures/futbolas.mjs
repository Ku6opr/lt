export default function draw({ add, def, shade, limb, shoe, tone, W, H }) {
  def(`<pattern id="tuft" width="96" height="58" patternUnits="userSpaceOnUse"><rect width="96" height="58" fill="#fff"/><path d="M10 20 l3 -9 M15 20 l0 -11 M20 20 l-2 -8 M60 50 l3 -9 M65 50 l0 -11 M70 50 l-2 -8" fill="none" stroke="#8a8a8a" stroke-width="1.6" stroke-linecap="round"/></pattern>`);
  def(`<pattern id="net" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#fff"/><path d="M0 0.5 H16 M0.5 0 V16" stroke="#9a9a9a" stroke-width="1.6"/></pattern>`);

  const D = {
    ground: `M0 330 H${W} V${H} H0 Z`,
    crown: 'M626 250 Q590 236 600 196 Q578 160 612 132 Q606 90 650 80 Q670 40 716 52 Q754 30 784 62 Q820 70 812 120 Q836 150 812 186 Q824 232 786 246 Q768 278 726 268 Q690 286 660 266 Q640 270 626 250 Z',
    trunk: 'M716 520 L722 330 Q704 300 690 286 L700 280 Q716 296 728 306 Q736 284 750 270 L760 276 Q748 300 748 330 L756 520 Z',
    shirt1: 'M392 312 Q396 298 420 298 Q444 298 448 312 L452 398 L388 398 Z',
    shirt2: 'M542 324 Q546 310 570 310 Q594 310 598 324 L602 410 L538 410 Z',
    jersey: 'M100 284 Q104 272 126 272 Q148 272 152 284 L156 368 L96 368 Z',
    dog: 'M702 462 Q694 492 700 546 L722 546 L722 522 L726 546 L764 546 Q772 516 754 488 Q740 464 724 460 Z'
  };

  add(`<path class="o" fill="url(#tuft)" d="${D.ground}"/>`);
  add(shade([{ lin: [0, 330, 0, 380], s: [0.3, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.14] }], D.ground));
  add(`<path class="t" d="M0 330 H${W}"/>`);

  add(`<circle class="o" cx="330" cy="86" r="30"/>
<path class="t" d="M330 40 V24 M330 132 V148 M284 86 H268 M376 86 H392 M298 54 L287 43 M362 54 L373 43 M298 118 L287 129 M362 118 L373 129"/>
<path class="o" d="M90 96 Q92 74 116 76 Q126 56 152 62 Q172 54 184 74 Q206 74 206 94 Z"/>
<path class="o" d="M470 70 Q472 50 494 52 Q504 34 528 40 Q548 34 558 52 Q578 52 578 70 Z"/>
<path class="t" d="M418 140 q12 -14 24 0 q12 -14 24 0 M482 178 q10 -12 20 0 q10 -12 20 0"/>`);

  add(shade([{ rad: [736, 524, 70, 11], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.3)}" d="${D.trunk}"/>
${shade([{ lin: [728, 0, 756, 0], s: [0, 0.6] }], D.trunk)}
<path class="h" d="M732 360 q4 20 0 40 M740 430 q-4 20 0 40 M728 470 q3 14 0 26"/>
<path class="o" fill="${tone(0.26)}" d="${D.crown}"/>
${shade([{ lin: [640, 80, 820, 260], s: [0, 0.55] }], D.crown)}
<path class="h" d="M640 160 q10 -10 22 -2 M676 112 q10 -10 22 -2 M736 98 q10 -10 22 -2 M700 190 q10 -10 22 -2 M760 160 q10 -10 22 -2 M650 222 q10 -10 22 -2 M740 226 q10 -10 22 -2"/>`);

  add(shade([{ rad: [150, 488, 120, 10], s: 0.55 }]));
  add(`<path class="o" fill="url(#net)" d="M44 200 H232 V462 H44 Z"/>
<path class="o" fill="url(#net)" d="M20 180 L44 200 L44 462 L20 486 Z"/>
<path class="o" fill="url(#net)" d="M256 180 L232 200 L232 462 L256 486 Z"/>
<path class="t" d="M20 486 L44 462 H232 L256 486"/>`);

  add(limb([[114, 364], [112, 420], [112, 470]], 13, 12));
  add(limb([[138, 364], [140, 420], [140, 470]], 13, 12));
  add(`<path class="o" fill="${tone(0.18)}" d="M104 440 h16 v26 h-16 Z M132 440 h16 v26 h-16 Z"/>
${shoe(110, 482, -1)}${shoe(144, 482)}
<path class="o" fill="${tone(0.55)}" d="${D.jersey}"/>
${shade([{ lin: [126, 0, 156, 0], s: [0, 0.45] }], D.jersey)}
<path class="k" d="M98 362 L154 362 L158 396 L94 396 Z"/>
<path class="w" d="M126 398 V376"/>`);
  add(limb([[146, 284], [184, 262], [212, 236]], 14, 12, tone(0.55)));
  add(limb([[106, 284], [78, 252], [68, 210]], 14, 12, tone(0.55)));
  add(`<ellipse class="k" cx="218" cy="228" rx="12" ry="14" transform="rotate(40 218 228)"/>
<ellipse class="k" cx="66" cy="200" rx="12" ry="14" transform="rotate(-10 66 200)"/>
<rect class="o" x="120" y="258" width="12" height="16"/>
${girlHead(126, 232)}`);
  add(`<path class="o" d="M14 174 H262 V488 H250 V186 H26 V488 H14 Z"/>`);

  add(shade([{ rad: [312, 500, 26, 5], s: 0.45 }]));
  add(`<path class="t" d="M330 248 h34 M334 262 h44 M330 276 h30"/>
<circle class="o" cx="300" cy="262" r="23"/>
<path class="k" d="M300 254 l8 6 l-3 9 h-10 l-3 -9 Z"/>
<path class="k" d="M284 246 q6 -6 12 -5 l-2 6 Z M316 246 q-6 -6 -12 -5 l2 6 Z M280 274 q-4 -6 -4 -12 l6 3 Z M320 274 q4 -6 4 -12 l-6 3 Z M293 283 q7 2 14 0 l-3 -5 h-8 Z"/>`);

  add(shade([{ rad: [440, 552, 58, 9], s: 0.6 }]));
  add(limb([[424, 394], [392, 428], [352, 436]], 15, 13));
  add(limb([[432, 394], [434, 470], [438, 534]], 15, 13));
  add(`<path class="o" fill="${tone(0.18)}" d="M429 506 h17 v22 h-17 Z"/>
<path class="o" fill="${tone(0.18)}" d="M366 424 l20 -2 l2 18 l-20 2 Z"/>
<path class="k" d="M352 448 Q340 446 340 434 Q340 424 352 424 L364 426 L364 446 Z"/>
${shoe(442, 546)}
<path class="o" fill="url(#stH)" d="${D.shirt1}"/>
${shade([{ lin: [420, 0, 452, 0], s: [0, 0.45] }], D.shirt1)}
<path class="k" d="M386 392 L454 392 L456 420 Q436 428 420 412 L384 418 Z"/>
<path class="o" d="M408 300 L420 312 L432 300 Z"/>`);
  add(limb([[444, 312], [474, 290], [494, 258]], 15, 13, 'url(#stH)'));
  add(limb([[396, 312], [372, 336], [350, 352]], 15, 13, 'url(#stH)'));
  add(`<ellipse class="o" cx="497" cy="252" rx="7" ry="9" transform="rotate(20 497 252)"/>
<ellipse class="o" cx="346" cy="356" rx="7" ry="9" transform="rotate(60 346 356)"/>
<rect class="o" x="414" y="284" width="12" height="16"/>
${boyHead(420, 254, 'spiky')}`);

  add(shade([{ rad: [574, 572, 60, 9], s: 0.6 }]));
  add(limb([[556, 406], [528, 446], [540, 492]], 15, 13));
  add(limb([[584, 406], [604, 466], [600, 546]], 15, 13));
  add(`<path class="o" fill="${tone(0.18)}" d="M592 520 h17 v22 h-17 Z"/>
<path class="o" fill="${tone(0.18)}" transform="rotate(-14 540 482)" d="M532 466 h17 v22 h-17 Z"/>
${shoe(540, 504, -1)}
${shoe(604, 558)}
<path class="o" fill="${tone(0.7)}" d="${D.shirt2}"/>
${shade([{ lin: [570, 0, 602, 0], s: [0, 0.45] }], D.shirt2)}
<path class="k" d="M536 404 L604 404 L606 432 L534 432 Z"/>`);
  add(limb([[594, 324], [616, 358], [632, 386]], 15, 13, tone(0.7)));
  add(limb([[546, 324], [518, 352], [512, 318]], 15, 13, tone(0.7)));
  add(`<ellipse class="o" cx="635" cy="392" rx="7" ry="9" transform="rotate(-30 635 392)"/>
<ellipse class="o" cx="512" cy="312" rx="7" ry="9" transform="rotate(-10 512 312)"/>
<rect class="o" x="564" y="296" width="12" height="16"/>
${boyHead(570, 266, 'short')}`);

  add(shade([{ rad: [734, 550, 50, 8], s: 0.6 }]));
  add(`<path class="o" d="${D.dog}"/>
${shade([{ lin: [726, 0, 768, 0], s: [0, 0.45] }], D.dog)}
<path class="k" d="M734 486 Q752 480 760 500 Q756 516 740 512 Q730 500 734 486 Z"/>
<path class="h" d="M724 546 Q720 512 748 506 M706 546 v-7 M716 546 v-7"/>
<path class="t" d="M764 536 Q788 530 784 502"/>
<ellipse class="o" cx="708" cy="450" rx="24" ry="21"/>
<ellipse class="o" cx="686" cy="460" rx="14" ry="10"/>
<ellipse class="k" cx="674" cy="456" rx="5" ry="4"/>
<path class="h" d="M686 468 q-6 3 -12 -1"/>
<ellipse class="k" cx="702" cy="444" rx="3.2" ry="4"/>
<path class="k" d="M714 432 Q730 428 732 446 Q734 468 722 472 Q714 454 714 432 Z"/>`);

  function boyHead(cx, cy, hair) {
    const hairPath = hair === 'spiky'
      ? `M${cx - 33} ${cy + 2} Q${cx - 38} ${cy - 36} ${cx} ${cy - 38} Q${cx + 38} ${cy - 36} ${cx + 33} ${cy + 2} Q${cx + 29} ${cy - 14} ${cx + 23} ${cy - 16} L${cx + 19} ${cy - 7} L${cx + 13} ${cy - 20} L${cx + 7} ${cy - 9} L${cx + 1} ${cy - 22} L${cx - 5} ${cy - 9} L${cx - 11} ${cy - 20} L${cx - 17} ${cy - 7} L${cx - 21} ${cy - 16} Q${cx - 27} ${cy - 12} ${cx - 33} ${cy + 2} Z`
      : `M${cx - 32} ${cy + 4} Q${cx - 36} ${cy - 38} ${cx + 2} ${cy - 38} Q${cx + 38} ${cy - 36} ${cx + 33} ${cy + 2} Q${cx + 26} ${cy - 18} ${cx + 4} ${cy - 20} Q${cx - 10} ${cy - 14} ${cx - 22} ${cy - 18} Q${cx - 28} ${cy - 10} ${cx - 32} ${cy + 4} Z`;
    return `<ellipse class="o" cx="${cx}" cy="${cy}" rx="33" ry="36"/>
<path class="k" d="${hairPath}"/>
<ellipse class="k" cx="${cx - 12}" cy="${cy + 3}" rx="3" ry="4"/><ellipse class="k" cx="${cx + 12}" cy="${cy + 3}" rx="3" ry="4"/>
<path class="h" d="M${cx - 19} ${cy - 6} q6 -4 12 0 M${cx + 7} ${cy - 6} q6 -4 12 0 M${cx} ${cy + 6} q-3 7 2 8"/>
<path class="k" d="M${cx - 13} ${cy + 18} Q${cx} ${cy + 24} ${cx + 13} ${cy + 18} Q${cx + 10} ${cy + 32} ${cx} ${cy + 32} Q${cx - 10} ${cy + 32} ${cx - 13} ${cy + 18} Z"/>
<path class="w" d="M${cx - 8} ${cy + 21} Q${cx} ${cy + 24} ${cx + 8} ${cy + 21}"/>`;
  }

  function girlHead(cx, cy) {
    return `<path class="k" d="M${cx - 36} ${cy + 34} Q${cx - 44} ${cy - 40} ${cx} ${cy - 40} Q${cx + 44} ${cy - 40} ${cx + 36} ${cy + 34} Q${cx + 20} ${cy + 40} ${cx} ${cy + 26} Q${cx - 20} ${cy + 40} ${cx - 36} ${cy + 34} Z"/>
<ellipse class="o" cx="${cx}" cy="${cy}" rx="29" ry="34"/>
<path class="k" d="M${cx - 30} ${cy - 2} Q${cx - 32} ${cy - 36} ${cx} ${cy - 36} Q${cx + 32} ${cy - 36} ${cx + 30} ${cy - 2} Q${cx + 24} ${cy - 16} ${cx + 4} ${cy - 18} Q${cx - 16} ${cy - 16} ${cx - 30} ${cy - 2} Z"/>
<ellipse class="k" cx="${cx - 11}" cy="${cy + 3}" rx="3" ry="4"/><ellipse class="k" cx="${cx + 11}" cy="${cy + 3}" rx="3" ry="4"/>
<path class="h" d="M${cx - 17} ${cy - 5} q5 -3 10 0 M${cx + 7} ${cy - 5} q5 -3 10 0 M${cx} ${cy + 6} q-3 6 2 7 M${cx - 18} ${cy + 3} l-4 -3 M${cx + 18} ${cy + 3} l4 -3"/>
<path class="t" d="M${cx - 9} ${cy + 20} q9 6 18 0"/>`;
  }
}
