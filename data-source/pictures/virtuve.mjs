export default function draw({ add, def, shade, floor, limb, hand, shoe, tone, pat, f, W, H }) {
  def(`<pattern id="tile" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#fff"/><path d="M0 0.6 H26 M0.6 0 V26" stroke="#9a9a9a" stroke-width="1.3"/></pattern>`);
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    tiles: 'M20 150 H262 V386 H20 Z',
    pane: 'M421 71 H549 V219 H421 Z',
    stove: 'M38 332 H232 V540 H38 Z',
    pot: 'M78 270 L78 318 Q130 330 182 318 L182 270 Z',
    dress: 'M296 224 Q300 212 324 212 Q348 212 352 224 L362 356 L380 520 L268 520 L286 356 Z',
    apron: 'M300 300 L348 300 L364 486 L284 486 Z',
    shirt: 'M582 268 Q586 254 612 254 Q638 254 642 268 L648 350 L576 350 Z',
    tableTop: 'M450 340 L770 340 L782 362 L438 362 Z',
    tableFront: 'M438 362 H782 V380 H438 Z',
    bread: 'M682 354 Q676 330 702 327 L744 327 Q770 330 764 354 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(`<path class="o" fill="${pat('tile')}" d="${D.tiles}"/>`);
  add(shade([{ lin: [20, 0, 262, 0], s: [0, 0.18] }], D.tiles));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [150, 546, 118, 13], s: 0.7 }]));
  add(shade([{ rad: [336, 566, 70, 10], s: 0.7 }]));
  add(shade([{ rad: [626, 552, 186, 14], s: 0.7 }]));

  add(`<rect class="o" x="410" y="60" width="150" height="170"/>
<rect class="o" x="421" y="71" width="128" height="148"/>
${shade([{ lin: [421, 71, 549, 219], s: [0.22, 0.04] }], D.pane)}
<circle class="o" cx="452" cy="104" r="16"/>
<path class="t" d="M452 80 v-6 M452 128 v6 M428 104 h-5 M476 104 h6 M435 87 l-4 -4 M469 87 l4 -4 M435 121 l-4 4 M469 121 l4 4"/>
<path class="t" d="M485 71 V219 M421 145 H549"/>
<path class="t" d="M500 112 q6 -8 12 0 q6 -8 12 0 M430 186 q12 -14 26 -4 q10 -12 22 0 q8 -6 16 2"/>
<rect class="o" x="398" y="230" width="174" height="11"/>`);

  add(`<circle class="o" cx="718" cy="110" r="38"/>
<circle class="o" cx="718" cy="110" r="31"/>
<path class="t" d="M718 84 v6 M718 130 v6 M692 110 h6 M738 110 h6"/>
<path class="t" d="M718 110 L718 90 M718 110 L733 118" stroke-width="4.4"/>
<circle class="k" cx="718" cy="110" r="3.5"/>`);
  add(shade([{ lin: [690, 0, 756, 0], s: [0, 0.35] }], 'M718 72 a38 38 0 1 1 0 76 a38 38 0 1 1 0 -76 Z'));

  add(`<path class="o" d="M46 316 L224 316 L232 332 L38 332 Z"/>
<ellipse class="h" cx="200" cy="324" rx="16" ry="4"/>
<path class="o" d="${D.stove}"/>
${shade([{ lin: [130, 0, 232, 0], s: [0, 0.45] }], D.stove)}
${[70, 108, 146, 184].map((x) => `<circle class="o" cx="${x}" cy="350" r="8"/><path class="t" d="M${x} 344 V350"/>`).join('')}
<rect class="o" x="56" y="372" width="158" height="140" rx="4"/>
<rect class="o" x="72" y="380" width="126" height="10" rx="5"/>
<rect class="o" fill="${tone(0.72)}" x="80" y="404" width="110" height="88" rx="4"/>
<path class="w" d="M92 418 l22 -10 M92 432 l40 -18"/>
<path class="k" d="M48 540 h14 v8 h-14 Z M208 540 h14 v8 h-14 Z"/>`);

  add(`<path class="o" d="${D.pot}"/>
${shade([{ lin: [130, 0, 182, 0], s: [0, 0.45] }], D.pot)}
<ellipse class="o" cx="130" cy="270" rx="52" ry="8"/>
<ellipse class="o" fill="${tone(0.42)}" cx="130" cy="271" rx="44" ry="5"/>
<path class="t" d="M78 282 h-14 q-6 0 -6 6 q0 6 6 6 h14 M182 282 h14 q6 0 6 6 q0 6 -6 6 h-14"/>
<path class="t" d="M100 252 q-9 -12 0 -24 q9 -12 0 -24 M130 248 q-9 -13 0 -26 q9 -13 0 -26 q-6 -8 0 -16 M160 252 q-9 -12 0 -24 q9 -12 0 -24"/>`);

  add(`<path class="o" fill="${tone(0.5)}" d="${D.dress}"/>
${shade([{ lin: [322, 0, 380, 0], s: [0, 0.45] }], D.dress)}
<path class="o" d="M306 238 H342 V302 H306 Z"/>
<path class="o" d="${D.apron}"/>
${shade([{ lin: [330, 0, 364, 0], s: [0, 0.3] }], D.apron)}
<path class="t" d="M306 238 L300 222 M342 238 L348 222"/>
<rect class="o" x="312" y="196" width="22" height="20"/>`);
  add(limb([[310, 518], [309, 552]], 14, 13));
  add(limb([[340, 518], [341, 552]], 14, 13));
  add(`${shoe(306, 562, -1)}${shoe(345, 562)}`);
  add(limb([[350, 232], [366, 296], [364, 352]], 19, 15, tone(0.5)));
  add(hand(364, 358, 5));
  add(limb([[222, 262], [146, 273]], 7, 6, tone(0.4)));
  add(`<path class="h" d="M128 273 q9 4 18 0 q9 4 18 0"/>`);
  add(limb([[298, 232], [266, 278], [222, 270]], 19, 15, tone(0.5)));
  add(hand(220, 266, 80));

  add(`<path class="k" d="M290 186 Q284 126 323 124 Q362 126 356 186 L360 210 Q348 214 342 204 L304 204 Q298 214 286 210 Z"/>
<ellipse class="o" cx="323" cy="168" rx="28" ry="34"/>
<path class="k" d="M295 160 Q296 130 323 130 Q350 130 351 160 Q342 144 323 146 Q306 144 295 160 Z"/>
<circle class="k" cx="323" cy="118" r="13"/>
<ellipse class="k" cx="311" cy="170" rx="3" ry="4"/><ellipse class="k" cx="335" cy="170" rx="3" ry="4"/>
<path class="h" d="M304 161 q6 -4 12 0 M330 161 q6 -4 12 0 M323 174 q-3 7 2 8"/>
<path class="t" d="M313 188 q10 6 20 0"/>`);

  add(`<path class="k" d="M562 236 h9 v120 h-9 Z M650 236 h9 v120 h-9 Z"/>
<rect class="o" fill="${tone(0.3)}" x="556" y="226" width="110" height="18" rx="3"/>
<path class="o" fill="${pat('stH')}" d="${D.shirt}"/>
${shade([{ lin: [612, 0, 648, 0], s: [0, 0.45] }], D.shirt)}
<path class="o" d="M600 256 L612 268 L624 256 Z"/>
<rect class="o" x="605" y="240" width="14" height="16"/>
<ellipse class="o" cx="612" cy="212" rx="30" ry="33"/>
<path class="k" d="M582 214 Q578 176 612 175 Q646 176 642 214 Q638 198 632 196 L628 205 L622 192 L616 203 L610 190 L604 203 L598 192 L592 205 L588 196 Q584 200 582 214 Z"/>
<ellipse class="k" cx="601" cy="214" rx="3" ry="4"/><ellipse class="k" cx="623" cy="214" rx="3" ry="4"/>
<path class="h" d="M594 205 q6 -4 12 0 M618 205 q6 -4 12 0 M612 218 q-3 7 2 8"/>
<path class="t" d="M602 230 q10 6 20 0"/>
<path class="h" d="M585 226 q3 3 6 0 M633 226 q3 3 6 0"/>`);

  add(`<path class="k" d="M556 384 h9 v150 h-9 Z M655 384 h9 v150 h-9 Z"/>
<rect class="o" fill="${tone(0.3)}" x="548" y="380" width="124" height="14" rx="3"/>`);
  add(limb([[596, 394], [594, 516]], 15, 13, tone(0.75)));
  add(limb([[628, 394], [630, 516]], 15, 13, tone(0.75)));
  add(`${shoe(590, 528, -1)}${shoe(634, 528)}`);

  add(`<path class="o" fill="${tone(0.22)}" d="${D.tableTop}"/>
<path class="o" fill="${tone(0.22)}" d="${D.tableFront}"/>
${shade([{ lin: [610, 0, 782, 0], s: [0, 0.4] }], D.tableFront)}
<path class="o" fill="${tone(0.22)}" d="M450 380 h14 v168 h-14 Z M756 380 h14 v168 h-14 Z"/>
${shade([{ lin: [450, 0, 464, 0], s: [0, 0.4] }], 'M450 380 h14 v168 h-14 Z')}
${shade([{ lin: [756, 0, 770, 0], s: [0, 0.5] }], 'M756 380 h14 v168 h-14 Z')}
<path class="h" d="M500 350 h60 M670 346 h40 M520 356 h30"/>`);

  add(`<ellipse class="o" fill="${tone(0.3)}" cx="612" cy="352" rx="56" ry="11"/>
<ellipse class="o" cx="612" cy="351" rx="38" ry="6.5"/>
${shade([{ rad: [742, 356, 40, 6], s: 0.6 }])}
<path class="o" fill="${tone(0.5)}" d="${D.bread}"/>
${shade([{ lin: [722, 0, 756, 0], s: [0, 0.45] }], D.bread)}
<path class="w" d="M694 344 l10 -12 M712 345 l12 -14 M732 345 l12 -14 M750 344 l8 -10"/>`);
  add(limb([[584, 276], [568, 316], [580, 344]], 17, 14, pat('stH')));
  add(limb([[640, 276], [660, 312], [664, 336]], 17, 14, pat('stH')));
  add(limb([[670, 340], [670, 276]], 6, 6, tone(0.4)));
  add(`<ellipse class="o" fill="${tone(0.4)}" cx="670" cy="264" rx="9" ry="13"/>
${hand(586, 346, 70)}${hand(668, 334, 0)}`);
}
