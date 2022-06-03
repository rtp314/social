// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOMMndZJQPX-A5dpHNNDTQi2ZHgpRFGGI",
  authDomain: "social-3d286.firebaseapp.com",
  projectId: "social-3d286",
  storageBucket: "social-3d286.appspot.com",
  messagingSenderId: "369177864148",
  appId: "1:369177864148:web:49ab9179e0df53299fd841"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export {app, auth, db, storage }