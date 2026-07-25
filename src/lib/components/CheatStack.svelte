<script>
  import { CASES } from '../data/cases.js';
  import { TYPES } from '../data/types.js';
  import { stemOf } from '../engine/stem.js';
  import WordForm from './WordForm.svelte';

  export let view = 'sg';
  export let focusType = 'as';

  const focusOptions = TYPES.map((x) => ({ id: x.id, label: x.ending + ' · ' + x.sample }));

  $: ftype = TYPES.find((x) => x.id === focusType) || TYPES[0];
  $: fstem = stemOf(ftype, view);
  $: focusRows = CASES.map((c, ri) => {
    const form = ftype[view][ri];
    return {
      abbr: c.abbr,
      q: c.q,
      name: c.name,
      stem: fstem,
      tail: form.slice(fstem.length),
      bg: ftype.gender === 'm' ? '#fdf9f2' : '#f8f5fb'
    };
  });
</script>

<div class="lt-stack">
  <div style="border:1px solid var(--color-divider);border-radius:var(--radius-md);overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--color-surface);border-bottom:1px solid var(--color-divider)">
      <span class="card-kicker" style="margin:0;white-space:nowrap">Тип</span>
      <select bind:value={focusType} class="input" style="flex:1;min-height:34px;font-family:var(--font-heading);font-size:14px">
        {#each focusOptions as op}
          <option value={op.id}>{op.label}</option>
        {/each}
      </select>
    </div>
    {#each focusRows as fr}
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 13px;border-bottom:1px solid var(--color-divider);background:{fr.bg};">
        <span style="white-space:nowrap"><span style="font-family:var(--font-heading);font-weight:600">{fr.abbr}</span> <span style="font-style:italic;color:var(--color-neutral-600);font-size:12px">{fr.q}</span> · <span style="font-size:12px">{fr.name}</span></span>
        <span style="font-family:var(--font-heading);font-size:20px"><WordForm stem={fr.stem} tail={fr.tail} /></span>
      </div>
    {/each}
  </div>
</div>
