import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRsfMwPEYpSyKqL97V_zBBXjw5HAyfDxE",
  authDomain: "monkey-blogging-6d0df.firebaseapp.com",
  projectId: "monkey-blogging-6d0df",
  storageBucket: "monkey-blogging-6d0df.appspot.com",
  messagingSenderId: "173879626794",
  appId: "1:173879626794:web:1799253da2b396a1118753",
  measurementId: "G-GBT2FRB3R1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
