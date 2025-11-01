// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCODcSsfPDC7A5LmKzfGcf7CR4IkOtzkFk",
  authDomain: "database-justfast.firebaseapp.com",
  projectId: "database-justfast",
  storageBucket: "database-justfast.firebasestorage.app",
  messagingSenderId: "860237437046",
  appId: "1:860237437046:web:3da7d2a4a2f6ab50776757",
  measurementId: "G-2WSMEKZFGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);