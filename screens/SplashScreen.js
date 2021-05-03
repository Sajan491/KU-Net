
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
const SplashScreen = ({navigation}) => {
    return (
        <View>
            <Text>Splashhhhhhhh</Text>
            <Button title='Login' onPress={()=>navigation.navigate('Login')} />
            <Button title='Register' onPress={()=>navigation.navigate('Register')} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    
})
