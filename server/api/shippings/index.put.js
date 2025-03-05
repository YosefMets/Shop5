export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const body = await readBody(event);

  const {
    addressLine1,
    addressLine2 = null,
    zip,
    state = null,
    city,
    country,
    isDefault = 1
  } = body;

  if ( !addressLine1 || !zip || !city || !country ) {
    throw createError({ statusCode: 400, message: 'Missing required fields' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO Shippings (
        CustomerId,
        AddressLine1,
        AddressLine2,
        Zip,
        State,
        City,
        Country,
        IsDefault
      )
      VALUES (
        ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8
      )
    `);

    const result = await stmt.bind(
      session.CustomerId,
      addressLine1,
      addressLine2,
      zip,
      state,
      city,
      country,
      isDefault
    ).run();

    return result;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Database error' });
  } finally {
    // db.close();
  }
})