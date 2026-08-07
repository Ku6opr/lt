<script>
  import { CASES } from '../data/cases.js';
  import { PRONOUNS } from '../data/pronouns.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { idx } from '../engine/stem.js';

  $: L = UI[$lang];
  const SG = PRONOUNS.filter((p) => p.num === 'sg');
  const PL = PRONOUNS.filter((p) => p.num === 'pl');
  const COLS = [...SG, ...PL];
  const q = (c) => ($lang === 'ru' ? c.qRu : $lang === 'en' ? c.qEn : c.qUk);
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="min-width:640px;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{L.caseCol}</span></th>
          <th colspan={SG.length} style="text-align:center;background:#f7e6c9;color:var(--color-accent-800);border-bottom:1px solid var(--color-divider)">{L.numSg}</th>
          <th colspan={PL.length} style="text-align:center;background:#e7dff0;color:#574a71;border-bottom:1px solid var(--color-divider)">{L.numPl}</th>
        </tr>
      </thead>
      <tbody>
        {#each CASES as c}
          <tr>
            <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left;white-space:nowrap;vertical-align:top">
              <span style="text-transform:none;letter-spacing:0"><span style="font-weight:600;color:var(--color-text)">{c.abbr}</span> <span style="font-style:italic;color:var(--color-neutral-600);font-size:11px">{q(c)}</span></span>
            </th>
            {#each COLS as p}
              <td style="padding:6px 10px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;font-weight:{c.id === 'V' ? 600 : 400};color:var(--color-text);background:{c.id === 'V' ? (p.num === 'sg' ? '#fdf7ee' : '#f6f2f9') : p.num === 'sg' ? '#fdf9f2' : '#f8f5fb'}">{p.lt[idx(c.id)]}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
