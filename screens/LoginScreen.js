import React, {useState, useContext, useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity } from 'react-native';
import {AuthContext} from "../context/AuthProvider";
import {Container} from "native-base"
import colors from '../config/colors';
import {AppForm, AppFormField, SubmitButton} from "../components/form";
import AppText from "../components/AppText";
import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
    email: Yup
     .string()
     .email()
     .required()
     .label("Email"),
    password: Yup
     .string()
     .required()
     .label("Password"),
})

const LoginScreen = ({navigation}) => {
    const {signIn, error, setError} = useContext(AuthContext)

    const pressHandlerRegister = () => {
        navigation.navigate("Register")
    }
    
    const pressHandlerLogin = async (values) => {
        try{
            await signIn(values.email, values.password);
        }catch(err){
            setError("Login Failed");
            console.log(err);
        }
    }

    useEffect(() => {
       setError(null)
    }, [])

    return (
        <>
            <Container style={styles.container}>
                <AppText style = {styles.headerText}> Login </AppText>
                <AppForm 
                    initialValues = {{email: "", password: "",}}
                    onSubmit = {pressHandlerLogin}
                    validationSchema = {loginValidationSchema}
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

                    <SubmitButton title = "Login" />
                    {
                        error ? <Text style={styles.errorMessage}> {error} </Text> : null
                    }
                </AppForm>
       
            <TouchableOpacity style={styles.navBtn} onPress={pressHandlerRegister}> 
                <Text style={styles.navBtnText}> New user? Join here.</Text>
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
export default LoginScreen
