// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuvxgYEiq6bze8it_Hq1K78F9gecJGcxQ",
  authDomain: "moviepilotapp.firebaseapp.com",
  projectId: "moviepilotapp",
  storageBucket: "moviepilotapp.appspot.com",
  messagingSenderId: "986419980964",
  appId: "1:986419980964:web:96f4dfa90cf91368e19431",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
