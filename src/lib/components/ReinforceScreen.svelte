<script>
  import { get } from 'svelte/store';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { progress, record, keysFor, fold } from '../stores/progress.js';
  import { settingsFor } from '../stores/settings.js';
  import { collectMistakeCells, shuffled } from '../engine/mistakes.js';
  import { engineFor, genForKey } from '../engine/topicEngine.js';
  import { topics } from '../../topics/index.js';
  import TaskCard from './TaskCard.svelte';

  export let onBack;

  $: L = UI[$lang];

  const queue = shuffled(collectMistakeCells(get(progress)));
  const total = queue.length;

  let idx = 0;
  let task = null;
  let revealed = false;
  let userInput = '';
  let correctMark = false;
  let currentTopic = null;
  let currentFlags = null;

  function loadCurrent() {
    revealed = false;
    userInput = '';
    correctMark = false;
    const entry = queue[idx];
    if (!entry) { task = null; currentTopic = null; return; }
    const topic = topics.find((t) => t.id === entry.topicId);
    if (!topic) { idx += 1; loadCurrent(); return; }
    const flags = engineFor(topic);
    const settings = get(settingsFor(topic.id));
    const t = genForKey(topic, flags, entry.key, settings, get(lang));
    if (!t) { idx += 1; loadCurrent(); return; }
    currentTopic = topic;
    currentFlags = flags;
    task = t;
  }
  loadCurrent();

  function onInput(e) { userInput = e.target.value; }

  function primary() {
    if (revealed) { idx += 1; loadCurrent(); return; }
    revealed = true;
    if (!task) return;
    const inp = userInput.trim();
    const correct = inp ? fold((task.stemPrefix || '') + inp) === fold(task.targetForm) : null;
    correctMark = correct === true;
    record(currentTopic.id, keysFor(task, currentFlags.isAdj), correct);
  }

  function reportError() {
    if (!task || !currentTopic) return;
    const answer = (task.lead ? task.lead + ' ' : '') + task.stem + task.tail + (task.trail ? ' ' + task.trail : '');
    const promptShown = task.prompt.text || task.stem + (task.prompt.tail || '');
    const gloss = task.hint || task.revealUk || '';
    const title = 'Помилка: ' + answer;
    const info = { topic: currentTopic.id, lang: $lang, promptShown, answer, gloss, task };
    const body =
      '**Урок:** ' + currentTopic.id + ' (' + $lang + ')\n' +
      '**Показано:** ' + promptShown + '\n' +
      '**Відповідь:** ' + answer + '\n' +
      '**Підказка/глос:** ' + gloss + '\n\n' +
      'Опишіть, що не так:\n\n\n' +
      '<details><summary>Технічні дані</summary>\n\n```json\n' + JSON.stringify(info, null, 2) + '\n```\n</details>\n';
    const url = 'https://github.com/Ku6opr/lt/issues/new?title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
    window.open(url, '_blank', 'noopener');
  }
</script>

<div class="lt-wrap">
  <div style="display:flex;align-items:center;gap:var(--space-3);padding-block:var(--space-2) var(--space-3)">
    <button class="btn btn-secondary btn-icon" on:click={onBack} aria-label={L.back}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
    </button>
    <div>
      <div class="card-kicker">{L.reinforceKicker}</div>
      <h2 style="margin:0;font-size:clamp(22px,3.6cqw,32px)">{L.reinforceTitle}</h2>
    </div>
  </div>
  <hr class="hr" style="margin-block:0 var(--space-4)">

  {#if task}
    <div class="card-kicker" style="text-align:center;margin-bottom:var(--space-2)">{idx + 1} / {total} · {currentTopic.title[$lang]}</div>
    <TaskCard {task} {revealed} {userInput} {correctMark} onInput={onInput} onPrimary={primary} onReport={reportError} />
  {:else}
    <div style="border:1px dashed var(--color-divider);border-radius:var(--radius-lg);padding:clamp(24px,5cqw,48px);text-align:center;color:var(--color-neutral-600)">
      <p style="margin:0 0 var(--space-4);font-size:clamp(15px,2.4cqw,18px)">{total === 0 ? L.reinforceEmpty : L.reinforceDone}</p>
      <button class="btn btn-secondary" on:click={onBack}>{L.back}</button>
    </div>
  {/if}
</div>
