<script>
  import Button from "./components/button/button.svelte";
  import Icon from "./components/icon/icon.svelte";
  import ButtonGroup from "./components/button/button-group.svelte";
  import Link from "./components/link/link.svelte";
  import Badge from "./components/badge/badge.svelte";
  import Input from "./components/input/input.svelte";
  import Counter from "./components/counter/counter.svelte";
  let inputValue = "";
  let textAraValue = "";
  let counterValue = 3;
  let svelte = "test";
  function btnClick(e) {
    console.log(e);
  }
  $: console.log('counterValue', counterValue);
  $: console.log('inputValue', inputValue);
  $: console.log('textAraValue', textAraValue);
</script>

<style lang="scss">
  @import "./theme/main.scss";
</style>

<Counter bind:value={counterValue} min={5} max={100} step={10} />
<br />
<Input
  prefixIcon="sv-icon-loading"
  clearable
  bind:value={inputValue}
  placeholder="placeholder" />
<br />
<Input
  bind:value={textAraValue}
  cols="12"
  rows="4"
  type="textarea"
  placeholder="placeholder" />
<br />
<Icon name="add" />
<Button on:click={btnClick} disabled round icon="add">提交保存</Button>
<Button on:click={btnClick} type="text">提交保存</Button>
<Button on:click={btnClick} round icon="loading">提交保存</Button>
<Button on:click={btnClick} icon="add" disabled size="small" type="primary">
  提交保存
</Button>
<Button on:click={btnClick} icon="add" loading size="medium" round type="success">
  提交保存
</Button>
<Button on:click={btnClick} icon="add" size="mini" type="warning">提交保存</Button>
<Button on:click={btnClick} icon="add" type="danger" circle />
<Button on:click={btnClick} icon="add" type="success" size="mini" circle />

<Link underline>
  <Icon name="add" />
  test link
</Link>
<Link underline disabled>test link</Link>
<Link underline type="success">test link</Link>
<Link underline type="primary">test link</Link>
<Link underline type="danger">
  test link
  <Icon name="add" />
</Link>

<ButtonGroup>
  <Button on:click={btnClick} type="info" nativeType="submit">info</Button>
  <Button on:click={btnClick} type="info" nativeType="submit">info</Button>
  <Button on:click={btnClick} type="info" nativeType="submit">info</Button>
</ButtonGroup>
<br />
<br />
<Button on:click={btnClick} type="info" round icon="loading" />

<!-- 注释掉的slot也会被svelte当作有默认slot，故不要slot的需删除而不是注释 -->
<Badge value="19" max="20" on:click={btnClick}>
  <Button type="primary" on:click={btnClick} nativeType="submit">info</Button>
</Badge>
