<script>
  import { CONJ_TIERS } from '../engine/conjugation.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  export let settings;
  export let onPoolChange;
  export let onLevelChange;

  $: L = UI[$lang];
  $: s = $settings;
  const maxLevel = CONJ_TIERS.length - 1;

  function setLevel(v) { settings.update((st) => ({ ...st, level: v })); onLevelChange(); }
</script>

<div style="border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:clamp(16px,3cqw,26px);margin-bottom:var(--space-8)">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:var(--space-4)">
    <h4 style="margin:0">{L.studyTitle}</h4>
    <span class="text-muted" style="font-size:12px">{L.studyHint}</span>
  </div>

  <div>
    <div style="margin-bottom:8px"><span class="card-kicker" style="margin:0">{L.difficulty}</span></div>
    <div style="display:flex;align-items:center;gap:12px">
      <span class="text-muted" style="font-size:12px">{L.easy}</span>
      <input type="range" min="0" max={maxLevel} step="1" value={s.level} on:input={(e) => setLevel(+e.target.value)} style="flex:1">
      <span class="text-muted" style="font-size:12px">{L.hard}</span>
    </div>
  </div>
</div>
