<script setup>
const route = useRoute();
const path = computed( () => route.path );
const localePath = useLocalePath();

const { db, filters, priceMin, priceMax, country } = storeToRefs( useAppStore() );
const { user } = storeToRefs( useUserStore() );

const props = defineProps({
  to: [Object, String],
  brand: Object,
  filters: [Object, Array, Boolean],
  min: [Object, Number],
  max: [Object, Number],
  query: Object,
});

const filtersQuery = computed( () => {
  if ( !props.filters ) return undefined;

  const dblFilters = JSON.parse(JSON.stringify(filters.value));
  const _filters = props.filters === true ? [] : [props.filters];

  _filters.flat().forEach( ({ char, value, type }) => {

    if ( type === 'boolean') {
      if (char in dblFilters) delete dblFilters[char];
      else dblFilters[char] = true
      return
    }

    if (dblFilters?.[char]?.includes(value)) { // если в активных фильтрах оно уже есть
      dblFilters?.[char].splice(dblFilters?.[char].indexOf(value), 1); // удалаяем это значение
      if (!dblFilters?.[char].length || value === undefined) // если больше ничего не осталось
        delete dblFilters?.[char] // удаляем этот чар
    }
    else { // если такого фильтра еще нет
      if (!dblFilters?.[char]) dblFilters[char] = []; // если чара нет, добавляем и делаем его пустым массивом
      dblFilters?.[char].push(value); // добавляем значение в этот массив
    }
  });

  return ( Object.keys( dblFilters ) || [] ).flatMap( key => {
    if ( dblFilters[key] === true ) return db.value?.[key]?.S;
    return dblFilters[key]?.map( value => {
      const entity = db.value?.[value];
      return entity.S || 'i-dont-know'
    })
  }).join('/');
});

const brandUrl = computed( () => props.brand?.I ? `/${props.brand.S}/${props.brand.I}` : '');
const filtersUrl = computed( () => filtersQuery.value ? `/${filtersQuery.value}` : '');
const min = computed( () => {
  const price = props.min === null ? null : props.min || priceMin.value || null;
  return price ? '/min-' + price : '';
});
const max = computed( () => {
  const price = props.max === null ? null : props.max || priceMax.value || null;
  return price ? '/max-' + price : '';
});

const url = computed( () => {
  let res;
  if (typeof( props.to ) === 'string') {
    if ((/^https?:\/\//i).test(props.to)) return props.to;
    res = `/${country.value.ISO}${props.to}`;
  } else if (props.to) {
    // res = '/'+country.value.ISO+brand.value+`/${props.to.I}-${props.to.S}`+min.value+max.value+(filtersQuery.value ? `/${filtersQuery.value}` : '' );
    res = '/'+country.value.ISO+brandUrl.value+`/${props.to.I}-${props.to.S}` + min.value + max.value + filtersUrl.value;
  } else if (props.to === null) {
    res = `/${country.value.ISO}`;
  } else {
    res = path.value.replace(/^\/[a-z]{2}/, '');
  }

  return localePath( res );
} )

</script>

<template>
  <NuxtLink :to="{ path: url }" :key="url"><slot /></NuxtLink>
</template>

<style scoped>

</style>