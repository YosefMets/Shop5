<script setup>
const props = defineProps({
  items: Array,
  increment: {
    type: Number,
    default: 150
  }
})

const i = ref(props.increment);
const itemsForRender = computed(() => props.items.slice(0, i.value))

// watch(p.items, ()=>{ i.value = p.increment; more(); })
const more = () => {
  if (itemsForRender.value.length === props.items.length || itemsForRender.value.length > 100)
    return;

  setTimeout(() => { i.value += props.increment; more() }, 3000);
}
more();
</script>

<template>
  <div class="items">
    <Item v-for="(item, i) in itemsForRender" :key="item.I" :item="item" />
  </div>
</template>

<style scoped>
.items {
  /*padding: .2rem 0;*/
  padding: .2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  /*grid-auto-rows: 21.5rem;*/
  grid-gap: 2rem;
  grid-auto-flow: dense;
  align-self: flex-start;
  position: relative;
  width: 100%;
}
.items.justify-right {
  transform: scaleX(-1);
}
.items.justify-right > .item {
  transform: scaleX(-1);
}
.title {
  position: sticky;
  /*top: calc( var(--bar-height) + var(--menu-height) );*/
  /*z-index: 20;*/
  background-color: #fff;
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  overflow: hidden;
}
.title:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #fff 20%, #ffffff66 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ffffff",GradientType=1);
  /*background-color: #00000088;*/
}
.title > .inside {
  position: relative;
  z-index: 10;
  padding: 2rem;
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
}
.title h1 {
  color: #000;
  margin: 0;
  line-height: 1em;
  font-size: 2.6rem;
  font-stretch: 50%;
}
.title .sort {
  flex-direction: column;
  align-items: flex-start;
  margin-left: -.5rem;
  color: #000;
}

@media (max-width: 480px) {
  .items {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    grid-auto-rows: auto;
    grid-gap: 1rem;
    /*padding: .5rem;*/
  }
  .items.justify-right {
    transform: scaleX(1);
  }
  .items.justify-right > .item {
    transform: scaleX(1);
  }

  .title {
    grid-column: 1 / -1;
  }
}
</style>
