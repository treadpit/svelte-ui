<script>
  import Icon from "../icon/icon.svelte";

  export let loading;
  export let disabled;
  export let icon;
  export let round;
  export let circle;
  export let size = "medium";
  export let type = "default";
  export let nativeType;
</script>

<button
  on:click
  disabled={disabled || loading}
  class:is-disabled={disabled || loading}
  class:is-circle={circle}
  class:is-round={round}
  type={nativeType}
  class="sv-button {'sv-button_' + type}
  {size ? 'sv-button_' + size : ''}">
  {#if loading}
    <Icon name="loading" />
  {/if}
  {#if icon && !loading}
    <Icon name={icon} />
  {/if}
  <slot />
</button>
