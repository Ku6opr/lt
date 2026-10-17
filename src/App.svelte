<script>
  import TopicsScreen from './lib/components/TopicsScreen.svelte';
  import Trainer from './lib/components/Trainer.svelte';
  import ReinforceScreen from './lib/components/ReinforceScreen.svelte';
  import AdScreen from './lib/components/AdScreen.svelte';
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
  function enterAd() {
    screen = 'ad';
  }
  function goBack() {
    screen = 'topics';
  }

  $: topic = topics.find((t) => t.id === topicId) || topics[0];
</script>

<div class="lt-app" style="font-family:var(--font-body);color:var(--color-text);background:var(--color-bg)">
  {#if screen === 'topics'}
    <TopicsScreen onEnter={enterTopic} onReinforce={enterReinforce} onDaily={enterDaily} onAd={enterAd} />
  {:else if screen === 'daily'}
    {#await import('./lib/components/DailyScreen.svelte') then m}
      <svelte:component this={m.default} onBack={goBack} />
    {/await}
  {:else if screen === 'ad'}
    <AdScreen onBack={goBack} />
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
