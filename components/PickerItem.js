import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import AppText from './AppText'
import colors from '../config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'


const PickerItem = ({icon, item, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons style={styles.icon} name={icon} size={35} color={colors.medium}/>
                <AppText style={styles.text}>{item.label}</AppText>
            </View>
        </TouchableOpacity>
    )
}

export default PickerItem

const styles = StyleSheet.create({
    container:{
        padding:10,
        flexDirection:'row'
    },
   
    text:{
        padding:10,
        marginTop:-2
    }
})
