import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useFormik, useFormikContext} from 'formik';
import AppPicker from './AppPicker';
import ErrorMessage from './form/ErrorMessage'


const ItemPicker = ({items, name, numberOfColumns, placeholder}) => {
    const {errors, setFieldValue, touched, values} = useFormikContext();
    
    return (
        <>
        <AppPicker
            items={items}
            numberOfColumns={numberOfColumns}
            onSelectItem = {(item)=> setFieldValue(name, item)}
            placeholder = {placeholder}
            selectedItem = {values[name]} 
        />
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    )
}

export default ItemPicker

const styles = StyleSheet.create({})
