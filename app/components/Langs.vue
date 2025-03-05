<script setup>
import NMiniButton from "~/components/controls/NMiniButton.vue";

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const { $direction } = useNuxtApp()
const appStore = useAppStore();
const { db, dbArray, activeItem, activeGroup, activeBrand, activePage, dirs } = storeToRefs( appStore );

watch( locale, async n => {
  const activeItemId = activeItem.value?.I
  const activeGroupId = activeGroup.value?.I
  const activeBrandId = activeBrand.value?.I
  db.value = await $fetch(`/api/db/${n}`);
  prepareDB();
  // await new Promise( resolve => setTimeout( resolve, 10))
  if (activeItemId) appStore.activateItem( db.value?.[activeItemId] );
  if (activeGroup.value) appStore.activateGroup( db.value?.[ activeGroupId ] );

  useHead({
    htmlAttrs: {
      dir: computed( () => $direction() ),
    },
  });
});
</script>

<template>

<!--  <Modal :show="route.query?.['choose-language'] !== undefined"-->
<!--         :width="'16rem'"-->
<!--         @close="navigateTo({ query: {...route.query, ['choose-language']: undefined} })">-->

<!--    <h2 class="lcl-ttl">{{ $t('language') }}:</h2>-->

    <div class="lngs">
      <NMiniButton v-for="lcl in locales"
                   class="lng-btn"
                   :current="locale === lcl.code">

        <NuxtLink :to="switchLocalePath( lcl.code )"
                  :class="['lng', { 'curr-locale': locale === lcl.code }]">
          {{ lcl.N }}
        </NuxtLink>

      </NMiniButton>
    </div>

<!--  </Modal>-->
</template>

<style scoped>
.lngs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  grid-gap: .5rem;
  /*border: .1rem solid var(--contr);*/
  /*border-radius: var(--border-radius);*/
  /*height: var(--search-height);*/
  /*overflow: hidden;*/
}
.lng-btn {
  width: max-content;
  display: inline-flex;
}
.lng-wr {
  margin: 0;
  display: flex;
  border-right: .1rem solid var(--contr);
}
.lng-wr:last-of-type { border-right: none; }

.lng,
.lng-curr {
  color: inherit;
  text-decoration: none;
  /*padding: .2rem 1rem;*/
  display: flex;
  align-items: center;
}
.lng:hover {
  color: var(--active);
}
.lng-curr {
  color: var(--active);
  cursor: default;
  background-color: #fff;
  border-color: var(--contr);
}

@media (max-width: 480px) {
  .lng,
  .lng-curr {
    /*font-size: 1.2rem;*/
    /*line-height: 1.4em;*/
  }
}
</style>