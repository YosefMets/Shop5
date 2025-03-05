<script setup>
const props = defineProps({
  current: Boolean
});
const slots = useSlots();
const icon = ref(!!slots.icon);
</script>

<template>
  <div :class="['mini-btn', { curr: current }]">
    <i v-if="icon" class="mini-btn-ic"><slot name="icon" /></i>
    <slot />
  </div>
</template>

<style scoped>
.mini-btn {
  border-radius: 10rem;
  /*border-radius: var(--br);*/
  /*background-color: #fff;*/
  padding: .3rem 1rem;
  display: flex;
  align-items: center;
  gap: .5rem;
  cursor: pointer;
  transition: background-color .2s;
  line-height: 1.5em;
}
.mini-btn:hover { background-color: #fff; }
.mini-btn-ic {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  border-radius: 50%;
  /*border-radius: var(--br);*/
  width: 1.6rem;
  aspect-ratio: 1 / 1;
  background-color: #fff;
  color: #000;
  margin: -.3rem 0 -.3rem -.8rem;
}

.mini-btn.curr {
  background-color: var(--dark);
  color: #fff;
}
.mini-btn.curr > .mini-btn-ic {
  /*background-color: #000;*/
  /*color: #fff;*/
}
</style>