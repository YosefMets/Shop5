<script setup>
const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
});

const { currency } = storeToRefs( useAppStore() );
</script>

<template>
  <div class="price">
    <i18n-n :value="amount" format="currency" tag="b" scope="global">
      <template v-slot:currency="slotProps">{{ currency.S }}</template>
      <template v-slot:integer="slotProps">{{ slotProps.integer }}</template>
      <template v-slot:group="slotProps">{{ slotProps.group }}</template>
      <template v-slot:decimal="slotProps"><i v-if="false" /></template>
      <template v-slot:fraction="slotProps"><i class="pc-f">{{ slotProps.fraction }}</i></template>
      <template v-slot:literal="slotProps"><i class="pc-lit">{{ slotProps.literal }}</i></template>
    </i18n-n>
  </div>
</template>

<style scoped>
.price {
  text-align: right;
  font-size: 1.4rem;
  display: inline-flex;
  grid-gap: .5rem;
  /*align-items: baseline;*/
  line-height: 1em;
  font-weight: 400;
}
.price > b {
  font-weight: inherit;
  display: block;
  align-items: flex-start;
}
.prc-disc {
  font-size: 1rem;
  background-color: var(--active-hover);
  padding: 0 .5rem;
  color: #fff;
}

i {font-style: normal}

.pc-f {
  font-size: .5em;
  font-weight: 500;
  line-height: 1em;
  margin-left: .1em;
  margin-top: .1em;
  vertical-align: super;
}
.literal { /*display: none;*/ }


@media (max-width: 480px) {
  div {
    font-size: 1.8rem;
  }
}
</style>
