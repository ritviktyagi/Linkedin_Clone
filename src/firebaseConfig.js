// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKAdLGUFPIm-OgSC-xV6pwWJiKpO_QVTQ",
  authDomain: "linkednclone-fdf7a.firebaseapp.com",
  projectId: "linkednclone-fdf7a",
  storageBucket: "linkednclone-fdf7a.appspot.com",
  messagingSenderId: "29578227515",
  appId: "1:29578227515:web:ab17a99174c7789a65111e",
  measurementId: "G-CF2BSJ43CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };
const analytics = getAnalytics(app);