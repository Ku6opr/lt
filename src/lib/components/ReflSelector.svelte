<script>
  import { reflTiersFor, REFL_POLS, reflForms } from '../engine/reflexive.js';
  import { REFL_VERBS } from '../data/verbsRefl.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  export let settings;
  export let tense = 'pres';
  export let onPoolChange;
  export let onLevelChange;

  $: L = UI[$lang];
  $: s = $settings;
  const maxLevel = reflTiersFor(tense).length - 1;
  const tint = (on) => (on ? 'border-color:var(--color-accent);background:#fff3e4;' : '');

  const EX = REFL_VERBS.find((v) => v.id === 'mokytis');
  const POL_KEY = { aff: 'polAff', neg: 'polNeg' };
  const polEx = (p) => reflForms(EX, tense, p).sg1;

  function setLevel(v) { settings.update((st) => ({ ...st, level: v })); onLevelChange(); }
  function toggleAuto() { settings.update((st) => ({ ...st, autoLevel: !st.autoLevel })); }
  function togglePol(id) {
    const next = { ...s.pols, [id]: !s.pols[id] };
    if (!Object.values(next).some(Boolean)) return;
    settings.update((st) => ({ ...st, pols: next }));
    onPoolChange();
  }
</script>

<div style="border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:clamp(16px,3cqw,26px);margin-bottom:var(--space-8)">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:var(--space-4)">
    <h4 style="margin:0">{L.studyTitle}</h4>
  </div>

  <div style="display:flex;flex-direction:column;gap:var(--space-4)">
    <div>
      <div class="card-kicker" style="margin-bottom:8px">{L.polAxis}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each REFL_POLS as p}
          <label class="lt-chip" style={tint(s.pols[p])}>
            <input type="checkbox" checked={s.pols[p]} on:change={() => togglePol(p)} style="display:none">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">{polEx(p)}</span>
            <span class="text-muted" style="font-size:10px">{L[POL_KEY[p]]}</span>
          </label>
        {/each}
      </div>
    </div>

    <div>
      <div style="margin-bottom:8px;display:flex;align-items:center;justify-content:space-between"><span class="card-kicker" style="margin:0">{L.difficulty}</span><label style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--color-neutral-600);cursor:pointer"><input type="checkbox" checked={s.autoLevel} on:change={toggleAuto}> {L.autoLevel}</label></div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="text-muted" style="font-size:12px">{L.easy}</span>
        <input type="range" min="0" max={maxLevel} step="1" value={s.level} disabled={s.autoLevel} on:input={(e) => setLevel(+e.target.value)} style="flex:1;{s.autoLevel ? 'opacity:.45' : ''}">
        <span class="text-muted" style="font-size:12px">{L.hard}</span>
      </div>
    </div>
  </div>
</div>
