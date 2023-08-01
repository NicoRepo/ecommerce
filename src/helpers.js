/**
 * Format Product Price
 * @param {Number} price
 * @example <caption>Example</caption>
 * formatPrice(10000);
 * // returns "10.000"
 * @returns {String} Returns String formatted price.
 */
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

