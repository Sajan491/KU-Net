import React, {useState} from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';

import {Container, Content, Header, Input, Form, Item, Label} from "native-base"
import firebase from "firebase";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const loginUser = (email, password) => {
        console.log(email)
        try{
            firebase.auth().signInWithEmailAndPassword(email, password).then((user) => console.log(user))
        }
        catch(err){
            console.log(err.toString())
        }
    }
    

    const pressHandlerRegister = () => {
        navigation.navigate("Register")
    }
    
    const pressHandlerHome = () => {
        navigation.navigate("After")
    }

    return (
        <>
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label> Email</Label>
                        <Input autoCapitalize="none" autoCorrect={false} onChangeText={(email) => setEmail(email)}/>
                    </Item>
                    <Item floatingLabel>
                        <Label> Password</Label>
                        <Input secureTextEntry={true} autoCapitalize="none" autoCorrect={false} onChangeText={(password) => setPassword(password)}/>
                    </Item>
                    <View style={styles.LoginBtn}>
                        <Button title="Login" onPress={pressHandlerHome}  />    
                    </View>
                </Form>
            <View style= {styles.Register}>
            <Text style={{marginTop:40, marginLeft: 150}}> Don't have an account? </Text>
            <View style={{margin: 10}}> 
            <Button title="Register" onPress={pressHandlerRegister}/>
            </View>

            </View>
            </Container>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center"
    },
    LoginBtn: {
        marginTop: 30
    },
    Register: {
        marginBottom: 0
    }
})
export default LoginScreen
