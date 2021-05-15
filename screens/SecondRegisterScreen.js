import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View ,Button, TextInput} from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'
import firebase from "../config/firebase";
import { AuthContext } from '../context/AuthProvider';
const validationSecondRegisterScreen = Yup.object().shape({
    username: Yup.string().required().min(1).label("Username"),
    department: Yup.string().required().min(1).max(100).label("Department"),
    batch:  Yup.string().required().min(4).label("Batch")
});

const usersCollection = firebase.firestore().collection("users")
// const userID = firebase.auth().currentUser;
// console.log(userID);



const SecondRegisterScreen = () => {
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [batch, setBatch] = useState("");
    const {user} = useContext(AuthContext)
    const storeUser = () => {
        const userID = firebase.auth().currentUser.uid;
        console.log(userID);
        
        user.updateProfile({
            displayName: name
        })

        usersCollection.doc(userID).set({
            UID: userID,
            email: firebase.auth().currentUser.email,
            username: username,
            department: department,
            batch: batch
        }).then((res) => {
            setUserName("");
            setDepartment("");
            setBatch("");
        }).catch((err) => {
            console.log(err.message);
        })
    }



    return (
        <Screen style={styles.container}>
            
        {/* <AppForm
            initialValues={{username:'', department:'', batch:''}}
            onSubmit={(values)=>console.log(values)}
            validationSchema={validationSecondRegisterScreen}
        >
            <AppFormField 
                maxLength = {255}
                placeholder='Username'
                name="username"
                value = {username}
                onChangeText = {(un) => setUserName(un)}
            />
            
            <AppFormField 
                maxLength={255}
                multiline
                numberOfLines={3}
                name="department"
                placeholder="Department"
                value = {department}
                onChangeText = {(dept) => setDepartment(dept)}
            />
            <AppFormField 
                keyboardType="numeric"
                maxLength = {4}
                placeholder='Batch'
                name="batch"
                value = {batch}
                onChangeText = {(batch) => setBatch(batch)}
            />
            <SubmitButton 
                title="Save"
            />               
        </AppForm> */}
    <View>
        <View style = {styles.inputGroup}>
            <TextInput 
            placeholder='Display Name'
            value = {name}
            onChangeText = {(n) => setName(n)}
            />
        </View>
        <View style = {styles.inputGroup}>
            <TextInput 
            placeholder='Username'
            value = {username}
            onChangeText = {(un) => setUserName(un)}
            />
        </View>
        <View style = {styles.inputGroup}>
            <TextInput 
            multiline
            numberOfLines={3}
            placeholder="Department"
            value = {department}
            onChangeText = {(dept) => setDepartment(dept)}
            />
        </View>
        <View style = {styles.inputGroup}> 
            <TextInput 
            keyboardType="numeric"
            maxLength = {4}
            placeholder='Batch'
            value = {batch}
            onChangeText = {(batch) => setBatch(batch)}
            />
        </View>
        <Button title = "Add Credentials" color="#19AC52" style={{justifyContent: "center", alignItems: "center"}} onPress = {() => storeUser() } />
        </View>
    </Screen>
    )
}

export default SecondRegisterScreen

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
      },
})
