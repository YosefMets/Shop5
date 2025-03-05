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
  <i18n-n :value="amount" format="currency" tag="b" class="prc-out" :scope="'global'">
    <template v-slot:currency="slotProps">{{ currency.S }}</template>
  </i18n-n>
</template>

<style scoped>
.prc-out {
  font-weight: 400;
}
.prc-out > .currency {
  font-style: normal;
}
.prc-out > .literal {
  font-style: normal;
  font-size: .5rem;
  line-height: 1em;
}
</style>
