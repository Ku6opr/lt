export default function draw({ add, shade, floor, limb, hand, shoe, tone, pat, W, H }) {
  const eyes = (x, y, dx = 11) => `<ellipse class="k" cx="${x - dx}" cy="${y}" rx="3" ry="4"/><ellipse class="k" cx="${x + dx}" cy="${y}" rx="3" ry="4"/>`;
  const brows = (x, y, dx = 11) => `<path class="h" d="M${x - dx - 6} ${y} q6 -4 12 0 M${x + dx - 6} ${y} q6 -4 12 0"/>`;
  const nose = (x, y) => `<path class="h" d="M${x} ${y} q-3 7 2 8"/>`;
  const cross = (x, y, a = 4) => `<path class="k" d="M${x - a} ${y - 3 * a} h${2 * a} v${2 * a} h${2 * a} v${2 * a} h${-2 * a} v${2 * a} h${-2 * a} v${-2 * a} h${-2 * a} v${-2 * a} h${2 * a} Z"/>`;
  const bottle = (x, y, w, h, t) => `<rect class="o" fill="${tone(t)}" x="${x}" y="${y - h}" width="${w}" height="${h}" rx="3"/><rect class="o" x="${x + w * 0.2}" y="${y - h - 7}" width="${w * 0.6}" height="8" rx="1"/><rect class="o" x="${x + 2}" y="${y - h * 0.68}" width="${w - 4}" height="${h * 0.34}"/>`;
  const box = (x, y, w, h) => `<rect class="o" x="${x}" y="${y - h}" width="${w}" height="${h}"/>${cross(x + w / 2, y - h / 2, Math.min(w, h) / 9)}`;

  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    counter: 'M24 334 H476 V548 H24 Z',
    gown: 'M252 238 Q256 212 290 212 Q324 212 328 238 L334 334 L246 334 Z',
    coat: 'M552 238 Q556 212 590 212 Q624 212 628 238 L640 476 L540 476 Z',
    door: 'M680 104 H792 V548 H680 Z',
    glass: 'M696 122 H776 V300 H696 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [250, 552, 240, 13], s: 0.7 }]));
  add(shade([{ rad: [596, 562, 76, 11], s: 0.7 }]));

  add(`<path class="o" fill="${tone(0.3)}" d="${D.door}"/>
${shade([{ lin: [736, 0, 792, 0], s: [0, 0.5] }], D.door)}
<path class="o" fill="${tone(0.08)}" d="${D.glass}"/>
${shade([{ lin: [696, 122, 776, 300], s: [0.3, 0.05] }], D.glass)}
<path class="w" d="M708 180 L734 140 M716 204 L756 146" stroke-width="4"/>
<rect class="o" x="696" y="330" width="80" height="190"/>
<rect class="k" x="694" y="326" width="16" height="7" rx="3"/>`);

  const shelf = (y) => `<rect class="o" fill="${tone(0.3)}" x="20" y="${y}" width="470" height="9"/><path class="k" d="M44 ${y + 9} l8 0 l-8 12 Z M458 ${y + 9} l8 0 l0 12 Z"/>`;
  add(`${bottle(36, 98, 20, 40, 0.45)}${bottle(62, 98, 16, 28, 0.7)}${box(86, 98, 40, 34)}${bottle(134, 98, 22, 46, 0.2)}${bottle(162, 98, 16, 30, 0.6)}
${box(190, 98, 34, 28)}${bottle(232, 98, 20, 38, 0.75)}${bottle(258, 98, 18, 26, 0.35)}${box(284, 98, 44, 36)}${bottle(336, 98, 22, 44, 0.5)}${bottle(364, 98, 16, 30, 0.2)}${box(388, 98, 36, 30)}${bottle(432, 98, 20, 40, 0.65)}${bottle(458, 98, 18, 28, 0.4)}
${shelf(98)}
${box(34, 188, 38, 32)}${bottle(80, 188, 22, 44, 0.6)}${bottle(108, 188, 16, 28, 0.25)}${bottle(130, 188, 20, 38, 0.75)}${box(158, 188, 44, 36)}${bottle(352, 188, 20, 40, 0.3)}${bottle(378, 188, 16, 30, 0.7)}${box(400, 188, 40, 32)}${bottle(448, 188, 22, 44, 0.45)}
${shelf(188)}
${box(36, 270, 40, 32)}${bottle(84, 270, 20, 40, 0.35)}${bottle(110, 270, 16, 28, 0.7)}${box(386, 270, 38, 30)}${bottle(432, 270, 22, 44, 0.6)}${bottle(460, 270, 16, 30, 0.25)}
${shelf(270)}`);

  add(`<path class="o" fill="#fff" d="${D.gown}"/>
${shade([{ lin: [290, 0, 334, 0], s: [0, 0.5] }], D.gown)}
<path class="o" fill="${tone(0.42)}" d="M274 214 L290 246 L306 214 Q290 222 274 214 Z"/>
<path class="t" d="M268 216 L290 256 L312 216"/>
<path class="h" d="M262 290 H282 V312"/>
<rect class="o" x="284" y="194" width="12" height="20"/>
<path class="k" d="M258 168 Q252 124 290 122 Q328 124 322 168 L326 206 Q312 210 306 198 L304 156 Q290 146 276 156 L274 198 Q268 210 254 206 Z"/>
<ellipse class="o" cx="290" cy="164" rx="29" ry="35"/>
<path class="k" d="M261 164 Q258 128 290 128 Q322 128 319 164 Q314 146 302 142 Q290 150 274 140 Q264 148 261 164 Z"/>
${eyes(290, 166)}${brows(290, 155)}${nose(290, 170)}
<path class="t" d="M281 184 q9 6 18 0"/>`);
  add(limb([[258, 238], [248, 290], [254, 340]], 18, 15));

  add(`<path class="o" fill="${tone(0.3)}" d="M18 318 H482 V334 H18 Z"/>
<path class="o" fill="${tone(0.22)}" d="${D.counter}"/>
${shade([{ lin: [250, 0, 476, 0], s: [0, 0.5] }], D.counter)}
<rect class="o" x="44" y="356" width="196" height="172"/>
<rect class="o" x="260" y="356" width="196" height="172"/>
<circle class="o" cx="142" cy="442" r="40"/>
${cross(142, 442, 9)}
<path class="o" fill="${tone(0.55)}" d="M58 318 L64 284 H156 L162 318 Z"/>
${shade([{ lin: [110, 0, 162, 0], s: [0, 0.5] }], 'M58 318 L64 284 H156 L162 318 Z')}
<path class="o" d="M72 304 h16 v8 h-16 Z M94 304 h16 v8 h-16 Z M116 304 h16 v8 h-16 Z M74 292 h16 v7 h-16 Z M96 292 h16 v7 h-16 Z M118 292 h16 v7 h-16 Z"/>
<path class="t" d="M120 284 V266"/>
<rect class="o" fill="${tone(0.7)}" x="96" y="246" width="50" height="22" rx="3"/>
<path class="w" d="M104 257 h14 M124 257 h14"/>`);

  add(limb([[322, 238], [398, 282], [478, 290]], 18, 15));

  add(limb([[574, 470], [572, 548]], 22, 19, tone(0.75)));
  add(limb([[606, 470], [608, 548]], 22, 19, tone(0.75)));
  add(`${shoe(568, 562, -1)}${shoe(612, 562)}
<path class="o" fill="${tone(0.55)}" d="${D.coat}"/>
${shade([{ lin: [590, 0, 640, 0], s: [0, 0.5] }], D.coat)}
<path class="o" fill="${pat('stH')}" d="M574 214 L590 244 L606 214 Q590 222 574 214 Z"/>
<path class="o" fill="${tone(0.55)}" d="M562 216 L580 220 L590 252 L572 262 Z"/>
<path class="o" fill="${tone(0.55)}" d="M618 216 L600 220 L590 252 L608 262 Z"/>
<path class="t" d="M590 252 V476"/>
<circle class="k" cx="598" cy="300" r="3"/><circle class="k" cx="598" cy="350" r="3"/><circle class="k" cx="598" cy="400" r="3"/>
<path class="h" d="M554 390 H578 V410 M602 390 H626 V410"/>
<rect class="o" x="584" y="196" width="12" height="18"/>
<ellipse class="o" cx="559" cy="172" rx="6" ry="9"/><ellipse class="o" cx="621" cy="172" rx="6" ry="9"/>
<ellipse class="o" cx="590" cy="168" rx="30" ry="35"/>
<path class="o" d="M561 158 Q558 150 562 146 L566 168 Z M619 158 Q622 150 618 146 L614 168 Z"/>
<path class="o" fill="${tone(0.8)}" d="M558 150 Q556 122 590 120 Q626 122 624 150 Z"/>
<path class="o" fill="${tone(0.8)}" d="M552 150 Q590 140 632 150 Q636 160 626 158 Q590 150 556 158 Q548 158 552 150 Z"/>
<circle class="o" cx="578" cy="172" r="9"/><circle class="o" cx="602" cy="172" r="9"/>
<path class="t" d="M587 172 h6 M569 170 l-8 -2 M611 170 l8 -2"/>
<circle class="k" cx="578" cy="173" r="2.4"/><circle class="k" cx="602" cy="173" r="2.4"/>
${nose(590, 178)}
<path class="o" d="M574 192 Q590 182 606 192 Q600 198 590 195 Q580 198 574 192 Z"/>
<path class="t" d="M583 200 q7 4 14 0"/>
<path class="h" d="M568 186 q2 4 0 8 M612 186 q-2 4 0 8"/>`);
  add(limb([[622, 238], [638, 310], [630, 374]], 19, 15, tone(0.55)));
  add(limb([[558, 238], [532, 290], [518, 296]], 19, 15, tone(0.55)));
  add(`<rect class="o" fill="${tone(0.15)}" x="476" y="268" width="44" height="34"/>
${shade([{ lin: [498, 0, 520, 0], s: [0, 0.4] }], 'M476 268 H520 V302 H476 Z')}
${cross(498, 285, 3.6)}
${hand(478, 292, -60)}${hand(520, 294, 60)}
<rect class="o" fill="${tone(0.8)}" x="620" y="380" width="42" height="28" rx="4"/>
<path class="o" fill="${tone(0.6)}" d="M620 386 Q620 380 626 380 H656 Q662 380 662 386 L662 392 L620 392 Z"/>
<circle class="o" cx="650" cy="392" r="3.5"/>
${hand(630, 380, 10)}`);
}
