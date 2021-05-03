import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const MyIcon = ({name, size=40, Iconcolor='#fff', backgroundColor='#000'}) => {
    return (
        <View style={{
            height:size,
            width:size,
            borderRadius:size/2,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor
        }}>
            <MaterialCommunityIcons name={name} color={Iconcolor} size={size*0.5}></MaterialCommunityIcons>
        </View>
    )
}

export default MyIcon


