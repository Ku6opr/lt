function people({ limb, hand, shoe, tone, f }) {
  const SW = { o: 3.4, k: 2.4, t: 2.8, h: 1.9, w: 2.2 };
  const grp = (svg, x, y, s = 1, flip = false) => {
    const body = s === 1 ? svg : svg.replace(/<(\w+)([^>]*?)class="(\w)"([^>]*?)(\/?)>/g, (m, tag, a, c, b, end) => (/stroke-width=/.test(a + b) ? m : `<${tag}${a}class="${c}" stroke-width="${f((SW[c] * 0.62) / s)}"${b}${end}>`));
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${body}</g>`;
  };
  const face = (cx, cy, { look = 0, mouth = 'smile', brows = true } = {}) => {
    const ex = cx + look;
    const eyes = `<ellipse class="k" cx="${ex - 11}" cy="${cy + 1}" rx="3" ry="4"/><ellipse class="k" cx="${ex + 11}" cy="${cy + 1}" rx="3" ry="4"/>`;
    const br = brows ? `<path class="h" d="M${ex - 17} ${cy - 8} q6 -4 12 0 M${ex + 5} ${cy - 8} q6 -4 12 0"/>` : '';
    const nose = look < 0 ? `<path class="h" d="M${ex} ${cy + 4} q-5 7 1 9"/>` : `<path class="h" d="M${ex} ${cy + 4} q-3 7 2 9"/>`;
    const m = mouth === 'open' ? `<path class="k" d="M${ex - 9} ${cy + 18} Q${ex} ${cy + 22} ${ex + 9} ${cy + 18} Q${ex + 7} ${cy + 29} ${ex} ${cy + 29} Q${ex - 7} ${cy + 29} ${ex - 9} ${cy + 18} Z"/>` : mouth === 'o' ? `<ellipse class="k" cx="${ex}" cy="${cy + 21}" rx="4" ry="5"/>` : `<path class="t" d="M${ex - 9} ${cy + 19} q9 6 18 0"/>`;
    return eyes + br + nose + m;
  };
  const head = (cx, cy, o = {}) => {
    const { hair = 'man', rx = 29, ry = 35, glasses = false, look = 0, hc = tone(0.85) } = o;
    let back = '';
    let front = '';
    if (hair === 'man') front = `<path class="k" d="M${cx - 30} ${cy + 2} Q${cx - 35} ${cy - 40} ${cx + 2} ${cy - 39} Q${cx + 35} ${cy - 37} ${cx + 30} ${cy + 2} Q${cx + 27} ${cy - 16} ${cx + 16} ${cy - 21} Q${cx - 4} ${cy - 15} ${cx - 22} ${cy - 22} Q${cx - 28} ${cy - 12} ${cx - 30} ${cy + 2} Z"/>`;
    else if (hair === 'bob') {
      back = `<path class="k" d="M${cx - 36} ${cy + 26} Q${cx - 42} ${cy - 44} ${cx} ${cy - 44} Q${cx + 42} ${cy - 44} ${cx + 36} ${cy + 26} Q${cx + 30} ${cy + 32} ${cx + 22} ${cy + 26} L${cx - 22} ${cy + 26} Q${cx - 30} ${cy + 32} ${cx - 36} ${cy + 26} Z"/>`;
      front = `<path class="k" d="M${cx - 29} ${cy + 6} Q${cx - 32} ${cy - 39} ${cx + 2} ${cy - 39} Q${cx + 32} ${cy - 38} ${cx + 29} ${cy + 6} Q${cx + 25} ${cy - 18} ${cx + 12} ${cy - 23} Q${cx - 10} ${cy - 12} ${cx - 29} ${cy + 6} Z"/>`;
    } else if (hair === 'long') {
      back = `<path class="o" fill="${hc}" d="M${cx - 30} ${cy - 8} Q${cx - 40} ${cy - 46} ${cx} ${cy - 44} Q${cx + 40} ${cy - 46} ${cx + 30} ${cy - 8} Q${cx + 34} ${cy + 34} ${cx + 46} ${cy + 60} Q${cx + 34} ${cy + 68} ${cx + 22} ${cy + 58} L${cx - 22} ${cy + 58} Q${cx - 34} ${cy + 68} ${cx - 46} ${cy + 60} Q${cx - 34} ${cy + 34} ${cx - 30} ${cy - 8} Z"/><path class="h" d="M${cx - 33} ${cy + 20} q4 18 10 30 M${cx + 33} ${cy + 20} q-4 18 -10 30"/>`;
      front = `<path class="o" fill="${hc}" d="M${cx - 29} ${cy + 4} Q${cx - 32} ${cy - 39} ${cx + 2} ${cy - 39} Q${cx + 32} ${cy - 38} ${cx + 29} ${cy + 4} Q${cx + 25} ${cy - 18} ${cx + 12} ${cy - 23} Q${cx - 10} ${cy - 12} ${cx - 29} ${cy + 4} Z"/>`;
    } else if (hair === 'girl') {
      back = `<path class="o" fill="${hc}" d="M${cx - 26} ${cy - 16} Q${cx - 52} ${cy - 10} ${cx - 44} ${cy + 30} Q${cx - 34} ${cy + 12} ${cx - 26} ${cy} Z M${cx + 26} ${cy - 16} Q${cx + 52} ${cy - 10} ${cx + 44} ${cy + 30} Q${cx + 34} ${cy + 12} ${cx + 26} ${cy} Z"/>`;
      front = `<path class="o" fill="${hc}" d="M${cx - 29} ${cy - 2} Q${cx - 31} ${cy - 39} ${cx} ${cy - 39} Q${cx + 31} ${cy - 39} ${cx + 29} ${cy - 2} Q${cx + 26} ${cy - 18} ${cx + 18} ${cy - 19} Q${cx} ${cy - 24} ${cx - 18} ${cy - 19} Q${cx - 26} ${cy - 18} ${cx - 29} ${cy - 2} Z"/><circle class="k" cx="${cx - 27}" cy="${cy - 13}" r="4"/><circle class="k" cx="${cx + 27}" cy="${cy - 13}" r="4"/>`;
    } else if (hair === 'boy') front = `<path class="k" d="M${cx - 31} ${cy + 2} Q${cx - 36} ${cy - 38} ${cx} ${cy - 40} Q${cx + 36} ${cy - 38} ${cx + 31} ${cy + 2} Q${cx + 28} ${cy - 14} ${cx + 22} ${cy - 16} L${cx + 18} ${cy - 7} L${cx + 13} ${cy - 20} L${cx + 7} ${cy - 9} L${cx + 1} ${cy - 22} L${cx - 5} ${cy - 9} L${cx - 11} ${cy - 20} L${cx - 17} ${cy - 7} L${cx - 21} ${cy - 16} Q${cx - 28} ${cy - 14} ${cx - 31} ${cy + 2} Z"/>`;
    else if (hair === 'old') front = `<path class="o" d="M${cx - 30} ${cy + 8} Q${cx - 34} ${cy - 18} ${cx - 22} ${cy - 24} Q${cx - 22} ${cy - 10} ${cx - 26} ${cy + 8} Z M${cx + 30} ${cy + 8} Q${cx + 34} ${cy - 18} ${cx + 22} ${cy - 24} Q${cx + 22} ${cy - 10} ${cx + 26} ${cy + 8} Z"/><path class="h" d="M${cx - 28} ${cy - 10} l4 6 M${cx + 28} ${cy - 10} l-4 6"/>`;
    const ears = hair === 'bob' || hair === 'long' || hair === 'girl' ? '' : `<ellipse class="o" cx="${cx - rx + 1}" cy="${cy + 4}" rx="6" ry="9"/><ellipse class="o" cx="${cx + rx - 1}" cy="${cy + 4}" rx="6" ry="9"/>`;
    const gl = glasses ? `<circle class="o" fill="none" cx="${cx + look - 11}" cy="${cy + 1}" r="9"/><circle class="o" fill="none" cx="${cx + look + 11}" cy="${cy + 1}" r="9"/><path class="t" d="M${cx + look - 2} ${cy} h4 M${cx + look - 20} ${cy - 1} L${cx - rx + 2} ${cy - 3} M${cx + look + 20} ${cy - 1} L${cx + rx - 2} ${cy - 3}"/>` : '';
    return `${back}${ears}<ellipse class="o" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>${front}${face(cx, cy, o)}${gl}`;
  };
  const side = (cx, cy, o = {}) => {
    const { hair = 'man', hc = tone(0.85), glasses = false, mouth = 'smile' } = o;
    const nose = `<path class="o" d="M${cx + 23} ${cy - 8} Q${cx + 38} ${cy + 6} ${cx + 33} ${cy + 10} Q${cx + 28} ${cy + 12} ${cx + 22} ${cy + 10} Z"/>`;
    let back = '';
    let front = '';
    if (hair === 'man') front = `<path class="k" d="M${cx - 29} ${cy + 12} Q${cx - 34} ${cy - 38} ${cx + 2} ${cy - 37} Q${cx + 28} ${cy - 35} ${cx + 27} ${cy - 14} Q${cx + 12} ${cy - 22} ${cx - 2} ${cy - 20} Q${cx - 10} ${cy - 8} ${cx - 14} ${cy + 14} Q${cx - 22} ${cy + 22} ${cx - 29} ${cy + 12} Z"/>`;
    else if (hair === 'bob') front = `<path class="k" d="M${cx - 31} ${cy + 26} Q${cx - 38} ${cy - 40} ${cx + 2} ${cy - 39} Q${cx + 30} ${cy - 37} ${cx + 29} ${cy - 10} Q${cx + 12} ${cy - 22} ${cx - 4} ${cy - 16} Q${cx - 10} ${cy + 4} ${cx - 8} ${cy + 26} Q${cx - 20} ${cy + 32} ${cx - 31} ${cy + 26} Z"/>`;
    else if (hair === 'girl') {
      back = `<path class="o" fill="${hc}" d="M${cx - 24} ${cy - 14} Q${cx - 56} ${cy - 10} ${cx - 50} ${cy + 34} Q${cx - 38} ${cy + 14} ${cx - 22} ${cy + 2} Z"/>`;
      front = `<path class="o" fill="${hc}" d="M${cx - 29} ${cy + 6} Q${cx - 34} ${cy - 39} ${cx + 2} ${cy - 38} Q${cx + 28} ${cy - 36} ${cx + 28} ${cy - 12} Q${cx + 12} ${cy - 22} ${cx - 4} ${cy - 16} Q${cx - 10} ${cy - 2} ${cx - 16} ${cy + 6} Q${cx - 22} ${cy + 14} ${cx - 29} ${cy + 6} Z"/><circle class="k" cx="${cx - 24}" cy="${cy - 12}" r="4"/>`;
    } else if (hair === 'old') front = `<path class="o" d="M${cx - 29} ${cy + 10} Q${cx - 34} ${cy - 16} ${cx - 18} ${cy - 26} Q${cx - 12} ${cy - 6} ${cx - 16} ${cy + 10} Z"/><path class="h" d="M${cx - 26} ${cy - 8} l6 4"/>`;
    const ear = `<ellipse class="o" cx="${cx - 9}" cy="${cy + 4}" rx="5.5" ry="8.5"/>`;
    const eye = `<ellipse class="k" cx="${cx + 14}" cy="${cy}" rx="2.8" ry="3.8"/><path class="h" d="M${cx + 8} ${cy - 9} q6 -4 12 0"/>`;
    const m = mouth === 'open' ? `<path class="k" d="M${cx + 12} ${cy + 17} Q${cx + 20} ${cy + 19} ${cx + 25} ${cy + 15} Q${cx + 24} ${cy + 26} ${cx + 17} ${cy + 25} Q${cx + 12} ${cy + 24} ${cx + 12} ${cy + 17} Z"/>` : `<path class="t" d="M${cx + 13} ${cy + 18} q7 4 12 -1"/>`;
    const gl = glasses ? `<circle class="o" fill="none" cx="${cx + 15}" cy="${cy}" r="9"/><path class="t" d="M${cx + 6} ${cy - 1} L${cx - 4} ${cy - 3}"/>` : '';
    return `${back}${nose}<ellipse class="o" cx="${cx}" cy="${cy}" rx="27" ry="34"/>${front}${hair === 'bob' ? '' : ear}${eye}${m}${gl}`;
  };
  const torso = (top, bot, w0, w1, cx = 0) => `M${cx - w0} ${top + 16} Q${cx - w0 + 3} ${top} ${cx} ${top} Q${cx + w0 - 3} ${top} ${cx + w0} ${top + 16} L${cx + w1} ${bot} L${cx - w1} ${bot} Z`;
  return { grp, head, side, torso };
}

export default function draw(kit) {
  const { add, shade, limb, hand, shoe, tone, pat, clip, f, W, H } = kit;
  const { grp, head, torso } = people(kit);

  const D = {
    ground: `M0 430 H${W} V${H} H0 Z`,
    shop: 'M636 250 H800 V550 H636 Z',
    crown: 'M650 254 Q616 244 622 210 Q600 180 628 154 Q624 116 662 108 Q678 74 722 82 Q758 62 786 92 Q826 96 828 134 Q856 164 832 200 Q840 240 800 248 Q770 270 732 256 Q690 270 650 254 Z',
    car: 'M118 534 L118 490 Q118 462 150 458 L196 452 L228 398 Q234 388 250 388 L336 388 Q350 388 358 400 L384 452 Q404 458 404 486 L404 534 Z',
    pump: 'M120 548 L120 316 Q120 300 136 300 L176 300 Q192 300 192 316 L192 548 Z',
    roof: 'M86 64 H632 V124 H86 Z',
    jacket: 'M-33 -330 Q-30 -346 0 -346 Q30 -346 33 -330 L38 -176 L-38 -176 Z'
  };

  add(`<path class="o" fill="${tone(0.32)}" d="${D.crown}"/>
${shade([{ lin: [710, 0, 840, 0], s: [0, 0.45] }], D.crown)}
<path class="h" d="M650 164 q10 -8 20 0 M710 114 q10 -8 20 0 M770 154 q10 -8 20 0 M690 204 q10 -8 20 0 M780 214 q10 -8 20 0"/>`);

  add(`<path class="o" fill="${tone(0.1)}" d="${D.ground}"/>
${shade([{ lin: [0, 430, 0, 480], s: [0.25, 0] }], D.ground)}
<path class="h" stroke="#9a9a9a" d="M0 584 H${W} M60 430 L20 600 M330 430 L320 600 M600 430 L620 600"/>`);

  add(shade([{ rad: [730, 554, 100, 8], s: 0.7 }]));
  add(`<path class="o" fill="${tone(0.08)}" d="${D.shop}"/>
${shade([{ lin: [720, 0, 800, 0], s: [0, 0.4] }], D.shop)}
<rect class="o" fill="${tone(0.5)}" x="628" y="236" width="180" height="22"/>
<rect class="o" fill="${tone(0.16)}" x="648" y="290" width="96" height="140"/>`);
  add(`<g ${clip('M648 290 H744 V430 H648 Z')}>${grp(`<path class="o" fill="${pat('stV')}" d="${torso(-130, 40, 34, 40)}"/><rect class="o" x="-6" y="-146" width="12" height="18"/>${head(0, -176, { hair: 'bob' })}`, 696, 426, 0.66)}</g>
<path class="o" fill="${tone(0.4)}" d="M648 410 H744 V430 H648 Z"/>
<rect class="o" fill="none" x="648" y="290" width="96" height="140"/>
<path class="w" d="M656 300 l16 16 M720 300 l14 14" stroke-width="3"/>
<rect class="o" fill="${tone(0.16)}" x="756" y="300" width="40" height="250"/>
<circle class="k" cx="766" cy="430" r="3"/>`);

  add(shade([{ rad: [62, 550, 34, 6], s: 0.6 }]));
  add(`<path class="k" d="M44 220 h16 v330 h-16 Z"/>
<rect class="o" fill="#2a2a2a" x="10" y="80" width="84" height="146" rx="8"/>
<path class="o" d="M32 200 V114 Q32 106 40 106 H62 Q70 106 70 114 V200 Z"/>
<rect class="k" x="38" y="114" width="26" height="22"/>
<path class="t" stroke-width="4" d="M70 126 h10 v50 q0 8 -6 8"/>
<rect class="o" x="26" y="198" width="50" height="10"/>`);

  add(`<path class="o" fill="${tone(0.15)}" d="M210 124 h12 v300 h-12 Z M500 124 h12 v300 h-12 Z"/>
<path class="o" fill="${tone(0.08)}" d="${D.roof}"/>
${shade([{ lin: [360, 0, 632, 0], s: [0, 0.35] }], D.roof)}
<path class="o" fill="${tone(0.6)}" d="M86 104 H632 V124 H86 Z"/>`);

  add(shade([{ rad: [170, 552, 50, 7], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.42)}" d="${D.pump}"/>
${shade([{ lin: [156, 0, 192, 0], s: [0, 0.4] }], D.pump)}
<rect class="o" x="132" y="316" width="48" height="38" rx="4"/>
<path class="h" d="M140 328 h32 M140 340 h20"/>
<rect class="o" fill="${tone(0.7)}" x="170" y="372" width="18" height="40" rx="3"/>
<path class="o" fill="${tone(0.2)}" d="M112 548 H200 V534 H112 Z"/>`);

  add(shade([{ rad: [380, 556, 200, 11], s: 0.75 }]));
  const car = `<path class="o" d="${D.car}"/>
${shade([{ lin: [250, 0, 118, 0], s: [0, 0.35] }], D.car)}
<path class="o" fill="${tone(0.16)}" d="M204 452 L232 404 Q236 398 244 398 L286 398 L286 452 Z"/>
<path class="o" fill="${tone(0.16)}" d="M298 452 L298 398 L334 398 Q342 398 346 406 L368 452 Z"/>
<g ${clip('M298 452 L298 398 L334 398 Q342 398 346 406 L368 452 Z')}>
<path class="o" fill="${tone(0.8)}" d="M304 462 Q300 430 320 420 Q344 414 352 440 L356 462 Z"/>
</g>
<path class="o" fill="${tone(0.8)}" d="M296 440 Q284 418 304 404 Q318 394 330 404 Q342 416 334 434 Q330 446 314 448 Z"/>
<path class="o" fill="${tone(0.95)}" d="M310 408 Q300 398 294 410 Q288 428 300 438 Q304 424 310 408 Z"/>
<path class="o" d="M298 428 Q282 428 280 438 Q282 448 298 446 Q308 446 310 438 Z"/>
<ellipse class="k" cx="282" cy="436" rx="4.5" ry="3.5"/>
<circle class="k" cx="314" cy="418" r="3.2"/>
<path class="o" fill="${tone(0.9)}" d="M300 445 q2 10 8 8 l1 -8 Z"/>
<path class="t" d="M126 476 H398 M292 460 V524 M206 462 L210 524"/>
<path class="o" d="M118 478 Q118 468 130 466 L140 466 L140 484 Z"/>
<path class="o" fill="${tone(0.5)}" d="M394 468 h10 v18 h-10 Z"/>
<rect class="o" fill="${tone(0.3)}" x="370" y="482" width="20" height="16" rx="3"/>
<path class="k" d="M162 534 a32 32 0 0 1 64 0 Z M310 534 a32 32 0 0 1 64 0 Z"/>
<circle class="k" cx="194" cy="536" r="26"/><circle class="o" cx="194" cy="536" r="11"/>
<circle class="k" cx="342" cy="536" r="26"/><circle class="o" cx="342" cy="536" r="11"/>`;
  add(grp(car, 684.6, -112.4, 1.2, true));

  add(`<path class="t" stroke="#111" stroke-width="5" d="M182 410 Q190 520 214 512 Q228 508 228 488"/>
<path class="k" d="M216 470 L240 474 L238 488 L222 488 Q214 486 216 470 Z"/>`);

  add(shade([{ rad: [596, 564, 50, 7], s: 0.7 }]));
  const dr = `${limb([[-15, -186], [-15, -14]], 25, 20, tone(0.75))}
${limb([[15, -186], [15, -14]], 25, 20, tone(0.75))}
${shoe(-16, 0, -1)}${shoe(16, 0)}
<path class="o" fill="${tone(0.55)}" d="${D.jacket}"/>
${shade([{ lin: [0, 0, 38, 0], s: [0, 0.4] }], D.jacket)}
<path class="t" d="M0 -340 V-176"/>
<path class="k" d="M-38 -190 H38 L38 -176 H-38 Z"/>
<path class="o" fill="${tone(0.55)}" d="M-14 -346 L0 -330 L14 -346 Z"/>
<rect class="o" x="-6" y="-362" width="12" height="18"/>
${head(0, -392, { hair: 'man', look: -4 })}
<path class="o" fill="${pat('stH')}" d="M-30 -404 Q-32 -436 0 -436 Q32 -436 30 -404 Z"/>
<path class="k" d="M-30 -406 Q-50 -406 -62 -398 Q-48 -394 -30 -398 Z"/>
${limb([[-28, -326], [-42, -262], [-44, -200]], 20, 16, tone(0.55))}
${hand(-44, -194, 5)}
${limb([[28, -326], [52, -270], [40, -236]], 20, 16, tone(0.55))}
<path class="o" d="M22 -270 L54 -270 L50 -224 L26 -224 Z"/>
<path class="t" d="M54 -262 q12 2 8 16 q-2 6 -10 6"/>
<path class="o" fill="${tone(0.6)}" d="M24 -258 H52 V-246 H24 Z"/>
${hand(38, -232, -60)}`;
  add(grp(dr, 594, 564, 0.72));
}
