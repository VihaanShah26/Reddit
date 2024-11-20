import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmsq7_DbwI8hTLPJTxf3W9OQft56fLYPE",
    authDomain: "vihaan-reddit-project.firebaseapp.com",
    projectId: "vihaan-reddit-project",
    storageBucket: "vihaan-reddit-project.firebasestorage.app",
    messagingSenderId: "814170831123",
    appId: "1:814170831123:web:1e27766a4a0c85e3c102e6"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();