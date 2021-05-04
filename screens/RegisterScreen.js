import React, {useState, useContext} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {AuthContext} from "../context/AuthProvider";

import {Container, Input, Form, Item, Label} from "native-base"

const LoginScreen = ({navigation}) => {
    const {signUp, error} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    <Text style={styles.errorMessage}> {error} </Text>
                    <View style={styles.signUp}>
                        <Button title="Sign Up" onPress={() => signUp(email, password)}  />    
                    </View>
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
