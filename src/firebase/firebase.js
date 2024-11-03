import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCxFLQrmYinSJPdZ3MggGrFJ5NCaVv6opk",
  authDomain: "nexxavibe.firebaseapp.com",
  projectId: "nexxavibe",
  storageBucket: "nexxavibe.appspot.com",
  messagingSenderId: "653020022713",
  appId: "1:653020022713:web:012f7eb9061ecdf7201868"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };