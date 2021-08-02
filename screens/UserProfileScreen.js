import React, {useContext, useState, useEffect, useCallback} from 'react'
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import colors from "../config/colors";
import Screen from "../components/Screen";
import {AuthContext} from "../context/AuthProvider"
import Header from '../components/Header';
import firebase from "../config/firebase";



const UserProfileScreen = ({navigation}) => {
    const {user, signOut} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([])
    const userId = firebase.auth().currentUser.uid;

    useEffect(() => {
        const subscriber = firebase.firestore().collection("users_extended").doc(userId).onSnapshot((documentSnapshot) => {
            console.log("User data: ", documentSnapshot.data());
            setUserData(documentSnapshot.data());
        });
        return () => subscriber();
    }, [userId])

    

    return (
        <Screen style={styles.screen}>
            <Header headerText="Profile" />
            <ScrollView
                style = {styles.container}
                contentContainerStyle = {{justifyContent: "center", alignItems: "center"}}
                showsVerticalScrollIndicator = {false}    
            >
                <Image 
                    source = {require("../assets/sajan.png")} 
                    style = {styles.userImg} 
                />

                <Text style = {styles.userName}> {userData?.username}</Text>
                <Text style = {styles.aboutUser}> {userData?.bio} </Text>
                <Text style = {styles.aboutUser}> Student of {userData.department?.label} </Text>
                <Text style = {styles.aboutUser}> Batch of {userData?.batch} </Text>
                
                {/* If same user's profile then, allow to edit */}
                {userData.uid === userId 
                        ? (<View style = {styles.userBtnWrapper}>
                                <TouchableOpacity onPress = {() => {navigation.navigate("ProfileSettings")}} style = {styles.userBtn}>
                                    <Text style = {styles.userBtnText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => navigation.navigate("AccountSettings")} style = {styles.userBtn}>
                                    <Text style = {styles.userBtnText}>Settings</Text>
                                </TouchableOpacity>
                           </View>)
                        : null }

            </ScrollView>
        </Screen>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container:{
        padding: 20,
        flex: 1,
        backgroundColor: colors.white
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10

    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: colors.light
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.medium,
        textAlign: "center",
        marginBottom: 10
    },
    userBtnWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginBottom: 10
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
      },
      userBtnTxt: {
        color: '#2e64e5',
      },
})

