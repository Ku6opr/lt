<script>
  import { onMount, tick } from 'svelte';
  import { get } from 'svelte/store';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { dailyStore, pictureStore, dayKey } from '../stores/daily.js';
  import { vocab, reviewWord } from '../stores/vocab.js';
  import { dueRefs, makeCard, checkCard, recalled, moveOf, seenBefore } from '../engine/review.js';
  import { REVIEW_SESSION } from '../data/review.js';
  import { simplifyAccent } from '../engine/stem.js';
  import HintButton from './HintButton.svelte';

  export let onBack;

  const today = dayKey(new Date());
  const seen = seenBefore(today);
  const hintLog = [...(get(dailyStore.state).hinted || []), ...(get(pictureStore.state).hinted || [])];

  let queue = [];
  let i = 0;
  let done = 0;
  let card = null;
  let input = '';
  let revealed = false;
  let usedHint = false;
  let check = null;
  let inputEl;

  $: L = UI[$lang];
  $: pl = (forms, n) => forms[new Intl.PluralRules($lang).select(n)] || forms.other;
  $: fill = (s, n) => s.replace('{n}', n).replace('{words}', pl(L.wordsPl, n));
  $: more = card ? 0 : dueRefs($vocab.words, today).length;
  $: exactish = !!check && (check.result === 'exact' || check.result === 'near');
  $: hintable = card && !revealed && !usedHint && (card.ask === 'context' || card.phrase);

  const shown = (t) => simplifyAccent(t.textA || t.text);
  const lemmaShown = (c) => simplifyAccent(c.lemmaA || c.lemma);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const clusters = (s) => s.normalize('NFD').match(/[^̀-ͯ][̀-ͯ]*/g).map((c) => c.normalize('NFC'));
  const word = (p, j) => (j === 0 ? cap(shown(p.tokens[j])) : shown(p.tokens[j]));
  const tail = (p, j) => p.tokens[j].after + (j === p.tokens.length - 1 ? p.end : '');

  function start() {
    queue = dueRefs(get(vocab).words, today).slice(0, REVIEW_SESSION);
    i = 0;
    done = 0;
    load();
  }

  function load() {
    const ref = queue[i];
    const entry = ref && get(vocab).words[ref];
    card = entry ? makeCard(ref, entry, { today, seen, hinted: hintLog, lang: get(lang) }) : null;
    input = '';
    revealed = false;
    usedHint = false;
    check = null;
    if (card) focusInput();
  }

  function focusInput() {
    tick().then(() => inputEl && inputEl.focus());
  }

  onMount(start);

  function hint() {
    usedHint = true;
    focusInput();
  }

  function primary() {
    if (!card) return;
    if (!revealed) {
      check = checkCard(card, input);
      reviewWord(card.ref, moveOf(check.result, usedHint), today);
      done += 1;
      revealed = true;
      return;
    }
    i += 1;
    load();
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      primary();
    }
  }
</script>

<div class="lt-wrap">
  <div class="head">
    <button class="btn btn-secondary btn-icon" type="button" on:click={onBack} aria-label={L.toVocab}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
    </button>
    <div class="head-text">
      <div class="card-kicker">{L.reviewKicker}</div>
      <h2>{L.reviewTitle}</h2>
    </div>
    {#if card}<div class="count">{i + 1} / {queue.length}</div>{/if}
  </div>

  {#if card}
    <div class="steps" aria-hidden="true">
      {#each queue as _, k}<span class="step" class:done={k < i || (k === i && revealed)} class:cur={k === i && !revealed}></span>{/each}
    </div>

    <div class="card">
      {#if hintable}<HintButton label={L.reviewHint} onClick={hint} />{/if}

      {#if card.ask === 'context'}
        <div class="source">{card.phrase[$lang]}</div>
      {:else}
        <div class="source">{card.gloss[$lang]}</div>
        <div class="pos">{L.pos[card.gloss.pos]}</div>
      {/if}

      {#if card.ask === 'context' || (usedHint && !revealed)}
        <div class="sentence" class:faded={card.ask === 'bare'}>
          {#each card.phrase.tokens as _, j}{#if j}{' '}{/if}{#if j === card.k}<span class="gap" class:filled={revealed} class:missed={revealed && !exactish}>{#if revealed}{#if check.result === 'near'}{#each clusters(word(card.phrase, j)) as c, ci}<span class:typo={ci >= check.typo && ci < check.typo + 2}>{c}</span>{/each}{:else}{word(card.phrase, j)}{/if}{/if}</span>{:else}{word(card.phrase, j)}{/if}{tail(card.phrase, j)}{/each}
        </div>
      {/if}

      {#if usedHint && card.ask === 'context'}
        <div class="hint"><span class="lemma">{lemmaShown(card)}</span></div>
      {/if}

      <input
        class="answer"
        bind:this={inputEl}
        bind:value={input}
        on:keydown={onKey}
        readonly={revealed}
        autocomplete="off"
        autocapitalize="off"
        autocorrect="off"
        spellcheck="false"
        enterkeyhint="go"
      />

      <div class="reveal">
        {#if revealed}
          <div class="card-kicker">{L.reviewAnswer}{#if recalled(check.result)}<span class="ok" title={L.matchedYours}>✓</span>{/if}</div>
          {#if card.ask === 'context'}
            <div class="lexeme"><span class="lt">{lemmaShown(card)}</span> <span class="tr">— {card.gloss[$lang]}</span></div>
          {:else}
            <div class="big" class:missed={!exactish}>{#if check.result === 'near'}{#each clusters(lemmaShown(card)) as c, ci}<span class:typo={ci >= check.typo && ci < check.typo + 2}>{c}</span>{/each}{:else}{lemmaShown(card)}{/if}</div>
            {#if check.result === 'syn'}<div class="note text-muted">{L.reviewSyn}</div>{/if}
            {#if card.phrase}
              <div class="example">
                {#each card.phrase.tokens as _, j}{#if j}{' '}{/if}{#if j === card.k}<b>{word(card.phrase, j)}</b>{:else}{word(card.phrase, j)}{/if}{tail(card.phrase, j)}{/each}
                <div class="text-muted">{card.phrase[$lang]}</div>
              </div>
            {/if}
          {/if}
        {/if}
      </div>

      <div class="actions">
        <button class="btn btn-primary" type="button" on:click={primary}>{revealed ? L.next : L.reveal}</button>
      </div>
    </div>
  {:else}
    <div class="card summary">
      <div class="sum-title">{done ? fill(L.reviewDone, done) : L.reviewNone}</div>
      {#if more}<button class="btn btn-primary" type="button" on:click={start}>{fill(L.reviewMore, more)}</button>{/if}
      <button class="btn" class:btn-primary={!more} class:btn-ghost={more} type="button" on:click={onBack}>{L.toVocab}</button>
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
  .step.done { background: var(--color-accent-500); }

  .card {
    position: relative;
    border: 1px solid var(--color-divider); border-radius: var(--radius-lg);
    padding: clamp(20px, 4.5cqw, 44px); background: var(--color-surface); box-shadow: var(--shadow-sm);
  }

  .source { font-family: var(--font-heading); font-size: clamp(24px, 4.4cqw, 36px); line-height: 1.15; text-align: center; text-wrap: balance; padding-inline: 40px; }
  .pos { text-align: center; font-size: 11px; letter-spacing: .04em; text-transform: uppercase; color: var(--color-neutral-600); margin-top: 6px; }

  .sentence { font-family: var(--font-heading); font-size: clamp(20px, 3.4cqw, 26px); line-height: 1.5; text-align: center; text-wrap: balance; margin-top: var(--space-4); color: var(--color-neutral-800); }
  .sentence.faded { font-size: clamp(17px, 2.8cqw, 21px); color: var(--color-neutral-600); }
  .gap { display: inline-block; min-width: 3.4em; border-bottom: 2px solid var(--color-accent-400); line-height: 1.15; vertical-align: baseline; }
  .gap.filled { min-width: 0; color: var(--color-accent-700); border-bottom-color: transparent; }

  .hint { display: flex; justify-content: center; margin-top: var(--space-3); }
  .lemma {
    font-family: var(--font-heading); font-size: 15px; padding: 2px 10px;
    border: 1px solid var(--color-divider); border-radius: 999px; background: var(--color-bg); color: var(--color-neutral-700);
  }

  .answer {
    display: block; width: 100%; box-sizing: border-box; margin: var(--space-4) 0 0; padding: 4px 6px 6px;
    border: 0; border-bottom: 2px solid var(--color-accent); border-radius: 0; background: transparent;
    font-family: var(--font-heading); font-size: clamp(22px, 4cqw, 30px); color: var(--color-text);
    line-height: 1.25; text-align: center; caret-color: var(--color-accent); outline: none;
    -webkit-appearance: none; appearance: none;
  }

  .reveal { min-height: clamp(110px, 16cqw, 140px); margin-top: var(--space-6); text-align: center; }
  .ok { color: #4a9d5b; margin-left: 6px; }
  .lexeme { margin-top: 10px; }
  .lexeme .lt { font-family: var(--font-heading); font-size: clamp(22px, 4cqw, 30px); }
  .lexeme .tr { color: var(--color-neutral-700); }
  .big { font-family: var(--font-heading); font-size: clamp(26px, 4.6cqw, 36px); line-height: 1.15; margin-top: 8px; }
  .gap.missed, .big.missed { text-decoration: underline dotted var(--color-accent-500); text-decoration-thickness: 2px; text-underline-offset: 6px; }
  .typo { text-decoration: underline dotted var(--color-accent-500); text-decoration-thickness: 2px; text-underline-offset: 6px; }
  .note { font-size: 13px; margin-top: 6px; }
  .example { font-family: var(--font-heading); font-size: 18px; line-height: 1.4; margin-top: var(--space-3); text-wrap: balance; }
  .example b { font-weight: 600; color: var(--color-accent-700); }
  .example .text-muted { font-family: var(--font-body); font-size: 13px; margin-top: 2px; }

  .actions { display: flex; justify-content: center; margin-top: var(--space-4); }
  .actions .btn { min-width: 190px; }

  .summary { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; padding-block: clamp(32px, 6cqw, 56px); }
  .sum-title { font-family: var(--font-heading); font-size: clamp(24px, 4cqw, 32px); font-weight: 600; margin-bottom: var(--space-2); }

  @container (max-width: 719px) {
    .card { padding: 16px 16px 18px; }
    .sentence { margin-top: var(--space-3); }
    .answer { margin-top: var(--space-3); }
    .reveal { min-height: 0; margin-top: var(--space-3); }
    .actions { margin-top: var(--space-3); }
    .summary .btn { min-height: 44px; align-self: stretch; }
  }
</style>
