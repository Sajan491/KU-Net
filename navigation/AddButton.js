import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AddButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons name="plus-circle" color={colors.white} size={40}/>
            </View>
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        borderRadius:45,
        height:90,
        width:90,
        bottom:20,
        borderColor:colors.white,
        borderWidth:10,
        alignItems:"center",
        justifyContent:"center"
    }
})
