
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCxqlaC8-w_nrDPu5F15MjONGmzh4Ur3cQ",
  authDomain: "olxnew-11c8a.firebaseapp.com",
  projectId: "olxnew-11c8a",
  storageBucket: "olxnew-11c8a.appspot.com",
  messagingSenderId: "267572928532",
  appId: "1:267572928532:web:115fa797746e56086a0701"
};


export const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase)