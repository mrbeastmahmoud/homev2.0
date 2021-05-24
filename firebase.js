import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCb7IFABUhNRWi9vkPIR-BRoQFu32_iu84",
  authDomain: "homev2-7deac.firebaseapp.com",
  projectId: "homev2-7deac",
  storageBucket: "homev2-7deac.appspot.com",
  messagingSenderId: "1000771236168",
  appId: "1:1000771236168:web:b05b7621821e6879bd837d",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
