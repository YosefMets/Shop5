<script setup>
const props = defineProps({ item: Object });

const images = computed( () => {
  const media = props.item?.M
  return media
      ? new Array(media).fill().map((x, i) => `/${props.item.I}-${i}.avif`)
      : null
})
</script>

<template>
  <div class="gallery">
    <template v-if="images">
      <div v-for="img in images" class="gal-item">
        <NuxtImg :src="img"
                 :alt="item.N"
                 :key="item.I"
                 loading="lazy" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}
.gal-item {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #fff;
}
.gal-img {
  display: block;
  object-fit: contain;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
}
</style>