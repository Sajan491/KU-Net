
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'
import ItemPicker from '../components/ItemPicker';
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


const departments = [
    {label: "Computer Science and Engineering", value:1, icon:"laptop"},
    {label: "Civil Engineering", value:2, icon:"account-hard-hat"},
    {label: "Chemical Engineering", value:3, icon:"chemical-weapon"},
    {label: "Electrical and Electronics", value:4, icon:"electric-switch"},
    {label: "Gemoatics Engineering", value:5, icon:"ruler"},
    {label: "Biotechnology", value:6, icon:"microscope"},
    {label: "Environmental Science and Engineering", value:7, icon:"tree"},
    {label: "Architecture", value:8, icon:"lead-pencil"},
    {label: "Mechanical Engineering", value:9, icon:"car"},
    {label: "Pharmacy", value:10, icon:"hospital-box"},
    {label: "Mathematics", value:11, icon:"math-compass"},
    {label: "Applied Science", value:12, icon:"black-mesa"},
];
const usersCollection = firebase.firestore().collection("users_extended")


const ProfileSettings = ({navigation}) => {
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [bio, setBio] = useState("")
    const [age, setAge] = useState(null);
    const [batch, setBatch] = useState(null);
    const userID = firebase.auth().currentUser.uid;
    const db = usersCollection.doc(userID)

    useEffect(() => {
        getData();
    }, [])

    const getData =  () => {
        db.get()
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
            db.get()
                .then( () => {
                    if(values.username !== "") {
                        db.update({
                            username: values.username
                        })
                        console.log("Updated username");
                        firebase.auth().currentUser.updateProfile({
                            displayName: values.username
                        })
                    }
                    if(values.age !== "") {
                        db.update({
                            age: values.age
                        })
                        console.log("Updated age!")
                    }
                    if(values.bio !== "") {
                        db.update({
                            bio: values.bio
                        })
                        console.log("Updated bio!");
                    }
                    if(values.batch !== "") {
                        db.update({
                            batch: values.batch
                        })
                        console.log("Updated batch");
                    }

                    if(values.department !== null) {
                        db.update({
                            department: values.department.label
                        })
                        console.log(("Department updated!"));
                    }
                    
                    
                })          
        } catch (error) {
            console.log("Error updating values in the database",error)
        }
        navigation.navigate("Settings")      
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
                
                <Label style = {styles.label}>Department</Label>
                <ItemPicker
                    items={departments}
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

export default ProfileSettings

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
