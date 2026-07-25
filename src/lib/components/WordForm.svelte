<script>
  export let stem = '';
  export let tail = '';
  const RED = '#b3352b';
</script>

{#if stem}<span>{stem}</span>{/if}<span style="color:{RED}">{tail}</span>
