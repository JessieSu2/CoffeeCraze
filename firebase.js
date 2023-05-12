// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIuBJR5rnypER2V_hBj-2r2FmWbNEclIk",
  authDomain: "trendy-drinks-6e608.firebaseapp.com",
  projectId: "trendy-drinks-6e608",
  storageBucket: "trendy-drinks-6e608.appspot.com",
  messagingSenderId: "354769028",
  appId: "1:354769028:web:e4660762d4026335c1cad1",
  measurementId: "G-YYMSDZC70Y",
  databaseURL: "https://trendy-drinks-6e608-default-rtdb.firebaseio.com",
};
// const app = initializeApp(firebaseConfig);
// let currentUser = undefined;
// onAuthStateChanged(auth, (user) => {
//   currentUser = user;
// });

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = getFirestore();
const storage = getStorage();
export { auth, db, storage };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
