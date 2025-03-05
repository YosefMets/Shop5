<template>
  <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <circle cx="8.5" cy="8.5" r="6.5" />
    <path d="M14 14L18 18" />
  </svg>
</template>

<style scoped>
  svg {
    width: 1rem;
    aspect-ratio: 1 / 1;
    /*height: 1rem;*/
    display: inline-block;
    stroke: #000;
    stroke-width: .1rem;
  }
  svg > circle,
  svg > path {
    fill: transparent;
    stroke: inherit;
    stroke-width: inherit;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }
</style>
