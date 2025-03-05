export default defineEventHandler( (event) => {
  const lang = getRouterParam(event, 'lang');
  const fetchUri = `https://res.cloudinary.com/deucrhprn/raw/upload/db/${lang}.json`;

  return $fetch( fetchUri );
})