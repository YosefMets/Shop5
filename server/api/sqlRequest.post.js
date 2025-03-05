export default defineEventHandler( async (event) => {
  const body = await readBody(event);
  const db = hubDatabase();

  return await db.prepare(body).run();
})