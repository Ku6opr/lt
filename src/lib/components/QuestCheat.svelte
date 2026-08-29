<script>
  import { Q_WORDS } from '../engine/questions.js';
  import { boundedPrefix } from '../engine/stem.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  const byId = {};
  for (const q of Q_WORDS) byId[q.id] = q;

  // у таблиці — лише відмінювані (koks, kuris); kieno/kiek — рядками-примітками нижче
  const SLOTS = ['m_sg', 'f_sg', 'm_pl', 'f_pl'];
  const cols = ['koks', 'kuris'].map((id) => {
    const q = byId[id];
    const forms = SLOTS.map((s) => q.lt[s]);
    const stem = boundedPrefix(forms);
    return { q, stem, forms };
  });

  $: tKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';
  $: L = UI[$lang];
  $: rowLabel = [L.rowMsg, L.rowFsg, L.rowMpl, L.rowFpl];
  $: qwTr = (q) => (tKey === 'en' ? q.src.en : q.src[tKey].m);
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)"></th>
          {#each cols as c}
            <th style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);padding:6px 8px">
              <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)">{c.q.lt.m_sg}?</span>
              <span style="display:block;font-style:italic;font-weight:400;font-size:11px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)">{qwTr(c.q)}</span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each SLOTS as slot, i}
          <tr>
            <th style="text-align:left;padding:6px 10px;white-space:nowrap;font-family:var(--font-heading);font-weight:600;font-size:13px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600);border-bottom:1px solid var(--color-divider)">{rowLabel[i]}</th>
            {#each cols as c}
              <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2"><WordForm stem={c.stem} tail={c.q.lt[slot].slice(c.stem.length)} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div style="display:flex;flex-direction:column;gap:4px;margin-top:8px;font-size:13px;color:var(--color-neutral-700)">
    <div><b style="font-family:var(--font-heading)">kieno?</b> <span class="text-muted">{qwTr(byId.kieno)}</span> — {L.questInvar}: kieno namas, kieno knyga</div>
    <div><b style="font-family:var(--font-heading)">kiek?</b> <span class="text-muted">{qwTr(byId.kiek)}</span> — {L.questKiekNote}: kiek knyg<span style="color:#b3352b">ų</span>, kiek pien<span style="color:#b3352b">o</span></div>
  </div>
</div>
