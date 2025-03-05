import {useAppStore} from "~/stores/appStore";

export default (dir) => {
  const { db, activeGroup, scopedItems } = storeToRefs( useAppStore() );

  const items = dir?.items || scopedItems.value;
  if (!dir) dir = activeGroup.value;

  if (!dir?.X) return null;

  let allKeywords = items.flatMap( item => {
    // return Object.keys(dir.X)?.map(x => dir.X?.[x]?.K && item?.[x] !== undefined ? `${x}^${item?.[x]}^${typeof item?.[x]}` : null).filter( a => a );
    return Object.keys(dir.X)?.map( x => {
      return dir.X?.[x]?.K && item?.[x] !== undefined ? `${x}^${item?.[x]}^${db.value?.[x]?.W || 's'}` : null
    }).filter( a => a );
  });

  allKeywords = Array.from( new Set( allKeywords ) )?.map( val => {
    const [c, V, type] = val.split('^');
    let v;
    switch (type) {
      case 'boolean':
        v = (V === 'true');
        break;
      case 'number':
        v = Number(V);
        break;
      default:
        v = V;
    }
    return { char: c, value: v, type }
  });

  allKeywords.forEach( ({ char, type }) => {
    // console.log( type, allKeywords.filter( charValue => charValue.char === char ) )
  })
  // console.log(allKeywords.filter( ({ char, type }) => type !== 'boolean' || !(allKeywords.filter( charValue => charValue.char === char ).length === 1)))

  return allKeywords
      .filter( ({ char, type }) => type === 'boolean' || !(allKeywords.filter( charValue => charValue.char === char ).length === 1))
      .sort( (a, b) => (db.value?.[b.value]?.U || 0) - (db.value?.[a.value]?.U || 0) );
}