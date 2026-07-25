<script>
  import { CASES } from '../data/cases.js';
  import { DECLENSIONS } from '../data/declensions.js';
  import { stemOf } from '../engine/stem.js';
  import WordForm from './WordForm.svelte';

  export let view = 'sg';

  const maleSpan = DECLENSIONS.filter((t) => t.gender === 'm').length;
  const femaleSpan = DECLENSIONS.filter((t) => t.gender === 'f').length;

  $: cols = DECLENSIONS.map((tp) => ({
    ending: tp.ending,
    sample: tp.sample,
    base: tp.gender === 'm' ? '#fdf7ee' : '#f6f2f9'
  }));

  $: rows = CASES.map((c, ri) => ({
    abbr: c.abbr,
    q: c.q,
    name: c.name,
    preps: c.preps.join(', '),
    hasPreps: c.preps.length > 0,
    cells: DECLENSIONS.map((tp) => {
      const stem = stemOf(tp, view);
      const form = tp[view][ri];
      return {
        stem,
        tail: form.slice(stem.length),
        base: tp.gender === 'm' ? '#fdf9f2' : '#f8f5fb'
      };
    })
  }));
</script>

<div class="lt-grid lt-bleed">
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="min-width:880px;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="position:sticky;left:0;background:var(--color-bg);z-index:3;border-bottom:1px solid var(--color-divider)"></th>
          <th colspan={maleSpan} style="text-align:center;background:#f7e6c9;color:var(--color-accent-800);border-bottom:1px solid var(--color-divider)">Чоловічий рід</th>
          <th colspan={femaleSpan} style="text-align:center;background:#e7dff0;color:#574a71;border-bottom:1px solid var(--color-divider)">Жіночий рід</th>
        </tr>
        <tr>
          <th style="position:sticky;left:0;background:var(--color-bg);z-index:3;border-bottom:1px solid var(--color-divider);vertical-align:bottom;text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">Відмінок</span></th>
          {#each cols as col}
            <th style="padding:8px 10px;text-align:center;vertical-align:middle;background:{col.base};border-bottom:1px solid var(--color-divider);">
              <div style="line-height:1.15"><span style="font-weight:600;color:var(--color-text)">{col.ending}</span></div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row}
          <tr>
            <th style="position:sticky;left:0;z-index:2;background:var(--color-bg);text-align:left;vertical-align:top;border-bottom:1px solid var(--color-divider);">
              <div style="text-transform:none;letter-spacing:0;white-space:nowrap">
                <span style="font-weight:600;color:var(--color-text)">{row.abbr}</span> <span style="font-style:italic;color:var(--color-neutral-600)">{row.q}</span><br>
                <span style="font-weight:400;color:var(--color-text)">{row.name}</span>
                {#if row.hasPreps}<br><span class="text-muted" style="font-size:10.5px;font-weight:400">{row.preps}</span>{/if}
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
