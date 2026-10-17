export default function draw({ add, shade, limb, shoe, scallops, tone, f, W, H }) {
  const D = {
    back: `M0 0 H${W} V332 H0 Z`,
    stage: `M0 332 H${W} V386 H0 Z`,
    front: `M0 386 H${W} V462 H0 Z`,
    hall: `M0 462 H${W} V${H} H0 Z`,
    curtL: 'M-10 0 H118 Q96 110 108 200 Q92 280 128 336 H-10 Z',
    curtR: `M${W + 10} 0 H682 Q704 110 692 200 Q708 280 672 336 H${W + 10} Z`,
    dress: 'M302 196 Q306 184 324 184 Q342 184 346 196 L350 262 Q384 320 392 368 L256 368 Q264 320 298 262 Z',
    shirt: 'M534 198 Q538 186 562 186 Q586 186 590 198 L594 292 L530 292 Z'
  };

  add(`<path class="o" fill="${tone(0.55)}" d="${D.back}"/>`);
  add(shade([{ lin: [0, 0, 0, 332], s: [0.5, 0.1] }, { lin: [300, 0, 800, 0], s: [0, 0.2] }], D.back));

  const lamps = [220, 400, 580];
  add(lamps.map((x) => `<path fill="#fff" fill-opacity="0.32" d="M${x - 12} 76 L${x + 12} 76 L${x + 84} 362 L${x - 84} 362 Z"/>`).join(''));
  add(`<path class="o" fill="${tone(0.15)}" d="${D.stage}"/>
${shade([{ lin: [0, 332, 0, 386], s: [0.3, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.18] }], D.stage)}
<path class="h" stroke="#8a8a8a" d="${[-200, -60, 80, 220, 360, 500, 640, 780, 920, 1060].map((x) => `M${f(400 + (x - 400) * 0.8)} 332 L${x} 386`).join(' ')}"/>
<path class="o" fill="${tone(0.62)}" d="${D.front}"/>
${shade([{ lin: [300, 0, 800, 0], s: [0, 0.3] }], D.front)}
<path class="o" fill="${tone(0.3)}" d="${D.hall}"/>
${shade([{ lin: [0, 462, 0, 520], s: [0.4, 0] }], D.hall)}`);

  add(`<path class="t" d="M120 42 H680"/>
${lamps.map((x) => `<path class="t" d="M${x} 42 V50"/><path class="o" fill="${tone(0.75)}" d="M${x - 16} 50 H${x + 16} L${x + 12} 76 H${x - 12} Z"/><ellipse class="o" cx="${x}" cy="76" rx="12" ry="4"/>`).join('')}`);

  add(`<path class="o" fill="${tone(0.32)}" d="${D.curtL}"/>
${shade([{ lin: [0, 0, 128, 0], s: [0, 0.5] }], D.curtL)}
<path class="h" d="M30 30 Q24 180 34 336 M64 30 Q58 180 70 336 M94 30 Q84 160 96 300"/>
<path class="o" fill="${tone(0.32)}" d="${D.curtR}"/>
${shade([{ lin: [672, 0, 800, 0], s: [0, 0.55] }], D.curtR)}
<path class="h" d="M770 30 Q776 180 766 336 M736 30 Q742 180 730 336 M706 30 Q716 160 704 300"/>
<path class="o" fill="${tone(0.32)}" d="M-10 0 H${W + 10} V22 ${scallops(-10, W + 10, 22, 40, 14)} Z"/>
${shade([{ lin: [300, 0, 800, 0], s: [0, 0.4] }], `M-10 0 H${W + 10} V22 ${scallops(-10, W + 10, 22, 40, 14)} Z`)}`);

  add(shade([{ rad: [336, 372, 80, 8], s: 0.6 }]));
  add(`<path class="k" d="M290 128 Q284 96 324 94 Q364 96 358 130 Q366 180 352 222 Q340 200 340 160 L308 160 Q308 200 296 222 Q282 180 290 128 Z"/>
<path class="o" fill="${tone(0.7)}" d="${D.dress}"/>
${shade([{ lin: [324, 0, 392, 0], s: [0, 0.45] }], D.dress)}
<path class="w" d="M292 300 l3 3 M318 330 l3 3 M340 296 l3 3 M362 336 l3 3 M300 350 l3 3 M330 276 l3 3"/>
<path class="h" d="M302 262 Q324 270 346 262"/>`);
  add(limb([[302, 200], [270, 196], [242, 168]], 13, 11));
  add(`<ellipse class="o" cx="238" cy="162" rx="7" ry="9" transform="rotate(-40 238 162)"/>
<rect class="o" x="318" y="166" width="12" height="20"/>
<ellipse class="o" cx="324" cy="140" rx="26" ry="31"/>
<path class="k" d="M297 140 Q296 108 324 108 Q352 108 351 138 Q344 120 326 118 Q306 122 297 140 Z"/>
<path class="t" d="M308 140 q5 4 10 0 M330 140 q5 4 10 0"/>
<path class="h" d="M321 146 q-3 6 2 7"/>
<ellipse class="k" cx="324" cy="160" rx="6" ry="7"/>`);
  add(limb([[346, 202], [368, 226], [380, 248]], 13, 12));
  add(limb([[380, 248], [372, 228], [364, 212]], 12, 11));
  add(`<path class="o" fill="${tone(0.45)}" d="M361 215 L341 181 L349 176 L369 210 Z"/>
<circle class="k" cx="340" cy="171" r="9"/>
<path class="h" stroke="#fff" d="M334 168 h12 M335 174 h10 M340 164 v14"/>
<ellipse class="o" cx="363" cy="208" rx="7" ry="9" transform="rotate(-30 363 208)"/>`);

  add(`<path class="o" d="M232 104 v-30 l18 -6 v30"/>
<ellipse class="o" cx="226" cy="104" rx="8" ry="6" transform="rotate(-20 226 104)"/>
<ellipse class="o" cx="244" cy="98" rx="8" ry="6" transform="rotate(-20 244 98)"/>
<path class="o" d="M268 66 v-28 q8 6 14 14"/>
<ellipse class="o" cx="262" cy="66" rx="8" ry="6" transform="rotate(-20 262 66)"/>
<path class="o" d="M194 150 v-26 q8 6 14 14"/>
<ellipse class="o" cx="188" cy="150" rx="8" ry="6" transform="rotate(-20 188 150)"/>`);

  add(shade([{ rad: [574, 374, 70, 8], s: 0.6 }]));
  add(limb([[548, 288], [546, 330], [546, 362]], 17, 15, tone(0.75)));
  add(limb([[576, 288], [580, 330], [582, 362]], 17, 15, tone(0.75)));
  add(`${shoe(544, 374, -1)}${shoe(586, 374)}
<path class="o" fill="url(#stH)" d="${D.shirt}"/>
${shade([{ lin: [562, 0, 594, 0], s: [0, 0.45] }], D.shirt)}
<path class="o" d="M550 188 L562 200 L574 188 Z"/>`);

  const rot = (lx, ly) => {
    const a = (24 * Math.PI) / 180;
    return [f(542 + lx * Math.cos(a) - ly * Math.sin(a)), f(272 + lx * Math.sin(a) + ly * Math.cos(a))];
  };
  add(`<g transform="translate(542 272) rotate(24)">
<path class="o" fill="${tone(0.4)}" d="M-4 -20 Q8 -24 18 -18 Q30 -30 50 -28 Q78 -24 78 0 Q78 24 50 28 Q30 30 18 18 Q8 24 -4 20 Q-14 0 -4 -20 Z"/>
<circle class="k" cx="22" cy="0" r="9"/>
<path class="k" d="M54 -8 h6 v16 h-6 Z"/>
<path class="o" fill="${tone(0.6)}" d="M-88 -5 H-4 V5 H-88 Z"/>
<path class="h" d="M-76 -5 v10 M-62 -5 v10 M-48 -5 v10 M-34 -5 v10 M-20 -5 v10"/>
<path class="k" d="M-108 -8 L-88 -6 L-88 6 L-108 8 Z"/>
<path class="h" stroke="#fff" d="M-88 -2 H58 M-88 2 H58"/>
</g>`);
  const neck = rot(-66, 0);
  const body = rot(30, 6);
  add(limb([[536, 204], [500, 250], [neck[0] + 4, neck[1] + 8]], 15, 13, 'url(#stH)'));
  add(limb([[588, 204], [612, 250], [body[0] + 8, body[1] + 6]], 15, 13, 'url(#stH)'));
  add(`<ellipse class="o" cx="${neck[0]}" cy="${neck[1]}" rx="7" ry="9" transform="rotate(30 ${neck[0]} ${neck[1]})"/>
<ellipse class="o" cx="${body[0]}" cy="${body[1]}" rx="7" ry="9" transform="rotate(-40 ${body[0]} ${body[1]})"/>
<rect class="o" x="556" y="172" width="12" height="18"/>
<ellipse class="o" cx="562" cy="146" rx="27" ry="32"/>
<path class="k" d="M535 150 Q530 112 562 112 Q596 112 590 150 Q586 132 574 128 L568 136 L560 126 L552 136 L546 128 Q538 134 535 150 Z"/>
<path class="t" d="M546 148 q5 4 10 0 M568 148 q5 4 10 0"/>
<path class="h" d="M560 152 q-3 6 2 7"/>
<path class="t" d="M553 164 q9 6 18 0"/>`);

  const people = [
    { x: 170, hair: 'long' },
    { x: 400, hair: 'hat' },
    { x: 630, hair: 'short' }
  ];
  people.forEach(({ x, hair }) => {
    const body = `M${x - 92} ${H + 10} Q${x - 92} 556 ${x - 50} 548 Q${x} 538 ${x + 50} 548 Q${x + 92} 556 ${x + 92} ${H + 10} Z`;
    const fill = hair === 'hat' ? 'url(#stV)' : tone(hair === 'long' ? 0.5 : 0.75);
    add(shade([{ rad: [x + 20, 530, 110, 24], s: 0.4 }]));
    add(`<path class="o" fill="${fill}" d="${body}"/>
${shade([{ lin: [x, 0, x + 92, 0], s: [0, 0.45] }], body)}
<rect class="o" x="${x - 12}" y="520" width="24" height="26"/>`);
    if (hair === 'long')
      add(`<path class="k" d="M${x - 38} 500 Q${x - 42} 456 ${x} 454 Q${x + 42} 456 ${x + 38} 500 Q${x + 44} 552 ${x + 30} 574 Q${x} 584 ${x - 30} 574 Q${x - 44} 552 ${x - 38} 500 Z"/>
<path class="w" d="M${x - 16} 476 Q${x - 22} 520 ${x - 14} 566 M${x + 10} 470 Q${x + 16} 520 ${x + 8} 570"/>`);
    if (hair === 'short')
      add(`<ellipse class="o" cx="${x - 36}" cy="502" rx="6" ry="10"/><ellipse class="o" cx="${x + 36}" cy="502" rx="6" ry="10"/>
<ellipse class="k" cx="${x}" cy="496" rx="36" ry="42"/>
<path class="h" stroke="#fff" d="M${x - 12} 470 q12 -6 24 0"/>`);
    if (hair === 'hat')
      add(`<ellipse class="o" cx="${x - 35}" cy="510" rx="6" ry="10"/><ellipse class="o" cx="${x + 35}" cy="510" rx="6" ry="10"/>
<ellipse class="k" cx="${x}" cy="506" rx="35" ry="38"/>
<path class="o" fill="${tone(0.55)}" d="M${x - 38} 500 Q${x - 40} 446 ${x} 444 Q${x + 40} 446 ${x + 38} 500 Z"/>
${shade([{ lin: [x, 0, x + 40, 0], s: [0, 0.45] }], `M${x - 38} 500 Q${x - 40} 446 ${x} 444 Q${x + 40} 446 ${x + 38} 500 Z`)}
<path class="o" fill="url(#stV)" d="M${x - 40} 486 H${x + 40} V504 H${x - 40} Z"/>
<circle class="o" cx="${x}" cy="440" r="11"/>
<path class="h" d="M${x - 5} 434 l3 3 M${x + 4} 433 l-2 4 M${x - 6} 444 l4 -2 M${x + 5} 445 l-3 -3"/>`);
  });
}
