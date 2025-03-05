<script setup>
const { locale } = useI18n();
const content = ref(null);
content.value = await $fetch( `/api/articles/terms/${locale.value}` );
</script>

<template>
  <div v-if="content" v-html="content" />
</template>

<style scoped>

</style>