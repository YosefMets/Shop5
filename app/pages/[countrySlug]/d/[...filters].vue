<script setup>
import Sorting2 from "~/components/Sorting2.vue";

const { params } = useRoute();
const appStore = useAppStore();
const { db, activeGroup: dir, activeBrand, displayedItems, filters, priceMin, priceMax } = storeToRefs( appStore );

const entity = db.value?.['D'+params.id];
if (entity && entity.I !== dir.value?.I) {
  // console.log('activateGroup', entity.I, dir.value?.I);
  appStore.activateGroup(entity);
}

// console.log(dir.value)
if (dir.value?.S !== params.slug) {
  showError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

priceMin.value = null;
priceMax.value = null;
filters.value = getFilters( params.filters );

const cover = computed( () => dir.value?.c ? `url(/i/${dir.value.I}-cover.${dir.value?.c})` : 'none' )
// onUnmounted( () => { appStore.activateGroup( null ) })
</script>

<template>
  <div v-if="dir" class="dir">
    <Crumbs :entity="dir" class="dir-crumbs" />

    <h1 class="d-ttl">{{ dir?.N }}</h1>

    <Keywords class="d-keywords" />

<!--    <div class="d-filters-bar scroll">-->

<!--      <Sorting2 />-->
<!--    </div>-->

    <div class="d-cv"></div>

    <Items :items="displayedItems" />
  </div>
</template>

<style scoped>
.dir {
  padding: 1rem 2rem;
}
.dir-crumbs {
  /*height: var(--mobar-el-size);*/
  height: 1rem;
  margin-bottom: 1rem;
}
.d-ttl {
  font-size: 2.6rem;
  line-height: 1.2em;
  margin: 1rem 0;
}
.d-keywords {
  margin-bottom: 2rem;
}
.d-filters-bar {
  height: var(--mobar-el-size);
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  width: 100%;
}
.d-cv {
  aspect-ratio: 1 / .15;
  background-color: #666;
  border-radius: var(--Br);
  margin-bottom: .5rem;
  background-image: v-bind(cover);
  background-size: cover;
  background-position: 50% 50%;
  display: none;
}

@media (max-width: 480px) {
  .dir {
    padding: 1rem;
  }
}
</style>