<script>
  export let head = '';
  export let stem = '';
  export let tail = '';
  const RED = '#b3352b';
</script>

{#if head}<span style="color:{RED}">{head}</span>{/if}{#if stem}<span>{stem}</span>{/if}<span style="color:{RED}">{tail}</span>
