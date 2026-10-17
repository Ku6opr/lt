export default function draw({ add, shade, floor, limb, hand, shoe, tone, pat, W, H }) {
  const eyes = (x, y, dx = 11) => `<ellipse class="k" cx="${x - dx}" cy="${y}" rx="3" ry="4"/><ellipse class="k" cx="${x + dx}" cy="${y}" rx="3" ry="4"/>`;
  const brows = (x, y, dx = 11) => `<path class="h" d="M${x - dx - 6} ${y} q6 -4 12 0 M${x + dx - 6} ${y} q6 -4 12 0"/>`;
  const nose = (x, y) => `<path class="h" d="M${x} ${y} q-3 7 2 8"/>`;
  const env = (x, y, w, h, fill = '#fff') => `<rect class="o" fill="${fill}" x="${x}" y="${y}" width="${w}" height="${h}"/><path class="h" d="M${x} ${y} L${x + w / 2} ${y + h * 0.55} L${x + w} ${y}"/>`;

  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M651 61 H779 V229 H651 Z',
    counter: 'M20 334 H430 V548 H20 Z',
    top: 'M196 240 Q200 216 232 216 Q264 216 268 240 L272 334 L192 334 Z',
    jacket: 'M520 238 Q524 212 556 212 Q588 212 592 238 L598 392 L514 392 Z',
    board: 'M30 52 H190 V232 H30 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [226, 552, 220, 13], s: 0.7 }]));
  add(shade([{ rad: [566, 562, 80, 11], s: 0.7 }]));

  add(`<rect class="o" fill="${tone(0.35)}" x="22" y="44" width="176" height="196"/>
<path class="o" fill="${tone(0.12)}" d="${D.board}"/>
${shade([{ lin: [30, 52, 190, 232], s: [0, 0.3] }], D.board)}
${[[42, 64, -4, '#fff'], [112, 66, 3, pat('stD')], [44, 124, 3, pat('dots')], [114, 126, -3, '#fff'], [42, 182, -2, pat('waves')], [112, 180, 4, '#fff']].map(([x, y, a, fill], i) => `<g transform="rotate(${a} ${x + 32} ${y + 22})"><rect class="o" fill="${fill}" x="${x}" y="${y}" width="64" height="44"/>${fill === '#fff' ? (i % 2 ? `<circle class="o" fill="${tone(0.4)}" cx="${x + 46}" cy="${y + 15}" r="8"/><path class="h" d="M${x + 6} ${y + 36} L${x + 22} ${y + 22} L${x + 34} ${y + 34} L${x + 44} ${y + 26} L${x + 58} ${y + 38}"/>` : `<path class="o" fill="${tone(0.5)}" d="M${x + 10} ${y + 38} L${x + 24} ${y + 10} L${x + 38} ${y + 38} Z"/><path class="h" d="M${x + 42} ${y + 14} h14 M${x + 42} ${y + 22} h14 M${x + 42} ${y + 30} h10"/>`) : ''}<circle class="k" cx="${x + 32}" cy="${y + 3}" r="2.5"/></g>`).join('')}`);

  add(`<rect class="o" x="640" y="50" width="150" height="190"/>
<rect class="o" x="651" y="61" width="128" height="168"/>
${shade([{ lin: [651, 61, 779, 229], s: [0.28, 0.08] }], D.pane)}
<path class="t" d="M715 61 V229 M651 145 H779"/>
<path class="t" d="M662 74 l-6 16 M686 70 l-6 16 M700 96 l-6 16 M670 104 l-6 16 M730 76 l-6 16 M756 72 l-6 16 M744 104 l-6 16 M770 100 l-6 16 M664 160 l-6 16 M690 156 l-6 16 M676 192 l-6 16 M704 184 l-6 16 M734 164 l-6 16 M760 158 l-6 16 M746 196 l-6 16 M772 190 l-6 16"/>
<rect class="o" x="630" y="240" width="170" height="11"/>`);

  add(`<path class="o" fill="${tone(0.3)}" d="M204 160 Q198 118 232 116 Q266 118 260 160 L264 198 Q252 204 246 194 L218 194 Q212 204 200 198 Z"/>
<path class="o" fill="${pat('zig')}" d="${D.top}"/>
${shade([{ lin: [232, 0, 272, 0], s: [0, 0.45] }], D.top)}
<path class="o" d="M216 218 Q232 234 248 218 L252 228 Q232 246 212 228 Z"/>
<rect class="o" x="226" y="196" width="12" height="22"/>
<ellipse class="o" cx="232" cy="162" rx="29" ry="35"/>
<path class="o" fill="${tone(0.3)}" d="M203 160 Q200 124 232 124 Q264 124 261 160 Q254 140 244 138 Q236 148 214 144 Q206 150 203 160 Z"/>
<path class="h" d="M216 130 q-6 8 -8 20 M232 126 q-8 6 -14 18 M246 128 q8 6 12 22 M204 172 q-2 12 0 20 M260 172 q2 12 0 20"/>
<circle class="k" cx="203" cy="178" r="3"/><circle class="k" cx="261" cy="178" r="3"/>
${eyes(232, 166)}${brows(232, 155)}${nose(232, 170)}
<path class="t" d="M223 184 q9 6 18 0"/>`);
  add(limb([[200, 240], [190, 290], [196, 340]], 18, 15, pat('zig')));

  add(`<path class="o" fill="${tone(0.3)}" d="M14 318 H436 V334 H14 Z"/>
<path class="o" fill="${tone(0.22)}" d="${D.counter}"/>
${shade([{ lin: [226, 0, 430, 0], s: [0, 0.5] }], D.counter)}
<rect class="o" x="40" y="356" width="174" height="172"/>
<rect class="o" x="236" y="356" width="174" height="172"/>
<path class="o" fill="${tone(0.15)}" d="M88 412 H166 V472 H88 Z"/>
<path class="t" d="M88 412 L127 446 L166 412"/>
<path class="o" fill="${tone(0.6)}" d="M50 318 L58 274 H138 L146 318 Z"/>
${shade([{ lin: [98, 0, 146, 0], s: [0, 0.5] }], 'M50 318 L58 274 H138 L146 318 Z')}
<circle class="o" cx="98" cy="298" r="13"/>
<path class="t" d="M98 298 L104 290"/>
<rect class="k" x="94" y="262" width="8" height="12"/>
<path class="o" fill="${tone(0.4)}" d="M54 262 H142 L136 254 H60 Z"/>
${env(70, 230, 52, 26)}
${env(320, 300, 70, 18)}${env(316, 284, 70, 18)}${env(324, 268, 66, 18)}
${shade([{ lin: [354, 0, 394, 0], s: [0, 0.35] }], 'M316 268 H394 V318 H316 Z')}`);

  add(limb([[264, 240], [332, 250], [404, 240]], 18, 15, pat('zig')));

  add(`<path class="t" d="M630 312 q0 -16 -13 -14 q-9 2 -7 12" stroke-width="5"/>
<path class="t" d="M631 312 L635 548" stroke-width="5"/>
<path class="o" fill="${tone(0.75)}" d="M632 380 Q610 430 626 520 L634 538 L642 520 Q658 430 632 380 Z"/>
${shade([{ lin: [632, 0, 654, 0], s: [0, 0.5] }], 'M632 380 Q610 430 626 520 L634 538 L642 520 Q658 430 632 380 Z')}
<path class="h" d="M630 394 Q620 450 630 520 M636 394 Q644 450 638 520"/>
<path class="o" fill="${tone(0.08)}" d="M612 470 q-4 8 0 10 q4 -2 0 -10 Z M658 486 q-4 8 0 10 q4 -2 0 -10 Z M622 530 q-4 8 0 10 q4 -2 0 -10 Z"/>
<ellipse class="o" fill="${tone(0.2)}" cx="640" cy="556" rx="22" ry="4"/>`);
  add(limb([[542, 386], [540, 548]], 24, 20, tone(0.75)));
  add(limb([[572, 386], [576, 548]], 24, 20, tone(0.75)));
  add(`${shoe(536, 562, -1)}${shoe(580, 562)}
<path class="o" fill="${tone(0.5)}" d="${D.jacket}"/>
${shade([{ lin: [556, 0, 598, 0], s: [0, 0.5] }], D.jacket)}
<path class="t" d="M556 230 V392"/>
<path class="h" d="M524 330 L542 330 M570 330 L590 330 M518 380 H594"/>
<path class="o" fill="${tone(0.5)}" d="M536 214 Q556 230 576 214 L582 226 Q556 246 530 226 Z"/>
<rect class="o" x="550" y="196" width="12" height="18"/>
<ellipse class="o" cx="525" cy="166" rx="6" ry="9"/><ellipse class="o" cx="587" cy="166" rx="6" ry="9"/>
<ellipse class="o" cx="556" cy="162" rx="30" ry="36"/>
<path class="o" fill="${pat('stH')}" d="M526 156 Q524 116 556 114 Q588 116 586 156 Z"/>
<path class="o" fill="${tone(0.6)}" d="M523 148 H589 V160 H523 Z"/>
<circle class="o" fill="${tone(0.6)}" cx="556" cy="110" r="9"/>
${eyes(556, 172)}
<path class="h" d="M539 164 q6 -4 12 0 M561 164 q6 -4 12 0"/>
${nose(556, 176)}
<path class="t" d="M546 190 q10 7 20 0"/>`);
  add(limb([[586, 238], [604, 300], [628, 316]], 19, 15, tone(0.5)));
  add(`${hand(630, 312, -60)}`);
  add(limb([[526, 238], [486, 270], [446, 250]], 19, 15, tone(0.5)));
  add(`<g transform="rotate(-6 424 242)">${env(396, 226, 58, 34)}<rect class="o" fill="${pat('stD')}" x="436" y="230" width="13" height="15"/></g>
${hand(406, 244, -70)}${hand(446, 252, 70)}`);
}
