import React from 'react';
import { View, Text, Button } from 'react-native';

const RegisterScreen = ({navigation}) => {

    const pressHandler = () => {
        navigation.goBack();
    }
    return (
        <View>
            <Text>Register Screen | KU Net</Text>
            <Button title="Back" onPress={pressHandler}/>
        </View>
    )
}

export default RegisterScreen
