import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'
import { useFormikContext } from 'formik'

const AppFormField = ({name, ...otherProps}) => {

    const {setFieldTouched, handleChange, errors, touched } = useFormikContext();

    return (
        <>
            <AppTextInput
                onBlur={()=> setFieldTouched(name)}
                onChangeText={handleChange(name)}
                {...otherProps}
                
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    )
}

export default AppFormField

const styles = StyleSheet.create({})
