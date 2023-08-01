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
import { db } from "../firebase";

const productCollection = "products"
const oderCollection = "orders";

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

export const createOrder = async (data) => {
  let rtv = null;
  rtv = await addDoc(collection(db, oderCollection), data);
  return rtv;
}

export const getOrder = async ({orderId}) => {
  let rtv = null
  const loot = await getDoc(doc(db, oderCollection, orderId));
  if (loot.exists()) {
    rtv = {id: loot.id, ...loot.data()}
  }
  return rtv;
}

const writeFirestore = (products) => {
  const batch = writeBatch(db);
  products.forEach((p) => {
    const _p = { ...p };
    delete _p.id;
    const prodRef = addDoc(collection(db, productCollection), _p);
  });
};
