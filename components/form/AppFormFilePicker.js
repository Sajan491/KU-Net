import React from 'react'
import ErrorMessage from './ErrorMessage'
import {useFormik, useFormikContext} from 'formik';
import {StyleSheet, View} from 'react-native'
import FileInputList from './FileInputList.js'

const AppFormFilePicker = ({name} ) => {
    const {errors, setFieldValue, touched, values} = useFormikContext();
    const fileUris = values[name]
    
    const handleAdd=(uri)=>{
        setFieldValue(name,[...fileUris, uri]);
    }
    const handleRemove=(uri)=>{
        setFieldValue(name, fileUris.filter(fileUri=>fileUri!==uri))
    }
    return (
        <View style={styles.container}>
            <FileInputList fileUris={fileUris} onAddFile={handleAdd} onRemoveFile={handleRemove}/>
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </View>
        )
}

export default AppFormFilePicker

const styles = StyleSheet.create({
    container:{
        marginBottom:10
    }
    
})