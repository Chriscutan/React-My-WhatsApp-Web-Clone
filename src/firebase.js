import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhc3bGS8I3L68-jExLfk_3J0vrNyW3ZS0",
  authDomain: "whatsapp-clone-dark.firebaseapp.com",
  projectId: "whatsapp-clone-dark",
  storageBucket: "whatsapp-clone-dark.appspot.com",
  messagingSenderId: "189136018083",
  appId: "1:189136018083:web:87885278ee849a707dfd16",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

const colRef = collection(db, "rooms");

export { auth, provider, db, colRef };
