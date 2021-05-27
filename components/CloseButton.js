import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

const CloseButton = (onPress) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}><Text>Close</Text></TouchableOpacity>
        </View>
    )
}

export default CloseButton

const styles = StyleSheet.create({})
