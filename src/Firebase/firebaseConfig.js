import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBsaYWjRI_AATZMHtZa51Fdf9RRZwWzbzs", 
    authDomain: "empowerkids.firebaseapp.com",
    projectId: "empowerkids",
    storageBucket: "empowerkids.appspot.com",
    messagingSenderId: "238442121491",
    appId: "1:238442121491:web:cdd27f653831ef3959b2e6",
    measurementId: "G-32321CBCL7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)