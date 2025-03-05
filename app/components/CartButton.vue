<script setup>
import SvgCart1 from "~/components/imgs/svg-cart1.vue";
import NLink from "~/components/controls/NLink.vue";

const route = useRoute();
const localePath = useLocalePath();

const { user } = storeToRefs( useUserStore() );
const { items, total, quantity } = storeToRefs( useCartStore() );

const Q = ref(quantity.value);
const cartAnimation = ref('cart-count');

watch(quantity, (newVal, oldVal) => {
  if (newVal > oldVal) {
    cartAnimation.value = 'cart-count';
    Q.value = -1;
    setTimeout( () => Q.value = newVal, 1 );
  } else {
    cartAnimation.value = 'none';
    Q.value = newVal
  }
});
</script>

<template>
  <div class="cart-but-wr">
    <NuxtLink :to="{ query: {...route.query, ['cart']: null} }"
              :class="['cart-but', { 'cart-but-full': quantity > 0 }]">
<!--    <NLink :to="'/cart'"-->
<!--           :class="['cart-but', { 'cart-but-full': quantity > 0 }]"-->
<!--           :alt="$t('cart')"-->
<!--           :title="$t('cart')">-->

      <div class="cart-but-ic-el">
        <svg-cart1 class="cart-but-ic" />
        <transition :name="cartAnimation">
          <div v-if="Q >= 0" class="cart-but-qty">{{ quantity }}</div>
        </transition>
      </div>

      <div class="cart-but-lbl">
        {{ $t('cart') }}<br />
  <!--      <PriceRegular :price="total" />-->
      </div>

<!--    </NLink>-->
    </NuxtLink>
  </div>

  <Cart />
</template>

<style scoped>
.cart-but-wr {
  container: cart-but / size;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*border: .1rem solid var(--hover-bg-dark);*/
  /*background-color: var(--bg);*/
  /*border-radius: var(--br);*/
  transition: background-color .2s;
}
.cart-but-wr:hover { background-color: var(--hover-bg) }
.cart-but {
  display: flex;
  /*flex-direction: row;*/
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;
  position: relative;
  padding: 0 .5rem;
  color: #000;
  text-decoration: none;
  /*width: 100%;*/
  /*height: 100%;*/
  background-color: var(--bg);
  /*border-radius: var(--br);*/
  width: 100%;
  height: 100%;
}
@container cart-but (max-width: 10rem) {
  .cart-but {
    aspect-ratio: 1 / 1;
  }
  .cart-but-lbl {
    display: none;
  }
}
.cart-but.cart-but-full { background-color: var(--active); }

.cart-but.cart-but-full:after {
  /*content: '';*/
  position: absolute;
  right: -.5rem;
  top: 50%;
  display: block;
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  transform: translateY(-50%) rotate(45deg);
  border: solid var(--contr);
  border-width: 0 0 .1rem .1rem;
}

.cart-but-ic-el {
  position: relative;
  display: flex;
  transition: transform .1s;
  margin-bottom: -0.5rem;
}
.cart-but:hover > .cart-but-ic-el { transform: translateX(.1rem) }

.cart-but-ic {
  width: 2rem;
  stroke-width: .15rem;
  /*stroke: #fff;*/
  position: relative;
  z-index: 1;
  transition: all .2s;
}
.cart-but.cart-but-full .cart-but-ic {
  stroke: #fff;
  translate: 0 .2rem;
}

.cart-but-qty {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: -1rem 0 0 .1rem;
  /*background-color: var(--accent);*/
  color: var(--bg);
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 1;
  /*color: #fff;*/
}
.cart-but.cart-but-full .cart-but-qty { color: #fff; }

.cart-count-enter-active {
  transition: all .3s;
  transform: translate(-50%,-50%);
}
.cart-count-enter-from,
.cart-count-leave-to {
  transform: translate(-50%,-250%);
  opacity: 0;
}

@media (max-width: 480px) {
  .cart-but { padding: 0; background-color: transparent; }
  .cart-but-lbl { display: none; }
  .cart-but.cart-but-full:after { content: none; }
}
</style>