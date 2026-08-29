<script>
  import { progress } from '../stores/progress.js';
  import { DECLENSIONS } from '../data/declensions.js';
  import { WORDS } from '../data/words.js';
  import { ADJECTIVES } from '../data/adjectives.js';
  import { PRONOUNS } from '../data/pronouns.js';
  import { NUMERALS, TEENS } from '../data/numerals.js';
  import { DEM_PRONOUNS } from '../data/demPronouns.js';
  import { VERBS, PERSON_COLS, PERSON_LABEL } from '../data/verbsConj.js';
  import { Q_WORDS } from '../engine/questions.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  export let topic;

  const isAdj = topic.kind === 'adj';
  const isDeg = topic.mode === 'degrees';
  const isAdverb = topic.mode === 'adverbs';
  const isPron = topic.kind === 'pron';
  const isConj = topic.kind === 'conj';
  const isVF = topic.kind === 'vforms';
  const isNum = topic.kind === 'num';
  const isNumQty = topic.kind === 'numqty';
  const isDemNom = topic.kind === 'demnom';
  const isDemCase = topic.kind === 'demcase';
  const isQuest = topic.kind === 'quest';
  const ALL_CASES = ['V', 'K', 'N', 'G', 'In', 'Vt'];
  const cols = isQuest ? ['m|sg', 'f|sg', 'm|pl', 'f|pl'] : isDemNom ? ['sg', 'pl'] : isDemCase || isNum ? ['K', 'N', 'G', 'In', 'Vt'] : isNumQty ? ['V'] : isVF ? ['pres'] : isConj ? (topic.tense === 'imp' ? ['sg2', 'pl2'] : PERSON_COLS) : isAdverb ? ['pos', 'comp', 'sup'] : isPron ? ['K', 'N', 'G', 'In', 'Vt'] : isDeg ? ['comp', 'sup'] : isAdj ? topic.cheatCases : ALL_CASES;
  const ADJ_ROWS = [{ t: 'I' }, { t: 'II' }, { t: 'III' }];
  const nounName = {};
  for (const w of WORDS) nounName[w.id] = w;
  const adjName = {};
  for (const a of ADJECTIVES) adjName[a.id] = a;
  const verbName = {};
  for (const v of VERBS) verbName[v.id] = v;

  let viewNum = 'sg';
  $: L = UI[$lang];
  $: colLabel = (c) => (isQuest ? { 'm|sg': L.rowMsg, 'f|sg': L.rowFsg, 'm|pl': L.rowMpl, 'f|pl': L.rowFpl }[c] : isDemNom ? (c === 'sg' ? L.numSg : L.numPl) : isVF ? 'jis, ji' : isConj ? PERSON_LABEL[c] : isAdverb || isDeg ? L[c === 'pos' ? 'degPos' : c === 'comp' ? 'degComp' : 'degSup'] : c);
  $: data = ($progress[topic.id] && $progress[topic.id].forms) || {};

  const cellKey = (type, gender, c, vn) => (isAdj ? `tc|${type}|${gender}|${c}|${vn}` : `tc|${type}|${c}|${vn}`);

  function mastery(r) {
    if (!r || r.s === 0) return { kind: 'unseen' };
    const g = r.o + r.m;
    if (g === 0) return { kind: 'seen', s: r.s };
    return { kind: 'graded', acc: r.o / g, o: r.o, g };
  }
  function color(m) {
    if (m.kind === 'unseen') return 'transparent';
    if (m.kind === 'seen') return '#e7eef6';
    const a = m.acc;
    return `rgb(${Math.round(214 - 150 * a)},${Math.round(150 + 60 * a)},${Math.round(110 - 20 * a)})`;
  }
  function label(m) {
    if (m.kind === 'unseen') return '·';
    if (m.kind === 'seen') return m.s + '';
    return m.o + '/' + m.g;
  }

  function buildRows(d, vn) {
    const g = (k) => d[k] || null;
    if (isAdverb) {
      return ADJ_ROWS.map((r) => ({
        label: r.t,
        cells: cols.map((c) => ({ m: mastery(g(`tc|${r.t}|-|${c}|sg`)) }))
      }));
    }
    if (isQuest) {
      return Q_WORDS.map((q) => ({
        label: q.lt.m_sg + '?',
        cells: cols.map((c) => ({ m: mastery(g(`tc|${q.id}|${c}`)) }))
      }));
    }
    if (isConj || isVF) {
      return VERBS.map((v) => ({
        label: v.inf,
        cells: cols.map((c) => ({ m: mastery(g(`w|${v.id}|${c}`)) }))
      }));
    }
    if (isPron) {
      return PRONOUNS.map((p) => ({
        label: p.lt[0],
        cells: cols.map((c) => ({ m: mastery(g(`w|${p.id}|${c}|${p.num}`)) }))
      }));
    }
    if (isNum) {
      return NUMERALS.map((n) => ({
        label: n.lt,
        cells: cols.map((c) => ({ m: mastery(g(`tc|${n.id}|${c}`)) }))
      }));
    }
    if (isNumQty) {
      return [...NUMERALS, ...TEENS].map((n) => ({
        label: n.id + ' · ' + n.lt,
        cells: [{ m: mastery(g(`tc|${n.id}`)) }]
      }));
    }
    if (isDemNom) {
      return DEM_PRONOUNS.filter((p) => p.f).map((p) => ({
        label: p.lt,
        cells: cols.map((n) => ({ m: mastery(g(`tc|${p.id}|V|${n}`)) }))
      }));
    }
    if (isDemCase) {
      return DEM_PRONOUNS.filter((p) => p.f).map((p) => ({
        label: p.lt,
        cells: cols.map((c) => ({ m: mastery(g(`tc|${p.id}|${c}|${vn}`)) }))
      }));
    }
    return isAdj
      ? ADJ_ROWS.flatMap((t) => ['m', 'f'].map((gd) => ({
          label: t.t + ' ' + (gd === 'm' ? L.genderMAb : L.genderFAb),
          cells: cols.map((c) => ({ m: mastery(g(cellKey(t.t, gd, c, vn))) }))
        })))
      : DECLENSIONS.map((t) => ({
          label: t.id,
          cells: cols.map((c) => ({ m: mastery(g(cellKey(t.id, null, c, vn))) }))
        }));
  }
  function buildTotals(d) {
    let o = 0, m = 0, forms = 0;
    for (const [k, r] of Object.entries(d)) {
      if (k.startsWith('w|')) { forms++; o += r.o; m += r.m; }
    }
    return { forms, o, m, graded: o + m, acc: o + m ? o / (o + m) : 0 };
  }
  function buildWeak(d) {
    return Object.entries(d)
      .filter(([k]) => k.startsWith('w|'))
      .map(([k, r]) => { const id = k.split('|')[1]; const g = r.o + r.m; return { id, acc: g ? r.o / g : 1, g, m: r.m }; })
      .filter((x) => x.g > 0 && x.acc < 1)
      .sort((a, b) => a.acc - b.acc || b.m - a.m)
      .slice(0, 12);
  }

  $: rows = buildRows(data, viewNum);
  $: totals = buildTotals(data);
  $: weakWords = buildWeak(data);

  const pronName = {};
  for (const p of PRONOUNS) pronName[p.id] = p;
  const glossKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';
  const numName = {};
  for (const n of NUMERALS) numName[n.id] = n;
  for (const n of TEENS) numName[n.id] = n;
  const demName = {};
  for (const p of DEM_PRONOUNS) demName[p.id] = p;
  const tr = (id) => {
    if (isPron) return (pronName[id] && pronName[id][glossKey][0]) || id;
    if (isDemNom || isDemCase) { const p = demName[id]; return p ? (glossKey === 'en' ? p.en : p[glossKey].m.sg[0]) : id; }
    if (isNum || isNumQty) { const n = numName[id]; if (!n) return id; const v = n[glossKey]; return glossKey === 'en' ? n.en : typeof v === 'string' ? v : v.m[0]; }
    const src = isConj || isVF ? verbName : isAdj ? adjName : nounName;
    return (src[id] && src[id][glossKey]) || id;
  };

  function reset() { progress.update((all) => { delete all[topic.id]; return all; }); }
</script>

<div style="border:1px solid var(--color-divider);border-radius:var(--radius-md);padding:clamp(12px,2.5cqw,20px);background:var(--color-surface)">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:var(--space-3)">
    <div style="font-size:14px">
      <b>{totals.graded}</b> {L.answered} · {L.accuracy} <b>{Math.round(totals.acc * 100)}%</b> · {L.coverage} <b>{totals.forms}</b>
    </div>
    <div style="display:flex;gap:8px;align-items:center">
      {#if !isConj && !isPron && !isAdverb && !isVF && !isNum && !isNumQty && !isDemNom && !isQuest}
      <div class="seg">
        <label class="seg-opt"><input type="radio" name="lt-statnum" checked={viewNum === 'sg'} on:change={() => (viewNum = 'sg')}>{L.numSg}</label>
        <label class="seg-opt"><input type="radio" name="lt-statnum" checked={viewNum === 'pl'} on:change={() => (viewNum = 'pl')}>{L.numPl}</label>
      </div>
      {/if}
      <button class="btn btn-ghost" style="font-size:12px" on:click={reset}>{L.statsReset}</button>
    </div>
  </div>

  <div class="lt-scroll" style="overflow-x:auto">
    <table style="border-collapse:separate;border-spacing:0;font-size:12px;min-width:340px">
      <thead>
        <tr>
          <th style="text-align:left;padding:4px 8px;color:var(--color-neutral-600)"></th>
          {#each cols as c}<th style="padding:4px 8px;font-family:var(--font-heading);color:var(--color-neutral-600)">{colLabel(c)}</th>{/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row}
          <tr>
            <th style="text-align:left;padding:4px 8px;font-family:var(--font-heading);font-weight:600;white-space:nowrap">{row.label}</th>
            {#each row.cells as cell}
              <td style="text-align:center;padding:4px 6px;min-width:38px;background:{color(cell.m)};color:{cell.m.kind === 'graded' ? '#1a1a1a' : 'var(--color-neutral-500)'};border-radius:4px">{label(cell.m)}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if weakWords.length}
    <div style="margin-top:var(--space-3)">
      <div class="card-kicker" style="margin-bottom:6px">{L.weakWords}</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        {#each weakWords as w}
          <span style="font-size:12px;padding:2px 8px;border-radius:999px;background:#f6ecec;border:1px solid #e6cccc">{w.id} <span class="text-muted">{tr(w.id)}</span> · {Math.round(w.acc * 100)}%</span>
        {/each}
      </div>
    </div>
  {/if}
</div>
