<script setup>
import NLink from "~/components/controls/NLink.vue";
import NDropDown from "~/components/controls/NDropdown.vue";
const { t } = useI18n();

const { db, activeGroup, activeBrand, currency, priceMin, priceMax } = storeToRefs( useAppStore() );

const plh = ref(t('price'));
const placeholder = computed( () => priceMin.value || priceMax.value ? getDisplayedValue(priceMin.value, priceMax.value) : plh.value );
const filters = computed( () => activeGroup.value?.MM?.map(([min, max]) => [min ? getCurrentPrice(min) : null, max ? getCurrentPrice(max) : null]) );

const current = (min, max) => {
  return ((min && min === priceMin.value) || (!min && !priceMin.value)) &&
         ((max && max === priceMax.value) || (!max && !priceMax.value))
}

const getDisplayedValue = (min, max) => currency.value.S + (min || 0) + (max ? '&#151;' : '&nbsp;'+t('andMore')) + (max ? currency.value.S + max : '');
</script>

<template>
  <NDropDown v-if="filters"
             :placeholder="placeholder"
             :multiple="false"
             :x="false"
             :selected="priceMin || priceMax"
             class="p-fltrs">

    <NLink v-for="[min, max] in filters"
           :to="activeGroup"
           :brand="activeBrand"
           :min="current( min, max ) ? null : min"
           :max="current( min, max ) ? null : max"
           :filters="true"
           :class="['p-fltr', { curr: current( min, max )}]"
           @click="">

      <span v-html="getDisplayedValue(min, max)" />

    </NLink>

  </NDropDown>

</template>

<style scoped>
.p-fltrs {
  /*width: 7rem;*/
}
.p-fltr {
  /*cursor: pointer;*/
  /*padding: .5rem 1rem;*/
  /*background-color: var(--bg2);*/
  /*display: flex;*/
  /*align-items: center;*/
  /*height: var(--cntl-h);*/
  /*color: #000;*/
  /*box-shadow: inset 0 0 0 .05rem #000000;*/
}
.p-fltr:first-of-type { border-radius: var(--br) 0 0 var(--br); }
.p-fltr:last-of-type { border-radius: 0 var(--br) var(--br) 0; }

.p-fltr.curr {
  /*background-color: #000;*/
  /*color: var(--active);*/
}
</style>