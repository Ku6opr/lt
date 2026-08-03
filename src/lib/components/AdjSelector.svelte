<script>
  import { PHRASE_TIERS } from '../data/levels.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  export let settings;
  export let onPoolChange;
  export let onLevelChange;
  export let caseIds = null;
  export let fixedFilters = false;

  const ALL_CASES = [
    { id: 'V', abbr: 'V.' },
    { id: 'K', abbr: 'K.' },
    { id: 'N', abbr: 'N.' },
    { id: 'G', abbr: 'G.' },
    { id: 'In', abbr: 'Įn.' },
    { id: 'Vt', abbr: 'Vt.' }
  ];
  const CASES = caseIds ? ALL_CASES.filter((c) => caseIds.includes(c.id)) : ALL_CASES;
  const showCases = CASES.length > 1;
  const TYPES = [
    { id: 'I', ending: 'I', sample: 'geras' },
    { id: 'II', ending: 'II', sample: 'gražus' },
    { id: 'III', ending: 'III', sample: 'naminis' }
  ];
  const GENDERS = ['m', 'f', 'both'];
  const THEMES = ['all', 'prod', 'cafe', 'street', 'home', 'nature', 'people', 'time'];

  $: L = UI[$lang];
  $: s = $settings;
  $: allCasesOn = CASES.every((c) => s.cases[c.id]);
  $: allTypesOn = TYPES.every((t) => s.types[t.id]);
  $: maxLevel = PHRASE_TIERS.length - 1;

  function setLevel(v) { settings.update((st) => ({ ...st, level: v })); onLevelChange(); }
  function toggleKey(group, id) { settings.update((st) => ({ ...st, [group]: { ...st[group], [id]: !st[group][id] } })); onPoolChange(); }
  function setCasesAll(v) { const cs = {}; CASES.forEach((c) => (cs[c.id] = v)); settings.update((st) => ({ ...st, cases: cs })); onPoolChange(); }
  function setTypesAll(v) { const t = {}; TYPES.forEach((x) => (t[x.id] = v)); settings.update((st) => ({ ...st, types: t })); onPoolChange(); }
  function setGender(id) { settings.update((st) => ({ ...st, gender: id })); onPoolChange(); }
  function setTheme(id) { settings.update((st) => ({ ...st, theme: id })); onPoolChange(); }

  const caseTint = (on) => (on ? 'border-color:var(--color-accent);background:#fff3e4;' : '');
</script>

<div style="border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:clamp(16px,3cqw,26px);margin-bottom:var(--space-8)">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:var(--space-4)">
    <h4 style="margin:0">{L.studyTitle}</h4>
    <span class="text-muted" style="font-size:12px">{L.studyHint}</span>
  </div>

  <div style="display:flex;flex-direction:column;gap:var(--space-4)">
    <div>
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">{L.difficulty}</span></div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="text-muted" style="font-size:12px">{L.easy}</span>
        <input type="range" min="0" max={maxLevel} step="1" value={s.level} on:input={(e) => setLevel(+e.target.value)} style="flex:1">
        <span class="text-muted" style="font-size:12px">{L.hard}</span>
      </div>
    </div>

    {#if s.theme === 'all'}
    {#if showCases}
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span class="card-kicker" style="margin:0">{L.cases}</span>
        <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px" on:click={() => setCasesAll(!allCasesOn)}>{allCasesOn ? L.clearAll : L.selectAll}</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each CASES as c}
          <label class="lt-chip" style={caseTint(s.cases[c.id])}>
            <input type="checkbox" checked={s.cases[c.id]} on:change={() => toggleKey('cases', c.id)} style="display:none">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:15px">{c.abbr}</span>
            <span class="text-muted" style="font-size:10px">{L.caseNames[c.id]}</span>
          </label>
        {/each}
      </div>
    </div>
    {/if}

    {#if !fixedFilters}
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span class="card-kicker" style="margin:0">{L.adjType}</span>
        <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px" on:click={() => setTypesAll(!allTypesOn)}>{allTypesOn ? L.clearAll : L.selectAll}</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each TYPES as x}
          <label class="lt-chip" style={s.types[x.id] ? 'border-color:var(--color-accent);background:#fff3e4;' : ''}>
            <input type="checkbox" checked={s.types[x.id]} on:change={() => toggleKey('types', x.id)} style="display:none">
            <span style="font-weight:600;font-size:14px">{x.ending}</span>
            <span class="text-muted" style="font-size:10px">{x.sample}</span>
          </label>
        {/each}
      </div>
    </div>

    <div>
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">{L.gender}</span></div>
      <div class="seg">
        {#each GENDERS as g}
          <label class="seg-opt"><input type="radio" name="lt-adj-gender" checked={s.gender === g} on:change={() => setGender(g)}>{g === 'm' ? L.genderM : g === 'f' ? L.genderF : L.genderBoth}</label>
        {/each}
      </div>
    </div>
    {/if}
    {/if}

    {#if !fixedFilters}
    <div>
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">{L.number}</span></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <label class="lt-chip" style={caseTint(s.numbers.sg)}>
          <input type="checkbox" checked={s.numbers.sg} on:change={() => toggleKey('numbers', 'sg')} style="display:none">
          <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">{L.numSg}</span>
        </label>
        <label class="lt-chip" style={caseTint(s.numbers.pl)}>
          <input type="checkbox" checked={s.numbers.pl} on:change={() => toggleKey('numbers', 'pl')} style="display:none">
          <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">{L.numPl}</span>
        </label>
      </div>
    </div>
    {/if}

    <div>
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">{L.theme}</span></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each THEMES as th}
          <button class="lt-chip" style="cursor:pointer;{s.theme === th ? 'border-color:var(--color-accent);background:#fff3e4;' : ''}" on:click={() => setTheme(th)}>
            <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">{L.themes[th]}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
