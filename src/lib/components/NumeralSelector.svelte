<script>
  import { NUM_TIERS } from '../engine/numerals.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  export let settings;
  export let onPoolChange;
  export let onLevelChange;

  const CASES = [
    { id: 'K', abbr: 'K.' }, { id: 'N', abbr: 'N.' }, { id: 'G', abbr: 'G.' },
    { id: 'In', abbr: 'Įn.' }, { id: 'Vt', abbr: 'Vt.' }
  ];

  $: L = UI[$lang];
  $: s = $settings;
  $: maxLevel = NUM_TIERS.length - 1;
  $: allCasesOn = CASES.every((c) => s.cases[c.id]);

  function setLevel(v) { settings.update((st) => ({ ...st, level: v })); onLevelChange(); }
  function toggleAuto() { settings.update((st) => ({ ...st, autoLevel: !st.autoLevel })); }
  function toggleKey(group, id) { settings.update((st) => ({ ...st, [group]: { ...st[group], [id]: !st[group][id] } })); onPoolChange(); }
  function setCasesAll(v) { const cs = { V: false }; CASES.forEach((c) => (cs[c.id] = v)); settings.update((st) => ({ ...st, cases: cs })); onPoolChange(); }
  const tint = (on) => (on ? 'border-color:var(--color-accent);background:#fff3e4;' : '');
</script>

<div style="border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:clamp(16px,3cqw,26px);margin-bottom:var(--space-8)">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:var(--space-4)">
    <h4 style="margin:0">{L.studyTitle}</h4>
  </div>

  <div style="display:flex;flex-direction:column;gap:var(--space-4)">
    <div>
      <div style="margin-bottom:8px;display:flex;align-items:center;justify-content:space-between"><span class="card-kicker" style="margin:0">{L.difficulty}</span><label style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--color-neutral-600);cursor:pointer"><input type="checkbox" checked={s.autoLevel} on:change={toggleAuto}> {L.autoLevel}</label></div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="text-muted" style="font-size:12px">{L.easy}</span>
        <input type="range" min="0" max={maxLevel} step="1" value={s.level} disabled={s.autoLevel} on:input={(e) => setLevel(+e.target.value)} style="flex:1;{s.autoLevel ? 'opacity:.45' : ''}">
        <span class="text-muted" style="font-size:12px">{L.hard}</span>
      </div>
    </div>

    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <span class="card-kicker" style="margin:0">{L.cases}</span>
        <button class="btn btn-ghost" style="font-size:12px;padding:2px 8px" on:click={() => setCasesAll(!allCasesOn)}>{allCasesOn ? L.clearAll : L.selectAll}</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each CASES as c}
          <label class="lt-chip" style={tint(s.cases[c.id])}>
            <input type="checkbox" checked={s.cases[c.id]} on:change={() => toggleKey('cases', c.id)} style="display:none">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:15px">{c.abbr}</span>
            <span class="text-muted" style="font-size:10px">{L.caseNames[c.id]}</span>
          </label>
        {/each}
      </div>
    </div>
  </div>
</div>
