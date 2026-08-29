<script>
  import { QUEST_TIERS, Q_WORDS } from '../engine/questions.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';

  export let settings;
  export let onPoolChange;
  export let onLevelChange;

  $: L = UI[$lang];
  $: s = $settings;
  $: tKey = $lang === 'ru' ? 'ru' : $lang === 'en' ? 'en' : 'uk';
  const maxLevel = QUEST_TIERS.length - 1;
  const tint = (on) => (on ? 'border-color:var(--color-accent);background:#fff3e4;' : '');

  const qwLabel = (q, k) => (k === 'en' ? q.src.en : q.src[k].m);

  function setLevel(v) { settings.update((st) => ({ ...st, level: v })); onLevelChange(); }
  function toggleAuto() { settings.update((st) => ({ ...st, autoLevel: !st.autoLevel })); }
  function toggleQw(id) {
    settings.update((st) => ({ ...st, qws: { ...st.qws, [id]: !st.qws[id] } }));
    onPoolChange();
  }
</script>

<div style="border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:clamp(16px,3cqw,26px);margin-bottom:var(--space-8)">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:var(--space-4)">
    <h4 style="margin:0">{L.studyTitle}</h4>
  </div>

  <div style="display:flex;flex-direction:column;gap:var(--space-4)">
    <div>
      <div class="card-kicker" style="margin-bottom:8px">{L.questWords}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        {#each Q_WORDS as q}
          <label class="lt-chip" style={tint(s.qws[q.id])}>
            <input type="checkbox" checked={s.qws[q.id]} on:change={() => toggleQw(q.id)} style="display:none">
            <span style="font-family:var(--font-heading);font-weight:600;font-size:14px">{q.lt.m_sg}?</span>
            <span class="text-muted" style="font-size:10px">{qwLabel(q, tKey)}</span>
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
