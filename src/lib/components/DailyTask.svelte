<script>
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { daily, dayKey, streakOf, lastWeek } from '../stores/daily.js';
  import DayDot from './DayDot.svelte';

  export let onStart;

  $: L = UI[$lang];
  $: streak = streakOf($daily.days);
  $: week = lastWeek($daily.days);
  $: resuming = !!$daily.session && $daily.session.date === dayKey(new Date());
  $: startLabel = resuming ? L.dailyResume : L.dailyStart;
  $: streakLabel = streak > 0 ? streak + ' ' + L.streakDays[new Intl.PluralRules($lang).select(streak)] : L.dailyTask;
</script>

<section class="daily">
  <div class="streak-title">{streakLabel}</div>
  <div class="week">
    {#each week as w (w.key)}
      {#if w.today && !w.done}
        <button class="day play" type="button" title={startLabel} aria-label={startLabel} on:click={onStart}>
          <span class="dot today">
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><path d="M1.5 1.2 9 6l-7.5 4.8z" fill="currentColor" /></svg>
          </span>
          <span class="lbl today">{L.weekdays[w.weekday]}</span>
        </button>
      {:else}
        <div class="day">
          {#if w.done}
            <DayDot share={w.share} />
          {:else}
            <span class="dot"></span>
          {/if}
          <span class="lbl" class:today={w.today}>{L.weekdays[w.weekday]}</span>
        </div>
      {/if}
    {/each}
  </div>
</section>

<style>
  .streak-title { font-family: var(--font-heading); font-size: 20px; font-weight: 600; margin-bottom: 10px; }
  .week { display: flex; gap: 10px; }
  .day { display: flex; flex-direction: column; align-items: center; gap: 5px; }
  .dot {
    width: 30px; height: 30px; border-radius: 50%; box-sizing: border-box;
    display: flex; align-items: center; justify-content: center; font-size: 13px;
    border: 1px solid var(--color-neutral-300);
  }
  .dot.today { border: 2px dashed var(--color-accent-500); color: var(--color-accent-600); }
  .dot.today svg { margin-left: 2px; }
  .lbl { font-size: 10.5px; color: var(--color-neutral-600); }
  .lbl.today { color: var(--color-accent-700); font-weight: 600; }

  .play {
    -webkit-appearance: none; appearance: none; border: 0; background: transparent; padding: 0; margin: 0;
    font: inherit; cursor: pointer;
  }
  .play .dot { transition: background .15s, border-color .15s, color .15s, transform .15s; }
  .play:hover .dot { border-style: solid; background: var(--color-accent-500); color: var(--color-bg); transform: scale(1.08); }
  .play:active .dot { transform: scale(0.96); }
  .play:focus-visible { outline: none; }
  .play:focus-visible .dot { outline: 2px solid var(--color-accent); outline-offset: 2px; }

  @container (max-width: 599px) {
    .daily { flex: 1 1 100%; }
    .week { justify-content: space-between; gap: 4px; }
  }
</style>
