<script>
  import { lang } from '../stores/lang.js';
  import { UI } from '../i18n/ui.js';
  import { dayKey, pictureStore } from '../stores/daily.js';
  import { pictureOfDay, PICTURE_PHRASES } from '../engine/pictures.js';
  import DailyScreen from './DailyScreen.svelte';

  export let onBack;

  const pic = pictureOfDay(dayKey(new Date()));
  const touch = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;

  $: L = UI[$lang];
</script>

{#if pic}
  <DailyScreen
    {onBack}
    tasks={pic.phrases}
    store={pictureStore}
    byId={PICTURE_PHRASES}
    kickerKey="picKicker"
    titleKey="picTitle"
    reportLabel={'Картинка дня ' + pic.id}
    reportKey="picture"
    autofocus={!touch}
  >
    <div slot="media" class="plate photo">
      <img src="pictures/{pic.id}.jpg" alt={L.picAlt} width="1600" height="1200" />
    </div>
  </DailyScreen>
{:else}
  <div class="lt-wrap">
    <button class="btn btn-secondary" type="button" on:click={onBack}>{L.back}</button>
  </div>
{/if}

<style>
  .photo { aspect-ratio: 4 / 3; overflow: hidden; background: #fff; filter: none; }
  .photo img { display: block; width: 100%; height: 100%; object-fit: contain; }
</style>
