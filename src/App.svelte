<script>
  import TopicsScreen from './lib/components/TopicsScreen.svelte';
  import Trainer from './lib/components/Trainer.svelte';

  let screen = 'topics';

  function enterTopic() {
    screen = 'trainer';
  }
  function goBack() {
    screen = 'topics';
  }
</script>

<div class="lt-app" style="font-family:var(--font-body);color:var(--color-text);background:var(--color-bg)">
  {#if screen === 'topics'}
    <TopicsScreen onEnter={enterTopic} />
  {:else}
    <Trainer onBack={goBack} />
  {/if}
</div>
