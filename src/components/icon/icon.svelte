<script>
  export let name;
  export let className = $$props.class;
</script>

<style lang="scss">
  @import "../../theme/icon.scss";
</style>

{#if name || className}
  <i
    on:click
    class="sv-icon {name ? 'sv-icon-' + name : ''}
    {className ? className : ''}" />
{/if}
