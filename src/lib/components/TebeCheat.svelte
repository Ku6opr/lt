<script>
  import { VERBS } from '../data/verbsConj.js';
  import { TEBE } from '../data/verbsTebe.js';
  import { TEBE_PREFIXES, tebeHead } from '../engine/tebeNebe.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  const EX = ['dirbti', 'buti', 'eiti'];
  const cols = EX.map((id) => VERBS.find((v) => v.id === id));
  const ROWS = [
    { lt: 'aš', slot: 'sg1' },
    { lt: 'tu', slot: 'sg2' },
    { lt: 'jis, ji', slot: 'p3' },
    { lt: 'mes', slot: 'pl1' },
    { lt: 'jūs', slot: 'pl2' },
    { lt: 'jie, jos', slot: 'p3' }
  ];
  const cell = (v, pfx, slot) => {
    const form = TEBE[v.id][pfx][slot];
    const head = tebeHead(form, v.f[slot]);
    return { head, stem: form.slice(head.length) };
  };
  const PFX_KEY = { tebe: 'tebeStill', nebe: 'nebeNoLonger' };

  $: tKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';
  $: L = UI[$lang];
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;font-size:13px;border-collapse:separate;border-spacing:0;min-width:620px">
      <thead>
        <tr>
          <th rowspan="2" style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{L.pronounCol}</span></th>
          {#each cols as v, i}
            <th colspan="2" style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);{i < cols.length - 1 ? 'border-right:1px solid var(--color-divider);' : ''}padding:6px 8px">
              <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)">{v.f.p3}</span>
              <span style="display:block;font-style:italic;font-weight:400;font-size:11px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)">{v.g[tKey][2]}</span>
            </th>
          {/each}
        </tr>
        <tr>
          {#each cols as v, i}
            {#each TEBE_PREFIXES as pfx, j}
              <th style="text-align:center;background:#e7dff0;color:#574a71;border-bottom:1px solid var(--color-divider);{i < cols.length - 1 && j === 1 ? 'border-right:1px solid var(--color-divider);' : ''}padding:4px 8px;text-transform:none;letter-spacing:0">
                <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">{pfx}-</span>
                <span style="display:block;font-style:italic;font-weight:400;font-size:11px">{L[PFX_KEY[pfx]]}</span>
              </th>
            {/each}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each ROWS as r}
          <tr>
            <th style="text-align:left;padding:6px 10px;white-space:nowrap;font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-text);border-bottom:1px solid var(--color-divider)">{r.lt}</th>
            {#each cols as v, i}
              {#each TEBE_PREFIXES as pfx, j}
                {@const c = cell(v, pfx, r.slot)}
                <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);{i < cols.length - 1 && j === 1 ? 'border-right:1px solid var(--color-divider);' : ''}font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2"><WordForm head={c.head} stem={c.stem} /></td>
              {/each}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
