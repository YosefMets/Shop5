<script setup>
import NLink from "~/components/controls/NLink.vue";
import SvgV from "~/components/imgs/svg-v.vue";

const { db, activeItem: item, activeGroup: group, activeBrand: brand } = storeToRefs( useAppStore() );

const props = defineProps({ entity: { type: Object } });

const Entity = computed( () => props.entity || item.value || group.value );
const crumbs = computed( () => {
  if (!props.entity?.P) return []

  let res = [ db.value?.[props.entity.P] ]
  while (res?.[0]?.P) {
    res.unshift(db.value?.[res?.[0].P]);
  }
  return res
});
</script>

<template>
  <ul class="crumbs">
    <li class="crmb">
      <NLink :to="null">{{ $t('home') }}</NLink>
      <svg-v class="arr" />
    </li>
    <li v-for="crumb in crumbs" class="crmb">
      <NLink :to="crumb">{{ crumb?.N }}</NLink>
      <svg-v class="arr" />
    </li>
  </ul>
</template>

<style scoped>
.crumbs {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  grid-row-gap: 0.5em;
  /*justify-content: center;*/
}
.crmb {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}
a {
  /*color: var(--dark);*/
  color: #000;
  text-decoration: none;
  font-size: .9rem;
  line-height: 1em;
  /*font-weight: 500;*/
}
a:hover {
  /*color: var(--active);*/
}
.arr {
  width: .6rem;
  height: .36rem;
  margin: 0 .5rem;
  stroke: var(--dark);
  transform: rotate(-90deg);
  stroke-width: .1rem;
}
li:last-of-type > .arr {
  transform: rotate(0deg);
}

@media (max-width: 480px) {
}
</style>
