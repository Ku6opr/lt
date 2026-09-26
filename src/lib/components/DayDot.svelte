<script>
  export let share = 0;
  export let size = 30;
</script>

<span class="dot" style:--p={share} style:--s="{size}px">
  ✓
  <span class="fill" aria-hidden="true">✓</span>
</span>

<style>
  .dot {
    position: relative; flex: none; width: var(--s); height: var(--s); border-radius: 50%; box-sizing: border-box;
    display: flex; align-items: center; justify-content: center; font-size: calc(var(--s) * 0.43);
    border: 1px solid var(--color-accent-500); background: var(--color-accent-100); color: var(--color-accent-700);
  }
  .fill {
    position: absolute; inset: 0; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: var(--color-accent-500); color: var(--color-bg);
    clip-path: inset(calc((1 - var(--p)) * 100%) 0 0 0);
  }
</style>
