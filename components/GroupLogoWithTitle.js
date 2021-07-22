import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {MaterialCommunityIcons} from "@expo/vector-icons";
const GroupLogoWithTitle = ({title, icon, onPress}) => {
    return (
            <View>
                <TouchableOpacity onPress = {onPress} style = {styles.logoContainer}>
                    <View style = {styles.container}>
                        <MaterialCommunityIcons name = {icon} size = {45} > </MaterialCommunityIcons>
                    </View>
                    <Text style = {styles.text}> {title} </Text>
                </TouchableOpacity>
            </View>
        )
}

export default GroupLogoWithTitle

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    logoContainer: {
        height: 70,
        marginHorizontal: 12,
        marginVertical: 6,
        alignContent: "center"
    },
    text: {
    fontSize: 12,
    textAlign: "center"        
    },
    bgContainer: {
        borderRadius: 50,
        backgroundColor: "white"

    }
})
