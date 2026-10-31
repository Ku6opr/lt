<script>
  import { REFL_VERBS } from '../data/verbsRefl.js';
  import { reflForms, reflSplit } from '../engine/reflexive.js';
  import { commonPrefix } from '../engine/stem.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  export let settings;
  export let tense = 'pres';

  const byId = {};
  for (const v of REFL_VERBS) byId[v.id] = v;
  const EX = { pres: ['keltis', 'ilsetis', 'mokytis'], past: ['mokytis', 'skustis'], fut: ['mokytis'] };
  const NEG_EX = 'mokytis';
  const ROWS = [
    { lt: 'aš', slot: 'sg1' },
    { lt: 'tu', slot: 'sg2' },
    { lt: 'jis, ji', slot: 'p3' },
    { lt: 'mes', slot: 'pl1' },
    { lt: 'jūs', slot: 'pl2' },
    { lt: 'jie, jos', slot: 'p3' }
  ];
  const col = (v, pol) => {
    const sp = reflSplit(v, tense, pol);
    const inf = pol === 'neg' ? v.plain.inf : v.inf;
    return { v, pol, F: reflForms(v, tense, pol), ...sp, inf, infStem: commonPrefix([inf, sp.stem]) };
  };
  const plainCol = (v) => {
    const sp = reflSplit(v, tense, 'aff');
    return { v: v.plain, pol: 'plain', F: v.plain[tense], head: '', stem: sp.stem, inf: v.plain.inf, infStem: commonPrefix([v.plain.inf, sp.stem]) };
  };
  const aff = EX[tense].flatMap((id) => (byId[id].plain ? [plainCol(byId[id]), col(byId[id], 'aff')] : [col(byId[id], 'aff')]));
  const HEAD_BG = { plain: 'var(--color-bg)', aff: '#f7e6c9', neg: '#e7dff0' };
  const HEAD_FG = { plain: 'var(--color-text)', aff: 'var(--color-accent-800)', neg: '#574a71' };
  const CELL_BG = { plain: 'var(--color-bg)', aff: '#fdf9f2', neg: '#f6f2f9' };
  const neg = col(byId[NEG_EX], 'neg');
  const split = (c, form) => ({ head: c.head, stem: c.stem, tail: form.slice(c.head.length + c.stem.length) });

  $: tKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';
  $: L = UI[$lang];
  $: s = $settings;
  $: gloss = (c) => (c.pol === 'neg' ? (tKey === 'en' ? 'not ' : 'не ') : '') + c.v[tKey];
  $: cols = [...aff.filter((c) => c.pol === 'plain' || s.pols.aff), ...(s.pols.neg ? [neg] : [])];
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{L.pronounCol}</span></th>
          {#each cols as c}
            <th style="text-align:center;background:{HEAD_BG[c.pol]};border-bottom:1px solid var(--color-divider);padding:6px 8px">
              <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:{HEAD_FG[c.pol]}"><WordForm head={c.head} stem={c.infStem} tail={c.inf.slice(c.infStem.length)} /></span>
              <span style="display:block;font-style:italic;font-weight:400;font-size:11px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)">{gloss(c)}</span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each ROWS as r}
          <tr>
            <th style="text-align:left;padding:6px 10px;white-space:nowrap;font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-text);border-bottom:1px solid var(--color-divider)">{r.lt}</th>
            {#each cols as c}
              {@const f = split(c, c.F[r.slot])}
              <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:{CELL_BG[c.pol]}"><WordForm head={f.head} stem={f.stem} tail={f.tail} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
