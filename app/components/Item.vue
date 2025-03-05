<script setup>
import NLink from "~/components/controls/NLink.vue";

const { db } = storeToRefs( useAppStore() );

const props = defineProps({ item: Object });

const img = computed( () => props.item.M ? `/p-${props.item.I}-0.avif` : null );

const brand = computed( () => props.item.B ? db.value?.[props.item.B] : null );
</script>

<template>
  <NLink :to="item" :min="null" :max="null" class="item">

    <i class="it-i">
      <NuxtImg v-if="img" :src="img" :alt="item.N" :key="item.I" loading="lazy" />
<!--      <img :src="img" :alt="item.N" :key="item.I" loading="lazy" />-->
    </i>

    <p class="it-n" :title="item.N">{{ item.N }} {{ brand?.N }}</p>

    <div class="it-pr-wr">
      <Price :amount="item?.price" class="it-pr" />
      <span v-if="item.J" class="it-unt">&#160;{{ $t(item.J) }}</span>
    </div>

  </NLink>
</template>

<style scoped>
.item {
  background-color: #fff;
  /*background-color: var(--bg);*/
  padding: 0 0 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: .8rem;
  position: relative;
  color: #000;
  text-decoration: none;
  z-index: 10;
  overflow: hidden;
  /*border-radius: var(--Br);*/
  /*border: .1rem solid #ddd;*/
  /*box-shadow: 0 0 10rem 0 #00000011;*/
}

.it-i {
  grid-column: 1 / -1;
  display: block;
  width: 100%;
  position: relative;
  /*margin-bottom: -2rem;*/
  aspect-ratio: 1 / 1;
}
.it-i:before {
  content: '';
  display: block;
  padding-top: 100%;
  position: relative;
  z-index: 1;
  transition: background-color .1s linear;
  background-color: #0000000a;
  /*background: radial-gradient(circle, rgb(0 0 0 / 0) 20%, rgb(0 0 0 / 0.05) 100%);*/
}
.item:hover > .it-i:before {
  /*background-color: transparent;*/
}
.it-i > img {
  object-fit: cover;
  object-position: 50% 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  transition: transform .1s linear;
  /*border-radius: var(--br);*/
}
.item:hover > .it-i > img {
  transform: translate(-50%, -50%) scale(1.02);
}

.it-r,
.it-p {
  position: relative;
  z-index: 10;
  /*padding: 1rem 0 0;*/
  /*background: linear-gradient(0deg, #fff 0%, #ffffff00 100%);*/
  align-self: flex-start;
}

.it-n {
  /*grid-column: 1 / -1;*/
  margin: 0;
  font-size: 1rem;
  line-height: 1.5em;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.it-pr-wr {
  /*margin: 0 1rem 0 0;*/
}
.it-pr {
  font-size: 1.4rem;
}
.it-unt {
  color: #666;
}

@media (max-width: 480px) {
  .item {
  }
  .item:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background-color: #0000000b;*/
    z-index: 1;
  }
  .itimgs {
  }
  .itname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .itprice {
  }
  .itactions {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: .5rem;
  }
  .itaction {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--active-light);
    color: var(--active);
    border-radius: var(--br);
    padding: 1rem 0.4rem;
    line-height: 1.2em;
  }
  .itaction:after {
    content: none;
  }
}
</style>
