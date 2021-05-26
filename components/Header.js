import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NotifButton from '../navigation/NotifButton';
import Constants from 'expo-constants'

const Header = ({headerText}) => {
    return (
            <View  style={styles.header} >
                <Text style={styles.headerText}>{headerText}</Text>    
            </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header:{
        paddingTop: Constants.statusBarHeight,
        flexDirection:'row',
        paddingLeft:10,
        paddingBottom:13,
    }
    ,
    headerText:{
        color: 'tomato',
        fontWeight:'bold',
        fontSize:19
    },
    
})
