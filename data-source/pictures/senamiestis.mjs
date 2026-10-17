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
  const { add, def, shade, limb, hand, shoe, tone, pat, clip, f, W, H } = kit;
  const { grp, side, torso } = people(kit);

  def(`<pattern id="snCobble" width="30" height="20" patternUnits="userSpaceOnUse"><rect width="30" height="20" fill="#fff"/><rect x="1.5" y="1.5" width="12" height="7" rx="3.5" fill="none" stroke="#8a8a8a" stroke-width="1.3"/><rect x="16.5" y="1.5" width="12" height="7" rx="3.5" fill="none" stroke="#8a8a8a" stroke-width="1.3"/><rect x="-6" y="11.5" width="12" height="7" rx="3.5" fill="none" stroke="#8a8a8a" stroke-width="1.3"/><rect x="9" y="11.5" width="12" height="7" rx="3.5" fill="none" stroke="#8a8a8a" stroke-width="1.3"/><rect x="24" y="11.5" width="12" height="7" rx="3.5" fill="none" stroke="#8a8a8a" stroke-width="1.3"/></pattern>`);

  const D = {
    hill: 'M180 452 Q250 300 400 278 Q560 296 640 452 Z',
    tower: 'M360 290 L362 150 L448 150 L450 290 Z',
    street: `M0 440 H${W} V${H} H0 Z`,
    hA: 'M0 450 L0 150 L60 90 L124 150 L124 450 Z',
    hB: 'M124 450 L124 200 L144 200 L144 180 L164 180 L164 160 L196 160 L196 180 L216 180 L216 200 L236 200 L236 450 Z',
    hC: 'M590 450 L590 190 L660 120 L730 190 L730 450 Z',
    hD: 'M730 450 L730 160 L800 160 L800 450 Z'
  };

  const bird = (x, y, s = 1) => `<path class="t" d="M${x - 14 * s} ${y} q${7 * s} ${-9 * s} ${14 * s} 0 q${7 * s} ${-9 * s} ${14 * s} 0"/>`;
  add(bird(520, 96), bird(566, 70, 0.9), bird(600, 108, 0.8));
  add(`<path class="o" d="M230 70 q-24 0 -24 -14 q0 -18 24 -16 q6 -18 32 -16 q22 -10 36 6 q20 0 20 18 q0 22 -20 22 Z"/>`);

  add(`<path class="o" fill="${pat('grass')}" d="${D.hill}"/>
${shade([{ lin: [400, 0, 640, 0], s: [0, 0.4] }], D.hill)}
<path class="o" fill="${pat('brick')}" d="M300 300 H362 V256 H300 Z"/>
<path class="k" d="M300 256 v-12 h10 v12 Z M318 256 v-12 h10 v12 Z M336 256 v-12 h10 v12 Z"/>
<path class="o" fill="${pat('brick')}" d="${D.tower}"/>
${shade([{ lin: [400, 0, 450, 0], s: [0, 0.5] }], D.tower)}
<path class="o" fill="${pat('brick')}" d="M354 150 H456 V130 H354 Z"/>
<path class="o" d="M354 130 v-16 h14 v16 Z M378 130 v-16 h14 v16 Z M402 130 v-16 h14 v16 Z M426 130 v-16 h14 v16 Z M442 130 v-16 h14 v16 Z"/>
<path class="k" d="M384 214 Q384 196 396 196 Q408 196 408 214 V236 H384 Z M414 170 Q414 160 422 160 Q430 160 430 170 V184 H414 Z M376 170 Q376 160 384 160 Q392 160 392 170 V184 H376 Z"/>`);

  add(`<path class="o" fill="url(#snCobble)" d="${D.street}"/>
${shade([{ lin: [0, 440, 0, 500], s: [0.35, 0.05] }], D.street)}`);

  const win = (x, y, w = 30, h = 46) => `<path class="o" fill="${tone(0.16)}" d="M${x} ${y + h} V${y + w / 2} Q${x} ${y} ${x + w / 2} ${y} Q${x + w} ${y} ${x + w} ${y + w / 2} V${y + h} Z"/><path class="t" d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h * 0.55} H${x + w}"/><rect class="o" x="${x - 4}" y="${y + h}" width="${w + 8}" height="7"/>`;
  add(`<path class="o" fill="${tone(0.22)}" d="${D.hA}"/>
${shade([{ lin: [60, 0, 124, 0], s: [0, 0.4] }], D.hA)}
${win(16, 170)}${win(76, 170)}${win(16, 260)}${win(76, 260)}${win(46, 106, 26, 30)}
<path class="o" fill="${tone(0.5)}" d="M30 450 V384 Q30 354 60 354 Q90 354 90 384 V450 Z"/>
<path class="t" d="M60 354 V450"/><circle class="k" cx="52" cy="408" r="3"/><circle class="k" cx="68" cy="408" r="3"/>
<path class="o" fill="${tone(0.08)}" d="${D.hB}"/>
${shade([{ lin: [180, 0, 236, 0], s: [0, 0.4] }], D.hB)}
${win(140, 220)}${win(190, 220)}${win(140, 300)}${win(190, 300)}${win(166, 380, 30, 60)}
<path class="o" fill="${tone(0.08)}" d="${D.hD}"/>
${shade([{ lin: [760, 0, 800, 0], s: [0, 0.4] }], D.hD)}
${win(752, 190)}${win(752, 280)}${win(752, 370)}
<path class="o" fill="${tone(0.28)}" d="${D.hC}"/>
${shade([{ lin: [660, 0, 730, 0], s: [0, 0.45] }], D.hC)}
${win(610, 210)}${win(678, 210)}${win(610, 300)}${win(678, 300)}${win(646, 140, 28, 34)}
<path class="o" fill="${tone(0.55)}" d="M620 450 V396 Q620 372 646 372 Q672 372 672 396 V450 Z"/>
<path class="t" d="M646 372 V450"/>
<rect class="o" x="-6" y="446" width="248" height="10"/>
<rect class="o" x="584" y="446" width="222" height="10"/>`);

  add(`<g transform="translate(168 0)">${shade([{ rad: [548, 512, 30, 5], s: 0.6 }])}<path class="k" d="M532 512 h20 v-6 h-4 v-180 h-12 v180 h-4 Z"/>
<path class="k" d="M528 326 h28 l-4 -8 h-20 Z"/>
<path class="o" fill="${tone(0.1)}" d="M526 318 L522 276 L562 276 L558 318 Z"/>
<path class="t" d="M542 276 V318"/>
<path class="k" d="M516 276 L568 276 L558 262 L526 262 Z"/>
<path class="k" d="M538 262 h8 v-10 h-8 Z"/></g>`);

  add(shade([{ rad: [260, 578, 70, 8], s: 0.7 }]));
  const tb = limb([[2, -330], [0, -178]], 64, 60, pat('check'));
  const man = `${limb([[-6, -186], [-16, -14]], 24, 19, tone(0.8))}
${shoe(-12, 0, 1)}
${limb([[6, -186], [14, -14]], 24, 19, tone(0.8))}
${shoe(20, 0, 1)}
${tb}
${shade([{ lin: [0, 0, 32, 0], s: [0, 0.4] }], tb.match(/ d="([^"]+)"/)[1])}
<rect class="o" x="-4" y="-366" width="13" height="20"/>
${side(4, -394, { hair: 'man' })}
${limb([[4, -322], [16, -280], [38, -380]], 20, 16, pat('check'))}
<rect class="k" x="26" y="-418" width="44" height="30" rx="5"/>
<circle class="o" cx="60" cy="-403" r="10"/>
<circle class="k" cx="60" cy="-403" r="5"/>
<rect class="o" fill="${tone(0.4)}" x="30" y="-426" width="14" height="8"/>
${hand(40, -388, 10)}`;
  add(grp(man, 252, 578, 0.86));

  add(shade([{ rad: [604, 580, 70, 8], s: 0.7 }]));
  const wm = `<path class="o" fill="${tone(0.75)}" d="M-50 -320 Q-52 -346 -26 -346 L-6 -344 L-12 -230 L-44 -232 Q-56 -234 -54 -248 Z"/>
${limb([[-6, -186], [-12, -14]], 22, 17)}
${shoe(-8, 0, 1)}
${limb([[6, -186], [12, -14]], 22, 17)}
${shoe(18, 0, 1)}
<path class="o" fill="${tone(0.42)}" d="M-26 -332 Q-20 -346 4 -346 Q28 -344 30 -326 L44 -150 L-40 -150 Z"/>
${shade([{ lin: [0, 0, 44, 0], s: [0, 0.4] }], 'M-26 -332 Q-20 -346 4 -346 Q28 -344 30 -326 L44 -150 L-40 -150 Z')}
<path class="t" stroke-width="5" d="M-10 -344 Q-4 -300 -16 -250"/>
<rect class="o" x="-4" y="-366" width="13" height="20"/>
${side(4, -394, { hair: 'bob' })}
${limb([[8, -322], [30, -270], [56, -262]], 19, 15, tone(0.42))}
<path class="o" d="M46 -330 L92 -340 L100 -256 L54 -246 Z"/>
<path class="o" fill="${tone(0.15)}" d="M92 -340 L136 -330 L142 -246 L100 -256 Z"/>
<path class="h" d="M60 -300 Q76 -312 86 -296 Q94 -284 116 -300 Q128 -308 134 -292 M62 -276 L90 -282 M106 -270 L132 -264"/>
<path class="k" d="M84 -300 l6 -4 l6 4 l-6 8 Z"/>
${hand(58, -260, -30)}${hand(132, -250, 30)}`;
  add(grp(wm, 612, 580, 0.84, true));
}
