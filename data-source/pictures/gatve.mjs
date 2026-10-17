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

function bike(x, y, r, dir, tone, frame = '#111') {
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
<circle class="o" cx="${x + dir * 1.15 * r}" cy="${y + 0.08 * r}" r="${r * 0.2}"/>
<path class="t" stroke-width="4" d="M${P(1.15, 0.08)} L${P(1.35, 0.5)} M${P(1.22, 0.5)} H${x + dir * 1.5 * r}"/>`;
}

export default function draw(kit) {
  const { add, shade, limb, hand, shoe, tone, pat, clip, f, W, H } = kit;
  const { grp, side, torso } = people(kit);

  const D = {
    shop: 'M0 120 H330 V420 H0 Z',
    house: 'M520 120 H800 V420 H520 Z',
    roof: 'M500 124 L660 26 L820 124 Z',
    road: `M0 428 H${W} V506 H0 Z`,
    walk: `M0 518 H${W} V${H} H0 Z`,
    car: 'M512 488 L512 452 Q512 424 548 420 L590 416 L620 368 Q626 360 640 360 L728 360 Q742 360 750 372 L776 414 Q796 420 796 446 L796 488 Z'
  };

  add(`<path class="o" fill="${tone(0.1)}" d="${D.house}"/>
${shade([{ lin: [640, 0, 800, 0], s: [0, 0.35] }], D.house)}
<path class="o" fill="${pat('brick')}" d="${D.roof}"/>
${shade([{ lin: [660, 0, 820, 0], s: [0, 0.4] }], D.roof)}
<rect class="o" fill="${tone(0.5)}" x="700" y="40" width="34" height="56"/>
${[560, 640, 720].map((x) => `<rect class="o" fill="${tone(0.16)}" x="${x}" y="160" width="50" height="64"/><path class="t" d="M${x + 25} 160 V224 M${x} 192 H${x + 50}"/><rect class="o" fill="${tone(0.16)}" x="${x}" y="262" width="50" height="64"/><path class="t" d="M${x + 25} 262 V326 M${x} 294 H${x + 50}"/>`).join('')}
<rect class="o" x="-6" y="414" width="${W + 12}" height="14"/>`);

  add(`<g transform="translate(-40 -26)"><path class="k" d="M596 92 Q590 70 606 62 Q614 50 628 56 L640 52 L630 64 Q636 80 624 90 L640 104 L616 98 Z"/>
<circle class="w" cx="620" cy="64" r="2"/>
<path class="k" d="M612 96 l-2 8 M620 96 l0 8" stroke-width="2"/></g>`);

  add(`<path class="o" fill="${tone(0.1)}" d="${D.shop}"/>
${shade([{ lin: [180, 0, 330, 0], s: [0, 0.35] }], D.shop)}
<rect class="o" x="40" y="140" width="250" height="70" rx="4"/>
<path class="o" fill="${tone(0.6)}" d="M90 192 Q86 162 120 160 Q154 162 150 192 Z"/>
<path class="h" d="M104 172 l8 -8 M118 174 l8 -8 M132 174 l8 -8"/>
<path class="o" fill="${tone(0.35)}" d="M190 194 V170 Q190 162 196 160 V150 H206 V160 Q212 162 212 170 V194 Z"/>
<path class="o" fill="${tone(0.35)}" d="M226 194 V170 Q226 162 232 160 V150 H242 V160 Q248 162 248 170 V194 Z"/>
<path class="o" fill="${pat('stV')}" d="M6 226 H324 L334 264 ${Array.from({ length: 14 }, (_, i) => `Q${f(334 - i * 24.3 - 12)} 280 ${f(334 - (i + 1) * 24.3)} 264`).join(' ')} Z"/>
<rect class="o" fill="${tone(0.16)}" x="20" y="290" width="200" height="124"/>
${shade([{ lin: [20, 290, 220, 414], s: [0.3, 0.05] }], 'M20 290 H220 V414 H20 Z')}
<path class="t" d="M20 352 H220"/>
<path class="o" fill="${tone(0.5)}" d="M36 350 Q34 330 56 330 Q78 330 76 350 Z M86 350 Q84 330 106 330 Q128 330 126 350 Z"/>
<path class="o" fill="${tone(0.35)}" d="M146 350 V320 Q146 312 152 310 V300 H160 V310 Q166 312 166 320 V350 Z M178 350 V320 Q178 312 184 310 V300 H192 V310 Q198 312 198 320 V350 Z"/>
<circle class="o" fill="${tone(0.3)}" cx="52" cy="398" r="14"/><circle class="o" fill="${tone(0.3)}" cx="80" cy="398" r="14"/><circle class="o" fill="${tone(0.3)}" cx="66" cy="380" r="14"/>
<rect class="o" fill="${tone(0.16)}" x="244" y="290" width="70" height="128"/>
<path class="t" d="M279 290 V418"/><circle class="k" cx="270" cy="356" r="3"/>`);

  add(`<path class="o" fill="${tone(0.42)}" d="${D.road}"/>
<path class="w" d="M20 468 h46 M110 468 h46 M200 468 h46 M290 468 h46 M380 468 h46 M470 468 h46" stroke-width="3"/>
<rect class="o" x="-10" y="504" width="${W + 20}" height="14"/>
<path class="o" fill="${tone(0.1)}" d="${D.walk}"/>
${shade([{ lin: [0, 518, 0, 560], s: [0.3, 0] }], D.walk)}
<path class="h" stroke="#9a9a9a" d="M0 556 H${W} M80 518 L74 556 M220 518 L218 556 M360 518 L360 556 M500 518 L504 556 M640 518 L646 556 M780 518 L788 556 M150 556 L142 600 M300 556 L298 600 M450 556 L452 600 M600 556 L606 600 M750 556 L758 600"/>`);

  add(shade([{ rad: [660, 506, 160, 9], s: 0.75 }]));
  add(`<path class="o" fill="#2a2a2a" d="${D.car}"/>
<path class="o" fill="${tone(0.16)}" d="M598 416 L624 374 Q628 370 636 370 L676 370 L676 416 Z"/>
<path class="o" fill="${tone(0.16)}" d="M688 416 L688 370 L726 370 Q734 370 738 378 L758 416 Z"/>`);
  add(`<g ${clip('M598 416 L624 374 Q628 370 636 370 L676 370 L676 416 Z')}>${grp(`<path class="o" fill="${tone(0.5)}" d="M-34 20 Q-34 -6 0 -8 Q34 -6 34 20 Z"/><rect class="o" x="-6" y="-22" width="12" height="16"/>${side(0, -52, { hair: 'bob' })}`, 642, 416, 0.56, true)}</g>`);
  add(`<path class="t" d="M598 416 L624 374 Q628 370 636 370 L676 370 L676 416 Z"/>
<path class="w" d="M520 448 H790 M682 424 V484 M600 424 L604 484" stroke-width="2.4"/>
<path class="o" d="M512 440 Q512 428 526 426 L536 426 L536 444 Z"/>
<path class="o" fill="${tone(0.5)}" d="M786 428 h10 v18 h-10 Z"/>
<path class="k" d="M554 488 a32 32 0 0 1 64 0 Z M700 488 a32 32 0 0 1 64 0 Z"/>
<circle class="k" cx="586" cy="490" r="26"/><circle class="o" cx="586" cy="490" r="11"/>
<circle class="k" cx="732" cy="490" r="26"/><circle class="o" cx="732" cy="490" r="11"/>`);

  add(shade([{ rad: [486, 566, 34, 6], s: 0.6 }]));
  add(`<path class="k" d="M466 176 h10 v390 h-10 Z"/>
<rect class="o" fill="#2a2a2a" x="440" y="120" width="62" height="160" rx="10"/>
${[150, 200, 250].map((y, i) => `<path class="k" d="M446 ${y - 22} h50 l-6 -6 h-38 Z"/><circle class="o" fill="${i ? tone(0.55) : '#fff'}" cx="471" cy="${y}" r="17"/>`).join('')}
<path class="h" d="M432 150 h-10 M510 150 h10 M436 132 l-8 -6 M506 132 l8 -6 M436 168 l-8 6 M506 168 l8 6"/>`);

  add(shade([{ rad: [236, 588, 150, 10], s: 0.7 }]));
  const S = 0.9;
  const boy = `${limb([[2, -118], [-10, -66], [-28, -14]], 19, 15, tone(0.75))}
${shoe(-26, 0, 1)}
<path class="o" fill="${pat('stH')}" d="M-24 -222 Q0 -232 22 -218 L26 -116 L-26 -116 Z"/>
${shade([{ lin: [0, 0, 26, 0], s: [0, 0.35] }], 'M-24 -222 Q0 -232 22 -218 L26 -116 L-26 -116 Z')}
<path class="o" fill="${tone(0.75)}" d="M-27 -120 H27 L28 -98 L-28 -98 Z"/>
${limb([[-2, -116], [22, -64], [30, -14]], 19, 15, tone(0.75))}
${shoe(34, 0, 1)}
<rect class="o" x="-6" y="-236" width="12" height="16"/>
${side(0, -266, { hair: 'man' })}
<path class="o" fill="${pat('stD')}" d="M-34 -268 Q-36 -312 2 -314 Q38 -312 34 -276 Q20 -282 4 -280 Q-16 -280 -34 -268 Z"/>
<path class="t" d="M-28 -270 Q-14 -246 -4 -232 M30 -276 Q22 -250 16 -236"/>`;
  add(grp(boy, 210, 588, S));
  add(bike(150, 540, 48, 1, tone));
  add(grp(`${limb([[6, -204], [22, -168], [41, -146]], 18, 14, pat('stH'))}`, 210, 588, S));
  add(`${hand(248, 458, -40)}`);
}
