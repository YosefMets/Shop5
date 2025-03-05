<script setup>

import SvgSearch from "~/components/imgs/svg-search.vue";
</script>

<template>
  <div class="srch">
    <SvgSearch class="srch-mag" />
    <input class="srch-in" :placeholder="$t('search')" />
  </div>
</template>

<style scoped>
.srch {
  border-radius: var(--br);
  box-shadow: 0 0 0 .2rem #000;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: .5rem;
  align-items: center;
  padding-left: .5rem;
  background-color: #fff;
}
.srch-mag {
  width: 1.5rem;
  stroke-width: .2rem;
}
.srch-in {
  appearance: none;
  background-color: transparent;
  border: none;
  height: 100%;
}
</style>