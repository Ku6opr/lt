<script>
  import { ADJECTIVES } from '../data/adjectives.js';
  import { boundedPrefix } from '../engine/stem.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  const byId = {};
  for (const a of ADJECTIVES) byId[a.id] = a;
  const COLS = ['geras', 'greitas', 'gražus'].map((id) => byId[id]).filter((a) => a && a.adv);

  $: L = UI[$lang];
  const DEG = [
    { key: 'pos', label: 'degPos' },
    { key: 'comp', label: 'degComp' },
    { key: 'sup', label: 'degSup' }
  ];

  const cols = COLS.map((a) => {
    const forms = DEG.map((d) => a.adv[d.key]);
    const stem = boundedPrefix(forms);
    return { adj: a.m.sg[0], stem, tails: forms.map((f) => f.slice(stem.length)) };
  });
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;min-width:360px;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{L.advWord}</span></th>
          {#each cols as c}
            <th style="padding:6px 10px;text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider)"><span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)">{c.adj}</span></th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each DEG as d, di}
          <tr>
            <th style="text-align:left;padding:6px 10px;white-space:nowrap;font-weight:500;font-size:12px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600);border-bottom:1px solid var(--color-divider)">{L[d.label]}</th>
            {#each cols as c}
              <td style="text-align:center;padding:6px 10px;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2"><WordForm stem={c.stem} tail={c.tails[di]} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="text-muted" style="font-size:12px;margin-top:6px;line-height:1.5">{L.advNote}</div>
</div>
