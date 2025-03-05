<script setup>
import SvgLove from "~/components/imgs/svg-love.vue";

const props = defineProps({ item: Object });

// const { favorites } = storeToRefs( useUserStore() );

/*
const addMeToFavorites = () => {
  if (props.item?.$f) {
    favorites.value.removeElement( props.item );
    props.item.$f = 0;
  } else {
    favorites.value.removeElement( props.item ).unshift( props.item );
    props.item.$f = 1;
  }
}
*/
</script>

<template>
  <div @click.stop.prevent="addToFavorites(item)"
       :class="['fav', { love: item?.$f }]">
    <SvgLove class="heart" />
  </div>
</template>

<style scoped>
.fav {
  padding: 0.5rem;
  cursor: pointer;

  border-radius: var(--br);
  transition: background-color .1s;
  display: inline-flex;
  grid-gap: .5rem;
  align-items: center;
  /*margin-left: -.5rem;*/
  text-transform: uppercase;
  font-size: .9rem;
  font-weight: 700;
  justify-self: flex-end;
}
.fav > .heart {
  display: block;
  stroke-width: .15rem;
  stroke: var(--dark);
  transition: fill .1s;
}
.fav.love > .heart {
  fill: var(--active);
  stroke: var(--active);
}
</style>
