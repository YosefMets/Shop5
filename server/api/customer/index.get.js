export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();

  /*
  последний шипинг
  имя фамилия
  почта

  */
  // const {results} = await db.prepare(`SELECT * FROM Shippings WHERE CustomerId = ?;`)
  //   .bind(session.CustomerId).all();

  return session;
})