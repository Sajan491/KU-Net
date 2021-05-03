import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginScreen = ({navigation}) => {

    const pressHandlerRegister = () => {
        navigation.navigate("Register")
    }

    const pressHandlerHome = () => {
        navigation.navigate("Home")
    }

    return (
        <View style ={styles.container}>
            <Text>Login Screen | KU Net</Text>
            <Text > Don't have an account? </Text>
            <View style={{margin: 40}}> 
            <Button title="Login" onPress={pressHandlerHome} />
            </View>
           
            <Button title="Register" onPress={pressHandlerRegister}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        alignItems: "center",
        justifyContent: "center"
    }
})
export default LoginScreen
