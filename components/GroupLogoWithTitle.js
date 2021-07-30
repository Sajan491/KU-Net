import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from '../config/colors';
const GroupLogoWithTitle = ({title, icon, onPress}) => {
    return (
            <View>
                <TouchableOpacity onPress = {onPress} style = {styles.logoContainer}>
                    <View style = {styles.container}>
                        {/* <MaterialCommunityIcons name = {icon} size = {45} style={styles.logo}/>  */}
                        <Image source ={require("../assets/groups/ku.png")} style = {styles.logo} />
                    </View>
                    <Text style = {styles.text}> {title} </Text>
                </TouchableOpacity>
            </View>
        )
}

export default GroupLogoWithTitle

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        height: 50,
        width: 50,
        // borderRadius: 50,
        marginLeft: 5,
        // color: colors.dark
    },
    logoContainer: {
        height: 70,
        marginHorizontal: 12,
        marginVertical: 6,
        alignContent: "center",
        // backgroundColor: colors.white,
        borderRadius: 10
    },
    text: {
    fontSize: 12,
    textAlign: "center"        
    },
    bgContainer: {
        // borderRadius: 50,
        // backgroundColor: "white"

    }
})
