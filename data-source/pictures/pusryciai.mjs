function people({ limb, hand, shoe, shade, tone }) {
  const BACK = {
    long: 'M-33 -6 Q-36 -44 0 -44 Q36 -44 33 -6 L37 54 Q18 62 0 56 Q-18 62 -37 54 Z',
    bob: 'M-34 -6 Q-36 -44 0 -44 Q36 -44 34 -6 L36 30 Q20 36 4 30 L-4 30 Q-20 36 -36 30 Z'
  };
  const HAIR = {
    boy: 'M-30 4 Q-34 -34 0 -37 Q34 -34 30 4 Q27 -12 21 -14 L17 -5 L11 -18 L6 -7 L0 -20 L-5 -7 L-11 -18 L-16 -5 L-20 -14 Q-25 -10 -30 4 Z',
    man: 'M-30 4 Q-34 -38 2 -38 Q34 -37 30 4 Q29 -12 23 -19 Q4 -11 -16 -19 Q-26 -12 -30 4 Z',
    fringe: 'M-30 2 Q-33 -40 0 -40 Q33 -40 30 2 Q27 -18 15 -22 Q2 -14 -12 -21 Q-25 -16 -30 2 Z',
    bun: 'M-30 6 Q-34 -34 0 -36 Q34 -34 30 6 Q24 -18 0 -20 Q-24 -18 -30 6 Z'
  };
  const MOUTH = {
    smile: '<path class="t" d="M-9 19 q9 6 18 0"/>',
    open: '<path class="k" d="M-13 16 Q0 22 13 16 Q10 31 0 31 Q-10 31 -13 16 Z"/><path class="w" d="M-8 19 Q0 21 8 19"/>',
    talk: '<path class="k" d="M-7 18 Q0 16 7 18 Q6 28 0 28 Q-6 28 -7 18 Z"/>'
  };
  function head(x, y, o = {}) {
    const hf = o.hairFill ? `class="o" fill="${o.hairFill}"` : 'class="k"';
    const s = [];
    if (o.back) s.push(`<path ${hf} d="${BACK[o.back]}"/>`);
    s.push('<ellipse class="o" cx="0" cy="0" rx="29" ry="35"/>');
    if (o.hair) s.push(`<path ${hf} d="${HAIR[o.hair]}"/>`);
    if (o.hair === 'bun') s.push(`<circle ${hf} cx="0" cy="-46" r="14"/><path class="h" d="M0 -34 Q-14 -28 -24 -6 M0 -34 Q14 -28 24 -6"/>`);
    const lx = o.look || 0;
    if (o.glasses) s.push(`<circle class="o" cx="-12" cy="2" r="9"/><circle class="o" cx="12" cy="2" r="9"/><path class="t" d="M-3 2 h6 M-21 0 l-8 -2 M21 0 l8 -2"/><circle class="k" cx="${-12 + lx}" cy="3" r="2.6"/><circle class="k" cx="${12 + lx}" cy="3" r="2.6"/>`);
    else s.push(`<ellipse class="k" cx="${-11 + lx}" cy="2" rx="3" ry="4"/><ellipse class="k" cx="${11 + lx}" cy="2" rx="3" ry="4"/>`);
    s.push('<path class="h" d="M-18 -10 q6 -4 12 0 M6 -10 q6 -4 12 0 M0 6 q-3 7 2 8"/>');
    s.push(MOUTH[o.mouth || 'smile']);
    return `<g transform="translate(${x} ${y})">${s.join('')}</g>`;
  }
  function torso(x, y, fill, o = {}) {
    const w0 = o.w0 || 40;
    const w1 = o.w1 || 46;
    const top = y + 44;
    const h = o.h || 152;
    const d = `M${x - w0} ${top + 26} Q${x - w0 + 6} ${top} ${x} ${top} Q${x + w0 - 6} ${top} ${x + w0} ${top + 26} L${x + w1} ${top + h} L${x - w1} ${top + h} Z`;
    return `<path class="o" fill="${fill}" d="${d}"/>${shade([{ lin: [x, 0, x + w1, 0], s: [0, 0.45] }], d)}`;
  }
  const neck = (x, y) => `<rect class="o" x="${x - 6}" y="${y + 28}" width="12" height="19"/>`;
  const arm = (pts, fill = '#fff', a = 0, w = [19, 15]) => limb(pts, w[0], w[1], fill) + hand(pts[pts.length - 1][0], pts[pts.length - 1][1], a);
  return { head, torso, neck, arm };
}

export default function draw(kit) {
  const { add, clip, shade, floor, limb, shoe, scallops, tone, pat, f, W, H } = kit;
  const { head, torso, neck, arm } = people(kit);
  const T = 398;
  const D = {
    wall: `M0 0 H${W} V386 H0 Z`,
    floor: `M0 400 H${W} V${H} H0 Z`,
    pane: 'M42 52 H160 V188 H42 Z',
    top: `M66 ${T} L734 ${T} L746 ${T + 18} L54 ${T + 18} Z`,
    cloth: `M54 ${T + 18} L746 ${T + 18} L752 566 ${scallops(48, 752, 566)} L48 566 Z`,
    pot: `M262 ${T + 10} Q250 ${T - 56} 300 ${T - 58} Q350 ${T - 56} 338 ${T + 10} Z`
  };

  add(shade([{ lin: [250, 0, 800, 0], s: [0, 0.3] }, { lin: [0, 300, 0, 386], s: [0, 0.12] }], D.wall));
  add(floor());
  add(shade([{ lin: [0, 400, 0, 440], s: [0.38, 0] }, { lin: [300, 0, 800, 0], s: [0, 0.16] }], D.floor));
  add(`<rect class="o" x="-10" y="386" width="${W + 20}" height="14"/>`);
  add(shade([{ rad: [410, 576, 390, 18], s: 0.7 }]));

  add(`<rect class="o" x="30" y="40" width="142" height="160"/>
<rect class="o" x="42" y="52" width="118" height="136"/>
${shade([{ lin: [42, 52, 160, 188], s: [0.16, 0.02] }], D.pane)}
<g ${clip(D.pane)}><circle class="o" cx="124" cy="92" r="17"/><path class="t" d="M124 64 v-8 M124 120 v8 M96 92 h-8 M152 92 h8 M104 72 l-6 -6 M144 112 l6 6 M144 72 l6 -6 M104 112 l-6 6"/></g>
<path class="t" d="M101 52 V188 M42 120 H160"/>
<rect class="o" x="22" y="200" width="158" height="11"/>`);

  add(`<circle class="o" cx="400" cy="96" r="38"/>
<circle class="o" cx="400" cy="96" r="31"/>
<path class="h" d="M400 68 v6 M400 118 v6 M372 96 h6 M422 96 h6"/>
<path class="t" d="M400 96 L400 74 M400 96 L384 104"/>
<circle class="k" cx="400" cy="96" r="3"/>`);

  add(`<rect class="o" fill="${tone(0.35)}" x="636" y="44" width="132" height="104"/>
<rect class="o" x="648" y="56" width="108" height="80"/>
<path class="o" fill="${tone(0.3)}" d="M648 136 L684 88 L706 114 L726 96 L756 136 Z"/>
<circle class="o" cx="730" cy="76" r="9"/>`);

  const dy = 46;
  add(`<path class="k" d="M146 ${288 + dy} h8 v70 h-8 Z M246 ${288 + dy} h8 v70 h-8 Z M556 ${288 + dy} h8 v70 h-8 Z M656 ${288 + dy} h8 v70 h-8 Z M360 ${330} h8 v68 h-8 Z M432 ${330} h8 v68 h-8 Z"/>`);

  const dad = 200;
  const mom = 610;
  const kid = 400;
  add(torso(dad, 206 + dy, tone(0.45), { h: 110 }));
  add(neck(dad, 206 + dy));
  add(`<path class="o" fill="${tone(0.45)}" d="M184 ${250 + dy} L200 ${270 + dy} L216 ${250 + dy} L222 ${258 + dy} L200 ${282 + dy} L178 ${258 + dy} Z"/>`);
  add(head(dad, 206 + dy, { hair: 'man', look: 3 }));
  add(`<path class="k" d="M188 ${221 + dy} Q194 ${214 + dy} 200 ${218 + dy} Q206 ${214 + dy} 212 ${221 + dy} Q206 ${224 + dy} 200 ${221 + dy} Q194 ${224 + dy} 188 ${221 + dy} Z"/>`);
  add(arm([[166, 278 + dy], [146, 330 + dy], [178, 360 + dy]], tone(0.45), 70, [18, 14]));

  const hy = 268;
  add(`<path class="k" d="M370 ${hy + 12} Q350 ${hy + 22} 354 ${hy + 52} Q364 ${hy + 56} 374 ${hy + 32} Z M430 ${hy + 12} Q450 ${hy + 22} 446 ${hy + 52} Q436 ${hy + 56} 426 ${hy + 32} Z"/>
<path class="k" d="M362 ${hy + 24} l11 4 l-2 7 l-11 -4 Z M438 ${hy + 24} l-11 4 l2 7 l11 -4 Z"/>`);
  add(torso(kid, hy, tone(0.16), { w0: 30, w1: 34, h: 90 }));
  add(`<path class="o" d="M392 ${hy + 40} L400 ${hy + 50} L388 ${hy + 54} Z M408 ${hy + 40} L400 ${hy + 50} L412 ${hy + 54} Z"/>`);
  add(neck(kid, hy));
  add(head(kid, hy, { hair: 'fringe', look: 0 }));
  add(arm([[374, hy + 68], [352, hy + 100], [370, T - 2]], tone(0.16), 70, [15, 12]));

  add(torso(mom, 206 + dy, pat('dots'), { h: 110 }));
  add(neck(mom, 206 + dy));
  add(head(mom, 206 + dy, { hair: 'bun', look: -3 }));
  add(arm([[644, 278 + dy], [666, 330 + dy], [638, 360 + dy]], pat('dots'), -70, [18, 14]));

  add(`<path class="o" d="${D.top}"/>
<path class="o" d="${D.cloth}"/>
${shade([{ lin: [400, 0, 752, 0], s: [0, 0.5] }, { lin: [0, T + 18, 0, T + 40], s: [0.35, 0] }], D.cloth)}
<path class="o" fill="${pat('check')}" d="M49 530 L751 530 L752 552 L48 552 Z"/>
<path class="h" d="M150 432 Q144 480 152 522 M300 432 Q294 480 300 522 M500 432 Q506 480 500 522 M650 432 Q656 480 650 522"/>`);

  add(`<ellipse class="o" cx="214" cy="${T + 10}" rx="30" ry="6"/>
<path class="o" fill="${tone(0.25)}" d="${D.pot}"/>
${shade([{ lin: [300, 0, 340, 0], s: [0, 0.5] }], D.pot)}
<path class="o" fill="${tone(0.25)}" d="M262 ${T - 22} Q236 ${T - 30} 232 ${T - 52} L242 ${T - 54} Q248 ${T - 36} 264 ${T - 34} Z"/>
<path class="t" d="M336 ${T - 34} Q362 ${T - 30} 354 ${T - 10} Q348 ${T + 2} 336 ${T - 2}"/>
<path class="o" d="M276 ${T - 54} Q300 ${T - 70} 324 ${T - 54} Z"/><circle class="k" cx="300" cy="${T - 68}" r="6"/>
<path class="h" d="M262 ${T - 18} Q300 ${T - 8} 338 ${T - 18}"/>`);

  add(`<path class="o" fill="${tone(0.05)}" d="M352 ${T - 4} Q362 ${T - 20} 400 ${T - 20} Q438 ${T - 20} 448 ${T - 4} Z"/>
<path class="h" d="M374 ${T - 10} q6 -4 12 0 M406 ${T - 12} q6 -4 12 0"/>
<path class="o" d="M346 ${T - 6} H454 Q450 ${T + 22} 400 ${T + 24} Q350 ${T + 22} 346 ${T - 6} Z"/>
${shade([{ lin: [400, 0, 454, 0], s: [0, 0.4] }], `M346 ${T - 6} H454 Q450 ${T + 22} 400 ${T + 24} Q350 ${T + 22} 346 ${T - 6} Z`)}
<path class="h" d="M380 ${T - 28} q-5 -7 0 -14 q5 -7 0 -14 M400 ${T - 30} q-5 -7 0 -14 q5 -7 0 -14 M420 ${T - 28} q-5 -7 0 -14 q5 -7 0 -14"/>`);
  const cup = (x, y) => `<path class="o" d="M${x - 17} ${y - 30} h34 v24 q-17 10 -34 0 Z M${x + 17} ${y - 25} q11 0 10 9 q-1 9 -10 8"/><ellipse class="o" cx="${x}" cy="${y}" rx="22" ry="5"/>`;
  add(`${cup(478, T + 10)}${cup(700, T + 10)}`);
  const slice = (x, y, a) => `<g transform="rotate(${a} ${x} ${y})"><path class="o" fill="${tone(0.4)}" d="M${x - 18} ${y} L${x - 18} ${y - 30} Q${x - 24} ${y - 44} ${x - 8} ${y - 44} Q${x} ${y - 50} ${x + 8} ${y - 44} Q${x + 24} ${y - 44} ${x + 18} ${y - 30} L${x + 18} ${y} Z"/><path class="o" fill="${tone(0.08)}" d="M${x - 13} ${y - 4} L${x - 13} ${y - 30} Q${x - 17} ${y - 39} ${x - 6} ${y - 39} Q${x} ${y - 44} ${x + 6} ${y - 39} Q${x + 17} ${y - 39} ${x + 13} ${y - 30} L${x + 13} ${y - 4} Z"/></g>`;
  add(`<ellipse class="o" cx="540" cy="${T + 10}" rx="34" ry="7"/>
${slice(540, T + 8, -8)}`);

  add(`<path class="t" d="M446 ${T - 18} L426 ${T - 14}"/><ellipse class="o" cx="421" cy="${T - 13}" rx="8" ry="4" transform="rotate(-10 421 ${T - 13})"/>`);
  add(arm([[426, hy + 68], [452, hy + 104], [446, T - 16]], tone(0.16), -50, [15, 12]));

  add(`${slice(598, T - 22, 0)}<path class="o" fill="#fff" d="M586 ${T - 58} L608 ${T - 60} L610 ${T - 50} L588 ${T - 48} Z"/>`);
  add(arm([[576, 278 + dy], [554, 334 + dy], [584, T - 20]], pat('dots'), -60, [18, 14]));

  add(arm([[234, 278 + dy], [262, 334 + dy], [256, 254 + dy]], tone(0.45), 10, [18, 14]));
  add(`<path class="o" d="M220 ${228 + dy} h30 v22 q-15 8 -30 0 Z"/><path class="t" d="M250 ${232 + dy} q9 0 8 8 q-1 7 -8 7"/>
<path class="h" d="M228 ${220 + dy} q-4 -6 0 -12 q4 -6 0 -12 M242 ${220 + dy} q-4 -6 0 -12 q4 -6 0 -12"/>`);
}
