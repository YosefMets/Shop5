// import {useAppStore} from "~/stores/appStore.js";
// import {useUserStore} from "~/stores/userStore.js";

export default function () {
  const { db, dirs, items, brands, currencies, currency, activeGroup } = storeToRefs( useAppStore() );
  const { user } = storeToRefs( useUserStore() );

  items.value?.forEach( item => {
    if (item?.['%']) item['$%'] = Math.floor( item.$ * (100 - item?.['%']) ) / 100;

    const price = ( item?.['$%'] || item.$ ) * ( db.value?.currencies?.[user.value.currency] || 1 );
    // console.log(1);
    item.price = Math.round(( price ) * 100) / 100;

    let dir = db.value?.[item.P];
    while (dir) {
      dir.items = dir.items || [];
      dir.items.push( item );
      dir = db.value?.[dir.P];
    }

    const brand = db.value?.[item.B];
    if (!brand.items) brand.items = [];
    brand.items.push( item );

    const wKg = item.w ? !(item.w < 800) : null
    const vL = item.v ? !(item.v < 800) : null
    item.unit = wKg !== null ? (wKg ? 'kg' : 'g') : vL !== null ? (vL ? 'l' : 'ml') : null
  });

  dirs.value?.forEach( dir => {
    if (!dir.items) dir.items = [];

    if (dir.P && db.value?.[dir.P]) {
      db.value[dir.P].children = db.value?.[dir.P].children || [];
      db.value?.[dir.P].children.push( dir.I )
    }

    dir.keywords = getKeywords( dir );
  });

  brands.value?.forEach( brand => {
    if (brand.items?.length) {
      brand.dirs = Array.from( new Set( brand.items?.map( ({ P }) => P ) ) )
                        ?.map( dirId => db.value?.[dirId] )
    }
  });

  return true;
}