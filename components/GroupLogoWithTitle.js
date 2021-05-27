import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const GroupLogoWithTitle = ({title, image, onPress}) => {
    return (
            <View>
                <TouchableOpacity onPress = {onPress} style = {styles.logoContainer}>
                    <Image source = {image} style = {styles.logo} resizeMode = {'contain'}/>
                    <Text style = {styles.text}> {title} </Text>
                </TouchableOpacity>
            </View>
        )
}

export default GroupLogoWithTitle

const styles = StyleSheet.create({
    logo: {
        height: 50,
        width: 50,
        borderRadius: 12
    },
    logoContainer: {
        height: 70,
        marginHorizontal: 12,
        marginVertical: 14
    },
    text: {
    fontSize: 12,
    textAlign: "center"        
    }
})
