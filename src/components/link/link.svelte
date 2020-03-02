<script>
  export let disabled;
  export let underline;
  export let href;
  export let icon;
  export let type = "default";
</script>

<a
  class:is-disabled={disabled}
  class="sv-link {type ? `sv-link_${type}` : ''}
  {underline ? `sv-link_${type}_underline` : ''}"
  href={disabled ? null : href}
  on:click>
  {#if icon}
    <i :class="icon" v-if="icon" />
  {/if}

  <slot />
</a>
