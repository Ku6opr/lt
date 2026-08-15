<script>
  import { CASES } from '../data/cases.js';
  import { NUMERALS } from '../data/numerals.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { idx } from '../engine/stem.js';

  $: L = UI[$lang];
  const q = (c) => ($lang === 'ru' ? c.qRu : $lang === 'en' ? c.qEn : c.qUk);
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="min-width:760px;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{L.caseCol}</span></th>
          {#each NUMERALS as n}
            <th style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);padding:6px 8px">
              <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)">{n.id}</span>
              <span style="display:block;font-style:italic;font-weight:400;font-size:11px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)">{n.lt === n.ltF ? n.lt : n.lt + ' / ' + n.ltF}</span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each CASES as c}
          <tr>
            <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left;white-space:nowrap;vertical-align:top">
              <span style="text-transform:none;letter-spacing:0"><span style="font-weight:600;color:var(--color-text)">{c.abbr}</span> <span style="font-style:italic;color:var(--color-neutral-600);font-size:11px">{q(c)}</span></span>
            </th>
            {#each NUMERALS as n}
              <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:15px;font-weight:{c.id === 'V' ? 600 : 400};color:var(--color-text);background:{c.id === 'V' ? '#fdf7ee' : '#fdf9f2'}">
                {n.m[idx(c.id)]}{#if n.f[idx(c.id)] !== n.m[idx(c.id)]}<span style="display:block;color:var(--color-neutral-600)">{n.f[idx(c.id)]}</span>{/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
