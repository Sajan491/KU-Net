import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

const AppText = ({children, style, ...otherProps}) => {
    return (
        <Text style={[styles.text, style]} {...otherProps}>
            {children}
        </Text>
    )
}

export default AppText

const styles = StyleSheet.create({
    text:{
        color:'black',
        ...Platform.select({
            ios:{
                fontSize:20,
                fontFamily: 'Avenir'
            },
            android:{
                fontSize:18,
                fontFamily: 'Roboto'
            }
        })
        
    }
})
