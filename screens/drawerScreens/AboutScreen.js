import React from 'react';
import { View , Text, Button,StyleSheet} from 'react-native';
import Screen from "../../components/Screen";
const AboutScreen = ({navigation}) => {
    return (
        <Screen>
            <Text> About Screen</Text>
    
            </Screen>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
    }
})