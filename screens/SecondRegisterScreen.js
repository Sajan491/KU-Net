import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'
import ProfileImagePicker from '../components/ProfileImagePicker';
import DepartmentPicker from '../components/DepartmentPicker';
import AppText from '../components/AppText';



const validationSecondRegisterScreen = Yup.object().shape({
    username: Yup.string().required().min(1).label("Username"),
    age: Yup.string().required().min(1).max(2).label("Age"),
    department: Yup.object().required().nullable().label("Department"),
    bio: Yup.string().min(1).label("Bio"),
    batch:  Yup.string().required().min(4).label("Batch")
});

const SecondRegisterScreen = () => {
    return (
        <Screen style={styles.container}>
            <AppText style={styles.header}>Profile Details</AppText>
            
            <AppForm
                initialValues={{username:'', department:'', batch:''}}
                onSubmit={(values)=>console.log(values)}
                validationSchema={validationSecondRegisterScreen}
            >
                <AppFormField 
                    maxLength = {255}
                    placeholder='Username'
                    name="username"
                />
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {2}
                    placeholder='Age'
                    name="age"
                />
                <ProfileImagePicker name='image' />
                
                <DepartmentPicker
                    name="department"
                    placeholder="Department"
                    numberOfColumns={1}
                />
                <AppFormField 
                    maxLength = {255}
                    placeholder='Short Bio'
                    name="bio"
                    multiline
                    numberOfLines={4}
                />
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {4}
                    placeholder='Batch'
                    name="batch"
                />
                <SubmitButton 
                    title="Save"
                />               
            </AppForm>
    </Screen>
    )
}

export default SecondRegisterScreen

const styles = StyleSheet.create({
    header:{
        paddingLeft:8,
        paddingTop:30
    },
    container:{
        padding:20
    },
})
