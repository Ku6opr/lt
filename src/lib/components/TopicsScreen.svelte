<script>
  import { topics } from '../../topics/index.js';
  import { lang, LANGS } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { progress } from '../stores/progress.js';
  import { masteryOf } from '../stores/mastery.js';
  export let onEnter;

  $: L = UI[$lang];
  $: pctOf = (id) => masteryOf($progress, id).pct;
  const R = 10.5;
  const CIRC = 2 * Math.PI * R;

  const TINT = {
    gold: { bg: 'linear-gradient(140deg,#f8e8cd,#fdf4e4)', fg: '#a86f18', ring: '#ecd6ab' },
    violet: { bg: 'linear-gradient(140deg,#e8e0f1,#f5f1fb)', fg: '#67568e', ring: '#d8cbec' }
  };
  const tint = (t) => TINT[t] || TINT.gold;

  function setLang(id) { lang.set(id); }
</script>

<div class="lt-wrap lt-home">
  <header class="hero">
    <div class="topbar">
      <div class="card-kicker">{L.appKicker}</div>
      <div class="langsel" role="group" aria-label={L.language}>
        {#each LANGS as lg}
          <button class="lang-opt" class:active={$lang === lg.id} type="button" on:click={() => setLang(lg.id)} title={lg.label}>{lg.short}</button>
        {/each}
      </div>
    </div>
    <h1>{L.chooseTopic}</h1>
    <p class="lead">{L.homeLead}</p>
  </header>

  <div class="grid">
    {#each topics as topic}
      <button
        class="topic"
        type="button"
        on:click={() => onEnter(topic.id)}
        style="--fg:{tint(topic.accent).fg};--ring:{tint(topic.accent).ring}"
      >
        <span class="tile" style="background:{tint(topic.accent).bg}">{topic.glyph}</span>
        <span class="body">
          <span class="kicker">{L.topicWord} {topic.n}</span>
          <span class="title">{topic.title[$lang]}</span>
          <span class="sub">{topic.subtitle[$lang]}</span>
        </span>
        {#if pctOf(topic.id) > 0}
          <span class="ring" title={Math.round(pctOf(topic.id) * 100) + '%'}>
            <svg width="30" height="30" viewBox="0 0 30 30">
              <circle cx="15" cy="15" r={R} fill="none" stroke="var(--color-divider)" stroke-width="3"/>
              <circle cx="15" cy="15" r={R} fill="none" stroke="var(--fg)" stroke-width="3" stroke-linecap="round"
                stroke-dasharray="{CIRC * pctOf(topic.id)} {CIRC}" transform="rotate(-90 15 15)"/>
            </svg>
            <span class="ring-pct">{Math.round(pctOf(topic.id) * 100)}</span>
          </span>
        {/if}
        <svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    {/each}

    <div class="soon">{L.soon}</div>
  </div>
</div>

<style>
  .lt-home { padding-block: clamp(20px, 6cqw, 56px); }

  .hero { margin-bottom: clamp(24px, 5cqw, 44px); }
  .topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 2px; }
  .hero h1 { font-size: clamp(32px, 6.4cqw, 50px); line-height: 1.04; margin: 4px 0 12px; }
  .lead { color: var(--color-neutral-600); font-size: clamp(15px, 2.4cqw, 18px); line-height: 1.55; max-width: 52ch; margin: 0; }

  .langsel { display: inline-flex; flex: none; border: 1px solid var(--color-divider); border-radius: 999px; overflow: hidden; background: var(--color-surface); }
  .lang-opt {
    -webkit-appearance: none; appearance: none; border: 0; cursor: pointer;
    padding: 6px 12px; font-family: var(--font-heading); font-size: 12px; font-weight: 600;
    letter-spacing: .05em; color: var(--color-neutral-500); background: transparent; transition: color .15s, background .15s;
  }
  .lang-opt + .lang-opt { border-left: 1px solid var(--color-divider); }
  .lang-opt:hover { color: var(--color-text); }
  .lang-opt.active { background: var(--color-accent); color: #fff; }

  .grid { display: grid; gap: clamp(12px, 2cqw, 16px); }

  .topic {
    display: flex; align-items: center; gap: clamp(14px, 2.6cqw, 22px);
    width: 100%; text-align: left; cursor: pointer;
    padding: clamp(16px, 2.6cqw, 22px);
    border: 1px solid var(--color-divider); border-radius: var(--radius-lg);
    background: var(--color-surface); box-shadow: var(--shadow-sm);
    transition: border-color .16s, box-shadow .16s, transform .16s;
  }
  .topic:hover { border-color: var(--ring); box-shadow: 0 6px 20px rgba(60,45,20,.09); transform: translateY(-1px); }
  .topic:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

  .tile {
    display: inline-flex; align-items: center; justify-content: center;
    flex: none; width: clamp(64px, 13cqw, 84px); aspect-ratio: 1;
    border-radius: 18px; border: 1px solid var(--ring);
    color: var(--fg); font-family: var(--font-heading);
    font-size: clamp(15px, 3cqw, 21px); line-height: 1;
    padding: 0 6px; overflow: hidden; white-space: nowrap;
  }

  .body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .kicker {
    font-family: var(--font-heading); font-size: 11px; font-weight: 600;
    letter-spacing: .12em; text-transform: uppercase; color: var(--fg);
  }
  .title { font-family: var(--font-heading); font-size: clamp(19px, 3.2cqw, 25px); line-height: 1.12; color: var(--color-text); }
  .sub { font-size: clamp(13px, 1.9cqw, 14px); line-height: 1.45; color: var(--color-neutral-600); }

  .ring { position: relative; flex: none; width: 30px; height: 30px; }
  .ring-pct {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-heading); font-size: 8.5px; font-weight: 600; color: var(--color-neutral-600);
  }

  .chev { flex: none; color: var(--color-neutral-400); transition: transform .16s, color .16s; }
  .topic:hover .chev { color: var(--fg); transform: translateX(3px); }

  .soon {
    border: 1px dashed var(--color-divider); border-radius: var(--radius-lg);
    padding: clamp(16px, 2.6cqw, 22px); text-align: center;
    color: var(--color-neutral-500); font-size: 13px;
  }
</style>
