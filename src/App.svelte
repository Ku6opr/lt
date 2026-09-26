<script>
  import TopicsScreen from './lib/components/TopicsScreen.svelte';
  import Trainer from './lib/components/Trainer.svelte';
  import ReinforceScreen from './lib/components/ReinforceScreen.svelte';
  import { topics } from './topics/index.js';

  let screen = 'topics';
  let topicId = null;

  function enterTopic(id) {
    topicId = id;
    screen = 'trainer';
  }
  function enterReinforce() {
    screen = 'reinforce';
  }
  function enterDaily() {
    screen = 'daily';
  }
  function goBack() {
    screen = 'topics';
  }

  $: topic = topics.find((t) => t.id === topicId) || topics[0];
</script>

<div class="lt-app" style="font-family:var(--font-body);color:var(--color-text);background:var(--color-bg)">
  {#if screen === 'topics'}
    <TopicsScreen onEnter={enterTopic} onReinforce={enterReinforce} onDaily={enterDaily} />
  {:else if screen === 'daily'}
    {#await import('./lib/components/DailyScreen.svelte') then m}
      <svelte:component this={m.default} onBack={goBack} />
    {/await}
  {:else if screen === 'reinforce'}
    {#key screen}
      <ReinforceScreen onBack={goBack} />
    {/key}
  {:else}
    {#key topicId}
      <Trainer {topic} onBack={goBack} />
    {/key}
  {/if}
</div>
