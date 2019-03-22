export function concatLocation(address){
  const replaced = address.replace(/ /g, '+');
  return replaced;
}
