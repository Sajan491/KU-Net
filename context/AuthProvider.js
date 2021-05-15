import React, { createContext, useState } from 'react';
import firebase from "../config/firebase";

const usersCollection = firebase.firestore().collection('users');

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
          setError,
          signIn: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
                console.log(res);
                console.log("User logged in successfully!");
              })
            } catch (e) {
              console.log(e);
              setError(e.message)
            }
          },
          signUp: async (email, password) => {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                  console.log(cred.user.uid);
                  usersCollection
                    .doc(cred.user.uid)
                    .set({
                      email: email,
                      uid: cred.user.uid
                    })
                  
                })
            } catch (e) {
              console.log(e);
              console.log(email);
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


