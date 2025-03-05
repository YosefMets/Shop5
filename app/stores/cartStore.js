export const useCartStore = defineStore('cart', () => {
  // const appStore = useAppStore();
  // const { db } = storeToRefs( appStore );

  const items = ref([]); // { item, size, qty }
  const isOpen =ref(false);

  const getItemIndex = (xItem, xSize) => items.value.findIndex( ({ item, size }) => item.I === xItem.I && size === xSize );

  const total = computed(()=> items.value.reduce( (t, { item, qty, toDel }) => t + (!toDel ? (item.price * qty) : 0), 0));
  const quantity = computed(()=> items.value.reduce( (q, { qty, toDel }) => q + qty, 0) ); // .toFixed(0)

  const add = ( item, size, qty = 1 ) => {
    const existCartItemIndex = getItemIndex(item, size);
    // console.log(existCartItemIndex);
    if (existCartItemIndex !== -1) {
      // move forward
      items.value[existCartItemIndex].qty += qty;
      items.value.unshift( items.value.splice(existCartItemIndex, 1)[0] );
      // console.log(items.value);
    } else {
      // add
      // console.log('1', items.value);
      items.value.unshift({ item, size, qty });
      // console.log('2', items.value);
    }

    // console.log(useGtagParams( [{ item, size, qty }] ));
    // GTagEvent('add_to_cart', useGtagParams( [{ item, size, qty }] ));
  }
  const remove = (item, size) => {
    const i = getItemIndex(item, size);
    if (i !== -1) items.value.splice( i, 1 );
    // GTagEvent('remove_from_cart', useGtagParams( [{ item, size }] ));
  }
  const clear = () => items.value.splice(0);

  return {
    items, isOpen,
    total, quantity,
    add, remove, clear, getItemIndex
  }
});
