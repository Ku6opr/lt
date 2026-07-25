<script>
  import { topics } from '../../topics/index.js';
  export let onEnter;
  const topic = topics[0];
</script>

<div class="lt-wrap">
  <div style="margin-bottom:var(--space-6)">
    <div class="card-kicker">Тренажер литовської</div>
    <h1 style="font-size:clamp(30px,6cqw,46px);margin:2px 0 4px">Оберіть тему</h1>
    <p class="text-muted" style="max-width:44ch">Учіться у власному темпі. Без балів і перевірок — вводите свій варіант, розкриваєте правильний, порівнюєте самі.</p>
  </div>
  <div style="display:grid;gap:var(--space-3)">
    <div
      class="lt-topic"
      role="button"
      tabindex="0"
      on:click={() => onEnter(topic.id)}
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && onEnter(topic.id)}
      style="cursor:pointer;border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:var(--space-4);background:var(--color-surface);transition:border-color .15s,background .15s;display:flex;align-items:center;gap:var(--space-4)"
    >
      <div style="font-family:var(--font-heading);font-size:44px;line-height:1;color:var(--color-accent);width:64px;text-align:center;flex:none">{topic.glyph}</div>
      <div style="flex:1">
        <div class="card-kicker">{topic.kicker}</div>
        <h3 style="margin:0 0 4px">{topic.title}</h3>
        <p class="text-muted" style="margin:0;font-size:13px">{topic.subtitle}</p>
      </div>
      <div class="text-muted" style="font-size:26px">›</div>
    </div>
    <div style="border:1px dashed var(--color-divider);border-radius:var(--radius-lg);padding:var(--space-4);text-align:center" class="text-muted">
      <span style="font-size:13px">Наступні теми — згодом</span>
    </div>
  </div>
</div>
