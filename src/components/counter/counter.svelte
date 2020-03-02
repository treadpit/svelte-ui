<script>
  import Input from "../input/input.svelte";
  import Icon from "../icon/icon.svelte";
  export let min;
  export let max;
  export let value;
  export let step;
  function handleInput(e) {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) {
      e.target.value = value;
    } else {
      value = e.target.value;
      e.target.value = value;
    }
  }
  function reduce() {
    if (value - step < min) {
      value = min;
    } else {
      value -= step;
    }
  }
  function add() {
    if (value + step > max) {
      value = max;
    } else {
      value += step;
    }
  }
</script>

<div class="sv-counter">
  <span class="sv-counter-button" on:click={reduce}>
    <Icon name="reduce" />
  </span>
  <input
    class="sv-counter-input"
    type=number
    value={value}
    min={min}
    max={max}
    on:input={handleInput} />
  <span class="sv-counter-button" on:click={add}>
    <Icon name="add" />
  </span>
</div>
