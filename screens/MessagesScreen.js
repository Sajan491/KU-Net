import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'

const MessagesScreen = () => {
    return (
        <View style={styles.container}>
            <Header headerText="Chat" />
            <Text>Messages Screen</Text>
        </View>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10
    }
})
