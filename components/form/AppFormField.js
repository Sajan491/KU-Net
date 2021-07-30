import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'
import { useFormikContext } from 'formik'

const AppFormField = ({name, ...otherProps}) => {
    const {setFieldTouched, placeholder, handleChange, errors, touched, values } = useFormikContext();
    return (
        <>
            <AppTextInput
                placeholder = {placeholder}
                onBlur={()=> setFieldTouched(name)}
                onChangeText={handleChange(name)}
                selectedItem = {values[name]}
                {...otherProps}
                
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    )
}

export default AppFormField

const styles = StyleSheet.create({})
