import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import firebase from "../config/firebase";

const usersCollection = firebase.firestore().collection('users_extended');

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isANewUser, setIsANewUser] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          isANewUser,
          isEmailVerified,
          setIsEmailVerified,
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

                  cred.user.sendEmailVerification().then(() => {
                    Alert.alert("You can now check your email and verify your student email!");
                  }).catch((err) => {
                    Alert.alert(err.message)
                  })
                  
                  usersCollection 
                  .doc(cred.user.uid)
                    .set({
                      email: email,
                      uid: cred.user.uid
                    })
                    // cred.user.reauthenticateWithCredential(email)
                    // {cred.user.emailVerified === true ? setIsEmailVerified(true) : setIsEmailVerified(false) }
                  
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