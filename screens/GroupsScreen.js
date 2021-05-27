import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'

const GroupsScreen = () => {
    return (
        <View style={styles.container}>
            <Header headerText="Groups" />
            <Text>Group Screen</Text>
        </View>
    )
}

export default GroupsScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10
    }
})
