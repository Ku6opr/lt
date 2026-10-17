export default function draw({ add, def, shade, limb, hand, shoe, tone, pat, W, H }) {
  const eyes = (x, y, dx = 11) => `<ellipse class="k" cx="${x - dx}" cy="${y}" rx="3" ry="4"/><ellipse class="k" cx="${x + dx}" cy="${y}" rx="3" ry="4"/>`;
  const brows = (x, y, dx = 11) => `<path class="h" d="M${x - dx - 6} ${y} q6 -4 12 0 M${x + dx - 6} ${y} q6 -4 12 0"/>`;
  const nose = (x, y) => `<path class="h" d="M${x} ${y} q-3 7 2 8"/>`;
  const brick = (x, y, w = 36, h = 14) => `<rect class="o" fill="${tone(0.5)}" x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5"/><path class="h" d="M${x + w * 0.3} ${y + 4} h${w * 0.4}" stroke="${tone(0.9)}"/>`;
  const cloud = (x, y, s = 1) => `<path class="o" transform="translate(${x} ${y}) scale(${s})" d="M-60 20 Q-74 20 -72 6 Q-70 -8 -54 -6 Q-52 -30 -26 -28 Q-12 -46 12 -34 Q34 -44 44 -22 Q66 -24 66 -2 Q78 4 70 18 Q66 22 56 20 Z"/>`;

  def(`<pattern id="brk" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="${tone(0.5)}"/><path d="M0 1 H40 M0 11 H40 M10 1 V11 M30 11 V21" stroke="#fff" stroke-width="1.8" fill="none"/></pattern>`);

  const D = {
    ground: `M0 400 H${W} V${H} H0 Z`,
    wall: 'M230 480 V190 H350 V210 H430 V230 H500 V260 H590 V480 Z',
    hole: 'M450 320 H526 V412 H450 Z'
  };

  const helmet = `<path class="o" d="M-34 -418 Q-34 -462 0 -464 Q34 -462 34 -418 Z"/>
<path class="h" d="M0 -464 V-420 M-16 -460 Q-20 -440 -18 -420 M16 -460 Q20 -440 18 -420"/>
<path class="o" d="M-44 -420 H44 Q46 -410 38 -410 H-38 Q-46 -410 -44 -420 Z"/>`;
  const body = (shirt) => `<path class="o" fill="${shirt}" d="M-38 -330 Q-34 -356 0 -356 Q34 -356 38 -330 L42 -202 L-42 -202 Z"/>
<path class="o" d="M-40 -280 H40 L41 -268 H-41 Z M-41 -244 H41 L42 -232 H-42 Z"/>
<path class="t" d="M0 -336 V-202"/>
<path class="o" d="M-16 -354 L0 -336 L16 -354 Z"/>
<rect class="o" x="-6" y="-376" width="12" height="22"/>
<ellipse class="o" cx="-30" cy="-402" rx="6" ry="9"/><ellipse class="o" cx="30" cy="-402" rx="6" ry="9"/>
<ellipse class="o" cx="0" cy="-404" rx="30" ry="36"/>
${eyes(0, -402)}${brows(0, -413)}${nose(0, -398)}
<path class="t" d="M-10 -382 q10 7 20 0"/>`;
  const legs = () => `${limb([[-18, -214], [-19, -14]], 30, 24, tone(0.62))}${limb([[18, -214], [19, -14]], 30, 24, tone(0.62))}${shoe(-24, 0, -1)}${shoe(24, 0)}`;

  add(`<rect width="${W}" height="400" fill="#fff"/>
<circle class="o" cx="80" cy="76" r="32"/>
<path class="t" d="M80 30 v-14 M80 122 v14 M34 76 h-14 M126 76 h14 M47 43 l-10 -10 M113 43 l10 -10 M47 109 l-10 10 M113 109 l10 10"/>
${cloud(330, 80, 1)}${cloud(640, 120, 0.85)}`);
  add(`<path class="o" fill="${pat('grass')}" d="${D.ground}"/>
${shade([{ lin: [0, 400, 0, 460], s: [0.25, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.2] }], D.ground)}
<path class="t" d="M0 400 H${W}"/>`);
  add(shade([{ rad: [410, 486, 200, 12], s: 0.7 }]));
  add(shade([{ rad: [130, 560, 96, 11], s: 0.7 }]));
  add(shade([{ rad: [684, 570, 56, 9], s: 0.7 }]));
  add(shade([{ rad: [540, 548, 34, 6], s: 0.6 }]));

  add(`<path class="o" fill="url(#brk)" d="${D.wall}"/>
${shade([{ lin: [410, 0, 590, 0], s: [0, 0.5] }], D.wall)}
<path class="o" fill="#fff" d="${D.hole}"/>
<path class="t" d="M450 400 H526"/>
${shade([{ lin: [450, 320, 450, 350], s: [0.45, 0] }], D.hole)}
${brick(440, 216)}${brick(512, 246, 30)}`);

  add(shade([{ rad: [300, 524, 60, 7], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.3)}" d="M252 524 L266 176 L274 176 L262 524 Z"/>
<path class="o" fill="${tone(0.3)}" d="M338 524 L334 176 L342 176 L348 524 Z"/>
${[480, 440, 400, 360, 320, 280, 240, 200].map((y) => `<path class="o" fill="${tone(0.3)}" d="M${257 + (524 - y) * 0.04} ${y} H${343 - (524 - y) * 0.017} V${y + 8} H${257 + (516 - y) * 0.04} Z"/>`).join('')}`);

  add(`<g transform="translate(300 400) scale(0.72)">${legs()}${body(tone(0.35))}${helmet}
${limb([[-34, -326], [-60, -250], [-52, -150]], 19, 15, tone(0.35))}${hand(-52, -144, 0)}
${limb([[34, -326], [72, -334], [100, -312]], 19, 15, tone(0.35))}</g>`);
  add(`${brick(354, 166, 38, 16)}${hand(372, 176, -20)}`);

  add(`<path class="o" fill="${tone(0.5)}" d="M518 506 H562 L556 548 H524 Z"/>
${shade([{ lin: [540, 0, 562, 0], s: [0, 0.5] }], 'M518 506 H562 L556 548 H524 Z')}
<path class="t" d="M520 506 Q540 476 560 506"/>
<ellipse class="o" fill="${tone(0.8)}" cx="540" cy="506" rx="22" ry="5"/>`);

  const pile = [];
  for (let r = 0; r < 4; r++) for (let i = 0; i < 4 - r; i++) pile.push(brick(56 + r * 19 + i * 38, 540 - r * 15));
  add(pile.join(''));

  add(`<g transform="translate(684 566) scale(0.72)">${legs()}${body(tone(0.6))}${helmet}
${limb([[-34, -326], [-50, -270], [-30, -236]], 19, 15, tone(0.6))}${limb([[34, -326], [50, -270], [30, -236]], 19, 15, tone(0.6))}</g>`);
  add(`${brick(662, 378, 46, 15)}${brick(664, 363, 46, 15)}${brick(662, 348, 46, 15)}
${hand(664, 392, 80)}${hand(706, 392, -80)}`);
}
