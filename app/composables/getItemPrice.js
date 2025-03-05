export default (item) => {
  return getCurrentPrice( item?.['$%'] || item.$ );
}