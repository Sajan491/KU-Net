import React, {useState, useContext, useEffect} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {AuthContext} from "../context/AuthProvider";

import {Container, Input, Form, Item, Label} from "native-base"
import {useForm} from "react-hook-form";

const LoginScreen = ({navigation}) => {
    const {signUp, error, setError} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const { register, errors, watch } = useForm();

    const pressHandlerLogin = () => {
        navigation.navigate("Login")
    }

    useEffect(() => {
        setError(null)
     }, [])
    return (
        <>
            <Container style={styles.container}>
                <Form>
                    <View style={styles.items}>
                    <Item floatingLabel>
                        <Label> Email</Label>
                        <Input 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            keyBoardType = "email-address"
                            value={email} 
                            onChangeText={(email) => setEmail(email)}/>
                    </Item>
                    <Item floatingLabel style={styles.items}>
                        <Label> Password</Label>
                        <Input 
                        secureTextEntry={true} 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        value={password} 
                        onChangeText={(password) => setPassword(password)}
              
                          />
                    </Item>
                    <Item floatingLabel style={styles.items}>
                        <Label> Confirm Password</Label>
                        <Input 
                        secureTextEntry={true} 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        value={confirmPassword} 
                        onChangeText={(password) => setConfirmPassword(password)}
                        />
                    </Item>
                    <Text style={styles.errorMessage}> {error} </Text>
                    </View>
                    <View style={styles.signUp}>
                        <Button title="Sign Up" onPress={() =>signUp(email, password)}  />    
                    </View>
                    <TouchableOpacity style={styles.navBtn} onPress={pressHandlerLogin}> 
                <Text style={styles.navBtnText}> Already have an account? Sign In Here.</Text>
            </TouchableOpacity>
                </Form>
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
