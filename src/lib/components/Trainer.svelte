<script>
  import { onMount } from 'svelte';
  import { settings } from '../stores/settings.js';
  import { newTask, poolOk } from '../engine/generate.js';
  import { topics } from '../../topics/index.js';
  import CheatTable from './CheatTable.svelte';
  import CheatStack from './CheatStack.svelte';
  import TaskCard from './TaskCard.svelte';
  import StudySelector from './StudySelector.svelte';

  export let onBack;

  const topic = topics[0];

  let task = null;
  let revealed = false;
  let userInput = '';
  let focusType = 'as';

  $: s = $settings;

  function makeNewTask() {
    const t = newTask($settings, task && task.wordId);
    task = t;
    revealed = false;
    userInput = '';
    if (t) focusType = t.typeId;
  }

  function ensureTask() {
    if (!poolOk($settings)) {
      task = null;
      return;
    }
    const st = $settings;
    if (!task || (task.caseBound && !st.cases[task.caseId]) || !st.types[task.typeId] || !st.numbers[task.number]) makeNewTask();
  }

  function primaryAction() {
    if (revealed) makeNewTask();
    else revealed = true;
  }

  function toggleTable() {
    settings.update((st) => ({ ...st, tableOpen: !st.tableOpen }));
  }
  function setView(n) {
    settings.update((st) => ({ ...st, viewNumber: n }));
  }

  onMount(() => {
    if (!task) makeNewTask();
  });
</script>

<div class="lt-wrap">
  <div style="display:flex;align-items:center;gap:var(--space-3);padding-block:var(--space-2) var(--space-3)">
    <button class="btn btn-secondary btn-icon" on:click={onBack} aria-label="Назад до тем">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
    </button>
    <div>
      <div class="card-kicker">{topic.title}</div>
      <h2 style="margin:0;font-size:clamp(22px,3.6cqw,32px)">{topic.trainerTitle}</h2>
    </div>
  </div>
  <hr class="hr" style="margin-block:0 var(--space-4)">

  <TaskCard {task} {revealed} {userInput} onInput={(e) => (userInput = e.target.value)} onPrimary={primaryAction} />

  <div style="margin-bottom:var(--space-6)">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:var(--space-3)">
      <div style="display:flex;align-items:baseline;gap:12px">
        <span class="card-kicker" style="margin:0">Матеріали</span>
        <button class="btn btn-ghost" on:click={toggleTable} style="font-size:14px">{s.tableOpen ? 'Сховати таблицю' : 'Показати таблицю'}</button>
      </div>
      {#if s.tableOpen}
        <div style="display:flex;align-items:center;gap:10px">
          <span class="text-muted" style="font-size:12px">Показати:</span>
          <div class="seg">
            <label class="seg-opt"><input type="radio" name="lt-viewnum" checked={s.viewNumber === 'sg'} on:change={() => setView('sg')}>Однина</label>
            <label class="seg-opt"><input type="radio" name="lt-viewnum" checked={s.viewNumber === 'pl'} on:change={() => setView('pl')}>Множина</label>
          </div>
        </div>
      {/if}
    </div>

    {#if s.tableOpen}
      <CheatTable view={s.viewNumber} />
      <CheatStack view={s.viewNumber} bind:focusType />
    {/if}
  </div>

  <StudySelector onPoolChange={ensureTask} onLevelChange={makeNewTask} />
</div>
