// import {useAppStore} from "~/stores/appStore";
import {useUserStore} from "~/stores/userStore";

export default async () => {
  const { user, isAuthorized } = storeToRefs( useUserStore() );

  if (isAuthorized.value) return 'at'

  const ips = useNuxtApp().ssrContext.event.node.req.headers?.['x-forwarded-for']?.split(', ');
  const ip = ips?.[ips.length-1];

  const { country_code2: countryCode } = await $fetch(`https://api.iplocation.net/?ip=${ip}`);
  // const { country: countryCode } = await $fetch(`https://api.country.is/${ip}`);

  return countryCode && countryCode !== '-' ? countryCode.toLowerCase() : 'at'
}
