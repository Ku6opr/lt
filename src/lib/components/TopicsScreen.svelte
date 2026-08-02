<script>
  import { topics } from '../../topics/index.js';
  export let onEnter;

  const TINT = {
    gold: { bg: 'linear-gradient(140deg,#f8e8cd,#fdf4e4)', fg: '#a86f18', ring: '#ecd6ab' },
    violet: { bg: 'linear-gradient(140deg,#e8e0f1,#f5f1fb)', fg: '#67568e', ring: '#d8cbec' }
  };
  const tint = (t) => TINT[t] || TINT.gold;
</script>

<div class="lt-wrap lt-home">
  <header class="hero">
    <div class="card-kicker">Тренажер литовської</div>
    <h1>Оберіть тему</h1>
    <p class="lead">Вивчай литовську граматику у власному темпі. Обери тему — і тренуйся без оцінок, таймерів і покарань.</p>
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
          <span class="kicker">{topic.kicker}</span>
          <span class="title">{topic.title}</span>
          <span class="sub">{topic.subtitle}</span>
        </span>
        <svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    {/each}

    <div class="soon">Наступні теми — згодом</div>
  </div>
</div>

<style>
  .lt-home { padding-block: clamp(20px, 6cqw, 56px); }

  .hero { margin-bottom: clamp(24px, 5cqw, 44px); }
  .hero h1 { font-size: clamp(32px, 6.4cqw, 50px); line-height: 1.04; margin: 4px 0 12px; }
  .lead { color: var(--color-neutral-600); font-size: clamp(15px, 2.4cqw, 18px); line-height: 1.55; max-width: 52ch; margin: 0; }

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

  .chev { flex: none; color: var(--color-neutral-400); transition: transform .16s, color .16s; }
  .topic:hover .chev { color: var(--fg); transform: translateX(3px); }

  .soon {
    border: 1px dashed var(--color-divider); border-radius: var(--radius-lg);
    padding: clamp(16px, 2.6cqw, 22px); text-align: center;
    color: var(--color-neutral-500); font-size: 13px;
  }
</style>
