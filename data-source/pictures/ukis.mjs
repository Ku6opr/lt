export default function draw({ add, clip, shade, limb, tone, pat, rng, f, W, H }) {
  const D = {
    ground: `M-10 330 Q300 318 ${W + 10} 326 V${H + 10} H-10 Z`,
    walls: 'M18 206 H242 V424 H18 Z',
    roof: 'M-4 216 L130 94 L264 216 Z',
    horse: 'M600 262 Q596 246 618 244 L740 244 Q768 246 766 274 L764 318 Q760 336 740 336 L622 336 Q600 334 600 316 Z',
    cow: 'M548 420 Q544 400 572 398 L740 398 Q772 400 772 430 L770 484 Q766 506 742 506 L574 506 Q548 504 548 482 Z'
  };

  const sun = [736, 70, 28];
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `M${f(sun[0] + Math.cos(a) * 38)} ${f(sun[1] + Math.sin(a) * 38)} L${f(sun[0] + Math.cos(a) * 52)} ${f(sun[1] + Math.sin(a) * 52)}`;
  });
  add(`<path class="t" stroke-width="3" d="${rays.join(' ')}"/><circle class="o" cx="${sun[0]}" cy="${sun[1]}" r="${sun[2]}"/>`);
  add(`<path class="o" d="M350 76 Q352 54 378 58 Q392 36 420 46 Q442 36 456 56 Q482 56 480 78 Q482 92 460 92 L368 92 Q346 94 350 76 Z"/>`);

  add(`<path class="o" fill="${tone(0.12)}" d="${D.ground}"/>`);
  add(shade([{ lin: [0, 326, 0, 400], s: [0.3, 0] }], D.ground));
  const RG = rng(6);
  const tufts = [];
  for (let i = 0; i < 44; i++) {
    const x = RG() * W;
    const y = 440 + RG() * 155;
    tufts.push(`M${f(x - 5)} ${f(y)} l2 -8 M${f(x)} ${f(y)} l0 -10 M${f(x + 5)} ${f(y)} l-2 -8`);
  }
  add(`<path class="h" stroke="${tone(0.6)}" d="${tufts.join(' ')}"/>`);

  add(`<path class="o" fill="#222" d="M612 330 l-4 54 h12 l4 -54 Z M646 330 l0 56 h12 l0 -56 Z M714 330 l2 56 h12 l-2 -56 Z M744 326 l6 58 h12 l-6 -58 Z"/>
<path class="o" fill="#222" d="M760 258 Q796 270 790 330 Q784 316 778 306 Q776 322 768 330 Q772 296 758 276 Z"/>
<path class="o" fill="#222" d="${D.horse}"/>
<path class="o" fill="#222" d="M612 266 Q600 232 586 212 L566 222 Q584 252 604 282 Z"/>
<path class="o" fill="#222" d="M590 206 Q574 186 556 194 Q546 200 542 214 L528 254 Q524 270 540 272 Q554 274 560 262 L586 228 Q596 216 590 206 Z"/>
<path class="o" fill="#222" d="M578 196 l0 -20 l12 18 Z M568 194 l-4 -18 l12 14 Z"/>
<path class="w" d="M578 200 Q596 222 608 252 M584 204 q6 -4 10 2 M592 216 q6 -4 10 2 M598 230 q6 -4 10 2" stroke-width="2.4"/>
<circle cx="566" cy="214" r="3.4" fill="#fff"/>
<path class="w" d="M532 262 q4 -3 7 1 M540 272 q6 2 12 -4" stroke-width="2"/>`);

  const posts = [270, 360, 450, 540, 630, 720, 800];
  add(`<path class="o" fill="${tone(0.4)}" d="M250 306 H${W + 10} V318 H250 Z M250 336 H${W + 10} V348 H250 Z M250 366 H${W + 10} V378 H250 Z"/>
${posts.map((x) => `<rect class="o" fill="${tone(0.55)}" x="${x - 7}" y="294" width="14" height="96"/>`).join('')}`);

  add(`<path class="o" fill="${tone(0.5)}" d="${D.walls}"/>
${shade([{ lin: [130, 0, 242, 0], s: [0, 0.5] }], D.walls)}
<path class="h" d="M46 216 V424 M74 216 V424 M186 216 V424 M214 216 V424"/>
<path class="o" fill="#222" d="${D.roof}"/>
<path class="w" d="M40 200 L130 118 L220 200" stroke-width="1.6"/>
<path class="o" fill="${tone(0.85)}" d="M112 158 h36 v34 h-36 Z"/>
<path class="h" stroke="#fff" d="M118 168 l8 -6 M126 186 l10 -8 M136 172 l8 -4"/>
<rect class="o" fill="${tone(0.7)}" x="72" y="282" width="116" height="142"/>
<path class="o" d="M72 282 H188 V292 H72 Z M72 414 H188 V424 H72 Z M126 282 H134 V424 H126 Z M76 290 L126 412 L120 416 L72 296 Z M184 290 L134 412 L140 416 L188 296 Z"/>
<path class="o" fill="${tone(0.35)}" d="M-10 418 H270 V430 H-10 Z"/>`);
  add(shade([{ rad: [150, 432, 140, 10], s: 0.6 }]));

  add(`<g transform="translate(130 92)">
<path class="t" d="M-6 -2 L-8 -16 M6 -2 L4 -16 M-14 -2 h12 M0 -2 h12"/>
<path class="o" fill="#222" d="M10 -40 Q40 -76 36 -30 Q30 -52 18 -38 Z M12 -36 Q48 -60 40 -20 Q34 -40 18 -30 Z"/>
<path class="o" d="M-22 -40 Q-24 -16 0 -14 Q24 -14 22 -38 Q10 -30 -4 -34 Z"/>
${shade([{ lin: [0, -40, 10, -14], s: [0, 0.4] }], 'M-22 -40 Q-24 -16 0 -14 Q24 -14 22 -38 Q10 -30 -4 -34 Z')}
<path class="o" fill="${tone(0.4)}" d="M-6 -34 Q4 -36 16 -30 Q10 -20 -4 -24 Z"/>
<path class="o" d="M-24 -40 Q-30 -60 -18 -66 Q-6 -66 -8 -48 Q-10 -38 -16 -34 Z"/>
<path class="o" fill="${tone(0.7)}" d="M-22 -66 q-2 -8 4 -10 q2 -6 8 -2 q6 -2 6 6 q-8 -2 -18 6 Z"/>
<path class="o" fill="${tone(0.7)}" d="M-24 -50 q-6 4 -2 12 q4 -2 4 -10 Z"/>
<path class="k" d="M-28 -58 l-9 3 l9 3 Z"/>
<circle class="k" cx="-19" cy="-57" r="2.4"/>
</g>`);

  add(shade([{ rad: [400, 478, 150, 12], s: 0.7 }]));
  const wheel = (x, y, r) => `<circle class="k" cx="${x}" cy="${y}" r="${r}"/>
${Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `<path class="w" d="M${f(x + Math.cos(a) * (r - 2))} ${f(y + Math.sin(a) * (r - 2))} L${f(x + Math.cos(a) * (r - 10))} ${f(y + Math.sin(a) * (r - 10))}" stroke-width="3"/>`;
  }).join('')}
<circle class="o" fill="${tone(0.4)}" cx="${x}" cy="${y}" r="${f(r * 0.55)}"/>
<circle class="o" cx="${x}" cy="${y}" r="${f(r * 0.2)}"/>`;
  const hood = 'M282 376 Q282 362 296 362 L404 362 L404 432 L282 432 Z';
  const cab = 'M392 278 H506 V420 H392 Z';
  add(`<rect class="o" fill="${tone(0.7)}" x="320" y="318" width="10" height="46"/>
<path class="o" fill="${tone(0.7)}" d="M316 318 h18 v-6 h-18 Z"/>
<path class="h" d="M330 304 q8 -8 0 -14 q-8 -6 2 -14" stroke="${tone(0.5)}"/>
<path class="o" fill="${tone(0.45)}" d="${cab}"/>
<rect class="o" fill="${tone(0.06)}" x="404" y="290" width="88" height="68"/>
<path class="o" fill="#222" d="M384 268 H514 V280 H384 Z"/>
<path class="o" fill="${pat('check')}" d="M414 358 Q416 340 446 340 Q476 340 478 358 Z"/>
<rect class="o" x="440" y="334" width="12" height="10"/>
<ellipse class="o" cx="446" cy="314" rx="22" ry="24"/>
<path class="o" fill="${tone(0.6)}" d="M422 308 Q422 286 446 286 Q470 286 470 308 Q446 300 422 308 Z"/>
<path class="o" fill="${tone(0.6)}" d="M420 306 Q446 298 472 306 Q486 308 484 314 Q450 304 418 312 Z"/>
<circle class="k" cx="438" cy="318" r="2.6"/><circle class="k" cx="454" cy="318" r="2.6"/>
<path class="h" d="M446 320 q-3 6 2 7"/>
<path class="t" d="M439 330 q7 4 14 0"/>
<path class="t" stroke-width="4" d="M420 352 L414 368"/>
<ellipse class="o" fill="none" cx="424" cy="350" rx="16" ry="5" stroke-width="3.2"/>
<path class="o" fill="${tone(0.45)}" d="M392 358 H506 V420 H392 Z"/>
${shade([{ lin: [440, 0, 506, 0], s: [0, 0.45] }], cab)}
<path class="o" fill="${tone(0.45)}" d="${hood}"/>
${shade([{ lin: [282, 362, 282, 432], s: [0, 0.35] }], hood)}
<path class="h" d="M294 376 h20 M294 388 h20 M294 400 h20 M294 412 h20"/>
<circle class="o" cx="300" cy="372" r="6"/>
${wheel(306, 440, 34)}
<path class="o" fill="${tone(0.45)}" d="M380 414 Q384 356 448 354 Q512 356 516 414 L504 414 Q498 368 448 368 Q398 368 392 414 Z"/>
${wheel(448, 420, 56)}`);

  const vx = [70, 160, 250];
  const vy = [540, 576, 548];
  const dir = [1, -1, 1];
  add(vx.map((x, i) => shade([{ rad: [x + 10, vy[i] + 4, 36, 6], s: 0.7 }])).join(''));
  add(vx.map((x, i) => `<g transform="translate(${x} ${vy[i]}) scale(${dir[i]} 1)">
<path class="t" d="M-6 -6 V2 M6 -6 V2 M-10 2 h8 M2 2 h8"/>
<path class="o" d="M-28 -36 Q-40 -60 -22 -58 Q-12 -46 -12 -38 Z"/>
<path class="o" d="M-30 -32 Q-34 -6 -2 -6 Q24 -6 26 -30 Q20 -42 6 -40 L-14 -40 Q-26 -40 -30 -32 Z"/>
${shade([{ lin: [0, -40, 20, -6], s: [0, 0.4] }], 'M-30 -32 Q-34 -6 -2 -6 Q24 -6 26 -30 Q20 -42 6 -40 L-14 -40 Q-26 -40 -30 -32 Z')}
<path class="h" d="M-14 -30 Q-2 -18 10 -28 M-10 -24 Q0 -16 6 -22"/>
<path class="o" d="M12 -36 Q8 -58 22 -62 Q34 -62 34 -50 Q32 -40 26 -34 Z"/>
<path class="o" fill="${tone(0.7)}" d="M18 -62 q0 -8 6 -8 q2 -6 8 -2 q4 4 0 10 Z"/>
<path class="o" fill="${tone(0.7)}" d="M34 -46 q4 6 -2 10 q-4 -4 0 -10 Z"/>
<path class="k" d="M34 -54 l9 3 l-9 3 Z"/>
<circle class="k" cx="27" cy="-52" r="2.2"/>
</g>`).join(''));

  add(shade([{ rad: [680, 572, 120, 12], s: 0.75 }]));
  const legs = [[580, 506], [610, 508], [716, 506], [744, 504]];
  add(legs.map(([x, y]) => `<path class="o" d="M${x - 9} ${y - 10} L${x - 8} ${y + 54} L${x + 8} ${y + 54} L${x + 9} ${y - 10} Z"/><path class="k" d="M${x - 9} ${y + 52} h18 v12 h-18 Z"/>`).join(''));
  add(`<path class="t" d="M770 420 Q790 450 784 494"/><path class="k" d="M778 490 q8 -4 12 4 q-2 12 -8 14 q-8 -6 -4 -18 Z"/>`);
  const cl = clip(D.cow);
  add(`<path class="o" d="${D.cow}"/>
<g ${cl}><path class="k" d="M600 396 Q640 400 636 432 Q620 452 596 440 Q580 420 600 396 Z M680 396 L720 396 Q730 420 712 440 Q690 446 678 428 Q672 410 680 396 Z M650 470 Q672 456 694 470 Q700 500 676 510 L640 510 Q636 484 650 470 Z M740 450 Q760 440 780 452 L780 500 Q756 504 744 484 Q734 466 740 450 Z M556 470 Q572 464 584 478 Q588 500 570 510 L548 510 L548 476 Z"/>
${shade([{ lin: [660, 398, 700, 510], s: [0, 0.4] }], D.cow)}</g>
<path class="o" fill="${tone(0.15)}" d="M688 504 Q694 524 712 524 Q730 524 734 504 Z"/>
<path class="h" d="M698 518 v8 M712 520 v8 M724 518 v8"/>`);
  add(`<path class="o" d="M556 410 Q536 390 518 394 Q500 398 494 424 L490 470 Q490 494 512 494 Q534 494 540 470 L560 434 Z"/>
<path class="k" d="M520 396 Q500 400 498 424 Q512 416 522 424 Q532 410 520 396 Z"/>
<path class="o" fill="${tone(0.3)}" d="M488 462 Q488 446 514 446 Q540 446 540 464 Q540 490 514 492 Q488 490 488 462 Z"/>
<ellipse class="k" cx="503" cy="468" rx="3.4" ry="5"/><ellipse class="k" cx="525" cy="468" rx="3.4" ry="5"/>
<circle class="k" cx="506" cy="424" r="3.2"/><circle class="k" cx="532" cy="424" r="3.2"/>
<path class="o" d="M498 400 Q488 380 478 378 Q486 392 492 404 Z M540 398 Q548 378 558 374 Q552 390 546 402 Z"/>
<path class="o" fill="${tone(0.4)}" d="M492 408 Q468 404 462 414 Q474 422 494 418 Z M546 406 Q570 400 578 410 Q566 420 544 416 Z"/>`);
}
