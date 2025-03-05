<template>
  <div class="x-button"><svg-x /></div>
</template>

<style scoped>
  .x-button {
    width: 2rem;
    height: 2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--bg);
    stroke-width: .1rem;
    stroke: #000;
  }
  .x-button > svg {
    width: 45%;
    height: 45%;
    stroke-width: inherit;
    stroke: inherit;
  }
</style>

<script>
import SvgX from "./svg-x";
export default {
  components: {SvgX}
}
</script>