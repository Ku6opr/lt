export function hash(s) {
  let h = 2166136261;
  for (const ch of s) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const DAY0 = '2026-09-26';

function dayNum(key) {
  const [y, m, d] = key.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

function simulate(last, pool, count) {
  const shown = new Map();
  let picked = [];
  for (let d = dayNum(DAY0); d <= last; d++) {
    const ranked = pool
      .filter((p) => (!p.since || dayNum(p.since) <= d) && (!p.until || dayNum(p.until) > d))
      .map((p) => ({ p, last: shown.has(p.id) ? shown.get(p.id) : -1, tie: hash(p.id + '|' + d) }))
      .sort((a, b) => a.last - b.last || a.tie - b.tie);
    const groups = new Set();
    const spread = [];
    const rest = [];
    for (const x of ranked) {
      const g = x.p.group || x.p.id;
      if (groups.has(g)) rest.push(x);
      else {
        groups.add(g);
        spread.push(x);
      }
    }
    picked = spread.concat(rest).slice(0, count).map((x) => x.p);
    for (const p of picked) shown.set(p.id, d);
  }
  return { picked, shown };
}

export function pickForDay(key, pool, count) {
  return simulate(Math.max(dayNum(DAY0), dayNum(key)), pool, count).picked;
}

export function shownBefore(key, pool, count) {
  return new Set(simulate(dayNum(key) - 1, pool, count).shown.keys());
}
