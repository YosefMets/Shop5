<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 20" class="cart-ic">
    <path d="M23 3L20 12H5V2H2.5"/>
    <circle cx="6" cy="17" r="1"/>
    <circle cx="19" cy="17" r="1"/>
    <circle cx="2" cy="2" r="0.5"/>
  </svg>
</template>

<style scoped>
svg {
  width: 2.5rem;
  /*height: 2rem;*/
  aspect-ratio: 1.25 / 1;
  stroke-width: .15rem;
  stroke: #000;
  fill: transparent;
}
svg > path,
svg > circle {
  vector-effect: non-scaling-stroke;
  stroke-width: inherit;
  stroke: inherit;
  fill: inherit;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>