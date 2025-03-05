import {useAppStore} from "~/stores/appStore";
export default (price) => {
  const { db, currency } = storeToRefs( useAppStore() );
  const $  = price * (db.value?.currencies?.[currency.value?.ISO]?.K || 1);
  return Math.round(( $ ) * 100) / 100;
}