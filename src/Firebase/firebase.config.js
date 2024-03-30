// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoArDFcWcKX5Fy_Vpdff05dqqQMiXoE40",
  authDomain: "user-email-password-auth-ffc1f.firebaseapp.com",
  projectId: "user-email-password-auth-ffc1f",
  storageBucket: "user-email-password-auth-ffc1f.appspot.com",
  messagingSenderId: "424009208591",
  appId: "1:424009208591:web:a8d7fa7ef6bb5d66c1247a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
