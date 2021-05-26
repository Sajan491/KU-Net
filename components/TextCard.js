import React from 'react'
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import AppText from "../components/AppText"
import colors from '../config/colors'
import {MaterialCommunityIcons} from "@expo/vector-icons";
const TextCard = ({title, subTitle, description, onPress}) => {
    return (
        <View style = {styles.card}>
            <AppText style = {styles.title}>{title}</AppText>
            <AppText style = {styles.subTitle}>{subTitle}</AppText>
            <AppText style = {styles.description}>{description}</AppText>
            <MaterialCommunityIcons name="circle-edit-outline" size={24} onPress = {onPress} style={styles.editBtn} />
        </View>
    )
}

export default TextCard

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: colors.white,
        overflow: 'hidden',
        margin: 10
    },
    title: {
        marginBottom: 3
    },
    subTitle: {
        color: colors.secondary,
        fontSize: 14,
        fontWeight: "bold"
    },
    description: {
        fontSize: 12,
        color: "gray"
    },
    editBtn: {
        position: "absolute",
        right: 30,
        top: 12
    }
})
