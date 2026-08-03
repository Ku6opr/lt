<script>
  import { ADJECTIVES } from '../data/adjectives.js';
  import { boundedPrefix, idx } from '../engine/stem.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  $: L = UI[$lang];

  export let view = 'sg';
  export let caseIds = null;
  export let both = false;

  const byId = {};
  for (const a of ADJECTIVES) byId[a.id] = a;
  const EX = { I: 'geras', II: 'gražus', III: 'naminis' };

  const COLS = [
    { t: 'I', g: 'm' }, { t: 'II', g: 'm' }, { t: 'III', g: 'm' },
    { t: 'I', g: 'f' }, { t: 'II', g: 'f' }, { t: 'III', g: 'f' }
  ];
  const ALL_CASES = [
    { id: 'V', abbr: 'V.', sg: 'Koks? Kokia?', pl: 'Kokie? Kokios?' },
    { id: 'K', abbr: 'K.', sg: 'Kokio? Kokios?', pl: 'Kokių?' },
    { id: 'N', abbr: 'N.', sg: 'Kokiam? Kokiai?', pl: 'Kokiems? Kokioms?' },
    { id: 'G', abbr: 'G.', sg: 'Kokį? Kokią?', pl: 'Kokius? Kokias?' },
    { id: 'In', abbr: 'Įn.', sg: 'Kokiu? Kokia?', pl: 'Kokiais? Kokiomis?' },
    { id: 'Vt', abbr: 'Vt.', sg: 'Kokiame? Kokioje?', pl: 'Kokiuose? Kokiose?' }
  ];
  const CASES = caseIds ? ALL_CASES.filter((c) => caseIds.includes(c.id)) : ALL_CASES;

  const buildRow = (cs, nn) => {
    const ri = idx(cs.id);
    return {
      abbr: cs.abbr, q: cs[nn], num: both ? nn : null,
      cells: COLS.map((c) => {
        const adj = byId[EX[c.t]];
        const forms = adj[c.g][nn];
        const stem = boundedPrefix(forms);
        return { stem, tail: forms[ri].slice(stem.length), base: c.g === 'm' ? '#fdf9f2' : '#f8f5fb' };
      })
    };
  };
  $: cols = COLS.map((c) => {
    const adj = byId[EX[c.t]];
    return { label: c.t, sample: adj[c.g][both ? 'sg' : view][0], base: c.g === 'm' ? '#fdf7ee' : '#f6f2f9' };
  });
  $: rows = both ? CASES.flatMap((cs) => ['sg', 'pl'].map((nn) => buildRow(cs, nn))) : CASES.map((cs) => buildRow(cs, view));
</script>

<div class="lt-grid lt-bleed">
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="min-width:760px;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="position:sticky;left:0;background:var(--color-bg);z-index:3;border-bottom:1px solid var(--color-divider)"></th>
          <th colspan="3" style="text-align:center;background:#f7e6c9;color:var(--color-accent-800);border-bottom:1px solid var(--color-divider)">{L.mascRow}</th>
          <th colspan="3" style="text-align:center;background:#e7dff0;color:#574a71;border-bottom:1px solid var(--color-divider)">{L.femRow}</th>
        </tr>
        <tr>
          <th style="position:sticky;left:0;background:var(--color-bg);z-index:3;border-bottom:1px solid var(--color-divider);vertical-align:bottom;text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{L.caseCol}</span></th>
          {#each cols as col}
            <th style="padding:8px 10px;text-align:center;vertical-align:middle;background:{col.base};border-bottom:1px solid var(--color-divider);">
              <div style="line-height:1.15"><span style="font-weight:600;color:var(--color-text)">{col.label}</span><br><span class="text-muted" style="font-weight:400;text-transform:none;letter-spacing:0">{col.sample}</span></div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row}
          <tr>
            <th style="position:sticky;left:0;z-index:2;background:var(--color-bg);text-align:left;vertical-align:top;border-bottom:1px solid var(--color-divider);">
              <div style="text-transform:none;letter-spacing:0;white-space:nowrap">
                <span style="font-weight:600;color:var(--color-text)">{row.abbr}</span>{#if row.num}<span class="text-muted" style="font-size:11px"> · {row.num === 'sg' ? L.numSg : L.numPl}</span>{/if}<br>
                <span style="font-style:italic;color:var(--color-neutral-600);font-size:11px">{row.q}</span>
              </div>
            </th>
            {#each row.cells as cell}
              <td style="padding:6px 10px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);background:{cell.base};"><WordForm stem={cell.stem} tail={cell.tail} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
