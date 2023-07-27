// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEUtsjG0yUl3jwF-YzEQidWPfovzf-j9A",
  authDomain: "vshop-api.firebaseapp.com",
  projectId: "vshop-api",
  storageBucket: "vshop-api.appspot.com",
  messagingSenderId: "50699454241",
  appId: "1:50699454241:web:3f8c2f58584aa603516060"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);