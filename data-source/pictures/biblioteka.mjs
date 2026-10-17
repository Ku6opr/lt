export default function draw({ add, shade, floor, limb, shoe, tone, rng, f, W, H }) {
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M54 84 H176 V266 H54 Z',
    shelf: 'M556 44 H792 V536 H556 Z',
    top: 'M232 330 L468 330 L496 376 L204 376 Z',
    sweater: 'M286 270 Q292 254 320 254 Q348 254 354 270 L360 350 L280 350 Z',
    pot: 'M76 452 H136 L128 512 H84 Z',
    shirt: 'M582 226 Q586 212 610 212 Q634 212 638 226 L644 348 L576 348 Z',
    lampShade: 'M392 262 L436 248 L446 286 Z'
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);

  add(`<rect class="o" x="40" y="70" width="150" height="210"/>
<path class="o" d="${D.pane}"/>
${shade([{ lin: [54, 84, 176, 266], s: [0.04, 0.24] }], D.pane)}
<path class="o" d="M70 130 Q72 112 92 114 Q100 98 120 104 Q136 98 142 114 Q160 114 160 130 Z"/>
<path class="t" d="M115 84 V266 M54 175 H176"/>
<rect class="o" x="30" y="280" width="170" height="11"/>`);

  add(shade([{ rad: [118, 516, 52, 8], s: 0.6 }]));
  add(`<path class="t" d="M106 452 Q100 400 82 372 M106 452 Q108 392 112 350 M106 452 Q120 410 140 386"/>
<path class="o" fill="${tone(0.3)}" d="M96 430 Q70 418 72 398 Q94 404 100 428 Z M114 432 Q138 414 150 420 Q140 440 116 436 Z M108 412 Q88 396 96 380 Q112 394 108 412 Z"/>
${[[82, 368], [112, 344], [140, 382]].map(([x, y]) => `<g>${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse class="o" cx="${f(x + 10 * Math.cos((a * Math.PI) / 180))}" cy="${f(y + 10 * Math.sin((a * Math.PI) / 180))}" rx="7" ry="5" transform="rotate(${a} ${f(x + 10 * Math.cos((a * Math.PI) / 180))} ${f(y + 10 * Math.sin((a * Math.PI) / 180))})"/>`).join('')}<circle class="k" cx="${x}" cy="${y}" r="6"/></g>`).join('')}
<path class="o" fill="${tone(0.5)}" d="${D.pot}"/>
${shade([{ lin: [106, 0, 136, 0], s: [0, 0.5] }], D.pot)}
<path class="o" fill="${tone(0.5)}" d="M70 444 H142 V456 H70 Z"/>`);

  add(shade([{ rad: [690, 548, 130, 12], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.42)}" d="${D.shelf}"/>
${shade([{ lin: [640, 0, 792, 0], s: [0, 0.45] }], D.shelf)}
<path class="o" fill="${tone(0.15)}" d="M570 56 H778 V146 H570 Z M570 160 H778 V256 H570 Z M570 270 H778 V366 H570 Z M570 380 H778 V476 H570 Z"/>
<path class="o" fill="${tone(0.42)}" d="M570 476 H778 V524 H570 Z"/>`);
  const r = rng(11);
  const fills = ['#fff', tone(0.75), tone(0.35), 'url(#stH)', tone(0.55), '#fff', tone(0.9)];
  const books = [];
  [[146, 56], [256, 160], [366, 270], [476, 380]].forEach(([bottom, top], row) => {
    let x = 572;
    let k = row * 3;
    while (x < 772) {
      const w = 14 + Math.floor(r() * 12);
      if (x + w > 776) break;
      const h = bottom - top - 8 - Math.floor(r() * 26);
      const lean = row === 1 && x > 700 && x < 730;
      if (lean) {
        books.push(`<path class="o" fill="${fills[k % fills.length]}" d="M${x} ${bottom} L${x + w} ${bottom} L${x + w + 28} ${bottom - h + 6} L${x + 28} ${bottom - h} Z"/>`);
        x += w + 34;
      } else {
        books.push(`<rect class="o" fill="${fills[k % fills.length]}" x="${x}" y="${bottom - h}" width="${w}" height="${h}"/><path class="h" d="M${x + 3} ${bottom - h + 10} h${w - 6} M${x + 3} ${bottom - 12} h${w - 6}"/>`);
        x += w + 2;
      }
      k++;
    }
  });
  add(books.join(''));

  add(`<path class="o" fill="${tone(0.5)}" d="M282 250 Q282 234 320 234 Q358 234 358 250 V330 H282 Z"/>
${shade([{ lin: [320, 0, 358, 0], s: [0, 0.45] }], 'M282 250 Q282 234 320 234 Q358 234 358 250 V330 H282 Z')}
<path class="o" fill="${tone(0.42)}" d="${D.sweater}"/>
${shade([{ lin: [320, 0, 360, 0], s: [0, 0.45] }], D.sweater)}
<path class="o" d="M308 256 L320 268 L332 256 Z"/>
<rect class="o" x="314" y="236" width="12" height="20"/>
<path class="k" d="M288 210 Q284 172 320 172 Q356 172 352 210 Q358 240 348 262 Q340 248 340 216 L300 216 Q300 248 292 262 Q282 240 288 210 Z"/>
<ellipse class="o" cx="320" cy="212" rx="28" ry="33"/>
<path class="k" d="M291 208 Q290 178 320 178 Q350 178 349 206 Q340 192 324 190 Q312 200 296 196 Q292 200 291 208 Z"/>
<circle class="o" cx="309" cy="216" r="9"/><circle class="o" cx="332" cy="216" r="9"/>
<path class="t" d="M318 216 h5 M300 214 l-8 -2 M341 214 l8 -2"/>
<path class="t" d="M304 219 q5 3 10 0 M327 219 q5 3 10 0"/>
<path class="h" d="M322 222 q-3 6 2 7"/>
<path class="t" d="M313 234 q7 4 14 0"/>`);

  add(shade([{ rad: [360, 530, 170, 14], s: 0.6 }]));
  add(`<path class="o" fill="${tone(0.5)}" d="M216 376 h12 v148 h-12 Z M472 376 h12 v148 h-12 Z"/>
${shade([{ lin: [472, 0, 484, 0], s: [0, 0.5] }], 'M472 376 h12 v148 h-12 Z')}
<path class="o" fill="${tone(0.32)}" d="${D.top}"/>
${shade([{ lin: [350, 0, 496, 0], s: [0, 0.4] }], D.top)}
<path class="o" fill="${tone(0.5)}" d="M204 376 H496 V392 H204 Z"/>
${shade([{ lin: [350, 0, 496, 0], s: [0, 0.4] }], 'M204 376 H496 V392 H204 Z')}`);

  add(`<path class="o" d="M268 366 L320 356 L372 366 L370 372 L320 362 L270 372 Z"/>
<path class="h" d="M270 370 L320 360 L370 370"/>
<path class="o" fill="${tone(0.6)}" d="M270 372 L320 362 L370 372 L370 378 L320 368 L270 378 Z"/>
<path class="o" d="M272 336 Q296 328 320 340 Q344 328 368 336 L372 366 Q346 356 320 366 Q294 356 268 366 Z"/>
<path class="t" d="M320 340 V366"/>
<path class="h" d="M282 344 q16 -4 30 2 M282 352 q16 -4 30 2 M328 346 q16 -6 30 -2 M328 354 q16 -6 30 -2"/>`);
  add(limb([[292, 274], [272, 318], [282, 348]], 14, 12, tone(0.42)));
  add(limb([[348, 274], [368, 318], [358, 348]], 14, 12, tone(0.42)));
  add(`<ellipse class="o" cx="282" cy="352" rx="7" ry="9" transform="rotate(20 282 352)"/>
<ellipse class="o" cx="358" cy="352" rx="7" ry="9" transform="rotate(-20 358 352)"/>`);

  add(`<path class="o" d="M214 340 L264 336 L270 372 L210 376 Z"/>
${shade([{ lin: [240, 0, 270, 0], s: [0, 0.3] }], 'M214 340 L264 336 L270 372 L210 376 Z')}
<path class="h" d="M216 350 L266 346 M215 358 L267 354 M213 366 L268 362"/>
${[220, 230, 240, 250, 260].map((x) => `<circle class="h" cx="${x}" cy="${f(339.6 - (x - 214) * 0.08)}" r="3"/>`).join('')}
<path class="k" d="M222 372 L262 352 L265 356 L225 376 Z"/>
<path class="o" d="M262 352 L270 348 L265 356 Z"/>`);

  add(`<ellipse class="o" fill="${tone(0.6)}" cx="452" cy="358" rx="22" ry="7"/>
<path class="t" stroke-width="5" d="M452 354 L462 300 L434 266"/>
<circle class="o" cx="462" cy="300" r="5"/>
<g transform="translate(424 280) rotate(40)"><path class="o" fill="${tone(0.6)}" d="M-7 -26 H7 L22 8 H-22 Z"/>
${shade([{ lin: [0, 0, 22, 0], s: [0, 0.5] }], 'M-7 -26 H7 L22 8 H-22 Z')}
<ellipse class="o" cx="0" cy="8" rx="22" ry="6"/></g>
<path class="h" d="M396 300 L378 318 M406 306 L394 328 M418 310 L412 330"/>`);

  add(shade([{ rad: [624, 566, 66, 10], s: 0.65 }]));
  add(limb([[598, 344], [594, 450], [592, 548]], 17, 15, tone(0.75)));
  add(limb([[626, 344], [630, 450], [632, 548]], 17, 15, tone(0.75)));
  add(`${shoe(590, 560, -1)}${shoe(636, 560)}
<path class="o" fill="${tone(0.75)}" d="M576 338 H644 L646 378 H574 Z"/>
<path class="o" fill="url(#stV)" d="${D.shirt}"/>
${shade([{ lin: [610, 0, 644, 0], s: [0, 0.45] }], D.shirt)}
<path class="o" d="M598 214 L610 228 L622 214 Z"/>`);
  add(limb([[584, 230], [566, 290], [578, 344]], 16, 14, 'url(#stV)'));
  add(`<ellipse class="o" cx="580" cy="350" rx="7" ry="9" transform="rotate(-10 580 350)"/>
<path class="o" fill="${tone(0.75)}" transform="rotate(-18 668 126)" d="M656 92 h22 v68 h-22 Z"/>
<path class="h" transform="rotate(-18 668 126)" d="M660 104 h14 M660 148 h14"/>`);
  add(limb([[636, 230], [664, 186], [664, 140]], 16, 14, 'url(#stV)'));
  add(`<ellipse class="o" cx="664" cy="134" rx="7" ry="9" transform="rotate(10 664 134)"/>
<rect class="o" x="604" y="194" width="12" height="20"/>
<ellipse class="o" cx="610" cy="166" rx="29" ry="34"/>
<path class="k" d="M581 170 Q576 130 610 130 Q646 130 640 168 Q636 148 620 144 Q604 152 588 146 Q582 156 581 170 Z"/>
<ellipse class="k" cx="604" cy="166" rx="3" ry="4"/><ellipse class="k" cx="626" cy="166" rx="3" ry="4"/>
<path class="h" d="M598 156 q5 -3 10 0 M620 156 q5 -3 10 0 M618 172 q-2 6 3 7"/>
<path class="t" d="M606 186 q9 5 18 0"/>`);
}
