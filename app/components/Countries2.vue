<script setup>
const { t } = useI18n()
const route = useRoute();
const { db, countries, country, userCountry, userCurrency } = storeToRefs( useAppStore() );
const { user } = storeToRefs( useUserStore() );

const hints = computed(() =>
    Object.keys(countries.value)
        .filter( iso => countries.value?.[iso].M )
        .map( iso => ({ iso, n: t(`countries.${iso}`) }) )
        .sort((a,b) => b.n - a.n)
)

const set = (iso) => {
  userCountry.value = iso;
  user.value.country = iso;
  const countryCurrency = countries.value?.[country.value.ISO].C
  if (!userCurrency.value && db.value?.currencies?.[countryCurrency])
    user.value.currency = countryCurrency
}
</script>

<template>
  <div v-if="hints.length" class="main-cntrs">
    <NuxtLink v-for="cntry in hints"
              @click="set(cntry.iso)"
              :to="{ path: getNewCountryInURL(cntry.iso), query: route.query }"
              :class="['main-cntr', { 'main-cntr-curr': cntry.iso === country?.ISO }]">
      <img :src="`/flags/${cntry.iso}.svg`" loading="lazy" class="main-cntr-flag" alt="" />
      {{ cntry.n }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.main-cntrs {
  list-style: none;
  margin: 0;
  padding: 0;
  columns: 2;
  column-gap: 1rem;
}
.main-cntr {
  margin: 0;
  padding: .6rem;
  display: flex;
  align-items: center;
  grid-gap: .4rem;
  /*font-size: 1.2rem;*/
  line-height: 1em;
  border-radius: var(--br);
  cursor: pointer;
  text-decoration: none;
  color: #000;
}
.main-cntr:hover {
  color: var(--active);
}
.main-cntr-curr {
  cursor: default;
  box-shadow: inset 0 0 0 .05rem var(--contr);
  background-color: #fff;
  color: var(--active);
}
.main-cntr-flag {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}
.chs-cntr-or {
  margin: 1rem 0 .5rem;
}

@media (max-width: 480px) {

}
</style>