<script>
  import { CASES } from '../data/cases.js';
  import { DEM_PRONOUNS } from '../data/demPronouns.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { idx } from '../engine/stem.js';

  $: L = UI[$lang];
  const byId = {};
  for (const p of DEM_PRONOUNS) byId[p.id] = p;

  // моделі як у підручнику: 5 чоловічих + 3 жіночих; підпис — які леми йдуть за моделлю
  const COLS = [
    { g: 'm', p: byId['tas'], note: 'tas, šitas, anas, kas…' },
    { g: 'm', p: byId['kitas'], note: 'kitas, visas…' },
    { g: 'm', p: byId['toks'], note: 'toks, joks, visoks…' },
    { g: 'm', p: byId['kuris'], note: 'kuris, šis' },
    { g: 'm', p: byId['pats'], note: 'pats' },
    { g: 'f', p: byId['tas'], note: 'ta, šita, kita, visa…' },
    { g: 'f', p: byId['toks'], note: 'tokia, visokia…' },
    { g: 'f', p: byId['kuris'], note: 'kuri, ši, pati' }
  ];
  const mCount = COLS.filter((c) => c.g === 'm').length;
  const fCount = COLS.length - mCount;
  const form = (c, num, ci) => (c.g === 'm' ? c.p.m : c.p.f)[num][ci];
  const q = (c) => ($lang === 'ru' ? c.qRu : $lang === 'en' ? c.qEn : c.qUk);
</script>

<div>
  <div class="lt-scroll" style="overflow-x:auto;border:1px solid var(--color-divider);border-radius:var(--radius-md);background:var(--color-bg)">
    <table class="table" style="min-width:820px;font-size:13px;border-collapse:separate;border-spacing:0">
      <thead>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left"><span style="text-transform:none;letter-spacing:0;font-weight:400;color:var(--color-text)">{L.caseCol}</span></th>
          <th colspan={mCount} style="text-align:center;background:#f7e6c9;color:var(--color-accent-800);border-bottom:1px solid var(--color-divider)">{L.mascRow}</th>
          <th colspan={fCount} style="text-align:center;background:#e7dff0;color:#574a71;border-bottom:1px solid var(--color-divider)">{L.femRow}</th>
        </tr>
        <tr>
          <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider)"></th>
          {#each COLS as c}
            <th style="text-align:center;background:{c.g === 'm' ? '#fdf7ee' : '#f6f2f9'};border-bottom:1px solid var(--color-divider);padding:5px 8px">
              <span style="font-family:var(--font-heading);font-weight:600;font-size:14px;text-transform:none;letter-spacing:0;color:var(--color-text)">{c.g === 'm' ? c.p.lt : c.p.ltF}</span>
              <span style="display:block;font-style:italic;font-weight:400;font-size:10px;text-transform:none;letter-spacing:0;color:var(--color-neutral-600)">{c.note}</span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each [{ num: 'sg', label: L.numSg }, { num: 'pl', label: L.numPl }] as band}
          <tr>
            <th colspan={COLS.length + 1} style="text-align:left;background:#efe9f5;color:#574a71;border-bottom:1px solid var(--color-divider);padding:4px 10px">{band.label}</th>
          </tr>
          {#each CASES as c}
            <tr>
              <th style="background:var(--color-bg);border-bottom:1px solid var(--color-divider);text-align:left;white-space:nowrap;vertical-align:top">
                <span style="text-transform:none;letter-spacing:0"><span style="font-weight:600;color:var(--color-text)">{c.abbr}</span> <span style="font-style:italic;color:var(--color-neutral-600);font-size:11px">{q(c)}</span></span>
              </th>
              {#each COLS as col}
                <td style="padding:5px 8px;text-align:center;white-space:nowrap;border-bottom:1px solid var(--color-divider);font-family:var(--font-heading);font-size:15px;font-weight:{c.id === 'V' ? 600 : 400};color:var(--color-text);background:{col.g === 'm' ? '#fdf9f2' : '#f8f5fb'}">{form(col, band.num, idx(c.id))}</td>
              {/each}
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
</div>
