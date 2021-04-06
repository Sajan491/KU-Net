import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginScreen = ({navigation}) => {

    const pressHandler = () => {
        navigation.navigate("RegisterScreen")
    }
    return (
        <View style ={styles.container}>
            <Text>Login Screen | KU Net</Text>
            <Text> Don't have an account? </Text>
            <Button title="Register" onPress={pressHandler}/>
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
