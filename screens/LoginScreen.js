import React, {useState, useContext, useEffect} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {AuthContext} from "../context/AuthProvider";

import {Container, Input, Form, Item, Label} from "native-base"

const LoginScreen = ({navigation}) => {
    const {signIn, error, setError} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const pressHandlerRegister = () => {
        navigation.navigate("Register")
    }
    
    const pressHandlerHome = () => {
        navigation.navigate("After")
    }

    useEffect(() => {
       setError(null)
    }, [])

    return (
        <>
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label> Email</Label>
                        <Input 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            keyBoardType = "email-address"
                            value={email} 
                            onChangeText={(email) => setEmail(email)}/>
                    </Item>
                    <Item floatingLabel>
                        <Label> Password</Label>
                        <Input secureTextEntry={true} autoCapitalize="none" autoCorrect={false} value={password} onChangeText={(password) => setPassword(password)}/>
                    </Item>
                    {
                        error ? <Text style={styles.errorMessage}> {error} </Text> : null
                    }
                    <View style={styles.loginBtn}>
                        <Button title="Login" onPress={() => signIn(email, password)}  />    
                    </View>
                </Form>
       
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
        // alignItems: "center"
    },
    loginBtn: {
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
