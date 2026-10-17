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
  const { add, shade, limb, hand, shoe, tone, pat, W, H } = kit;
  const { grp, head, torso } = people(kit);

  const cloud = (x, y, s) => `<path class="o" d="M${x} ${y} q${-30 * s} 0 ${-30 * s} ${-20 * s} q0 ${-22 * s} ${28 * s} ${-20 * s} q${8 * s} ${-26 * s} ${40 * s} ${-22 * s} q${26 * s} ${-18 * s} ${50 * s} ${4 * s} q${30 * s} ${-2 * s} ${30 * s} ${24 * s} q0 ${14 * s} ${-24 * s} ${14 * s} Z"/>`;
  add(cloud(96, 88, 1.0), cloud(404, 62, 0.8));

  const D = {
    road: `M0 404 H${W} V482 H0 Z`,
    walk: `M0 494 H${W} V${H} H0 Z`,
    crown: 'M150 268 Q112 262 116 226 Q92 200 116 172 Q108 132 148 120 Q160 84 200 92 Q232 66 262 92 Q300 88 308 124 Q342 140 330 176 Q350 206 326 232 Q328 266 290 270 Q262 292 226 276 Q186 292 150 268 Z',
    bus: 'M452 450 L452 214 Q452 176 492 174 L830 174 L830 450 Z',
    coat: 'M-33 -330 Q-30 -346 0 -346 Q30 -346 33 -330 L46 -128 L-46 -128 Z'
  };

  add(`<path class="o" fill="${tone(0.08)}" d="M0 250 H90 V404 H0 Z M96 300 H180 V404 H96 Z"/>
<path class="h" d="M14 272 h22 v26 h-22 Z M52 272 h22 v26 h-22 Z M14 322 h22 v26 h-22 Z M52 322 h22 v26 h-22 Z M14 370 h22 v26 h-22 Z M52 370 h22 v26 h-22 Z M112 320 h20 v24 h-20 Z M146 320 h20 v24 h-20 Z M112 360 h20 v24 h-20 Z M146 360 h20 v24 h-20 Z"/>
<path class="o" fill="${tone(0.08)}" d="M300 320 H452 V404 H300 Z"/>
<path class="h" d="M318 340 h22 v24 h-22 Z M356 340 h22 v24 h-22 Z M394 340 h22 v24 h-22 Z M318 374 h22 v22 h-22 Z M356 374 h22 v22 h-22 Z M394 374 h22 v22 h-22 Z"/>`);

  add(`<path class="o" fill="${tone(0.42)}" d="${D.road}"/>
<path class="w" d="M10 440 h40 M90 440 h40 M170 440 h40 M250 440 h40 M330 440 h40 M410 440 h40" stroke-width="3"/>
<rect class="o" x="-10" y="480" width="${W + 20}" height="14"/>
<path class="o" fill="${tone(0.1)}" d="${D.walk}"/>
${shade([{ lin: [0, 494, 0, 540], s: [0.3, 0] }], D.walk)}
<path class="h" stroke="#9a9a9a" d="M0 530 H${W} M0 574 H${W} M60 494 L52 530 M180 494 L176 530 M300 494 L300 530 M420 494 L424 530 M540 494 L548 530 M660 494 L672 530 M780 494 L796 530 M110 530 L100 574 M240 530 L236 574 M370 530 L370 574 M500 530 L506 574 M630 530 L640 574 M760 530 L774 574 M40 574 L30 600 M180 574 L174 600 M320 574 L320 600 M460 574 L464 600 M600 574 L608 600 M740 574 L750 600"/>`);

    add(`<path class="o" fill="${tone(0.3)}" d="M250 406 L253 270 L271 270 L276 406 Z"/>
<g transform="translate(40 0)"><path class="o" fill="${tone(0.32)}" d="${D.crown}"/>
${shade([{ lin: [180, 0, 340, 0], s: [0, 0.45] }], D.crown)}
<path class="h" d="M150 170 q10 -8 20 0 M200 130 q10 -8 20 0 M262 150 q10 -8 20 0 M180 220 q10 -8 20 0 M240 210 q10 -8 20 0 M290 200 q10 -8 20 0 M140 240 q10 -8 20 0 M226 250 q10 -8 20 0"/></g>`);

  add(shade([{ rad: [652, 484, 210, 10], s: 0.7 }]));
  add(`<path class="o" d="${D.bus}"/>
<path class="o" fill="${tone(0.55)}" d="M452 392 H830 V420 H452 Z"/>
${shade([{ lin: [560, 0, 830, 0], s: [0, 0.4] }], D.bus)}
<path class="o" fill="${tone(0.14)}" d="M462 330 L462 220 Q462 190 494 188 L548 188 L548 330 Z"/>
<path class="o" fill="${tone(0.14)}" d="M560 188 H616 V446 H560 Z"/>
<path class="t" d="M588 188 V446"/>
<rect class="o" fill="${tone(0.14)}" x="632" y="188" width="78" height="120" rx="4"/>
<rect class="o" fill="${tone(0.14)}" x="722" y="188" width="78" height="120" rx="4"/>
<rect class="o" fill="${tone(0.14)}" x="812" y="188" width="40" height="120" rx="4"/>
<path class="w" d="M640 200 l22 22 M730 200 l22 22 M570 200 l12 12 M598 200 l12 12" stroke-width="3"/>
<ellipse class="o" cx="470" cy="368" rx="9" ry="12"/>
<path class="k" d="M446 214 Q436 214 436 228 L436 254 Q436 262 444 262 L452 262 L452 246 L446 246 L446 228 Z"/>`);

  add(grp(`<path class="o" fill="${tone(0.6)}" d="${torso(-120, 0, 40, 46)}"/>
<rect class="o" x="-7" y="-136" width="14" height="18"/>
${head(0, -166, { hair: 'man', look: -6 })}`, 510, 330, 0.62));
  add(`<path class="o" fill="none" stroke-width="5" d="M494 330 Q512 306 534 316"/><path class="t" d="M462 330 H548"/>`);

  add(`<path class="o" fill="#111" d="M610 450 a40 40 0 0 1 80 0 Z"/>
<circle class="k" cx="650" cy="452" r="30"/>
<circle class="o" cx="650" cy="452" r="12"/>`);

  add(shade([{ rad: [80, 562, 34, 6], s: 0.6 }]));
  add(`<path class="k" d="M52 136 h9 v426 h-9 Z"/>
<rect class="o" fill="${tone(0.95)}" x="14" y="104" width="86" height="86" rx="6"/>
<rect class="o" x="26" y="118" width="62" height="40" rx="6"/>
<path class="k" d="M32 124 h50 v14 h-50 Z"/>
<circle class="k" cx="40" cy="160" r="6"/><circle class="k" cx="76" cy="160" r="6"/>
<path class="w" d="M30 176 h54"/>`);

  add(shade([{ rad: [222, 560, 130, 10], s: 0.7 }]));
  add(`<rect class="o" fill="${tone(0.28)}" x="104" y="368" width="212" height="20" rx="3"/>
<rect class="o" fill="${tone(0.28)}" x="104" y="396" width="212" height="20" rx="3"/>
<path class="k" d="M118 368 h9 v80 h-9 Z M293 368 h9 v80 h-9 Z"/>`);

  const S = 0.78;
  const gp = `<path class="o" fill="${tone(0.5)}" d="${torso(-205, -6, 34, 38)}"/>
<path class="o" fill="${tone(0.8)}" d="M-40 -22 H40 L42 14 L-42 14 Z"/>
${limb([[-20, 8], [-22, 118]], 22, 18, tone(0.8))}
${limb([[20, 8], [22, 118]], 22, 18, tone(0.8))}
${shoe(-24, 132, -1)}${shoe(24, 132)}
<rect class="o" x="-6" y="-222" width="12" height="18"/>
${head(0, -252, { hair: 'old', glasses: true })}
${limb([[-30, -190], [-50, -130], [-58, -112]], 20, 16, tone(0.5))}
${limb([[30, -190], [50, -130], [58, -112]], 20, 16, tone(0.5))}
<path class="o" d="M-62 -168 L0 -160 L62 -168 L62 -66 L0 -58 L-62 -66 Z"/>
<path class="t" d="M0 -160 V-58"/>
<path class="k" d="M-54 -156 L-8 -151 L-8 -140 L-54 -145 Z M8 -151 L54 -156 L54 -145 L8 -140 Z"/>
<path class="o" fill="${tone(0.4)}" d="M-50 -134 L-30 -132 L-30 -110 L-50 -112 Z"/>
<path class="h" d="M-24 -130 H-8 M-24 -122 H-8 M-24 -114 H-8 M-50 -102 H-8 M-50 -94 H-8 M-50 -86 H-8 M-50 -78 H-8 M8 -132 H54 M8 -124 H54 M8 -116 H54 M8 -108 H54 M8 -100 H40 M8 -92 H54 M8 -84 H54 M8 -76 H46"/>
${hand(-60, -114, 10)}${hand(60, -114, -10)}`;
  add(`<rect class="o" fill="${tone(0.28)}" x="100" y="442" width="220" height="16" rx="3"/>
<path class="k" d="M114 458 h9 v98 h-9 Z M297 458 h9 v98 h-9 Z"/>`);
  add(grp(gp, 196, 448, S));

  add(shade([{ rad: [398, 568, 54, 8], s: 0.7 }]));
  const wm = `${limb([[-14, -140], [-15, -14]], 20, 16)}
${limb([[14, -140], [15, -14]], 20, 16)}
${shoe(-16, 0, -1)}${shoe(16, 0)}
<path class="o" fill="${tone(0.45)}" d="${D.coat}"/>
${shade([{ lin: [0, 0, 46, 0], s: [0, 0.4] }], D.coat)}
<path class="t" d="M0 -320 V-128"/>
<circle class="k" cx="-8" cy="-290" r="3.5"/><circle class="k" cx="-8" cy="-250" r="3.5"/><circle class="k" cx="-8" cy="-210" r="3.5"/>
<path class="o" fill="${tone(0.45)}" d="M-16 -346 L0 -326 L16 -346 Z"/>
<rect class="o" x="-6" y="-362" width="12" height="18"/>
${head(0, -392, { hair: 'bob', look: -4 })}
${limb([[-28, -326], [-46, -262], [-58, -202]], 20, 16, tone(0.45))}
<path class="t" d="M-58 -186 Q-58 -206 -72 -206 Q-84 -206 -84 -194"/>
<path class="k" d="M-61 -186 h6 v14 h-6 Z"/>
<path class="o" fill="${pat('stD')}" d="M-58 -172 L-48 -150 L-56 -10 L-60 -10 L-68 -150 Z"/>
<path class="t" d="M-58 -10 V2"/>
${hand(-58, -196, 0)}
${limb([[28, -326], [46, -266], [36, -214]], 20, 16, tone(0.45))}
<path class="t" d="M26 -228 Q46 -262 66 -228"/>
<path class="o" fill="${tone(0.9)}" d="M18 -230 H74 L80 -168 H12 Z"/>
<path class="w" d="M20 -214 H72"/>
${hand(34, -214, -30)}`;
  add(grp(wm, 392, 566, S));
}
