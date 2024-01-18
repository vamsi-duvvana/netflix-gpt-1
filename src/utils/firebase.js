// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoBFoNvAucpURcF6A6ampGyHgpdIv3z88",
  authDomain: "netflix-gpt-fb8cc.firebaseapp.com",
  projectId: "netflix-gpt-fb8cc",
  storageBucket: "netflix-gpt-fb8cc.appspot.com",
  messagingSenderId: "272895508694",
  appId: "1:272895508694:web:5ced4921906911a1440977",
  measurementId: "G-JQM96RWGTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();