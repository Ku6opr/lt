<script>
  import WordForm from './WordForm.svelte';

  export let task = null;
  export let revealed = false;
  export let userInput = '';
  export let onInput;
  export let onPrimary;

  $: hasTask = !!task;

  function onKey(e) {
    if (e.key === 'Enter') onPrimary();
  }
</script>

<div style="border:1px solid var(--color-divider);border-radius:var(--radius-lg);padding:clamp(20px,4.5cqw,44px);background:var(--color-surface);box-shadow:var(--shadow-sm);margin-bottom:var(--space-6)">
  {#if hasTask}
    <div style="text-align:center;margin:0 0 clamp(16px,3.5cqw,28px)">
      <div style="font-family:var(--font-heading);font-size:clamp(38px,8cqw,64px);line-height:1.02">
        {#if task.prompt.text}{task.prompt.text}{:else}<WordForm stem={task.prompt.stem} tail={task.prompt.tail} />{/if}
      </div>
      {#if task.wordUk}<div style="font-size:15px;margin-top:8px;color:var(--color-accent-700)">{task.wordUk}</div>{/if}
      {#if task.hasNote}<div class="text-muted" style="font-size:13px;margin-top:4px">{task.promptNote}</div>{/if}
    </div>

    <label style="display:flex;justify-content:center;margin-bottom:var(--space-3);cursor:text;padding:6px 0">
      <div style="display:inline-flex;align-items:baseline;gap:8px;font-family:var(--font-heading);font-size:clamp(24px,4.5cqw,34px)">
        {#if task.hasLead}<span class="text-muted">{task.lead}</span>{/if}
        <div style="display:inline-flex;align-items:baseline;border-bottom:2px solid var(--color-accent);padding:0 4px 2px">
          <span style="color:var(--color-text);white-space:pre">{task.stemPrefix}</span>
          <input value={userInput} on:input={onInput} on:keydown={onKey} placeholder="…" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" inputmode="text" style="border:0;background:transparent;font:inherit;color:var(--color-text);caret-color:var(--color-accent);width:clamp(80px,22cqw,170px);outline:none;padding:0">
        </div>
      </div>
    </label>

    {#if task.hint}<div class="text-muted" style="text-align:center;font-size:15px;margin-bottom:var(--space-3)">{task.hint}</div>{/if}

    <div style="min-height:clamp(124px,18cqw,152px);border-top:1px solid var(--color-divider);margin-top:var(--space-3);padding-top:var(--space-4)">
      {#if revealed}
        <div style="text-align:center">
          <div class="card-kicker">Правильна форма</div>
          <div style="font-family:var(--font-heading);font-size:clamp(30px,6cqw,50px);line-height:1.02;margin:6px 0 12px">
            {#if task.hasLead}<span style="color:var(--color-neutral-500);font-size:.68em">{task.lead} </span>{/if}<WordForm stem={task.stem} tail={task.tail} />
          </div>
          {#if task.revealUk}<div class="text-muted" style="font-size:14px">{task.revealUk}</div>{/if}
        </div>
      {/if}
    </div>

    <div style="display:flex;justify-content:center;margin-top:var(--space-4)">
      <button class="btn btn-primary" on:click={onPrimary} style="min-width:190px">{revealed ? 'Далі →' : 'Показати відповідь'}</button>
    </div>
  {:else}
    <div class="text-muted" style="text-align:center;padding:var(--space-8) 0;font-size:15px">Оберіть нижче хоча б один відмінок, один тип відмінювання та число.</div>
  {/if}
</div>
