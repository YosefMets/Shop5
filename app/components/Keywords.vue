<script setup>
import NLink from "~/components/controls/NLink.vue";

const appStore = useAppStore();
const { db, activeGroup, activeBrand, filters } = storeToRefs( appStore );

const keywords = computed( () => activeBrand.value ? getKeywords() : activeGroup.value?.keywords );
// keywords.value.sort( ( a, b ) => {
//   const aa = ( a.type === 'boolean' && filters.value?.[a.char] ) || filters.value?.[a.char]?.includes(a.value);
//   const bb = ( b.type === 'boolean' && filters.value?.[b.char] ) || filters.value?.[b.char]?.includes(b.value);
//   if ( aa && !bb ) return -1
//   if ( !aa && bb ) return 1
// });
</script>

<template>
  <div v-if="keywords?.length" class="keywords-wr scroll">
    <div class="keywords">

      <NLink v-for="{ char, value, type } in keywords"
             :to="activeGroup"
             :brand="activeBrand"
             :filters="{ char, value, type }"
             :class="['kw', {
               curr: ( type === 'boolean' && filters?.[char] ) || filters?.[char]?.includes(value),
               ava: db?.[value]?.Iso || db?.[value]?.A
             }]"><!--curr: filters?.[char]?.includes(value), -->

  <!--      <i v-if="db?.[keyword.value]?.Iso || db?.[keyword.value]?.A" :class="['kw-a', { flag: keyword.char === 'co' }]">-->
  <!--        <NuxtImg :src="db?.[keyword.value]?.Iso ? `/${db?.[keyword.value]?.Iso}.svg` :  db?.[keyword.value]?.A ? `/i/${db?.[keyword.value]?.I}.${db?.[keyword.value]?.A}` : ''" />-->
  <!--      </i>-->

        <template v-if="type === 'boolean'">{{ db?.[char].N }}</template>
        <template v-else>{{ db?.[value]?.N || value }}</template>

      </NLink>

      <PriceFilter />

    </div>
  </div>
</template>

<style scoped>
.keywords-wr {
  overflow: auto;
}
.keywords {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: stretch;
  grid-gap: .2rem;
  width: max-content;
  /*height: 2.4rem;*/
}
.kw {
  position: relative;
  cursor: pointer;
  background-color: var(--bg);
  display: flex;
  align-items: center;
  /*border-radius: var(--br);*/
  border-radius: 10rem;
  color: var(--dark);
  padding: .3rem 1rem;
  /*box-shadow: inset 0 0 0 .05rem #000000;*/
  overflow: hidden;
  /*font-size: 1.1rem;*/
  font-weight: 500;
  transition: padding .2s, background-color .2s;
}
.keyword.ava {
  display: flex;
  grid-gap: 1rem;
}
.kw:hover {
  background-color: var(--active-bg);
}
.kw.curr {
  background-color: var(--dark);
  color: #fff;
  /*background-color: #ff000011;*/
  /*color: #f00;*/
}

.kw-a {
  height: 90%;
  aspect-ratio: 1 / 1;
  /*background-color: #635bff;*/
  border-radius: var(--br);
  overflow: hidden;
  margin: 0 -.5rem 0 -.8rem;
}
.kw-a.flag {
  border-radius: 50%;
  height: 50%;
  margin-left: -.5rem;
}
.kw-a > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>