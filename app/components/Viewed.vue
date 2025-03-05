<script setup>
import NLink from "~/components/controls/NLink.vue";

const { activeItem } = storeToRefs( useAppStore() );
const { viewed, favorites } = storeToRefs( useUserStore() );

const items = computed( () => {
  const _viewed = activeItem.value ? viewed.value.slice(1) : viewed.value;
  // return Array.from( new Set( _viewed.concat(favorites.value) ) );
  return Array.from( new Set( favorites.value.concat(_viewed) ) );
} );
</script>

<template>
  <div class="viewed">
    <NLink v-for="item in items" :min="null" :max="null" :to="item" class="viewed-item">
      <img :src="item.M?.[0] ? `/i/${item.I}-0.${item.M?.[0]}` : ''" class="vd-img" alt="">
    </NLink>
  </div>
</template>

<style scoped>
.viewed {
  position: sticky;
  top: 0;
  height: 100vh;
  padding-top: var(--mobar-el-size);
  display: flex;
  flex-direction: column;
  align-items: center;
  /*grid-gap: .5rem;*/
  background-color: var(--bg2);
}
.viewed-item {
  display: block;
  width: 4rem;
  height: 4rem;
  padding: .2rem;
  border-radius: var(--br);
  background-color: #fff;
  margin-top: .5rem;
}
.vd-img {
  display: block;
  object-position: 50% 50%;
  object-fit: contain;
  width: 100%;
  height: 100%;
}

@media (max-width: 480px) {

}
</style>
