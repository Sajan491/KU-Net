import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
const NotifButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Ionicons name="notifications-outline" size={30}/>
            </View>
        </TouchableOpacity>
    )
}

export default NotifButton

const styles = StyleSheet.create({
    container:{
        height:35,
        width:35,
        marginRight:20,
        marginBottom:-10
    }
})
