<template>
  <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <circle cx="10" cy="5.5" r="4.5" vector-effect="non-scaling-stroke"/>
    <path d="M1 19C1 15.6863 4.22355 13 8.2 13H11.8C15.7764 13 19 15.6863 19 19" vector-effect="non-scaling-stroke"/>
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
  svg > circle,
  svg > path {
    fill: transparent;
    stroke: inherit;
    stroke-width: inherit;
    stroke-linecap: round;
  }
</style>
