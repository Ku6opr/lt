<script>
  export let label;
  export let onClick;
</script>

<button class="hint-btn" type="button" on:mousedown|preventDefault on:click={onClick} title={label} aria-label={label}>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"></path></svg>
</button>

<style>
  .hint-btn {
    position: absolute; top: 10px; right: 10px; width: 38px; height: 38px; padding: 0;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--color-divider); border-radius: 50%; background: var(--color-bg);
    color: var(--color-accent-700); cursor: pointer; -webkit-appearance: none; appearance: none;
    transition: background .15s, color .15s, border-color .15s;
  }
  .hint-btn:hover { border-color: var(--color-accent); background: var(--color-accent-100); }
  .hint-btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
</style>
