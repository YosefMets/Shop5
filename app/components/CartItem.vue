<script setup>
import SvgX from "./imgs/svg-x.vue";
import NLink from "~/components/controls/NLink";
import SvgTrash from "~/components/imgs/svg-trash.vue";

const props = defineProps({ cartItem: Object });

const appStore = useAppStore();
const { db, country } = storeToRefs( appStore );

const cartStore = useCartStore();

const item = ref( props.cartItem.item );
const size = ref( props.cartItem.size );
// const images = useImageURL(item.value, { preview: true });
const brandName = computed( () => db.value?.[item.value.B]?.N );
</script>

<template>
  <div class="ci" :title="item?.N">
    <i class="ci-i-wr">
      <NuxtImg :src="`/p-${item?.I}-0.avif`" class="ci-i" />
    </i>

    <div class="ci-ttl">{{ item?.N }}</div>

<!--    <div class="ci-price-cont">-->
<!--      <PriceRegular :amount="item.price" />-->
<!--      <span v-if="item.J" class="it-unt"> /{{ $t(item.J) }}</span>-->
<!--    </div>-->
    <CartItemQuantity :cart-item="cartItem" class="ci-qty" />
    <PriceRegular :amount="item.price * cartItem.qty" class="ci-total" />
<!--    <div class="cart-item-acts">-->
<!--      <ControlQuantity :cartItem="cartItem" class="calc"/>-->
<!--    </div>-->
  </div>
</template>

<style scoped>
.ci {
  display: grid;
  grid-template-columns: 4rem 1fr auto 5.2rem;
  /*grid-template-rows: 1fr auto;*/
  column-gap: .5rem;
  row-gap: .5rem;
  background-color: #fff;
  padding: .5rem 1rem .5rem .5rem;
  /*border-radius: var(--br);*/
}
.ci-i-wr {
  /*grid-row: 1 / -1;*/
  display: block;
  width: 100%;
  position: relative;
  aspect-ratio: 1 / 1;
  /*border-radius: var(--br);*/
  /*border: .1rem solid #ddd;*/
  /*box-shadow: 0 0 10rem 0 #00000011;*/
  background-color: #fff;
  overflow: hidden;
 }
.ci-i {
  object-fit: cover;
  object-position: 50% 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90%;
  height: 90%;
  transform: translate(-50%, -50%);
  transition: transform .1s linear;
}
.ci-i-wr:before {
  content: '';
  background-color: #0000000b;
  position: absolute;
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}
.ci-ttl {
  /*grid-column: 2 / -1;*/
  align-self: center;
}
.ci-price-cont {
  align-self: center;
}
.ci-qty {
  align-self: center;
  height: 3rem;
  min-height: 3rem;
  width: 8rem;
}
.ci-total {
  justify-self: flex-end;
  align-self: center;
}


@media (max-width: 480px) {
  .ci {
    grid-template-columns: 4rem 1fr 5.2rem;
    grid-template-rows: auto auto;
    grid-template-areas:
        "cittl cittl cittl"
        "ciimg ciqty citotal";
  }
  .ci-i-wr {
    grid-area: ciimg;
  }
  .ci-ttl {
    grid-area: cittl;
  }
  .ci-qty {
    grid-area: ciqty;
    justify-self: end;
    width: 10rem;
  }
  .ci-total {
    grid-area: citotal;
  }
}
</style>
