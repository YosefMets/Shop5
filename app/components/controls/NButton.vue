<script setup>
import { NuxtLink } from '#components'
import NLink from "~/components/controls/NLink.vue";

const props = defineProps({
  to: Object,
  style: String, // light, middle, style1
});

const styles = computed( () => ({
  'btn-stl1': props.style === 'style1',
  'btn-stl2': props.style === 'style2',
  'btn-stl3': props.style === 'style3',
  'btn-stl4': props.style === 'style4',
}));
</script>

<template>
  <Component :is="to ? NLink : 'button'"
             :to="to || undefined"
             :class="['nst-btn', styles]">
    <slot />
  </Component>
</template>

<style scoped>

.nst-btn {
  --btn-h: 5rem;
  position: relative;
  background-color: #000;
  color: #fff;
  /*box-shadow: inset 0 0 0 .2rem var(--active);*/
  border-style: solid;
  border-width: .1rem;
  border-color: transparent;
  /*border-radius: var(--br);*/
  padding: .6rem 1rem;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1.2em;
  /*font-weight: 500;*/
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;
  text-decoration: none;
  /*width: -webkit-fill-available;*/
  min-height: var(--cntl-h);
  transition: all .2s;
}
.nst-btn:hover {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+Cg==');
}

.btn-stl1 {
  background-color: transparent;
  color: #000;
}
.btn-stl2 {
  background-color: var(--bg);
  color: #000;
}
.btn-stl3 {
  background-color: transparent;
  border-color: #000;
  color: #000;
  /*backdrop-filter: blur(.5rem) saturate(300%);*/
}
.btn-stl4 {
  background-color: #00000011;
  color: #000;
}
</style>