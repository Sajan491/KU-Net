import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import AppFormImagePicker from '../components/form/AppFormImagePicker';
import Screen from '../components/Screen'

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    description: Yup.string().label("Description"),
    images: Yup.array().min(1, "Please select at least one image")
});

const AddPostScreen = () => {
    return (
        <Screen style={styles.container}>
            
            <AppForm
                initialValues={{title:'', price:'', description:'',category:null, images:[]}}
                onSubmit={(values)=>console.log(values)}
                validationSchema={validationSchema}
            >
                <AppFormImagePicker name="images" />
                <AppFormField 
                    maxLength = {255}
                    placeholder='Title'
                    name="title"
                />
                
                <AppFormField 
                    maxLength={255}
                    multiline
                    numberOfLines={3}
                    name="description"
                    placeholder="Description"
                />
                <SubmitButton 
                    title="Post"
                />               
            </AppForm>
        </Screen>
    )
}

export default AddPostScreen

const styles = StyleSheet.create({
    container:{
        padding:20
    },
})
