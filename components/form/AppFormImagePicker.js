import React from 'react'
import ImageInputList from '../ImageInputList'
import ErrorMessage from './ErrorMessage'
import {useFormik, useFormikContext} from 'formik';
import {StyleSheet, View} from 'react-native'


const AppFormImagePicker = ({name}) => {
    const {errors, setFieldValue, touched, values} = useFormikContext();
    const imageUris = values[name]
    const handleAdd=(uri)=>{
        setFieldValue(name,[...imageUris, uri]);
    }
    const handleRemove=(uri)=>{
        setFieldValue(name, imageUris.filter(imageUri=>imageUri!==uri))
    }
    return (
        <View style={styles.container}>
            <ImageInputList imageUris={imageUris} onAddImage={handleAdd} onRemoveImage={handleRemove}/>
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </View>
        )
}

export default AppFormImagePicker

const styles = StyleSheet.create({
    container:{
        marginBottom:10
    }
    
})