<template>
  <svg width="20" height="12" viewBox="0 0 20 12" xmlns="http://www.w3.org/2000/svg">
    <polyline points="2,2 10,10 18,2"/>
  </svg>
</template>

<style scoped>
svg {
  width: 2rem;
  height: 1.2rem;
  display: inline-block;
  stroke: #000;
  stroke-width: .1rem;
}
svg > polyline {
  fill: transparent;
  stroke: inherit;
  stroke-width: inherit;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}
</style>
