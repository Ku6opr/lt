<script>
  import { PHRASE_TIERS } from '../data/levels.js';

  export let settings;
  export let onPoolChange;
  export let onLevelChange;
  export let caseIds = null;
  export let fixedFilters = false;

  const ALL_CASES = [
    { id: 'V', abbr: 'V.', name: 'Називний' },
    { id: 'K', abbr: 'K.', name: 'Родовий' },
    { id: 'N', abbr: 'N.', name: 'Давальний' },
    { id: 'G', abbr: 'G.', name: 'Знахідний' },
    { id: 'In', abbr: 'Įn.', name: 'Орудний' },
    { id: 'Vt', abbr: 'Vt.', name: 'Місцевий' }
  ];
  const CASES = caseIds ? ALL_CASES.filter((c) => caseIds.includes(c.id)) : ALL_CASES;
  const showCases = CASES.length > 1;
  const TYPES = [
    { id: 'I', ending: 'I', sample: 'geras' },
    { id: 'II', ending: 'II', sample: 'gražus' },
    { id: 'III', ending: 'III', sample: 'naminis' }
  ];
  const GENDERS = [
    { id: 'm', label: 'Чоловічий' },
    { id: 'f', label: 'Жіночий' },
    { id: 'both', label: 'Обидва' }
  ];
  const THEMES = [
    { id: 'all', label: 'Всі слова' },
    { id: 'prod', label: 'Продукти' },
    { id: 'cafe', label: 'У кафе' },
    { id: 'street', label: 'На вулиці' },
    { id: 'home', label: 'Дім' },
    { id: 'nature', label: 'Природа' },
    { id: 'people', label: 'Люди і родина' },
    { id: 'time', label: 'Час' }
  ];

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
    <h4 style="margin:0">Що вивчаємо</h4>
    <span class="text-muted" style="font-size:12px">задає, що випадає у завданнях</span>
  </div>

  <div style="display:flex;flex-direction:column;gap:var(--space-4)">
    <div>
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">Складність</span></div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="text-muted" style="font-size:12px">просто</span>
        <input type="range" min="0" max={maxLevel} step="1" value={s.level} on:input={(e) => setLevel(+e.target.value)} style="flex:1">
        <span class="text-muted" style="font-size:12px">складно</span>
      </div>
    </div>

    {#if s.theme === 'all'}
    {#if showCases}
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span class="card-kicker" style="margin:0">Відмінки</span>
        <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px" on:click={() => setCasesAll(!allCasesOn)}>{allCasesOn ? 'зняти всі' : 'обрати всі'}</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each CASES as c}
          <label class="lt-chip" style={caseTint(s.cases[c.id])}>
            <input type="checkbox" checked={s.cases[c.id]} on:change={() => toggleKey('cases', c.id)} style="display:none">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:15px">{c.abbr}</span>
            <span class="text-muted" style="font-size:10px">{c.name}</span>
          </label>
        {/each}
      </div>
    </div>
    {/if}

    {#if !fixedFilters}
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span class="card-kicker" style="margin:0">Тип прикметника</span>
        <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px" on:click={() => setTypesAll(!allTypesOn)}>{allTypesOn ? 'зняти всі' : 'обрати всі'}</button>
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
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">Рід</span></div>
      <div class="seg">
        {#each GENDERS as g}
          <label class="seg-opt"><input type="radio" name="lt-adj-gender" checked={s.gender === g.id} on:change={() => setGender(g.id)}>{g.label}</label>
        {/each}
      </div>
    </div>
    {/if}
    {/if}

    {#if !fixedFilters}
    <div>
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">Число</span></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <label class="lt-chip" style={caseTint(s.numbers.sg)}>
          <input type="checkbox" checked={s.numbers.sg} on:change={() => toggleKey('numbers', 'sg')} style="display:none">
          <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">Однина</span>
        </label>
        <label class="lt-chip" style={caseTint(s.numbers.pl)}>
          <input type="checkbox" checked={s.numbers.pl} on:change={() => toggleKey('numbers', 'pl')} style="display:none">
          <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">Множина</span>
        </label>
      </div>
    </div>
    {/if}

    <div>
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">Тема</span></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each THEMES as th}
          <button class="lt-chip" style="cursor:pointer;{s.theme === th.id ? 'border-color:var(--color-accent);background:#fff3e4;' : ''}" on:click={() => setTheme(th.id)}>
            <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">{th.label}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
