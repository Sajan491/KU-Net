import firebase from "firebase";
import "firebase/firestore";

import "firebase/storage";
// <--- FIREBASE CONFIG --->
const firebaseConfig = {
  apiKey: "AIzaSyCWdmIAjwE9HzKWQha8obHsfozDS4ZdxkM",
  authDomain: "ku-net-b0cf0.firebaseapp.com",
  projectId: "ku-net-b0cf0",
  storageBucket: "ku-net-b0cf0.appspot.com",
  messagingSenderId: "993085530228",
  appId: "1:993085530228:web:521a21de7054ee3545f121"  
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

firebase.firestore()
firebase.storage()
export default firebase;