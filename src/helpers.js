import {
  writeBatch,
  addDoc,
  getDocs,
  getDoc,
  collection,
  doc,
  query,
  where
} from "firebase/firestore";
import { db } from "./firebase";

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

const productCollection = "products"

export const productFilter = async ({ filter = null }) => {
  let querySnapshot;
  if(filter){
    querySnapshot = await getDocs(query(collection(db, productCollection), where(...filter)));
  }else{
    querySnapshot = await getDocs(collection(db, productCollection))
  }
  const products = [];
  querySnapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));
  return products;
};

export const productFind = async ({ id, ...props }) => {
  const docRef = doc(db, productCollection, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? {id: docSnap.id, ...docSnap.data()} : null;
};

const writeFirestore = (products) => {
  const batch = writeBatch(db);
  products.forEach((p) => {
    const _p = { ...p };
    delete _p.id;
    const prodRef = addDoc(collection(db, productCollection), _p);
  });
};
