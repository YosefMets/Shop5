export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const { paymentId } = getRouterParams(event);

  /// TODO: Check last PaymentMethods left
  const res = await db.prepare(`DELETE FROM PaymentMethods WHERE Id = ? AND CustomerId = ?;`)
    .bind(paymentId, session.CustomerId).run();

  const isDefault = db.prepare(`SELECT * FROM PaymentMethods WHERE IsDefault = 1 AND CustomerId = ?;`)
    .bind(session.CustomerId).first();

  if ( !isDefault ){
    throw createError({ statusCode: 403, statusMessage: 'Forbidden-' & JSON.stringify(isDefault) });
  }

  const newDefault = await db.prepare(`UPDATE PaymentMethods
      SET IsDefault = 1
      WHERE CustomerId = ?
      LIMIT 1;`).bind(session.CustomerId).run();

  return newDefault;
})