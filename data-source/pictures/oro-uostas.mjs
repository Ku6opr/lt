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
  const { add, shade, floor, limb, hand, shoe, tone, pat, clip, f, W, H } = kit;
  const { grp, head, side, torso } = people(kit);

  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    glass: 'M40 36 H760 V362 H40 Z',
    body: 'M96 262 Q70 262 72 240 Q78 206 130 200 L560 200 L652 190 Q660 192 654 202 L604 248 Q590 262 560 262 Z',
    tail: 'M548 202 L592 112 L628 112 L650 194 Z',
    suit: 'M650 446 H730 V566 H650 Z'
  };

  add(shade([{ lin: [0, 0, 800, 0], s: [0, 0.25] }], D.wall));
  add(`<rect class="o" fill="${tone(0.3)}" x="24" y="20" width="752" height="358"/>
<path class="o" d="${D.glass}"/>
<g ${clip(D.glass)}>
<path class="o" fill="${tone(0.25)}" d="M30 300 H770 V370 H30 Z"/>
<path class="w" d="M60 336 h50 M170 336 h50 M280 336 h50 M390 336 h50 M500 336 h50 M610 336 h50 M720 336 h50" stroke-width="3"/>
${shade([{ rad: [360, 302, 260, 8], s: 0.6 }])}
<path class="k" d="M160 262 h7 v28 h-7 Z M410 262 h7 v28 h-7 Z M450 262 h7 v28 h-7 Z"/>
<circle class="k" cx="163" cy="292" r="10"/><circle class="k" cx="414" cy="292" r="10"/><circle class="k" cx="454" cy="292" r="10"/>
<path class="o" d="${D.tail}"/>
<path class="o" d="${D.body}"/>
${shade([{ lin: [0, 200, 0, 262], s: [0, 0.45] }], D.body)}
<path class="o" fill="${tone(0.5)}" d="M560 208 L614 198 L640 212 L572 218 Z"/>
<path class="o" fill="${tone(0.5)}" d="M286 244 L470 244 L520 276 L330 276 Z"/>
<rect class="o" fill="${tone(0.35)}" x="320" y="262" width="76" height="30" rx="14"/>
<path class="k" d="M86 222 Q92 210 112 208 L114 222 Z"/>
${Array.from({ length: 16 }, (_, i) => `<circle class="k" cx="${150 + i * 25}" cy="222" r="5"/>`).join('')}
<path class="t" d="M80 244 H596"/>
<path class="h" d="M150 206 v52 M178 206 v52"/>
<g transform="rotate(-12 650 90)">
<path class="o" d="M600 96 Q596 84 612 82 L700 82 Q712 84 712 92 L716 100 L604 100 Z"/>
<path class="o" d="M690 82 L708 56 L718 56 L716 84 Z"/>
<path class="o" fill="${tone(0.4)}" d="M640 92 L676 92 L652 120 L636 120 Z"/>
${[620, 634, 648, 662, 676].map((x) => `<circle class="k" cx="${x}" cy="89" r="2.5"/>`).join('')}
</g>
<path class="o" d="M120 92 q-24 0 -24 -16 q0 -18 22 -16 q6 -20 32 -18 q22 -14 40 4 q24 -2 24 20 q0 12 -20 12 Z"/>
<path class="o" d="M420 70 q-18 0 -18 -12 q0 -14 18 -12 q6 -16 28 -12 q20 -6 24 10 q16 0 16 14 q0 12 -16 12 Z"/>
</g>
<path class="o" fill="${tone(0.3)}" d="M272 36 h12 v326 h-12 Z M516 36 h12 v326 h-12 Z"/>
<rect class="o" x="16" y="370" width="768" height="14"/>`);

  add(floor({ top: 400, vp: [400, 150], step: 80 }));
  add(shade([{ lin: [0, 400, 0, 440], s: [0.35, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(shade([{ rad: [180, 552, 150, 10], s: 0.7 }]));
  add(`<path class="k" d="M40 476 H306 V486 H40 Z M64 486 h9 v60 h-9 Z M164 486 h9 v60 h-9 Z M272 486 h9 v60 h-9 Z"/>
<path class="k" d="M54 546 h28 v6 h-28 Z M154 546 h28 v6 h-28 Z M262 546 h28 v6 h-28 Z"/>
${[44, 132, 220].map((x) => `<rect class="o" fill="${tone(0.6)}" x="${x}" y="376" width="80" height="84" rx="10"/>`).join('')}
${[44, 132, 220].map((x) => `<rect class="o" fill="${tone(0.6)}" x="${x - 4}" y="452" width="88" height="24" rx="8"/>`).join('')}
${shade([{ lin: [180, 0, 306, 0], s: [0, 0.3] }], 'M40 376 H306 V476 H40 Z')}`);

  const wm = `<path class="o" fill="${tone(0.35)}" d="${torso(-205, -6, 34, 38)}"/>
<path class="o" fill="${tone(0.85)}" d="M-40 -22 H40 L42 14 L-42 14 Z"/>
${limb([[-20, 8], [-22, 118]], 20, 16)}
${limb([[20, 8], [22, 118]], 20, 16)}
${shoe(-24, 132, -1)}${shoe(24, 132)}
<rect class="o" x="-6" y="-222" width="12" height="18"/>
${head(0, -252, { hair: 'bob' })}
${limb([[-30, -190], [-46, -130], [-34, -100]], 19, 15, tone(0.35))}
${limb([[30, -190], [46, -130], [34, -100]], 19, 15, tone(0.35))}
<path class="o" fill="${tone(0.7)}" d="M-44 -150 L0 -140 L44 -150 L44 -86 L0 -78 L-44 -86 Z"/>
<path class="o" d="M-38 -144 L0 -134 L38 -144 L38 -92 L0 -84 L-38 -92 Z"/>
<path class="t" d="M0 -134 V-84"/>
<path class="h" d="M-32 -130 L-8 -124 M-32 -120 L-8 -114 M-32 -110 L-8 -104 M8 -124 L32 -130 M8 -114 L32 -120 M8 -104 L32 -110"/>
${hand(-36, -100, 20)}${hand(36, -100, -20)}`;
  add(grp(wm, 84, 456, 0.78));

  add(shade([{ rad: [354, 566, 50, 7], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.5)}" d="M318 566 L318 500 Q318 470 350 470 Q382 470 382 500 L384 566 Z"/>
${shade([{ lin: [350, 0, 384, 0], s: [0, 0.4] }], 'M318 566 L318 500 Q318 470 350 470 Q382 470 382 500 L384 566 Z')}
<path class="o" fill="${tone(0.7)}" d="M326 522 H376 V552 H326 Z"/>
<path class="t" d="M340 472 Q350 456 362 472"/>`);

  add(shade([{ rad: [610, 578, 130, 10], s: 0.7 }]));
  add(`<path class="t" stroke-width="5" d="M676 446 V398 M704 446 V398"/>
<path class="k" d="M670 392 h40 v9 h-40 Z"/>
<rect class="o" fill="#2a2a2a" x="650" y="446" width="80" height="120" rx="8"/>
<path class="w" d="M662 470 V550 M690 470 V550 M718 470 V550"/>
<circle class="k" cx="664" cy="572" r="7"/><circle class="k" cx="716" cy="572" r="7"/>`);

  const tb = limb([[2, -330], [0, -178]], 64, 60, tone(0.5));
  const man = `${limb([[-6, -186], [-10, -14]], 24, 19, tone(0.8))}
${shoe(-6, 0, 1)}
${limb([[6, -186], [12, -14]], 24, 19, tone(0.8))}
${shoe(18, 0, 1)}
${tb}
${shade([{ lin: [0, 0, 32, 0], s: [0, 0.35] }], tb.match(/ d="([^"]+)"/)[1])}
<rect class="o" x="-4" y="-366" width="13" height="20"/>
${side(4, -392, { hair: 'man' })}
<path class="o" fill="${pat('check')}" d="M-26 -404 Q-28 -436 6 -436 Q34 -434 32 -410 Z"/>
<path class="k" d="M24 -412 Q48 -414 58 -406 Q46 -402 22 -404 Z"/>
${limb([[4, -320], [26, -262], [58, -270]], 20, 16, tone(0.5))}
<path class="o" fill="${tone(0.95)}" d="M54 -306 L84 -300 L80 -258 L50 -264 Z"/>
<path class="h" d="M60 -292 l16 3"/>
<path class="o" d="M62 -296 L102 -290 L98 -268 L58 -274 Z"/>
<path class="k" d="M88 -288 l8 1 l-1 16 l-8 -1 Z"/>
${hand(62, -270, -60)}`;
  add(grp(man, 560, 578, 0.86, true));
}
