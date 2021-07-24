import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {AuthContext} from "../context/AuthProvider";
import {Container} from "native-base"
import colors from '../config/colors';
import {AppForm, AppFormField, SubmitButton} from "../components/form";
import AppText from "../components/AppText";
import * as Yup from "yup";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

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
    const [hidePassword, setHidePassword] = useState(true);

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

    const showPasswordHandler = () => {
        setHidePassword(!hidePassword)
    }

    return (
        <>
            <Container style={styles.container}>
                <Image style={styles.logo} source={require('../assets/appLogo.png')} />
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
                    <View style = {styles.passwordContainer}>
                        <AppFormField 
                            name = "password"
                            placeholder = "Password"
                            secureTextEntry = {hidePassword}
                        />
                        {hidePassword 
                            ?<TouchableOpacity onPress = {showPasswordHandler} style = {styles.showPassword}>
                                <MaterialCommunityIcons name="eye" size = {20} />
                            </TouchableOpacity>
                            : <TouchableOpacity onPress = {showPasswordHandler} style = {styles.showPassword}>
                                <Entypo name="eye-with-line" size = {20} />
                            </TouchableOpacity>
                        }
                    </View>


                    <SubmitButton title = "Login" />
                    {
                        error ? <Text style={styles.errorMessage}> {error} </Text> : null
                    }
                </AppForm>
    
            <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate("ForgotPassword")}> 
                <Text style={styles.forgotText}> Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBtn} onPress={pressHandlerRegister}> 
                <Text style={styles.navBtnText}> Create New Account</Text>
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
        fontSize: 16,
        color: colors.secondary
    
    },
    forgotText: {
        fontSize: 16,
        color: colors.primary
    },
    errorMessage: {
        color: "red",
        marginTop: 10,
        textAlign: "center"
    },
    showPassword: {
        position: "absolute",
        right: 20,
        top: 28
    },
    passwordContainer :{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        },
    logo: {
        alignSelf: "center",
        marginTop: -40,
    }
})
export default LoginScreen
