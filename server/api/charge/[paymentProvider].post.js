import Stripe from 'stripe';

const stripeCharge = async ( stripe, {
                              amount,
                              currency,
                              token: source,
                              orderId: receipt_number
  }) => {

  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  console.log(stripe)

  const charge = await stripe.charges.create({
    amount,
    currency,
    source,
    receipt_number
  });

  return charge
}



export default defineEventHandler( async (event) => {

  const { paymentProvider } = getRouterParams( event );
  const body = await readBody( event );

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card'], // Укажите нужные типы методов оплаты
  });


  return setupIntent;

  const charge = await stripe.charges.create({
    amount: 100,
    currency: 'eur',
    source: "tok_1QkUpzHyfA30IheYxSgGt7Vl",
    metadata: {
      a: 1
    }
  });

  return charge
  // console.log('QQQQQQQQ', stripe);

  let res;

  switch ( paymentProvider ) {
    case 'stripe':
      res = await stripeCharge( stripe, body );
      break;
    default:
      break;
  }

  return res;

});