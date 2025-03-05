import Stripe from 'stripe';

export default defineEventHandler( async (event) => {
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const customer = await stripe.customers.search({ query: body });

    return customer
  } catch (error) {
    console.error('Error creating Customer:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating customer',
    });
  }
})