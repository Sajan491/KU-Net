import React from 'react'
import {StyleSheet, Text, View } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import colors from '../config/colors'

const AppTextInput = ({icon, ...otherProps}) => {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={25} color={colors.medium} style={styles.icon}/>}
            <TextInput placeholderTextColor={colors.medium} {...otherProps}/>
        </View>
    )
}

export default AppTextInput

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        borderRadius:25,
        flexDirection:'row',
        width:"100%",
        padding:15,
        marginVertical:10
    },
    icon:{
        marginRight:10
    },
    
})
