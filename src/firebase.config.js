// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxIwORhDJfa6wFhuiWa_wD4_0dBo26aAU",
  authDomain: "willow-marketplace.firebaseapp.com",
  projectId: "willow-marketplace",
  storageBucket: "willow-marketplace.appspot.com",
  messagingSenderId: "632201316823",
  appId: "1:632201316823:web:c38555bbf1a10eb5772392",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
