<script setup>
import SvgV from "~/components/imgs/svg-v.vue";
import NDropdown from "~/components/controls/NDropdown.vue";

const { sorts, activeSort } = storeToRefs( useAppStore() );
const { t } = useI18n();


const isOpen = ref(false);

const sorting = (sorting) => {
  if (activeSort.value !== sorting)
    activeSort.value = sorting
}
</script>

<template>

  <NDropdown :placeholder="$t(activeSort)"
             class="sort">

    <div v-for="sort in sorts"
         @click="sorting(sort)"
         :class="{ curr: (activeSort === sort) }">

      {{ $t(sort) }}

    </div>

  </NDropdown>

</template>

<style scoped>

@media (max-width: 480px) {

}
</style>
