// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB6HJNE6rL5aJfzn65-3j5akobeER6hfMM",
    authDomain: "mental-health-tracker-a100a.firebaseapp.com",
    projectId: "mental-health-tracker-a100a",
    storageBucket: "mental-health-tracker-a100a.firebasestorage.app",
    messagingSenderId: "719195406949",
    appId: "1:719195406949:web:688b59aab294800df07c8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

