// import getFilteredItems from "#build/composables/getFilteredItems.js";

Array.prototype.removeElement = function (element) {
  const pos = this.indexOf(element);
  if (pos !== -1) {
    this.splice(pos, 1)
  }
  return this
}

export const useAppStore = defineStore('app', () => {
  const { user, isAuthorized, viewed } = storeToRefs( useUserStore() );
  const sortsFunctions = {
    'priceUp': ( a, b ) => a.price - b.price,
    'priceDown': ( a, b ) => b.price - a.price,
  };

  const entityId = ref(null);
  const db = ref(null);
  const activeGroup = ref(null);
  const activeBrand = ref(null);
  const activeItem = ref(null);
  const activePage = ref(null);
  const filters = ref({});
  const priceMin = ref(null);
  const priceMax = ref(null);
  const query = ref('');
  const countries = ref(null);
  const currencies = ref(null);
  const userCountry = ref(null);
  const userCurrency = ref(null);
  const storages = ref(null);
  const sorts = ref( Object.keys( sortsFunctions ) );
  const activeSort = ref('priceUp');

  const dbArray = computed( () => db.value ? Object.values( db.value ) : null );
  const dbSlug = computed( () => db.value ? Object.values( db.value ).reduce( (res, en) => (en.S ? {...res, [en.S]: en} : res), {} ) : null );
  const items = computed( () => dbArray.value?.filter( ({ W }) => W === 'I' ) || null);
  const dirs = computed( () => dbArray.value?.filter( ({ W }) => W === 'D' ) || null);
  const brands = computed( () => dbArray.value?.filter( ({ F }) => F === 'B' ) || null);
  const brandsSlugs = computed( () => brands.value?.reduce( (res, brand) => {res[brand.S] = brand; return res}, {}));
  const scopedItems = computed( () => {
    const brandItems = activeBrand.value?.items;
    const dirItems = activeGroup.value?.items;
    return (brandItems && dirItems)
        ? brandItems.filter( item => dirItems.includes( item ))
        : (brandItems || dirItems || items.value);
  });
  const displayedItems = computed( () => {
    let res;
    if (activeBrand.value?.items || activeGroup.value?.items) {
      res = getFilteredItems();
    } else {
      if (query.value.length < 2) return scopedItems.value;
      const qry = query.value.replace(/^ *| *$/g, '').toLowerCase();
      const first = scopedItems.value.filter((item) => item.N.toLowerCase().indexOf(qry) === 0)
      const second = scopedItems.value.filter((item) => item.N.toLowerCase().indexOf(qry) > 0)
      res = first.concat(second);
    }
    return res.sort( ( a, b ) => sortsFunctions?.[activeSort.value]( a, b ) );
  });
  const itemsMinMax = computed( () => {
    return { min: 0, max: 1000 }
    // const a = displayedItems.value?.map( ({price}) => price).sort( ( a, b ) => a-b );
    // return { min: a?.[0], max: a?.[a.length-1] };
  } );

  const country = computed( () => countries.value?.[user.value.country]);
  const currency = computed( () => currencies.value?.[user.value.currency]);
  const storage = computed( () => storages.value?.[country.value?.S]);

  watch( () => currency.value, (n) => {
    items.value?.forEach( item => {
      const price = ( item?.['$%'] || item.$ ) * ( db.value?.currencies?.[n.ISO] || 1 );
      item.price = Math.round(( price ) * 100) / 100;
    });
  });
  /*
  const keywords = computed( () => {
    if (!activeGroup.value?.X) return null
    let res = scopedItems.value.flatMap( item => Object.keys( activeGroup.value.X ).map( char => char+'='+item?.[char] ) );
    res = Array.from( new Set( res ) ).map( val => {
      const [ c, v ] = val.split('=');
      return { char: c, value: v }
    });
    // return Array.from( new Set( res.map( val => db.value?.[val]?.N || val ) ) );
    return res;
  });
  */
  /*
  const filtersQuery = computed( () => {
    return Object.values( filters.value )
      .flat()
      .map( value => db.value?.[value]?.I + '-' + db.value?.[value]?.S)
      .reduce( (res, query) => { res[query] = null; return res }, {});
  })
  const filterSlug = computed( () => {
    return Object.values( filters.value )
      .flat()
      .map( value => db.value?.[value]?.I + '-' + db.value?.[value]?.S)
      .join('&');
  })
  const filterStrings = computed( () => {
    return Object.values( filters.value )
      .flat()
      .map( value => db.value?.[value]?.I + '-' + db.value?.[value]?.S);
  })
  */

  const activateItem = _activeItem => {
    activeItem.value = _activeItem;
  }
  const activateGroup = _activeGroup => {
    activeGroup.value = _activeGroup;
    // console.log(_activeGroup);
    // if (process.client) window.scroll({ top: 0 });
  }
  const activateBrand = _activeBrand => {
    activeBrand.value = _activeBrand;
    if (process.client) window.scroll({ top: 0 });
  }
  const activatePage = _activePage => {
    activePage.value = _activePage;
  }
  /*
  const applyFilter = ({ char, value }) => {
    if (filters.value?.[char]?.includes(value))
      removeFilter({ char, value });
    else
      addFilter({ char, value });
    navigateTo({ query: filtersQuery.value });
    console.log(filtersQuery.value);
  }
  const addFilter = ({ char, value }) => {
    console.log(filters.value?.[char])
    if (!filters.value[char]) filters.value[char] = [];
    filters.value?.[char].push(value);
  }
  const removeFilter = ({ char, value }) => {
    console.log('???')
    filters.value?.[char].splice(filters.value?.[char].indexOf(value), 1);
    if (!filters.value?.[char].length || value === undefined)
      delete filters.value?.[char]
  }
  */

  return {
    entityId,
    db, dbArray, dbSlug, activeGroup, activeBrand, activeItem,
    items, dirs, brands, brandsSlugs,
    scopedItems, displayedItems, itemsMinMax,
    filters, query, priceMin, priceMax,
    sorts, activeSort,
    countries, currencies, userCountry, userCurrency,
    country, currency, storage,
    activateItem, activateGroup, activateBrand, activatePage,
  }
});