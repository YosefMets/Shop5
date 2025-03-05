// import {useCartStore} from "~/stores/cartStore";
import {useAppStore} from "~/stores/appStore";

export const useUserStore = defineStore('user', () => {
  const { items } = storeToRefs( useAppStore() );
  // const cartStore = useCartStore();
  // const { items: cartItems } = storeToRefs( cartStore );

  const user = ref({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    shippings: [],
    payments: [],
    country: 'at',
    currency: 'eur'
  });
  const isAuthorized = ref(false);

  const viewed = ref([]);
  const favorites = ref([]);

  return {
    user, isAuthorized,
    viewed, favorites,
  }
});
