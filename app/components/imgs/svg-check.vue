<template>
  <svg preserveAspectRatio="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<!--    <polyline points="1,11 6.5,19 19,1" vector-effect="non-scaling-stroke"/>-->
    <path d="M2 10L7 15L18 4"/>
  </svg>
</template>

<style scoped>
  svg {
    width: 1rem;
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
  svg > path {
    fill: transparent;
    stroke: inherit;
    stroke-width: inherit;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }
</style>
