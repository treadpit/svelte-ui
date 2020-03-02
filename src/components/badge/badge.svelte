<script>
  export let hidden;
  export let value;
  export let isDot;
  export let max;
  let content = "";
  let fixed = false;
  const hasDefaultSlot = $$props.$$slots && $$props.$$slots.default;
  $: fixed = hasDefaultSlot;
  $: if (!isDot) {
    content = "";
    const _max = +max;
    if (typeof +value === "number" && typeof _max === "number") {
      content = _max < +value ? `${_max}+` : value;
    } else {
      content = value;
    }
  }
</script>

<div class="sv-badge" on:click>
  <slot />
  {#if !hidden && (content || content === 0 || isDot)}
    <sup class="sv-badge_content" class:is-dot={isDot} class:is-fixed={fixed}>
      {content}
    </sup>
  {/if}
</div>
