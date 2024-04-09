// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYpyjvxab1EDzngd2miVw3AWgCftrjMRs",
  authDomain: "hrms-1f965.firebaseapp.com",
  projectId: "hrms-1f965",
  storageBucket: "hrms-1f965.appspot.com",
  messagingSenderId: "731233463756",
  appId: "1:731233463756:web:8341cfcc429d3a77eb4169",
  measurementId: "G-THDKPKW5K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export { app, analytics, auth, db };