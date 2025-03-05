const getOrder = async ( customerId, shippingId, e ) => {

  const db = hubDatabase();
  let orderId = null,
      expOrder = null;
  if ( customerId ) {

    setCookie( e,  'CustomerId', JSON.stringify(true), { maxAge: 10000000 } );
    const order = db.prepare(`
      SELECT Orders.Id FROM Orders 
      INNER JOIN Shippings ON Orders.ShippingId = Shippings.Id 
      INNER JOIN Customers ON Shippings.CustomerId = Customers.Id 
      WHERE Customers.Id = ?1 AND OrderStatusId NOT IN (2)
      ORDER BY Orders.Id ASC
    `);
    setCookie( e,  'OrderPrepare', JSON.stringify(true), { maxAge: 10000000 } );
    expOrder = await order.bind( customerId ).first();
    setCookie( e,  'ExpOrder', JSON.stringify(expOrder), { maxAge: 10000000 } );
    orderId = expOrder?.Id
  }

  if ( !orderId ) {
    const newOrder = await db.prepare(`
        INSERT INTO Orders (ShippingId, OrderStatusId) VALUES (?1, ?2);
    `).bind( shippingId, 1 ).run();
    orderId = newOrder?.meta?.last_row_id;
  }

  return orderId;
}

const getShippings = async ( customerId ) => {
  const db = hubDatabase();
  const shippingsPrepare = db.prepare(
    `SELECT * FROM Shippings WHERE CustomerId = ?1 ORDER BY Id ASC`
  );
  let shippings = await shippingsPrepare.bind( customerId ).all();
  // return shippings
  // const qwe = Object.assign( {}, shippings );

  if ( !shippings?.results?.length ) { // если шипинга нет
    const creatingNewShipping = await db.prepare(
      `INSERT INTO Shippings (CustomerId, AddressLine1, Zip, City, Country) VALUES (?1, "", "", "", "")`
    ).bind( customerId ).run();
    const id = creatingNewShipping?.meta?.last_row_id;
    if ( !id ) throw ('Error insert')

    shippings = await shippingsPrepare.bind( customerId ).all();
  }
  return shippings?.results
}

// const mapCustomerToOrder = ( sessionId, shippingId ) => {
//   const db = hubDatabase();
//   const sessions = db.prepare(
//     `UPDATE Orders SET ShippingId = ?1 WHERE SessionId = ?2`
//   ).bind( customer.Id ).all();
//
//   if ( !shippings?.length ) { // если шипинга нет
//     const creatingNewShipping = db.prepare(
//       `INSERT INTO Shippings ("CustomerId") VALUES (?1)`
//     ).bind( customer.Id ).run();
//   } else {
//
//   }
// }


export default defineEventHandler( async (event) => {
  const db = hubDatabase();
  const body = await readBody(event);

  const { email, pass } = body;

  const getCustomerPrepare = db.prepare(
    `SELECT * FROM Customers WHERE Email = ?1`
  );

  let customer = await getCustomerPrepare.bind( email ).first();
  setCookie( event,  'Customer', JSON.stringify(customer), { maxAge: 10000000 } );

  if ( !customer ) {
    const putCustomerToCustomers = await db.prepare(
      `INSERT INTO Customers ("Email", "Pass") VALUES ( ?1, ?2 )`
    ).bind( email, pass ).run();

    customer = await getCustomerPrepare.bind( email ).first();
  }
  setCookie( event,  'Customer2', JSON.stringify(customer), { maxAge: 10000000 } );

  let shippings = null,
      orderId = null;

  if ( customer?.Pass === pass ) {
    setCookie( event,  'PassCorrect', JSON.stringify(true), { maxAge: 10000000 } );
    const putCustomerToSessionPrepare = db.prepare(
      `UPDATE Sessions SET CustomerId = ?1, OrderId = ?2 WHERE Id = ?3`
    );
    shippings = await getShippings( customer.Id );
    // setCookie( event,  'Shippings', JSON.stringify(shippings), { maxAge: 10000000 } );
    orderId = await getOrder( customer.Id, shippings?.[0]?.Id, event );
    // setCookie( event,  'Order', JSON.stringify(orderId), { maxAge: 10000000 } );
    // setCookie( event,  'OrderAfter', JSON.stringify( { customerId: customer.Id, orderId, sessionId: event.session?.Id} ), { maxAge: 10000000 } );
    const res = await putCustomerToSessionPrepare.bind( customer.Id, orderId, event.session?.SessionId ).run();
    // setCookie( event,  'SessionAuthUpdated', JSON.stringify( { session: event.session} ), { maxAge: 10000000 } );
    // setCookie( event,  'Res', JSON.stringify( res ), { maxAge: 10000000 } );
  } else {
    throw createError({ statusCode: 403, statusMessage: 'Pass in not correct' });
  }


  // TODO: секция удаления старых данных
  await db.prepare( `DELETE FROM Sessions WHERE SessionExp < ?1` ).bind( Date.now() ).run();
  // TODO: удалить ордера
  // TODO: удалить корзины

  // setCookie( event,  'serverLogs',  Date.now().toString() );

  return { customer, shippings, orderId };
})