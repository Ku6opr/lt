<script>
  import { PHRASE_TIERS } from '../data/levels.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  export let settings;
  export let onPoolChange;
  export let onLevelChange;
  export let degreeKeys = ['comp', 'sup'];
  export let showTheme = true;

  const THEMES = ['all', 'prod', 'cafe', 'street', 'home', 'nature', 'people', 'time'];

  $: L = UI[$lang];
  $: s = $settings;
  $: maxLevel = PHRASE_TIERS.length - 1;
  const degLabel = (d) => (d === 'pos' ? L.degPos : d === 'comp' ? L.degComp : L.degSup);

  function setLevel(v) { settings.update((st) => ({ ...st, level: v })); onLevelChange(); }
  function toggleDeg(d) { settings.update((st) => ({ ...st, degrees: { ...st.degrees, [d]: !st.degrees[d] } })); onPoolChange(); }
  function setTheme(id) { settings.update((st) => ({ ...st, theme: id })); onPoolChange(); }
  const tint = (on) => (on ? 'border-color:var(--color-accent);background:#fff3e4;' : '');
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
      <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">{L.degreeAxis}</span></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each degreeKeys as d}
          <label class="lt-chip" style={tint(s.degrees[d])}>
            <input type="checkbox" checked={s.degrees[d]} on:change={() => toggleDeg(d)} style="display:none">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">{degLabel(d)}</span>
          </label>
        {/each}
      </div>
    </div>
    {/if}

    {#if showTheme}
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
    {/if}
  </div>
</div>
