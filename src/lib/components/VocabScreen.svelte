<script>
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { dayKey } from '../stores/daily.js';
  import { vocab, stepOf, isDue, dueCount, removeWord, restoreWord, LEARNED } from '../stores/vocab.js';
  import { lexemeOf } from '../engine/review.js';
  import { glossOf } from '../engine/daily.js';
  import { simplifyAccent } from '../engine/stem.js';

  export let onBack;
  export let onReview;

  const today = dayKey(new Date());
  let removed = {};

  $: L = UI[$lang];
  $: pl = (forms, n) => forms[new Intl.PluralRules($lang).select(n)] || forms.other;
  $: fill = (s, n, forms = L.wordsPl) => s.replace('{n}', n).replace('{words}', pl(forms, n));
  $: due = dueCount($vocab.words, today);
  $: total = Object.keys($vocab.words).length;
  $: rows = Object.entries({ ...removed, ...$vocab.words })
    .map(([ref, e]) => ({ ref, e, ...stepOf(e), lex: lexemeOf(ref), gloss: glossOf(ref), gone: !$vocab.words[ref] }))
    .sort((a, b) => (a.box >= LEARNED) - (b.box >= LEARNED) || (a.due || '').localeCompare(b.due || '') || a.lex.lemma.localeCompare(b.lex.lemma, 'lt'));
  $: next = rows.filter((r) => !r.gone && r.box < LEARNED).map((r) => r.due).sort()[0] || null;

  const shown = (lex) => simplifyAccent(lex.lemmaA || lex.lemma);

  function daysTo(key) {
    const [y, m, d] = key.split('-').map(Number);
    const [ty, tm, td] = today.split('-').map(Number);
    return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(ty, tm - 1, td)) / 86400000);
  }

  function when(r) {
    if (r.box >= LEARNED) return L.vocabLearned;
    const n = daysTo(r.due);
    if (n <= 0) return L.dueToday;
    if (n === 1) return L.dueTomorrow;
    return fill(L.dueIn, n, L.daysPl);
  }

  function remove(r) {
    removed = { ...removed, [r.ref]: r.e };
    removeWord(r.ref);
  }

  function restore(r) {
    restoreWord(r.ref, r.e);
    const { [r.ref]: _, ...rest } = removed;
    removed = rest;
  }
</script>

<div class="lt-wrap">
  <div class="head">
    <button class="btn btn-secondary btn-icon" type="button" on:click={onBack} aria-label={L.back}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
    </button>
    <div class="head-text">
      <div class="card-kicker">{L.vocabKicker}</div>
      <h2>{L.vocabTitle}</h2>
    </div>
    {#if total}<div class="count">{total}</div>{/if}
  </div>

  {#if total}
    <div class="cta">
      {#if due}
        <button class="btn btn-primary" type="button" on:click={onReview}>{fill(L.reviewStart, due)}</button>
      {:else}
        <div class="text-muted">{L.reviewNone}{#if next}{' · ' + L.reviewNext + ' ' + when({ box: 0, due: next })}{/if}</div>
      {/if}
    </div>
  {:else if !rows.length}
    <div class="empty text-muted">{L.vocabEmpty}</div>
  {/if}

  <div class="list">
    {#each rows as r (r.ref)}
      <div class="row" class:gone={r.gone}>
        <div class="txt">
          <span class="lt">{shown(r.lex)}</span>
          {#if r.gloss}<span class="tr">{r.gloss[$lang]}</span>{/if}
        </div>
        {#if r.gone}
          <button class="btn btn-ghost" type="button" on:click={() => restore(r)}>{L.vocabRestore}</button>
        {:else}
          <div class="state" class:due={isDue(r.e, today)}>
            <span class="dots" aria-hidden="true">{#each Array(LEARNED) as _, k}<span class="dot" class:on={k < r.box}></span>{/each}</span>
            <span class="when">{when(r)}</span>
          </div>
          <button class="x" type="button" on:click={() => remove(r)} title={L.vocabRemove} aria-label={L.vocabRemove + ': ' + r.lex.lemma}>×</button>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .head { display: flex; align-items: center; gap: var(--space-3); padding-block: var(--space-2) var(--space-3); }
  .head-text { flex: 1; min-width: 0; }
  .head h2 { margin: 0; font-size: clamp(22px, 3.6cqw, 32px); }
  .count { font-family: var(--font-heading); font-size: 18px; font-weight: 600; color: var(--color-neutral-600); white-space: nowrap; }

  .cta { display: flex; justify-content: center; padding: var(--space-3) 0 var(--space-4); border-bottom: 1px solid var(--color-divider); }
  .cta .btn { min-width: 220px; }
  .cta .text-muted { font-size: 14px; }
  .empty { padding: var(--space-8) 0; text-align: center; }

  .row { display: flex; align-items: center; gap: 14px; min-height: 56px; padding: 6px 2px; border-bottom: 1px solid var(--color-divider); }
  .row.gone .txt { opacity: .45; text-decoration: line-through; }
  .txt { flex: 1; min-width: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 12px; }
  .lt { font-family: var(--font-heading); font-size: 21px; line-height: 1.15; }
  .tr { font-size: 13px; color: var(--color-neutral-700); }

  .state { flex: 0 0 auto; display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .dots { display: flex; gap: 3px; }
  .dot { width: 7px; height: 7px; border-radius: 50%; border: 1px solid var(--color-accent-400); box-sizing: border-box; }
  .dot.on { background: var(--color-accent-500); border-color: var(--color-accent-500); }
  .when { font-size: 11.5px; color: var(--color-neutral-600); white-space: nowrap; }
  .state.due .when { color: var(--color-accent-700); }

  .x {
    flex: 0 0 auto; width: 32px; height: 32px; padding: 0; margin: 0;
    border: 0; border-radius: 50%; background: transparent; color: var(--color-neutral-500);
    font-size: 20px; line-height: 1; cursor: pointer; -webkit-appearance: none; appearance: none;
  }
  .x:hover { background: var(--color-neutral-100); color: var(--color-text); }
  .row .btn-ghost { font-size: 13px; }

  @container (max-width: 719px) {
    .cta .btn { flex: 1; min-height: 44px; }
    .lt { font-size: 19px; }
    .txt { flex-direction: column; gap: 2px; }
  }
</style>
