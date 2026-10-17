<script>
  import { onMount, tick } from 'svelte';
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { adsSeen, markSeen, adSrc, cachedAds, keepAds } from '../stores/ads.js';
  import { dayKey } from '../stores/daily.js';
  import { adQueue } from '../engine/ads.js';
  import { ADS } from '../data/ads.js';

  export let onBack;

  const GLOSS = { uk: 2, ru: 3, en: 4 };
  const AHEAD = 10;
  const ADD_URL = 'https://github.com/Ku6opr/lt/issues/new?template=ad.yml&title=' + encodeURIComponent('Реклама ' + dayKey(new Date()));

  let cached = new Set();
  let ad = queue()[0];
  let revealed = false;
  let tip = -1;
  let shift = 0;
  let tipEl;

  $: L = UI[$lang];
  $: lt = ad.tokens.map((t) => t[0]).join(' ');
  $: caseOf = (t) => L.caseNames[t[5]] + (t[6] === 'pl' ? ' ' + L.numPlAb : '');

  function queue() {
    const q = adQueue(ADS, $adsSeen.seen);
    const offline = !navigator.onLine && q.filter((a) => cached.has(a.id));
    return offline && offline.length ? offline : q;
  }

  function prefetch() {
    const rest = adQueue(ADS, $adsSeen.seen).filter((a) => a.id !== ad.id);
    keepAds([ad, ...rest.slice(0, AHEAD)].map((a) => a.id));
  }

  onMount(async () => {
    cached = await cachedAds();
    if (!navigator.onLine && cached.size && !cached.has(ad.id)) ad = queue()[0];
    prefetch();
  });

  function reset() {
    revealed = false;
    tip = -1;
  }

  async function toggle(k) {
    tip = tip === k ? -1 : k;
    shift = 0;
    await tick();
    if (!tipEl) return;
    const r = tipEl.getBoundingClientRect();
    const edge = document.documentElement.clientWidth - 8;
    if (r.left < 8) shift = 8 - r.left;
    else if (r.right > edge) shift = edge - r.right;
  }

  function primary() {
    if (!revealed) {
      revealed = true;
      markSeen(ad.id);
      return;
    }
    ad = queue().find((a) => a.id !== ad.id) || ad;
    reset();
    window.scrollTo(0, 0);
    prefetch();
  }

  function reportError() {
    const title = 'Помилка: ' + (lt.length > 80 ? lt.slice(0, 80).trimEnd() + '…' : lt);
    const body =
      '**Реклама:** ' + ad.id + ' (' + $lang + ')\n' +
      '**Текст:** ' + lt + '\n' +
      '**Переклад:** ' + ad[$lang] + '\n\n' +
      'Опишіть, що не так:\n\n\n' +
      '<details><summary>Технічні дані</summary>\n\n```json\n' + JSON.stringify({ ad: ad.id, lang: $lang }, null, 2) + '\n```\n</details>\n';
    window.open('https://github.com/Ku6opr/lt/issues/new?title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(body), '_blank', 'noopener');
  }
</script>

<svelte:window on:click={() => (tip = -1)} on:keydown={(e) => e.key === 'Escape' && (tip = -1)} />

<div class="lt-wrap ad-wrap">
  <div class="head">
    <button class="btn btn-secondary btn-icon" type="button" on:click={onBack} aria-label={L.back}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
    </button>
    <div class="head-text">
      <div class="card-kicker">{L.adKicker}</div>
      <h2>{L.adTitle}</h2>
    </div>
  </div>
  <hr class="hr" />

  <div class="body">
    <div>
      <div class="plate photo">
        <img src={adSrc(ad.id)} alt={lt} />
      </div>
      <div class="tokens" lang="lt">
        {#each ad.tokens as t, k}
          {#if t.length > 1}
            <span class="tok">
              <button class="word" class:open={tip === k} type="button" aria-expanded={tip === k} on:click|stopPropagation={() => toggle(k)}>{t[0]}</button>
              {#if tip === k}
                <span class="tip" bind:this={tipEl} style:--shift="{shift}px" role="tooltip">
                  <span class="tip-lt">{t[1]}</span>
                  <span class="tip-gloss" lang={$lang}>{t[GLOSS[$lang]]}</span>
                  {#if t[5]}<span class="tip-case">{caseOf(t)}</span>{/if}
                </span>
              {/if}
            </span>
          {:else}
            <span class="plain">{t[0]}</span>
          {/if}
        {/each}
      </div>
    </div>

    <div class="side">
      <div class="actions">
        <button class="btn btn-primary" type="button" on:click={primary}>{revealed ? L.next : L.adReveal}</button>
      </div>

      {#if revealed}
        <div>
          <div class="card-kicker">{L.adAnswer}</div>
          <div class="translation">{ad[$lang]}</div>
        </div>
      {/if}
      <div class="report">
        <button class="btn btn-ghost" type="button" on:click={reportError} title={L.reportTitle}>⚑ {L.report}</button>
        <a class="btn btn-ghost" href={ADD_URL} target="_blank" rel="noopener noreferrer" title={L.adAddTitle}>＋ {L.adAdd}</a>
      </div>
    </div>
  </div>
</div>

<style>
  .ad-wrap { max-width: 1180px; }
  .head { display: flex; align-items: center; gap: var(--space-3); padding-block: var(--space-2) 0; }
  .head-text { flex: 1; min-width: 0; }
  .head h2 { margin: 2px 0 0; font-size: clamp(24px, 3.6cqw, 34px); font-weight: 400; }
  .hr { margin: clamp(16px, 2cqw, 20px) 0 clamp(20px, 3cqw, 32px); }

  .body { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: clamp(24px, 5cqw, 56px); align-items: start; }

  .photo { aspect-ratio: 4 / 3; overflow: hidden; }
  .photo img { display: block; width: 100%; height: 100%; object-fit: cover; }

  .tokens {
    display: flex; flex-wrap: wrap; column-gap: .28em; margin-top: 14px;
    font-family: var(--font-heading); font-style: italic; font-size: clamp(22px, 3cqw, 30px); line-height: 1.5;
  }
  .tok { position: relative; }
  .word {
    -webkit-appearance: none; appearance: none; background: transparent; border: 0; padding: 0; margin: 0;
    font: inherit; color: inherit; cursor: pointer; line-height: inherit;
    text-decoration: underline dotted var(--color-neutral-400); text-decoration-thickness: 1px; text-underline-offset: 5px;
  }
  .word.open { color: var(--color-accent-700); text-decoration-color: var(--color-accent); }
  .word:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
  .plain { color: var(--color-neutral-500); }
  .tip {
    position: absolute; left: 50%; bottom: calc(100% + 6px); transform: translateX(calc(-50% + var(--shift, 0px)));
    z-index: 5; white-space: nowrap; display: flex; flex-direction: column; align-items: center; line-height: 1.2;
    background: var(--color-bg); border: 1px solid var(--color-accent); border-radius: var(--radius-md);
    box-shadow: var(--shadow-md); padding: 6px 12px; font-style: normal;
  }
  .tip-lt { font-family: var(--font-heading); font-size: clamp(16px, 2cqw, 18px); color: var(--color-text); }
  .tip-gloss { font-family: var(--font-body); font-size: clamp(12px, 1.5cqw, 13px); color: var(--color-neutral-600); }
  .tip-case { font-family: var(--font-body); font-size: 10.5px; line-height: 14px; letter-spacing: .02em; margin-top: 2px; color: var(--color-accent-700); }

  .side { display: flex; flex-direction: column; gap: clamp(16px, 3cqw, 28px); }
  .translation { font-family: var(--font-heading); font-size: clamp(21px, 3cqw, 26px); line-height: 1.2; margin: 6px 0 8px; }
  .actions .btn { min-width: 200px; }
  .report { display: flex; flex-wrap: wrap; gap: 4px 20px; }
  .report .btn { font-size: 12px; color: var(--color-neutral-500); padding-inline: 0; }

  @container (max-width: 719px) {
    .body { grid-template-columns: minmax(0, 1fr); }
    .actions .btn { width: 100%; min-height: 44px; }
    .report { justify-content: center; }
  }
</style>
