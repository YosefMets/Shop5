import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const SetCustomerStripe = async (email, payment_method) => {
  const customer = await stripe.customers.create({
    email,
    payment_method
  });

  const res = await SetPaymentStripe(customer.id, payment_method);
  if (!res) throw createError({ statusCode: 500, statusMessage: 'Not Set' });
  return customer.id;
}

const SetPaymentStripe = async (customer, payment_method) => {
  const r = await stripe.paymentMethods.attach(payment_method, {
    customer
  });

  return r;
}
export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });


  const body = await readBody(event);

  const {
    methodTypeName,
    providerName,
    accountIdentifier,
    IdMethodByProvider,
    expiryDate,
    isDefault = 1
  } = body;

  const IdCustomerByProvider = await SetCustomerStripe(session.Email, IdMethodByProvider);
  if (!IdCustomerByProvider) throw createError({ statusCode: 500, statusMessage: 'Error Stripe' });

  const db = hubDatabase();

  if (!methodTypeName || !providerName || !accountIdentifier || !expiryDate) {
    throw createError({ statusCode: 400, message: 'Missing required fields' });
  }

  try {
    // Используем подзапрос для получения MethodTypeId и ProviderId
    const stmt = db.prepare(
      `INSERT INTO PaymentMethods (
        CustomerId,
        MethodTypeId,
        ProviderId,
        AccountIdentifier,
        IdMethodByProvider,
        IdCustomerByProvider,
        ExpiryDate,
        IsDefault
      )
      SELECT
        ?1,
        (SELECT Id FROM PaymentMethodTypes WHERE Name = ?2 LIMIT 1),
        (SELECT Id FROM PaymentProviders WHERE Name = ?3 LIMIT 1),
        ?4,
        ?5,
        ?6,
        ?7,
        ?8
      `
    );

    const result = await stmt.bind(
      session.CustomerId,  // CustomerId
      methodTypeName,          // methodType
      providerName,            // provider
      accountIdentifier,   // accountIdentifier
      IdMethodByProvider,   // id payment from Provider
      IdCustomerByProvider, // id customer from Provider
      expiryDate,          // expiryDate
      isDefault            // isDefault
    ).run();



    return result;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Database error' });
  } finally {
    // db.close(); // Закрытие соединения, если это необходимо
  }
})