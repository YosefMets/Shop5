<script setup>
import SvgV from "~/components/imgs/svg-v.vue";

const { sorts, activeSort } = storeToRefs(useAppStore());

const isOpen = ref(false);

const sorting = (sorting) => {
  if (activeSort.value !== sorting)
    activeSort.value = sorting
}
</script>

<template>
  <div class="sort" v-clickout="()=>isOpen = false">
    <div class="sort-title-wr" @click="isOpen = !isOpen">
      <div class="sort-title">
        {{ $t('sortBy') }} {{ $t(activeSort) }}
      </div>
      <SvgV class="filter-dd" />
    </div>
<!--    <span class="curr">{{ $t(activeSort) }}</span>-->
<!--    {{ $t(activeSort) }}-->
    <div class="sorts scroll" :class="{ expand : isOpen}" @click="isOpen = !isOpen">
      <div v-for="sort in sorts" @click="sorting(sort)" class="sort-option" :class="{ active: (activeSort === sort) }">
        <b class="sort-option-bullet" />
        {{ $t(sort) }}
      </div>
    </div>

  </div>
</template>

<style scoped>
.sort {
  position: relative;
  /*background-color: var(--bg2);*/
  border-radius: var(--border-radius);
  display: flex;
  /*box-shadow: inset 0 0 0 .1rem var(--bg);*/
  max-width: 20rem;
}
.sort-title-wr {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  cursor: pointer;
  border-radius: var(--border-radius);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;
  font-size: .9rem;
  line-height: 1.5rem;
  font-weight: 500;
}
.sort-title {
  display: block;
  padding: .6rem .6rem .6rem 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
}
.filter-dd {
  width: 1rem;
  height: 2.2rem;
  stroke: #000;
}

.sorts {
  position: absolute;
  top: 100%;
  right: 0;
  width: 15rem;
  min-width: 100%;
  max-height: 0;
  overflow-y: auto;
  /*transition: max-height .3s;*/
  /*width: 10rem;*/
  background-color: #000;
  color: #fff;
  box-shadow: 0 0.4rem 0.6rem #00000066;
  border-radius: var(--border-radius);
  z-index: 1000;
}
.sorts.expand {
  max-height: 25rem;
  padding: .5rem 0;
}

.sort-option {
  position: relative;
  padding: .4rem 1rem;
  cursor: pointer;
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5rem;
  /*font-weight: 400;*/
}

.sort-option:hover {
  background-color: var(--active);
}
.sort-option:hover.active {
  /*display: none;*/
}
.sort-option-bullet {
  display: block;
  width: .5rem;
  height: .5rem;
  background-color: #fff;
  border-radius: 50%;
  justify-self: center;
  opacity: 0;
}
.active > .sort-option-bullet {
  opacity: 1;
}

@media (max-width: 480px) {
  .sort {
    background-color: #fff;
    /*grid-column: span 2;*/
  }
}
</style>
