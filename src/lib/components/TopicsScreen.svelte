<script>
  import { topics } from '../../topics/index.js';
  import { lang, LANGS } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { progress } from '../stores/progress.js';
  import { masteryOf } from '../stores/mastery.js';
  export let onEnter;

  $: L = UI[$lang];
  $: pctOf = (id) => Math.round(masteryOf($progress, id).pct * 100);
  const ISSUE_TITLE = { uk: 'Запит уроку: ', ru: 'Запрос урока: ', en: 'Lesson request: ' };
  $: issueUrl = 'https://github.com/Ku6opr/lt/issues/new?title=' + encodeURIComponent(ISSUE_TITLE[$lang] || ISSUE_TITLE.uk);

  const CATS = [
    { id: 'verb', c: 'var(--color-accent-500)', tint: 'var(--color-accent-100)', line: 'solid', w: '3px' },
    { id: 'noun', c: 'var(--color-accent-800)', tint: 'var(--color-accent-200)', line: 'solid', w: '2px' },
    { id: 'adj', c: 'var(--color-neutral-700)', tint: 'var(--color-neutral-100)', line: 'solid', w: '1px' },
    { id: 'pron', c: 'var(--color-accent-600)', tint: 'var(--color-accent-100)', line: 'dashed', w: '3px' },
    { id: 'num', c: 'var(--color-neutral-500)', tint: 'var(--color-neutral-200)', line: 'dashed', w: '2px' },
    { id: 'adv', c: 'var(--color-neutral-800)', tint: 'var(--color-neutral-100)', line: 'dotted', w: '3px' }
  ];
  const DEPTH = Math.max(...topics.map((t) => t.depth)) + 1;
  const rows = [];
  for (let d = 0; d < DEPTH; d++) rows.push(CATS.map((cat) => ({ cat, topic: topics.find((t) => t.cat === cat.id && t.depth === d) || null })));

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

  <div class="map lt-scroll">
    <div class="mapgrid">
      {#each CATS as cat}
        <div class="cathead" style="color:{cat.c};border-bottom:{cat.w} {cat.line} {cat.c}">{L.catNames[cat.id]}</div>
      {/each}
      {#each rows as row}
        {#each row as cell}
          {#if cell.topic}
            <button
              class="cell"
              type="button"
              on:click={() => onEnter(cell.topic.id)}
              title={cell.topic.title[$lang] + (pctOf(cell.topic.id) > 0 ? ' · ' + pctOf(cell.topic.id) + '%' : '')}
              style="border-left:3px {cell.cat.line} {cell.cat.c};background:{cell.cat.tint}"
            >
              <span class="sym">{cell.topic.glyph}</span>
              <span class="short">{cell.topic.short[$lang]}</span>
              {#if pctOf(cell.topic.id) > 0}
                <span class="bar"><span class="bar-fill" style="width:{pctOf(cell.topic.id)}%;background:{pctOf(cell.topic.id) >= 100 ? 'var(--color-accent-700)' : cell.cat.c}"></span></span>
              {/if}
            </button>
          {:else}
            <div class="gapcell"></div>
          {/if}
        {/each}
      {/each}
    </div>
  </div>

  <a class="soon" href={issueUrl} target="_blank" rel="noopener noreferrer">
    <span>{L.soon}</span>
    <span class="soon-ask">{L.soonAsk}</span>
  </a>
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

  .map { overflow-x: auto; }
  .mapgrid {
    display: grid;
    grid-template-columns: repeat(6, minmax(104px, 1fr));
    gap: clamp(8px, 1.4cqw, 10px);
    min-width: max-content;
    width: 100%;
  }

  .cathead {
    font-family: var(--font-heading); font-weight: 600;
    font-size: clamp(11px, 1.7cqw, 13.5px);
    text-align: center; padding: 0 4px 7px;
  }

  .cell {
    display: flex; flex-direction: column; justify-content: flex-end; align-items: stretch;
    text-align: left; width: 100%; min-height: clamp(70px, 12cqw, 96px);
    padding: clamp(7px, 1.4cqw, 11px) clamp(8px, 1.6cqw, 12px);
    border: 1px solid var(--color-divider); border-radius: var(--radius-md);
    cursor: pointer;
    transition: border-color .14s, transform .14s, box-shadow .14s;
  }
  .cell:hover { border-color: var(--color-accent); transform: translateY(-2px); box-shadow: var(--shadow-sm); }
  .cell:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

  .sym { font-family: var(--font-heading); font-size: clamp(15px, 2.4cqw, 21px); line-height: 1.1; color: var(--color-text); }
  .short { font-size: clamp(9.5px, 1.5cqw, 11.5px); line-height: 1.3; color: var(--color-neutral-700); margin-top: 3px; }

  .bar { display: block; height: 3px; border-radius: 2px; background: var(--color-neutral-300); overflow: hidden; margin-top: clamp(6px, 1cqw, 8px); }
  .bar-fill { display: block; height: 100%; }

  .gapcell { border: 1px dashed var(--color-divider); border-radius: var(--radius-md); min-height: clamp(70px, 12cqw, 96px); }

  .soon {
    display: flex; flex-direction: column; gap: 4px; align-items: center;
    border: 1px dashed var(--color-divider); border-radius: var(--radius-lg);
    padding: clamp(16px, 2.6cqw, 22px); text-align: center;
    color: var(--color-neutral-500); font-size: 13px;
    text-decoration: none; cursor: pointer; margin-top: clamp(12px, 2cqw, 16px);
    transition: border-color .16s, box-shadow .16s, transform .16s;
  }
  .soon:hover { border-color: var(--color-accent); box-shadow: 0 6px 20px rgba(60,45,20,.09); transform: translateY(-1px); }
  .soon:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
  .soon-ask { font-family: var(--font-heading); font-weight: 600; font-size: 13px; color: var(--color-accent); }
  .soon:hover .soon-ask { text-decoration: underline; }
</style>
