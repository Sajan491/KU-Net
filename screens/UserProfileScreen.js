import React, {useContext, useState, useEffect, useCallback} from 'react'
import { Text, StyleSheet, View } from 'react-native'
import colors from "../config/colors";
import Screen from "../components/Screen";
import {AuthContext} from "../context/AuthProvider"
import Header from '../components/Header';
import firebase from "../config/firebase";



const UserProfileScreen = ({navigation}) => {
    const {user, signOut} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const userId = firebase.auth().currentUser.uid;

    useEffect(() => {
        const subscriber = firebase.firestore().collection("users").doc(userId).onSnapshot((documentSnapshot) => {
            console.log("User data: ", documentSnapshot.data());
        });
        return () => subscriber();
    }, [userId])

    

    return (
        <Screen style={styles.screen}>
            <Header headerText="Profile" />
            <Text> This is the profile screen</Text>
        </Screen>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
        borderRadius:20
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10

    }
})

