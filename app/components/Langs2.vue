<script setup>
import SvgCheck from "~/components/imgs/svg-check.vue";

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const { $direction } = useNuxtApp()
const appStore = useAppStore();
const { db, dbArray, activeItem, activeGroup, activeBrand, activePage, dirs } = storeToRefs( appStore );

watch( locale, async n => {
  const activeItemId = activeItem.value?.I
  const activeGroupId = activeGroup.value?.I
  const activeBrandId = activeBrand.value?.I
  db.value = await $fetch(`/api/getDB/${n}`);
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
  <ul class="lngs">
    <li v-for="lcl in locales" class="lng-wr">

      <NuxtLink v-if="locale !== lcl.code"
                :to="switchLocalePath( lcl.code )"
                :class="['lng', { 'curr-locale': locale === lcl.code }]">
        {{ lcl.N }}
      </NuxtLink>

      <span v-else class="lng-curr">
        {{ lcl.N }}
      </span>

    </li>
  </ul>
</template>

<style scoped>
.lngs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  border: .1rem solid var(--contr);
  border-radius: var(--br);
  height: var(--search-height);
  overflow: hidden;
}
.lng-wr {
  margin: 0;
  display: flex;
  border-right: .1rem solid var(--contr);
}
.lng-wr:last-of-type { border-right: none; }

.lng,
.lng-curr {
  color: #000;
  text-decoration: none;
  padding: .2rem 1rem;
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