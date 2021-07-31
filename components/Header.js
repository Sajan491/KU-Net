import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NotifButton from '../navigation/NotifButton';
import Constants from 'expo-constants'
import colors from '../config/colors';

const Header = ({headerText}) => {
    return (<>
            <View  style={styles.header} >
                <Text style={styles.headerText}>{headerText}</Text>    
            </View>
            <View style={styles.separator}></View>
            </>
    )
}

export default Header

const styles = StyleSheet.create({
    header:{
        paddingTop: Constants.statusBarHeight,
        flexDirection:'row',
        paddingLeft:10,
        paddingBottom:6,
        marginTop:8,
    }
    ,
    headerText:{
        color: colors.primary,
        fontWeight:'bold',
        fontSize:21
    },
    separator:{
        height:1,
        backgroundColor:"#fff",
        marginBottom: 5
    }
    
})
