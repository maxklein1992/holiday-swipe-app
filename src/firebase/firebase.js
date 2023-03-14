import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCELhtikJtRVL-CWdnXLEWUYNVALp7-bt0",
  authDomain: "holiday-swipe.firebaseapp.com",
  projectId: "holiday-swipe",
  storageBucket: "holiday-swipe.appspot.com",
  messagingSenderId: "243491253213",
  appId: "1:243491253213:web:4791b9ed2a7ab750d5a434",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
