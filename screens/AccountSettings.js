import React, {useState} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Alert } from 'react-native'
import Screen from "../components/Screen";
import firebase from "../config/firebase";
import AppText from "../components/AppText";
import TextCard from "../components/TextCard";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from '../config/colors';


const AccountSettings = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setreNewPassword] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [actionTriggered, setActionTriggered] = useState("")
    var user = firebase.auth().currentUser;

    const reAuthenticateUser = (currentPassword) =>{
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const changePasswordHandler = () => {
        if(newPassword == reNewPassword) {
            reAuthenticateUser(currentPassword).then(() => {
                user.updatePassword(newPassword).then((res) => {
                   Alert.alert("Password successfully changed!");
                   setModalOpen(false);
                   setCurrentPassword("");
                   setreNewPassword("");
                   setNewPassword("");
                }).catch((err) => {
                    Alert.alert(err.message);
                }) 
    
            }).catch((err) => {
                Alert.alert(err.message)
                setCurrentPassword("");
            })

        }else {
            Alert.alert("The new passwords do not match!")
        }

   }

   const changeEmailHandler = () => {
    reAuthenticateUser(currentPassword).then(() => {
        user.updateEmail(newEmail).then((res) => {
           Alert.alert("Email successfully changed!");
           setModalOpen(false);
            setNewEmail("");
            setCurrentPassword("");
        }).catch((err) => {
            Alert.alert(err.message);
            setCurrentPassword("");
        }) 

    }).catch((err) => {
        Alert.alert(err.message)
    })

}

    return (
        
        <Screen>
            <Modal 
                visible = {modalOpen} 
                animationType = "slide"
                onRequestClose = {() => setModalOpen(false)}
                >
                <MaterialCommunityIcons
                    name = "close"
                    size = {26}
                    style = {styles.modalClose}
                    onPress = {() => setModalOpen(false)}
                />
                {actionTriggered == "PasswordModal" ? 
                    <View>
                        <AppText style = {styles.header}> Set up new password.</AppText>
                        <TextInput 
                            style = {styles.textInput}
                            value = {currentPassword}
                            placeholder = "Current Password..."
                            autoCapitalize = "none"
                            secureTextEntry = {true}
                            onChangeText = {(pwd) => setCurrentPassword(pwd)}
                        />
                        <TextInput 
                            style = {styles.textInput}
                            value = {newPassword}
                            placeholder = "New Password..."
                            autoCapitalize = "none"
                            secureTextEntry = {true}
                            onChangeText = {(pwd) => setNewPassword(pwd)}
                        />
                        <TextInput 
                            style = {styles.textInput}
                            value = {reNewPassword}
                            placeholder = "Re-type New Password..."
                            autoCapitalize = "none"
                            secureTextEntry = {true}
                            onChangeText = {(pwd) => setreNewPassword(pwd)}
                        />
                        <TouchableOpacity onPress = {() =>  {changePasswordHandler()} } >
                            <Text style = {styles.btnText}> Change Password</Text>
                        </TouchableOpacity>

                    </View>
                    :
                    <View>
                        <AppText style = {styles.header}> Set up new email.</AppText>
                        <TextInput 
                            style = {styles.textInput}
                            value = {currentPassword}
                            placeholder = "Current Password..."
                            autoCapitalize = "none"
                            secureTextEntry = {true}
                            onChangeText = {(pwd) => setCurrentPassword(pwd)}
                        />
                        <TextInput 
                            style = {styles.textInput}
                            value = {newEmail}
                            placeholder = "New Email..."
                            autoCapitalize = "none"
                            onChangeText = {(email) => setNewEmail(email)}
                        />
                        <TouchableOpacity onPress = {() =>  {changeEmailHandler()} } >
                            <Text style = {styles.btnText}> Change Email</Text>
                        </TouchableOpacity>

                </View>
}
            </Modal>
          
            <TextCard title ="Email Address:" subTitle = {firebase.auth().currentUser.email} onPress= {() => {
                setModalOpen(true);
                setActionTriggered("EmailModal")
             }
            } 
            />
         

            <TextCard title ="Change Password:" description = "Password must be atleast 6 characters long." onPress = {() => {
                setModalOpen(true)
                setActionTriggered("PasswordModal")    
                }
            }
            />
                
         

        </Screen>
    )
}

export default AccountSettings

const styles = StyleSheet.create({
    modalClose: {
        padding: 15,
        alignSelf: "flex-end",
        marginBottom: 15,
    },
    textInput: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        marginVertical: 10
    },
    btnText: {
        marginVertical: 10,
        fontSize: 16,
        color: colors.secondary,
        textAlign: "center"
    },
    header: {
        textAlign: "center",
        color: "gray"
    }
})
