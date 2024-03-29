import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from 'react-native'
import colors from '../config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'



const ImageInput = ({imageUri, onChangeImage}) => {

    const requestPermission =async() =>{
        const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        // const result = await ImagePicker.getMediaLibraryPermissionsAsync(); 
        if(!result.granted){
            alert('You need to enable permission to access the library')
        }
    }
    useEffect(() => {
        requestPermission();
    }, [])
    
    const handlePress=()=>{
        if(!imageUri) selectImage();
        else Alert.alert('Delete', 'Are you sure you want to delete this image?',[
            {text:'Yes', onPress:()=>onChangeImage(null)},
            {text:'No'}
        ])
    }
    const selectImage = async () =>{
        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 0.5
            });
            if(!result.cancelled){
                onChangeImage(result.uri)
            }
        } catch (error){
            console.log('Error reading an Image!')
        }     
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container} >
                {!imageUri && <MaterialCommunityIcons name="camera" size={40} color={colors.medium} /> }
                {imageUri && <Image source={{uri:imageUri}} style={styles.image} /> }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ImageInput

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.light,
        borderRadius: 15,
        justifyContent:"center",
        alignItems:"center",
        height:100,
        width:100,
        overflow:"hidden",
        
    },
    image:{
        width:"100%",
        height:"100%"
    }
})
