
import React, {useContext, useState} from 'react'
import { StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'
import ProfileImagePicker from '../components/ProfileImagePicker';
import ItemPicker from '../components/ItemPicker';
import AppText from '../components/AppText';
import firebase from "../config/firebase";
import { AuthContext } from '../context/AuthProvider';
var storageRef = firebase.storage().ref();
import { v4 as uuidv4 } from 'uuid';

const validationSecondRegisterScreen = Yup.object().shape({
    username: Yup.string().required().min(1).label("Username"),
    age: Yup.string().required().min(1).max(2).label("Age"),
    department: Yup.object().required().nullable().label("Department"),
    bio: Yup.string().min(1).label("Bio"),
    batch:  Yup.string().required().min(4).label("Batch"),
    profileImage: Yup.string().nullable()
});

import departments from '../components/Departments'
import colors from '../config/colors';
const usersCollection = firebase.firestore().collection("users_extended")

const SecondRegisterScreen = ({navigation}) => {
    const user = useContext(AuthContext);
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (values)=>{

        
    if(values.profileImage!=='')
        {const random_id = uuidv4();
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
        );}
        else{
            finalSubmit(values)
        }

    }

    const finalSubmit = async (values) =>{
        const departMembers = firebase.firestore().collection('departments').doc(values.department.value).collection('members');
        try {
            const userID = firebase.auth().currentUser.uid;
            console.log(userID);
            await usersCollection.doc(userID).set({ ...values, department: values.department
            })
            await departMembers.add({id:userID}).then(()=>{
                console.log("member added in department")
            })

            await firebase.auth().currentUser.updateProfile({
                displayName: values.username
            })
        } catch (error) {
            console.log("Error adding values to the database: ", error)
        }

        navigation.navigate("ThirdRegister")      
    }



    return (
        <Screen style={styles.container}>
            <ScrollView>
            <AppText style={styles.header}>Profile Details</AppText>

            <AppForm
                initialValues={{username:'', age:'',  department:null, bio:'', batch:'', profileImage:''}}
                onSubmit={handleSubmit}
                validationSchema={validationSecondRegisterScreen}
            >
                <AppFormField 
                    maxLength = {255}
                    placeholder='Username'
                    name="username"
                />
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {2}
                    placeholder='Age'
                    name="age"
                />
                <ProfileImagePicker name='profileImage' />
                
                <ItemPicker
                    items = {departments}
                    name="department"
                    placeholder="Department"
                    numberOfColumns={1}
                />
                <AppFormField 
                    maxLength = {255}
                    placeholder='Short Bio'
                    name="bio"
                    multiline
                    numberOfLines={4}
                />
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {4}
                    placeholder='Batch'
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
})
