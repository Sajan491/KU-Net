import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useFormik, useFormikContext} from 'formik';
import AppPicker from './AppPicker';
import ErrorMessage from './form/ErrorMessage'


const departments = [
    {label: "Computer Science and Engineering", value:1, icon:"laptop"},
    {label: "Civil Engineering", value:2, icon:"account-hard-hat"},
    {label: "Chemical Engineering", value:3, icon:"chemical-weapon"},
    {label: "Architecture", value:4, icon:"lead-pencil"},
    {label: "Mechanical Engineering", value:5, icon:"car"},
    {label: "Pharmacy", value:6, icon:"hospital-box"},
    {label: "Mathematics", value:7, icon:"math-compass"},
    {label: "Applied Science", value:8, icon:"black-mesa"},
];

const DepartmentPicker = ({name, numberOfColumns, placeholder}) => {
    const {errors, setFieldValue, touched, values} = useFormikContext();
    
    return (
        <>
        <AppPicker
            items={departments}
            numberOfColumns={numberOfColumns}
            onSelectItem = {(item)=> setFieldValue(name, item)}
            placeholder = {placeholder}
            selectedItem = {values[name]} 
        />
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    )
}

export default DepartmentPicker

const styles = StyleSheet.create({})
