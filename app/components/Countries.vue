<script setup>
import NMiniButton from "~/components/controls/NMiniButton.vue";

const { t } = useI18n()
const route = useRoute();
const { db, countries, country, userCountry, userCurrency } = storeToRefs( useAppStore() );
const { user } = storeToRefs( useUserStore() );

const hints = computed(() =>
    Object.keys(countries.value)
        .filter( iso => countries.value?.[iso]?.M )
        .map( iso => ({ iso, n: t(`countries.${iso}`) }) )
        .sort((a,b) => b.n - a.n)
)

const set = (iso) => {
  userCountry.value = iso;
  user.value.country = iso;
  const countryCurrency = countries.value?.[country.value?.ISO].C
  if (!userCurrency.value && db.value?.currencies?.[countryCurrency])
    user.value.currency = countryCurrency
}
</script>

<template>

<!--  <Modal :show="route.query?.['choose-country'] !== undefined"-->
<!--         :width="'15rem'"-->
<!--         @close="navigateTo({ query: {...route.query, ['choose-country']: undefined} })">-->

<!--    <h2 class="lcl-ttl">{{ $t('country') }}:</h2>-->



    <div v-if="hints.length" class="main-cntrs">

      <NMiniButton v-for="cntry in hints"
                   class="main-cntr-btn"
                   :current="cntry.iso === country?.ISO">

        <template #icon>
          <NuxtImg :src="`/${cntry.iso}.svg`" loading="lazy" class="main-cntr-flag" alt="" />
        </template>

        <NuxtLink :to="{ path: getNewCountryInURL(cntry.iso), query: route.query }"
                  :class="['main-cntr']"
                  @click="set(cntry.iso)">
          {{ cntry.n }}
        </NuxtLink>

      </NMiniButton>

    </div>

<!--  </Modal>-->
</template>

<style scoped>
.main-cntrs {
  list-style: none;
  margin: 0;
  padding: 0;
  /*columns: 2;*/
  column-gap: 3rem;
  /*gap: .5rem;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: flex-start;*/
  /*columns: 2;*/
  /*width: fit-content;*/
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: .5rem;

}
.main-cntr-btn {
  width: max-content;
  /*margin-bottom: .5rem;*/
  display: inline-flex;
}
.main-cntr {
  margin: 0;
  /*padding: .6rem;*/
  display: inline-flex;
  align-items: center;
  grid-gap: .4rem;
  /*font-size: 1.2rem;*/
  /*line-height: 1em;*/
  border-radius: var(--br);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
.main-cntr:hover {
  color: inherit;
}
.main-cntr-curr {
  cursor: default;
  box-shadow: inset 0 0 0 .05rem var(--contr);
  background-color: #fff;
  color: var(--active);
}
.main-cntr-flag {
  width: 80%;
  height: 80%;
  border-radius: 50%;
}
.chs-cntr-or {
  margin: 1rem 0 .5rem;
}

@media (max-width: 480px) {

}
</style>