import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, ImageBackground, Modal, ActivityIndicator } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'
import ItemPicker from '../components/ItemPicker';
import AppText from '../components/AppText';
import firebase from "../config/firebase";
import {Label} from "native-base";
import departments from "../components/Departments";
import Loading from '../components/Loading';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from "../config/colors"
import { domMax } from 'framer-motion';
import ProfileImagePicker from '../components/ProfileImagePicker';
import { v4 as uuidv4 } from 'uuid';
var storageRef = firebase.storage().ref();

const validationSecondRegisterScreen = Yup.object().shape({
    username: Yup.string().min(1).nullable().label("Username"),
    age: Yup.string().min(1).max(2).label("Age"),
    department: Yup.object().nullable().label("Department"),
    bio: Yup.string().min(1).label("Bio"),
    batch:  Yup.string().min(4).label("Batch")
});

const ProfileSettings = ({navigation}) => {
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState({});
    const [bio, setBio] = useState("")
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [batch, setBatch] = useState(null);
    const [kebabModalVisible, setKebabModalVisible] = useState(false)  
    const [profilePic, setProfilePic] = useState("")
    const user = firebase.auth().currentUser
    const userID = firebase.auth().currentUser.uid;
    const usersCollection = firebase.firestore().collection("users_extended").doc(userID)
    const departCollection = firebase.firestore().collection("departments").doc(department.value).collection("members")
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        getData();
        console.log(profilePic);
    }, [])

    const getData =  () => {
        usersCollection.get()
        .then((doc) => { 
              setUserName(doc.data()['username'])
              const dept = doc.data()['department']
              setDepartment(dept)
              setAge(doc.data()['age'])
              setBio(doc.data()['bio'])
              setBatch(doc.data()['batch'])
              setProfilePic(doc.data()['profilePic'])
            }).catch ((err) => {
                console.log("Error receiving data from the database", err);
            })
            setLoading(false);
    }


    const handleSubmit=(values)=>{
        console.log(values, "jn");
        try {            
            console.log(values);
            usersCollection.get()
                .then( () => {
                    if(values.profileImage!== ''){
                        uploadImage(values);
                    }
                    if(values.username !== "") {
                        usersCollection.update({
                            username: values.username
                        })
                        console.log("Updated username");
                        firebase.auth().currentUser.updateProfile({
                            displayName: values.username
                        })
                    }
                    if(values.age !== "") {
                        usersCollection.update({
                            age: values.age
                        })
                        console.log("Updated age!")
                    }
                    if(values.bio !== "") {
                        usersCollection.update({
                            bio: values.bio
                        })
                        console.log("Updated bio!");
                    }
                    if(values.batch !== "") {
                        usersCollection.update({
                            batch: values.batch
                        })
                        console.log("Updated batch");
                    }

                    // If department is changed 
                    if(values.department !== null) {
                        // Delete user from previous department 
                        departCollection.doc(userID).delete().then(() => {
                            console.log("User successfully removed from previous department", department.label);
                        }).catch((err) => {
                            console.log("Error removing user", erro);
                        })

                        // add user to the new department 
                        firebase.firestore().collection("departments").doc(values.department.value).collection("members").doc(userID).set({
                            id: userID
                        })
                        
                        //Update department in users collection
                        usersCollection.update({
                            department: values.department
                        })
                        console.log(("Department updated!"));
                    }
                })          
        } catch (error) {
            console.log("Error updating values in the database",error)
        }
        navigation.goBack()      
    }



    // image uploader from profile picture
    const uploadImage= async (values)=>{
        const random_id = uuidv4();
        const extension = values.profileImage.split('.').pop();

        const blob = await new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.onload = function(){
                resolve(xhr.response);
            };
            xhr.onerror = function(){
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', values.profileImage, true);
            xhr.send(null);

        });
        const ppicRef = storageRef.child(`profilePictures/${random_id+'.'+extension}`)
        const snapshot = ppicRef.put(blob);

        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot)=>{
            console.log(snapshot.state);
            console.log('progress:' + (snapshot.bytesTransferred / snapshot.totalBytes)*100);
            setUploading(true);
        },
        (error)=>{
            setUploading(false)
            console.log(error);
            blob.close()
            return
        },
        ()=>{
            ppicRef.getDownloadURL().then((downloadUrl)=>{
                blob.close();
                
                delete values.profileImage
                values.profilePic = downloadUrl
                finalSubmit(values)
                setUploading(false)                  
            })
        }
        );
    } 
    
    const finalSubmit = (values) =>{
        usersCollection.update({
            profilePic: values.profilePic
        })
        console.log("Updated profilepic");
    }
          
    

    if(loading){
        return <Loading/>}

    return (
        <Screen style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator = {false}
            >

            <AppForm
                initialValues={{username: "", age:'',  department: null, bio:'', batch:'', profileImage:''}}
                onSubmit={handleSubmit}
                validationSchema={validationSecondRegisterScreen}
            >
                <Label style = {styles.label}> Click to change profile picture</Label>
                <ProfileImagePicker screen='settings' name='profileImage' />
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
                    name= "department"
                    numberOfColumns={1}
                    placeholder= {department.label}
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
                { !uploading? <SubmitButton 
                    title="Save"
                />:<ActivityIndicator size={40} color={colors.primary} />}                
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
        padding:20,
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
        marginLeft:5,
        
        color:colors.medium
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    cameraIconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cameraIcon: {
        opacity: 0.9,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.light
    },

    kebab:{
        marginTop:5,
        width:10
    },
    kebabModalView:{
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-end',
        backgroundColor: 'transparent'
    },
    kebabContainer:{
        minHeight:'10%',
        maxHeight:'25%',
        width:'100%',
        paddingTop:7,
        borderTopEndRadius:20,
        backgroundColor: '#fff',
        flex:1,
        flexDirection:'column'
    },
    kebabOneItem:{
        flex:1,
        flexDirection:'row',
        paddingLeft:20,
        borderBottomColor:'rgba(0,0,0,0.4)',
        borderBottomWidth:0.2,
        padding:15,
        paddingTop: 17
    },
    kebabText:{
        marginLeft:15,
        marginTop:-3
    },
    kebabTitle:{
        fontSize:16,
        fontWeight:'bold'
    },
    kebabDetail:{
        fontSize:12,
        color:'rgba(0,0,0,0.7)',

    },
    editButtonGap:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    
})
