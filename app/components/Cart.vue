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

  <Modal :show="route.query?.['cart'] !== undefined"
         :width="'35rem'"
         @close="navigateTo({ query: {...route.query, ['cart']: undefined} })">

    <div class="chck-gap chck-gap-top" />

    <h2 class="chck-ttl" @click="serverCart">
        🛒 {{ $t('cart') }}
        <PriceRegular :amount="total" class="cart-total" />
    </h2>

    <div class="cart-layout">
      <TransitionGroup name="adding" tag="div" class="cart-items">
        <CartItem  v-for="item in items" :key="item" :cartItem="item" />

        <div class="chck-delivery">
          <div class="chck-delivery-ic-wr">
            <SvgTrack class="chck-delivery-ic" />
          </div>
          <div class="chck-delivery-lbl">{{ $t('delivery') }}</div>
          <PriceRegular :amount="10" class="chck-delivery-price" />
        </div>

        <form action="" class="chck-form" @submit.prevent="auth">
          <input v-model="email"
                 type="email"
                 autocomplete="email"
                 required
                 class="chck-email"
                 :placeholder="$t('email')" />
          <input v-model="pass"
                 type="password"
                 required
                 class="chck-email"
                 :placeholder="$t('password')" />
          <NButton>{{ $t('checkout') }}</NButton>
        </form>

<!--        <NButton>-->
<!--          <div class="chck-btn-cont">-->
<!--            <i></i>-->
<!--            {{ $t('checkout') }}-->
<!--            <PriceRegular :amount="total" class="chck-btn-price" />-->
<!--          </div>-->
<!--        </NButton>-->

      </TransitionGroup>
    </div>

  </Modal>

</template>

<style scoped>

.cart-layout {
}

.chck-gap {
  position: absolute;
  background-color: var(--bg);
  height: 3rem;
  right: 0;
  left: 0;
  top: 0;
  z-index: 50;
}

.chck-ttl {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  font-weight: 500;
  background-color: var(--bg);
  /*position: relative;*/
  padding: 0 0 2rem;
  margin: 0;
  z-index: 50;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-total {
  margin-right: 1rem;
  font-size: 1rem;
  align-self: end;
  line-height: 1em;
  font-weight: 500;
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