// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6GXfyax1wA6xsFyGJnXOThk0GSHKL1BQ",
  authDomain: "hrms-d49bb.firebaseapp.com",
  projectId: "hrms-d49bb",
  storageBucket: "hrms-d49bb.appspot.com",
  messagingSenderId: "311103220287",
  appId: "1:311103220287:web:e7f2236a9a7dfeb4e7a68a",
  measurementId: "G-65CNT8VGDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

