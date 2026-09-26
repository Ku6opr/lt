<script>
  import { onMount, tick } from 'svelte';
  import { get } from 'svelte/store';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { daily, dayKey, completeDay, saveSession } from '../stores/daily.js';
  import { dailyTasks, checkAnswer } from '../engine/daily.js';
  import { simplifyAccent } from '../engine/stem.js';
  import { fold } from '../stores/progress.js';
  import { topics } from '../../topics/index.js';
  import DayDot from './DayDot.svelte';

  export let onBack;

  const today = dayKey(new Date());
  const tasks = dailyTasks(today);
  const total = tasks.length;
  const totalWords = tasks.reduce((n, t) => n + t.size, 0);
  const saved = get(daily).session;

  let results = saved && saved.date === today ? saved.results.slice(0, total) : [];
  let i = results.length;
  const finish = () => completeDay(today, results.reduce((n, r) => n + (r || 0), 0), totalWords);
  if (total && i >= total) finish();
  let input = '';
  let revealed = false;
  let hintOpen = false;
  let check = null;
  let inputEl;

  $: L = UI[$lang];
  $: task = tasks[i] || null;
  $: finished = i >= total;
  $: guessed = results.reduce((n, r) => n + (r || 0), 0);
  $: points = totalWords ? Math.round((guessed / totalWords) * 100) : 0;
  $: scoreText = L.dailyScore.replace('{n}', points).replace('{pts}', L.points[new Intl.PluralRules($lang).select(points)]);
  $: topicShort = (id) => (topics.find((t) => t.id === id) || { short: {} }).short[$lang] || id;
  $: tagOf = (t) => (t.kind === 'v' ? (t.t === 'inf' ? L.infinitive : topicShort(t.topic)) : t.c ? L.caseNames[t.c] + (t.num === 'pl' ? ' ' + L.numPlAb : '') : '');

  const shown = (t) => simplifyAccent(t.textA || t.text);
  const lemmaShown = (t) => simplifyAccent(t.lemmaA || t.lemma);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const shareColor = (a) => `hsl(${Math.round(10 + 110 * a ** 1.5)}, 50%, 52%)`;

  function grow() {
    if (!inputEl) return;
    inputEl.style.height = 'auto';
    inputEl.style.height = inputEl.scrollHeight + 'px';
  }

  function focusInput() {
    tick().then(() => {
      grow();
      if (inputEl) inputEl.focus();
    });
  }
  onMount(focusInput);

  function primary() {
    if (!task) return;
    if (!revealed) {
      check = checkAnswer(input, task);
      results[i] = check.guessed;
      saveSession(today, results.slice());
      revealed = true;
      return;
    }
    i += 1;
    input = '';
    revealed = false;
    hintOpen = false;
    check = null;
    if (i >= total) finish();
    else focusInput();
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      primary();
    }
  }

  function reportError() {
    if (!task) return;
    const title = 'Помилка: ' + task.lt;
    const info = { daily: task.id, lang: $lang, source: task[$lang], answer: task.lt, input, tokens: task.tokens };
    const body =
      '**Завдання дня:** ' + task.id + ' (' + $lang + ')\n' +
      '**Показано:** ' + task[$lang] + '\n' +
      '**Відповідь:** ' + task.lt + '\n\n' +
      'Опишіть, що не так:\n\n\n' +
      '<details><summary>Технічні дані</summary>\n\n```json\n' + JSON.stringify(info, null, 2) + '\n```\n</details>\n';
    const url = 'https://github.com/Ku6opr/lt/issues/new?title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
    window.open(url, '_blank', 'noopener');
  }
</script>

<div class="lt-wrap">
  <div class="head">
    <button class="btn btn-secondary btn-icon" type="button" on:click={onBack} aria-label={L.back}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
    </button>
    <div class="head-text">
      <div class="card-kicker">{L.dailyTask}</div>
      <h2>{L.dailyTitle}</h2>
    </div>
    {#if !finished}<div class="count">{i + 1} / {total}</div>{/if}
  </div>

  <div class="steps" aria-hidden="true">
    {#each tasks as _, k}
      <span class="step" class:cur={k === i && !finished} style:background={results[k] != null ? shareColor(results[k] / tasks[k].size) : null}></span>
    {/each}
  </div>

  {#if task}
    <div class="card">
      <div class="source">{task[$lang]}</div>

      <div class="hint">
        {#if hintOpen}
          <div class="lemmas">
            {#each task.tokens as t}<span class="lemma">{lemmaShown(t)}</span>{/each}
          </div>
        {:else if !revealed}
          <button class="btn btn-ghost hint-btn" type="button" on:click={() => (hintOpen = true)}>{L.dailyHint}</button>
        {/if}
      </div>

      <textarea
        class="answer"
        rows="1"
        bind:this={inputEl}
        bind:value={input}
        on:input={grow}
        on:keydown={onKey}
        readonly={revealed}
        autocomplete="off"
        autocapitalize="sentences"
        autocorrect="off"
        spellcheck="false"
        enterkeyhint="go"
      ></textarea>

      <div class="reveal">
        {#if revealed}
          <div class="card-kicker">{L.dailyAnswer}{#if check.match}<span class="ok" title={L.matchedYours}>✓</span>{/if}</div>
          <div class="gloss">
            {#each task.tokens as t, k}
              <span class="tok">
                <span class="form" class:missed={check.hit[k] === false}>{k === 0 ? cap(shown(t)) : shown(t)}{t.after}{k === task.tokens.length - 1 ? task.end : ''}</span>
                <span class="lem">{fold(t.lemma) === fold(t.text) ? '' : lemmaShown(t)}</span>
                <span class="tag">{tagOf(t)}</span>
              </span>
            {/each}
          </div>
        {/if}
      </div>

      <div class="actions">
        <button class="btn btn-primary" type="button" on:click={primary}>{revealed ? (i === total - 1 ? L.dailyFinish : L.next) : L.reveal}</button>
      </div>
    </div>
    <div class="report">
      <button class="btn btn-ghost" type="button" on:click={reportError} title={L.reportTitle}>⚑ {L.report}</button>
    </div>
  {:else}
    <div class="card summary">
      <DayDot share={totalWords ? guessed / totalWords : 0} size={84} />
      <div class="sum-title">{L.dailyDoneTitle}</div>
      <div class="text-muted">{scoreText}</div>
      <button class="btn btn-primary" type="button" on:click={onBack}>{L.back}</button>
    </div>
  {/if}
</div>

<style>
  .head { display: flex; align-items: center; gap: var(--space-3); padding-block: var(--space-2) var(--space-3); }
  .head-text { flex: 1; min-width: 0; }
  .head h2 { margin: 0; font-size: clamp(22px, 3.6cqw, 32px); }
  .count { font-family: var(--font-heading); font-size: 18px; font-weight: 600; color: var(--color-neutral-600); white-space: nowrap; }

  .steps { display: flex; gap: 4px; margin-bottom: var(--space-4); }
  .step { flex: 1; height: 4px; border-radius: 2px; background: var(--color-neutral-300); transition: background .2s; }
  .step.cur { background: var(--color-accent-300); }

  .card {
    border: 1px solid var(--color-divider); border-radius: var(--radius-lg);
    padding: clamp(20px, 4.5cqw, 44px); background: var(--color-surface); box-shadow: var(--shadow-sm);
  }

  .source { font-family: var(--font-heading); font-size: clamp(26px, 5cqw, 40px); line-height: 1.15; text-align: center; text-wrap: balance; }

  .hint { min-height: 40px; display: flex; justify-content: center; align-items: center; margin: var(--space-2) 0 var(--space-4); }
  .hint-btn { font-size: 13px; }
  .lemmas { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; }
  .lemma {
    font-family: var(--font-heading); font-size: 15px; padding: 2px 10px;
    border: 1px solid var(--color-divider); border-radius: 999px; background: var(--color-bg); color: var(--color-neutral-700);
  }

  .answer {
    display: block; width: 100%; box-sizing: border-box; margin: 0; padding: 4px 6px 6px;
    border: 0; border-bottom: 2px solid var(--color-accent); border-radius: 0; background: transparent;
    font-family: var(--font-heading); font-size: clamp(22px, 4cqw, 30px); color: var(--color-text);
    line-height: 1.25; text-align: center; caret-color: var(--color-accent); outline: none;
    resize: none; overflow: hidden; -webkit-appearance: none; appearance: none;
  }

  .reveal { min-height: clamp(140px, 20cqw, 170px); margin-top: var(--space-6); text-align: center; }
  .ok { color: #4a9d5b; margin-left: 6px; }
  .gloss { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 16px; margin: 10px 0 14px; }
  .tok { display: inline-flex; flex-direction: column; align-items: center; }
  .form { font-family: var(--font-heading); font-size: clamp(24px, 4.4cqw, 34px); line-height: 1.1; }
  .form.missed { text-decoration: underline dotted var(--color-accent-500); text-decoration-thickness: 2px; text-underline-offset: 6px; }
  .lem { font-family: var(--font-heading); font-size: 14px; line-height: 18px; min-height: 18px; color: var(--color-neutral-600); margin-top: 4px; }
  .tag { font-size: 10.5px; line-height: 14px; min-height: 14px; letter-spacing: .02em; color: var(--color-accent-700); }

  .actions { display: flex; justify-content: center; margin-top: var(--space-4); }
  .actions .btn { min-width: 190px; }
  .report { display: flex; justify-content: center; margin-top: var(--space-2); }
  .report .btn { font-size: 12px; color: var(--color-neutral-500); }

  .summary { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; padding-block: clamp(32px, 6cqw, 56px); }
  .sum-title { font-family: var(--font-heading); font-size: clamp(24px, 4cqw, 32px); font-weight: 600; margin-top: 6px; }
  .summary .btn { margin-top: var(--space-3); }
</style>
