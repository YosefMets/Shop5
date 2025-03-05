import {useAppStore} from "~/stores/appStore";

export default (paramsFilters) => {
  const { params } = useRoute();
  const { db, dbSlug, priceMin, priceMax } = storeToRefs( useAppStore() );

  const res = (paramsFilters || [])
    .reduce( (res, filter) => {
      const entity = dbSlug.value?.[filter];
      if ( !entity ) return res;
      if ( entity.F ) {
        const x = db.value?.[entity.F].I;
        const v = entity;
        if ( !res[x] ) res[x] = [];
        if ( !res[x].includes(v.I) ) res[x].push(v.I);
      }
      else res[entity.I] = true
      return res
    }, {})

  return res;


  return (paramsFilters || [])
      .map( filter => {
        const [ id, value ] = filter.split('-');
        if (id === 'min') { priceMin.value = value * 1; return null }
        if (id === 'max') { priceMax.value = value * 1; return null }
        const key = db.value?.[id];
        const res = (key?.P)
            ? [ db.value?.[key.P]?.I, key?.I || id ]
            : [ key?.I || id, value ]
        return ( res[0] && res[0] !== 'min' && res[0] !== 'max' && ( res[1] || key?.W === 'b' ) ) ? res : null
      })
      .filter( pair => pair )
      .reduce( (f, [ char, value ]) => {
        if ( db.value?.[char]?.W === 'b' ) return f[char] = true
        if ( !f[char] ) f[char] = [];
        f[char].push(value);
        return f
      }, {});
}