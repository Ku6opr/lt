<script>
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { simplifyAccent } from '../engine/stem.js';
  import { saveVocab } from '../stores/vocab.js';

  export let words;
  export let date;
  export let onBack;

  let off = {};
  let saved = false;

  $: L = UI[$lang];
  $: pl = (forms, n) => forms[new Intl.PluralRules($lang).select(n)] || forms.other;
  $: picked = words.filter((w) => !off[w.ref]);
  $: all = picked.length === words.length;
  $: fill = (s, n, forms = L.wordsPl) => s.replace('{n}', n).replace('{words}', pl(forms, n));

  const shown = (w) => simplifyAccent(w.lemmaA || w.lemma);
  const toggle = (ref) => (off = { ...off, [ref]: !off[ref] });
  const toggleAll = () => (off = all ? Object.fromEntries(words.map((w) => [w.ref, true])) : {});

  function save() {
    saveVocab(words.map((w) => w.ref), picked.map((w) => w.ref), date);
    saved = true;
  }
</script>

<div class="lt-wrap">
  {#if !saved}
    <div class="head">
      <div class="head-text">
        <div class="card-kicker">{L.newWordsKicker}</div>
        <h2>{L.newWordsTitle}</h2>
        <div class="sub text-muted">{fill(L.newWordsSub, words.length, L.newWordsPl)}</div>
      </div>
      <div class="tools">
        <span class="count">{L.pickedCount.replace('{k}', picked.length).replace('{n}', words.length)}</span>
        <button class="btn btn-ghost" type="button" on:click={toggleAll}>{all ? L.pickNone : L.pickAll}</button>
      </div>
    </div>

    <div class="grid">
      {#each words as w (w.ref)}
        <button class="word" class:on={!off[w.ref]} type="button" aria-pressed={!off[w.ref]} on:click={() => toggle(w.ref)}>
          <span class="txt">
            <span class="lt">{shown(w)}</span>
            {#if w.gloss}
              <span class="tr">{w.gloss[$lang]}</span>
              <span class="pos">{L.pos[w.gloss.pos]}</span>
            {/if}
          </span>
          <span class="box" aria-hidden="true">{off[w.ref] ? '' : '✓'}</span>
        </button>
      {/each}
    </div>

    <div class="foot">
      <button class="btn btn-ghost" type="button" on:click={onBack}>{L.skip}</button>
      <button class="btn btn-primary" type="button" disabled={!picked.length} on:click={save}>{picked.length ? fill(L.saveWords, picked.length) : L.pickWords}</button>
    </div>
  {:else}
    <div class="saved">
      <div class="card-kicker">{L.savedKicker}</div>
      <div class="saved-title">{fill(L.savedWords, picked.length)}</div>
      <div class="saved-actions">
        <button class="btn btn-ghost" type="button" on:click={() => (saved = false)}>{L.changePick}</button>
        <button class="btn btn-primary" type="button" on:click={onBack}>{L.back}</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; padding-bottom: 18px; border-bottom: 1px solid var(--color-divider); }
  .head-text { min-width: 0; }
  .head .card-kicker { margin: 0; }
  .head h2 { font-family: var(--font-heading); font-size: 30px; font-weight: 600; margin: 4px 0 2px; }
  .sub { font-size: 13px; }
  .tools { flex: 0 0 auto; display: flex; align-items: center; gap: 16px; }
  .count { font-family: var(--font-heading); font-size: 18px; font-feature-settings: 'tnum'; white-space: nowrap; }
  .tools .btn { font-size: 13px; }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 10px; padding: 22px 0 26px; }
  .word {
    display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; margin: 0;
    border: 1px solid var(--color-divider); border-radius: var(--radius-md); background: transparent;
    font: inherit; color: var(--color-text); text-align: left; cursor: pointer;
    transition: border-color .14s, background .14s; -webkit-appearance: none; appearance: none;
  }
  .word.on { border-color: var(--color-accent-500); background: var(--color-accent-100); }
  .txt { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .lt { font-family: var(--font-heading); font-size: 21px; line-height: 1.1; }
  .tr { font-size: 12.5px; color: var(--color-neutral-700); margin-top: 3px; }
  .pos { font-size: 10.5px; color: var(--color-neutral-600); margin-top: 6px; letter-spacing: .04em; text-transform: uppercase; }
  .box {
    flex: 0 0 auto; width: 24px; height: 24px; box-sizing: border-box; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center; font-size: 13px; border: 1px solid var(--color-neutral-400);
  }
  .word.on .box { background: var(--color-accent-500); border-color: var(--color-accent-500); color: var(--color-bg); }

  .foot { display: flex; align-items: center; justify-content: flex-end; gap: 12px; padding-top: 18px; border-top: 1px solid var(--color-divider); }

  .saved { padding: 56px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .saved .card-kicker { margin: 0; }
  .saved-title { font-family: var(--font-heading); font-size: 32px; font-weight: 600; }
  .saved-actions { display: flex; gap: 12px; margin-top: 18px; }

  @container (max-width: 719px) {
    .head { flex-direction: column; align-items: stretch; gap: 0; padding-bottom: 12px; }
    .head h2 { font-size: 23px; line-height: 1.15; margin: 3px 0 10px; }
    .sub { display: none; }
    .tools { justify-content: space-between; }
    .count { font-size: 15px; }
    .tools .btn { font-size: 12.5px; padding-inline: 8px; }

    .grid { display: block; padding: 4px 0; }
    .word { width: 100%; align-items: center; min-height: 56px; padding: 6px 2px; border: 0; border-bottom: 1px solid var(--color-divider); border-radius: 0; }
    .word.on { background: transparent; border-color: var(--color-divider); }
    .txt { flex-direction: row; align-items: baseline; flex-wrap: wrap; gap: 10px; }
    .lt { font-size: 19px; line-height: 1.15; }
    .tr { margin-top: 0; }
    .pos { display: none; }

    .foot { position: sticky; bottom: 0; gap: 10px; padding: 12px 0 calc(12px + env(safe-area-inset-bottom)); background: var(--color-bg); }
    .foot .btn-ghost { font-size: 13px; }
    .foot .btn-primary { flex: 1; font-size: 14px; min-height: 44px; }

    .saved { padding: 96px 0 24px; }
    .saved-title { font-size: 26px; }
    .saved-actions { flex-direction: column-reverse; align-self: stretch; gap: 8px; }
    .saved-actions .btn { min-height: 44px; }
  }
</style>
