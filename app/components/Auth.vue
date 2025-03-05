<script setup>
import NButton from "~/components/controls/NButton.vue";
import SvgTrack from "~/components/imgs/svg-track.vue";

const route = useRoute();
const { items, total } = storeToRefs( useCartStore() );

const email = ref('');
const pass = ref('');

const auth = async () => {
  const authRes = await $fetch('/api/auth', {
    method: 'post',
    body: {
      email: email.value,
      pass: pass.value,
    }
  });

  if ( !authRes?.customer ) {
    // TODO обрабатываем ошибку
  }
  const paymentMethods = await $fetch('/api/payments');
  const clientSecret = await $fetch('/api/payments/client-secret');
  console.log( paymentMethods );
}

const serverCart = async () => {
  const serverCartRes = await $fetch('/api/cart', {
    method: 'post',
    body: items.value?.map(({item, qty}) => ({id: item.I, qty, price: item.$})),
  });
  console.log(serverCartRes);
}
</script>

<template>

  <Modal :show="route.query?.['auth'] !== undefined"
         :width="'35rem'"
         @close="navigateTo({ query: {...route.query, 'auth': undefined} })">

    <h1>Auth</h1>

  </Modal>

</template>

<style scoped>

.cart-layout {
}

.chck-gap {
  position: absolute;
  background-color: #fff;
  height: 3rem;
  right: 0;
  left: 0;
  top: 0;
  z-index: 50;
}

.chck-ttl {
  position: sticky;
  top: 0;
  width: 100%;
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*font-size: 1.6rem;*/
  /*font-weight: 500;*/
  /*background-color: var(--bg);*/
  /*position: relative;*/
  /*padding: 0 0 2rem;*/
  margin: 0;
  z-index: 50;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}
.cart-total {
  /*margin-right: 1rem;*/
  font-size: 1rem;
  /*align-self: end;*/
  line-height: 1em;
  /*font-weight: 500;*/
}
.chck-btn-cont {
  width: 100%;
  display: grid;
  grid-template-columns: 5rem 1fr 5rem;
}
.chck-btn-price {
  justify-self: end;
}
.chck-delivery {
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  align-items: center;
  padding: .5rem 1rem .5rem .5rem;
  /*border: .2rem solid #fff;*/
  gap: .5rem;
  background-color: #fff;
}
.chck-delivery-ic-wr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  aspect-ratio: 1 / 1;
  background-color: var(--bg);
  overflow: hidden;
}
svg.chck-delivery-ic {
  stroke: #000;
  width: 2rem;
  height: 2rem;
  justify-self: center;
}
.chck-delivery-lbl {

}
.chck-delivery-price {

}
.chck-form {
  display: grid;
  grid-template-columns: 1fr 30%;
  position: sticky;
  bottom: 0;

  display: flex;
  flex-direction: column;
}
.chck-email {
  appearance: none;
  background-color: #fff;
  border: .1rem solid var(--contr);
  padding: 0 1rem;
}


@media (max-width: 480px) {
  .chck-gap {
    height: 1.5rem;
    right: 0;
    left: 0;
    top: 0;
  }
  .chck-ttl {}
  .cart-items { gap: .5rem; }
}
</style>