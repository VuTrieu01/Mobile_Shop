import { initializeApp } from "firebase/app";
import * as firebase from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyADr_j8KTE3blJ6N7243Vat_mrUJ7ILsZs",
  authDomain: "mobile-shop-f6123.firebaseapp.com",
  projectId: "mobile-shop-f6123",
  storageBucket: "mobile-shop-f6123.appspot.com",
  messagingSenderId: "347549596173",
  appId: "1:347549596173:web:a06b6030eb27f776533344",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = firebase.getAuth(app);
export { auth, firebase, database, ref, child, get };
