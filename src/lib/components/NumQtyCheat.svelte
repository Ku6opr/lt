<script>
  import { NUMERALS, TEENS } from '../data/numerals.js';
  import { WORDS } from '../data/words.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  $: L = UI[$lang];
  $: tKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';

  const namas = WORDS.find((w) => w.id === 'namas');
  const rows = [
    ...NUMERALS.map((n) => ({
      id: n.id,
      lt: n.lt === n.ltF ? n.lt : n.lt + ' / ' + n.ltF,
      tr: (k) => (k === 'en' ? n.en : n[k].m[0] === n[k].f[0] ? n[k].m[0] : n[k].m[0] + ' / ' + n[k].f[0]),
      noun: n.id === '1' ? { stem: namas.sg[0], tail: '' } : { stem: 'nam', tail: namas.pl[0].slice(3) }
    })),
    ...TEENS.map((n) => ({
      id: n.id,
      lt: n.lt,
      tr: (k) => n[k],
      noun: { stem: 'nam', tail: namas.pl[1].slice(3) }
    }))
  ];
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:center"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">№</span></th>
          <th style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);padding:6px 8px">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)">du / dvi</span>
          </th>
          <th style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);padding:6px 8px">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)">namas</span>
            <span style="display:block;font-style:italic;font-weight:400;font-size:11px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)">{L.caseNames.V} / {L.caseNames.K}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r}
          <tr>
            <th style="text-align:center;padding:6px 10px;white-space:nowrap;font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-text);border-bottom:1px solid var(--color-divider)">{r.id}</th>
            <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2">
              {r.lt}
              <span style="display:block;font-style:italic;font-size:11px;color:var(--color-neutral-600)">{r.tr(tKey)}</span>
            </td>
            <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2"><WordForm stem={r.noun.stem} tail={r.noun.tail} /></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
