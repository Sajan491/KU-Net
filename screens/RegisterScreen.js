import React, {useState, useContext, useEffect} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import {AuthContext} from "../context/AuthProvider";
import {Container} from "native-base"
import colors from '../config/colors';
import {AppForm, AppFormField, SubmitButton} from "../components/form";
import AppText from "../components/AppText"
import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
    email: Yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!")
    .label("Email"),
    password: Yup
    .string()
    .required("Password is required!")
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
    .label("Password"),
    confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords do not match!')
    .required("Confirm Password is required!")
    .label("ConfirmPassword")
})

const RegisterScreen = ({navigation}) => {
    const {signUp, error, setError} = useContext(AuthContext)

    const pressHandlerLogin = () => {
        navigation.navigate("Login")
    }

    const  pressHandlerRegister = async (values) => {
        try{
            await signUp(values.email, values.password)
        } catch (err) {
            setError("Failed to create Account!")
            console.log(err);
        }
    }

    useEffect(() => {
        setError(null)
     }, [])

    return (
        <>
            <Container style={styles.container}>
                <Image style={styles.logo} source={require('../assets/appLogo.png')} />
                <AppText style = {styles.headerText}> Register </AppText>
                <AppForm 
                    initialValues = {{email: "", password: "", confirmPassword: ""}}
                    onSubmit = {pressHandlerRegister}
                    validationSchema = {registerValidationSchema}
                >
                    <AppFormField 
                        name = "email"
                        placeholder = "Email"
                        maxLength = {255}
                    />
                    <AppFormField 
                        name = "password"
                        placeholder = "Password"
                        secureTextEntry = {true}
                    />
                    <AppFormField 
                        name = "confirmPassword"
                        placeholder = "Confirm Password"
                        secureTextEntry = {true}
                    />

                    <SubmitButton title = "Register" />
                    {
                        error ? <Text style={styles.errorMessage}> {error} </Text> : null
                    }
                </AppForm>
                
                <TouchableOpacity style={styles.navBtn} onPress={pressHandlerLogin}> 
                    <Text style={styles.navBtnText}> Already have an account? Sign In.</Text>
                </TouchableOpacity>

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
    },
    logo: {
        marginTop: -40,
        alignSelf: "center",
    }
})
export default RegisterScreen
