<script>
  import { VERBS, PERSON_COLS } from '../data/verbsConj.js';
  import { boundedPrefix } from '../engine/stem.js';
  import { lang } from '../stores/lang.js';
  import WordForm from './WordForm.svelte';

  const byId = {};
  for (const v of VERBS) byId[v.id] = v;
  const buti = byId['buti'];

  // По одному прикладу на кожну дієвідміну теперішнього часу (за закінченням 3-ї особи):
  // I → -a, II → -i, III → -o. Окончання виділене червоним.
  const cols = [
    { tag: 'I', v: byId['dirbti'] },
    { tag: 'II', v: byId['tureti'] },
    { tag: 'III', v: byId['zinoti'] }
  ].map((c) => {
    const forms = PERSON_COLS.map((s) => c.v.f[s]);
    const stem = boundedPrefix(forms);
    return { ...c, stem, end3: c.v.f.p3.slice(stem.length) };
  });

  const ROWS = [
    { lt: 'aš', slot: 'sg1' },
    { lt: 'tu', slot: 'sg2' },
    { lt: 'jis, ji', slot: 'p3' },
    { lt: 'mes', slot: 'pl1' },
    { lt: 'jūs', slot: 'pl2' },
    { lt: 'jie, jos', slot: 'p3' }
  ];

  $: tKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';
  $: pronCol = $lang === 'ru' ? 'Местоимение' : $lang === 'en' ? 'Pronoun' : 'Займенник';
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;min-width:520px;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{pronCol}</span></th>
          <th style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);border-right:1px solid var(--color-divider);padding:6px 12px">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)">būti</span>
            <span style="font-style:italic;font-weight:400;font-size:11px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)"> {buti[tKey]}</span>
          </th>
          {#each cols as c}
            <th style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);padding:6px 12px">
              <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)"><WordForm stem={c.stem} tail={c.end3} /></span>
              <span style="font-weight:400;font-size:11px;text-transform:none;letter-spacing:.04em;color:var(--color-neutral-600)"> · {c.tag} · {c.v[tKey]}</span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each ROWS as r}
          <tr>
            <th style="text-align:left;padding:6px 10px;white-space:nowrap;font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-text);border-bottom:1px solid var(--color-divider)">{r.lt}</th>
            <td style="padding:6px 12px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);border-right:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2">{buti.f[r.slot]}</td>
            {#each cols as c}
              <td style="padding:6px 12px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2"><WordForm stem={c.stem} tail={c.v.f[r.slot].slice(c.stem.length)} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
