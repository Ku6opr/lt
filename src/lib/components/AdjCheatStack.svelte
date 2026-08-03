<script>
  import { ADJECTIVES } from '../data/adjectives.js';
  import { boundedPrefix, idx } from '../engine/stem.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  $: L = UI[$lang];

  export let settings;
  export let view = 'sg';
  export let caseIds = null;
  export let both = false;

  const byId = {};
  for (const a of ADJECTIVES) byId[a.id] = a;
  const EX = { I: 'geras', II: 'gražus', III: 'naminis' };
  const TYPES = [
    { id: 'I', label: 'I · geras' },
    { id: 'II', label: 'II · gražus' },
    { id: 'III', label: 'III · naminis' }
  ];
  const ALL_CASES = [
    { id: 'V', abbr: 'V.', sg: 'Koks?/Kokia?', pl: 'Kokie?/Kokios?' },
    { id: 'K', abbr: 'K.', sg: 'Kokio?/Kokios?', pl: 'Kokių?' },
    { id: 'N', abbr: 'N.', sg: 'Kokiam?/Kokiai?', pl: 'Kokiems?/Kokioms?' },
    { id: 'G', abbr: 'G.', sg: 'Kokį?/Kokią?', pl: 'Kokius?/Kokias?' },
    { id: 'In', abbr: 'Įn.', sg: 'Kokiu?/Kokia?', pl: 'Kokiais?/Kokiomis?' },
    { id: 'Vt', abbr: 'Vt.', sg: 'Kokiame?/Kokioje?', pl: 'Kokiuose?/Kokiose?' }
  ];
  const CASES = caseIds ? ALL_CASES.filter((c) => caseIds.includes(c.id)) : ALL_CASES;

  const NOM = idx('V');
  const GRID_TYPES = [
    { id: 'I', ex: 'geras' },
    { id: 'II', ex: 'gražus' },
    { id: 'III', ex: 'naminis' }
  ];
  const GRID_ROWS = [
    { key: 'rowMsg', g: 'm', num: 'sg' },
    { key: 'rowFsg', g: 'f', num: 'sg' },
    { key: 'rowMpl', g: 'm', num: 'pl' },
    { key: 'rowFpl', g: 'f', num: 'pl' }
  ];
  const gridCols = GRID_TYPES.map((t) => {
    const a = byId[t.ex];
    const stem = boundedPrefix([a.m.sg[NOM], a.f.sg[NOM], a.m.pl[NOM], a.f.pl[NOM]]);
    return { id: t.id, ex: t.ex, stem, a };
  });
  $: gridRows = GRID_ROWS.map((r) => ({
    label: L[r.key],
    tint: r.g === 'm' ? '#fdf9f2' : '#f8f5fb',
    cells: gridCols.map((c) => {
      const f = c.a[r.g][r.num][NOM];
      return { stem: c.stem, tail: f.slice(c.stem.length) };
    })
  }));

  $: s = $settings;
  $: adj = byId[EX[s.viewType]] || byId.geras;
  $: rowFor = (cs, nn) => {
    const forms = adj[s.viewGender][nn];
    const stem = boundedPrefix(forms);
    return { abbr: cs.abbr, q: cs[nn], num: both ? nn : null, stem, tail: forms[idx(cs.id)].slice(stem.length) };
  };
  $: rows = both ? CASES.flatMap((cs) => ['sg', 'pl'].map((nn) => rowFor(cs, nn))) : CASES.map((cs) => rowFor(cs, view));

  function setType(e) { settings.update((st) => ({ ...st, viewType: e.target.value })); }
  function setGender(e) { settings.update((st) => ({ ...st, viewGender: e.target.value })); }
</script>

<div class="lt-stack">
  {#if both}
  <div style="border:1px solid var(--color-divider);border-radius:var(--radius-md);overflow:hidden">
    <table style="width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed">
      <thead>
        <tr>
          <th style="width:26%;background:var(--color-surface);border-bottom:1px solid var(--color-divider)"></th>
          {#each gridCols as c}
            <th style="padding:7px 4px;text-align:center;background:var(--color-surface);border-bottom:1px solid var(--color-divider);border-left:1px solid var(--color-divider)">
              <div style="font-family:var(--font-heading);font-weight:600;font-size:13px;color:var(--color-text)">{c.id}</div>
              <div class="text-muted" style="font-size:10px">{c.ex}</div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each gridRows as r}
          <tr style="background:{r.tint}">
            <th style="text-align:left;padding:8px 10px;border-bottom:1px solid var(--color-divider);white-space:nowrap;font-weight:500;font-size:12px;color:var(--color-neutral-600)">{r.label}</th>
            {#each r.cells as cell}
              <td style="text-align:center;padding:8px 4px;border-bottom:1px solid var(--color-divider);border-left:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px"><WordForm stem={cell.stem} tail={cell.tail} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  {:else}
  <div style="border:1px solid var(--color-divider);border-radius:var(--radius-md);overflow:hidden">
    <div style="display:flex;align-items:center;gap:8px;padding:9px 12px;background:var(--color-surface);border-bottom:1px solid var(--color-divider)">
      <select value={s.viewType} on:change={setType} class="input" style="flex:1;min-height:34px;font-family:var(--font-heading);font-size:14px">
        {#each TYPES as t}<option value={t.id}>{t.label}</option>{/each}
      </select>
      <select value={s.viewGender} on:change={setGender} class="input" style="flex:none;width:44%;min-height:34px;font-family:var(--font-heading);font-size:14px">
        <option value="m">{L.genderM}</option>
        <option value="f">{L.genderF}</option>
      </select>
    </div>
    {#each rows as fr}
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 13px;border-bottom:1px solid var(--color-divider);background:{s.viewGender === 'm' ? '#fdf9f2' : '#f8f5fb'};">
        <span style="white-space:nowrap"><span style="font-family:var(--font-heading);font-weight:600">{fr.abbr}</span>{#if fr.num}<span class="text-muted" style="font-size:11px"> · {fr.num === 'sg' ? L.numSg : L.numPl}</span>{/if} <span style="font-style:italic;color:var(--color-neutral-600);font-size:12px">{fr.q}</span></span>
        <span style="font-family:var(--font-heading);font-size:20px"><WordForm stem={fr.stem} tail={fr.tail} /></span>
      </div>
    {/each}
  </div>
  {/if}
</div>
