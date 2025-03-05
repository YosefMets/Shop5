// import {useAppStore} from "~/stores/appStore";

export default defineNuxtRouteMiddleware(async (to, from) => {

  // console.log( to );

  const { meta, params, query } = to;
  const appStore = useAppStore();
  const { entityId, db, dirs, items, brandsSlugs, countries, currencies, filters } = storeToRefs( appStore );
  const { user } = storeToRefs( useUserStore() );

  const { $i18n, $direction } = useNuxtApp();
  const locale = $i18n.locale.value;

  entityId.value = (meta?.prefix && params?.id) ? meta.prefix + params.id : null;

  // server only for redirects
  if (process.server) {

    useHead({
      htmlAttrs: {
        // dir: computed( () => $direction() ),
      },
    });

    const { default: importedCCS } = await import('assets/ccs.json');
    countries.value = importedCCS.countries;
    currencies.value = importedCCS.currencies;

    const country = countries.value?.[params.countrySlug];

    if (country) {
      user.value.country = country.ISO;
      const countryCurrency = countries.value?.[country.ISO]?.C
      if (db.value?.currencies?.[countryCurrency]) {
        user.value.currency = countryCurrency
      }
    } else if (params.countrySlug) {
      throw createError({statusCode: 404, statusMessage: 'Page Not Found'});
    } else {
      const countryIso = await getCountryByIp();
      return navigateTo({path: `/${locale}/${countryIso}`, query})
    }

    let t;
    t = Date.now()
    db.value = await $fetch(`/api/db/${locale}`);
    console.log('Fetching DB own api:', Date.now() - t, 'ms');
    prepareDB();
  }
  const nuxtApp = useNuxtApp();
  const firstClientSide = process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered;

  const entity = db.value?.[entityId.value];
  // if ( !(entity?.S === params.slug) ) throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });

  // const brand = brandsSlugs.value?.[params.brandSlug] || null;
  // appStore.activateBrand(brand || null);

  /*
  if (meta.prefix === 'i') {
    // appStore.activateItem(entity);
  }
  else if (meta.prefix === 'page')
    appStore.activatePage(entity);
  else if (entity) {
    // appStore.activateGroup(entity);
  }
  else {
    // appStore.activateItem(null);
    // appStore.activatePage(null);
    // appStore.activateGroup(null);
  }
  */

  return true;
})
