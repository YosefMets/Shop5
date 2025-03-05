export const stripe = {
  server: {
    key: process.env.STRIPE_SECRET_KEY,
    options: {
      // your api options override for stripe server side
      // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
    },
    // CLIENT
  },
  client: {
    key: process.env.NUXT_STRIPE_PUBLIC_KEY,
    // manualClientLoad: true, // if you want to have control where you are going to load the client
    // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
    options: {},
  },
}