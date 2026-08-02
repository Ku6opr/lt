<script>
  import { onMount } from 'svelte';
  import { settingsFor } from '../stores/settings.js';
  import { newTask, poolOk } from '../engine/generate.js';
  import { newAdjTask, adjPoolOk } from '../engine/adjectives.js';
  import CheatTable from './CheatTable.svelte';
  import CheatStack from './CheatStack.svelte';
  import AdjCheatTable from './AdjCheatTable.svelte';
  import AdjCheatStack from './AdjCheatStack.svelte';
  import TaskCard from './TaskCard.svelte';
  import StudySelector from './StudySelector.svelte';
  import AdjSelector from './AdjSelector.svelte';

  export let topic;
  export let onBack;

  const isAdj = topic.kind === 'adj';
  const settings = settingsFor(topic.id);
  const genTask = isAdj ? newAdjTask : newTask;
  const genOk = isAdj ? adjPoolOk : poolOk;
  const selectorCases = isAdj ? topic.scopeCases : null;
  const cheatCases = isAdj ? topic.cheatCases : null;
  const fixedFilters = isAdj && topic.fixedFilters;
  const cheatBoth = isAdj && topic.cheatBoth;
  const stateOf = (st) => (isAdj ? { ...st, caseScope: topic.scopeCases } : st);

  let task = null;
  let revealed = false;
  let userInput = '';
  let focusType = 'as';

  $: s = $settings;

  function makeNewTask() {
    const prev = task ? { wordId: task.wordId, caseId: task.caseId } : null;
    const t = genTask(stateOf($settings), prev);
    task = t;
    revealed = false;
    userInput = '';
    if (t && !isAdj) focusType = t.typeId;
  }

  function ensureTask() {
    if (!genOk(stateOf($settings))) { task = null; return; }
    const st = $settings, t = task;
    if (!t) { makeNewTask(); return; }
    let invalid;
    if (isAdj) {
      if (st.theme && st.theme !== 'all') {
        invalid = t.theme !== st.theme || !st.numbers[t.number];
      } else {
        invalid = t.theme !== 'all' || !st.types[t.adjType] || (st.gender !== 'both' && st.gender !== t.gender) || !st.cases[t.caseId] || !st.numbers[t.number];
      }
    } else {
      const themeOk = st.theme === 'all' || (t.themes && t.themes.includes(st.theme));
      invalid = (t.caseBound && !st.cases[t.caseId]) || !st.types[t.typeId] || !st.numbers[t.number] || !themeOk;
    }
    if (invalid) makeNewTask();
  }

  function primaryAction() {
    if (revealed) makeNewTask();
    else revealed = true;
  }

  function reportError() {
    if (!task) return;
    const st = $settings;
    const answer = (task.lead ? task.lead + ' ' : '') + task.stem + task.tail + (task.trail ? ' ' + task.trail : '');
    const promptShown = task.prompt.text || task.stem + (task.prompt.tail || '');
    const gloss = task.hint || task.revealUk || '';
    const title = 'Помилка: ' + answer;
    const info = { topic: topic.id, theme: st.theme, level: st.level + 1, promptShown, answer, gloss, task };
    const body =
      '**Урок:** ' + topic.title + '\n' +
      '**Тема:** ' + (st.theme || 'all') + '\n' +
      '**Рівень:** ' + (st.level + 1) + '\n' +
      '**Показано:** ' + promptShown + '\n' +
      '**Відповідь:** ' + answer + '\n' +
      '**Підказка/глос:** ' + gloss + '\n\n' +
      'Опишіть, що не так:\n\n\n' +
      '<details><summary>Технічні дані</summary>\n\n```json\n' + JSON.stringify(info, null, 2) + '\n```\n</details>\n';
    const url = 'https://github.com/Ku6opr/lt/issues/new?title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
    window.open(url, '_blank', 'noopener');
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

  <TaskCard {task} {revealed} {userInput} onInput={(e) => (userInput = e.target.value)} onPrimary={primaryAction} onReport={reportError} />

  <div style="margin-bottom:var(--space-6)">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:var(--space-3)">
      <div style="display:flex;align-items:baseline;gap:12px">
        <span class="card-kicker" style="margin:0">Матеріали</span>
        <button class="btn btn-ghost" on:click={toggleTable} style="font-size:14px">{s.tableOpen ? 'Сховати таблицю' : 'Показати таблицю'}</button>
      </div>
      {#if s.tableOpen && !cheatBoth}
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
      {#if isAdj}
        <AdjCheatTable view={s.viewNumber} caseIds={cheatCases} both={cheatBoth} />
        <AdjCheatStack {settings} view={s.viewNumber} caseIds={cheatCases} both={cheatBoth} />
      {:else}
        <CheatTable view={s.viewNumber} />
        <CheatStack view={s.viewNumber} bind:focusType />
      {/if}
    {/if}
  </div>

  {#if isAdj}
    <AdjSelector {settings} caseIds={selectorCases} {fixedFilters} onPoolChange={ensureTask} onLevelChange={makeNewTask} />
  {:else}
    <StudySelector {settings} onPoolChange={ensureTask} onLevelChange={makeNewTask} />
  {/if}
</div>
