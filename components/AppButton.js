import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../config/colors'

const AppButton = ({title, onPress, color='primary', children}) => {
    return (
        <TouchableOpacity style = {[styles.button, {backgroundColor: colors[color]}]} onPress={onPress}> 
           {children} 
           <Text style = {styles.text}>{title}</Text>
           
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.secondary,
        borderRadius: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        width:'80%',
        marginVertical:20,
        marginBottom:5,
        alignSelf:'center'
        
    },
    text:{
        color:colors.black,
        fontSize:18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        display: "flex",
        marginLeft: 10

    }
})
