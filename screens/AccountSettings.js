import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Screen from "../components/Screen";
import firebase from "../config/firebase";
import AppButton from "../components/AppButton";
import TextCard from "../components/TextCard";


const AccountSettings = () => {
   const changePasswordHandler = () => {
       console.log("Password Changed!");
   }

   const changeEmailHandler = () => {
    console.log("Email Changed!");
   }

    return (
        <Screen>
            {/* <AppText> Account Settings </AppText>
            <AppText>{firebase.auth().currentUser.email}</AppText> */}
            <TextCard title ="Email Address:" subTitle = {firebase.auth().currentUser.email} onPress= {changeEmailHandler} />
         

            <TextCard title ="Change Password:" description = "Password must be atleast 6 characters long." onPress = {changePasswordHandler}/>
         

        </Screen>
    )
}

export default AccountSettings

const styles = StyleSheet.create({})
