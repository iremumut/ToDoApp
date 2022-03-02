import { initializeApp } from "firebase/app";
//import * as firebase from 'firebase';
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtCUwas4RpLQ5Q2foFIAzO3-rPxW_-lCI",
  authDomain: "to-do-app-c5cde.firebaseapp.com",
  projectId: "to-do-app-c5cde",
  storageBucket: "to-do-app-c5cde.appspot.com",
  messagingSenderId: "321529476917",
  appId: "1:321529476917:web:d18a34b108f425ef817e7c",
};

////const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
