import Stripe from 'stripe';

export default defineEventHandler( async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card'], // Укажите нужные типы методов оплаты
  });
  return setupIntent.client_secret;
})