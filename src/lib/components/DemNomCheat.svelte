<script>
  import { DEM_PRONOUNS } from '../data/demPronouns.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  $: L = UI[$lang];
  $: tKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';
  const rows = DEM_PRONOUNS.filter((p) => p.f);
  const tr = (p, k) => (k === 'en' ? p.en : p[k].m.sg[0]);
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)"></th>
          <th colspan="2" style="text-align:center;background:#f7e6c9;color:var(--color-accent-800);border-bottom:1px solid var(--color-divider)">{L.mascRow}</th>
          <th colspan="2" style="text-align:center;background:#e7dff0;color:#574a71;border-bottom:1px solid var(--color-divider)">{L.femRow}</th>
        </tr>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)"></th>
          <th style="text-align:center;background:#fdf7ee;border-bottom:1px solid var(--color-divider);text-transform:none;letter-spacing:0;font-size:12px;font-weight:500;color:var(--color-neutral-600)">{L.numSg}</th>
          <th style="text-align:center;background:#fdf7ee;border-bottom:1px solid var(--color-divider);border-right:1px solid var(--color-divider);text-transform:none;letter-spacing:0;font-size:12px;font-weight:500;color:var(--color-neutral-600)">{L.numPl}</th>
          <th style="text-align:center;background:#f6f2f9;border-bottom:1px solid var(--color-divider);text-transform:none;letter-spacing:0;font-size:12px;font-weight:500;color:var(--color-neutral-600)">{L.numSg}</th>
          <th style="text-align:center;background:#f6f2f9;border-bottom:1px solid var(--color-divider);text-transform:none;letter-spacing:0;font-size:12px;font-weight:500;color:var(--color-neutral-600)">{L.numPl}</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as p}
          <tr>
            <th style="text-align:left;padding:6px 10px;white-space:nowrap;font-style:italic;font-weight:400;font-size:12px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600);border-bottom:1px solid var(--color-divider)">{tr(p, tKey)}</th>
            <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2">{p.m.sg[0]}</td>
            <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);border-right:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2">{p.m.pl[0]}</td>
            <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#f8f5fb">{p.f.sg[0]}</td>
            <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#f8f5fb">{p.f.pl[0]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
