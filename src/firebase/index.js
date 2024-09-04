 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "passwordgenerator-dda7f.firebaseapp.com",
    projectId: "passwordgenerator-dda7f",
    storageBucket: "passwordgenerator-dda7f.appspot.com",
    messagingSenderId: "342433522698",
    appId: "1:342433522698:web:7449138b96434c8f75ebf3",
    measurementId: "G-NHG9NYCG06"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider,db }