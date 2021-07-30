import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, Image, View, TouchableWithoutFeedback, Alert } from 'react-native'
import colors from '../config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import { useFormikContext } from 'formik';



const ProfileImagePicker = ({name}) => {

    const {setFieldValue} = useFormikContext();

    const [imageUri, setImageUri] = useState(null)

    const requestPermission =async() =>{
        const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        if(!result.granted){
            alert('You need to enable permission to access the library')
        }
    }
    useEffect(() => {
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
        <Text style={styles.text}>Please pick an image to display on your profile</Text>
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && <MaterialCommunityIcons name="camera" size={40} color={colors.medium} />}
                {imageUri && <Image source={{uri:imageUri}} style={styles.image} /> }
            </View>     
        </TouchableWithoutFeedback>
        </>
    )
}

export default ProfileImagePicker

const styles = StyleSheet.create({
    container:{
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
