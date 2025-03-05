<template>
  <svg preserveAspectRatio="none" viewBox="0 0 14 20" xmlns="http://www.w3.org/2000/svg">
    <polyline points="1,7 7,1 13,7" vector-effect="non-scaling-stroke"/>
    <polyline points="1,13 7,19 13,13" vector-effect="non-scaling-stroke"/>
  </svg>
</template>

<style scoped>
  svg {
    width: .7rem;
    height: 1rem;
    display: inline-block;
    stroke: #000;
    stroke-width: .1rem;
  }
  svg > polyline {
    fill: transparent;
    stroke: inherit;
    stroke-width: inherit;
    stroke-linecap: round;
  }
</style>
