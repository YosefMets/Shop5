

export default (countryIso) => {
  const { fullPath } = useRoute();
  const localePath = useLocalePath();

  const url = '/' + countryIso + fullPath.replace(/^\/[A-Za-z]+\/[A-Za-z]+/g, '');
  return localePath( url );
}