import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import {Formik} from "formik"
import colors from "../config/colors";
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from "../components/Screen"

const AddQuestionScreen = () => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required().min(1).label("Title"),
        description: Yup.string().label("Description"),
        page: Yup.object().required().nullable().label("Page"),
        images: Yup.array().max(4, "Maximum images allowed: 4")
    }); 

    const handleChange = () => {

    }

    const handleSubmit = () => {
        console.log("Submitted");
    }

    return (
        <Screen style = {styles.screen}>
            <View  style={styles.formContainer}>
                <Formik
                    initialValues={{}}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                    validationSchema={validationSchema}
                >
                        {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                    <View>
                        <TextInput
                                placeholder="Question"
                                onChangeText={handleChange('question')}
                                onBlur={handleBlur('question')}
                                value={values.question}
                                />
                                <SubmitButton title="Submit" onSubmit = {handleSubmit}/>
                    </View>
                )}

                          
                </Formik>
        </View>
                    
        </Screen>
    )
}

export default AddQuestionScreen

const styles = StyleSheet.create({
    formContainer:{
        backgroundColor:'white',
        paddingHorizontal:12,
        borderRadius:15,
        paddingBottom:50,
        paddingTop:25,
    },
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:10,
        flex:1,
        marginTop:-10

}, 
})
