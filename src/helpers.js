import { data } from "./API/API";

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


//? Simulate 1s API Delay
export const productFilter = async ({ filterCallback }) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.filter((p) => filterCallback({ product: p })));
    }, 1000);
  });
};

//? Simulate 1s API Delay
export const productFind = async ({ id, ...props }) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.find((p) => p.id === id));
    }, 1000);
  });
};