import React, {useState, useContext} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {AuthContext} from "../context/AuthProvider";
import {Formik, Field} from "formik";
import * as yup from "yup";
import customInput from "../components/form/customInput";
import {Container, Input, Form, Item, Label} from "native-base"


const LoginScreen = ({navigation}) => {
    const {signUp, error} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const pressHandlerLogin = () => {
        navigation.navigate("Login")
    }

    const signUpValidationSchema = yup.object().shape({
        email: yup
        .string()
        .email("Please enter a valid email!")
        .required("Email is required!"),
        password: yup
        .string()
        .required("Password is required!"),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match!')
        .required("Confirm Password is required!")
    })

    return (
        <>
            <Container style={styles.container}>
                <Formik
                    initialValues = {{
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema = {signUpValidationSchema}
                    onSubmit = {signUp(email, password)}
                    >

            {({ handleSubmit, isValid }) => (
              <>
    
                <Field
                  component = {customInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
          
                <Field
                 component = {customInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                component = {customInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />

                <View style={styles.signUp}>
                        <Button title="Sign Up" onPress={() =>
                            signUp(email, password)}  />    
                    </View>
                    <TouchableOpacity style={styles.navBtn} onPress={pressHandlerLogin}> 
                <Text style={styles.navBtnText}> Already have an account? Sign In Here.</Text>
            </TouchableOpacity>
              </>
            )}
                    </Formik>

               </Container>

            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    items: {
        marginTop: 40,
    },
    signUp: {
        marginTop: 10
    },
    navBtn: {
        marginTop: 15
    },
    navBtnText: {
        fontSize: 20,
        color: "#6646ee"
    },
    errorMessage: {
        color: "red",
        marginTop: 10,
    }
})
export default LoginScreen
