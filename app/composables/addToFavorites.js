export default async (item) => {

  const { favorites } = storeToRefs( useUserStore() );

  if (item?.$f) {
    favorites.value.removeElement( item );
    item.$f = 0;
  } else {
    favorites.value.removeElement( item ).unshift( item );
    item.$f = 1;
  }

  return true

}