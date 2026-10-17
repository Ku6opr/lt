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
  const { grp, head, side, torso } = people(kit);

  const D = {
    walk: `M0 452 H${W} V${H} H0 Z`,
    train: 'M236 452 L236 300 Q240 196 330 176 L830 176 L830 452 Z',
    coat: 'M-33 -330 Q-30 -346 0 -346 Q30 -346 33 -330 L46 -150 L-46 -150 Z',
    suit: 'M-150 -150 H-72 V-14 H-150 Z'
  };

  add(`<path class="o" fill="${tone(0.06)}" d="M0 200 H120 V452 H0 Z M130 250 H230 V452 H130 Z"/>
<path class="h" d="M16 220 h24 v30 h-24 Z M64 220 h24 v30 h-24 Z M16 280 h24 v30 h-24 Z M64 280 h24 v30 h-24 Z M16 340 h24 v30 h-24 Z M64 340 h24 v30 h-24 Z M150 270 h22 v28 h-22 Z M190 270 h22 v28 h-22 Z M150 324 h22 v28 h-22 Z M190 324 h22 v28 h-22 Z"/>`);

  const winX = [376, 476, 686];
  add(`<path class="o" d="${D.train}"/>
<path class="o" fill="${tone(0.55)}" d="M236 330 H830 V352 H236 Z"/>
<path class="o" fill="${tone(0.16)}" d="M256 290 Q262 214 330 198 L352 198 L352 290 Z"/>
${winX.map((x) => `<rect class="o" fill="${tone(0.14)}" x="${x}" y="206" width="84" height="86" rx="6"/>`).join('')}
<rect class="o" fill="${tone(0.14)}" x="786" y="206" width="60" height="86" rx="6"/>`);
  const pas = [
    [418, { hair: 'man' }],
    [518, { hair: 'bob' }],
    [728, { hair: 'old', glasses: true }]
  ];
  pas.forEach(([x, o], i) => {
    add(`<g ${clip(`M${winX[i]} 206 h84 v86 h-${84} Z`)}>${grp(`<path class="o" fill="${tone(0.5 + i * 0.15)}" d="${torso(-14, 80, 34, 40)}"/><rect class="o" x="-6" y="-26" width="12" height="16"/>${head(0, -56, o)}`, x, 298, 0.56)}</g>`);
  });
  add(`${shade([{ lin: [520, 0, 830, 0], s: [0, 0.4] }], D.train)}
<path class="w" d="M386 214 l20 20 M486 214 l20 20 M696 214 l20 20" stroke-width="3"/>
<rect class="o" fill="${tone(0.3)}" x="582" y="196" width="82" height="256"/>
<rect class="o" fill="${tone(0.14)}" x="592" y="210" width="26" height="90" rx="4"/><rect class="o" fill="${tone(0.14)}" x="628" y="210" width="26" height="90" rx="4"/>
<path class="t" d="M623 196 V452"/>
<ellipse class="o" cx="256" cy="400" rx="10" ry="13"/>
<path class="t" d="M236 430 H830"/>`);

  add(`<path class="o" fill="${tone(0.1)}" d="${D.walk}"/>
<path class="o" fill="${pat('dense')}" d="M0 452 H${W} V470 H0 Z"/>
<path class="h" stroke="#9a9a9a" d="M0 510 H${W} M0 560 H${W} M70 470 L60 510 M200 470 L194 510 M330 470 L330 510 M460 470 L464 510 M590 470 L598 510 M720 470 L732 510 M130 510 L118 560 M270 510 L264 560 M410 510 L410 560 M550 510 L556 560 M690 510 L700 560 M60 560 L44 600 M220 560 L212 600 M380 560 L380 600 M540 560 L546 600 M700 560 L712 600"/>
${shade([{ lin: [0, 470, 0, 520], s: [0.35, 0] }], D.walk)}`);

  add(`<path class="o" fill="${tone(0.5)}" d="M0 0 H${W} V30 H0 Z"/>
<path class="k" d="M0 30 H${W} V38 H0 Z"/>
<path class="k" d="M176 38 h8 v40 h-8 Z"/>
<circle class="o" fill="${tone(0.4)}" cx="180" cy="124" r="50"/>
<circle class="o" cx="180" cy="124" r="40"/>
${Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  const r0 = i % 3 ? 33 : 29;
  return `M${f(180 + Math.sin(a) * r0)} ${f(124 - Math.cos(a) * r0)} L${f(180 + Math.sin(a) * 37)} ${f(124 - Math.cos(a) * 37)}`;
}).reduce((s, d) => s + d + ' ', '<path class="t" d="') + '"/>'}
<path class="t" stroke-width="4" d="M180 124 L180 98 M180 124 L198 132"/>
<circle class="k" cx="180" cy="124" r="4"/>`);

  add(shade([{ rad: [120, 578, 110, 9], s: 0.7 }]));
  const S = 0.82;
  const wm = `<path class="t" stroke-width="5" d="M-118 -150 L-110 -214 M-102 -150 L-94 -214"/>
<path class="k" d="M-116 -220 h26 v9 h-26 Z"/>
<path class="o" fill="${pat('check')}" d="${D.suit}"/>
${shade([{ lin: [-110, 0, -72, 0], s: [0, 0.4] }], D.suit)}
<path class="t" d="M-150 -110 H-72"/>
<circle class="k" cx="-140" cy="-8" r="7"/><circle class="k" cx="-82" cy="-8" r="7"/>
${limb([[-14, -160], [-15, -14]], 20, 16)}
${limb([[14, -160], [15, -14]], 20, 16)}
${shoe(-16, 0, -1)}${shoe(16, 0)}
<path class="o" fill="${tone(0.45)}" d="${D.coat}"/>
${shade([{ lin: [0, 0, 46, 0], s: [0, 0.4] }], D.coat)}
<path class="k" d="M-42 -236 H42 L43 -224 H-43 Z"/>
<circle class="k" cx="0" cy="-300" r="3.5"/><circle class="k" cx="0" cy="-270" r="3.5"/><circle class="k" cx="0" cy="-200" r="3.5"/>
<rect class="o" x="-6" y="-362" width="12" height="18"/>
${head(0, -392, { hair: 'bob', look: 6 })}
<circle class="o" fill="${tone(0.7)}" cx="0" cy="-458" r="11"/>
<path class="o" fill="${pat('stV')}" d="M-31 -412 Q-33 -452 0 -452 Q33 -452 31 -412 Z"/>
<rect class="o" fill="${tone(0.7)}" x="-35" y="-418" width="70" height="14" rx="5"/>
${limb([[-28, -326], [-60, -270], [-98, -222]], 20, 16, tone(0.45))}
${hand(-100, -216, 60)}
${limb([[28, -326], [44, -266], [58, -300]], 20, 16, tone(0.45))}
<path class="o" d="M52 -350 L86 -340 L80 -306 L46 -316 Z"/>
<path class="h" d="M56 -340 L78 -334 M54 -330 L66 -327"/>
<path class="k" d="M70 -318 l8 2 l-1 6 l-8 -2 Z"/>
${hand(58, -306, -20)}`;
  add(grp(wm, 168, 578, S));

  add(shade([{ rad: [584, 566, 70, 8], s: 0.7 }]));
  const S2 = 0.8;
  const tb = limb([[10, -320], [-2, -190]], 62, 54, tone(0.3));
  const run = `${limb([[-4, -186], [-30, -110], [-76, -86]], 22, 18, tone(0.75))}
<g transform="rotate(-36 -82 -74)">${shoe(-82, -66, 1)}</g>
<path class="o" fill="${tone(0.85)}" d="M-50 -322 Q-52 -350 -26 -350 L-4 -348 L-10 -232 L-44 -234 Q-56 -236 -54 -250 Z"/>
<path class="h" d="M-46 -290 L-12 -288"/>
${limb([[2, -188], [32, -116], [42, -16]], 22, 18, tone(0.75))}
${shoe(46, 0, 1)}
${tb}
${shade([{ lin: [0, 0, 36, 0], s: [0, 0.4] }], tb.match(/ d="([^"]+)"/)[1])}
<path class="t" stroke-width="5" d="M0 -342 Q10 -300 -6 -256"/>
<rect class="o" x="6" y="-366" width="13" height="18" transform="rotate(14 12 -357)"/>
${side(22, -392, { hair: 'man' })}
${limb([[16, -318], [44, -268], [72, -290]], 19, 15, tone(0.3))}
${hand(76, -294, -30)}`;
  add(grp(run, 572, 566, S2));
}
