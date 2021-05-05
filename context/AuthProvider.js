import React, { createContext, useState } from 'react';
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCWdmIAjwE9HzKWQha8obHsfozDS4ZdxkM",
  authDomain: "ku-net-b0cf0.firebaseapp.com",
  projectId: "ku-net-b0cf0",
  storageBucket: "ku-net-b0cf0.appspot.com",
  messagingSenderId: "993085530228",
  appId: "1:993085530228:web:521a21de7054ee3545f121"  
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          error,
          signIn: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
              setError(e.message)
            }
          },
          signUp: async (email, password) => {
            try {
              await firebase.auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
              setError(e.message)
            }
          },
          signOut: async () => {
            try {
              await firebase.auth().signOut();
            } catch (e) {
              console.error(e);
              setError(e.message)
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

