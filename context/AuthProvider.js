import React, { createContext, useState } from 'react';
import firebase from "../config/firebase";

const usersCollection = firebase.firestore().collection('users_extended');

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isANewUser, setIsANewUser] = useState(false);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          isANewUser,
          error,
          setError,
          signIn: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
                console.log(res);
                setIsANewUser(false);
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
                  {cred.additionalUserInfo.isNewUser ? setIsANewUser(true) : setIsANewUser(false)}

                  cred.user.sendEmailVerification()

                  usersCollection 
                    .doc(cred.user.uid)
                    .set({
                      email: email,
                      uid: cred.user.uid
                    })
                   cred.user.reauthenticateWithCredential(email)
                  
                })
            } catch (e) {
              setError(e.message)
            }
            const user = firebase.auth().currentUser
          },
        
          signOut: async () => {
            try {
              await firebase.auth().signOut();
            } catch (e) {
              console.error(e);
              setError(e.message)
            }
          },
          passwordReset : email => {
            try {
              firebase.auth().sendPasswordResetEmail(email)
          } catch (err) {
            setError(e.message)
          }
        }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };