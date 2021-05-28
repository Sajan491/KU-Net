import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/Header'
import colors from '../../config/colors'
import Screen from "../../components/Screen";

const GroupsScreen = () => {
    return (
        <Screen style = {styles.screen}>        
            <Header headerText="Groups" />
            <Text>Group Screen</Text>
        </Screen>

    )
}

export default GroupsScreen

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
        borderRadius:20
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10

    }
})
