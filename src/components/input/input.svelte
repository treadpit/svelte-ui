<script>
  import Icon from "../icon/icon.svelte";
  export let type = "text";
  export let value;
  export let label;
  export let placeholder;
  export let disabled;
  export let readonly;
  export let showPassword;
  export let passwordVisible;
  export let clearable;
  export let rows;
  export let cols;
  export let autoComplete;
  export let autocomplete;
  export let suffixIcon;
  export let prefixIcon;
  export let className = $$props.class;
  let inputInstance;
  function handleInput(event) {
    const { type, checked, value: inputValue } = event.target;
    value = type === "checkbox" || type === "radio" ? checked : inputValue;
  }
  function clearInput() {
    inputInstance.value = "";
    value = "";
  }
  function handleFocus() {}
  function handleBlur() {}
  function handleChange() {}
</script>

<div
  class="{type === 'textarea' ? 'sv-textarea' : 'sv-input'}
  {className ? className : ''}
  {disabled ? (type === 'textarea' ? 'sv-textarea_disabled' : 'sv-input_disabled') : ''}">
  {#if type === 'textarea'}
    <textarea
      class="sv-textarea-inner "
      {disabled}
      {readonly}
      {rows}
      {cols}
      aria-label={label}
      autocomplete={autoComplete || autocomplete}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input={handleInput}
      on:change={handleChange} />
  {:else}
    {#if prefixIcon}
      <Icon class="sv-input-prefix {prefixIcon ? prefixIcon : ''}" />
    {/if}
    <input
      class="sv-input-inner"
      {disabled}
      {readonly}
      {placeholder}
      aria-label={label}
      type={showPassword ? (passwordVisible ? 'text' : 'password') : type}
      bind:this={inputInstance}
      on:input={handleInput} />
    {#if clearable && value && !suffixIcon}
      <Icon on:click={clearInput} class="sv-input-clear" name="close" />
    {/if}
    {#if suffixIcon}
      <Icon class="sv-input-suffix {suffixIcon ? suffixIcon : ''}" />
    {/if}
  {/if}
</div>
