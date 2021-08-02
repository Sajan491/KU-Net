import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from 'react-native'
import colors from '../../config/colors' 
import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions'

import { SimpleLineIcons } from '@expo/vector-icons'; 


const FileInput = ({fileUri, onChangeFile}) => {

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
        if(!fileUri) selectFile();
        else Alert.alert('Delete', 'Are you sure you want to remove this file?',[
            {text:'Yes', onPress:()=>onChangeFile(null)},
            {text:'No'}
        ])
    }
    const selectFile = async () =>{
        try{
            const result = await DocumentPicker.getDocumentAsync();
            if(result.type==='success'){
                onChangeFile(result.uri)
            }
        } catch (error){
            console.log('Error reading the File!')
        }     
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container} >
                {!fileUri && <SimpleLineIcons name="paper-clip" size={50} color={colors.medium} />}
                {fileUri && <Image source={require('../../assets/file.png')} style={styles.file} /> }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default FileInput

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
    file:{
        width:"100%",
        height:"100%"
    }
})
