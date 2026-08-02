<script>
  import { ADJECTIVES } from '../data/adjectives.js';
  import { boundedPrefix, idx } from '../engine/stem.js';
  import WordForm from './WordForm.svelte';

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

  const NUM_LABEL = { sg: 'однина', pl: 'множина' };
  $: s = $settings;
  $: adj = byId[EX[s.viewType]] || byId.geras;
  $: rowFor = (cs, nn) => {
    const forms = adj[s.viewGender][nn];
    const stem = boundedPrefix(forms);
    return { abbr: cs.abbr, q: cs[nn], numLabel: both ? NUM_LABEL[nn] : null, stem, tail: forms[idx(cs.id)].slice(stem.length) };
  };
  $: rows = both ? CASES.flatMap((cs) => ['sg', 'pl'].map((nn) => rowFor(cs, nn))) : CASES.map((cs) => rowFor(cs, view));

  function setType(e) { settings.update((st) => ({ ...st, viewType: e.target.value })); }
  function setGender(e) { settings.update((st) => ({ ...st, viewGender: e.target.value })); }
</script>

<div class="lt-stack">
  <div style="border:1px solid var(--color-divider);border-radius:var(--radius-md);overflow:hidden">
    <div style="display:flex;align-items:center;gap:8px;padding:9px 12px;background:var(--color-surface);border-bottom:1px solid var(--color-divider)">
      <select value={s.viewType} on:change={setType} class="input" style="flex:1;min-height:34px;font-family:var(--font-heading);font-size:14px">
        {#each TYPES as t}<option value={t.id}>{t.label}</option>{/each}
      </select>
      <select value={s.viewGender} on:change={setGender} class="input" style="flex:none;width:44%;min-height:34px;font-family:var(--font-heading);font-size:14px">
        <option value="m">Чоловічий</option>
        <option value="f">Жіночий</option>
      </select>
    </div>
    {#each rows as fr}
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 13px;border-bottom:1px solid var(--color-divider);background:{s.viewGender === 'm' ? '#fdf9f2' : '#f8f5fb'};">
        <span style="white-space:nowrap"><span style="font-family:var(--font-heading);font-weight:600">{fr.abbr}</span>{#if fr.numLabel}<span class="text-muted" style="font-size:11px"> · {fr.numLabel}</span>{/if} <span style="font-style:italic;color:var(--color-neutral-600);font-size:12px">{fr.q}</span></span>
        <span style="font-family:var(--font-heading);font-size:20px"><WordForm stem={fr.stem} tail={fr.tail} /></span>
      </div>
    {/each}
  </div>
</div>
