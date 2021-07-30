import React, {useState, useContext, useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {AuthContext} from "../context/AuthProvider";
import {Container} from "native-base"
import colors from '../config/colors';
import {AppForm, AppFormField, SubmitButton} from "../components/form";
import AppText from "../components/AppText";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string()
            .label("Email")
            .email("Enter a valid email!")
            .required("Please enter a registered email. ")
})


const ForgotPasswordScreen = ({navigation}) => {
    const {error, setError, passwordReset} = useContext(AuthContext)



    useEffect(() => {
       setError(null)
    }, [])


    const handlePasswordReset = async (values, actions) => {
        const { email } = values
    
        try {
            await passwordReset(email)
            console.log('Password reset email sent successfully')
            Alert.alert("A link with instructions has been sent to your email.")
            navigation.navigate('Login')
        } catch (error) {
        actions.setFieldError('general', error.message)
        }
    }

    return (
        <>
            <Container style={styles.container}>
                <AppText style = {styles.headerText}> Forgot Password? </AppText>
                <AppForm 
                    initialValues = {{email: ""}}
                    onSubmit = {handlePasswordReset}
                    validationSchema = {validationSchema}
                >
                    <AppFormField 
                        name = "email"
                        placeholder = "Email"
                        maxLength = {255}
                    />
 

                    <SubmitButton title = "Reset Password" />
                    {
                        error ? <Text style={styles.errorMessage}> {error} </Text> : null
                    }
                </AppForm>

            </Container>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
    },
    headerText: {
        textAlign: "center",
        marginVertical: 30,
        fontWeight: "bold"
    },
    loginBtn: {
        marginTop: 10
    },
    navBtn: {
        marginTop: 15,
        alignItems: "center",
    },
    navBtnText: {
        fontSize: 14,
        color: colors.secondary
    
    },
    errorMessage: {
        color: "red",
        marginTop: 10,
        textAlign: "center"
    }
})
export default ForgotPasswordScreen
