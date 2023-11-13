// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN9Fm7Qib0A0AmsGD1363uwkBvGBKTk0k",
  authDomain: "dashaxiom.firebaseapp.com",
  databaseURL: "https://dashaxiom-default-rtdb.firebaseio.com",
  projectId: "dashaxiom",
  storageBucket: "dashaxiom.appspot.com",
  messagingSenderId: "221995339912",
  appId: "1:221995339912:web:5651256f7290a7f989cf3d",
  measurementId: "G-8YFPYW9VFH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
