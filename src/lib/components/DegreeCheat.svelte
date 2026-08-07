<script>
  import { ADJECTIVES } from '../data/adjectives.js';
  import { boundedPrefix } from '../engine/stem.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  const adj = ADJECTIVES.find((a) => a.id === 'geras');
  $: L = UI[$lang];

  // згруповано за родом: чол. (одн., мн.) | жін. (одн., мн.)
  const COLS = [
    { g: 'm', n: 0 },
    { g: 'm', n: 1 },
    { g: 'f', n: 0 },
    { g: 'f', n: 1 }
  ];
  const DEG = [
    { key: 'degPos', get: (g, n) => adj[g][n === 1 ? 'pl' : 'sg'][0] },
    { key: 'degComp', get: (g, n) => adj.comp[g][n] },
    { key: 'degSup', get: (g, n) => adj.sup[g][n] }
  ];

  const cols = COLS.map((c) => {
    const forms = DEG.map((d) => d.get(c.g, c.n));
    const stem = boundedPrefix(forms);
    return { g: c.g, n: c.n, stem, tails: forms.map((f) => f.slice(stem.length)) };
  });
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;min-width:420px;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)"></th>
          <th colspan="2" style="text-align:center;background:#f7e6c9;color:var(--color-accent-800);border-bottom:1px solid var(--color-divider)">{L.mascRow}</th>
          <th colspan="2" style="text-align:center;background:#e7dff0;color:#574a71;border-bottom:1px solid var(--color-divider)">{L.femRow}</th>
        </tr>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left;vertical-align:bottom"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">geras</span></th>
          {#each cols as c}
            <th style="padding:6px 8px;text-align:center;font-size:12px;font-weight:500;text-transform:none;letter-spacing:0;color:var(--color-neutral-600);background:{c.g === 'm' ? '#fdf7ee' : '#f6f2f9'};border-bottom:1px solid var(--color-divider)">{c.n === 1 ? L.numPlAb : L.numSgAb}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each DEG as d, di}
          <tr>
            <th style="text-align:left;padding:6px 10px;white-space:nowrap;font-weight:500;font-size:12px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600);border-bottom:1px solid var(--color-divider)">{L[d.key]}</th>
            {#each cols as c}
              <td style="text-align:center;padding:6px 10px;white-space:nowrap;border-bottom:1px solid var(--color-divider);background:{c.g === 'm' ? '#fdf9f2' : '#f8f5fb'}"><WordForm stem={c.stem} tail={c.tails[di]} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="text-muted" style="font-size:12px;margin-top:6px;line-height:1.5">{L.degNote}</div>
</div>
