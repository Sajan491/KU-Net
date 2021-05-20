
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
    username: Yup.string().min(1).nullable().label("Username"),
    age: Yup.string().min(1).max(2).label("Age"),
    department: Yup.object().nullable().label("Department"),
    bio: Yup.string().min(1).label("Bio"),
    batch:  Yup.string().min(4).label("Batch")
});
const usersCollection = firebase.firestore().collection("users_extended")



const SecondRegisterScreen = ({navigation}) => {
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [bio, setBio] = useState("")
    const [age, setAge] = useState(null);
    const [batch, setBatch] = useState(null);
    const userID = firebase.auth().currentUser.uid;

    useEffect(() => {
        getData();
    }, [])

    const getData =  () => {
        usersCollection.doc(userID).get()
        .then((doc) => { 
            console.log("Data from the colelction: ", doc.data());
              setUserName(doc.data()['username'])
              const dept = doc.data()['department']
              console.log("Department: ", dept);
              setDepartment(dept)
              setAge(doc.data()['age'])
              setBio(doc.data()['bio'])
              setBatch(doc.data()['batch'])
            }).catch ((err) => {
                console.log("Error receiving data from the database", err);
            })
    }

    const handleSubmit=(values)=>{
        console.log(userName);
        try {            
            console.log("User ID: ", userID);
            usersCollection.doc(userID).get()
                .then( () => {
                    if(values.username !== "") {
                        usersCollection.doc(userID).update({
                            username: values.username
                        })
                        console.log("Updated username");
                        firebase.auth().currentUser.updateProfile({
                            displayName: values.username
                        })
                    }
                    if(values.age !== "") {
                        usersCollection.doc(userID).update({
                            age: values.age
                        })
                        console.log("Updated age!")
                    }
                    if(values.bio !== "") {
                        usersCollection.doc(userID).update({
                            bio: values.bio
                        })
                        console.log("Updated bio!");
                    }
                    if(values.batch !== "") {
                        usersCollection.doc(userID).update({
                            batch: values.batch
                        })
                        console.log("Updated batch");
                    }

                    if(values.department !== null) {
                        usersCollection.doc(userID).update({
                            department: values.department.label
                        })
                        console.log(("Department updated!"));
                    }
                    
                    
                })          
        } catch (error) {
            console.log("Error updating values in the database",error)
        }
        navigation.navigate("Account")      
    }


    return (
        <Screen style={styles.container}>
            <ScrollView>
            <AppText style={styles.header}>Profile Details</AppText>

            <AppForm
                initialValues={{username: "", age:'',  department:null, bio:'', batch:''}}
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
                    placeholder= {department}
                />

                <Label style = {styles.label}> Bio </Label>
                <AppFormField 
                    maxLength = {255}
                    placeholder='Short Bio'
                    defaultValue = {bio}
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
        fontSize: 13,
        paddingTop: 10,
        paddingLeft: 8
    }
})
