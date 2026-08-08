<script>
  import { onMount } from 'svelte';
  import { settingsFor } from '../stores/settings.js';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { record, candidateWeight, dimWeight, fold, keysFor } from '../stores/progress.js';
  import { newTask, poolOk } from '../engine/generate.js';
  import { newAdjTask, adjPoolOk, newDegreeTask, degreePoolOk, newAdverbTask, adverbPoolOk } from '../engine/adjectives.js';
  import { newPronounTask, pronounPoolOk } from '../engine/pronouns.js';
  import { newConjTask, conjPoolOk } from '../engine/conjugation.js';
  import { newVFormsTask, vformsPoolOk } from '../engine/verbForms.js';
  import CheatTable from './CheatTable.svelte';
  import CheatStack from './CheatStack.svelte';
  import AdjCheatTable from './AdjCheatTable.svelte';
  import AdjCheatStack from './AdjCheatStack.svelte';
  import TaskCard from './TaskCard.svelte';
  import StudySelector from './StudySelector.svelte';
  import AdjSelector from './AdjSelector.svelte';
  import DegreeSelector from './DegreeSelector.svelte';
  import DegreeCheat from './DegreeCheat.svelte';
  import AdverbCheat from './AdverbCheat.svelte';
  import PronounSelector from './PronounSelector.svelte';
  import PronounCheat from './PronounCheat.svelte';
  import ConjSelector from './ConjSelector.svelte';
  import ConjCheat from './ConjCheat.svelte';
  import VFormsSelector from './VFormsSelector.svelte';
  import StatsPanel from './StatsPanel.svelte';

  export let topic;
  export let onBack;

  const isAdj = topic.kind === 'adj';
  const isDeg = topic.mode === 'degrees';
  const isAdverb = topic.mode === 'adverbs';
  const isPron = topic.kind === 'pron';
  const isConj = topic.kind === 'conj';
  const isVF = topic.kind === 'vforms';
  const settings = settingsFor(topic.id);
  const genTask = isVF ? newVFormsTask : isConj ? newConjTask : isPron ? newPronounTask : isAdverb ? newAdverbTask : isDeg ? newDegreeTask : isAdj ? newAdjTask : newTask;
  const genOk = isVF ? vformsPoolOk : isConj ? conjPoolOk : isPron ? pronounPoolOk : isAdverb ? adverbPoolOk : isDeg ? degreePoolOk : isAdj ? adjPoolOk : poolOk;
  const selectorCases = isAdj ? topic.scopeCases : null;
  const cheatCases = isAdj ? topic.cheatCases : null;
  const fixedFilters = isAdj && topic.fixedFilters;
  const cheatBoth = isAdj && topic.cheatBoth;
  const stateOf = (st) => ({ ...st, lang: $lang, ...(isAdj ? { caseScope: topic.scopeCases } : {}) });

  let task = null;
  let revealed = false;
  let userInput = '';
  let focusType = 'as';
  let correctMark = false;
  let statsOpen = false;

  const typePrefix = isAdj ? 'atype|' : 'ntype|';

  function pickWeighted(items, ws) {
    const sum = ws.reduce((a, b) => a + b, 0);
    let r = Math.random() * sum;
    for (let i = 0; i < items.length; i++) { r -= ws[i]; if (r <= 0) return items[i]; }
    return items[items.length - 1];
  }
  function weightedPick(cands) {
    return pickWeighted(cands, cands.map((c) => candidateWeight(topic.id, keysFor(c, isAdj))));
  }
  // тип обираємо зважено за «слабкістю/непокриттям» типу — щоб рідкісні типи (мало слів)
  // з'являлися нарівні, а не пропорційно кількості слів
  function pickType(types) {
    return pickWeighted(types, types.map((t) => dimWeight(topic.id, typePrefix + t)));
  }

  $: s = $settings;
  $: L = UI[$lang];

  let lastLang = $lang;
  $: if ($lang !== lastLang) { lastLang = $lang; if (task) makeNewTask(); }

  function makeNewTask() {
    const prev = task ? { wordId: task.wordId, caseId: task.caseId, degree: task.degree, driver: task.driver, pronId: task.pronId, formTarget: task.formTarget } : null;
    const state = stateOf($settings);
    const typeKeys = Object.keys(state.types || {}).filter((k) => state.types[k]);
    const cands = [];
    // стратифікація за типом: кожен кандидат — з обраного (зважено) типу, щоб усі закінчення брали участь
    for (let i = 0; i < 8 && typeKeys.length; i++) {
      const ty = pickType(typeKeys);
      const c = genTask({ ...state, types: { [ty]: true } }, prev);
      if (c) cands.push(c);
    }
    while (cands.length < 3) { const c = genTask(state, prev); if (c) cands.push(c); else break; }
    const t = cands.length ? weightedPick(cands) : null;
    task = t;
    revealed = false;
    userInput = '';
    correctMark = false;
    if (t && !isAdj) focusType = t.typeId;
  }

  function ensureTask() {
    if (!genOk(stateOf($settings))) { task = null; return; }
    const st = $settings, t = task;
    if (!t) { makeNewTask(); return; }
    let invalid;
    if (isConj || isVF) {
      invalid = false;
    } else if (isAdverb) {
      invalid = !st.degrees[t.degree] || (st.types && !st.types[t.adjType]);
    } else if (isPron) {
      invalid = !st.cases[t.caseId] || !st.numbers[t.number];
    } else if (isDeg) {
      invalid = !st.degrees[t.degree] || !st.numbers[t.number] || (st.theme !== 'all' && t.theme !== st.theme) || (st.theme === 'all' && t.theme !== 'all');
    } else if (isAdj) {
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
    if (revealed) { makeNewTask(); return; }
    revealed = true;
    if (!task) return;
    const inp = userInput.trim();
    const correct = inp ? fold((task.stemPrefix || '') + inp) === fold(task.targetForm) : null;
    correctMark = correct === true;
    record(topic.id, keysFor(task, isAdj), correct);
  }

  function reportError() {
    if (!task) return;
    const st = $settings;
    const answer = (task.lead ? task.lead + ' ' : '') + task.stem + task.tail + (task.trail ? ' ' + task.trail : '');
    const promptShown = task.prompt.text || task.stem + (task.prompt.tail || '');
    const gloss = task.hint || task.revealUk || '';
    const title = 'Помилка: ' + answer;
    const info = { topic: topic.id, lang: $lang, theme: st.theme, level: st.level + 1, promptShown, answer, gloss, task };
    const body =
      '**Урок:** ' + topic.id + ' (' + $lang + ')\n' +
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
    <button class="btn btn-secondary btn-icon" on:click={onBack} aria-label={L.back}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
    </button>
    <div>
      <div class="card-kicker">{topic.title[$lang]}</div>
      <h2 style="margin:0;font-size:clamp(22px,3.6cqw,32px)">{topic.trainerTitle[$lang]}</h2>
    </div>
  </div>
  <hr class="hr" style="margin-block:0 var(--space-4)">

  <TaskCard {task} {revealed} {userInput} {correctMark} onInput={(e) => (userInput = e.target.value)} onPrimary={primaryAction} onReport={reportError} />

  {#if !isVF}
  <div style="margin-bottom:var(--space-6)">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:var(--space-3)">
      <div style="display:flex;align-items:baseline;gap:12px">
        <span class="card-kicker" style="margin:0">{L.materials}</span>
        <button class="btn btn-ghost" on:click={toggleTable} style="font-size:14px">{s.tableOpen ? L.hideTable : L.showTable}</button>
      </div>
      {#if s.tableOpen && !cheatBoth && !isDeg && !isPron && !isAdverb && !isConj && !isVF}
        <div style="display:flex;align-items:center;gap:10px">
          <span class="text-muted" style="font-size:12px">{L.show}</span>
          <div class="seg">
            <label class="seg-opt"><input type="radio" name="lt-viewnum" checked={s.viewNumber === 'sg'} on:change={() => setView('sg')}>{L.numSg}</label>
            <label class="seg-opt"><input type="radio" name="lt-viewnum" checked={s.viewNumber === 'pl'} on:change={() => setView('pl')}>{L.numPl}</label>
          </div>
        </div>
      {/if}
    </div>

    {#if s.tableOpen}
      {#if isConj}
        <ConjCheat />
      {:else if isPron}
        <PronounCheat />
      {:else if isAdverb}
        <AdverbCheat />
      {:else if isDeg}
        <DegreeCheat />
      {:else if isAdj}
        <AdjCheatTable view={s.viewNumber} caseIds={cheatCases} both={cheatBoth} />
        <AdjCheatStack {settings} view={s.viewNumber} caseIds={cheatCases} both={cheatBoth} />
      {:else}
        <CheatTable view={s.viewNumber} />
        <CheatStack view={s.viewNumber} bind:focusType />
      {/if}
    {/if}
  </div>
  {/if}

  <div style="margin-bottom:var(--space-6)">
    <button class="btn btn-ghost" on:click={() => (statsOpen = !statsOpen)} style="font-size:14px"><span class="card-kicker" style="margin:0">{statsOpen ? L.hideStats : L.showStats}</span></button>
    {#if statsOpen}<div style="margin-top:var(--space-3)"><StatsPanel {topic} /></div>{/if}
  </div>

  {#if isVF}
    <VFormsSelector {settings} onLevelChange={makeNewTask} />
  {:else if isConj}
    <ConjSelector {settings} onLevelChange={makeNewTask} />
  {:else if isPron}
    <PronounSelector {settings} onPoolChange={ensureTask} onLevelChange={makeNewTask} />
  {:else if isAdverb}
    <DegreeSelector {settings} degreeKeys={['pos', 'comp', 'sup']} showTheme={false} onPoolChange={ensureTask} onLevelChange={makeNewTask} />
  {:else if isDeg}
    <DegreeSelector {settings} onPoolChange={ensureTask} onLevelChange={makeNewTask} />
  {:else if isAdj}
    <AdjSelector {settings} caseIds={selectorCases} {fixedFilters} onPoolChange={ensureTask} onLevelChange={makeNewTask} />
  {:else}
    <StudySelector {settings} onPoolChange={ensureTask} onLevelChange={makeNewTask} />
  {/if}
</div>
