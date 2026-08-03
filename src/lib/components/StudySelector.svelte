<script>
  import { CASES } from '../data/cases.js';
  import { DECLENSIONS } from '../data/declensions.js';
  import { LEVELS, PHRASE_TIERS } from '../data/levels.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  export let settings;
  export let onPoolChange;
  export let onLevelChange;

  const THEMES = ['all', 'prod', 'cafe', 'street', 'home', 'nature', 'people', 'time'];

  $: L = UI[$lang];

  const maleTypes = DECLENSIONS.filter((x) => x.gender === 'm');
  const femaleTypes = DECLENSIONS.filter((x) => x.gender === 'f');
  const maleIds = maleTypes.map((x) => x.id);
  const femaleIds = femaleTypes.map((x) => x.id);

  $: s = $settings;
  $: maxLevel = (s.theme === 'all' ? LEVELS.length : PHRASE_TIERS.length) - 1;
  $: allCasesOn = CASES.every((c) => s.cases[c.id]);
  $: maleOn = maleTypes.every((x) => s.types[x.id]);
  $: femaleOn = femaleTypes.every((x) => s.types[x.id]);

  function setLevel(v) {
    settings.update((st) => ({ ...st, level: v }));
    onLevelChange();
  }
  function setTheme(id) {
    const cap = (id === 'all' ? LEVELS.length : PHRASE_TIERS.length) - 1;
    settings.update((st) => ({ ...st, theme: id, level: Math.min(st.level, cap) }));
    onPoolChange();
  }
  function toggleKey(group, id) {
    settings.update((st) => ({ ...st, [group]: { ...st[group], [id]: !st[group][id] } }));
    onPoolChange();
  }
  function setCases(v) {
    const cs = {};
    CASES.forEach((c) => (cs[c.id] = v));
    settings.update((st) => ({ ...st, cases: cs }));
    onPoolChange();
  }
  function setTypes(ids, v) {
    settings.update((st) => {
      const t = { ...st.types };
      ids.forEach((id) => (t[id] = v));
      return { ...st, types: t };
    });
    onPoolChange();
  }

  const caseTint = (on) => (on ? 'border-color:var(--color-accent);background:#fff3e4;' : '');
  const typeTint = (x, on) => {
    const base = x.gender === 'm' ? '#fdf7ee' : '#f6f2f9';
    const hot = x.gender === 'm' ? '#f4e3c6' : '#e7ddf0';
    return `background:${on ? hot : base};` + (on ? 'border-color:var(--color-accent);' : '');
  };
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
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span class="card-kicker" style="margin:0">{L.cases}</span>
        <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px" on:click={() => setCases(!allCasesOn)}>{allCasesOn ? L.clearAll : L.selectAll}</button>
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

    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span class="card-kicker" style="margin:0;color:var(--color-accent-800)">{L.mascRow}</span>
        <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px" on:click={() => setTypes(maleIds, !maleOn)}>{maleOn ? L.clearAll : L.selectAll}</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each maleTypes as x}
          <label class="lt-chip" style={typeTint(x, s.types[x.id])}>
            <input type="checkbox" checked={s.types[x.id]} on:change={() => toggleKey('types', x.id)} style="display:none">
            <span style="font-weight:600;font-size:13px">{x.ending}</span>
            <span class="text-muted" style="font-size:10px">{x.sample}</span>
          </label>
        {/each}
      </div>
    </div>

    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span class="card-kicker" style="margin:0;color:#574a71">{L.femRow}</span>
        <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px" on:click={() => setTypes(femaleIds, !femaleOn)}>{femaleOn ? L.clearAll : L.selectAll}</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each femaleTypes as x}
          <label class="lt-chip" style={typeTint(x, s.types[x.id])}>
            <input type="checkbox" checked={s.types[x.id]} on:change={() => toggleKey('types', x.id)} style="display:none">
            <span style="font-weight:600;font-size:13px">{x.ending}</span>
            <span class="text-muted" style="font-size:10px">{x.sample}</span>
          </label>
        {/each}
      </div>
    </div>

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
