import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHc0M-_CECtG0KBwKNxCFxexFTUw2zcW8",
  authDomain: "launcher-backend-569a1.firebaseapp.com",
  projectId: "launcher-backend-569a1",
  storageBucket: "launcher-backend-569a1.appspot.com",
  messagingSenderId: "203280305407",
  appId: "1:203280305407:web:15e1009c0f69afe2aad0ca",
  measurementId: "G-B401CR95PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)