import {useAppStore} from "~/stores/appStore";

export default () => {
  const { db, scopedItems, filters, priceMin, priceMax } = storeToRefs( useAppStore() );

  const filtersKeys = Object.keys( filters.value || {} );
  if ( !filtersKeys.length ) return scopedItems.value;

  return scopedItems.value.filter( (item) => {
    return filtersKeys.reduce( ( res, filter) => {
        const isBoolean = db.value?.[filter]?.W === 'boolean';
        if ( isBoolean ) return res && ( !!item[filter] )
        // console.log( filter, filters.value[filter], 'Is boolean', isBoolean );
        return res && [item?.[filter]]
          .flat()
          .reduce( (rres, ffilter) => {
            return rres || filters.value[filter]?.includes(ffilter+'')
          }, false)
      }, true)
      && (priceMin.value ? priceMin.value <= item.price : true)
      && (priceMax.value ? priceMax.value >= item.price : true)
  })

}