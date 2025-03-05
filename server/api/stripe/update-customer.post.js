import Stripe from 'stripe';

export default defineEventHandler( async (event) => {
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // cus_RKgnDppGYOp7T4
  try {
    const customer = await stripe.customers.update( body.id, body.params );

    return customer
  } catch (error) {
    console.error('Error creating Customer:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating customer',
    });
  }
})