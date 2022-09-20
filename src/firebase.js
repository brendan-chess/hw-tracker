// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrVstrv54oC5W5gHmZpwBHeG05n86PUE8",
  authDomain: "hw-tracker-9eaa8.firebaseapp.com",
  projectId: "hw-tracker-9eaa8",
  storageBucket: "hw-tracker-9eaa8.appspot.com",
  messagingSenderId: "17615372327",
  appId: "1:17615372327:web:56d14801e6f2632dde8e02",
  measurementId: "G-8GC8BF859Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { app, db }
