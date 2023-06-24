
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAnr00gIS_MnBXQn3ECxEnLHdDEbuZyRW4",
    authDomain: "olx-clone-12355.firebaseapp.com",
    projectId: "olx-clone-12355",
    storageBucket: "olx-clone-12355.appspot.com",
    messagingSenderId: "844300190920",
    appId: "1:844300190920:web:5749e8fda0289495e1d1fd"
  };


export const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase)