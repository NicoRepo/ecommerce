export const formatPrice = (price) => {
  let stringNumber = price.toString();
  const groups = [];
  while (stringNumber.length > 3) {
    groups.unshift(stringNumber.slice(-3));
    stringNumber = stringNumber.slice(0, -3);
  }
  groups.unshift(stringNumber);
  return groups.join(".");
};
