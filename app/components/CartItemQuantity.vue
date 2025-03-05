<script setup>
const props = defineProps({
  cartItem: Object,
  small: Boolean
});
const { t } = useI18n();
const qty = ref( props.cartItem.qty );
const unit = ref( props.cartItem.item?.J ? t(props.cartItem.item?.J) : null );

const { storage } = storeToRefs( useAppStore() );
const storageQty = computed( () => {
  const qtys = props.cartItem.item.Q?.[storage.value?.I]
  return props.cartItem.size ? qtys.find( q => q?.[0] === props.cartItem.size)?.[1] : qtys
} )

const cartStore = useCartStore();

watch(props.cartItem, (newVal) => {
  if (newVal.qty <= 0) cartStore.remove(newVal.item, newVal.size);
  else if (newVal.qty > storageQty.value) qty.value = newVal.qty = storageQty.value;
  else qty.value = newVal.qty;
}, { deep: true });

const minus = () => { --props.cartItem.qty }
const plus = () => { ++props.cartItem.qty }
const format = () => { qty.value = (qty.value.replace(/[\D]/g, '') * 1 || 1) }
</script>

<template>
  <div :class="['iq', { 'qty-cntr-s': small }]">
    <button @click="minus" class="iq-btn iq-dec">&minus;</button>
    <input v-model="qty"
           class="iq-in"
           @input="format"
           @change="cartItem.qty = qty"
           @keypress.enter="$event.target.blur()" />
    <button @click="plus" class="iq-btn iq-inc">&plus;</button>
  </div>
</template>

<style scoped>
.iq {
  display: inline-grid;
  grid-template-columns: auto 1fr auto;
  align-items: stretch;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  width: 9rem;
  /*background-color: var(--active-bg);*/
  /*background-color: var(--hover-bg-dark);*/
  /*background-color: var(--bg);*/
  /*border-radius: var(--br);*/
  color: #000;
  font-weight: 400;
  /*box-shadow: 0 0.05rem 0.1rem 0 #000000c7;*/
  /*border: 0.1rem solid var(--contr);*/
  overflow: hidden;
  border: .1rem solid #000;
  min-height: var(--cntl-h);
}

.iq-btn {
  height: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  /*border-radius: 50%;*/
  /*border-radius: var(--br);*/
  /*background-color: transparent;*/
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  background-color: #fff;
}
.iq-btn.iq-inc {
  /*background-color: var(--active-bg);*/
}

.qty-cntr-s button {
  width: 2.2rem;
  height: 2.2rem;
}

.iq-in {
  border: none;
  background-color: #fff;
  width: 100%;
  padding: 0;
  text-align: center;
  font-weight: 400;
}

@media (max-width: 480px) {
  button {
    /*width: 4rem;*/
    /*height: 4rem;*/
  }
}
</style>
