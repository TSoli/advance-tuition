// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa02_GOJbJdYqL42bg6raIxUrfYIUDjT0",
  authDomain: "advance-tuition.firebaseapp.com",
  projectId: "advance-tuition",
  storageBucket: "advance-tuition.appspot.com",
  messagingSenderId: "1017295924060",
  appId: "1:1017295924060:web:de9c3142a7f11737ea2f99",
  measurementId: "G-XGKBTT5JH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);