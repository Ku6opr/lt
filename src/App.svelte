<script>
  import TopicsScreen from './lib/components/TopicsScreen.svelte';
  import Trainer from './lib/components/Trainer.svelte';
  import { topics } from './topics/index.js';

  let screen = 'topics';
  let topicId = null;

  function enterTopic(id) {
    topicId = id;
    screen = 'trainer';
  }
  function goBack() {
    screen = 'topics';
  }

  $: topic = topics.find((t) => t.id === topicId) || topics[0];
</script>

<div class="lt-app" style="font-family:var(--font-body);color:var(--color-text);background:var(--color-bg)">
  {#if screen === 'topics'}
    <TopicsScreen onEnter={enterTopic} />
  {:else}
    {#key topicId}
      <Trainer {topic} onBack={goBack} />
    {/key}
  {/if}
</div>
