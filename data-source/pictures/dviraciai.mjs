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

function bike(x, y, r, dir, frame = '#111') {
  const P = (a, b) => `${x + dir * a * r} ${y + b * r}`;
  const wheel = (cx) => {
    const sp = [0, 30, 60, 90, 120, 150].map((a) => {
      const t = (a * Math.PI) / 180;
      const k = r - 7;
      return `M${(cx - Math.cos(t) * k).toFixed(1)} ${(y - Math.sin(t) * k).toFixed(1)} L${(cx + Math.cos(t) * k).toFixed(1)} ${(y + Math.sin(t) * k).toFixed(1)}`;
    });
    return `<circle class="k" cx="${cx}" cy="${y}" r="${r}"/><circle class="o" cx="${cx}" cy="${y}" r="${r - 7}"/><path class="h" d="${sp.join(' ')}"/><circle class="k" cx="${cx}" cy="${y}" r="4"/>`;
  };
  const fx = x + dir * 2.9 * r;
  return `${wheel(x)}${wheel(fx)}
<path class="t" stroke="${frame}" stroke-width="5" d="M${P(0, 0)} L${P(1.15, 0.08)} L${P(0.78, -1.2)} Z M${P(0.78, -1.2)} L${P(2.3, -1.15)} M${P(1.15, 0.08)} L${P(2.36, -0.92)} M${P(2.26, -1.32)} L${P(2.9, 0)}"/>
<path class="t" stroke-width="4" d="M${P(0.78, -1.2)} L${P(0.72, -1.42)} M${P(2.26, -1.32)} L${P(2.2, -1.62)} L${P(2.02, -1.66)}"/>
<path class="k" d="M${P(0.5, -1.52)} Q${P(0.72, -1.6)} ${P(0.98, -1.5)} L${P(0.94, -1.4)} L${P(0.52, -1.42)} Z"/>
<circle class="o" cx="${x + dir * 1.15 * r}" cy="${y + 0.08 * r}" r="${r * 0.2}"/>`;
}

export default function draw(kit) {
  const { add, shade, limb, hand, shoe, tone, pat, f, W, H } = kit;
  const { grp, side } = people(kit);

  const D = {
    grass: `M0 330 H${W} V${H} H0 Z`,
    path: 'M0 436 H800 V556 H0 Z',
    crownL: 'M-30 300 Q-60 250 -30 210 Q-50 150 0 130 Q20 80 80 90 Q130 70 160 110 Q210 120 210 170 Q240 210 210 250 Q220 300 170 306 Q130 330 80 312 Q30 330 -30 300 Z',
    crownR: 'M590 250 Q556 220 580 180 Q566 130 610 110 Q630 60 690 70 Q740 50 770 90 Q820 100 820 150 Q850 190 820 230 Q830 280 780 284 Q740 304 700 290 Q650 300 630 280 Q600 280 590 250 Z'
  };

  add(`<circle class="o" cx="400" cy="80" r="34"/>
<path class="t" d="M400 30 V16 M400 130 V144 M350 80 H336 M450 80 H464 M365 45 L355 35 M435 45 L445 35 M365 115 L355 125 M435 115 L445 125"/>
<path class="o" d="M230 110 q-22 0 -22 -14 q0 -16 22 -14 q6 -18 30 -16 q20 -10 34 6 q20 0 20 16 q0 22 -20 22 Z"/>`);

  add(`<path class="o" fill="${pat('grass')}" d="${D.grass}"/>
${shade([{ lin: [0, 330, 0, 436], s: [0.1, 0.25] }], D.grass)}
<path class="o" fill="${tone(0.15)}" d="${D.path}"/>
${shade([{ lin: [0, 436, 0, 470], s: [0.3, 0] }], D.path)}
<path class="h" stroke="#9a9a9a" d="M30 470 q20 4 40 0 M180 500 q20 4 40 0 M340 470 q20 4 40 0 M520 506 q20 4 40 0 M640 476 q20 4 40 0 M60 530 q20 4 40 0"/>`);

  add(`<path class="o" fill="${tone(0.35)}" d="M54 440 L60 250 L84 250 L92 440 Z"/>
<path class="o" fill="${tone(0.32)}" d="${D.crownL}"/>
${shade([{ lin: [60, 0, 220, 0], s: [0, 0.45] }], D.crownL)}
<path class="h" d="M30 180 q10 -8 20 0 M100 140 q10 -8 20 0 M140 210 q10 -8 20 0 M60 250 q10 -8 20 0 M0 240 q10 -8 20 0 M160 270 q10 -8 20 0"/>
${shade([{ rad: [86, 442, 56, 7], s: 0.6 }])}`);

  add(shade([{ rad: [380, 428, 90, 7], s: 0.6 }]));
  add(`<rect class="o" fill="${tone(0.28)}" x="300" y="356" width="160" height="14" rx="3"/>
<rect class="o" fill="${tone(0.28)}" x="300" y="376" width="160" height="14" rx="3"/>
<path class="k" d="M312 356 h7 v44 h-7 Z M441 356 h7 v44 h-7 Z"/>
<rect class="o" fill="${tone(0.28)}" x="296" y="398" width="168" height="12" rx="3"/>
<path class="k" d="M308 410 h7 v18 h-7 Z M445 410 h7 v18 h-7 Z"/>`);

  add(`<path class="o" fill="${tone(0.35)}" d="M690 440 L694 160 L720 160 L728 440 Z"/>
<g transform="translate(0 -70)"><path class="o" fill="${tone(0.22)}" d="${D.crownR}"/>
${shade([{ lin: [660, 0, 830, 0], s: [0, 0.45] }], D.crownR)}
<path class="h" d="M620 160 q10 -8 20 0 M690 110 q10 -8 20 0 M740 170 q10 -8 20 0 M660 220 q10 -8 20 0 M770 240 q10 -8 20 0"/></g>
<path class="o" fill="${tone(0.35)}" d="M700 262 L590 262 Q584 270 590 276 L698 282 Z"/>
${shade([{ rad: [722, 442, 56, 7], s: 0.6 }])}`);
  add(`<g transform="translate(-10 22)"><path class="o" fill="${tone(0.7)}" d="M650 238 Q680 230 680 200 Q682 170 660 160 Q640 154 640 176 Q656 182 654 206 Q650 226 636 236 Z"/>
<path class="h" d="M662 172 q8 8 8 22 M650 214 q8 -4 12 -14"/>
<path class="o" fill="${tone(0.6)}" d="M612 240 Q606 218 620 206 Q616 192 628 190 L632 182 L636 192 Q648 200 642 214 Q648 228 642 240 Z"/>
<circle class="k" cx="626" cy="200" r="2.6"/>
<path class="h" d="M616 206 l-4 0"/>
<path class="o" d="M618 222 q-8 4 -6 10 l8 -2 Z"/></g>`);

  const kid = { bx: 470, by: 500, r: 40 };
  const dad = { bx: 108, by: 486, r: 54 };

  const rider = ({ bx, by, r }, s, o) => {
    const sad = [bx + 0.74 * r, by - 1.48 * r];
    const bar = [bx + 2.02 * r, by - 1.66 * r];
    const bb = [bx + 1.15 * r, by + 0.08 * r];
    const pa = [bb[0] + 0.36 * r, bb[1] + 0.42 * r];
    const pb = [bb[0] - 0.36 * r, bb[1] - 0.42 * r];
    const hip = [sad[0], sad[1] - 6 * s];
    const sh = [hip[0] + 30 * s, hip[1] - 150 * s];
    const kneeA = [hip[0] + 62 * s, hip[1] + 26 * s];
    const kneeB = [hip[0] + 48 * s, hip[1] + 4 * s];
    const back = `${limb([hip, kneeB, pb], 22 * s, 18 * s, o.legs)}${shoe(pb[0] + 4, pb[1] + 6, 1)}`;
    const body = `${limb([hip, [hip[0] + 8 * s, hip[1] - 70 * s], sh], 56 * s, 50 * s, o.top)}
<rect class="o" x="${f(sh[0] + 2 * s)}" y="${f(sh[1] - 26 * s)}" width="${f(12 * s)}" height="${f(20 * s)}" transform="rotate(16 ${f(sh[0] + 8 * s)} ${f(sh[1] - 16 * s)})"/>
${grp(`${side(0, 0, { hair: o.hair, hc: '#222', mouth: o.mouth })}<path class="o" fill="${pat(o.helmet)}" d="M-34 -2 Q-36 -46 2 -48 Q38 -46 34 -10 Q20 -16 4 -14 Q-16 -14 -34 -2 Z"/><path class="t" d="M-28 -4 Q-14 20 -4 34 M30 -10 Q24 14 16 30"/>`, f(sh[0] + 16 * s), f(sh[1] - 52 * s), s)}`;
    const front = `${limb([hip, kneeA, pa], 22 * s, 18 * s, o.legs)}${shoe(pa[0] + 4, pa[1] + 6, 1)}`;
    const arm = o.point ? `${limb([[sh[0] + 6 * s, sh[1] + 14 * s], [sh[0] + 64 * s, sh[1] - 4 * s], [sh[0] + 124 * s, sh[1] - 28 * s]], 18 * s, 14 * s, o.top)}<ellipse class="o" cx="${f(sh[0] + 142 * s)}" cy="${f(sh[1] - 36 * s)}" rx="9" ry="3.5" transform="rotate(-22 ${f(sh[0] + 142 * s)} ${f(sh[1] - 36 * s)})"/>${hand(f(sh[0] + 130 * s), f(sh[1] - 30 * s), 68)}` : `${limb([[sh[0] + 6 * s, sh[1] + 14 * s], [bar[0] - 30 * s, bar[1] - 40 * s], bar], 18 * s, 14 * s, o.top)}${hand(f(bar[0] + 2), f(bar[1]), -40)}`;
    const arm2 = o.point ? `${limb([[sh[0] - 4 * s, sh[1] + 16 * s], [bar[0] - 30 * s, bar[1] - 30 * s], bar], 18 * s, 14 * s, o.top)}${hand(f(bar[0] + 2), f(bar[1]), -40)}` : '';
    return { back, body, front, arm: arm2 + arm };
  };

  const d = rider(dad, 0.86, { top: pat('stH'), legs: tone(0.75), hair: 'man', helmet: 'dense', point: true });
  const k = rider(kid, 0.66, { top: tone(0.42), legs: tone(0.85), hair: 'girl', helmet: 'stD' });

  add(shade([{ rad: [270, 548, 190, 10], s: 0.7 }, { rad: [560, 546, 140, 9], s: 0.7 }]));
  add(d.back, bike(dad.bx, dad.by, dad.r, 1), d.body, d.front, d.arm);
  add(k.back, bike(kid.bx, kid.by, kid.r, 1), k.body, k.front, k.arm);

  add(shade([{ rad: [716, 580, 30, 6], s: 0.6 }]));
  add(`<circle class="o" cx="706" cy="560" r="22"/>
<path class="o" fill="${tone(0.7)}" d="M690 545 Q706 560 690 575 Q684 560 690 545 Z M722 545 Q706 560 722 575 Q728 560 722 545 Z"/>
<path class="t" d="M684 560 H728"/>`);
}
