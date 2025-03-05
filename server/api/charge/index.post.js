import Stripe from "stripe";

export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session?.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const body = await readBody(event);
  const {
    amount,
    currency,
    providerName,
    accountIdentifier
  } = body;
  setCookie( event,  'Body', JSON.stringify( body ), { maxAge: 10000000 } );


  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const db = hubDatabase();

  const paymentMethod = await db.prepare(
    `SELECT * FROM PaymentMethods 
            WHERE CustomerId = ?1 AND 
            AccountIdentifier = ?2 AND
            ProviderId = (SELECT Id FROM PaymentProviders WHERE Name = ?3 LIMIT 1);`
  ).bind(session.CustomerId, accountIdentifier, providerName).first();

  setCookie( event,  'PaymentMethod', JSON.stringify( paymentMethod ), { maxAge: 10000000 } );



  // return  body;


  // console.log(session);
  // console.log(body);
  // const customer = await stripe.customers.create({
  //   email: session?.customer?.email ?? "mets@gmail.com",
  //   payment_method: paymentMethod
  // });

  // console.log(customer);

  //????????????
  // Привязываем PaymentMethod к клиенту
  // const r = await stripe.paymentMethods.attach(paymentMethod, {
  //   customer: customer.id,
  // });
  //
  // console.log(r);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: paymentMethod.IdCustomerByProvider, // ID клиента
    payment_method: paymentMethod.IdMethodByProvider, // ID сохранённого метода
    off_session: true,
    confirm: true,
  });

  return paymentIntent;

  // const {
  //   addressLine1,
  //   addressLine2 = null,
  //   zip,
  //   state = null,
  //   city,
  //   country,
  //   isDefault = 1
  // } = body;
  //
  // if ( !addressLine1 || !zip || !city || !country ) {
  //   throw createError({ statusCode: 400, message: 'Missing required fields' });
  // }
  //
  // try {
  //   const stmt = db.prepare(`
  //     INSERT INTO Shippings (
  //       CustomerId,
  //       AddressLine1,
  //       AddressLine2,
  //       Zip,
  //       State,
  //       City,
  //       Country,
  //       IsDefault
  //     )
  //     VALUES (
  //       ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8
  //     )
  //   `);
  //
  //   const result = await stmt.bind(
  //     session.CustomerId,
  //     addressLine1,
  //     addressLine2,
  //     zip,
  //     state,
  //     city,
  //     country,
  //     isDefault
  //   ).run();
  //
  //   return result;
  // } catch (error) {
  //   console.error(error);
  //   throw createError({ statusCode: 500, message: 'Database error' });
  // } finally {
  //   // db.close();
  // }
})