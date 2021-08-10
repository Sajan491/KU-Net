import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, Image, View, TouchableWithoutFeedback, Alert } from 'react-native'
import colors from '../config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import { useFormikContext } from 'formik';
import firebase from "../config/firebase";



const ProfileImagePicker = ({screen, name}) => {

    const {setFieldValue} = useFormikContext();

    const [imageUri, setImageUri] = useState(null)
    const [profilePic, setProfilePic] = useState("")
    const [profilePicFetched, setProfilePicFetched] = useState(false)
    const [settingsScreen, setSettingsScreen] = useState(false)


    const requestPermission =async() =>{
        const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        if(!result.granted){
            alert('You need to enable permission to access the library')
        }
    }
    useEffect(() => {
        if(screen==='settings'){
            setSettingsScreen(true)
            const userID = firebase.auth().currentUser.uid;
            const usersCollection = firebase.firestore().collection("users_extended").doc(userID)
            usersCollection.get()
            .then((doc) => { 
                setProfilePic(doc.data()['profilePic'])
                setProfilePicFetched(true)
            }).catch ((err) => {
                console.log(err);
            })
        }
        requestPermission();
    }, [])

    const handlePress=()=>{
        if(!imageUri) addImage();
        else Alert.alert('Delete', 'Are you sure you want to delete this image?',[
            {text:'Yes', onPress:()=>setImageUri(null)},
            {text:'No'}
        ])
    }
    const addImage = async () =>{
        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8
            });
            if(!result.cancelled){
                setImageUri(result.uri);
                setFieldValue(name, result.uri)
                
            }
        } catch (error){
            console.log('Error reading an Image!')
        }     
    }

    return (
        <>
        
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && !settingsScreen && <MaterialCommunityIcons name="camera" size={40} color={colors.medium} />}
                {!imageUri && settingsScreen && profilePicFetched && <Image source={{uri:profilePic}} style={styles.image} />}
                {imageUri && <Image source={{uri:imageUri}} style={styles.image} /> }
            </View>     
        </TouchableWithoutFeedback>
        </>
    )
}

export default ProfileImagePicker

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        marginBottom:15,
        backgroundColor: colors.light,
        backgroundColor: colors.light,
        borderRadius: 15,
        justifyContent:"center",
        alignItems:"center",
        height:100,
        width:100,
        overflow:"hidden"
    },
    image:{
        width:"100%",
        height:"100%"
    },
    text:{
        color:colors.medium,
        padding:5
    }
})
