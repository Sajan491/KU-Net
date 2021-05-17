
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'
import ProfileImagePicker from '../components/ProfileImagePicker';
import DepartmentPicker from '../components/DepartmentPicker';
import AppText from '../components/AppText';
import firebase from "../config/firebase";
import {Label} from "native-base";

const validationSecondRegisterScreen = Yup.object().shape({
    username: Yup.string().min(1).label("Username"),
    age: Yup.string().min(1).max(2).label("Age"),
    department: Yup.object().nullable().label("Department"),
    bio: Yup.string().min(1).label("Bio"),
    batch:  Yup.string().min(4).label("Batch")
});
const usersCollection = firebase.firestore().collection("users_extended")



const SecondRegisterScreen = ({navigation}) => {
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [age, setAge] = useState(null);
    const [batch, setBatch] = useState(null);
    const userID = firebase.auth().currentUser.uid;

    useEffect(() => {

        getData();

    }, [getData])

    const handleSubmit=(values)=>{
        console.log(values.username);
        try {            
            console.log(userID);
            usersCollection.doc(userID).update(values)


            firebase.auth().currentUser.updateProfile({
                displayName: values.username
            })
        } catch (error) {
            console.log("Error updating values in the database",error)
        }
        navigation.navigate("Account")      
    }


    const getData =  () => {
        usersCollection.doc(userID).get()
        .then((doc) => { 
            console.log(doc.data());
              setUserName(doc.data()['username'])
            //   const dept = doc.data()['department']
            //   console.log(dept);
            //   setDepartment(dept)
              setAge(doc.data()['age'])
              setBatch(doc.data()['batch'])
            }).catch ((err) => {
                console.log("Error receiving data from the database", err);
            })
    }

    return (
        <Screen style={styles.container}>
            <ScrollView>
            <AppText style={styles.header}>Profile Details</AppText>

            <AppForm
                initialValues={{username:'', age:'18',  department:null, bio:'', batch:''}}
                onSubmit={handleSubmit}
                validationSchema={validationSecondRegisterScreen}
            >
                <Label style = {styles.label}> Username</Label>
                <AppFormField 
                    maxLength = {255}
                    defaultValue = {userName}
                    name="username"
                />

                <Label style = {styles.label}>Age</Label>
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {2}
                    defaultValue = {age}
                    name="age"
                />

                <Label style = {styles.label}>Image</Label>
                <ProfileImagePicker name='image' />
                
                <Label style = {styles.label}>Department</Label>
                <DepartmentPicker
                    name="department"
                    defaultValue = {department}
                    numberOfColumns={1}
                />

                <Label style = {styles.label}> Bio </Label>
                <AppFormField 
                    maxLength = {255}
                    placeholder='Short Bio'
                    name="bio"
                    multiline
                    numberOfLines={4}
                />

                <Label style = {styles.label}> Batch</Label>
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {4}
                    defaultValue = {batch}
                    name="batch"
                />
                <SubmitButton 
                    title="Save"
                />               
            </AppForm>
            </ScrollView>


    </Screen>
    )
}

export default SecondRegisterScreen

const styles = StyleSheet.create({
    header:{
        paddingLeft:8,
        paddingTop:30
    },
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
    label: {
        fontSize: 14,
        paddingTop: 10,
        paddingLeft: 8
    }
})
