import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'

const validationSecondRegisterScreen = Yup.object().shape({
    username: Yup.string().required().min(1).label("Username"),
    department: Yup.string().required().min(1).max(100).label("Department"),
    batch:  Yup.string().required().min(4).label("Batch")
});

const SecondRegisterScreen = () => {
    return (
        <Screen style={styles.container}>
            
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
                maxLength={255}
                multiline
                numberOfLines={3}
                name="department"
                placeholder="Department"
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
    container:{
        padding:20
    },
})
