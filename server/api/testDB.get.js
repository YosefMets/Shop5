export default defineEventHandler( async (event) => {

  const db = hubDatabase()
  console.log( db );

  const { results: customers } = await db.prepare('SELECT * FROM Customers').all()

  return customers;

})