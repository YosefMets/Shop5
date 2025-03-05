<script setup>
const { t } = useI18n()
const route = useRoute();
const { locale, locales } = useI18n();
const { currencies, country, currency } = storeToRefs( useAppStore() );
</script>

<template>
  <NuxtLink :to="{ query: {...route.query, ['settings']: null} }" class="ccs-call-wr">
    <div class="ccs-call cntr-call">
      <NuxtImg :src="`/${country.ISO}.svg`" loading="lazy" class="ccs-flag" :alt="country.ISO" />
      <span class="ccs-cntr-name">
        {{ $t(`countries.${country.ISO}`) }}
      </span>
    </div>
    <div class="ccs-call curr-call">
      {{ currency?.S }}&nbsp;{{ $t(`currencies.${currency.ISO}`) }}
    </div>
    <div class="ccs-call lang-call">
      {{ locales.find( ({ code }) => code === locale )?.N }}
    </div>
  </NuxtLink>

  <Modal :show="route.query?.['settings'] !== undefined"
         :width="'30rem'"
         :side="'left'"
         @close="navigateTo({ query: {...route.query, ['settings']: undefined} })">

    <div class="settings-lang-curr">
      <div>
        <h2 class="ccs-ttl">{{ $t('language') }}:</h2>
        <Langs />
      </div>

      <div>
        <h2 class="ccs-ttl">{{ $t('currency') }}:</h2>
        <Currencies />
      </div>
    </div>

    <h2 class="ccs-ttl">{{ $t('country') }}:</h2>
    <Countries />

  </Modal>
</template>

<style scoped>
.ccs-call-wr {
  /*container: ccs-call-wr / size;*/
  margin-left: -1rem;
  padding: 0 .5rem 0 1rem;
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-template-rows: auto;
  grid-gap: .3rem;
}
.ccs-call-wr:hover {
  color: #000;
  background-color: var(--hover-bg-dark);
}
@container ccs-call-wr (max-width: 6rem) {
  .ccs-call.curr-call {
    display: none;
  }
}

.ccs-call {
  display: flex;
  grid-gap: .5rem;
  align-items: center;
  cursor: pointer;
  padding: .4rem .3rem;
  /*height: 100%;*/
  text-decoration: none;
  transition: all .2s;
  /*border-radius: var(--br);*/
  /*white-space: nowrap;*/
  overflow: hidden;
  /*text-overflow: ellipsis;*/
}
.ccs-flag {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  box-shadow: 0 0 0 0.15rem #fff;
}
.ccs-current-settings {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /*width: 100%;*/

  /*display: -webkit-box;*/
  /*-webkit-line-clamp: 2;*/
  /*-webkit-box-orient: vertical;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*line-height: 1.2em;*/
}

.ccs-ttl {
  margin: 2rem 0 1rem 0;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.2rem;
  border-bottom: .1rem solid var(--active-bg);
  padding-bottom: 1rem;
}
.ccs-ttl:first-of-type { margin-top: 0; }

.settings-lang-curr {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  margin-bottom: 3rem;
}

@media (max-width: 480px) {
  .ccs-call-wr {
    margin: 0;
    height: 100%;
    padding: 0;
    display: flex;
  }
  .ccs-call.cntr-call {
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ccs-call.curr-call,
  .ccs-call.lang-call {
    display: none;
  }
  .ccs-flag {
    width: 2rem;
    height: 2rem;
  }
  .ccs-cntr-name { display: none; }
}
</style>