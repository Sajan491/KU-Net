import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 
const ChatButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Ionicons name="chatbox-outline" size={30}/>
            </View>
        </TouchableOpacity>
    )
}

export default ChatButton

const styles = StyleSheet.create({
    container:{
        height:35,
        width:35,
        marginRight:20,
        marginBottom:-10
    }
})
