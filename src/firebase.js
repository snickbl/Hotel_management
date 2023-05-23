import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB9rjn-QtzvkjnBDHrak-JEgXCf6X2DDTE",
  authDomain: "hotel-customer-relations-712bb.firebaseapp.com",
  projectId: "hotel-customer-relations-712bb",
  storageBucket: "hotel-customer-relations-712bb.appspot.com",
  messagingSenderId: "405359038714",
  appId: "1:405359038714:web:4798ef5f967234c1283943"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}