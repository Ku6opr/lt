<script>
  import { VERBS, PERSON_COLS } from '../data/verbsConj.js';
  import { boundedPrefix } from '../engine/stem.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import WordForm from './WordForm.svelte';

  export let tense = 'pres';

  const byId = {};
  for (const v of VERBS) byId[v.id] = v;
  const buti = byId['buti'];
  const F = (v) => (tense === 'past' ? v.past : tense === 'fut' ? v.fut : tense === 'imp' ? v.imp : tense === 'cond' ? v.cond : tense === 'habit' ? v.habit : v.f) || v.f;

  // Приклади показують РІЗНІ моделі закінчень часу: теперішній -a/-i/-o, минулий -o/-ė/-ėjo,
  // майбутній/наказовий/умовний — одна модель від інфінітива. Окончання виділене червоним.
  // būti окремим стовпцем лише в теперішньому (суплетив esu/yra); buvo/bus/būk/būtų — регулярні
  const EX = {
    pres: ['dirbti', 'tureti', 'zinoti'],
    past: ['dirbti', 'rasyti'],
    fut: ['dirbti'],
    imp: ['dirbti'],
    cond: ['dirbti'],
    habit: ['dirbti']
  };
  const fromInf = tense === 'fut' || tense === 'imp' || tense === 'cond' || tense === 'habit';
  const showButi = tense === 'pres';
  const cols = EX[tense].map((id) => byId[id]).map((v) => {
    const cf = F(v);
    const forms = PERSON_COLS.map((s) => cf[s]).filter(Boolean);
    // майбутнє/наказовий/умовний/багаторазовий утворюються від інфінітива (dirb|ti → dirb+s/+k/+tų/+davo) —
    // основа = корінь інфінітива, а НЕ спільний префікс форм: інакше маркер часу (s/dav/tų),
    // спільний для всіх осіб, з'їдається основою і не підсвічується — а це і є те, що вчимо.
    const stem = fromInf ? v.inf.slice(0, -2) : boundedPrefix(forms);
    // у шапці показуємо інфінітив, червоним -ti (те, що відкидається); в інших часах — 3-тю особу
    const h = fromInf ? { stem, tail: 'ti' } : { stem, tail: cf.p3.slice(stem.length) };
    return { v, f: cf, stem, hStem: h.stem, hTail: h.tail };
  });
  const butiF = F(buti);

  const trOf = (v, tk) => {
    if (tense === 'past') return tk === 'en' ? (v.gp ? v.gp.en : v.en) : v.pt ? v.pt[tk].m : v[tk];
    if (fromInf) return v[tk];
    return v.g[tk][2];
  };

  const ALL_ROWS = [
    { lt: 'aš', slot: 'sg1' },
    { lt: 'tu', slot: 'sg2' },
    { lt: 'jis, ji', slot: 'p3' },
    { lt: 'mes', slot: 'pl1' },
    { lt: 'jūs', slot: 'pl2' },
    { lt: 'jie, jos', slot: 'p3' }
  ];
  // у наказовому є лише tu/jūs — рядки без форм ховаємо
  const ROWS = ALL_ROWS.filter((r) => cols[0].f[r.slot]);

  $: tKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';
  $: L = UI[$lang];
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="width:100%;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{L.pronounCol}</span></th>
          {#if showButi}
          <th style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);border-right:1px solid var(--color-divider);padding:6px 8px">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)">{butiF.p3}</span>
            <span style="display:block;font-style:italic;font-weight:400;font-size:11px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)">{trOf(buti, tKey)}</span>
          </th>
          {/if}
          {#each cols as c}
            <th style="text-align:center;background:#f7e6c9;border-bottom:1px solid var(--color-divider);padding:6px 8px">
              <span style="font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-accent-800)"><WordForm stem={c.hStem} tail={c.hTail} /></span>
              <span style="display:block;font-style:italic;font-weight:400;font-size:11px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)">{trOf(c.v, tKey)}</span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each ROWS as r}
          <tr>
            <th style="text-align:left;padding:6px 10px;white-space:nowrap;font-family:var(--font-heading);font-weight:600;font-size:15px;text-transform:none;letter-spacing:0;color:var(--color-text);border-bottom:1px solid var(--color-divider)">{r.lt}</th>
            {#if showButi}<td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);border-right:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2">{butiF[r.slot]}</td>{/if}
            {#each cols as c}
              <td style="padding:6px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:16px;color:var(--color-text);background:#fdf9f2"><WordForm stem={c.stem} tail={c.f[r.slot].slice(c.stem.length)} /></td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
